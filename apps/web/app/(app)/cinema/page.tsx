"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Film, Play, Pause, SkipForward, Volume2, Maximize, Mic, MicOff, 
  Video, VideoOff, MessageSquare, ThumbsUp, Plus, Sparkles, Send, 
  Shield, Layers, Popcorn, Heart, Flame, Laugh, MonitorPlay, Search, Youtube
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface QueueItem {
  id: string;
  title: string;
  url: string;
  votes: number;
  addedBy: string;
}

interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
}

export default function CinemaPage() {
  const [inRoom, setInRoom] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);

  // Video URL & YouTube Search State
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/L_LUpnjgPso?autoplay=1&enablejsapi=1");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<"search" | "url">("search");
  
  const [searchResults, setSearchResults] = useState([
    { title: "Interstellar — Official Trailer", url: "https://www.youtube.com/embed/zSWdZVtXT7E", channel: "Warner Bros.", views: "48M views" },
    { title: "Inception — Official Trailer", url: "https://www.youtube.com/embed/YoHD9XEInc0", channel: "Warner Bros.", views: "35M views" },
    { title: "Lofi Hip Hop Radio 🎧 Beats to Relax/Study to", url: "https://www.youtube.com/embed/jfKfPfyJRdk", channel: "Lofi Girl", views: "120K live" },
    { title: "Coldplay — Viva La Vida (Live in Sao Paulo)", url: "https://www.youtube.com/embed/dvgZkm1xWPE", channel: "Coldplay", views: "92M views" },
  ]);

  const [queue, setQueue] = useState<QueueItem[]>([
    { id: "q1", title: "Inception — Official Trailer", url: "https://www.youtube.com/embed/YoHD9XEInc0", votes: 8, addedBy: "Sarah" },
    { id: "q2", title: "Interstellar — Teaser Trailer", url: "https://www.youtube.com/embed/zSWdZVtXT7E", votes: 5, addedBy: "Mike" },
  ]);

  // Floating Emoji Animations
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  // Live Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m1", user: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?u=2", text: "Movie night starts now! 🍿", time: "8:00 PM" },
    { id: "m2", user: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=3", text: "Turn up the volume! 🔥", time: "8:01 PM" },
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handlePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    toast.success(nextState ? "Playback Resumed ⏯️" : "Playback Paused ⏸️");
  };

  const triggerReaction = (emoji: string) => {
    const newEmoji: FloatingEmoji = {
      id: Date.now(),
      emoji,
      x: Math.random() * 80 + 10,
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
    }, 2500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchMode === "url") {
      let embedUrl = searchQuery;
      if (searchQuery.includes("youtube.com/watch?v=")) {
        const id = searchQuery.split("v=")[1]?.split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&enablejsapi=1`;
      }
      setVideoUrl(embedUrl);
      setSearchQuery("");
      toast.success("Playing requested video URL! 🍿");
    } else {
      // Simulate YouTube API Search Filter
      const filtered = searchResults.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));
      if (filtered.length > 0) {
        setSearchResults(filtered);
      } else {
        setSearchResults([
          { title: `${searchQuery} — Search Result`, url: "https://www.youtube.com/embed/L_LUpnjgPso", channel: "YouTube", views: "1.2M views" }
        ]);
      }
      toast.success(`Found YouTube results for "${searchQuery}"! 🔍`);
    }
  };

  const playVideoNow = (item: { title: string; url: string }) => {
    setVideoUrl(item.url);
    toast.success(`Now playing: ${item.title}! 🎬`);
  };

  const addToQueue = (item: { title: string; url: string }) => {
    const newItem: QueueItem = {
      id: "q_" + Date.now(),
      title: item.title,
      url: item.url,
      votes: 1,
      addedBy: "You",
    };
    setQueue([...queue, newItem]);
    toast.success(`Added "${item.title}" to room queue! 🍿`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([
      ...messages,
      {
        id: "msg_" + Date.now(),
        user: "Alice Smith",
        avatar: "https://i.pravatar.cc/150?u=1",
        text: inputMsg,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInputMsg("");
  };

  if (!inRoom) {
    return (
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Netflix Style Cinema Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
                <Film className="text-red-500" size={32} /> Hangout Cinema
              </h1>
              <p className="text-white/60">Discord Watch Together & Rave quality synchronized movie rooms for the squad.</p>
            </div>
            <button
              onClick={() => {
                setInRoom(true);
                toast.success("Created Watch Party Room 🍿");
              }}
              className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-[0_0_25px_-5px_rgba(239,68,68,0.5)] transition-all cursor-pointer"
            >
              <Plus size={18} /> Host Watch Party
            </button>
          </div>

          {/* Hero Netflix Watch Card */}
          <div className="relative rounded-3xl overflow-hidden glass border border-white/10 p-8 sm:p-12 bg-gradient-to-r from-red-950/40 via-[#0A0E1A] to-indigo-950/40 shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <MonitorPlay size={240} className="text-red-500" />
            </div>
            <div className="relative z-10 max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold">
                <Sparkles size={14} /> Synchronized Playback & WebRTC Livekit
              </div>
              <h2 className="text-4xl font-bold font-heading text-white">Watch Movies, YouTube & Clips Together</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Stream synchronized videos with zero lag. Enjoy high-quality voice chat, webcam video tiles, floating emoji reactions, and shared queue voting.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setInRoom(true)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-sm shadow-glow-accent transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play size={18} fill="currentColor" /> Start Room Now
                </button>
              </div>
            </div>
          </div>

          {/* Featured Queue Preview */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-heading">Popular Squad Rooms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Squad Friday Movie Night 🍿", host: "Sarah", count: 4, type: "YouTube Sync" },
                { title: "Anime Binge Watch ⚔️", host: "Mike", count: 3, type: "Media Library" },
                { title: "Lo-Fi Music Stream 🎧", host: "Emma", count: 6, type: "YouTube Sync" },
              ].map((room, i) => (
                <div key={i} className="glass p-6 rounded-2xl border border-white/10 hover:border-red-500/50 transition-all group space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/60 font-semibold">{room.type}</span>
                    <span className="text-xs text-red-400 font-semibold flex items-center gap-1">● {room.count} watching</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">{room.title}</h4>
                    <p className="text-xs text-white/50">Hosted by {room.host}</p>
                  </div>
                  <button
                    onClick={() => {
                      setInRoom(true);
                      toast.success(`Joined ${room.title}!`);
                    }}
                    className="w-full py-2 bg-white/5 hover:bg-red-600/80 text-white rounded-xl text-xs font-semibold border border-white/10 hover:border-transparent transition-all"
                  >
                    Join Cinema Room
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Active Cinema Room Interface
  return (
    <div className={`flex-1 flex flex-col h-full bg-[#0A0E1A] overflow-hidden ${isTheaterMode ? "p-0" : "p-6"}`}>
      
      {/* Room Navigation Header */}
      {!isTheaterMode && (
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setInRoom(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 transition-colors text-xs font-semibold cursor-pointer"
            >
              ← Leave Room
            </button>
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <Film size={22} className="text-red-500" /> Squad Movie Night 🍿
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTheaterMode(true)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Maximize size={15} /> Theater Mode
            </button>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              <Shield size={14} /> Host: You
            </div>
          </div>
        </div>
      )}

      {/* Main Cinema Workspace Grid */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden relative">
        
        {/* Left: Synchronized Video Player & YouTube Search */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden relative">
          
          {/* Main Video Screen Container */}
          <div className="relative flex-1 rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center group">
            
            {/* Embedded YouTube / Video Player */}
            <iframe
              src={videoUrl}
              className="w-full h-full border-0 pointer-events-auto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Floating Emoji Reactions Overlay Container */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              <AnimatePresence>
                {floatingEmojis.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1, y: 300, scale: 0.8 }}
                    animate={{ opacity: 0, y: -100, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                    style={{ left: `${item.x}%` }}
                    className="absolute bottom-10 text-4xl"
                  >
                    {item.emoji}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Floating LiveKit Camera Video Grid (Overlay in Player Top Right) */}
            <div className="absolute top-4 right-4 z-30 flex gap-2">
              {[
                { name: "You", avatar: "https://i.pravatar.cc/150?u=1", isSpeaking: true },
                { name: "Sarah", avatar: "https://i.pravatar.cc/150?u=2", isSpeaking: false },
              ].map((p, i) => (
                <div key={i} className={`w-14 h-14 rounded-xl overflow-hidden relative border-2 ${p.isSpeaking ? "border-emerald-400 shadow-glow-primary" : "border-white/20"} bg-slate-900`}>
                  <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
              ))}
            </div>

            {/* Theater Mode Exit Button */}
            {isTheaterMode && (
              <button
                onClick={() => setIsTheaterMode(false)}
                className="absolute top-4 left-4 z-30 px-3 py-1.5 bg-black/70 hover:bg-black text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors backdrop-blur-md cursor-pointer"
              >
                Exit Theater Mode
              </button>
            )}

            {/* Control Bar Overlay on Player Bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-4 z-30">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayPause}
                  className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                </button>
                <button
                  onClick={() => {
                    if (queue.length > 0) {
                      setVideoUrl(queue[0].url);
                      setQueue(queue.slice(1));
                      toast.success("Skipped to next movie in queue! 🎬");
                    }
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <SkipForward size={18} />
                </button>
                <span className="text-xs text-white/70 font-mono">03:45 / 12:30</span>
              </div>

              {/* Floating Reaction Trigger Buttons */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10">
                {["🍿", "❤️", "🔥", "😂", "👏"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => triggerReaction(emoji)}
                    className="hover:scale-125 transition-transform text-lg p-1 cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* WebRTC LiveKit Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsMicOn(!isMicOn);
                    toast.success(isMicOn ? "Microphone Muted" : "Microphone Unmuted");
                  }}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${isMicOn ? "bg-white/10 text-white" : "bg-red-500/20 text-red-400"}`}
                >
                  {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
                </button>
                <button
                  onClick={() => {
                    setIsVideoOn(!isVideoOn);
                    toast.success(isVideoOn ? "Camera Turned Off" : "Camera Turned On");
                  }}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${isVideoOn ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white"}`}
                >
                  {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
                </button>
              </div>
            </div>

          </div>

          {/* YouTube Search Bar & Video URL Input */}
          {!isTheaterMode && (
            <div className="glass p-4 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Youtube size={18} className="text-red-500" /> Search YouTube & Media Web Streams
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSearchMode("search")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      searchMode === "search" ? "bg-red-600 text-white" : "bg-white/5 text-white/60"
                    }`}
                  >
                    YouTube Search
                  </button>
                  <button
                    onClick={() => setSearchMode("url")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      searchMode === "url" ? "bg-red-600 text-white" : "bg-white/5 text-white/60"
                    }`}
                  >
                    Paste Direct URL
                  </button>
                </div>
              </div>

              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder={searchMode === "search" ? "Search YouTube for trailers, music, movies..." : "Paste YouTube or MP4 video URL here..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-500/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow-accent transition-colors cursor-pointer"
                >
                  {searchMode === "search" ? "Search" : "Play URL"}
                </button>
              </form>

              {/* YouTube Search Results Grid */}
              {searchMode === "search" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-36 overflow-y-auto custom-scrollbar">
                  {searchResults.map((res, i) => (
                    <div key={i} className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 hover:bg-white/10 transition-colors">
                      <div className="truncate text-xs">
                        <p className="font-semibold text-white truncate">{res.title}</p>
                        <p className="text-[10px] text-white/40">{res.channel} • {res.views}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => playVideoNow(res)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Play Now
                        </button>
                        <button
                          onClick={() => addToQueue(res)}
                          className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          + Queue
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right: Shared Queue & Live Room Chat Sidebars */}
        {!isTheaterMode && (
          <div className="w-full lg:w-80 flex flex-col gap-4 overflow-hidden">
            
            {/* Shared Queue Panel */}
            <div className="glass p-4 rounded-2xl border border-white/10 space-y-3 flex-shrink-0">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers size={14} className="text-red-400" /> Shared Movie Queue ({queue.length})
              </h3>
              <div className="space-y-2 max-h-44 overflow-y-auto custom-scrollbar">
                {queue.map((item) => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                    <div className="truncate pr-2">
                      <p className="font-semibold text-white truncate">{item.title}</p>
                      <p className="text-[10px] text-white/50">Added by {item.addedBy}</p>
                    </div>
                    <button
                      onClick={() => {
                        setQueue(queue.map(q => q.id === item.id ? { ...q, votes: q.votes + 1 } : q));
                        toast.success("Upvoted next movie! 👍");
                      }}
                      className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                    >
                      <ThumbsUp size={12} /> {item.votes}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Room Chat Panel */}
            <div className="glass p-4 rounded-2xl border border-white/10 flex-1 flex flex-col overflow-hidden">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <MessageSquare size={14} className="text-red-400" /> Live Cinema Chat
              </h3>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
                {messages.map((m) => (
                  <div key={m.id} className="flex gap-2.5 items-start text-xs">
                    <img src={m.avatar} alt={m.user} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{m.user}</span>
                        <span className="text-[10px] text-white/40">{m.time}</span>
                      </div>
                      <p className="text-white/80 mt-0.5">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Chat with squad..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-500/50 transition-all"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
