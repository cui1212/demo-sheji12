import { cn } from '@/utils/cn'
import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> { hover?: boolean }

export function Card({ hover = false, className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl p-6 md:p-8',
        'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]',
        hover && 'transition-all duration-400 ease-out hover:shadow-[0_1px_3px_rgba(0,0,0,0.06),0_16px_40px_rgba(0,0,0,0.05)] hover:-translate-y-0.5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
