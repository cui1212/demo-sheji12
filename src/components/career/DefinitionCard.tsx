import type { Profession } from '@/types'
import { Card } from '@/components/ui/Card'
import { Lightbulb } from 'lucide-react'

export function DefinitionCard({ profession }: { profession: Profession }) {
  return (
    <Card id="definition">
      <div className="flex items-center gap-2 mb-3"><Lightbulb className="w-5 h-5 text-amber-500" /><h3 className="font-semibold text-gray-900">一句话定义</h3></div>
      <p className="text-lg text-gray-700 leading-relaxed">{profession.definition}</p>
    </Card>
  )
}
