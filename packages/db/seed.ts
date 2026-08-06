import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Hangout database...')

  // Clean existing data in development
  if (process.env.NODE_ENV !== 'production') {
    await prisma.$executeRaw`TRUNCATE TABLE "analytics" RESTART IDENTITY CASCADE`
    console.log('🧹 Cleaned existing data')
  }

  // ── Create Demo Users ─────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Demo@1234', 12)

  const alice = await prisma.user.upsert({
    where: { email: 'alice@hangout.demo' },
    update: {},
    create: {
      email: 'alice@hangout.demo',
      username: 'alice_wonderland',
      displayName: 'Alice Johnson',
      bio: '📸 Photography enthusiast | Coffee lover ☕ | Making memories one photo at a time',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      status: 'ONLINE',
      isVerified: true,
      onboardingDone: true,
      birthday: new Date('1999-03-15'),
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@hangout.demo' },
    update: {},
    create: {
      email: 'bob@hangout.demo',
      username: 'bob_the_builder',
      displayName: 'Bob Smith',
      bio: '🎮 Gamer | 🎵 Music nerd | Always up for a movie night',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      status: 'IDLE',
      isVerified: true,
      onboardingDone: true,
      birthday: new Date('1999-07-22'),
    },
  })

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@hangout.demo' },
    update: {},
    create: {
      email: 'charlie@hangout.demo',
      username: 'charlie_c',
      displayName: 'Charlie Chen',
      bio: '🎸 Guitar player | 🏕️ Adventure seeker | Missing hostel days',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
      status: 'DO_NOT_DISTURB',
      isVerified: true,
      onboardingDone: true,
      birthday: new Date('2000-01-10'),
    },
  })

  const diana = await prisma.user.upsert({
    where: { email: 'diana@hangout.demo' },
    update: {},
    create: {
      email: 'diana@hangout.demo',
      username: 'diana_prince',
      displayName: 'Diana Patel',
      bio: '📚 Bookworm | 🍕 Food critic | Trip planner extraordinaire',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diana',
      status: 'ONLINE',
      isVerified: true,
      onboardingDone: true,
      birthday: new Date('1998-11-28'),
    },
  })

  console.log('✅ Created demo users')

  // ── Create Demo Group ─────────────────────────────────────
  const group = await prisma.group.upsert({
    where: { slug: 'hostel-squad-2024' },
    update: {},
    create: {
      name: 'Hostel Squad 🏠',
      slug: 'hostel-squad-2024',
      description: 'Our little corner of the internet. Miss you all! 💙',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=hostel-squad',
      isPrivate: true,
      inviteCode: 'SQUAD-INVITE-2024',
      ownerId: alice.id,
      maxMembers: 20,
    },
  })

  // Add members
  await prisma.groupMember.createMany({
    skipDuplicates: true,
    data: [
      { groupId: group.id, userId: alice.id, role: 'OWNER' },
      { groupId: group.id, userId: bob.id, role: 'ADMIN' },
      { groupId: group.id, userId: charlie.id, role: 'MEMBER' },
      { groupId: group.id, userId: diana.id, role: 'MEMBER' },
    ],
  })

  console.log('✅ Created demo group with members')

  // ── Create Channels ───────────────────────────────────────
  const generalChannel = await prisma.channel.create({
    data: {
      groupId: group.id,
      name: 'general',
      description: 'The main hangout spot 🎉',
      type: 'TEXT',
      position: 0,
      createdById: alice.id,
    },
  })

  const memoriesChannel = await prisma.channel.create({
    data: {
      groupId: group.id,
      name: 'memories',
      description: 'Our favorite throwback moments 📸',
      type: 'TEXT',
      position: 1,
      createdById: alice.id,
    },
  })

  const planningChannel = await prisma.channel.create({
    data: {
      groupId: group.id,
      name: 'planning',
      description: 'Next trip? Next movie night? Here! 🗺️',
      type: 'TEXT',
      position: 2,
      createdById: alice.id,
    },
  })

  await prisma.channel.create({
    data: {
      groupId: group.id,
      name: 'Voice Lounge',
      type: 'VOICE',
      position: 3,
      createdById: alice.id,
    },
  })

  console.log('✅ Created channels')

  // ── Create Sample Messages ────────────────────────────────
  const messages = [
    { authorId: alice.id, content: 'Hey everyone! Welcome to our Hangout space! 🎉' },
    { authorId: bob.id, content: 'This is so cool! Finally one place for everything 🙌' },
    { authorId: charlie.id, content: 'Miss you all so much. When are we meeting next?' },
    { authorId: diana.id, content: "Let's plan a trip! I've been looking at some places 🗺️" },
    { authorId: alice.id, content: 'Oh yes!! Goa 2025? 🏖️' },
    { authorId: bob.id, content: 'I am SO in! Let me check my calendar' },
  ]

  for (const msg of messages) {
    await prisma.message.create({
      data: {
        channelId: generalChannel.id,
        authorId: msg.authorId,
        content: msg.content,
        type: 'TEXT',
      },
    })
    // Small delay to get ordered timestamps
    await new Promise((r) => setTimeout(r, 50))
  }

  console.log('✅ Created sample messages')

  // ── Create an Upcoming Event ──────────────────────────────
  const nextMonth = new Date()
  nextMonth.setMonth(nextMonth.getMonth() + 1)

  await prisma.event.create({
    data: {
      groupId: group.id,
      createdById: alice.id,
      title: 'Goa Trip 2025 🏖️',
      description: 'Our annual reunion trip! Sun, sand, and shenanigans.',
      type: 'TRIP',
      status: 'SCHEDULED',
      startDate: nextMonth,
      location: 'Goa, India',
      budget: 15000,
      attendees: {
        create: [
          { userId: alice.id, response: 'GOING' },
          { userId: bob.id, response: 'GOING' },
          { userId: charlie.id, response: 'MAYBE' },
          { userId: diana.id, response: 'GOING' },
        ],
      },
    },
  })

  console.log('✅ Created upcoming event')

  // ── Create an Achievement ─────────────────────────────────
  await prisma.achievement.createMany({
    skipDuplicates: true,
    data: [
      {
        key: 'first_message',
        name: 'Breaking the Ice',
        description: 'Sent your first message in a group',
        type: 'SOCIAL',
        xpReward: 10,
      },
      {
        key: 'photo_uploader',
        name: 'Memory Keeper',
        description: 'Uploaded 10 photos to the gallery',
        type: 'MEMORIES',
        xpReward: 25,
      },
      {
        key: 'event_organizer',
        name: 'The Planner',
        description: 'Created your first group event',
        type: 'EVENTS',
        xpReward: 30,
      },
      {
        key: 'game_winner',
        name: 'Game On!',
        description: 'Won your first multiplayer game',
        type: 'GAMING',
        xpReward: 50,
      },
      {
        key: 'one_year',
        name: 'One Year Together',
        description: 'Your group has been active for 1 year',
        type: 'MILESTONES',
        xpReward: 100,
      },
    ],
  })

  console.log('✅ Created achievements')

  console.log('\n🎉 Seed complete!')
  console.log('\n📧 Demo accounts:')
  console.log('   alice@hangout.demo / Demo@1234')
  console.log('   bob@hangout.demo / Demo@1234')
  console.log('   charlie@hangout.demo / Demo@1234')
  console.log('   diana@hangout.demo / Demo@1234')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
