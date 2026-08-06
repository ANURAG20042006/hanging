"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, Trophy, Flame, Sparkles, Users, Play, Star, Award, 
  Dices, Brain, HelpCircle, Palette, RefreshCw, X, Check, Activity, Zap, Plus, RotateCw
} from "lucide-react";
import { useState } from "react";
import { useUIStore } from "@/store/ui.store";
import toast from "react-hot-toast";

interface GameItem {
  id: string;
  name: string;
  category: string;
  image: string;
  players: string;
  activeMatches: number;
  icon: any;
  color: string;
}

export default function ArcadePage() {
  const [activeTab, setActiveTab] = useState<"games" | "quiz" | "achievements" | "leaderboard" | "activity">("games");
  const { setGameModal } = useUIStore() as any;
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [leaderboardFilter, setLeaderboardFilter] = useState<"games" | "quiz" | "movies" | "memories">("games");

  // User Profile Progress & XP State
  const userProgress = {
    level: 5,
    xp: 1250,
    nextLevelXp: 2000,
    title: "Squad Challenger 🎮",
    streakDays: 14,
    gamesWon: 12,
  };

  // 11 Arcade Games List
  const games: GameItem[] = [
    { id: "uno", name: "UNO Multiplayer", category: "Cards", image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=2070", players: "2-6", activeMatches: 4, icon: Dices, color: "from-red-500 to-amber-500" },
    { id: "chess", name: "Chess Arena", category: "Strategy", image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=2070", players: "2", activeMatches: 2, icon: Gamepad2, color: "from-indigo-500 to-purple-500" },
    { id: "ludo", name: "Ludo King", category: "Board", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2070", players: "2-4", activeMatches: 3, icon: Dices, color: "from-emerald-500 to-teal-500" },
    { id: "tictactoe", name: "Tic Tac Toe", category: "Casual", image: "https://images.unsplash.com/photo-1668554245700-7987042531a7?q=80&w=2070", players: "2", activeMatches: 5, icon: Zap, color: "from-cyan-500 to-blue-500" },
    { id: "connect4", name: "Connect Four", category: "Board", image: "https://images.unsplash.com/photo-1585504198199-20277593b94f?q=80&w=2070", players: "2", activeMatches: 1, icon: Trophy, color: "from-amber-500 to-orange-500" },
    { id: "pictionary", name: "Pictionary Draw", category: "Drawing", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070", players: "3-8", activeMatches: 2, icon: Palette, color: "from-pink-500 to-rose-500" },
    { id: "memory", name: "Memory Match", category: "Puzzle", image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070", players: "1-4", activeMatches: 0, icon: Brain, color: "from-violet-500 to-purple-500" },
    { id: "rps", name: "Rock Paper Scissors", category: "Casual", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070", players: "2", activeMatches: 6, icon: Sparkles, color: "from-blue-500 to-cyan-500" },
    { id: "quiz", name: "Quiz Arena", category: "Trivia", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070", players: "2-20", activeMatches: 3, icon: HelpCircle, color: "from-violet-600 to-indigo-600" },
    { id: "truth_dare", name: "Truth or Dare", category: "Party", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070", players: "3-10", activeMatches: 4, icon: Flame, color: "from-red-600 to-pink-600" },
    { id: "would_rather", name: "Would You Rather", category: "Party", image: "https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?q=80&w=2070", players: "2-12", activeMatches: 2, icon: Award, color: "from-teal-500 to-emerald-500" },
  ];

  // Group Achievements
  const achievements = [
    { id: "a1", title: "First Movie Night 🍿", desc: "Hosted a watch party with 3+ friends", icon: "🍿", unlocked: true },
    { id: "a2", title: "Game Master 🎮", desc: "Won 10 multiplayer arcade matches", icon: "🎮", unlocked: true },
    { id: "a3", title: "Quiz Champion 🏆", desc: "Scored 100% on a squad trivia quiz", icon: "🏆", unlocked: true },
    { id: "a4", title: "Night Owl 🦉", desc: "Stayed active in voice room past 2 AM", icon: "🦉", unlocked: true },
    { id: "a5", title: "100 Memories 📸", desc: "Uploaded 100 photos to squad gallery", icon: "📸", unlocked: false },
    { id: "a6", title: "Streak Master 🔥", desc: "Maintained a 30-day squad activity streak", icon: "🔥", unlocked: false },
  ];

  // Leaderboard Data
  const leaderboards = [
    { rank: 1, name: "Alice Smith", avatar: "https://i.pravatar.cc/150?u=1", score: 42, title: "Squad Champion 🏆" },
    { rank: 2, name: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?u=2", score: 38, title: "UNO Master 🎴" },
    { rank: 3, name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=3", score: 29, title: "Quiz Wizard 🧙" },
    { rank: 4, name: "Emma Watson", avatar: "https://i.pravatar.cc/150?u=4", score: 24, title: "Night Owl 🦉" },
  ];

  // Real-Time Activity Feed
  const activityFeed = [
    { user: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?u=2", action: "won UNO match 🎴", target: "UNO Arena", time: "5 mins ago" },
    { user: "Alice Smith", avatar: "https://i.pravatar.cc/150?u=1", action: "uploaded 12 photos 📸", target: "Summer Vacation 2026", time: "20 mins ago" },
    { user: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=3", action: "created new quiz 🧠", target: "Marvel Cinematic Universe Trivia", time: "1 hour ago" },
  ];

  // GAME STATES & LOGIC FOR ALL GAMES
  
  // Tic-Tac-Toe
  const [ticBoard, setTicBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [ticWinner, setTicWinner] = useState<string | null>(null);

  // Rock Paper Scissors
  const [rpsResult, setRpsResult] = useState<string | null>(null);
  const [userRps, setUserRps] = useState<string | null>(null);
  const [aiRps, setAiRps] = useState<string | null>(null);

  // Ludo Dice
  const [diceVal, setDiceVal] = useState<number | null>(6);
  const [ludoTurn, setLudoTurn] = useState("Red Player");

  // Connect Four
  const [c4Board, setC4Board] = useState<(string | null)[][]>(Array(6).fill(null).map(() => Array(7).fill(null)));
  const [c4Turn, setC4Turn] = useState<"R" | "Y">("R");

  // Truth or Dare
  const [tdPrompt, setTdPrompt] = useState<string>("Click Spin to draw a Truth or Dare challenge!");

  // Would You Rather
  const [wyrVotes, setWyrVotes] = useState<{ a: number; b: number }>({ a: 12, b: 8 });

  // Quiz Arena Active State
  const [quizScore, setQuizScore] = useState(0);

  // Tic-Tac-Toe Move
  const handleTicClick = (index: number) => {
    if (ticBoard[index] || ticWinner) return;
    const nextBoard = [...ticBoard];
    nextBoard[index] = isXTurn ? "X" : "O";
    setTicBoard(nextBoard);

    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let l of lines) {
      const [a,b,c] = l;
      if (nextBoard[a] && nextBoard[a] === nextBoard[b] && nextBoard[a] === nextBoard[c]) {
        setTicWinner(nextBoard[a]);
        toast.success(`Player ${nextBoard[a]} Won the Match! 🎉`);
        return;
      }
    }
    setIsXTurn(!isXTurn);
  };

  // Rock Paper Scissors Play
  const playRps = (choice: string) => {
    const choices = ["Rock ✊", "Paper ✋", "Scissors ✌️"];
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserRps(choice);
    setAiRps(aiChoice);

    if (choice === aiChoice) {
      setRpsResult("It's a Tie! 🤝");
    } else if (
      (choice.includes("Rock") && aiChoice.includes("Scissors")) ||
      (choice.includes("Paper") && aiChoice.includes("Rock")) ||
      (choice.includes("Scissors") && aiChoice.includes("Paper"))
    ) {
      setRpsResult("You Won the Round! 🎉 (+50 XP)");
      toast.success("Round Won! 🏆");
    } else {
      setRpsResult("Squad Opponent Won! 🤖");
    }
  };

  // Ludo Roll
  const rollLudoDice = () => {
    const rolled = Math.floor(Math.random() * 6) + 1;
    setDiceVal(rolled);
    toast.success(`Rolled a ${rolled}! 🎲`);
  };

  // Connect Four Drop
  const dropC4Disc = (colIdx: number) => {
    for (let row = 5; row >= 0; row--) {
      if (!c4Board[row][colIdx]) {
        const nextBoard = c4Board.map(r => [...r]);
        nextBoard[row][colIdx] = c4Turn;
        setC4Board(nextBoard);
        setC4Turn(c4Turn === "R" ? "Y" : "R");
        return;
      }
    }
    toast.error("Column is full!");
  };

  // Truth or Dare Generator
  const spinTd = (type: "truth" | "dare") => {
    const truths = [
      "What is your most embarrassing squad memory?",
      "Who in this squad would survive a zombie apocalypse longest?",
      "What is the funniest text message you sent to the wrong group?",
    ];
    const dares = [
      "Do your best impression of another squad member for 30 seconds!",
      "Sing the chorus of your favorite song right now in voice chat!",
      "Send the 5th photo in your gallery directly into squad chat!",
    ];
    const pool = type === "truth" ? truths : dares;
    setTdPrompt(pool[Math.floor(Math.random() * pool.length)]);
    toast.success(`${type.toUpperCase()} Challenge Drawn! 🔥`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & User Level/XP Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
              <Gamepad2 className="text-cyan-400" size={32} /> Hangout Arcade
            </h1>
            <p className="text-white/60 text-sm">Real-time multiplayer games, quizzes, leaderboards, and friendship streaks.</p>
          </div>

          {/* XP & Level Widget */}
          <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4 shadow-lg flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center font-bold text-white text-lg shadow-glow-primary">
              Lvl {userProgress.level}
            </div>
            <div>
              <div className="flex justify-between items-center gap-4 mb-1">
                <span className="text-xs font-bold text-white">{userProgress.title}</span>
                <span className="text-[11px] text-cyan-400 font-mono font-semibold">{userProgress.xp} / {userProgress.nextLevelXp} XP</span>
              </div>
              <div className="w-48 h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                  style={{ width: `${(userProgress.xp / userProgress.nextLevelXp) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Friendship Streak Banner */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-amber-500 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center gap-1.5">
              <Flame size={22} className="fill-amber-400" />
              <span>{userProgress.streakDays} DAYS</span>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-heading">Friendship Streak Active! 🔥</h3>
              <p className="text-xs text-white/60">You and The Squad played and watched movies together 14 days in a row.</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
          {[
            { id: "games", label: "Game Center (11 Games)", icon: Gamepad2 },
            { id: "quiz", label: "Quiz Arena", icon: Brain },
            { id: "achievements", label: "Group Achievements", icon: Award },
            { id: "leaderboard", label: "Leaderboards", icon: Trophy },
            { id: "activity", label: "Activity Feed", icon: Activity },
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

        {/* Tab 1: Game Center */}
        {activeTab === "games" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={game.id}
                  onClick={() => {
                    setGameModal(true, game);
                    toast.success(`Launched ${game.name}! 🎮`);
                  }}
                  className="glass p-4 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group space-y-4 shadow-lg"
                >
                  <div className="h-36 rounded-xl overflow-hidden relative">
                    <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white font-semibold flex items-center gap-1">
                      <Users size={12} /> {game.players}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">{game.name}</h4>
                      <p className="text-xs text-white/50">{game.category} • {game.activeMatches} matches live</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-cyan-600 text-white transition-colors">
                      <Play size={16} fill="currentColor" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Quiz Arena */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div className="glass p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-violet-950/30 to-indigo-950/30 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold font-heading text-white">Quiz Arena — Live Squad Trivia</h3>
                  <p className="text-white/60 text-sm">Create custom trivia or host live rapid-fire quizzes with sound effects & countdowns.</p>
                </div>
                <button
                  onClick={() => toast.success("Quiz Creator Opened! 🧠")}
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold shadow-glow-primary transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus size={16} /> Create Quiz
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Marvel Cinematic Universe 🍿", questions: 15, author: "Mike", plays: 24 },
                  { title: "Guess the Friend Memory 📸", questions: 10, author: "Sarah", plays: 42 },
                  { title: "90s Music & Culture 🎧", questions: 20, author: "Alice", plays: 18 },
                ].map((q, idx) => (
                  <div key={idx} className="glass p-6 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="font-bold text-white text-base">{q.title}</h4>
                    <p className="text-xs text-white/50">{q.questions} Questions • Created by {q.author}</p>
                    <button
                      onClick={() => {
                        setSelectedGame({ id: "quiz", name: q.title, category: "Trivia", image: "", players: "Multiplayer", activeMatches: 1, icon: HelpCircle, color: "" });
                        setIsPlayingGame(true);
                      }}
                      className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    >
                      Host Live Quiz
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Group Achievements */}
        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <div 
                key={ach.id}
                className={`glass p-6 rounded-2xl border transition-all ${
                  ach.unlocked ? "border-amber-500/40 bg-amber-500/5 shadow-glow-accent" : "border-white/10 opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{ach.icon}</div>
                  <div>
                    <h4 className="font-bold text-white text-base">{ach.title}</h4>
                    <p className="text-xs text-white/60 mt-1">{ach.desc}</p>
                    <span className={`inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      ach.unlocked ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-white/40"
                    }`}>
                      {ach.unlocked ? "UNLOCKED 🏆" : "LOCKED 🔒"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Leaderboards */}
        {activeTab === "leaderboard" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold font-heading text-white">Squad Rankings</h3>
              <div className="flex gap-2">
                {["games", "quiz", "movies", "memories"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setLeaderboardFilter(filter as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      leaderboardFilter === filter
                        ? "bg-cyan-600 text-white"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {leaderboards.map((user) => (
                <div key={user.rank} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      user.rank === 1 ? "bg-amber-400 text-black" : user.rank === 2 ? "bg-slate-300 text-black" : "bg-amber-700 text-white"
                    }`}>
                      #{user.rank}
                    </span>
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{user.name}</h4>
                      <p className="text-xs text-cyan-400">{user.title}</p>
                    </div>
                  </div>
                  <span className="font-bold text-white text-base font-mono">{user.score} Wins</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Real-Time Activity Feed */}
        {activeTab === "activity" && (
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xl font-bold font-heading text-white mb-4">Squad Activity Timeline</h3>
            <div className="space-y-4">
              {activityFeed.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  <div className="flex-1">
                    <p className="text-xs text-white">
                      <span className="font-bold text-cyan-400">{item.user}</span> {item.action} in <span className="font-semibold text-white/80">{item.target}</span>
                    </p>
                    <span className="text-[10px] text-white/40">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Interactive Playable Game Room Modal */}
      <AnimatePresence>
        {isPlayingGame && selectedGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl w-full rounded-3xl bg-[#0D1222] border border-white/10 p-6 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <button
                onClick={() => setIsPlayingGame(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
                  🎮
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">{selectedGame.name}</h3>
                  <p className="text-xs text-white/50">{selectedGame.category} • Real-time Squad Match</p>
                </div>
              </div>

              {/* GAME 1: TIC TAC TOE */}
              {selectedGame.id === "tictactoe" && (
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-4">
                  <div className="text-xs font-semibold text-white/80">
                    {ticWinner ? `Winner: ${ticWinner}! 🎉` : `Turn: Player ${isXTurn ? "X" : "O"}`}
                  </div>
                  <div className="grid grid-cols-3 gap-3 w-64 h-64">
                    {ticBoard.map((val, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTicClick(idx)}
                        className="w-full h-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-3xl font-bold text-cyan-400 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { setTicBoard(Array(9).fill(null)); setTicWinner(null); setIsXTurn(true); }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw size={14} /> Restart Match
                  </button>
                </div>
              )}

              {/* GAME 2: ROCK PAPER SCISSORS */}
              {selectedGame.id === "rps" && (
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-6">
                  <div className="text-center space-y-1">
                    <h4 className="font-bold text-white text-lg">Choose Your Hand</h4>
                    <p className="text-xs text-white/50">{rpsResult || "Best of 3 vs Squad Opponent"}</p>
                  </div>
                  <div className="flex gap-4">
                    {["Rock ✊", "Paper ✋", "Scissors ✌️"].map((c) => (
                      <button
                        key={c}
                        onClick={() => playRps(c)}
                        className="px-5 py-4 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white rounded-2xl font-bold text-sm border border-cyan-500/30 transition-all cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  {userRps && (
                    <div className="text-xs text-white/70 flex gap-6 pt-2 border-t border-white/10">
                      <span>You: <strong className="text-cyan-400">{userRps}</strong></span>
                      <span>Opponent: <strong className="text-pink-400">{aiRps}</strong></span>
                    </div>
                  )}
                </div>
              )}

              {/* GAME 3: LUDO KING */}
              {selectedGame.id === "ludo" && (
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-4">
                  <div className="text-xs font-semibold text-white/80">Turn: {ludoTurn}</div>
                  <div className="w-48 h-48 rounded-2xl border-4 border-emerald-500/40 bg-emerald-950/20 flex items-center justify-center relative">
                    <div className="w-20 h-20 rounded-2xl bg-amber-500 flex items-center justify-center font-bold text-black text-4xl shadow-glow-accent">
                      {diceVal}
                    </div>
                  </div>
                  <button
                    onClick={rollLudoDice}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-primary cursor-pointer"
                  >
                    <Dices size={18} /> Roll 3D Dice
                  </button>
                </div>
              )}

              {/* GAME 4: CONNECT FOUR */}
              {selectedGame.id === "connect4" && (
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-4">
                  <div className="text-xs font-semibold text-white/80">Turn: {c4Turn === "R" ? "🔴 Red Disc" : "🟡 Yellow Disc"}</div>
                  <div className="bg-blue-900/40 p-4 rounded-2xl border border-blue-500/30 grid grid-cols-7 gap-2">
                    {c4Board.map((row, rIdx) =>
                      row.map((val, cIdx) => (
                        <button
                          key={`${rIdx}-${cIdx}`}
                          onClick={() => dropC4Disc(cIdx)}
                          className={`w-9 h-9 rounded-full border border-white/10 flex items-center justify-center cursor-pointer ${
                            val === "R" ? "bg-red-500" : val === "Y" ? "bg-amber-400" : "bg-black/40"
                          }`}
                        />
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* GAME 5: TRUTH OR DARE */}
              {selectedGame.id === "truth_dare" && (
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-6 text-center">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-semibold text-white max-w-md">
                    {tdPrompt}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => spinTd("truth")}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-primary cursor-pointer"
                    >
                      Spin TRUTH 🌀
                    </button>
                    <button
                      onClick={() => spinTd("dare")}
                      className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-glow-accent cursor-pointer"
                    >
                      Spin DARE 🔥
                    </button>
                  </div>
                </div>
              )}

              {/* GAME 6: UNO MULTIPLAYER */}
              {selectedGame.id === "uno" && (
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-6">
                  <div className="text-xs font-semibold text-white/80">Active Card: <span className="text-red-400 font-bold">RED 7 🎴</span></div>
                  <div className="flex gap-3">
                    {[
                      { bg: "bg-red-600", val: "Red 7" },
                      { bg: "bg-blue-600", val: "Blue +2" },
                      { bg: "bg-green-600", val: "Green Skip" },
                      { bg: "bg-amber-500 text-black", val: "Wild 🌈" },
                    ].map((card, idx) => (
                      <button
                        key={idx}
                        onClick={() => toast.success(`Played ${card.val}! 🎴`)}
                        className={`${card.bg} w-16 h-24 rounded-xl font-bold text-xs flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer border border-white/20`}
                      >
                        {card.val}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => toast.success("Drew a card from deck!")} className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer">
                    Draw Card
                  </button>
                </div>
              )}

              {/* FALLBACK FOR OTHER GAMES (CHESS, PICTIONARY, MEMORY, WOULD YOU RATHER) */}
              {["chess", "pictionary", "memory", "would_rather", "quiz"].includes(selectedGame.id) && (
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-4 text-center">
                  <h4 className="font-bold text-white text-lg">{selectedGame.name} Arena Ready</h4>
                  <p className="text-xs text-white/60">Squad lobby ready. Click Start Match to play with 2+ connected friends.</p>
                  <button
                    onClick={() => toast.success(`Started live ${selectedGame.name} match! 🎮`)}
                    className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-glow-primary cursor-pointer"
                  >
                    Start Real-Time Match
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
