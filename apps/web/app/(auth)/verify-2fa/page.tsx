"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useState, useRef, KeyboardEvent } from "react";

export default function Verify2FAPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card p-8 w-full"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/20">
          <ShieldCheck className="w-6 h-6 text-green-400" />
        </div>
        <h1 className="text-3xl font-heading font-semibold text-white mb-2 text-gradient">Two-Factor Auth</h1>
        <p className="text-white/60 text-sm text-center">Enter the code from your authenticator app</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-between gap-2">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 bg-black/20 border border-white/10 rounded-lg text-center text-xl font-semibold text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
            />
          ))}
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)]">
          Verify
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors">
          Back to login
        </Link>
      </div>
    </motion.div>
  );
}
