import type { Profession } from '@/types'
import { Card } from '@/components/ui/Card'
import { Clock, Sunrise, Sun, Users, FileText } from 'lucide-react'

export function DayInLifeCard({ profession }: { profession: Profession }) {
  const d = profession.dayInLife
  const blocks = [
    { icon: Sunrise, label: '上午', content: d.morning },
    { icon: Sun, label: '下午', content: d.afternoon },
    { icon: Users, label: '协作对象', content: d.collaborators },
    { icon: FileText, label: '交付物', content: d.deliverables },
  ]
  return (
    <Card id="day-in-life">
      <div className="flex items-center gap-2 mb-4"><Clock className="w-5 h-5 text-blue-500" /><h3 className="font-semibold text-gray-900">一天怎么过</h3></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {blocks.map(({ icon: Icon, label, content }) => (
          <div key={label} className="flex gap-3"><Icon className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-gray-500 mb-1">{label}</p><p className="text-sm text-gray-700 leading-relaxed">{content}</p></div></div>
        ))}
      </div>
    </Card>
  )
}
