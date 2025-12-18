'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiClock, FiUser, FiMessageSquare, FiArrowRight } from 'react-icons/fi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const ComplaintCard = ({ complaint, onClick }) => {
  const formatDate = (date) => {
    const now = new Date()
    const complaintDate = new Date(date)
    const diffInHours = Math.floor((now - complaintDate) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return complaintDate.toLocaleDateString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="group h-full overflow-hidden border-2 transition-all duration-300 hover:border-blue-300 hover:shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="line-clamp-2 text-lg transition-colors group-hover:text-blue-600">
              {complaint.title}
            </CardTitle>
            <StatusBadge status={complaint.status} />
          </div>
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-3 text-sm text-gray-600">{complaint.description}</p>

          <div className="space-y-2 text-sm text-gray-500">
            {complaint.category && (
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {complaint.category}
                </span>
              </div>
            )}

            <div className="flex items-center gap-4 border-t border-gray-100 pt-2">
              <div className="flex items-center gap-1.5">
                <FiClock className="h-4 w-4" />
                <span className="text-xs">{formatDate(complaint.createdAt)}</span>
              </div>

              {complaint.department && (
                <div className="flex items-center gap-1.5">
                  <FiUser className="h-4 w-4" />
                  <span className="text-xs">{complaint.department}</span>
                </div>
              )}

              {complaint.commentCount > 0 && (
                <div className="flex items-center gap-1.5">
                  <FiMessageSquare className="h-4 w-4" />
                  <span className="text-xs">{complaint.commentCount}</span>
                </div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="mt-4 border-t border-gray-100 pt-3"
          >
            <Button variant="ghost" size="sm" className="group w-full">
              View Details
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export const ComplaintGrid = ({ complaints, onComplaintClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {complaints.map((complaint, index) => (
        <motion.div
          key={complaint._id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ComplaintCard complaint={complaint} onClick={() => onComplaintClick?.(complaint)} />
        </motion.div>
      ))}
    </div>
  )
}

export const EmptyState = ({ title, description, actionLabel, actionHref }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
        <FiMessageSquare className="h-12 w-12 text-blue-600" />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-gray-900">{title}</h3>
      <p className="mb-6 max-w-md text-center text-gray-600">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button className="group">
            {actionLabel}
            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
    </motion.div>
  )
}
