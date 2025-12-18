import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base transition-all',
        'placeholder:text-gray-400',
        'focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none',
        'hover:border-gray-300',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
