import { useSearchParams } from 'react-router-dom'
import { comparisonPairs } from '@/data/comparisons'
import { professions } from '@/data/professions'
import { ComparisonTable } from '@/components/compare/ComparisonTable'
import { cn } from '@/utils/cn'
import { GitCompare, Share2 } from 'lucide-react'
import { useState } from 'react'
import { ShareCard } from '@/components/share/ShareCard'
import { Button } from '@/components/ui/Button'

export function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeId = searchParams.get('pair') || comparisonPairs[0].id
  const activePair = comparisonPairs.find(p => p.id === activeId) || comparisonPairs[0]
  const [showShare, setShowShare] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 pb-28">
      <div className="mb-10 animate-in">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3 font-sans">
          Career Compare
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3 tracking-tight">
          职业对比
        </h1>
        <p className="text-stone-500 leading-relaxed">
          选择一组职业，看清差异，做出选择
        </p>
      </div>

      {/* Pair selector */}
      <div className="flex flex-wrap gap-2 mb-10 animate-in animate-delay-100">
        {comparisonPairs.map((pair, i) => (
          <button
            key={pair.id}
            type="button"
            onClick={() => setSearchParams({ pair: pair.id })}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-semibold font-sans transition-all duration-200 cursor-pointer',
              activeId === pair.id
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-500 border border-stone-200/60 hover:border-stone-300 hover:text-stone-700',
            )}
            style={{ animationDelay: `${0.1 + i * 0.05}s` }}
          >
            {(() => {
              const a = professions.find(p => p.id === pair.professionAId)
              const b = professions.find(p => p.id === pair.professionBId)
              return `${a?.name || pair.professionAId} vs ${b?.name || pair.professionBId}`
            })()}
          </button>
        ))}
      </div>

      <div className="animate-in animate-delay-200">
        <ComparisonTable pair={activePair} />
      </div>

      <div className="flex justify-center mt-6 animate-in animate-delay-300">
        <Button variant="outline" onClick={() => setShowShare(true)}>
          <Share2 className="w-4 h-4" />
          分享对比
        </Button>
      </div>

      <ShareCard type="compare" open={showShare} onClose={() => setShowShare(false)} pair={activePair} />
    </div>
  )
}
