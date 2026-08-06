"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, Dices, Trophy, Play, Users } from "lucide-react";
import { useUIStore } from "@/store/ui.store";
import toast from "react-hot-toast";

export function GameModal() {
  const { isGameModalOpen, activeGame, setGameModal } = useUIStore() as any;

  // Tic-Tac-Toe
  const [ticBoard, setTicBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [ticWinner, setTicWinner] = useState<string | null>(null);

  // Rock Paper Scissors
  const [rpsResult, setRpsResult] = useState<string | null>(null);
  const [userRps, setUserRps] = useState<string | null>(null);
  const [aiRps, setAiRps] = useState<string | null>(null);

  // Ludo Dice
  const [diceVal, setDiceVal] = useState<number>(6);

  // Connect Four
  const [c4Board, setC4Board] = useState<(string | null)[][]>(Array(6).fill(null).map(() => Array(7).fill(null)));
  const [c4Turn, setC4Turn] = useState<"R" | "Y">("R");

  // Truth or Dare
  const [tdPrompt, setTdPrompt] = useState<string>("Click Spin to draw a Truth or Dare challenge!");

  if (!isGameModalOpen || !activeGame) return null;

  // Tic-Tac-Toe Click
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

  // Truth or Dare
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
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="max-w-2xl w-full rounded-3xl bg-[#0D1222] border border-white/10 p-6 shadow-2xl space-y-6 relative overflow-hidden"
        >
          <button
            onClick={() => setGameModal(false)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
              🎮
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">{activeGame.name}</h3>
              <p className="text-xs text-white/50">{activeGame.category} • Real-time Squad Match</p>
            </div>
          </div>

          {/* GAME 1: TIC TAC TOE */}
          {activeGame.id === "tictactoe" && (
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
          {activeGame.id === "rps" && (
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
          {activeGame.id === "ludo" && (
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-4">
              <div className="text-xs font-semibold text-white/80">Turn: Red Player</div>
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
          {activeGame.id === "connect4" && (
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
          {activeGame.id === "truth_dare" && (
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
          {activeGame.id === "uno" && (
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
          {["chess", "pictionary", "memory", "would_rather", "quiz"].includes(activeGame.id) && (
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-4 text-center">
              <h4 className="font-bold text-white text-lg">{activeGame.name} Arena Ready</h4>
              <p className="text-xs text-white/60">Squad lobby ready. Click Start Match to play with 2+ connected friends.</p>
              <button
                onClick={() => toast.success(`Started live ${activeGame.name} match! 🎮`)}
                className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-glow-primary cursor-pointer"
              >
                Start Real-Time Match
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
