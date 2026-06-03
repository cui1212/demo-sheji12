import { cn } from '@/utils/cn'

const variants: Record<string, string> = {
  default: 'bg-stone-100 text-stone-600',
  newborn: 'bg-violet-100 text-violet-700',
  restructured: 'bg-blue-100 text-blue-700',
  enhanced: 'bg-emerald-100 text-emerald-700',
  lowimpact: 'bg-amber-100 text-amber-700',
}

export function Badge({ variant = 'default', children, className }: {
  variant?: string; children: React.ReactNode; className?: string
}) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-sans tracking-wide',
      variants[variant] || variants.default,
      className,
    )}>
      {children}
    </span>
  )
}
