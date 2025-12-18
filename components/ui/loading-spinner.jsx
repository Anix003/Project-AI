'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const LoadingSpinner = ({ size = 'default', className }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-blue-600/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export const PulseLoader = ({ className }) => {
  return (
    <div className={cn('flex space-x-2', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-3 w-3 rounded-full bg-blue-600"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

export const BarLoader = ({ className }) => {
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-blue-600 to-indigo-600"
          animate={{
            height: ['20px', '40px', '20px'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

export const FullPageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative mx-auto h-24 w-24">
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600"
              animate={{
                rotate: [0, 180, 360],
                borderRadius: ['30%', '50%', '30%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-4 rounded-2xl bg-white"
              animate={{
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="z-10 text-3xl font-bold text-white">C</span>
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent"
        >
          Loading Experience
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <BarLoader />
        </motion.div>
      </div>
    </motion.div>
  )
}

export const SkeletonCard = ({ className }) => {
  return (
    <div className={cn('rounded-2xl border border-gray-200 bg-white p-6', className)}>
      <motion.div
        className="mb-4 h-6 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <motion.div
        className="mb-3 h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.1,
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <motion.div
        className="h-4 w-2/3 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.2,
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  )
}
