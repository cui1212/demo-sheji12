import { QuestionWizard } from '@/components/blueprint/QuestionWizard'

export function BlueprintPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-10 pb-28">
      <div className="animate-in mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3 font-sans">
          Career Quiz
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3 tracking-tight">
          生成你的职业蓝图
        </h1>
        <p className="text-stone-500 leading-relaxed">
          回答 3 个问题，获得 AI 时代的职业探索建议
        </p>
      </div>

      <div className="animate-in animate-delay-200">
        <QuestionWizard />
      </div>
    </div>
  )
}
