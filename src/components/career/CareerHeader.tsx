import type { Profession } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { AI_COLORS, IMPACT_VARIANT, ICON_EMOJI } from '@/constants'

export function CareerHeader({ profession }: { profession: Profession }) {
  const color = AI_COLORS[profession.aiImpactLevel]

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]">
      <div className="flex items-start gap-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm"
          style={{ backgroundColor: color.fill + '12', color: color.fill }}
        >
          {ICON_EMOJI[profession.icon] || '💼'}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2.5 flex-wrap mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight font-sans">
              {profession.name}
            </h1>
            <Badge variant={IMPACT_VARIANT[profession.aiImpactLevel]}>
              {color.label}
            </Badge>
          </div>
          <p className="text-stone-400 text-sm mb-4 font-sans">{profession.enName}</p>
          <div className="flex items-center gap-5 text-sm text-stone-500 font-sans">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {profession.growthRate}
            </span>
            <span>{profession.salaryRange}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
