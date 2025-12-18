'use client'

import Link from 'next/link'

export default function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Authentication Error</h1>
        <p className="mb-8 text-gray-600">
          An error occurred during authentication. Please try again.
        </p>
        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="block w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Sign In
          </Link>
          <Link
            href="/"
            className="block w-full rounded-lg bg-gray-100 py-3 font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
