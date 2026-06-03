import type { ComparisonPair } from '@/types'
import { professions } from '@/data/professions'
import { Card } from '@/components/ui/Card'
import { ICON_EMOJI } from '@/constants'

export function ComparisonTable({ pair }: { pair: ComparisonPair }) {
  const profA = professions.find(p => p.id === pair.professionAId)
  const profB = professions.find(p => p.id === pair.professionBId)
  if (!profA || !profB) return <Card><p className="text-gray-500 text-center py-8">未找到对比数据</p></Card>

  return (
    <Card hover={false}>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="text-center flex-1"><div className="text-3xl mb-2">{ICON_EMOJI[profA.icon]}</div><h3 className="font-bold text-gray-900">{profA.name}</h3><p className="text-xs text-gray-400">{profA.enName}</p></div>
        <div className="text-gray-300 font-bold text-lg px-4">VS</div>
        <div className="text-center flex-1"><div className="text-3xl mb-2">{ICON_EMOJI[profB.icon]}</div><h3 className="font-bold text-gray-900">{profB.name}</h3><p className="text-xs text-gray-400">{profB.enName}</p></div>
      </div>
      <p className="text-sm text-gray-500 mb-6 px-2">{pair.rationale}</p>
      <div>
        {pair.dimensions.map((d, i) => (
          <div key={i} className="py-4 border-b border-gray-50 last:border-0">
            <p className="text-sm font-semibold text-gray-900 mb-3">{d.label}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                {d.winner === 'A' && <span className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">优势</span>}
                <p className="text-sm font-medium text-gray-500 mb-1">{profA.name}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{d.valueA}</p>
              </div>
              <div className="relative">
                {d.winner === 'B' && <span className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">优势</span>}
                <p className="text-sm font-medium text-gray-500 mb-1">{profB.name}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{d.valueB}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500"><span className="font-medium text-gray-700">💡 建议：</span>如果还在纠结，建议两个方向各做一个小项目来验证自己的兴趣和擅长点。实践比想象更可靠。</p>
      </div>
    </Card>
  )
}
