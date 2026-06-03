import type { QuizQuestion } from '@/types'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: '你更愿意面对哪类工作？',
    options: [
      { id: 'data-analysis', text: '数据分析', dimension: 'category', tags: ['数据分析'] },
      { id: 'product-design', text: '产品设计', dimension: 'category', tags: ['产品设计'] },
      { id: 'content-expression', text: '内容表达', dimension: 'category', tags: ['内容表达'] },
      { id: 'tech-implementation', text: '技术实现', dimension: 'category', tags: ['技术实现'] },
      { id: 'communication', text: '沟通合作', dimension: 'category', tags: ['沟通合作'] },
      { id: 'visual-creation', text: '视觉创作', dimension: 'category', tags: ['视觉创作'] },
    ],
  },
  {
    id: 2,
    text: '你更喜欢哪种工作方式？',
    options: [
      { id: 'independent-research', text: '独立研究', dimension: 'style', tags: ['独立研究'] },
      { id: 'team-collaboration', text: '团队协作', dimension: 'style', tags: ['团队协作'] },
      { id: 'fast-execution', text: '快速执行', dimension: 'style', tags: ['快速执行'] },
      { id: 'long-term-polish', text: '长期打磨', dimension: 'style', tags: ['长期打磨'] },
      { id: 'external-communication', text: '对外沟通', dimension: 'style', tags: ['对外沟通'] },
    ],
  },
  {
    id: 3,
    text: '你对 AI 的态度更接近哪种？',
    options: [
      { id: 'use-ai-efficiency', text: '想用 AI 提效', dimension: 'aiAdapt', tags: ['想用AI提效'] },
      { id: 'build-ai-product', text: '想做 AI 产品', dimension: 'aiAdapt', tags: ['想做AI产品'] },
      { id: 'create-with-ai', text: '想用 AI 创作', dimension: 'aiAdapt', tags: ['想用AI创作'] },
      { id: 'understand-ai-tech', text: '想理解底层技术', dimension: 'aiAdapt', tags: ['想理解底层技术'] },
      { id: 'avoid-ai-risks', text: '暂时只想避坑', dimension: 'aiAdapt', tags: ['暂时只想避坑'] },
    ],
  },
]
