import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class PlanningService {
  private readonly logger = new Logger(PlanningService.name);

  constructor(private readonly prisma: PrismaService) {}

  // 1. Reunion Planner
  async getReunions() {
    return [
      {
        id: "r1",
        title: "Annual Squad Reunion 2026 🏙️",
        city: "Goa, India",
        venueOptions: [
          { id: "v1", name: "Taj Exotica Resort & Spa", votes: 8, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" },
          { id: "v2", name: "Grand Hyatt Goa", votes: 5, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070" },
        ],
        dateOptions: [
          { date: "Oct 15 - Oct 18, 2026", votes: 12 },
          { date: "Nov 05 - Nov 08, 2026", votes: 4 },
        ],
        budget: 2500,
        roomAllocation: [
          { room: "Villa 101", guests: ["Alice", "Sarah"] },
          { room: "Villa 102", guests: ["Mike", "Alex"] },
        ],
        travelAgenda: [
          { time: "Day 1 - 6:00 PM", activity: "Beach Sunset Drinks 🍸" },
          { time: "Day 2 - 10:00 AM", activity: "Water Sports & Scuba 🤿" },
        ],
        packingList: ["Sunscreen", "Swimwear", "Board Games", "Camera"],
      }
    ];
  }

  // 2. Trip Planner
  async getTrips() {
    return [
      {
        id: "t1",
        destination: "Tokyo & Kyoto, Japan 🏯",
        weather: "Sunny 22°C",
        coordinates: { lat: 35.6762, lng: 139.6503 },
        hotelDetails: { name: "Shinjuku Granbell Hotel", nights: 6, cost: "$1,200" },
        flightDetails: { airline: "Japan Airlines JL708", departure: "10:30 AM" },
        placesToVisit: ["Shibuya Crossing", "Fushimi Inari Shrine", "Akihabara Tech District", "Mount Fuji Day Trip"],
        packingList: ["Passport", "JR Rail Pass", "Universal Adapter", "Walking Shoes"],
        budgetTotal: 3400,
      }
    ];
  }

  // 3. Group Calendar
  async getCalendarEvents() {
    return [
      { id: "e1", title: "Sarah's 25th Birthday Party 🎉", category: "Birthday", startTime: "2026-08-15T19:00:00Z", endTime: "2026-08-15T23:00:00Z", colorTag: "amber" },
      { id: "e2", title: "Squad Game Night 🎮", category: "Game Night", startTime: "2026-08-18T20:00:00Z", endTime: "2026-08-18T22:30:00Z", colorTag: "cyan" },
      { id: "e3", title: "Goa Reunion 2026 🌴", category: "Reunion", startTime: "2026-10-15T10:00:00Z", endTime: "2026-10-18T18:00:00Z", colorTag: "emerald" },
    ];
  }

  // 4. Polls & Voting
  async getPolls() {
    return [
      {
        id: "p1",
        question: "Which movie are we watching in Cinema Room tonight? 🍿",
        pollType: "single",
        options: [
          { id: "o1", text: "Inception 🌀", votes: 9 },
          { id: "o2", text: "Interstellar 🚀", votes: 14 },
          { id: "o3", text: "The Dark Knight 🦇", votes: 6 },
        ],
        isAnonymous: false,
      },
      {
        id: "p2",
        question: "Where should we host the 2026 New Year Party?",
        pollType: "multiple",
        options: [
          { id: "o4", text: "Manali Cottage 🏔️", votes: 11 },
          { id: "o5", text: "Goa Beach Villa 🏖️", votes: 15 },
          { id: "o6", text: "Udaipur Fort 🏰", votes: 7 },
        ],
        isAnonymous: false,
      }
    ];
  }

  // 5. Shared Documents
  async getDocuments() {
    return [
      {
        id: "d1",
        title: "Goa Trip Itinerary & Packing Guide 📝",
        content: "# Goa Trip 2026\n\n## Expenses\n- Flight: $300\n- Resort: $800\n\n## Rules\n1. No phones during beach dinners!\n2. Karaoke night is mandatory 🎤",
        tags: ["Trip", "Goa", "Itinerary"],
        authorId: "u1",
        updatedAt: new Date().toISOString(),
      }
    ];
  }

  // 6. Expense Split (Splitwise)
  async getExpenseSplits() {
    return [
      { id: "x1", title: "Goa Resort Deposit 🏨", amount: 1200, paidBy: "Alice Smith", splitWith: ["Alice", "Sarah", "Mike", "Alex"], currency: "USD", settled: false },
      { id: "x2", title: "Scuba Diving Group Pass 🤿", amount: 480, paidBy: "Mike Ross", splitWith: ["Alice", "Sarah", "Mike"], currency: "USD", settled: true },
    ];
  }

  // 7. Bucket List
  async getBucketList() {
    return [
      { id: "b1", title: "Scuba Dive in Lakshadweep 🤿", category: "Adventure", isCompleted: true, proofImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070" },
      { id: "b2", title: "Road Trip to Ladakh 🏍️", category: "Travel", isCompleted: false },
      { id: "b3", title: "Watch Cricket World Cup Final 🏏", category: "Sports", isCompleted: false },
      { id: "b4", title: "Camping under Northern Lights 🌌", category: "Nature", isCompleted: false },
    ];
  }

  // 8. Memory Wall
  async getMemoryWall() {
    return [
      { id: "m1", authorName: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?u=2", postType: "photo", mediaUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070", content: "Best bonfire night with the squad! 🔥❤️", pinned: true, reactions: { heart: 12, fire: 8 } },
      { id: "m2", authorName: "Alice Smith", avatar: "https://i.pravatar.cc/150?u=1", postType: "letter", content: "To my best friends: 5 years of memories and many more to come! 🥂", pinned: false, reactions: { heart: 18 } },
    ];
  }

  // 9. Digital Yearbook
  async getYearbookPages() {
    return [
      { id: "y1", userId: "u1", userName: "Alice Smith", avatar: "https://i.pravatar.cc/150?u=1", signatures: ["You are the glue that holds our squad together! - Sarah", "Best gaming partner ever 🎮 - Mike"], isLocked: false }
    ];
  }

  // 10. Time Capsule
  async getTimeCapsules() {
    return [
      { id: "tc1", title: "Squad 2026 Predictions 🔮", authorName: "Mike Ross", unlockDate: "2027-01-01T00:00:00Z", encryptedContent: "Locked until 2027 New Year!", isUnlocked: false },
      { id: "tc2", title: "College Graduation Memories 🎓", authorName: "Alice Smith", unlockDate: "2025-06-01T00:00:00Z", encryptedContent: "Unsealed memory folder with 50 photos & voice letters!", isUnlocked: true }
    ];
  }

  // 11. AI Assisted Itinerary Generator
  async generateAiItinerary(destination: string, days: number, budget: string) {
    this.logger.log(`Generating AI Itinerary for ${destination} (${days} days, ${budget} budget)`);
    return {
      destination,
      days,
      budget,
      summary: `Custom ${days}-day AI trip plan for ${destination} tailored for a friend squad!`,
      itinerary: [
        { day: 1, morning: "City Arrival & Check-in", afternoon: "Famous Food Tour & Sightseeing 🍜", evening: "Rooftop Drinks & Squad Sunset 🍸" },
        { day: 2, morning: "Adventure Sport / Scuba Diving 🤿", afternoon: "Local Culture & Museum Pass", evening: "Night Market & Beach Party 🎶" },
        { day: 3, morning: "Scenic Mountain Hike / Viewpoint 🏔️", afternoon: "Souvenir Shopping & Relax", evening: "Squad Farewell Dinner 🍽️" },
      ],
      estimatedCostPerPerson: "$450 - $600",
      recommendedPacking: ["Sunscreen", "Comfortable Shoes", "Portable Charger", "Travel Camera"],
    };
  }
}
