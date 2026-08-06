"use client";

import { useState, useEffect } from "react";
import { Users, Copy, Check, Gift, Sparkles, Share2, Award } from "lucide-react";

interface ReferralData {
  inviteCode: string;
  inviteUrl: string;
  totalInvitesSent: number;
  successfulClaims: number;
  rewardsEarned: {
    badge: string;
    storageBonusGb: number;
    exclusiveClubhouseSkinsUnlocked: number;
  };
  invitedFriends: Array<{ name: string; avatar: string; joinedAt: string; status: string }>;
}

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState<ReferralData>({
    inviteCode: "HANGOUT-ALEX-8821",
    inviteUrl: "https://hangout.app/invite/HANGOUT-ALEX-8821",
    totalInvitesSent: 12,
    successfulClaims: 8,
    rewardsEarned: {
      badge: "Community Ambassador",
      storageBonusGb: 25,
      exclusiveClubhouseSkinsUnlocked: 3,
    },
    invitedFriends: [
      { name: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150", joinedAt: "2 days ago", status: "Active" },
      { name: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150", joinedAt: "1 week ago", status: "Active" },
      { name: "Sophia Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150", joinedAt: "2 weeks ago", status: "Active" },
    ],
  });

  useEffect(() => {
    fetch("http://localhost:3001/referrals/my-code")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch(() => {});
  }, []);

  const copyInvite = () => {
    navigator.clipboard.writeText(data.inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Referral & Invite Program
        </h1>
        <p className="text-white/40 text-sm mt-1">Invite friends to Hangout and unlock free storage & 3D clubhouse rewards.</p>
      </div>

      {/* Invite Code Generator Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-900/40 to-cyan-900/40 border border-white/15 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-cyan-300 font-mono uppercase tracking-wider block">Your Personal Invite Code</span>
            <div className="text-2xl font-mono font-bold text-white mt-1">{data.inviteCode}</div>
          </div>
          <button
            onClick={copyInvite}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Link Copied!" : "Copy Invite Link"}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-white/70 flex items-center justify-between">
          <span className="truncate">{data.inviteUrl}</span>
          <Share2 className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
        </div>
      </div>

      {/* Stats & Rewards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="p-2.5 rounded-xl bg-violet-500/20 text-violet-400 w-fit">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white">{data.successfulClaims} / {data.totalInvitesSent}</div>
          <p className="text-xs text-white/40">Successful Friend Claims</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 w-fit">
            <Gift className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white">+{data.rewardsEarned.storageBonusGb} GB</div>
          <p className="text-xs text-white/40">Bonus Cloud Memory Storage</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 w-fit">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white">{data.rewardsEarned.badge}</div>
          <p className="text-xs text-white/40">Unlocked Ambassador Badge</p>
        </div>
      </div>

      {/* Invited Friends List */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Joined Friends ({data.invitedFriends.length})</h2>
        <div className="space-y-3">
          {data.invitedFriends.map((friend) => (
            <div key={friend.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <img src={friend.avatar} alt={friend.name} className="w-9 h-9 rounded-full object-cover border border-white/20" />
                <div>
                  <h3 className="text-xs font-bold text-white">{friend.name}</h3>
                  <p className="text-[11px] text-white/40">Joined {friend.joinedAt}</p>
                </div>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-mono">
                {friend.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
