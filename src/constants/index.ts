import type { AIImpactLevel } from '@/types'

export const AI_COLORS: Record<AIImpactLevel, { fill: string; stroke: string; label: string }> = {
  '新生': { fill: '#7C3AED', stroke: '#C4B5FD', label: 'AI原生职业' },
  '重构': { fill: '#2563EB', stroke: '#93C5FD', label: 'AI深度重构' },
  '增强': { fill: '#059669', stroke: '#A7F3D0', label: 'AI显著增强' },
  '低影响': { fill: '#D97706', stroke: '#FDE68A', label: 'AI影响较低' },
}

export const RISK_DISCLAIMER = '这不是职业测评结论，只是基于你当前选择生成的探索建议。真正适合你的方向，还需要结合项目实践、作品和真实反馈继续验证。'

export const IMPACT_VARIANT: Record<string, string> = {
  '新生': 'newborn', '重构': 'restructured', '增强': 'enhanced', '低影响': 'lowimpact',
}

export const ICON_EMOJI: Record<string, string> = {
  'bar-chart': '📊', 'trending-up': '📈', 'package': '📦', 'cpu': '🤖',
  'code': '💻', 'server': '🖥', 'terminal': '⚙️', 'brain': '🧠',
  'share': '📱', 'edit': '✍️', 'target': '🎯', 'palette': '🎨',
}
