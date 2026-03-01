import { create } from 'zustand'

interface AppState {
  currentUser: string
  likedPosts: string[]
  darkMode: boolean
  notificationsEnabled: boolean
  toggleLike: (postId: string) => void
  toggleDarkMode: () => void
  toggleNotifications: () => void
}

export const useStore = create<AppState>((set) => ({
  currentUser: '[username]',
  likedPosts: [],
  darkMode: false,
  notificationsEnabled: true,

  toggleLike: (postId) =>
    set((s) => ({
      likedPosts: s.likedPosts.includes(postId)
        ? s.likedPosts.filter((id) => id !== postId)
        : [...s.likedPosts, postId],
    })),

  toggleDarkMode: () =>
    set((s) => {
      const next = !s.darkMode
      if (next) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      return { darkMode: next }
    }),

  toggleNotifications: () =>
    set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
}))
