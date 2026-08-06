import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { useAuthStore } from '@/store/auth.store'

// ── Base API client ───────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  withCredentials: true, // For HttpOnly refresh token cookie
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ── Request interceptor: attach JWT ──────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = useAuthStore.getState().tokens
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ── Response interceptor: token refresh + error handling ─────
let isRefreshing = false
let refreshQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  refreshQueue = []
}

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean }

    // Handle 401 Unauthorized — attempt token refresh
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        // Queue subsequent requests while refreshing
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token) => {
              if (original.headers) {
                original.headers['Authorization'] = `Bearer ${token}`
              }
              resolve(apiClient(original))
            },
            reject,
          })
        })
      }

      original._retry = true
      isRefreshing = true

      try {
        const response = await apiClient.post<{ accessToken: string; expiresAt: number }>(
          '/auth/refresh',
        )
        const { accessToken, expiresAt } = response.data
        useAuthStore.getState().setTokens({ accessToken, expiresAt })
        processQueue(null, accessToken)
        if (original.headers) {
          original.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return apiClient(original)
      } catch (refreshError) {
        processQueue(refreshError, null)
        // Refresh failed — sign out
        useAuthStore.getState().signOut()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Extract error message from response
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      'An unexpected error occurred'

    return Promise.reject(new Error(message))
  },
)

// ── Typed API helpers ─────────────────────────────────────────
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((r) => r.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((r) => r.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((r) => r.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((r) => r.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((r) => r.data),

  upload: <T>(url: string, formData: FormData, onProgress?: (pct: number) => void) =>
    apiClient
      .post<T>(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (onProgress && e.total) {
            onProgress(Math.round((e.loaded * 100) / e.total))
          }
        },
      })
      .then((r) => r.data),
}

export type { AxiosRequestConfig }
