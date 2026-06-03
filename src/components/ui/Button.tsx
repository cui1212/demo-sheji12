import { cn } from '@/utils/cn'
import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: Props) {
  const v = {
    primary: 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm',
    secondary: 'bg-stone-100 text-stone-700 hover:bg-stone-200',
    outline: 'border-2 border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50',
    ghost: 'text-stone-500 hover:text-stone-800 hover:bg-stone-100',
  }
  const s = {
    sm: 'px-3.5 py-2 text-sm gap-1.5 rounded-xl',
    md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
    lg: 'px-7 py-3.5 text-base gap-2.5 rounded-2xl',
  }
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold font-sans transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
        'active:scale-[0.97]',
        v[variant],
        s[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
