// ============================================================
// Hangout — Shared TypeScript Types
// ============================================================

export type UserStatus = 'ONLINE' | 'IDLE' | 'DO_NOT_DISTURB' | 'INVISIBLE' | 'OFFLINE'
export type GroupRole = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER'
export type ChannelType = 'TEXT' | 'VOICE' | 'VIDEO' | 'ANNOUNCEMENT'
export type MessageType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'FILE' | 'AUDIO' | 'SYSTEM' | 'POLL' | 'GIF'
export type MediaType = 'PHOTO' | 'VIDEO' | 'DOCUMENT' | 'AUDIO'
export type GameType =
  | 'UNO'
  | 'CHESS'
  | 'LUDO'
  | 'PICTIONARY'
  | 'CONNECT_FOUR'
  | 'TRUTH_OR_DARE'
  | 'WOULD_YOU_RATHER'
  | 'QUIZ_ARENA'
  | 'DRAWING'
  | 'MEMORY_GAME'
  | 'ROCK_PAPER_SCISSORS'
  | 'TRIVIA'
export type NotificationType =
  | 'MESSAGE'
  | 'MENTION'
  | 'REACTION'
  | 'FRIEND_REQUEST'
  | 'FRIEND_ACCEPT'
  | 'GROUP_INVITE'
  | 'EVENT_REMINDER'
  | 'BIRTHDAY'
  | 'MEMORY_SURFACED'
  | 'GAME_INVITE'
  | 'VOICE_INVITE'
  | 'ACHIEVEMENT'

// ============================================================
// API Response Shapes
// ============================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  meta?: PaginationMeta
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

// ============================================================
// User Types
// ============================================================

export interface UserProfile {
  id: string
  email: string
  username: string
  displayName: string
  bio?: string
  avatarUrl?: string
  bannerUrl?: string
  status: UserStatus
  customStatus?: string
  isVerified: boolean
  birthday?: string
  createdAt: string
  lastSeenAt?: string
}

export interface UserPresence {
  userId: string
  status: UserStatus
  customStatus?: string
  lastSeenAt?: string
  currentActivity?: string
}

// ============================================================
// Group Types
// ============================================================

export interface GroupDetails {
  id: string
  name: string
  slug: string
  description?: string
  avatarUrl?: string
  bannerUrl?: string
  isPrivate: boolean
  inviteCode?: string
  memberCount: number
  onlineCount: number
  createdAt: string
  channels: ChannelDetails[]
  members: GroupMemberDetails[]
}

export interface GroupMemberDetails {
  id: string
  userId: string
  user: UserProfile
  role: GroupRole
  nickname?: string
  joinedAt: string
}

// ============================================================
// Channel & Message Types
// ============================================================

export interface ChannelDetails {
  id: string
  groupId: string
  name: string
  description?: string
  type: ChannelType
  position: number
  isNsfw: boolean
  slowMode?: number
  lastMessageAt?: string
  unreadCount?: number
}

export interface MessageDetails {
  id: string
  channelId: string
  authorId: string
  author: UserProfile
  content?: string
  type: MessageType
  editedAt?: string
  isDeleted: boolean
  isPinned: boolean
  replyTo?: MessageDetails
  attachments: MessageAttachmentDetails[]
  reactions: MessageReactionGroup[]
  threadCount?: number
  createdAt: string
  updatedAt: string
}

export interface MessageAttachmentDetails {
  id: string
  url: string
  filename: string
  size: number
  mimeType: string
  width?: number
  height?: number
  duration?: number
}

export interface MessageReactionGroup {
  emoji: string
  count: number
  users: string[]
  hasReacted: boolean
}

// ============================================================
// Media Types
// ============================================================

export interface MediaDetails {
  id: string
  url: string
  thumbnailUrl?: string
  filename: string
  size: number
  mimeType: string
  type: MediaType
  width?: number
  height?: number
  duration?: number
  caption?: string
  takenAt?: string
  location?: string
  isFavorite: boolean
  uploadedBy: UserProfile
  tags: PhotoTagDetails[]
  commentCount: number
  likeCount: number
  hasLiked: boolean
  createdAt: string
}

export interface PhotoTagDetails {
  id: string
  user: UserProfile
  x?: number
  y?: number
}

export interface AlbumDetails {
  id: string
  name: string
  description?: string
  coverUrl?: string
  photoCount: number
  isShared: boolean
  createdAt: string
}

// ============================================================
// Real-time Event Types (Socket.IO)
// ============================================================

export interface SocketEvents {
  // Client → Server
  'chat:send': { channelId: string; content: string; type?: MessageType; replyToId?: string }
  'chat:typing:start': { channelId: string }
  'chat:typing:stop': { channelId: string }
  'chat:react': { messageId: string; emoji: string }
  'presence:update': { status: UserStatus; customStatus?: string }
  'voice:join': { roomId: string }
  'voice:leave': { roomId: string }
  'game:action': { gameId: string; action: unknown }

  // Server → Client
  'chat:message': MessageDetails
  'chat:message:update': MessageDetails
  'chat:message:delete': { messageId: string; channelId: string }
  'chat:typing': { userId: string; channelId: string; isTyping: boolean }
  'presence:change': UserPresence
  'notification:new': NotificationDetails
  'voice:participant:join': { roomId: string; user: UserProfile }
  'voice:participant:leave': { roomId: string; userId: string }
  'game:state:update': { gameId: string; state: unknown }
}

// ============================================================
// Notification Types
// ============================================================

export interface NotificationDetails {
  id: string
  type: NotificationType
  title: string
  body?: string
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: string
}

// ============================================================
// Voice Room Types
// ============================================================

export interface VoiceRoomDetails {
  id: string
  channelId: string
  livekitRoom?: string
  isActive: boolean
  maxUsers: number
  participants: VoiceParticipantDetails[]
}

export interface VoiceParticipantDetails {
  userId: string
  user: UserProfile
  isMuted: boolean
  isDeafened: boolean
  isSpeaking: boolean
  joinedAt: string
}

// ============================================================
// Event Types
// ============================================================

export type EventStatus = 'DRAFT' | 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
export type EventType =
  | 'MOVIE_NIGHT'
  | 'TRIP'
  | 'BIRTHDAY'
  | 'REUNION'
  | 'STUDY_SESSION'
  | 'GAME_NIGHT'
  | 'CUSTOM'

export interface EventDetails {
  id: string
  title: string
  description?: string
  type: EventType
  status: EventStatus
  startDate: string
  endDate?: string
  location?: string
  coverUrl?: string
  budget?: number
  attendees: EventAttendeeDetails[]
  polls: PollDetails[]
  attendeeCount: number
  createdAt: string
}

export interface EventAttendeeDetails {
  userId: string
  user: UserProfile
  response: 'PENDING' | 'GOING' | 'NOT_GOING' | 'MAYBE'
}

export interface PollDetails {
  id: string
  question: string
  options: PollOption[]
  endsAt?: string
  isMulti: boolean
  totalVotes: number
}

export interface PollOption {
  id: string
  text: string
  voteCount: number
  hasVoted: boolean
}

// ============================================================
// Game Types
// ============================================================

export type GameStatus = 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'

export interface GameDetails {
  id: string
  type: GameType
  status: GameStatus
  participants: GameParticipantDetails[]
  winnerId?: string
  createdAt: string
}

export interface GameParticipantDetails {
  userId: string
  user: UserProfile
  score: number
  rank?: number
}

// ============================================================
// Time Capsule Types
// ============================================================

export type TimeCapsuleStatus = 'SEALED' | 'UNLOCKED' | 'ARCHIVED'

export interface TimeCapsuleDetails {
  id: string
  title: string
  description?: string
  unlocksAt: string
  status: TimeCapsuleStatus
  coverUrl?: string
  messageCount: number
  createdAt: string
  messages?: TimeCapsuleMessageDetails[]
}

export interface TimeCapsuleMessageDetails {
  id: string
  author: UserProfile
  content: string
  mediaUrls?: string[]
  createdAt: string
}

// ============================================================
// Auth Types
// ============================================================

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface AuthUser extends UserProfile {
  is2FAEnabled: boolean
  onboardingDone: boolean
}

// ============================================================
// Upload Types
// ============================================================

export interface UploadResult {
  url: string
  publicId: string
  thumbnailUrl?: string
  width?: number
  height?: number
  duration?: number
  size: number
  format: string
}

// ============================================================
// Dashboard Types
// ============================================================

export interface DashboardData {
  onlineFriends: UserPresence[]
  upcomingEvents: EventDetails[]
  recentMessages: MessageDetails[]
  birthdays: UserProfile[]
  activeGames: GameDetails[]
  recentMedia: MediaDetails[]
  groupStats: GroupStats
}

export interface GroupStats {
  totalMessages: number
  totalPhotos: number
  totalGamesPlayed: number
  totalEventsHeld: number
  daysTogether: number
  mostActiveUser: UserProfile
}
