export type AIImpactLevel = '新生' | '重构' | '增强' | '低影响'

export interface Profession {
  id: string; name: string; enName: string
  category: 'data' | 'product' | 'tech' | 'design' | 'marketing' | 'content'
  aiImpactLevel: AIImpactLevel
  icon: string
  starMapPosition: { x: number; y: number }
  definition: string
  realTasks: string[]
  dayInLife: { morning: string; afternoon: string; collaborators: string; deliverables: string }
  skills: { hardSkills: string[]; softSkills: string[]; tools: string[]; bonus: string[] }
  entryPath: { timeline: string; learningContent: string; projects: string; portfolio: string; firstWeek: string }
  aiImpact: { replaced: string; enhanced: string; retained: string; newOpportunities: string; conclusion: string }
  connections: { similar: string[]; collaborative: string[]; transferable: string[]; advanced: string[] }
  nextActions: { label: string; type: '收藏' | '对比' | '生成蓝图' | '学习路径'; url?: string }[]
  tags: string[]
  isHot: boolean; salaryRange: string; growthRate: string
  studentFriendly: number; sortOrder: number
}

export interface QuizQuestion {
  id: number; text: string
  options: { id: string; text: string; dimension: 'category' | 'style' | 'aiAdapt'; tags: string[] }[]
}

export interface QuizAnswers { q1: string; q2: string; q3: string }

export interface QuizResult {
  professionId: string; professionName: string; matchScore: number
  matchReasons: string[]; headline: string; nextSteps: string[]; aiImpactLevel: string
}

export interface ComparisonPair {
  id: string; professionAId: string; professionBId: string
  rationale: string
  dimensions: { label: string; valueA: string; valueB: string; winner: 'A' | 'B' | 'tie' }[]
}
