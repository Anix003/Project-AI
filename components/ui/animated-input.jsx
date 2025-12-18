'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const FloatingLabel = ({ children, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('mb-2 block text-sm font-semibold text-gray-700 transition-all', className)}
    >
      {children}
    </label>
  )
}

export const AnimatedInput = React.forwardRef(
  ({ label, error, icon: Icon, className, ...props }, ref) => {
    return (
      <div className={cn('relative', className)}>
        {label && <FloatingLabel htmlFor={props.id}>{label}</FloatingLabel>}
        <div className="relative">
          {Icon && (
            <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <motion.input
            ref={ref}
            className={cn(
              'flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base transition-all',
              'placeholder:text-gray-400',
              'focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none',
              'hover:border-gray-300',
              'disabled:cursor-not-allowed disabled:opacity-50',
              Icon && 'pl-12',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
            )}
            whileFocus={{ scale: 1.01 }}
            {...props}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>
    )
  }
)

AnimatedInput.displayName = 'AnimatedInput'
