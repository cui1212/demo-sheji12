import type { QuizAnswers, QuizResult, Profession } from '@/types'
import { quizQuestions } from '@/data/quizQuestions'

export function computeMatches(answers: QuizAnswers, professions: Profession[]): QuizResult[] {
  const answerIds = [answers.q1, answers.q2, answers.q3]
  const userTags = new Set<string>()

  answerIds.forEach(answerId => {
    for (const q of quizQuestions) {
      const opt = q.options.find(o => o.id === answerId)
      if (opt) opt.tags.forEach(tag => userTags.add(tag))
    }
  })

  const scored = professions.map(prof => {
    let score = 0
    const matchedTags: string[] = []
    userTags.forEach(tag => {
      if (prof.tags.includes(tag)) { score++; matchedTags.push(tag) }
    })
    return { prof, score, matchedTags }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    if (b.prof.studentFriendly !== a.prof.studentFriendly)
      return b.prof.studentFriendly - a.prof.studentFriendly
    return a.prof.sortOrder - b.prof.sortOrder
  })

  const top3 = scored.slice(0, 3)
  const maxScore = top3.length > 0 ? top3[0].score : 1

  return top3.map(({ prof, score, matchedTags }, idx) => {
    const normalizedScore = Math.round((score / maxScore) * 100)
    const reasons = buildReasons(matchedTags, prof)
    return {
      professionId: prof.id,
      professionName: prof.name,
      matchScore: normalizedScore,
      matchReasons: reasons,
      headline: idx === 0 ? `你的选择与${prof.name}高度契合` : `${prof.name}也是值得探索的方向`,
      nextSteps: prof.nextActions.slice(0, 3).map(a => a.label),
      aiImpactLevel: prof.aiImpactLevel,
    }
  })
}

function buildReasons(matchedTags: string[], prof: Profession): string[] {
  const reasons: string[] = []
  const tagMap: Record<string, string> = {
    '数据分析': `你选择的数据分析倾向与${prof.name}的日常工作高度匹配`,
    '产品设计': `${prof.name}需要产品设计思维，这正是你擅长的工作类型`,
    '内容表达': `你偏好的内容表达方式在${prof.name}中有很多应用场景`,
    '技术实现': `你对技术实现的兴趣与${prof.name}的技能要求契合`,
    '沟通合作': `${prof.name}需要大量沟通协作，匹配你偏好的工作方式`,
    '视觉创作': `你的视觉创作倾向在${prof.name}中能发挥价值`,
    '独立研究': `${prof.name}的工作风格中独立研究是重要组成部分`,
    '团队协作': `${prof.name}日常需要团队协作，与你偏好的工作方式匹配`,
    '快速执行': `${prof.name}的节奏适合喜欢快速执行的人`,
    '长期打磨': `${prof.name}需要长期积累和打磨，符合你的工作风格`,
    '对外沟通': `${prof.name}涉及对外沟通，与你的工作方式匹配`,
    '想用AI提效': `${prof.name}是AI提效的重点领域，你的AI态度很契合`,
    '想做AI产品': `你对AI产品的热情在${prof.name}方向上有很大的发展空间`,
    '想用AI创作': `${prof.name}可以结合AI创作工具，释放你的创作潜力`,
    '想理解底层技术': `${prof.name}能帮助你深入理解AI底层技术`,
  }
  for (const tag of matchedTags) {
    const r = tagMap[tag]
    if (r) reasons.push(r)
  }
  if (reasons.length < 3) {
    reasons.push(`${prof.name}的入门路径相对清晰，适合学生探索`)
    reasons.push(`${prof.name}在AI时代有较好的发展前景`)
  }
  return reasons.slice(0, 4)
}
