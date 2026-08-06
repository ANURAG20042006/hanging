param(
    [switch]$SkipDockerInstall,
    [switch]$StartOnly
)

$ErrorActionPreference = "Stop"

function Write-Header($msg) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  $msg" -ForegroundColor White
    Write-Host "==========================================================" -ForegroundColor Cyan
}

function Write-Step($msg) { Write-Host "  -> $msg" -ForegroundColor Yellow }
function Write-OK($msg)   { Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Err($msg)  { Write-Host "  [ERR] $msg" -ForegroundColor Red }

Write-Header "Hangout Cloud-Native Stack Setup"
Write-Host "  Installing Docker and starting all monitoring services..." -ForegroundColor Gray

# ----------------------------------------------------------------
# Step 1: Check / Install Docker
# ----------------------------------------------------------------
if (-not $StartOnly) {
    Write-Header "Step 1: Docker Desktop"

    $dockerInstalled = Get-Command docker -ErrorAction SilentlyContinue
    if ($dockerInstalled) {
        Write-OK "Docker already installed: $(docker --version)"
    } elseif (-not $SkipDockerInstall) {
        Write-Step "Downloading Docker Desktop installer (~500MB)..."
        $dockerUrl = "https://desktop.docker.com/win/main/amd64/Docker Desktop Installer.exe"
        $installer = "$env:TEMP\DockerDesktopInstaller.exe"

        try {
            $ProgressPreference = 'SilentlyContinue'
            Invoke-WebRequest -Uri $dockerUrl -OutFile $installer -UseBasicParsing
            Write-OK "Downloaded Docker Desktop installer"

            Write-Step "Installing Docker Desktop silently..."
            Start-Process -FilePath $installer -ArgumentList "install", "--quiet", "--accept-license" -Wait
            Write-OK "Docker Desktop installed successfully"

            Write-Step "Launching Docker Desktop..."
            Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe" -ErrorAction SilentlyContinue

            Write-Host ""
            Write-Host "  [WAIT] Docker Desktop is starting up." -ForegroundColor Yellow
            Write-Host "  Please wait 30-60 seconds for the Docker engine to be ready." -ForegroundColor Yellow
            Write-Host "  Then re-run this script with:" -ForegroundColor White
            Write-Host "    PowerShell -ExecutionPolicy Bypass -File scripts\setup-docker.ps1 -StartOnly" -ForegroundColor Cyan
            exit 0
        } catch {
            Write-Err "Could not auto-install Docker Desktop."
            Write-Host ""
            Write-Host "  Please install Docker Desktop manually from:" -ForegroundColor Yellow
            Write-Host "  https://www.docker.com/products/docker-desktop/" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "  After installation, run:" -ForegroundColor White
            Write-Host "    PowerShell -ExecutionPolicy Bypass -File scripts\setup-docker.ps1 -StartOnly" -ForegroundColor Cyan
            exit 1
        }
    }
}

# ----------------------------------------------------------------
# Step 2: Verify Docker Engine is running
# ----------------------------------------------------------------
Write-Header "Step 2: Verify Docker Engine"

$maxWait = 60
$waited  = 0
$dockerReady = $false
while ($waited -lt $maxWait) {
    try {
        $null = docker info 2>&1
        if ($LASTEXITCODE -eq 0) { $dockerReady = $true; break }
    } catch { }
    Write-Step "Waiting for Docker engine... ($waited / $maxWait s)"
    Start-Sleep 5
    $waited += 5
}

if (-not $dockerReady) {
    Write-Err "Docker engine is not responding. Please start Docker Desktop and try again."
    exit 1
}
Write-OK "Docker engine is running"

# ----------------------------------------------------------------
# Step 3: Create .env files if missing
# ----------------------------------------------------------------
Write-Header "Step 3: Environment Configuration"

$apiEnv = "apps\api\.env"
if (-not (Test-Path $apiEnv)) {
    Write-Step "Creating apps/api/.env..."
    $apiEnvContent = @"
DATABASE_URL=postgresql://hangout:hangout_secret@localhost:5432/hangout_db
REDIS_URL=redis://:hangout_redis_secret@localhost:6379
JWT_SECRET=hangout_jwt_secret_minimum_32_chars_long_for_security
JWT_REFRESH_SECRET=hangout_refresh_secret_minimum_32_chars_long
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
PORT=3001
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=wss://your-livekit-server.com
GEMINI_API_KEY=your_gemini_api_key
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=hangout_minio
MINIO_SECRET_KEY=hangout_minio_secret
"@
    $apiEnvContent | Out-File -FilePath $apiEnv -Encoding UTF8
    Write-OK "Created apps/api/.env"
} else {
    Write-OK "apps/api/.env already exists"
}

$webEnv = "apps\web\.env.local"
if (-not (Test-Path $webEnv)) {
    Write-Step "Creating apps/web/.env.local..."
    $webEnvContent = @"
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-server.com
"@
    $webEnvContent | Out-File -FilePath $webEnv -Encoding UTF8
    Write-OK "Created apps/web/.env.local"
} else {
    Write-OK "apps/web/.env.local already exists"
}

# ----------------------------------------------------------------
# Step 4: Start Docker Compose stack
# ----------------------------------------------------------------
Write-Header "Step 4: Starting Hangout Full Stack"

Write-Step "Pulling latest Docker images (first run may take a few minutes)..."
docker compose pull 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }

Write-Step "Starting all services..."
docker compose up -d 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }

if ($LASTEXITCODE -ne 0) {
    Write-Err "docker compose failed. Check output above."
    exit 1
}
Write-OK "All containers started"

# ----------------------------------------------------------------
# Step 5: Wait for Postgres and Redis to be healthy
# ----------------------------------------------------------------
Write-Header "Step 5: Waiting for Services to be Healthy"

foreach ($svc in @("hangout_postgres", "hangout_redis_primary")) {
    Write-Step "Waiting for $svc..."
    $tries = 0
    while ($tries -lt 30) {
        $health = docker inspect --format="{{.State.Health.Status}}" $svc 2>&1
        if ($health -eq "healthy") { Write-OK "$svc is healthy"; break }
        Start-Sleep 2
        $tries++
    }
    if ($tries -ge 30) { Write-Host "  [WARN] $svc did not become healthy in time" -ForegroundColor Yellow }
}

# ----------------------------------------------------------------
# Step 6: Run DB migrations
# ----------------------------------------------------------------
Write-Header "Step 6: Database Migrations"
Write-Step "Running Prisma db push..."
try {
    $env:DATABASE_URL = "postgresql://hangout:hangout_secret@localhost:5432/hangout_db"
    $env:PATH = "C:\Users\NJ542WS\AppData\Roaming\npm;" + $env:PATH
    & pnpm --filter "@hangout/db" db:push 2>&1 | ForEach-Object { Write-Host "    $_" }
    Write-OK "Database migrations complete"
} catch {
    Write-Host "  [WARN] Could not auto-run migrations. Run manually:" -ForegroundColor Yellow
    Write-Host "    pnpm --filter @hangout/db db:push" -ForegroundColor Cyan
}

# ----------------------------------------------------------------
# Final Summary
# ----------------------------------------------------------------
Write-Header "Hangout Stack is Ready!"

$services = @(
    @{ Name = "Web Frontend";    URL = "http://localhost:3000" },
    @{ Name = "NestJS API";      URL = "http://localhost:3001" },
    @{ Name = "Swagger Docs";    URL = "http://localhost:3001/api/docs" },
    @{ Name = "Monitoring";      URL = "http://localhost:3000/monitoring" },
    @{ Name = "Prometheus";      URL = "http://localhost:9090" },
    @{ Name = "Grafana";         URL = "http://localhost:3333  (admin / hangout_grafana_secret)" },
    @{ Name = "Jaeger Tracing";  URL = "http://localhost:16686" },
    @{ Name = "MinIO Console";   URL = "http://localhost:9001  (hangout_minio / hangout_minio_secret)" },
    @{ Name = "Mailhog";         URL = "http://localhost:8025" }
)

Write-Host ""
foreach ($svc in $services) {
    Write-Host ("  " + $svc.Name.PadRight(22)) -ForegroundColor White -NoNewline
    Write-Host $svc.URL -ForegroundColor Cyan
}

Write-Host ""
Write-Host "  To stop all services:  docker compose down" -ForegroundColor Yellow
Write-Host "  To view API logs:      docker compose logs -f api" -ForegroundColor Yellow
Write-Host ""
