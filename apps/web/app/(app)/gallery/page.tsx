"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, Search, Filter, Heart, MessageCircle, Sparkles, X, FolderHeart, Calendar, Film, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useUIStore } from "@/store/ui.store";
import toast from "react-hot-toast";

export default function GalleryPage() {
  const { setUploadModal } = useUIStore();
  const [activeTab, setActiveTab] = useState<"all" | "albums" | "favorites" | "videos">("all");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [likes, setLikes] = useState<Record<number, number>>({ 1: 12, 2: 8, 3: 15, 4: 5, 5: 9 });
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  const photos = [
    { id: 1, url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070", title: "Bali Trip 🏖️", date: "August 2026", album: "Summer Vacations", isFavorite: true },
    { id: 2, url: "https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?q=80&w=2070", title: "Emma's Birthday 🎉", date: "July 2026", album: "Birthdays", isFavorite: false },
    { id: 3, url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=2070", title: "Weekend Roadtrip 🚗", date: "June 2026", album: "Roadtrips", isFavorite: true },
    { id: 4, url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974", title: "Concert Night 🎸", date: "May 2026", album: "Events", isFavorite: false },
    { id: 5, url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070", title: "Graduation Party 🎓", date: "April 2026", album: "Milestones", isFavorite: true },
  ];

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedMap[id];
    setLikedMap({ ...likedMap, [id]: !isLiked });
    setLikes({ ...likes, [id]: (likes[id] || 0) + (isLiked ? -1 : 1) });
    toast.success(isLiked ? "Removed like" : "Added like ❤️");
  };

  const filteredPhotos = photos.filter((p) => {
    if (activeTab === "favorites") return p.isFavorite;
    if (activeTab === "albums") return !!p.album;
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Memory Gallery</h1>
            <p className="text-white/60">Relive the best moments with The Squad in Google Photos quality.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setUploadModal(true)}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-glow-primary transition-all cursor-pointer"
            >
              <Upload size={16} /> Upload Memory
            </button>
          </div>
        </div>

        {/* Navigation Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
          {[
            { id: "all", label: "All Photos", icon: ImageIcon },
            { id: "albums", label: "Shared Albums", icon: FolderHeart },
            { id: "favorites", label: "Favorites", icon: Heart },
            { id: "videos", label: "Videos", icon: Film },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
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

        {/* On This Day Card */}
        <div className="glass-card p-6 border-l-4 border-l-violet-500 relative overflow-hidden group rounded-2xl">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={120} className="text-violet-400" />
           </div>
           <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                 <img src={photos[0].url} className="w-full h-full object-cover" alt="On this day" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 font-heading">
                  <Sparkles size={20} className="text-violet-400" /> On This Day — 1 Year Ago
                </h3>
                <p className="text-white/80 mb-4 text-sm">You and 3 others went to Bali exactly 1 year ago. 42 photos in album.</p>
                <button 
                  onClick={() => setSelectedPhoto(photos[0])}
                  className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl font-semibold transition-colors text-white"
                >
                  View Memory Album
                </button>
              </div>
           </div>
        </div>

        {/* Masonry Photo Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredPhotos.map((photo, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 break-inside-avoid cursor-pointer shadow-lg"
            >
              <img src={photo.url} alt={photo.title} className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-white text-sm">{photo.title}</h3>
                    <p className="text-[11px] text-white/70">{photo.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => handleLike(photo.id, e)}
                      className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                        likedMap[photo.id] ? "bg-rose-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <Heart size={15} fill={likedMap[photo.id] ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Comments opened!");
                      }}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors text-white"
                    >
                      <MessageCircle size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Popover */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden bg-[#0D1222] border border-white/10 shadow-2xl flex flex-col relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex-1 overflow-hidden bg-black flex items-center justify-center">
                <img src={selectedPhoto.url} alt={selectedPhoto.title} className="max-w-full max-h-[70vh] object-contain" />
              </div>
              <div className="p-4 bg-[#0D1222] border-t border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">{selectedPhoto.title}</h3>
                  <p className="text-xs text-white/50">{selectedPhoto.date} • {selectedPhoto.album}</p>
                </div>
                <button
                  onClick={(e) => handleLike(selectedPhoto.id, e)}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-primary transition-colors"
                >
                  <Heart size={16} /> Like ({likes[selectedPhoto.id] || 0})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
