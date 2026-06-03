import type { Profession } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Wrench } from 'lucide-react'

export function SkillsCard({ profession }: { profession: Profession }) {
  const s = profession.skills
  const groups = [
    { label: '硬技能', items: s.hardSkills, color: 'bg-blue-50 text-blue-700' },
    { label: '软技能', items: s.softSkills, color: 'bg-green-50 text-green-700' },
    { label: '工具', items: s.tools, color: 'bg-purple-50 text-purple-700' },
    { label: '加分项', items: s.bonus, color: 'bg-amber-50 text-amber-700' },
  ]
  return (
    <Card id="skills">
      <div className="flex items-center gap-2 mb-4"><Wrench className="w-5 h-5 text-purple-500" /><h3 className="font-semibold text-gray-900">能力要求</h3></div>
      <div className="space-y-4">{groups.map(({ label, items, color }) => <div key={label}><p className="text-sm font-medium text-gray-500 mb-2">{label}</p><div className="flex flex-wrap gap-2">{items.map(item => <Badge key={item} className={color}>{item}</Badge>)}</div></div>)}</div>
    </Card>
  )
}
