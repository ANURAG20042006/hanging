"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Sparkles, Search, Image as ImageIcon, Wand2, Film, FileText, 
  Lightbulb, BookOpen, Send, Mic, Volume2, Check, RefreshCw, Download, 
  ShieldCheck, Heart, Flame, Play, Eye
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState<
    "chat" | "search" | "photos" | "stories" | "reels" | "summaries" | "recommendations" | "scrapbook"
  >("chat");

  // Chat Assistant State
  const [inputPrompt, setInputPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I am your Squad AI Brain. I have analyzed 420+ chat messages, 120 photos, 8 trips, and 14 memory timelines. How can I assist your friend group today?",
    }
  ]);

  // Story Generator State
  const [storyType, setStoryType] = useState<"travel" | "funny" | "emotional" | "short">("travel");
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);

  // Photo Restoration Slider State
  const [restoreProgress, setRestoreProgress] = useState(75);

  const handleSendPrompt = (promptText?: string) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim()) return;

    const newMsg = { id: Date.now(), sender: "user", text: textToSend };
    setChatMessages((prev) => [...prev, newMsg]);
    if (!promptText) setInputPrompt("");
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "I queried the squad memory index! Found 8 matching memory items.";
      const lower = textToSend.toLowerCase();

      if (lower.includes("goa") || lower.includes("photo")) {
        aiText = "Here are the photos from your Goa Beach Trip (October 2026)! 🏖️\n- 12 Photos uploaded by Sarah and Alice.\n- Featured memories: Bonfire Night, Scuba Diving, Sunset Drinks.";
      } else if (lower.includes("movie") || lower.includes("first")) {
        aiText = "Your squad's very first Movie Night was on March 14, 2025! 🍿\nWatched *Interstellar* together with 4 friends in voice chat.";
      } else if (lower.includes("summarize") || lower.includes("chat")) {
        aiText = "📌 **Today's Squad Chat Summary**:\n1. Mike proposed Taj Exotica resort for Goa reunion.\n2. Sarah shared 12 vacation photos.\n3. Squad agreed on Cinema Watch Party tonight at 9 PM.";
      } else if (lower.includes("reunion") || lower.includes("plan")) {
        aiText = "Optimal reunion dates based on calendar analysis: **October 15-18, 2026** (100% squad availability). 🏙️";
      }

      setChatMessages((prev) => [...prev, { id: Date.now() + 1, sender: "ai", text: aiText }]);
      setIsTyping(false);
    }, 800);
  };

  const handleGenerateStory = () => {
    toast.success(`Generating ${storyType.toUpperCase()} squad story...`);
    setTimeout(() => {
      const stories = {
        travel: "Five years ago, your group took a spontaneous midnight road trip to the beach. You got lost twice, ran out of snacks, but watched the sunrise together on the hood of the car. Those unplanned detours became your favorite squad story.",
        funny: "Remember when Mike tried to cook pasta for 6 people and set off the smoke alarm twice? We ended up ordering pizza at 2 AM and laughing until sunrise! 😂🍕",
        emotional: "From late-night study sessions to college graduations and wedding celebrations—this squad has stood by each other through every chapter of life. Here's to forever! ❤️🥂",
        short: "Ordinary days become extraordinary memories when spent with the right friends.",
      };
      setGeneratedStory(stories[storyType]);
      toast.success("Story Generated! 📖");
    }, 600);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
              <Bot className="text-cyan-400" size={32} /> Squad AI Brain & Memory Intelligence
            </h1>
            <p className="text-white/60 text-sm">Conversational AI assistant, photo analysis, memory search, stories, reels, and digital scrapbooks.</p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 rounded-xl text-xs font-bold text-cyan-300 flex items-center gap-2">
            <ShieldCheck size={16} /> Privacy Guard Active
          </div>
        </div>

        {/* 8 Specialized Feature Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
          {[
            { id: "chat", label: "AI Assistant Chat", icon: Bot },
            { id: "search", label: "AI Memory Search", icon: Search },
            { id: "photos", label: "Photo Analysis & Restoration", icon: ImageIcon },
            { id: "stories", label: "Story Generator", icon: Wand2 },
            { id: "reels", label: "Video Reel Generator", icon: Film },
            { id: "summaries", label: "Chat & Trip Summaries", icon: FileText },
            { id: "recommendations", label: "AI Recommendations", icon: Lightbulb },
            { id: "scrapbook", label: "Digital Scrapbook", icon: BookOpen },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-glow-primary"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <tab.icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: AI ASSISTANT CHAT */}
        {activeTab === "chat" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6 flex flex-col h-[580px]">
            {/* Quick Suggestion Pills */}
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
              {[
                "Show all Goa trip photos 🏖️",
                "When was our first movie night? 🍿",
                "Summarize today's chat 📌",
                "Plan our next reunion 🏙️",
                "Who hasn't been active this month? 🎮",
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => handleSendPrompt(pill)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-cyan-600/20 text-cyan-300 text-xs font-medium border border-cyan-500/30 whitespace-nowrap transition-colors cursor-pointer"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar p-2">
              {chatMessages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] p-4 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user" 
                      ? "bg-gradient-to-r from-cyan-600 to-violet-600 text-white shadow-glow-primary" 
                      : "bg-white/10 text-white/90 border border-white/10 backdrop-blur-md"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-white/10 text-xs text-white/60 flex items-center gap-2">
                    <Sparkles size={14} className="animate-spin text-cyan-400" /> AI Brain is analyzing memories...
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Input Bar */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <input
                type="text"
                placeholder="Ask Squad AI Brain..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendPrompt()}
                className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs"
              />
              <button onClick={() => handleSendPrompt()} className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-primary cursor-pointer">
                <Send size={16} /> Send
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: AI MEMORY SEARCH */}
        {activeTab === "search" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Multimodal AI Memory Search</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="text" placeholder="Search friend, place, emotion..." className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
              <select className="px-4 py-2.5 rounded-xl bg-[#0D1222] border border-white/10 text-xs text-white">
                <option>All Friends</option>
                <option>Alice Smith</option>
                <option>Sarah Jenkins</option>
                <option>Mike Ross</option>
              </select>
              <select className="px-4 py-2.5 rounded-xl bg-[#0D1222] border border-white/10 text-xs text-white">
                <option>All Years</option>
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
              </select>
              <button onClick={() => toast.success("AI Search Executed!")} className="py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl cursor-pointer">
                Run AI Memory Search
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {[
                { title: "Goa Beach Sunset 🌅", tag: "Beach • Goa • 2026", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070" },
                { title: "Sarah's 24th Birthday 🎂", tag: "Birthday • Party • 2025", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070" },
                { title: "Scuba Diving Pass 🤿", tag: "Water Sports • Goa • 2026", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070" },
              ].map((res, i) => (
                <div key={i} className="glass p-4 rounded-2xl border border-white/10 space-y-3">
                  <img src={res.img} alt={res.title} className="w-full h-36 object-cover rounded-xl" />
                  <h4 className="font-bold text-white text-sm">{res.title}</h4>
                  <p className="text-xs text-cyan-400 font-semibold">{res.tag}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PHOTO ANALYSIS & RESTORATION */}
        {activeTab === "photos" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">AI Photo Auto-Tagging & Resolution Restorer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo Analysis Card */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070" alt="Sample" className="w-full h-48 object-cover rounded-xl" />
                <div>
                  <h4 className="font-bold text-white text-sm">Auto Caption</h4>
                  <p className="text-xs text-white/70 mt-1">"Group of friends laughing around a beach bonfire at sunset 🔥🌅"</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["Alice Smith", "Sarah Jenkins", "Goa Beach", "Smile 98%", "Celebration 🎉"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Restoration Control */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="font-bold text-white text-base flex items-center gap-2"><Sparkles className="text-amber-400" /> AI Low-Res Photo Upscaler & Color Fix</h4>
                <div className="h-48 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center relative overflow-hidden">
                  <p className="text-xs text-emerald-400 font-bold">Enhanced Image Preview (Clarity {restoreProgress}%)</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/70 font-semibold flex justify-between">
                    <span>Noise Reduction & Upscale</span>
                    <span className="text-cyan-400 font-mono font-bold">{restoreProgress}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={restoreProgress}
                    onChange={(e) => setRestoreProgress(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
                <button onClick={() => toast.success("Photo Restored & Upscaled 4X! ✨")} className="w-full py-2.5 bg-amber-500 text-black font-bold text-xs rounded-xl cursor-pointer">
                  Save Restored Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STORY GENERATOR */}
        {activeTab === "stories" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">AI Squad Memory Story Generator</h3>
            <div className="flex gap-3">
              {(["travel", "funny", "emotional", "short"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setStoryType(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                    storyType === t ? "bg-violet-600 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
              <button onClick={handleGenerateStory} className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl cursor-pointer ml-auto">
                Generate Story ✨
              </button>
            </div>

            {generatedStory && (
              <div className="p-6 rounded-2xl bg-white/5 border border-violet-500/30 text-white/90 text-sm italic font-serif leading-relaxed">
                "{generatedStory}"
              </div>
            )}
          </div>
        )}

        {/* TAB 7: AI RECOMMENDATIONS */}
        {activeTab === "recommendations" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">AI Group Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { cat: "Movie 🍿", title: "Interstellar 2", reason: "98% Match based on squad sci-fi interests" },
                { cat: "Game 🎮", title: "UNO Multiplayer Arena", reason: "Highest squad active win streak" },
                { cat: "Trip ✈️", title: "Manali Mountain Retreat 🏔️", reason: "Popular for autumn group road trips" },
                { cat: "Song 🎶", title: "Coldplay - Yellow (Acoustic)", reason: "Most played track in Music Lounge" },
              ].map((rec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-cyan-400">{rec.cat}</span>
                  <h4 className="font-bold text-white text-base">{rec.title}</h4>
                  <p className="text-xs text-white/60">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: DIGITAL SCRAPBOOK */}
        {activeTab === "scrapbook" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">Squad Annual Scrapbook & PDF Exporter</h3>
                <p className="text-xs text-white/60">Automatically compiled 12-page annual report of all photos, trips, and memories.</p>
              </div>
              <button onClick={() => toast.success("Scrapbook PDF Generated! 📥")} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer">
                <Download size={16} /> Download PDF
              </button>
            </div>

            <div className="h-64 rounded-2xl bg-[#09101F] border border-white/10 p-6 flex flex-col justify-between">
              <div className="flex justify-between">
                <span className="text-amber-400 font-bold text-sm font-heading">The Squad Annual Report 2026 📖</span>
                <span className="text-xs text-white/50">12 Pages</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <span className="text-xl font-bold text-cyan-400">14 Days</span>
                  <p className="text-[10px] text-white/50">Streak Active</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <span className="text-xl font-bold text-violet-400">4 Trips</span>
                  <p className="text-[10px] text-white/50">Completed</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <span className="text-xl font-bold text-amber-400">120 Photos</span>
                  <p className="text-[10px] text-white/50">Shared</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <span className="text-xl font-bold text-emerald-400">8 Games</span>
                  <p className="text-[10px] text-white/50">Won</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
