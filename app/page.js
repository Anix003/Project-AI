'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiCheck, FiZap, FiShield, FiBarChart, FiTarget, FiCpu } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Button } from '@/components/ui/button'

import { AnimatedBackground, GridBackground } from '@/components/ui/animated-background'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const scale = useTransform(scrollY, [0, 200], [1, 0.95])

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (session) {
    return null
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-xl"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex cursor-pointer items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <span className="text-xl font-bold text-white">C</span>
            </div>
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
              Civic-AI
            </h1>
          </motion.div>
          <div className="flex gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" className="font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="default" className="group">
                Get Started
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <GridBackground />
        <AnimatedBackground variant="gradient" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div style={{ opacity, scale }} className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <FiZap className="h-4 w-4" />
                AI-Powered Solution
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-5xl leading-tight font-bold md:text-7xl"
            >
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Professional Complaint
              </span>
              <br />
              <span className="text-gray-900">Management System</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl"
            >
              Streamline complaint resolution with{' '}
              <span className="font-semibold text-blue-600">AI-powered categorization</span>,{' '}
              real-time tracking, and efficient department routing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Link href="/auth/signup">
                <Button size="xl" className="group px-10 text-lg">
                  Get Started Free
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="xl" variant="outline" className="px-10 text-lg">
                  View Demo
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <FiCheck className="h-5 w-5 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="h-5 w-5 text-green-600" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="h-5 w-5 text-green-600" />
                <span>Setup in minutes</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-24">
        <div className="bg-grid-white/10 absolute inset-0" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Ready to Transform Your <span className="mt-2 block">Complaint Management?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-blue-100">
            Join thousands of organizations using Civic-AI to streamline their complaint resolution
            process.
          </p>
          <Link href="/auth/signup">
            <Button size="xl" variant="premium" className="group px-12 text-lg">
              Create Free Account
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <span className="text-xl font-bold text-white">Civic-AI</span>
            </div>
            <p className="text-center text-gray-400">&copy; 2025 Civic-AI. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="transition hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms
              </a>
              <a href="#" className="transition hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatsSection() {
  const stats = [
    { number: 10000, label: 'Complaints Resolved', suffix: '+' },
    { number: 15, label: 'Departments', suffix: '+' },
    { number: 98, label: 'Satisfaction Rate', suffix: '%' },
    { number: 247, label: 'Support Available', prefix: '', custom: '24/7' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-20">
      <div className="bg-grid-white/10 absolute inset-0 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6))]" />
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, index }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <h3 className="mb-2 text-4xl font-bold text-white md:text-5xl">
        {stat.custom || (
          <>
            {stat.prefix}
            {inView && <CountUp end={stat.number} duration={2.5} />}
            {stat.suffix}
          </>
        )}
      </h3>
      <p className="font-medium text-blue-100">{stat.label}</p>
    </motion.div>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: FiCpu,
      title: 'AI-Powered Categorization',
      description:
        'Automatic complaint categorization and routing to the appropriate department using advanced AI.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiZap,
      title: 'Real-Time Tracking',
      description:
        'Monitor complaint status with live updates and instant notifications throughout the resolution process.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiTarget,
      title: 'Smart Suggestions',
      description:
        'Intelligent recommendations while filing complaints for clarity and faster resolution.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FiShield,
      title: 'Secure & Private',
      description:
        'Enterprise-level security with encrypted data storage and strict privacy controls.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: FiBarChart,
      title: 'Analytics Dashboard',
      description: 'Comprehensive dashboards with insights, trends, and performance metrics.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: FiZap,
      title: 'Fast Resolution',
      description: 'Streamlined workflows and automated routing ensure quick complaint resolution.',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ]

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Civic-AI
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Enterprise-grade features designed for efficient complaint management
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <div className="h-full rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 hover:border-transparent hover:shadow-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

        <div
          className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 flex transform items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <feature.icon className="h-7 w-7 text-white" />
        </div>

        <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
          {feature.title}
        </h3>

        <p className="leading-relaxed text-gray-600">{feature.description}</p>
      </div>
    </motion.div>
  )
}
