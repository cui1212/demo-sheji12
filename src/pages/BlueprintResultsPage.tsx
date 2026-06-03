import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { QuizAnswers, QuizResult } from '@/types'
import { computeMatches } from '@/utils/matching'
import { professions } from '@/data/professions'
import { ResultCard } from '@/components/blueprint/ResultCard'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { RISK_DISCLAIMER } from '@/constants'
import { ArrowRight, RefreshCw, Share2 } from 'lucide-react'
import { ShareCard } from '@/components/share/ShareCard'

export function BlueprintResultsPage() {
  const navigate = useNavigate()
  const [results, setResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)
  const [showShare, setShowShare] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('career-quiz-answers')
    if (!stored) { navigate('/blueprint', { replace: true }); return }
    const answers: QuizAnswers = JSON.parse(stored)
    const matched = computeMatches(answers, professions)
    setResults(matched)
    setLoading(false)
  }, [navigate])

  if (loading) return <Spinner />

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 pb-28">
      <div className="mb-10 animate-in">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3 font-sans">
          Your Results
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3 tracking-tight">
          你的 AI 时代职业探索方向
        </h1>
        <p className="text-stone-500 leading-relaxed">
          基于你的选择，以下是值得探索的方向
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {results.map((r, i) => (
          <div
            key={r.professionId}
            className="animate-in"
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
          >
            <ResultCard result={r} rank={i + 1} />
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-5 mb-10 animate-in animate-delay-500">
        <p className="text-sm text-amber-800 leading-relaxed font-sans">{RISK_DISCLAIMER}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 animate-in animate-delay-600">
        <Button variant="outline" onClick={() => navigate('/blueprint')}>
          <RefreshCw className="w-4 h-4" />
          重新探索
        </Button>
        <Button variant="outline" onClick={() => setShowShare(true)}>
          <Share2 className="w-4 h-4" />
          分享结果
        </Button>
        <Button onClick={() => navigate('/')}>
          探索更多职业
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <ShareCard type="blueprint" open={showShare} onClose={() => setShowShare(false)} results={results} />
    </div>
  )
}
