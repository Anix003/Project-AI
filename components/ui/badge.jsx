'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const Badge = ({ children, variant = 'default', className, ...props }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    success: 'bg-green-100 text-green-700 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    error: 'bg-red-100 text-red-700 hover:bg-red-200',
    purple: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export const StatusBadge = ({ status, className }) => {
  const statusConfig = {
    pending: { variant: 'warning', label: 'Pending' },
    'in-progress': { variant: 'default', label: 'In Progress' },
    resolved: { variant: 'success', label: 'Resolved' },
    rejected: { variant: 'error', label: 'Rejected' },
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <Badge variant={config.variant} className={className}>
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </Badge>
  )
}
