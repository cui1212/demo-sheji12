import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

// ─── 配色 ───
const IMPACT: Record<string, string> = {
  '新生': '#7C3AED', '重构': '#2563EB', '增强': '#059669', '低影响': '#D97706',
}

const REL_LINE: Record<string, string> = {
  '协作': '#93c5fd', '晋升': '#c4b5fd', '转行': '#86efac', '学习': '#fdba74',
}

// ─── 数据 ───
const nodesRaw = [
  { id: 'ai-engineer',          name: 'AI工程师',     impact: '新生' },
  { id: 'ai-product-manager',   name: 'AI产品经理',   impact: '新生' },
  { id: 'data-analyst',         name: '数据分析师',   impact: '重构' },
  { id: 'frontend-dev',         name: '前端开发',     impact: '重构' },
  { id: 'backend-dev',          name: '后端开发',     impact: '重构' },
  { id: 'software-engineer',    name: '软件工程师',   impact: '重构' },
  { id: 'new-media-ops',        name: '新媒体运营',   impact: '重构' },
  { id: 'content-creator',      name: '内容创作者',   impact: '重构' },
  { id: 'digital-marketing',    name: '数字营销',     impact: '重构' },
  { id: 'product-manager',      name: '产品经理',     impact: '增强' },
  { id: 'business-analyst',     name: '商业分析师',   impact: '增强' },
  { id: 'ui-ux-designer',       name: 'UI/UX设计师',  impact: '增强' },
]

const linksRaw = [
  { s: 'product-manager',    t: 'ai-product-manager', r: '晋升' },
  { s: 'frontend-dev',       t: 'ui-ux-designer',     r: '协作' },
  { s: 'frontend-dev',       t: 'backend-dev',        r: '协作' },
  { s: 'backend-dev',        t: 'software-engineer',  r: '协作' },
  { s: 'software-engineer',  t: 'ai-engineer',        r: '晋升' },
  { s: 'data-analyst',       t: 'business-analyst',   r: '转行' },
  { s: 'data-analyst',       t: 'ai-engineer',        r: '晋升' },
  { s: 'content-creator',    t: 'new-media-ops',      r: '协作' },
  { s: 'new-media-ops',      t: 'digital-marketing',  r: '转行' },
  { s: 'digital-marketing',  t: 'content-creator',    r: '协作' },
  { s: 'product-manager',    t: 'data-analyst',       r: '协作' },
  { s: 'ai-product-manager', t: 'ai-engineer',        r: '协作' },
  { s: 'backend-dev',        t: 'data-analyst',       r: '学习' },
  { s: 'ui-ux-designer',     t: 'frontend-dev',       r: '协作' },
  { s: 'software-engineer',  t: 'product-manager',    r: '转行' },
  { s: 'business-analyst',   t: 'product-manager',    r: '晋升' },
  { s: 'content-creator',    t: 'ai-product-manager', r: '学习' },
  { s: 'frontend-dev',       t: 'software-engineer',  r: '晋升' },
]

// ─── 手工布局 ───
const LAYOUT: Record<string, [number, number]> = {
  'ai-engineer':         [400, 310],
  'ai-product-manager':  [400, 130],
  'software-engineer':   [530, 180],
  'frontend-dev':        [270, 180],
  'ui-ux-designer':      [140, 130],
  'data-analyst':        [560, 310],
  'business-analyst':    [640, 200],
  'backend-dev':         [560, 440],
  'product-manager':     [400, 490],
  'content-creator':     [200, 420],
  'new-media-ops':       [200, 310],
  'digital-marketing':   [240, 490],
}

// ─── 组件 ───
export function CareerGraph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 初始化 ECharts
    const instance = echarts.init(containerRef.current)
    chartRef.current = instance

    // 构建数据
    const dedup = new Map<string, typeof linksRaw[0]>()
    linksRaw.forEach(l => {
      const key = [l.s, l.t].sort().join('|') + '::' + l.r
      if (!dedup.has(key)) dedup.set(key, l)
    })
    const uniqueLinks = Array.from(dedup.values())

    const edges = uniqueLinks.map(l => ({
      source: l.s,
      target: l.t,
      value: l.r,
      label: {
        show: false,
        formatter: l.r,
        fontSize: 11,
        fontWeight: 'bold',
        color: '#57534e',
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.08)',
        borderWidth: 0.5,
        borderRadius: 4,
        padding: [2, 6],
      },
      emphasis: { label: { show: true }, lineStyle: { width: 3 } },
      lineStyle: { color: REL_LINE[l.r], width: 1, curveness: 0, opacity: 0.35 },
    }))

    const nodes = nodesRaw.map(n => {
      const [x, y] = LAYOUT[n.id] || [400, 310]
      return {
        id: n.id, name: n.name,
        symbolSize: n.id === 'ai-engineer' ? 46 : 36,
        x, y, fixed: true,
        category: ['新生', '重构', '增强', '低影响'].indexOf(n.impact),
        itemStyle: {
          color: IMPACT[n.impact],
          borderColor: '#fff', borderWidth: 2,
          shadowBlur: 4, shadowColor: 'rgba(0,0,0,0.06)',
        },
        label: {
          show: true, position: 'bottom' as const,
          distance: 6, fontSize: 11,
          fontWeight: 'bold' as const, color: '#57534e',
        },
      }
    })

    // 设置 option
    instance.setOption({
      // 图例：AI影响等级颜色说明
      legend: {
        data: [
          { name: 'AI原生', itemStyle: { color: '#7C3AED' } },
          { name: 'AI重构', itemStyle: { color: '#2563EB' } },
          { name: 'AI增强', itemStyle: { color: '#059669' } },
          { name: '低影响', itemStyle: { color: '#D97706' } },
        ],
        top: 0,
        left: 'center',
        selectedMode: false,  // 纯展示，不响应点击
        textStyle: { fontSize: 12, color: '#78716c' },
        itemWidth: 10, itemHeight: 10, itemGap: 24,
      },
      tooltip: {
        trigger: 'item' as const,
        formatter: (p: any) => {
          if (p.dataType === 'edge') {
            const sId = typeof p.data.source === 'string' ? p.data.source : p.data.source?.id || p.data.source
            const tId = typeof p.data.target === 'string' ? p.data.target : p.data.target?.id || p.data.target
            const sName = nodesRaw.find(n => n.id === sId)?.name || sId
            const tName = nodesRaw.find(n => n.id === tId)?.name || tId
            const r = p.data.value || p.value || ''
            return `<b>${sName}</b> ${r} <b>${tName}</b>`
          }
          const node = nodesRaw.find(n => n.id === p.data.id)
          const impactLabel: Record<string, string> = { '新生': 'AI原生职业', '重构': 'AI深度重构', '增强': 'AI显著增强', '低影响': 'AI影响较低' }
          return `<b>${p.name}</b><br/><span style="color:#a8a29e">${impactLabel[node?.impact || ''] || ''}</span>`
        },
      },
      series: [{
        type: 'graph', layout: 'force', roam: 'scale', draggable: true,
        data: nodes, edges: edges,
        edgeSymbol: ['none', 'none'],
        force: {
          initIterations: 200, repulsion: 200, gravity: 0.15,
          edgeLength: 120,
          friction: 0.3, layoutAnimation: true,
        },
        categories: [
          { name: 'AI原生', itemStyle: { color: IMPACT['新生'] } },
          { name: 'AI重构', itemStyle: { color: IMPACT['重构'] } },
          { name: 'AI增强', itemStyle: { color: IMPACT['增强'] } },
          { name: '低影响', itemStyle: { color: IMPACT['低影响'] } },
        ],
        emphasis: {
          focus: 'adjacency' as const,
          lineStyle: { width: 3 },
          edgeLabel: { show: true },
          itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0,0,0,0.12)' },
        },
      }],
    })

    // hover 节点 → 显示关联连线标签
    instance.on('mouseover', (params: any) => {
      if (params.dataType === 'node') {
        const nodeId = params.data.id
        const opt = instance.getOption() as any
        const allEdges = opt.series[0].edges || []

        instance.setOption({
          series: [{
            edges: allEdges.map((e: any) => {
              const s = typeof e.source === 'string' ? e.source : e.source
              const t = typeof e.target === 'string' ? e.target : e.target
              const on = s === nodeId || t === nodeId
              return { ...e, label: { ...e.label, show: on } }
            }),
          }],
        })
      }
    })

    // 鼠标移走 → 隐藏所有连线标签
    instance.on('mouseout', () => {
      const opt = instance.getOption() as any
      const allEdges = opt.series[0].edges || []
      instance.setOption({
        series: [{
          edges: allEdges.map((e: any) => ({ ...e, label: { ...e.label, show: false } })),
        }],
      })
    })

    // 点击节点 → 跳转职业详情页
    instance.on('click', (params: any) => {
      if (params.dataType === 'node') {
        const nodeId = params.data.id
        window.location.href = `/career/${nodeId}`
      }
    })

    // Resize
    const ro = new ResizeObserver(() => instance.resize())
    ro.observe(containerRef.current!)

    return () => {
      ro.disconnect()
      instance.dispose()
      chartRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: 540, borderRadius: 20, overflow: 'hidden' }}
    />
  )
}
