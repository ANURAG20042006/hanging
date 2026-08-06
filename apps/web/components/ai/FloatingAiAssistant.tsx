"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Mic, Volume2 } from "lucide-react";
import toast from "react-hot-toast";

export function FloatingAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hey! I'm your Squad AI. Ask me anything about your squad's photos, trips, movies, or chats! ✨" }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let aiReply = "I searched your squad memory database! Found 12 matching photos and 3 trip notes.";
      if (input.toLowerCase().includes("goa")) {
        aiReply = "Found your Goa 2026 beach trip folder with 12 photos and $2,500 budget summary! 🌊";
      } else if (input.toLowerCase().includes("movie")) {
        aiReply = "Your squad's first movie night was on March 14, 2025 (*Interstellar*)! 🍿";
      }
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "ai", text: aiReply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[150]">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 text-white flex items-center justify-center shadow-glow-primary cursor-pointer border border-white/20 relative"
        >
          <Bot size={28} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0A0E1A] animate-pulse" />
        </motion.button>
      )}

      {/* Floating Assistant Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 sm:w-96 rounded-3xl bg-[#0D1222] border border-white/10 p-4 shadow-2xl space-y-4 flex flex-col h-[480px]"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-violet-600/30 text-violet-400 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-heading">Squad AI Assistant</h4>
                  <p className="text-[10px] text-emerald-400 font-semibold">Gemini Brain Active</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer">
                <X size={16} />
              </button>
            </div>

            {/* Chat History Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar p-1">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user" ? "bg-violet-600 text-white font-medium" : "bg-white/10 text-white/90 border border-white/5"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Pills */}
            <div className="flex gap-1.5 overflow-x-auto custom-scrollbar pb-1">
              {["Goa photos", "First movie", "Chat summary"].map((pill) => (
                <button
                  key={pill}
                  onClick={() => { setInput(pill); handleSend(); }}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-cyan-300 font-semibold border border-white/10 whitespace-nowrap cursor-pointer"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                placeholder="Ask Squad AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
              <button onClick={handleSend} className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white cursor-pointer">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
