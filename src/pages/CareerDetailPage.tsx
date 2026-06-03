import { useParams, Link } from 'react-router-dom'
import { professions } from '@/data/professions'
import { CareerHeader } from '@/components/career/CareerHeader'
import { DefinitionCard } from '@/components/career/DefinitionCard'
import { TasksCard } from '@/components/career/TasksCard'
import { DayInLifeCard } from '@/components/career/DayInLifeCard'
import { SkillsCard } from '@/components/career/SkillsCard'
import { EntryPathCard } from '@/components/career/EntryPathCard'
import { AIImpactCard } from '@/components/career/AIImpactCard'
import { ConnectionsCard } from '@/components/career/ConnectionsCard'
import { NextActionsCard } from '@/components/career/NextActionsCard'
import { ArrowLeft, Share2 } from 'lucide-react'
import { useState } from 'react'
import { ShareCard } from '@/components/share/ShareCard'
import { Button } from '@/components/ui/Button'

export function CareerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const profession = professions.find(p => p.id === id)
  const [showShare, setShowShare] = useState(false)

  if (!profession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5">
        <p className="text-7xl font-bold text-stone-200 font-sans">404</p>
        <p className="text-stone-500 text-lg">未找到该职业信息</p>
        <Link to="/" className="text-primary font-medium hover:underline font-sans">返回首页</Link>
      </div>
    )
  }

  const cards = [
    { Component: DefinitionCard, id: 'definition', key: 'def' },
    { Component: TasksCard, id: 'tasks', key: 'tsk' },
    { Component: DayInLifeCard, id: 'day-in-life', key: 'day' },
    { Component: SkillsCard, id: 'skills', key: 'skl' },
    { Component: EntryPathCard, id: 'entry-path', key: 'ent' },
    { Component: AIImpactCard, id: 'ai-impact', key: 'ai' },
    { Component: ConnectionsCard, id: 'connections', key: 'con' },
    { Component: NextActionsCard, id: 'next-actions', key: 'nxt' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-5 py-8 pb-28 md:pb-16">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 mb-8 no-underline transition-colors font-sans animate-in-fast"
      >
        <ArrowLeft className="w-4 h-4" />
        返回首页
      </Link>

      {/* Header */}
      <div className="animate-in">
        <CareerHeader profession={profession} />
      </div>

      {/* Cards with staggered entrance */}
      <div className="mt-8 space-y-5">
        {cards.map(({ Component, id, key }, i) => (
          <div
            key={key}
            id={id}
            className="animate-in"
            style={{ animationDelay: `${0.1 + i * 0.08}s` }}
          >
            <Component profession={profession} />
          </div>
        ))}
      </div>

      {/* 分享按钮 */}
      <div className="flex justify-center mt-8">
        <Button variant="outline" onClick={() => setShowShare(true)}>
          <Share2 className="w-4 h-4" />
          分享这个职业
        </Button>
      </div>

      <ShareCard type="career" open={showShare} onClose={() => setShowShare(false)} profession={profession} />
    </div>
  )
}
