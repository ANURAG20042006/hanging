"use client";

import { useState } from "react";
import { Terminal, Code, Copy, Check, ExternalLink, Shield, Server, Zap, BookOpen } from "lucide-react";

export default function PublicDocsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<"curl" | "typescript" | "python">("typescript");

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const codeSnippets = {
    typescript: `import { HangoutClient } from '@hangout/sdk';

const hangout = new HangoutClient({
  apiKey: process.env.HANGOUT_API_KEY,
  groupId: 'group_alumni_2024'
});

// Fetch all memory photos from Goa trip
const photos = await hangout.media.search({
  query: 'Goa beach bonfire photos',
  limit: 20
});

console.log(\`Found \${photos.length} photos:\`, photos);`,
    curl: `curl -X GET "https://api.hangout.app/v1/media/search?query=Goa%20beach" \\
  -H "Authorization: Bearer HANGOUT_API_KEY" \\
  -H "Content-Type: application/json"`,
    python: `from hangout_sdk import HangoutClient

client = HangoutClient(api_key="HANGOUT_API_KEY")

# Create a new trip event in Planning Hub
event = client.events.create(
    group_id="group_alumni_2024",
    title="Reunion Goa Trip 2026",
    location="Baga Beach, Goa",
    estimated_budget=45000
)

print(f"Created event: {event.id}")`,
  };

  const apiEndpoints = [
    { method: "GET", path: "/v1/auth/me", desc: "Get current authenticated user profile & active sessions" },
    { method: "POST", path: "/v1/groups/:id/channels", desc: "Create a new text or LiveKit voice channel" },
    { method: "GET", path: "/v1/chat/messages", desc: "Cursor-paginated channel message history" },
    { method: "POST", path: "/v1/ai/memory-search", desc: "Query Gemini AI graph for group memories & photos" },
    { method: "GET", path: "/v1/planning/expenses", desc: "Calculate splitwise balances for event expenses" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-mono border border-violet-500/20">
          <Terminal className="w-3.5 h-3.5" /> Developer Platform v1.0
        </div>
        <h1 className="text-4xl font-extrabold text-white">Public API & SDK Documentation</h1>
        <p className="text-white/60 text-sm">Build custom bots, export memory archives, or integrate group events.</p>
      </div>

      {/* Code Interactive Explorer */}
      <div className="rounded-3xl border border-white/10 bg-[#070A14] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            {(["typescript", "python", "curl"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors uppercase ${
                  activeLanguage === lang
                    ? "bg-violet-600 text-white"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <button
            onClick={() => copyCode(codeSnippets[activeLanguage], "code-main")}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors font-mono"
          >
            {copied === "code-main" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied === "code-main" ? "Copied!" : "Copy Snippet"}
          </button>
        </div>

        <pre className="p-6 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
          <code>{codeSnippets[activeLanguage]}</code>
        </pre>
      </div>

      {/* REST API Endpoints Reference */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> REST API Specification
          </h2>
          <a
            href="http://localhost:3001/api/docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
          >
            Interactive Swagger Specs <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-3">
          {apiEndpoints.map((ep) => (
            <div key={ep.path} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold ${
                  ep.method === "GET" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                }`}>
                  {ep.method}
                </span>
                <span className="font-mono text-sm text-white">{ep.path}</span>
              </div>
              <p className="text-xs text-white/50">{ep.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
