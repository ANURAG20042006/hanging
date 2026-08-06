"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, Clock, Plane, Navigation, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function WorldMapPage() {
  const friendsLocations = [
    { name: "Alice Smith", city: "Tokyo, Japan 🇯🇵", timezone: "JST (UTC+9)", time: "03:40 AM", status: "Online 🟢", lat: "35.6762° N", lng: "139.6503° E" },
    { name: "Sarah Jenkins", city: "New York, USA 🇺🇸", timezone: "EST (UTC-5)", time: "02:40 PM", status: "In Voice Room 🎙️", lat: "40.7128° N", lng: "74.0060° W" },
    { name: "Mike Ross", city: "Goa, India 🇮🇳", timezone: "IST (UTC+5:30)", time: "12:10 AM", status: "Online 🟢", lat: "15.2993° N", lng: "74.1240° E" },
    { name: "Alex Turner", city: "London, UK 🇬🇧", timezone: "GMT (UTC+0)", time: "07:40 PM", status: "Idle 🟡", lat: "51.5074° N", lng: "0.1278° W" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
              <Globe className="text-cyan-400" size={32} /> Squad World Map & Travel History
            </h1>
            <p className="text-white/60 text-sm">Interactive map showing friend locations, timezones, visited places, and upcoming trip pins.</p>
          </div>
          <button onClick={() => toast.success("Location Synced! 📍")} className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2">
            <Navigation size={14} /> Update My Location
          </button>
        </div>

        {/* Map Visualization Card */}
        <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="h-80 rounded-2xl bg-[#09101F] border border-white/10 flex items-center justify-center relative overflow-hidden">
            {/* World Map Visual Overlay Grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="text-center space-y-2 z-10">
              <Globe size={64} className="text-cyan-400 animate-spin-slow mx-auto" />
              <h3 className="text-lg font-bold text-white font-heading">Interactive Squad World Radar</h3>
              <p className="text-xs text-white/50">4 Active Friends Across 4 Global Timezones</p>
            </div>
          </div>

          {/* Friends Timezone Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {friendsLocations.map((f, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">{f.name}</h4>
                  <span className="text-[10px] text-cyan-400 font-bold">{f.status}</span>
                </div>
                <p className="text-xs text-white/70 font-semibold">{f.city}</p>
                <div className="flex justify-between items-center text-[10px] text-white/50 pt-2 border-t border-white/5 font-mono">
                  <span>{f.timezone}</span>
                  <span className="text-amber-400 font-bold">{f.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
