import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class ClubhouseService {
  private readonly logger = new Logger(ClubhouseService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Get active rooms state & customization presets
  async getClubhouseRooms() {
    return [
      { id: "r1", name: "Living Room 🛋️", lighting: "Sunset Amber", wallpaper: "Deep Neon Navy", activePlayers: 4, icon: "🛋️" },
      { id: "r2", name: "Cinema Hall 🍿", lighting: "Dim Theater Purple", wallpaper: "Acoustic Velvet", activePlayers: 2, icon: "🍿" },
      { id: "r3", name: "Arcade 🎮", lighting: "Neon Cyan", wallpaper: "Pixel Matrix", activePlayers: 3, icon: "🎮" },
      { id: "r4", name: "Music Lounge 🎵", lighting: "Disco Violet", wallpaper: "Soundwave Black", activePlayers: 5, icon: "🎵" },
      { id: "r5", name: "Gallery Hall 📸", lighting: "Gallery Spotlight", wallpaper: "Minimalist Slate", activePlayers: 1, icon: "📸" },
      { id: "r6", name: "Coffee Corner ☕", lighting: "Warm Warm Coffee", wallpaper: "Warm Wood", activePlayers: 2, icon: "☕" },
      { id: "r7", name: "Rooftop 🌇", lighting: "Starry Night Sky", wallpaper: "Open Sky", activePlayers: 6, icon: "🌇" },
      { id: "r8", name: "Garden 🌳", lighting: "Daylight Green", wallpaper: "Natural Grass", activePlayers: 0, icon: "🌳" },
      { id: "r9", name: "Trophy Room 🏆", lighting: "Gold Trophy Glow", wallpaper: "Marble Gold", activePlayers: 0, icon: "🏆" },
      { id: "r10", name: "Library 📚", lighting: "Cozy Reading Lamp", wallpaper: "Oak Wood", activePlayers: 1, icon: "📚" },
      { id: "r11", name: "Planning Room 📅", lighting: "Focus White", wallpaper: "Grid Blue", activePlayers: 2, icon: "📅" },
      { id: "r12", name: "AI Room 🤖", lighting: "Holographic Blue", wallpaper: "Cyber Grid", activePlayers: 1, icon: "🤖" },
      { id: "r13", name: "Birthday Hall 🎂", lighting: "Party Confetti", wallpaper: "Festive Gold", activePlayers: 0, icon: "🎂" },
      { id: "r14", name: "Time Capsule Vault 🕰️", lighting: "Vault Amber", wallpaper: "Steel Vault", activePlayers: 0, icon: "🕰️" },
      { id: "r15", name: "Entrance 🏠", lighting: "Welcome Warm", wallpaper: "Grand Lobby", activePlayers: 8, icon: "🏠" },
      { id: "r16", name: "Private Lounge 🔒", lighting: "Private Club Red", wallpaper: "Leather Mahogany", activePlayers: 0, icon: "🔒" },
    ];
  }

  // Calculate Spatial Audio Attenuation based on distance (0.0 = muted, 1.0 = loud)
  calculateSpatialAudio(p1: { x: number; y: number; z: number }, p2: { x: number; y: number; z: number }) {
    const distance = Math.sqrt(
      Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2)
    );
    const maxDistance = 20.0; // 20 units distance limit
    if (distance >= maxDistance) return 0.0;
    return Math.max(0.0, 1.0 - distance / maxDistance);
  }
}
