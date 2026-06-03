import { cn } from '@/utils/cn'

export function ProgressIndicator({ step, total = 3 }: { step: number; total?: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1 last:flex-[0]">
          <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all', i + 1 <= step ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400')}>
            {i + 1 < step ? '✓' : i + 1}
          </div>
          {i < total - 1 && <div className={cn('flex-1 h-0.5 rounded transition-colors', i + 1 < step ? 'bg-primary' : 'bg-gray-200')} />}
        </div>
      ))}
    </div>
  )
}
