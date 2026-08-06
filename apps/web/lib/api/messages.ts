import { api } from './client'

export interface Message {
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
  type: string
  editedAt?: string
  isDeleted: boolean
  isPinned: boolean
  replyToId?: string
  replyTo?: Message
  attachments: Array<{
    id: string
    url: string
    filename: string
    size: number
    mimeType: string
    width?: number
    height?: number
    duration?: number
  }>
  reactions: Array<{
    emoji: string
    count: number
    users: string[]
    hasReacted: boolean
  }>
  threadCount?: number
  createdAt: string
  updatedAt: string
}

export interface MessagesResponse {
  data: Message[]
  nextCursor: string | null
  hasMore: boolean
}

export interface SendMessagePayload {
  content?: string
  type?: string
  replyToId?: string
}

export const messagesApi = {
  /** Fetch channel messages with cursor-based pagination */
  getChannelMessages: (channelId: string, cursor?: string, limit = 50) =>
    api.get<MessagesResponse>(
      `/channels/${channelId}/messages${cursor ? `?cursor=${cursor}&limit=${limit}` : `?limit=${limit}`}`,
    ),

  /** Send a new message */
  sendMessage: (channelId: string, payload: SendMessagePayload) =>
    api.post<Message>(`/channels/${channelId}/messages`, payload),

  /** Edit a message */
  editMessage: (messageId: string, content: string) =>
    api.patch<Message>(`/messages/${messageId}`, { content }),

  /** Delete a message */
  deleteMessage: (messageId: string) =>
    api.delete<void>(`/messages/${messageId}`),

  /** Add reaction to message */
  addReaction: (messageId: string, emoji: string) =>
    api.post<void>(`/messages/${messageId}/react`, { emoji }),

  /** Remove reaction */
  removeReaction: (messageId: string, emoji: string) =>
    api.delete<void>(`/messages/${messageId}/react/${encodeURIComponent(emoji)}`),

  /** Get pinned messages in a channel */
  getPinnedMessages: (channelId: string) =>
    api.get<Message[]>(`/channels/${channelId}/pins`),

  /** Pin a message */
  pinMessage: (messageId: string) =>
    api.post<void>(`/messages/${messageId}/pin`),

  /** Unpin a message */
  unpinMessage: (messageId: string) =>
    api.delete<void>(`/messages/${messageId}/pin`),

  /** Get thread messages */
  getThreadMessages: (messageId: string) =>
    api.get<Message[]>(`/messages/${messageId}/thread`),

  /** Send message with file attachment */
  sendWithAttachment: (
    channelId: string,
    formData: FormData,
    onProgress?: (pct: number) => void,
  ) => api.upload<Message>(`/channels/${channelId}/messages/upload`, formData, onProgress),

  /** Mark channel as read up to a message */
  markRead: (channelId: string, messageId: string) =>
    api.post<void>(`/channels/${channelId}/read`, { messageId }),
}
