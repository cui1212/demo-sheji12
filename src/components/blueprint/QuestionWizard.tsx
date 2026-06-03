import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { quizQuestions } from '@/data/quizQuestions'
import { ProgressIndicator } from './ProgressIndicator'
import { QuestionCard } from './QuestionCard'
import { Button } from '@/components/ui/Button'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export function QuestionWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const question = quizQuestions[step - 1]
  const selectedId = answers[`q${step}`]

  const handleSelect = (id: string) => setAnswers(prev => ({ ...prev, [`q${step}`]: id }))
  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      sessionStorage.setItem('career-quiz-answers', JSON.stringify({ q1: answers.q1, q2: answers.q2, q3: selectedId || answers.q3 }))
      navigate('/blueprint/results')
    }
  }

  return (
    <div>
      <ProgressIndicator step={step} />
      {question && <QuestionCard question={question} selectedId={selectedId} onSelect={handleSelect} />}
      <div className="flex items-center justify-between mt-8">
        <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}><ArrowLeft className="w-4 h-4" />上一题</Button>
        <Button onClick={handleNext} disabled={!selectedId}>{step === 3 ? '查看结果' : '下一题'}<ArrowRight className="w-4 h-4" /></Button>
      </div>
    </div>
  )
}
