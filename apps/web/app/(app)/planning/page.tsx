"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, MapPin, DollarSign, CheckSquare, Sparkles, Plus, 
  Users, Vote, FileText, Globe, Clock, Gift, Heart, Send, Lock, Unlock, 
  Search, Bell, Bot, Flame, Shield, ArrowRight, Check, X, Plane, Building, Hotel
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PlanningPage() {
  const [activeTab, setActiveTab] = useState<
    "reunions" | "trips" | "events" | "calendar" | "polls" | "docs" | "expenses" | "bucket" | "memory_wall" | "yearbook" | "capsule" | "map" | "birthday" | "ai"
  >("reunions");

  // State for AI Planner Input
  const [aiDestination, setAiDestination] = useState("Goa, India");
  const [aiDays, setAiDays] = useState(3);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // State for New Modals
  const [isCreateReunionOpen, setIsCreateReunionOpen] = useState(false);

  // Sample Data for Modules
  const reunions = [
    {
      id: "r1",
      title: "Annual Squad Reunion 2026 🏙️",
      city: "Goa, India",
      venue: "Taj Exotica Resort & Spa",
      dates: "Oct 15 - Oct 18, 2026",
      rsvps: { going: 8, maybe: 2 },
      budget: "$2,500 Total",
      countdown: "68 Days",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    }
  ];

  const trips = [
    {
      id: "t1",
      destination: "Tokyo & Kyoto, Japan 🏯",
      weather: "Sunny 22°C",
      hotel: "Shinjuku Granbell Hotel",
      flight: "Japan Airlines JL708 (10:30 AM)",
      places: ["Shibuya Crossing", "Fushimi Inari Shrine", "Akihabara Tech District"],
      packing: ["Passport 🛂", "Universal Adapter 🔌", "Walking Shoes 👟"],
      budget: "$3,400 Total",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070",
    }
  ];

  const calendarEvents = [
    { id: "e1", title: "Sarah's 25th Birthday Party 🎉", date: "Aug 15, 2026", category: "Birthday", color: "from-amber-500 to-red-500" },
    { id: "e2", title: "Squad Game Night 🎮", date: "Aug 18, 2026", category: "Game Night", color: "from-cyan-500 to-blue-500" },
    { id: "e3", title: "Goa Reunion 2026 🌴", date: "Oct 15, 2026", category: "Reunion", color: "from-emerald-500 to-teal-500" },
  ];

  const polls = [
    {
      id: "p1",
      question: "Which movie are we watching in Cinema Room tonight? 🍿",
      type: "Single Choice",
      options: [
        { text: "Inception 🌀", votes: 9, percent: 60 },
        { text: "Interstellar 🚀", votes: 4, percent: 27 },
        { text: "The Dark Knight 🦇", votes: 2, percent: 13 },
      ],
    }
  ];

  const docs = [
    {
      id: "d1",
      title: "Goa Trip Itinerary & Packing Guide 📝",
      author: "Alice Smith",
      updated: "2 hours ago",
      snippet: "Flight details, villa rules, and daily water sports schedule...",
    }
  ];

  const expenses = [
    { id: "x1", title: "Goa Resort Deposit 🏨", amount: "$1,200", paidBy: "Alice Smith", splitWith: "4 friends", status: "Unsettled" },
    { id: "x2", title: "Scuba Diving Pass 🤿", amount: "$480", paidBy: "Mike Ross", splitWith: "3 friends", status: "Settled" },
  ];

  const bucketList = [
    { id: "b1", title: "Scuba Dive in Lakshadweep 🤿", category: "Adventure", completed: true },
    { id: "b2", title: "Road Trip to Ladakh 🏍️", category: "Travel", completed: false },
    { id: "b3", title: "Watch Cricket World Cup Final 🏏", category: "Sports", completed: false },
    { id: "b4", title: "Camping under Northern Lights 🌌", category: "Nature", completed: false },
  ];

  const memoryPosts = [
    { id: "m1", author: "Sarah Jenkins", type: "Photo", media: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070", caption: "Best bonfire night with the squad! 🔥❤️", pinned: true },
    { id: "m2", author: "Alice Smith", type: "Letter", media: null, caption: "To my best friends: 5 years of memories and many more to come! 🥂", pinned: false },
  ];

  const timeCapsules = [
    { id: "tc1", title: "Squad 2026 Predictions 🔮", author: "Mike Ross", unlock: "Jan 1, 2027", status: "Sealed 🔒" },
    { id: "tc2", title: "College Graduation Memories 🎓", author: "Alice Smith", unlock: "Unlocked Jun 2025", status: "Open 🔓" },
  ];

  // AI Itinerary Trigger
  const handleGenerateAi = async () => {
    setIsAiLoading(true);
    toast.success("AI generating travel itinerary...");
    setTimeout(() => {
      setAiResult({
        destination: aiDestination,
        days: aiDays,
        summary: `Custom ${aiDays}-day itinerary for ${aiDestination} designed for friend squads!`,
        daysList: [
          { day: 1, title: "Arrival & Rooftop Sunset 🍸", detail: "Check-in to resort, welcome drinks, and evening beach walk." },
          { day: 2, title: "Water Sports & Scuba 🤿", detail: "Morning scuba diving followed by local seafood lunch & bonfire night." },
          { day: 3, title: "Sightseeing & Squad Party 🎶", detail: "Explore historical forts, local markets, and night club celebration." },
        ],
        budget: "$450 / person",
        packing: ["Sunscreen 🧴", "Swimwear 🩳", "Camera 📷", "Power Bank 🔋"],
      });
      setIsAiLoading(false);
      toast.success("AI Itinerary Generated! 🤖");
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
              <CalendarIcon className="text-violet-400" size={32} /> Life Collaboration & Planning Hub
            </h1>
            <p className="text-white/60 text-sm">Plan reunions, trips, events, expenses, shared docs, bucket lists, and yearbooks together.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("ai")}
              className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-glow-primary transition-all cursor-pointer flex items-center gap-2"
            >
              <Bot size={16} /> AI Trip Planner
            </button>
            <button
              onClick={() => {
                setIsCreateReunionOpen(true);
                toast.success("New Event Modal Opened!");
              }}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-glow-primary transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus size={16} /> Plan New Event
            </button>
          </div>
        </div>

        {/* 14 Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
          {[
            { id: "reunions", label: "Reunions", icon: MapPin },
            { id: "trips", label: "Trips", icon: Plane },
            { id: "events", label: "Events", icon: CalendarIcon },
            { id: "calendar", label: "Calendar", icon: Clock },
            { id: "polls", label: "Polls & Voting", icon: Vote },
            { id: "docs", label: "Shared Docs", icon: FileText },
            { id: "expenses", label: "Expense Split", icon: DollarSign },
            { id: "bucket", label: "Bucket List", icon: CheckSquare },
            { id: "memory_wall", label: "Memory Wall", icon: Heart },
            { id: "yearbook", label: "Yearbook", icon: Sparkles },
            { id: "capsule", label: "Time Capsule", icon: Lock },
            { id: "birthday", label: "Birthdays", icon: Gift },
            { id: "ai", label: "AI Planner 🤖", icon: Bot },
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

        {/* TAB 1: REUNION PLANNER */}
        {activeTab === "reunions" && (
          <div className="space-y-6">
            {reunions.map((r) => (
              <div key={r.id} className="glass p-6 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 h-56 rounded-2xl overflow-hidden relative">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 font-bold text-xs">
                    ⏳ {r.countdown}
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-2xl font-bold text-white font-heading">{r.title}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-white/40 uppercase font-bold">City</span>
                      <p className="text-xs font-bold text-cyan-400 mt-1">{r.city}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-white/40 uppercase font-bold">Venue</span>
                      <p className="text-xs font-bold text-white mt-1">{r.venue}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-white/40 uppercase font-bold">Dates</span>
                      <p className="text-xs font-bold text-white mt-1">{r.dates}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-white/40 uppercase font-bold">Budget</span>
                      <p className="text-xs font-bold text-emerald-400 mt-1">{r.budget}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => toast.success("RSVP Confirmed: Going! 🎉")} className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer">
                      RSVP: Going (8)
                    </button>
                    <button onClick={() => toast.success("RSVP Confirmed: Maybe 🤔")} className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer">
                      Maybe (2)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: TRIP PLANNER */}
        {activeTab === "trips" && (
          <div className="space-y-6">
            {trips.map((t) => (
              <div key={t.id} className="glass p-6 rounded-3xl border border-white/10 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-heading">{t.destination}</h3>
                    <p className="text-xs text-white/50">Weather: {t.weather} • Total Budget: {t.budget}</p>
                  </div>
                  <button onClick={() => toast.success("Trip Schedule Opened!")} className="px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold cursor-pointer">
                    View Daily Schedule
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <h4 className="font-bold text-cyan-400 text-sm flex items-center gap-2"><Hotel size={16} /> Hotel Details</h4>
                    <p className="text-xs text-white">{t.hotel}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <h4 className="font-bold text-violet-400 text-sm flex items-center gap-2"><Plane size={16} /> Flight Details</h4>
                    <p className="text-xs text-white">{t.flight}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2"><CheckSquare size={16} /> Packing Checklist</h4>
                    <p className="text-xs text-white/80">{t.packing.join(" • ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: GROUP CALENDAR */}
        {activeTab === "calendar" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Squad Group Calendar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {calendarEvents.map((e) => (
                <div key={e.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${e.color}`}>
                    {e.category}
                  </span>
                  <h4 className="font-bold text-white text-base">{e.title}</h4>
                  <p className="text-xs text-white/50">{e.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: POLLS & VOTING */}
        {activeTab === "polls" && (
          <div className="space-y-6">
            {polls.map((p) => (
              <div key={p.id} className="glass p-6 rounded-3xl border border-white/10 space-y-4">
                <h4 className="font-bold text-white text-lg font-heading">{p.question}</h4>
                <div className="space-y-3">
                  {p.options.map((opt, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs text-white font-semibold">
                        <span>{opt.text}</span>
                        <span>{opt.votes} Votes ({opt.percent}%)</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden cursor-pointer" onClick={() => toast.success(`Voted for ${opt.text}!`)}>
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${opt.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: SHARED DOCUMENTS */}
        {activeTab === "docs" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white font-heading">Collaborative Squad Notes</h3>
              <button onClick={() => toast.success("New Doc Created!")} className="px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold cursor-pointer">
                + New Document
              </button>
            </div>
            {docs.map((d) => (
              <div key={d.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-base">{d.title}</h4>
                <p className="text-xs text-white/50">Author: {d.author} • Updated {d.updated}</p>
                <p className="text-xs text-white/80">{d.snippet}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: EXPENSE SPLIT (SPLITWISE) */}
        {activeTab === "expenses" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Expense Split & Balances</h3>
            <div className="space-y-4">
              {expenses.map((x) => (
                <div key={x.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-sm">{x.title}</h4>
                    <p className="text-xs text-white/50">Paid by <strong className="text-cyan-400">{x.paidBy}</strong> • Split with {x.splitWith}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-emerald-400 text-base">{x.amount}</span>
                    <button onClick={() => toast.success(`Expense ${x.title} Settled!`)} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer">
                      Settle Up
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SQUAD BUCKET LIST */}
        {activeTab === "bucket" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Squad Bucket List</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bucketList.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${b.completed ? "bg-emerald-500 text-black" : "bg-white/10 text-white/40"}`}>
                      {b.completed ? "✓" : ""}
                    </div>
                    <span className={`text-sm font-bold ${b.completed ? "line-through text-white/50" : "text-white"}`}>{b.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 px-2 py-1 rounded-full bg-cyan-950/40">{b.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: MEMORY WALL */}
        {activeTab === "memory_wall" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memoryPosts.map((m) => (
              <div key={m.id} className="glass p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold">👤</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{m.author}</h4>
                    <span className="text-[10px] text-white/50">{m.type} Post</span>
                  </div>
                </div>
                {m.media && <img src={m.media} alt="Memory" className="w-full h-48 object-cover rounded-2xl" />}
                <p className="text-xs text-white/80">{m.caption}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 9: TIME CAPSULE */}
        {activeTab === "capsule" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {timeCapsules.map((tc) => (
              <div key={tc.id} className="glass p-6 rounded-3xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-base">{tc.title}</h4>
                  <span className="text-xs font-bold text-amber-400">{tc.status}</span>
                </div>
                <p className="text-xs text-white/50">Created by {tc.author} • Unlocks on {tc.unlock}</p>
                <button onClick={() => toast.success(`Time Capsule unlocks on ${tc.unlock}!`)} className="w-full py-2 bg-white/10 text-white rounded-xl text-xs font-bold cursor-pointer">
                  Inspect Capsule Wax Seal 🕯️
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 10: AI ASSISTED TRIP PLANNER */}
        {activeTab === "ai" && (
          <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white font-heading flex items-center gap-2"><Bot className="text-violet-400" /> AI Travel Itinerary & Budget Generator</h3>
              <p className="text-xs text-white/60 mt-1">Let Gemini AI automatically build travel schedules, budget breakdowns, and packing checklists for your friend squad.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-white/70 block mb-1">Destination</label>
                <input
                  type="text"
                  value={aiDestination}
                  onChange={(e) => setAiDestination(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-white/70 block mb-1">Number of Days</label>
                <input
                  type="number"
                  value={aiDays}
                  onChange={(e) => setAiDays(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleGenerateAi}
                  disabled={isAiLoading}
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-glow-primary transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} /> {isAiLoading ? "Generating..." : "Generate AI Plan"}
                </button>
              </div>
            </div>

            {aiResult && (
              <div className="p-6 rounded-2xl bg-white/5 border border-violet-500/30 space-y-4">
                <h4 className="font-bold text-violet-300 text-lg">{aiResult.summary}</h4>
                <p className="text-xs text-emerald-400 font-bold">Estimated Cost: {aiResult.budget}</p>
                <div className="space-y-3">
                  {aiResult.daysList.map((d: any) => (
                    <div key={d.day} className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <strong className="text-cyan-400">Day {d.day}: {d.title}</strong>
                      <p className="text-white/70 mt-1">{d.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
