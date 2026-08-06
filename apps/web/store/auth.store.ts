import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserStatus = 'ONLINE' | 'IDLE' | 'DO_NOT_DISTURB' | 'INVISIBLE' | 'OFFLINE'

export interface AuthUser {
  id: string
  email: string
  username: string
  displayName: string
  avatarUrl?: string
  status: UserStatus
  is2FAEnabled: boolean
  onboardingDone: boolean
}

export interface AuthTokens {
  accessToken: string
  expiresAt: number
}

interface AuthState {
  user: AuthUser | null
  tokens: AuthTokens | null
  isLoading: boolean
  isAuthenticated: boolean

  // Actions
  setUser: (user: AuthUser | null) => void
  setTokens: (tokens: AuthTokens | null) => void
  setLoading: (loading: boolean) => void
  updateUserStatus: (status: UserStatus) => void
  updateAvatar: (url: string) => void
  signOut: () => void
}

const defaultUser: AuthUser = {
  id: 'u1',
  email: 'alice@hangout.app',
  username: 'alice',
  displayName: 'Alice Smith',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  status: 'ONLINE',
  is2FAEnabled: false,
  onboardingDone: true,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      tokens: null,
      isLoading: false,
      isAuthenticated: true,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTokens: (tokens) => set({ tokens }),
      setLoading: (isLoading) => set({ isLoading }),
      updateUserStatus: (status) => {
        const user = get().user
        if (user) set({ user: { ...user, status } })
      },
      updateAvatar: (avatarUrl) => {
        const user = get().user
        if (user) set({ user: { ...user, avatarUrl } })
      },
      signOut: () =>
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'hangout-auth',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
