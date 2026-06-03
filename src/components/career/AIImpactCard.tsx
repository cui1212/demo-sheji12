import type { Profession } from '@/types'
import { Card } from '@/components/ui/Card'
import { AI_COLORS } from '@/constants'
import { Sparkles, Zap, Shield, Lightbulb, MessageSquare } from 'lucide-react'

export function AIImpactCard({ profession }: { profession: Profession }) {
  const color = AI_COLORS[profession.aiImpactLevel]
  const a = profession.aiImpact
  const items = [
    { icon: Zap, label: '替代风险', content: a.replaced, color: 'text-red-500' },
    { icon: Sparkles, label: 'AI 增强', content: a.enhanced, color: 'text-blue-500' },
    { icon: Shield, label: '不可替代', content: a.retained, color: 'text-green-500' },
    { icon: Lightbulb, label: '新机会', content: a.newOpportunities, color: 'text-purple-500' },
  ]
  return (
    <Card id="ai-impact" className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{ backgroundColor: color.fill, borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5" style={{ color: color.fill }} /><h3 className="font-semibold text-gray-900">AI 影响</h3>
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: color.fill + '1A', color: color.fill }}>{color.label}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {items.map(({ icon: Icon, label, content, color: c }) => (
          <div key={label} className="flex gap-3"><Icon className={`w-5 h-5 shrink-0 mt-0.5 ${c}`} /><div><p className="text-sm font-medium text-gray-500 mb-0.5">{label}</p><p className="text-sm text-gray-700 leading-relaxed">{content}</p></div></div>
        ))}
      </div>
      <div className="flex gap-2 bg-gray-50 rounded-xl p-3"><MessageSquare className="w-5 h-5 text-gray-400 shrink-0" /><p className="text-sm text-gray-700 font-medium">{a.conclusion}</p></div>
    </Card>
  )
}
