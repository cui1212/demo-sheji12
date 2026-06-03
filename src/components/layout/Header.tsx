import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'

export function Header() {
  const { pathname } = useLocation()
  const links = [
    { to: '/', label: '首页' },
    { to: '/blueprint', label: '生成蓝图' },
    { to: '/compare', label: '职业对比' },
  ]

  return (
    <header className="sticky top-0 z-50 glass border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-5 h-13 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <span className="text-xl font-bold tracking-tight text-stone-900 font-sans">
            职业蓝图
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map(l => {
            const active = pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to))
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  'relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors no-underline font-sans',
                  active
                    ? 'text-primary'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100',
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary animate-in-scale" />
                )}
              </Link>
            )
          })}
        </nav>

        <Link
          to="/blueprint"
          className="hidden md:inline-flex no-underline font-sans text-sm font-semibold px-4 py-2 bg-stone-900 text-white rounded-xl hover:bg-stone-800 active:scale-95 transition-all duration-200"
        >
          生成我的蓝图
        </Link>
      </div>
    </header>
  )
}
