'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ProgressBar() {
  const pathname = usePathname()

  useEffect(() => {
    // Simple progress simulation on route change
    // Can be enhanced with actual nprogress library if needed
  }, [pathname])

  return null
}
