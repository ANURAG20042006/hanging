"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Github, Twitter, MessageSquare, Terminal } from "lucide-react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "/docs" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white selection:bg-violet-500 selection:text-white flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-600/30 via-cyan-500/30 to-purple-600/30 border-b border-white/10 text-center py-2 px-4 text-xs font-medium text-white/90 flex items-center justify-center gap-2">
        <span className="bg-violet-500/30 text-violet-300 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">v2.4 Public Release</span>
        <span>Hangout Digital Home is now live worldwide! 🎉</span>
        <Link href="/pricing" className="underline hover:text-cyan-300 ml-1 inline-flex items-center gap-0.5">
          Get Started Free <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0E1A]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0A0E1A] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                Hangout
              </span>
              <span className="text-[10px] text-cyan-400 block -mt-1 font-mono uppercase tracking-widest">Digital Home</span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-cyan-300 ${
                    isActive ? "text-cyan-400 font-semibold" : "text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="relative group overflow-hidden rounded-xl p-px font-semibold text-xs"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-500 to-purple-600 rounded-xl transition-all duration-300 group-hover:opacity-90" />
              <span className="relative flex items-center gap-2 px-5 py-2.5 bg-[#0A0E1A] rounded-[11px] text-white transition-colors group-hover:bg-transparent">
                Open App <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070A14] text-white/60 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Hangout</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              The world’s first Digital Home for close friends. Plan trips, share memories, play games, stream movies, and walk through real-time 3D clubhouses together.
            </p>
            <div className="flex items-center gap-4 text-white/40 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <Link href="/docs" className="hover:text-cyan-400 transition-colors">
                <Terminal className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition-colors">Product Roadmap</Link></li>
              <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
              <li><Link href="/beta" className="hover:text-white transition-colors">Beta Program</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Public API & SDKs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Support & Community</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/tickets" className="hover:text-white transition-colors">Support Tickets</Link></li>
              <li><Link href="/feedback" className="hover:text-white transition-colors">Feedback Portal</Link></li>
              <li><Link href="/guidelines" className="hover:text-white transition-colors">Community Guidelines</Link></li>
              <li><Link href="/referrals" className="hover:text-white transition-colors">Referral Program</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p>© {new Date().getFullYear()} Hangout Platform, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> All Systems Operational (99.98%)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
