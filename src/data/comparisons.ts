import type { ComparisonPair } from '@/types'

export const comparisonPairs: ComparisonPair[] = [
  {
    id: 'data-analyst-vs-business-analyst',
    professionAId: 'data-analyst', professionBId: 'business-analyst',
    rationale: '两个岗位都与数据打交道，但一个偏技术分析，一个偏业务方案，很多学生分不清。',
    dimensions: [
      { label: '核心工作', valueA: '从数据中找洞察，写分析报告', valueB: '梳理业务需求，设计方案', winner: 'tie' },
      { label: '入门难度', valueA: '需学 SQL 和 Python，技术门槛中等', valueB: '不限专业，沟通和文档能力最重要', winner: 'B' },
      { label: 'AI 影响', valueA: '基础取数被替代，懂业务的分析师更值钱', valueB: '文档自动化，但策略判断不可替代', winner: 'tie' },
      { label: '常用工具', valueA: 'SQL, Python, Tableau, Excel', valueB: 'Visio, Axure, JIRA, Excel', winner: 'tie' },
      { label: '适合人群', valueA: '喜欢和数据打交道、逻辑强的同学', valueB: '喜欢和人沟通、梳理流程的同学', winner: 'tie' },
      { label: '下一步建议', valueA: '先学 SQL，找个公开数据集做分析练习', valueB: '选一个 App 写一份优化方案文档', winner: 'tie' },
    ],
  },
  {
    id: 'pm-vs-newmedia',
    professionAId: 'product-manager', professionBId: 'new-media-ops',
    rationale: '产品经理和新媒体运营都是热门岗位，一个做产品一个做内容，工作方式差异大。',
    dimensions: [
      { label: '核心工作', valueA: '定义产品做什么，推动功能上线', valueB: '运营账号，用内容吸引用户', winner: 'tie' },
      { label: '入门难度', valueA: '需理解产品思维和技术边界', valueB: '门槛低，但做出爆款需要天赋', winner: 'B' },
      { label: 'AI 影响', valueA: 'AI 辅助写 PRD，产品判断仍是核心', valueB: 'AI 辅助创作，网感和创意更稀缺', winner: 'tie' },
      { label: '常用工具', valueA: 'Figma, JIRA, Excel, 飞书', valueB: '剪映, Canva, 微信公众号后台', winner: 'tie' },
      { label: '适合人群', valueA: '喜欢分析和规划、能多方沟通的同学', valueB: '有网感、喜欢创作和追热点的同学', winner: 'tie' },
      { label: '下一步建议', valueA: '选一个 App 写 3 个产品改进建议', valueB: '注册一个账号，连续发 7 天内容', winner: 'tie' },
    ],
  },
  {
    id: 'frontend-vs-backend',
    professionAId: 'frontend-dev', professionBId: 'backend-dev',
    rationale: '前端和后端是开发岗的两大方向，选择哪一个取决于你喜欢视觉交互还是逻辑系统。',
    dimensions: [
      { label: '核心工作', valueA: '还原设计稿，做页面交互', valueB: '设计接口和数据库，处理业务逻辑', winner: 'tie' },
      { label: '入门难度', valueA: '门槛较低，能快速看到效果', valueB: '门槛较高，需要理解抽象概念', winner: 'A' },
      { label: 'AI 影响', valueA: '简单页面可被 AI 生成，复杂交互仍需要人', valueB: 'CRUD 可被 AI 生成，架构设计不可替代', winner: 'tie' },
      { label: '常用工具', valueA: 'VS Code, React/Vue, Chrome DevTools', valueB: 'Java/Go, MySQL, Redis, Docker', winner: 'tie' },
      { label: '适合人群', valueA: '喜欢视觉反馈、有审美要求的同学', valueB: '喜欢逻辑抽象、关注系统整体的同学', winner: 'tie' },
      { label: '下一步建议', valueA: '用 HTML/CSS 写一个个人主页', valueB: '学一门后端语言，写一个登录接口', winner: 'tie' },
    ],
  },
  {
    id: 'ai-pm-vs-pm',
    professionAId: 'ai-product-manager', professionBId: 'product-manager',
    rationale: 'AI 产品经理是产品经理的新分支，但工作内容和技术要求有很大不同。',
    dimensions: [
      { label: '核心工作', valueA: '定义 AI 产品能力和交互范式', valueB: '定义产品功能和用户体验', winner: 'tie' },
      { label: '入门难度', valueA: '需理解 AI 模型能力和限制', valueB: '不限专业，产品思维最重要', winner: 'B' },
      { label: 'AI 影响', valueA: 'AI 原生岗位，持续受益于 AI 发展', valueB: 'AI 增强效率，但角色本身不变', winner: 'A' },
      { label: '常用工具', valueA: 'ChatGPT/Claude, Figma, Python 基础', valueB: 'Figma, JIRA, Excel', winner: 'tie' },
      { label: '适合人群', valueA: '对 AI 有热情、愿持续学习的同学', valueB: '喜欢洞察用户、规划产品的同学', winner: 'tie' },
      { label: '下一步建议', valueA: '每天体验一款 AI 产品并写分析', valueB: '从产品经理做起，再逐步转 AI 方向', winner: 'B' },
    ],
  },
  {
    id: 'content-vs-newmedia',
    professionAId: 'content-creator', professionBId: 'new-media-ops',
    rationale: '内容创作者和新媒体运营都做内容，但一个重深度创作，一个重平台运营。',
    dimensions: [
      { label: '核心工作', valueA: '围绕领域持续产出深度内容', valueB: '运营社交账号，用内容获客转化', winner: 'tie' },
      { label: '入门难度', valueA: '门槛低，但需要持续产出能力', valueB: '门槛低，但需要网感和运营思维', winner: 'tie' },
      { label: 'AI 影响', valueA: 'AI 辅助创作，独特观点更稀缺', valueB: 'AI 辅助运营，策略思维更值钱', winner: 'tie' },
      { label: '常用工具', valueA: '剪映, Notion, Canva', valueB: '剪映, 微信后台, Canva, 数据分析工具', winner: 'tie' },
      { label: '适合人群', valueA: '有表达欲、愿意持续输出的同学', valueB: '喜欢运营、追热点、做增长的同学', winner: 'tie' },
      { label: '下一步建议', valueA: '确定一个方向，发布第一篇内容', valueB: '注册一个账号，连续运营 7 天', winner: 'tie' },
    ],
  },
]
