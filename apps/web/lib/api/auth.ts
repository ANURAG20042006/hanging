import { api } from './client'
import type { AuthUser, AuthTokens } from '@/store/auth.store'

export interface RegisterPayload {
  email: string
  password: string
  username: string
  displayName: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthUser
  tokens: AuthTokens
  requiresTwoFA: boolean
}

export interface MagicLinkPayload {
  email: string
}

export interface TwoFASetupResponse {
  secret: string
  qrCodeUrl: string
  backupCodes: string[]
}

export interface TwoFAVerifyPayload {
  code: string
}

export const authApi = {
  /** Register new user */
  register: (payload: RegisterPayload) =>
    api.post<LoginResponse>('/auth/register', payload),

  /** Email + password login */
  login: (payload: LoginPayload) =>
    api.post<LoginResponse>('/auth/login', payload),

  /** Google OAuth — redirect to backend callback */
  loginWithGoogle: () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
    if (typeof window !== 'undefined') window.location.href = url
  },

  /** Request magic link */
  requestMagicLink: (payload: MagicLinkPayload) =>
    api.post<{ message: string }>('/auth/magic-link', payload),

  /** Verify magic link token (called on redirect) */
  verifyMagicLink: (token: string) =>
    api.post<LoginResponse>('/auth/magic-link/verify', { token }),

  /** Refresh access token using HttpOnly cookie */
  refresh: () => api.post<AuthTokens>('/auth/refresh'),

  /** Logout — clears server-side refresh token */
  logout: () => api.post<void>('/auth/logout'),

  /** Get current user */
  me: () => api.get<AuthUser>('/auth/me'),

  /** Enable 2FA — returns TOTP secret + QR code */
  enable2FA: () => api.post<TwoFASetupResponse>('/auth/2fa/enable'),

  /** Verify 2FA code (during setup or login) */
  verify2FA: (payload: TwoFAVerifyPayload) =>
    api.post<{ success: boolean; tokens?: AuthTokens }>('/auth/2fa/verify', payload),

  /** Disable 2FA */
  disable2FA: (code: string) =>
    api.post<{ success: boolean }>('/auth/2fa/disable', { code }),

  /** Verify email address */
  verifyEmail: (token: string) =>
    api.post<{ success: boolean }>('/auth/verify-email', { token }),

  /** Resend verification email */
  resendVerification: () =>
    api.post<{ message: string }>('/auth/resend-verification'),
}
