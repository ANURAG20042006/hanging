'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Layout Error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-[#0A0E1A] text-white font-sans min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-3xl text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Application Error</h2>
          <p className="text-xs text-white/60">{error?.message || 'A global rendering error occurred.'}</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  )
}
