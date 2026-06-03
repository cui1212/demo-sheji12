import type { Profession } from '@/types'
import { Card } from '@/components/ui/Card'
import { CheckCircle2 } from 'lucide-react'

export function TasksCard({ profession }: { profession: Profession }) {
  return (
    <Card id="tasks">
      <div className="flex items-center gap-2 mb-4"><CheckCircle2 className="w-5 h-5 text-green-500" /><h3 className="font-semibold text-gray-900">真实工作任务</h3></div>
      <ul className="space-y-3">{profession.realTasks.map((t, i) => <li key={i} className="flex gap-3 text-gray-700 leading-relaxed"><span className="text-primary font-bold shrink-0">{i + 1}.</span><span>{t}</span></li>)}</ul>
    </Card>
  )
}
