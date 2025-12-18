import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Civic-AI - AI-Powered Complaint Management',
  description:
    'File, track, and resolve complaints with AI-powered categorization and real-time updates',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              },
              success: {
                style: {
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#10b981',
                },
              },
              error: {
                style: {
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#ef4444',
                },
              },
              loading: {
                style: {
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
