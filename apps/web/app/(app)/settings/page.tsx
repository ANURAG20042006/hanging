"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, Smartphone, Monitor, Tablet, Laptop, Key, LogOut, 
  Download, Wifi, WifiOff, Bell, User, Lock, Sparkles, Check, RefreshCw
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePWA } from "@/hooks/usePWA";

export default function SettingsPage() {
  const { isOffline, isInstallable, triggerInstall } = usePWA();
  const [activeTab, setActiveTab] = useState<"devices" | "security" | "profile" | "pwa">("devices");
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  // Active Device Sessions State
  const [sessions, setSessions] = useState([
    { id: "s1", name: "Chrome Web App (Current)", platform: "Web / Windows", ip: "192.168.1.42", location: "Goa, India 🇮🇳", lastActive: "Active Now", isCurrent: true, icon: Monitor },
    { id: "s2", name: "iPhone 15 Pro (Face ID)", platform: "iOS App / PWA", ip: "10.0.0.12", location: "Goa, India 🇮🇳", lastActive: "10 mins ago", isCurrent: false, icon: Smartphone },
    { id: "s3", name: "MacBook Pro Electron", platform: "Desktop App", ip: "192.168.1.18", location: "Goa, India 🇮🇳", lastActive: "2 hours ago", isCurrent: false, icon: Laptop },
  ]);

  const handleRemoteLogout = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
    toast.success("Remote device logged out successfully! 🔒");
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" size={32} /> Device Management & Security
            </h1>
            <p className="text-white/60 text-sm">Manage connected Android, iOS, Desktop, and PWA devices, active sessions, and biometric authorization.</p>
          </div>
          
          {/* PWA Network Status Badge */}
          <div className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border ${
            isOffline ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
          }`}>
            {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
            <span>{isOffline ? "Offline Caching Mode" : "Universal Sync Active"}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-4">
          {[
            { id: "devices", label: "Connected Devices (3)", icon: Smartphone },
            { id: "security", label: "Biometrics & Security", icon: Key },
            { id: "pwa", label: "PWA & Offline Caching", icon: Download },
            { id: "profile", label: "User Profile", icon: User },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id ? "bg-emerald-600 text-white shadow-glow-primary" : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <tab.icon size={15} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: CONNECTED DEVICES & REMOTE LOGOUT */}
        {activeTab === "devices" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white font-heading">Active Device Sessions</h3>
              <button
                onClick={() => {
                  setSessions(sessions.filter((s) => s.isCurrent));
                  toast.success("Logged out from all remote devices!");
                }}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white rounded-xl text-xs font-bold border border-red-500/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <LogOut size={14} /> Log Out All Other Devices
              </button>
            </div>

            <div className="space-y-4">
              {sessions.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                      <s.icon size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{s.name}</h4>
                        {s.isCurrent && <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">THIS DEVICE</span>}
                      </div>
                      <p className="text-xs text-white/50">{s.platform} • IP: {s.ip} • {s.location}</p>
                    </div>
                  </div>

                  {!s.isCurrent && (
                    <button
                      onClick={() => handleRemoteLogout(s.id)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-red-600 text-white/70 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <LogOut size={13} /> Remote Logout
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BIOMETRICS & SECURITY */}
        {activeTab === "security" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Biometric Authentication & Passkeys</h3>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-base">Face ID / Touch ID / Biometric Lock</h4>
                <p className="text-xs text-white/60 mt-1">Require biometric fingerprint or Face ID verification to open Hangout on mobile & PWA.</p>
              </div>
              <button
                onClick={() => {
                  setBiometricsEnabled(!biometricsEnabled);
                  toast.success(`Biometric Authentication ${!biometricsEnabled ? "Enabled" : "Disabled"}`);
                }}
                className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${biometricsEnabled ? "bg-emerald-600" : "bg-white/20"}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform ${biometricsEnabled ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: PWA & OFFLINE CACHING */}
        {activeTab === "pwa" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">Progressive Web App (PWA) Status</h3>
                <p className="text-xs text-white/60 mt-1">Offline caching, background sync queue, and standalone app installation.</p>
              </div>
              <button onClick={triggerInstall} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-glow-primary">
                <Download size={16} /> Install Hangout App
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 font-bold uppercase">Service Worker</span>
                <p className="text-xs font-bold text-emerald-400">Active & Registered 🟢</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 font-bold uppercase">Offline Cache</span>
                <p className="text-xs font-bold text-cyan-400">21 App Routes Pre-cached</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 font-bold uppercase">Background Sync Queue</span>
                <p className="text-xs font-bold text-amber-400">0 Pending Packets</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: USER PROFILE */}
        {activeTab === "profile" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Profile Settings</h3>
            <div className="flex items-center gap-6">
              <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="w-20 h-20 rounded-full border-2 border-emerald-500 object-cover" />
              <div className="space-y-1">
                <h4 className="font-bold text-white text-lg">Alice Smith</h4>
                <p className="text-xs text-emerald-400">alice@hangout.app • Member since 2025</p>
                <button onClick={() => toast.success("Avatar updated!")} className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold cursor-pointer mt-2">
                  Change Avatar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
