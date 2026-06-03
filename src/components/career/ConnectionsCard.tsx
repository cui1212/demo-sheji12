import type { Profession } from '@/types'
import { Card } from '@/components/ui/Card'
import { Link } from 'react-router-dom'
import { professions } from '@/data/professions'
import { ICON_EMOJI } from '@/constants'
import { GitBranch, Layers, ArrowRightLeft, TrendingUp } from 'lucide-react'

export function ConnectionsCard({ profession }: { profession: Profession }) {
  const c = profession.connections
  const groups = [
    { icon: Layers, label: '相似职业', ids: c.similar, color: 'text-blue-500' },
    { icon: GitBranch, label: '协作职业', ids: c.collaborative, color: 'text-green-500' },
    { icon: ArrowRightLeft, label: '可转岗', ids: c.transferable, color: 'text-purple-500' },
    { icon: TrendingUp, label: '进阶方向', ids: c.advanced, color: 'text-orange-500' },
  ]
  return (
    <Card id="connections">
      <div className="flex items-center gap-2 mb-4"><GitBranch className="w-5 h-5 text-teal-500" /><h3 className="font-semibold text-gray-900">职业连接</h3></div>
      <div className="space-y-4">
        {groups.map(({ icon: Icon, label, ids, color }) => {
          if (!ids || ids.length === 0) return null
          return (
            <div key={label}>
              <div className="flex items-center gap-1.5 mb-2"><Icon className={`w-4 h-4 ${color}`} /><p className="text-sm font-medium text-gray-500">{label}</p></div>
              <div className="flex flex-wrap gap-2">
                {ids.map(id => {
                  const prof = professions.find(p => p.id === id)
                  return prof ? (
                    <Link key={id} to={`/career/${id}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-50 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors no-underline">
                      {ICON_EMOJI[prof.icon] || '💼'} {prof.name}
                    </Link>
                  ) : null
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
