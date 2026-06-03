import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CareerGraph } from '@/components/starmap/CareerGraph'
import { professions } from '@/data/professions'
import { ICON_EMOJI, AI_COLORS } from '@/constants'
import { ArrowRight } from 'lucide-react'

const hotCareers = professions.filter(p => p.isHot)

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-grid">
        {/* Top gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-12 md:pt-28 md:pb-20 text-center">
          {/* Eyebrow */}
          <p className="text-xs font-semibold tracking-widest uppercase text-primary/60 mb-6 font-sans animate-in-fast">
            Career Blueprint
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-stone-900 mb-5 tracking-tight leading-[1.08] max-w-3xl mx-auto animate-in">
            AI 时代，你的职业路线会被重写吗？
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-stone-500 mb-10 max-w-xl mx-auto animate-in animate-delay-100 leading-relaxed">
            先看懂一个职业，再决定下一步怎么走。
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 mb-16 animate-in animate-delay-200">
            <Button size="lg" onClick={() => navigate('/blueprint')}>
              生成我的职业蓝图
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('hot-careers')?.scrollIntoView({ behavior: 'smooth' })}
            >
              先看看热门职业
            </Button>
          </div>

          {/* Star Map */}
          <div className="animate-in animate-delay-300">
            <CareerGraph />
          </div>
        </div>
      </section>

      {/* Hot Careers */}
      <section id="hot-careers" className="max-w-6xl mx-auto px-5 py-20 md:py-28">
        <div className="mb-10 animate-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3 font-sans">
            Popular Roles
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            热门职业
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {hotCareers.map((c, i) => {
            const aiColor = AI_COLORS[c.aiImpactLevel] || AI_COLORS['增强']
            return (
              <Link
                key={c.id}
                to={`/career/${c.id}`}
                className="group relative bg-white rounded-3xl p-5 md:p-6 no-underline transition-all duration-400 ease-out hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] animate-in"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                {/* AI color indicator line at top */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ backgroundColor: aiColor.fill }}
                />

                <div className="text-3xl md:text-4xl mb-4">{ICON_EMOJI[c.icon] || '💼'}</div>
                <h3 className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors font-sans text-sm md:text-base mb-1">
                  {c.name}
                </h3>
                <p className="text-xs text-stone-400 font-sans">{c.enName}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: aiColor.fill }} />
                  <span className="text-xs text-stone-400 font-sans">{aiColor.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-5 pb-20 md:pb-28">
        <div className="relative bg-stone-900 rounded-[2.5rem] p-10 md:p-16 text-center overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4 font-sans">
              Not Sure Where to Start?
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              不确定从哪开始？
            </h2>
            <p className="text-stone-400 mb-8 max-w-md mx-auto leading-relaxed">
              回答 3 个简单问题，找到适合你的 AI 时代职业方向。
            </p>
            <Button
              size="lg"
              className="!bg-white !text-stone-900 hover:!bg-stone-100"
              onClick={() => navigate('/blueprint')}
            >
              生成我的职业蓝图
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
