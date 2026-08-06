import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

interface SocketState {
  socket: Socket | null
  status: ConnectionStatus
  roomsJoined: Set<string>

  connect: (token: string) => void
  disconnect: () => void
  joinChannel: (channelId: string) => void
  leaveChannel: (channelId: string) => void
  emit: <T>(event: string, data: T) => void
}

export const useSocketStore = create<SocketState>()((set, get) => ({
  socket: null,
  status: 'disconnected',
  roomsJoined: new Set(),

  connect: (token) => {
    const existing = get().socket
    if (existing?.connected) return

    set({ status: 'connecting' })

    const socket = io(process.env.NEXT_PUBLIC_WS_URL ?? 'http://localhost:3001', {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })

    socket.on('connect', () => {
      console.log('🔌 Socket connected:', socket.id)
      set({ status: 'connected' })
      // Rejoin all rooms after reconnect
      get().roomsJoined.forEach((channelId) => {
        socket.emit('join_channel', { channelId })
      })
    })

    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket disconnected:', reason)
      set({ status: 'disconnected' })
    })

    socket.on('connect_error', (err) => {
      console.error('🔌 Socket error:', err.message)
      set({ status: 'error' })
    })

    set({ socket })
  },

  disconnect: () => {
    const socket = get().socket
    if (socket) {
      socket.disconnect()
      set({ socket: null, status: 'disconnected', roomsJoined: new Set() })
    }
  },

  joinChannel: (channelId) => {
    const { socket, roomsJoined } = get()
    if (!roomsJoined.has(channelId)) {
      socket?.emit('join_channel', { channelId })
      set({ roomsJoined: new Set([...roomsJoined, channelId]) })
    }
  },

  leaveChannel: (channelId) => {
    const { socket, roomsJoined } = get()
    socket?.emit('leave_channel', { channelId })
    const next = new Set(roomsJoined)
    next.delete(channelId)
    set({ roomsJoined: next })
  },

  emit: (event, data) => {
    const socket = get().socket
    socket?.emit(event, data)
  },
}))
