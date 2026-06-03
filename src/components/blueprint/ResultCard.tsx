import type { QuizResult } from '@/types'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Trophy, Medal, Award, ArrowRight } from 'lucide-react'
import { AI_COLORS, IMPACT_VARIANT } from '@/constants'

const rankIcons = [Trophy, Medal, Award]
const rankColors = ['text-amber-500', 'text-gray-400', 'text-orange-400']

export function ResultCard({ result, rank }: { result: QuizResult; rank: number }) {
  const idx = rank - 1
  const RI = rankIcons[idx]
  const ic = AI_COLORS[result.aiImpactLevel as keyof typeof AI_COLORS] || AI_COLORS['增强']
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex flex-col items-center shrink-0"><RI className={`w-7 h-7 ${rankColors[idx]}`} /><span className="text-xs text-gray-400 mt-1">#{rank}</span></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1"><h3 className="text-lg font-bold text-gray-900">{result.professionName}</h3><Badge variant={IMPACT_VARIANT[result.aiImpactLevel] || 'default'}>{ic.label}</Badge></div>
          <p className="text-sm text-gray-500 mb-3">{result.headline}</p>
          <div className="flex items-center gap-2 mb-3"><div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-1000" style={{ width: `${result.matchScore}%`, backgroundColor: ic.fill }} /></div><span className="text-sm font-semibold text-gray-700">{result.matchScore}%</span></div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="text-xs font-medium text-gray-400 mb-2">推荐理由</p>
        <ul className="space-y-1.5">{result.matchReasons.map((r, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-primary">•</span>{r}</li>)}</ul>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">{result.nextSteps.map((s, i) => <span key={i} className="text-xs px-2.5 py-1 bg-gray-50 text-gray-600 rounded-full">{s}</span>)}</div>
      <div className="pt-4 border-t border-gray-100">
        <Link to={`/career/${result.professionId}`} className="no-underline"><Button variant="ghost" size="sm" className="text-primary">查看详情<ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  )
}
