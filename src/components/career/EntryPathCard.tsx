import type { Profession } from '@/types'
import { Card } from '@/components/ui/Card'
import { GraduationCap, BookOpen, Code2, FolderKanban, Rocket } from 'lucide-react'

function ClockIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
}

export function EntryPathCard({ profession }: { profession: Profession }) {
  const e = profession.entryPath
  const items = [
    { icon: ClockIcon, label: '入门周期', content: e.timeline },
    { icon: BookOpen, label: '学习内容', content: e.learningContent },
    { icon: Code2, label: '入门项目', content: e.projects },
    { icon: FolderKanban, label: '作品集', content: e.portfolio },
    { icon: Rocket, label: '第一周行动', content: e.firstWeek },
  ]
  return (
    <Card id="entry-path">
      <div className="flex items-center gap-2 mb-4"><GraduationCap className="w-5 h-5 text-indigo-500" /><h3 className="font-semibold text-gray-900">入门路径</h3></div>
      <div className="space-y-4">{items.map(({ icon: Icon, label, content }) => <div key={label} className="flex gap-3"><Icon className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-gray-500 mb-0.5">{label}</p><p className="text-sm text-gray-700 leading-relaxed">{content}</p></div></div>)}</div>
    </Card>
  )
}
