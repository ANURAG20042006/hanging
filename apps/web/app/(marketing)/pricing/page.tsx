"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles, Zap, Shield, HelpCircle, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Free Clubhouse",
      priceMonthly: "$0",
      priceAnnual: "$0",
      desc: "Perfect for close friend groups getting started.",
      badge: "Free Forever",
      highlight: false,
      features: [
        "Up to 15 group members",
        "Unlimited text, voice & video chat",
        "5 GB shared memory storage",
        "Full Planning Hub (Trips, Calendar, Splitwise)",
        "3D WebGL Clubhouse access",
        "Gemini AI Memory Assistant (100 prompts/mo)",
      ],
      cta: "Create Free Group",
      href: "/signup",
    },
    {
      name: "Group Supporter Pro",
      priceMonthly: "$9",
      priceAnnual: "$7",
      desc: "For active friend groups who want HD streaming and unlimited AI.",
      badge: "Most Popular",
      highlight: true,
      features: [
        "Up to 50 group members",
        "1080p 60fps Cinema & Screen Sharing",
        "100 GB high-res photo/video storage",
        "Unlimited Gemini AI queries & auto-recaps",
        "Custom 3D Clubhouse environment themes",
        "Spatial audio voice channels with low latency",
        "Custom group subdomain (e.g. goa2024.hangout.app)",
      ],
      cta: "Start 14-Day Free Trial",
      href: "/signup?plan=pro",
    },
    {
      name: "Server Enterprise",
      priceMonthly: "$29",
      priceAnnual: "$24",
      desc: "For large alumni networks, gaming guilds, and communities.",
      badge: "Unlimited",
      highlight: false,
      features: [
        "Unlimited group members & channels",
        "4K UHD Video Watch Parties & Streaming",
        "1 TB Cloud Memory Vault & Time Capsules",
        "Dedicated LiveKit Voice/Video Node",
        "Custom Bot Integrations & Webhooks",
        "24/7 Priority Support & Admin Telemetry",
        "SAML / SSO & Advanced Security Audit Logs",
      ],
      cta: "Contact Operations",
      href: "/tickets",
    },
  ];

  const faqs = [
    { q: "Is the Free plan really free forever?", a: "Yes! There are no hidden trial periods or forced credit cards. Up to 15 friends can use all core features forever." },
    { q: "How does the annual discount work?", a: "When billed annually, you save over 20% compared to monthly billing." },
    { q: "Can I upgrade or downgrade at any time?", a: "Absolutely. You can change your plan from the Group Settings page at any time without losing any memories or planning data." },
    { q: "Do all members of my group need to pay?", a: "No! Only the group creator or owner pays for the Group Supporter Pro or Enterprise plan. All members enjoy the upgraded perks." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Simple, transparent pricing for{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            every friend group.
          </span>
        </h1>
        <p className="text-white/60 text-lg">
          No ad tracking. No selling your photos. Pure private friendship tools.
        </p>

        {/* Monthly/Annual Toggle */}
        <div className="pt-6 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!annual ? "text-white" : "text-white/40"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-14 h-8 rounded-full bg-white/10 border border-white/20 p-1 relative transition-colors"
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 shadow-md"
              animate={{ x: annual ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-medium flex items-center gap-1.5 ${annual ? "text-white" : "text-white/40"}`}>
            Annual <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full font-mono">SAVE 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all ${
              p.highlight
                ? "bg-gradient-to-b from-violet-900/40 via-purple-900/20 to-cyan-900/30 border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/20"
                : "bg-white/[0.02] border border-white/10 hover:border-white/20"
            }`}
          >
            {p.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-violet-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                {p.badge}
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <p className="text-xs text-white/50 mt-1 min-h-[32px]">{p.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {annual ? p.priceAnnual : p.priceMonthly}
                </span>
                <span className="text-white/40 text-sm">{p.priceMonthly !== "$0" ? "/month per group" : ""}</span>
              </div>

              <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-xs text-white/80">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                href={p.href}
                className={`w-full py-3.5 rounded-xl font-bold text-xs text-center transition-all block ${
                  p.highlight
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-cyan-500/20"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing FAQs */}
      <div className="max-w-3xl mx-auto space-y-8 pt-12">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" /> {faq.q}
              </h3>
              <p className="text-white/60 text-xs leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
