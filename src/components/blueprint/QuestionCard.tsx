import { cn } from '@/utils/cn'
import type { QuizQuestion } from '@/types'
import { ChevronRight } from 'lucide-react'

const dimLabels: Record<string, string> = { category: '岗位族群', style: '工作风格', aiAdapt: 'AI适配' }

export function QuestionCard({ question, selectedId, onSelect }: { question: QuizQuestion; selectedId?: string; onSelect: (id: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map(opt => (
          <button key={opt.id} type="button" onClick={() => onSelect(opt.id)}
            className={cn('w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
              selectedId === opt.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50')}>
            <div className="flex items-center justify-between">
              <div><p className={cn('font-medium', selectedId === opt.id ? 'text-primary' : 'text-gray-900')}>{opt.text}</p><p className="text-xs text-gray-400 mt-0.5">{dimLabels[opt.dimension] || opt.dimension}</p></div>
              <ChevronRight className={cn('w-5 h-5 transition-transform', selectedId === opt.id ? 'text-primary rotate-90' : 'text-gray-300')} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
