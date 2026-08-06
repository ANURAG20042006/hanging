import { create } from 'zustand'

export interface UIState {
  // Sidebar state
  isSidebarOpen: boolean
  isChannelSidebarOpen: boolean
  isMemberListOpen: boolean

  // Active group/channel
  activeGroupId: string | null
  activeChannelId: string | null

  // Modals
  isCreateGroupModalOpen: boolean
  isInviteModalOpen: boolean
  isUploadModalOpen: boolean
  isSettingsOpen: boolean
  activeSettingsTab: string
  isShopOpen: boolean
  isGameModalOpen: boolean
  activeGame: any | null

  // Notifications panel
  isNotificationPanelOpen: boolean
  unreadNotificationCount: number

  // Search
  isSearchOpen: boolean
  searchQuery: string

  // Actions
  setSidebarOpen: (open: boolean) => void
  setChannelSidebarOpen: (open: boolean) => void
  setMemberListOpen: (open: boolean) => void
  setActiveGroup: (id: string | null) => void
  setActiveChannel: (id: string | null) => void
  setCreateGroupModal: (open: boolean) => void
  setInviteModal: (open: boolean) => void
  setUploadModal: (open: boolean) => void
  setSettingsOpen: (open: boolean, tab?: string) => void
  setShopOpen: (open: boolean) => void
  setGameModal: (open: boolean, game?: any) => void
  setNotificationPanel: (open: boolean) => void
  setUnreadNotifications: (count: number) => void
  decrementUnreadNotifications: () => void
  setSearchOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: true,
  isChannelSidebarOpen: true,
  isMemberListOpen: false,
  activeGroupId: null,
  activeChannelId: null,
  isCreateGroupModalOpen: false,
  isInviteModalOpen: false,
  isUploadModalOpen: false,
  isSettingsOpen: false,
  activeSettingsTab: 'profile',
  isShopOpen: false,
  isGameModalOpen: false,
  activeGame: null,
  isNotificationPanelOpen: false,
  unreadNotificationCount: 0,
  isSearchOpen: false,
  searchQuery: '',

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setChannelSidebarOpen: (open) => set({ isChannelSidebarOpen: open }),
  setMemberListOpen: (open) => set({ isMemberListOpen: open }),
  setActiveGroup: (id) => set({ activeGroupId: id }),
  setActiveChannel: (id) => set({ activeChannelId: id }),
  setCreateGroupModal: (open) => set({ isCreateGroupModalOpen: open }),
  setInviteModal: (open) => set({ isInviteModalOpen: open }),
  setUploadModal: (open) => set({ isUploadModalOpen: open }),
  setSettingsOpen: (open, tab) =>
    set({ isSettingsOpen: open, activeSettingsTab: tab ?? 'profile' }),
  setShopOpen: (open) => set({ isShopOpen: open }),
  setGameModal: (open, game) => set({ isGameModalOpen: open, activeGame: game ?? null }),
  setNotificationPanel: (open) => set({ isNotificationPanelOpen: open }),
  setUnreadNotifications: (count) => set({ unreadNotificationCount: count }),
  decrementUnreadNotifications: () =>
    set((state) => ({
      unreadNotificationCount: Math.max(0, state.unreadNotificationCount - 1),
    })),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
