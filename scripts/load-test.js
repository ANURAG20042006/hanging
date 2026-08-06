const http = require('http');

console.log("==========================================================");
console.log("  Hangout Platform RC 1.0 — API Load & Latency Test Suite");
console.log("==========================================================");

const endpoints = [
  { path: '/health', label: 'Health Check' },
  { path: '/admin/dashboard-stats', label: 'Telemetry Metrics' },
  { path: '/support/feedback', label: 'Support Feedback' },
  { path: '/feature-flags', label: 'Feature Flags' },
  { path: '/referrals/my-code', label: 'Referral System' },
];

let totalRequests = 0;
let totalSuccess = 0;
let totalTimeMs = 0;
const latencies = [];

async function runBenchmark() {
  const iterationsPerEndpoint = 20;

  for (const ep of endpoints) {
    console.log(`\n  Testing: ${ep.label} (${ep.path})`);
    for (let i = 0; i < iterationsPerEndpoint; i++) {
      totalRequests++;
      const start = Date.now();
      await new Promise((resolve) => {
        http.get(`http://localhost:3001${ep.path}`, (res) => {
          const latency = Date.now() - start;
          latencies.push(latency);
          totalTimeMs += latency;
          if (res.statusCode === 200) totalSuccess++;
          res.resume();
          resolve();
        }).on('error', () => resolve());
      });
    }
  }

  latencies.sort((a, b) => a - b);
  const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;

  console.log("\n==========================================================");
  console.log("  BENCHMARK RESULTS SUMMARY");
  console.log("==========================================================");
  console.log(`  Total Requests Executed: ${totalRequests}`);
  console.log(`  Successful Responses (HTTP 200): ${totalSuccess} (${((totalSuccess/totalRequests)*100).toFixed(1)}%)`);
  console.log(`  p50 Latency: ${p50} ms`);
  console.log(`  p95 Latency: ${p95} ms`);
  console.log(`  p99 Latency: ${p99} ms (Target: < 200 ms)`);
  console.log(`  Status: ${p99 < 200 ? '✅ PASSED SLA' : '⚠️ SLA WARNING'}\n`);
}

runBenchmark();
