import { create } from 'zustand'

export interface MessageAttachment {
  id: string
  url: string
  filename: string
  size: number
  mimeType: string
  width?: number
  height?: number
  duration?: number
}

export interface MessageReaction {
  emoji: string
  count: number
  users: string[]
  hasReacted: boolean
}

export interface ChatMessage {
  id: string
  channelId: string
  authorId: string
  author: {
    id: string
    displayName: string
    username: string
    avatarUrl?: string
  }
  content?: string
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'FILE' | 'AUDIO' | 'SYSTEM' | 'GIF'
  editedAt?: string
  isDeleted: boolean
  isPinned: boolean
  replyToId?: string
  replyTo?: ChatMessage
  attachments: MessageAttachment[]
  reactions: MessageReaction[]
  threadCount?: number
  createdAt: string
  updatedAt: string
}

export interface TypingUser {
  userId: string
  displayName: string
  avatarUrl?: string
}

interface ChatState {
  // Messages per channel
  messages: Record<string, ChatMessage[]>
  // Cursors for pagination
  cursors: Record<string, string | null>
  hasMore: Record<string, boolean>
  // Typing indicators per channel
  typingUsers: Record<string, TypingUser[]>
  // Unread counts per channel
  unreadCounts: Record<string, number>
  // Last read message per channel
  lastReadAt: Record<string, string>
  // Pending optimistic messages
  pendingMessages: Record<string, Partial<ChatMessage>>

  // Actions
  setMessages: (channelId: string, messages: ChatMessage[]) => void
  prependMessages: (channelId: string, messages: ChatMessage[]) => void
  appendMessage: (channelId: string, message: ChatMessage) => void
  updateMessage: (channelId: string, messageId: string, update: Partial<ChatMessage>) => void
  deleteMessage: (channelId: string, messageId: string) => void
  addReaction: (channelId: string, messageId: string, reaction: MessageReaction) => void
  removeReaction: (channelId: string, messageId: string, emoji: string, userId: string) => void
  setCursor: (channelId: string, cursor: string | null) => void
  setHasMore: (channelId: string, hasMore: boolean) => void
  setTypingUsers: (channelId: string, users: TypingUser[]) => void
  addTypingUser: (channelId: string, user: TypingUser) => void
  removeTypingUser: (channelId: string, userId: string) => void
  setUnreadCount: (channelId: string, count: number) => void
  incrementUnread: (channelId: string) => void
  clearUnread: (channelId: string) => void
  markRead: (channelId: string) => void
}

export const useChatStore = create<ChatState>()((set, get) => ({
  messages: {},
  cursors: {},
  hasMore: {},
  typingUsers: {},
  unreadCounts: {},
  lastReadAt: {},
  pendingMessages: {},

  setMessages: (channelId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [channelId]: messages },
    })),

  prependMessages: (channelId, newMessages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: [...newMessages, ...(state.messages[channelId] ?? [])],
      },
    })),

  appendMessage: (channelId, message) =>
    set((state) => {
      const existing = state.messages[channelId] ?? []
      // Avoid duplicates
      if (existing.some((m) => m.id === message.id)) return state
      return {
        messages: {
          ...state.messages,
          [channelId]: [...existing, message],
        },
      }
    }),

  updateMessage: (channelId, messageId, update) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] ?? []).map((m) =>
          m.id === messageId ? { ...m, ...update } : m,
        ),
      },
    })),

  deleteMessage: (channelId, messageId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] ?? []).map((m) =>
          m.id === messageId ? { ...m, isDeleted: true, content: undefined } : m,
        ),
      },
    })),

  addReaction: (channelId, messageId, reaction) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] ?? []).map((m) => {
          if (m.id !== messageId) return m
          const existing = m.reactions.find((r) => r.emoji === reaction.emoji)
          if (existing) {
            return {
              ...m,
              reactions: m.reactions.map((r) =>
                r.emoji === reaction.emoji ? reaction : r,
              ),
            }
          }
          return { ...m, reactions: [...m.reactions, reaction] }
        }),
      },
    })),

  removeReaction: (channelId, messageId, emoji, userId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] ?? []).map((m) => {
          if (m.id !== messageId) return m
          return {
            ...m,
            reactions: m.reactions
              .map((r) => {
                if (r.emoji !== emoji) return r
                return {
                  ...r,
                  count: r.count - 1,
                  users: r.users.filter((u) => u !== userId),
                  hasReacted: false,
                }
              })
              .filter((r) => r.count > 0),
          }
        }),
      },
    })),

  setCursor: (channelId, cursor) =>
    set((state) => ({ cursors: { ...state.cursors, [channelId]: cursor } })),

  setHasMore: (channelId, hasMore) =>
    set((state) => ({ hasMore: { ...state.hasMore, [channelId]: hasMore } })),

  setTypingUsers: (channelId, users) =>
    set((state) => ({ typingUsers: { ...state.typingUsers, [channelId]: users } })),

  addTypingUser: (channelId, user) =>
    set((state) => {
      const existing = state.typingUsers[channelId] ?? []
      if (existing.some((u) => u.userId === user.userId)) return state
      return {
        typingUsers: {
          ...state.typingUsers,
          [channelId]: [...existing, user],
        },
      }
    }),

  removeTypingUser: (channelId, userId) =>
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [channelId]: (state.typingUsers[channelId] ?? []).filter(
          (u) => u.userId !== userId,
        ),
      },
    })),

  setUnreadCount: (channelId, count) =>
    set((state) => ({
      unreadCounts: { ...state.unreadCounts, [channelId]: count },
    })),

  incrementUnread: (channelId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [channelId]: (state.unreadCounts[channelId] ?? 0) + 1,
      },
    })),

  clearUnread: (channelId) =>
    set((state) => ({
      unreadCounts: { ...state.unreadCounts, [channelId]: 0 },
    })),

  markRead: (channelId) => {
    const state = get()
    const msgs = state.messages[channelId]
    const lastMsg = msgs?.[msgs.length - 1]
    set((s) => ({
      unreadCounts: { ...s.unreadCounts, [channelId]: 0 },
      lastReadAt: {
        ...s.lastReadAt,
        [channelId]: lastMsg?.createdAt ?? new Date().toISOString(),
      },
    }))
  },
}))
