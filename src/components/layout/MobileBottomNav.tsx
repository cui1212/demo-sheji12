import { Link, useLocation } from 'react-router-dom'
import { Home, Wand2, GitCompare } from 'lucide-react'
import { cn } from '@/utils/cn'

const items = [
  { to: '/', label: '首页', icon: Home },
  { to: '/blueprint', label: '蓝图', icon: Wand2 },
  { to: '/compare', label: '对比', icon: GitCompare },
]

export function MobileBottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-stone-200/60">
      <div className="flex items-center justify-around h-14 safe-area-bottom">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== '/' && pathname.startsWith(to))
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center gap-0.5 text-xs font-medium no-underline font-sans transition-all duration-200',
                active ? 'text-primary scale-105' : 'text-stone-400 hover:text-stone-600',
              )}
            >
              <Icon className={cn('w-5 h-5 transition-transform duration-200', active && 'scale-110')} />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
