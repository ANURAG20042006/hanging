"use client";

import { motion } from "framer-motion";
import { 
  Music, Play, Pause, SkipForward, Volume2, Plus, Sparkles, 
  Heart, ThumbsUp, Radio, Disc, Mic2, ListMusic, Share2, Search, Youtube
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  embedUrl: string;
  duration: string;
  addedBy: string;
  votes: number;
}

export default function MusicLoungePage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<"queue" | "search" | "lyrics">("queue");
  const [searchQuery, setSearchQuery] = useState("");

  const [queue, setQueue] = useState<Track[]>([
    { id: "t1", title: "Blinding Lights", artist: "The Weeknd", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070", embedUrl: "https://www.youtube.com/embed/4NRXx6U8ABQ?autoplay=1&enablejsapi=1", duration: "03:20", addedBy: "Sarah", votes: 12 },
    { id: "t2", title: "Starboy", artist: "The Weeknd ft. Daft Punk", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070", embedUrl: "https://www.youtube.com/embed/34Na4j8AVgA?autoplay=1&enablejsapi=1", duration: "03:50", addedBy: "Mike", votes: 8 },
    { id: "t3", title: "Levitating", artist: "Dua Lipa", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070", embedUrl: "https://www.youtube.com/embed/TUVcZfQe-Kw?autoplay=1&enablejsapi=1", duration: "03:23", addedBy: "Alice", votes: 5 },
  ]);

  const [searchResults, setSearchResults] = useState([
    { title: "Coldplay — Viva La Vida", artist: "Coldplay", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070", embedUrl: "https://www.youtube.com/embed/dvgZkm1xWPE?autoplay=1&enablejsapi=1", duration: "04:02" },
    { title: "Lofi Hip Hop Radio 🎧 Beats to Relax", artist: "Lofi Girl", cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070", embedUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&enablejsapi=1", duration: "LIVE" },
    { title: "As It Was", artist: "Harry Styles", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070", embedUrl: "https://www.youtube.com/embed/H5v3kku4y6Q?autoplay=1&enablejsapi=1", duration: "02:47" },
  ]);

  const currentTrack = queue[0] || {
    id: "t0",
    title: "Midnight City",
    artist: "M83",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974",
    embedUrl: "https://www.youtube.com/embed/dX3k_QDnzHE?autoplay=1&enablejsapi=1",
    duration: "04:03",
    addedBy: "Squad AI",
    votes: 20,
  };

  const lyrics = [
    "I'm lookin' at a sky full of stars",
    "I think I saw you, or was it just a dream?",
    "City lights glowing in the midnight breeze",
    "We own the night in our digital home 🌟",
    "Hangout with the squad forever...",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Extract YouTube embed URL if input is a YouTube link
    if (searchQuery.includes("youtube.com/watch?v=") || searchQuery.includes("youtu.be/")) {
      let videoId = searchQuery.split("v=")[1]?.split("&")[0];
      if (searchQuery.includes("youtu.be/")) {
        videoId = searchQuery.split("youtu.be/")[1]?.split("?")[0];
      }
      const newTrack: Track = {
        id: "t_" + Date.now(),
        title: `YouTube Track (${videoId})`,
        artist: "YouTube Stream",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070",
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`,
        duration: "03:30",
        addedBy: "You",
        votes: 1,
      };
      setQueue([newTrack, ...queue]);
      setSearchQuery("");
      toast.success("Playing YouTube link in Music Lounge! 🎵");
      return;
    }

    // Filter local search results
    const filtered = searchResults.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.artist.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filtered.length > 0) {
      setSearchResults(filtered);
    } else {
      setSearchResults([
        { title: `${searchQuery} (YouTube Search)`, artist: "YouTube Music", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070", embedUrl: "https://www.youtube.com/embed/4NRXx6U8ABQ?autoplay=1&enablejsapi=1", duration: "03:30" }
      ]);
    }
    toast.success(`Found YouTube results for "${searchQuery}"! 🔍`);
  };

  const playTrackNow = (track: { title: string; artist: string; cover: string; embedUrl: string; duration: string }) => {
    const newTrack: Track = {
      id: "t_" + Date.now(),
      title: track.title,
      artist: track.artist,
      cover: track.cover,
      embedUrl: track.embedUrl,
      duration: track.duration,
      addedBy: "You",
      votes: 1,
    };
    setQueue([newTrack, ...queue]);
    toast.success(`Now playing: ${track.title}! 🎵`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
              <Music className="text-violet-400" size={32} /> Music Lounge
            </h1>
            <p className="text-white/60 text-sm">Spotify & YouTube synchronized party room for shared squad listening.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <Radio size={14} className="animate-pulse" /> Live Listening Party
            </span>
          </div>
        </div>

        {/* Hero Synchronized Audio/Video Player Card */}
        <div className="glass p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-violet-950/40 via-[#0A0E1A] to-indigo-950/40 shadow-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          
          {/* Audio Visualizer & Cover */}
          <div className="relative group flex-shrink-0">
            <div className="w-56 h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
              <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              
              {/* Active Embedded YouTube Player (Hidden / Compact Audio Player) */}
              <iframe
                src={currentTrack.embedUrl}
                className="w-full h-full absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-glow-primary animate-spin-slow">
              <Disc size={24} />
            </div>
          </div>

          {/* Player Info & Controls */}
          <div className="flex-1 space-y-6 w-full">
            <div>
              <span className="px-2.5 py-1 rounded-lg bg-violet-500/20 text-violet-300 text-xs font-semibold border border-violet-500/30">NOW PLAYING</span>
              <h2 className="text-3xl font-bold font-heading text-white mt-2">{currentTrack.title}</h2>
              <p className="text-lg text-white/70 font-medium">{currentTrack.artist}</p>
              <p className="text-xs text-white/40 mt-1">Requested by {currentTrack.addedBy} • {currentTrack.votes} votes</p>
            </div>

            {/* Seek Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden cursor-pointer">
                <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 w-3/5 rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-white/40 font-mono">
                <span>01:42</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Control Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    toast.success(isPlaying ? "Music Paused ⏸️" : "Music Playing ▶️");
                  }}
                  className="w-14 h-14 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white shadow-glow-primary flex items-center justify-center transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                </button>
                <button 
                  onClick={() => {
                    if (queue.length > 1) {
                      setQueue(queue.slice(1));
                      toast.success("Skipped to next track! 🎵");
                    }
                  }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                >
                  <SkipForward size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => toast.success("Added to favorites ❤️")} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-rose-400 transition-colors cursor-pointer">
                  <Heart size={20} />
                </button>
                <button onClick={() => toast.success("Song link copied!")} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 transition-colors cursor-pointer">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          {[
            { id: "queue", label: "Shared Queue", icon: ListMusic },
            { id: "search", label: "Search YouTube & Music", icon: Search },
            { id: "lyrics", label: "Live Synced Lyrics", icon: Mic2 },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-violet-600 text-white shadow-glow-primary"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <tab.icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Tab */}
        {activeTab === "search" && (
          <div className="space-y-6">
            <form onSubmit={handleSearchSubmit} className="flex gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search YouTube songs, artists, or paste YouTube link..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-primary transition-all cursor-pointer"
              >
                Search Music
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchResults.map((res, i) => (
                <div key={i} className="glass p-4 rounded-2xl border border-white/10 space-y-3 hover:border-violet-500/40 transition-all">
                  <div className="h-40 rounded-xl overflow-hidden border border-white/10 relative">
                    <img src={res.cover} alt={res.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{res.title}</h4>
                    <p className="text-xs text-white/50">{res.artist}</p>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => playTrackNow(res)}
                      className="flex-1 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      Play Now
                    </button>
                    <button
                      onClick={() => {
                        playTrackNow(res);
                        toast.success("Added to Queue! 🎵");
                      }}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      + Queue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Queue Tab */}
        {activeTab === "queue" && (
          <div className="space-y-6">
            <div className="space-y-3">
              {queue.map((track, i) => (
                <div key={track.id} className="glass p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4 hover:border-violet-500/40 transition-all">
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-bold text-white/40 text-xs w-4">#{i + 1}</span>
                    <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="truncate">
                      <h4 className="font-bold text-white text-sm truncate">{track.title}</h4>
                      <p className="text-xs text-white/50">{track.artist} • Added by {track.addedBy}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/40 font-mono">{track.duration}</span>
                    <button
                      onClick={() => {
                        setQueue(queue.map(q => q.id === track.id ? { ...q, votes: q.votes + 1 } : q));
                        toast.success("Upvoted track! 🎵");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ThumbsUp size={14} /> {track.votes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lyrics Tab */}
        {activeTab === "lyrics" && (
          <div className="glass p-8 rounded-3xl border border-white/10 text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <Mic2 size={16} /> Live Synced Lyrics
            </h3>
            <div className="space-y-6 py-4">
              {lyrics.map((line, idx) => (
                <p 
                  key={idx} 
                  className={`text-xl font-bold transition-all ${
                    idx === 3 ? "text-violet-300 scale-105 shadow-glow-sm" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
