import type { Profession } from '@/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { Bookmark, GitCompare, Wand2, BookOpen } from 'lucide-react'

const icons: Record<string, React.ComponentType<{ className?: string }>> = { '收藏': Bookmark, '对比': GitCompare, '生成蓝图': Wand2, '学习路径': BookOpen }

export function NextActionsCard({ profession }: { profession: Profession }) {
  const navigate = useNavigate()
  return (
    <Card id="next-actions" hover={false}>
      <h3 className="font-semibold text-gray-900 mb-4">下一步行动</h3>
      <div className="grid grid-cols-2 gap-3">
        {profession.nextActions.map((a, i) => {
          const Icon = icons[a.type] || BookOpen
          return (
            <Button key={i} variant={i === 2 ? 'primary' : 'outline'} size="sm" className="justify-start"
              onClick={() => { if (a.url) a.url.startsWith('/') ? navigate(a.url) : window.open(a.url, '_blank') }}>
              <Icon className="w-4 h-4" />{a.label}
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
