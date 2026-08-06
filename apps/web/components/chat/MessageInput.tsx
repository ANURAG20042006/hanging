"use client";

import { motion } from "framer-motion";
import { PlusCircle, Image as ImageIcon, Gift, Smile, Paperclip, SendHorizonal, Mic } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div className="px-4 pb-6 pt-2">
      <div className="bg-white/5 border border-white/10 rounded-xl focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/50 transition-all">
        <div className="flex items-end p-2 gap-2">
          <button className="p-2 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            <PlusCircle size={20} />
          </button>
          
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message #general"
            className="flex-1 bg-transparent text-white placeholder:text-white/30 resize-none outline-none max-h-[200px] py-2 text-sm"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                // Send message logic
                setMessage("");
              }
            }}
          />

          <div className="flex items-center gap-1 pb-1">
            <button className="p-2 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <Gift size={20} />
            </button>
            <button className="p-2 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <ImageIcon size={20} />
            </button>
            <button className="p-2 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <Smile size={20} />
            </button>
            {message.trim() ? (
              <button className="p-2 text-white bg-violet-600 hover:bg-violet-500 transition-colors rounded-lg shadow-glow-primary">
                <SendHorizonal size={20} />
              </button>
            ) : (
              <button className="p-2 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                <Mic size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="px-2 mt-1 text-[10px] text-white/30 text-right">
        {message.length}/2000
      </div>
    </div>
  );
}
