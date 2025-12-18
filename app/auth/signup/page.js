'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight } from 'react-icons/fi'
import { AnimatedInput } from '@/components/ui/animated-input'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AnimatedBackground } from '@/components/ui/animated-background'

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    department: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (formData.role === 'department' && !formData.department) {
      toast.error('Please select a department')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          department: formData.department,
          phone: formData.phone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      toast.success('Account created successfully!')

      // Auto sign in
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })

      if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      toast.error('Failed to sign up with Google')
    }
  }

  const departments = [
    'Public Works',
    'Water Supply',
    'Electricity',
    'Sanitation',
    'Roads & Transportation',
    'Healthcare',
    'Education',
    'Public Safety',
    'Environment',
  ]

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
      <AnimatedBackground variant="gradient" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-3xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50">
              <span className="text-3xl font-bold text-white">C</span>
            </div>
            <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">
              Create Account
            </h1>
            <p className="text-gray-600">Join Civic-AI and make a difference</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <AnimatedInput
                type="text"
                id="name"
                name="name"
                label="Full Name"
                icon={FiUser}
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />

              <AnimatedInput
                type="email"
                id="email"
                name="email"
                label="Email Address"
                icon={FiMail}
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <AnimatedInput
                type="password"
                id="password"
                name="password"
                label="Password"
                icon={FiLock}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />

              <AnimatedInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                icon={FiLock}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="role" className="mb-2 block text-sm font-semibold text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="department">Department</option>
                  <option value="authority">Authority</option>
                  <option value="developer">Developer</option>
                </select>
              </div>

              <AnimatedInput
                type="tel"
                id="phone"
                name="phone"
                label="Phone (Optional)"
                icon={FiPhone}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1234567890"
              />
            </div>

            {formData.role === 'department' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="department"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={loading}
                className="group h-12 w-full text-base"
                size="lg"
              >
                {loading ? (
                  <LoadingSpinner size="sm" className="text-white" />
                ) : (
                  <>
                    Create Account
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white/80 px-4 font-medium text-gray-500">Or continue with</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignUp}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white py-3 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:shadow-md"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-gray-600"
          >
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="font-bold text-blue-600 transition-colors hover:text-indigo-600"
            >
              Sign in
            </Link>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700"
            >
              ← Back to Home
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
