"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Coins, Check, Sparkles, Award, Palette, Crown } from "lucide-react";
import { useUIStore } from "@/store/ui.store";
import toast from "react-hot-toast";

export function ShopModal() {
  const { isShopOpen, setShopOpen } = useUIStore();
  const [activeTab, setActiveTab] = useState<"missions" | "shop">("missions");
  const [coins, setCoins] = useState(450);

  const missions = [
    { id: "m1", title: "Send 10 Messages in Chat 💬", rewardCoins: 50, rewardXp: 100, completed: true },
    { id: "m2", title: "Play 1 Arcade Game with Squad 🎮", rewardCoins: 100, rewardXp: 200, completed: true },
    { id: "m3", title: "Join Voice Room for 15 Mins 🎧", rewardCoins: 75, rewardXp: 150, completed: false },
    { id: "m4", title: "Watch Movie Night in Cinema 🍿", rewardCoins: 150, rewardXp: 300, completed: false },
    { id: "m5", title: "Upload 1 Memory Photo 📸", rewardCoins: 50, rewardXp: 100, completed: false },
  ];

  const shopItems = [
    { id: "s1", name: "Neon Cyber Avatar Border", price: 200, icon: Crown, type: "Border" },
    { id: "s2", name: "Gold Hero Name Color", price: 150, icon: Palette, type: "Color" },
    { id: "s3", name: "Aurora Glitch Animated Profile", price: 300, icon: Sparkles, type: "Theme" },
    { id: "s4", name: "Legendary Game Master Badge", price: 250, icon: Award, type: "Badge" },
  ];

  const handleBuy = (item: typeof shopItems[0]) => {
    if (coins < item.price) {
      toast.error("Not enough Hangout Coins! Complete daily missions to earn more 🪙");
      return;
    }
    setCoins(coins - item.price);
    toast.success(`Unlocked ${item.name}! 🎉`);
  };

  return (
    <AnimatePresence>
      {isShopOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-2xl rounded-3xl bg-[#0D1222] border border-white/10 p-6 shadow-2xl relative overflow-hidden space-y-6"
          >
            <button
              type="button"
              onClick={() => setShopOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Top Header & Coins Balance */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">Daily Missions & Virtual Shop</h3>
                  <p className="text-xs text-white/50">Earn coins from squad activities and unlock profile rewards</p>
                </div>
              </div>
              
              <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-sm flex items-center gap-2 shadow-glow-accent">
                <Coins size={18} className="fill-amber-400" /> {coins} COINS
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab("missions")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "missions" ? "bg-amber-500 text-black shadow-glow-accent" : "bg-white/5 text-white/60"
                }`}
              >
                Daily Missions Checklist
              </button>
              <button
                onClick={() => setActiveTab("shop")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "shop" ? "bg-violet-600 text-white shadow-glow-primary" : "bg-white/5 text-white/60"
                }`}
              >
                Customization Item Shop
              </button>
            </div>

            {/* Missions Tab */}
            {activeTab === "missions" && (
              <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                {missions.map((m) => (
                  <div key={m.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-xs">{m.title}</h4>
                      <p className="text-[11px] text-amber-400 font-semibold mt-0.5">+{m.rewardCoins} Coins • +{m.rewardXp} XP</p>
                    </div>
                    {m.completed ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                        <Check size={12} /> Claimed
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setCoins(coins + m.rewardCoins);
                          m.completed = true;
                          toast.success(`Claimed +${m.rewardCoins} Coins! 🪙`);
                        }}
                        className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors cursor-pointer"
                      >
                        Claim Reward
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Shop Tab */}
            {activeTab === "shop" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-72 overflow-y-auto custom-scrollbar">
                {shopItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs">{item.name}</h4>
                        <span className="text-[10px] text-white/40 uppercase">{item.type}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBuy(item)}
                      className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-glow-primary"
                    >
                      <Coins size={14} className="fill-amber-400 text-amber-400" /> Unlock for {item.price} Coins
                    </button>
                  </div>
                ))}
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
