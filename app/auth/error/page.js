'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorCode) => {
    const errors = {
      Configuration: 'There is a problem with the server configuration.',
      AccessDenied: 'Access was denied. You do not have permission to sign in.',
      Verification: 'The verification token has expired or has already been used.',
      Default: 'An error occurred during authentication.',
      AccountDeactivated: 'Your account has been deactivated. Please contact support.',
      DatabaseError: 'A database error occurred. Please try again later.',
      OAuthSignin: 'Error occurred while trying to sign in with the provider.',
      OAuthCallback: 'Error occurred while handling the OAuth callback.',
      OAuthCreateAccount: 'Could not create OAuth account.',
      EmailCreateAccount: 'Could not create email account.',
      Callback: 'Error occurred in the callback handler.',
      OAuthAccountNotLinked: 'This email is already associated with another account. Please sign in using your original method.',
      EmailSignin: 'Check your email for a sign in link.',
      CredentialsSignin: 'Sign in failed. Check your credentials.',
      SessionRequired: 'Please sign in to access this page.',
    };

    return errors[errorCode] || errors.Default;
  };

  useEffect(() => {
    console.error('Auth Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
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

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Error
          </h1>

          <p className="text-gray-600 mb-8">
            {getErrorMessage(error)}
          </p>

          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Back to Sign In
            </Link>

            <Link
              href="/"
              className="block w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Go to Homepage
            </Link>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">
                Error Code: <span className="font-mono text-gray-700">{error}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
