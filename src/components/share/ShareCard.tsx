import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { X, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AI_COLORS, ICON_EMOJI, IMPACT_VARIANT } from '@/constants'
import { Badge } from '@/components/ui/Badge'
import type { QuizResult, ComparisonPair, Profession } from '@/types'
import { professions as allProfessions } from '@/data/professions'

type ShareType = 'blueprint' | 'compare' | 'career'

interface Props {
  type: ShareType
  open: boolean
  onClose: () => void
  // 蓝图结果
  results?: QuizResult[]
  // 职业对比
  pair?: ComparisonPair
  // 职业详情
  profession?: Profession
}

export function ShareCard({ type, open, onClose, results, pair, profession }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  if (!open) return null

  const handleDownload = async () => {
    if (!cardRef.current) return
    setDownloading(true)
    const el = cardRef.current
    // 保存前移除高度限制，确保捕获完整内容
    const origMaxH = el.style.maxHeight
    const origOverflow = el.style.overflow
    el.style.maxHeight = 'none'
    el.style.overflow = 'visible'
    try {
      const dataUrl = await toPng(el, { quality: 0.95, pixelRatio: 2 })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `职业蓝图_${type}.png`
      a.click()
    } catch (e) {
      console.error('下载失败', e)
    }
    el.style.maxHeight = origMaxH
    el.style.overflow = origOverflow
    setDownloading(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '职业蓝图',
          text: '来看看AI时代的职业探索方向',
          url: window.location.href,
        })
      } catch { /* 用户取消 */ }
    } else {
      handleDownload()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-all duration-300"
      style={{
        backgroundColor: open ? 'rgba(0,0,0,0.5)' : 'transparent',
        backdropFilter: open ? 'blur(4px)' : 'none',
        opacity: open ? 1 : 0,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* 操作按钮栏 - 浮在卡片上方 */}
      <div
        className="flex items-center gap-2 mb-3 transition-all duration-300"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur text-gray-700 rounded-xl text-sm font-semibold hover:bg-white transition-colors"
        >
          <Download className="w-4 h-4" />
          {downloading ? '生成中...' : '保存图片'}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur text-gray-700 rounded-xl text-sm font-semibold hover:bg-white transition-colors"
        >
          <Share2 className="w-4 h-4" />
          分享
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-white/90 backdrop-blur text-gray-400 rounded-xl hover:text-gray-600 hover:bg-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 卡片内容 - 无额外包装，直接展示设计稿 */}
      <div
        ref={cardRef}
        className="transition-all duration-400 ease-out"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1)' : 'scale(0.92)',
          maxHeight: '80vh',
          overflow: 'auto',
          borderRadius: 20,
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        }}
      >
        {type === 'blueprint' && results && <BlueprintContent results={results} />}
        {type === 'compare' && pair && <CompareContent pair={pair} />}
        {type === 'career' && profession && <CareerContent profession={profession} />}
      </div>
    </div>
  )
}

// ─── 蓝图结果 ───

// ─── 蓝图结果海报 ───

function BlueprintContent({ results }: { results: QuizResult[] }) {
  const mainColor = '#6366f1'

  return (
    <div style={{ width: 440, fontFamily: '"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif', background: 'linear-gradient(160deg, #eef2ff 0%, #f5f3ff 50%, #fafaf9 100%)', borderRadius: 20, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '22px 28px 0', textAlign: 'center' }}>
        <div style={{ color: mainColor, fontSize: 10, letterSpacing: 3, fontWeight: 700, marginBottom: 6 }}>CAREER BLUEPRINT</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#1f2937', letterSpacing: 1, marginBottom: 4 }}>我的 AI 时代职业探索方向</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>基于你的偏好，AI 为你推荐的 3 个职业方向</div>
      </div>

      {/* 三张职业卡 */}
      {results.map((r, i) => {
        const color = AI_COLORS[r.aiImpactLevel as keyof typeof AI_COLORS] || AI_COLORS['增强']
        const prof = allProfessions.find(p => p.id === r.professionId)
        const medals = ['🥇', '🥈', '🥉']
        const medalColors = ['#f59e0b', '#9ca3af', '#d97706']

        return (
          <div key={r.professionId} style={{ margin: '0 28px 14px', padding: 18, borderRadius: 16, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            {/* 排名 + 职业名 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 24 }}>{medals[i]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#1f2937' }}>{r.professionName}</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 600, backgroundColor: color.fill + '18', color: color.fill }}>{color.label}</span>
                </div>
                {prof && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{prof.enName} · {prof.salaryRange}</div>}
              </div>
            </div>

            {/* 匹配度 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#f3f4f6' }}>
                <div style={{ height: '100%', borderRadius: 3, background: medalColors[i], width: `${r.matchScore}%` }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: medalColors[i] }}>{r.matchScore}%</span>
            </div>

            {/* 推荐理由 */}
            <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.6, marginBottom: 8 }}>
              {r.matchReasons.map((reason, j) => (
                <div key={j} style={{ display: 'flex', gap: 4, marginBottom: 2 }}>
                  <span style={{ color: color.fill, flexShrink: 0 }}>•</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>

            {/* 下一步 + 标签 */}
            {prof && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {r.nextSteps.map((step, j) => (
                  <span key={j} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 10, background: color.fill + '0D', color: color.fill, fontWeight: 600 }}>{step}</span>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* 用户关键词 */}
      {results.length > 0 && (() => {
        const prof = allProfessions.find(p => p.id === results[0].professionId)
        const allTags = results.flatMap(r => allProfessions.find(p => p.id === r.professionId)?.tags?.slice(0, 2) || [])
        const uniqueTags = [...new Set(allTags)].slice(0, 6)

        return (
          <div style={{ margin: '0 28px 20px', padding: 14, borderRadius: 14, background: mainColor + '08', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#9ca3af', letterSpacing: 1, marginBottom: 6, fontWeight: 600 }}>你的职业关键词</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
              {uniqueTags.map(tag => (
                <span key={tag} style={{ fontSize: 12, padding: '4px 14px', borderRadius: 20, background: '#fff', color: mainColor, fontWeight: 600, border: `1px solid ${mainColor}22` }}>{tag}</span>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '16px 28px', color: '#d1d5db', fontSize: 10, letterSpacing: 1.5, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
        职业蓝图 · AI 时代的职业认知与路径探索
      </div>
    </div>
  )
}

// ─── 职业对比 ───

// ─── 职业对比海报 ───

function CompareContent({ pair }: { pair: ComparisonPair }) {
  const profA = allProfessions.find(p => p.id === pair.professionAId)
  const profB = allProfessions.find(p => p.id === pair.professionBId)
  const nameA = profA?.name || pair.professionAId
  const nameB = profB?.name || pair.professionBId
  const mainColor = '#6366f1'

  return (
    <div style={{ width: 440, fontFamily: '"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif', background: 'linear-gradient(160deg, #fafaf9 0%, #fefce8 50%, #fafaf9 100%)', borderRadius: 20, overflow: 'hidden' }}>
      {/* Header: 双职业并排 */}
      <div style={{ padding: '18px 28px', background: 'linear-gradient(135deg, #1e293b, #334155)', textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: 3, fontWeight: 700, marginBottom: 10 }}>CAREER COMPARE</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{ICON_EMOJI[profA?.icon || ''] || '💼'}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{nameA}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{profA?.salaryRange}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#64748b', padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.1)' }}>VS</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{ICON_EMOJI[profB?.icon || ''] || '💼'}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{nameB}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{profB?.salaryRange}</div>
          </div>
        </div>
      </div>

      {/* 对比说明 */}
      <div style={{ padding: '14px 28px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{pair.rationale}</p>
      </div>

      {/* 6 个对比维度 */}
      <div style={{ padding: '0 28px' }}>
        {pair.dimensions.map((d, i) => {
          const aWin = d.winner === 'A'
          const bWin = d.winner === 'B'
          return (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < pair.dimensions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 8, letterSpacing: 0.5 }}>{d.label}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ fontSize: 12, color: aWin ? '#059669' : '#6b7280', lineHeight: 1.5, padding: '8px 12px', borderRadius: 10, background: aWin ? '#ecfdf5' : '#f9fafb', position: 'relative' }}>
                  <div style={{ fontWeight: 600, fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>{nameA}</div>
                  {d.valueA}
                  {aWin && <span style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, color: '#059669' }}>✓</span>}
                </div>
                <div style={{ fontSize: 12, color: bWin ? '#059669' : '#6b7280', lineHeight: 1.5, padding: '8px 12px', borderRadius: 10, background: bWin ? '#ecfdf5' : '#f9fafb', position: 'relative' }}>
                  <div style={{ fontWeight: 600, fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>{nameB}</div>
                  {d.valueB}
                  {bWin && <span style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, color: '#059669' }}>✓</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 建议 */}
      <div style={{ margin: '16px 28px', padding: 14, borderRadius: 14, background: '#fffbeb', border: '1px solid #fde68a' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 16 }}>💡</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>选择建议</div>
            <div style={{ fontSize: 12, color: '#a16207', lineHeight: 1.5 }}>
              如果还在纠结，建议两个方向各做一个小项目来验证自己的兴趣和擅长点。实践比想象更可靠。
            </div>
          </div>
        </div>
      </div>

      {/* AI 影响速览 */}
      {profA && profB && (
        <div style={{ margin: '0 28px 16px', padding: 14, borderRadius: 14, background: '#f8fafc' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, marginBottom: 8 }}>AI 影响对比</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11 }}>
            <div>
              <span style={{ padding: '1px 6px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: AI_COLORS[profA.aiImpactLevel].fill + '18', color: AI_COLORS[profA.aiImpactLevel].fill, marginRight: 4 }}>{AI_COLORS[profA.aiImpactLevel].label}</span>
              <span style={{ color: '#6b7280' }}>{profA.aiImpact.conclusion}</span>
            </div>
            <div>
              <span style={{ padding: '1px 6px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: AI_COLORS[profB.aiImpactLevel].fill + '18', color: AI_COLORS[profB.aiImpactLevel].fill, marginRight: 4 }}>{AI_COLORS[profB.aiImpactLevel].label}</span>
              <span style={{ color: '#6b7280' }}>{profB.aiImpact.conclusion}</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '16px 28px', color: '#d1d5db', fontSize: 10, letterSpacing: 1.5, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
        职业蓝图 · AI 时代的职业认知与路径探索
      </div>
    </div>
  )
}

// ─── 职业详情海报（纯内联样式，与网页UI完全不同）───

const CARD_W = 440
const CARD_PAD = 28

// ID → 中文名
function toCN(ids: string[]) {
  return ids.map(id => allProfessions.find(p => p.id === id)?.name || id).join(' · ')
}

function CareerContent({ profession }: { profession: Profession }) {
  const c = profession.connections
  const mainColor = AI_COLORS[profession.aiImpactLevel].fill

  // 公共内联样式
  const s = {
    card: {
      width: CARD_W, fontFamily: '"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif',
      background: '#ffffff',
      borderRadius: 20, overflow: 'hidden' as const,
    },
    header: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 28px',
      background: `linear-gradient(135deg, ${mainColor} 0%, ${mainColor}dd 100%)`,
    },
    section: { padding: '16px 28px' },
    label: { fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 8 },
    tag: (bg: string, fg: string) => ({
      display: 'inline-block', padding: '3px 10px', borderRadius: 6,
      fontSize: 11, fontWeight: 600, marginRight: 4, marginBottom: 4,
      backgroundColor: bg, color: fg,
    }),
    pill: {
      display: 'inline-block', padding: '4px 12px', borderRadius: 20,
      fontSize: 11, fontWeight: 600, marginRight: 6, marginBottom: 6,
      backgroundColor: '#fff', color: '#374151', border: '1px solid #e5e7eb',
    },
    number: (n: number) => ({
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 18, height: 18, borderRadius: 9, backgroundColor: mainColor + '18',
      color: mainColor, fontSize: 11, fontWeight: 700, marginRight: 6, flexShrink: 0,
    }),
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
    box: (bg: string) => ({
      background: bg, borderRadius: 12, padding: 12,
    }),
    divider: { height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 28px' },
    footer: { textAlign: 'center' as const, padding: '16px 28px', color: '#d1d5db', fontSize: 10, letterSpacing: 1.5 },
  }

  return (
    <div style={s.card}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, letterSpacing: 3, fontWeight: 600, marginBottom: 4 }}>CAREER BLUEPRINT</div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>{profession.name}</div>
        </div>
        <div style={{ fontSize: 36 }}>{ICON_EMOJI[profession.icon] || '💼'}</div>
      </div>

      {/* ── 一句话定义 ── */}
      <div style={{ ...s.section, paddingTop: 22, paddingBottom: 0 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', lineHeight: 1.6, margin: 0 }}>
          {profession.definition}
        </p>
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
          {profession.enName} · {profession.salaryRange} · {profession.growthRate}
        </p>
      </div>

      <div style={s.divider} />

      {/* ── 工作内容 ── */}
      <div style={s.section}>
        <div style={s.grid2}>
          <div>
            <div style={s.label}>真实工作</div>
            {profession.realTasks.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={s.number(i + 1)}>{i + 1}</span>
                <span style={{ fontSize: 12, color: '#4b5563', lineHeight: 1.5, flex: 1 }}>{t}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={s.label}>一天怎么过</div>
            {[
              { emoji: '☀️', text: profession.dayInLife.morning },
              { emoji: '🌤', text: profession.dayInLife.afternoon },
              { emoji: '👥', text: profession.dayInLife.collaborators },
              { emoji: '📦', text: profession.dayInLife.deliverables },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 5, fontSize: 12 }}>
                <span style={{ flexShrink: 0 }}>{item.emoji}</span>
                <span style={{ color: i < 2 ? '#4b5563' : '#9ca3af', lineHeight: 1.4 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 技能 ── */}
      <div style={{ ...s.section, background: mainColor + '06' }}>
        <div style={s.label}>核心能力</div>
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: '#9ca3af', marginRight: 8 }}>硬技能</span>
          {profession.skills.hardSkills.slice(0, 4).map(sk => (
            <span key={sk} style={s.tag(mainColor + '18', mainColor)}>{sk}</span>
          ))}
        </div>
        <div>
          <span style={{ fontSize: 10, color: '#9ca3af', marginRight: 8 }}>工具</span>
          {profession.skills.tools.slice(0, 4).map(sk => (
            <span key={sk} style={s.pill}>{sk}</span>
          ))}
        </div>
      </div>

      {/* ── 入门 + AI 影响 ── */}
      <div style={s.section}>
        <div style={s.grid2}>
          <div>
            <div style={s.label}>入门路径</div>
            <div style={s.box('#f3f4f6')}>
              <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>⏱ 周期</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#374151', margin: '4px 0 0' }}>{profession.entryPath.timeline}</p>
            </div>
            <div style={{ ...s.box('#f3f4f6'), marginTop: 8 }}>
              <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>🚀 第一周</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#374151', margin: '4px 0 0' }}>{profession.entryPath.firstWeek}</p>
            </div>
          </div>
          <div>
            <div style={s.label}>AI 影响</div>
            <div style={{ ...s.box(mainColor + '10'), border: `1px solid ${mainColor}22` }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 11 }}>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>﹣替代</span>
                <span style={{ color: '#4b5563', lineHeight: 1.4 }}>{profession.aiImpact.replaced}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                <span style={{ color: '#3b82f6', fontWeight: 600 }}>﹢增强</span>
                <span style={{ color: '#4b5563', lineHeight: 1.4 }}>{profession.aiImpact.enhanced}</span>
              </div>
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${mainColor}22` }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: mainColor, margin: 0, lineHeight: 1.5 }}>{profession.aiImpact.conclusion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={s.divider} />

      {/* ── 职业连接 ── */}
      <div style={s.section}>
        <div style={s.label}>职业连接</div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
          {c.similar.length > 0 && <div><span style={{ color: '#9ca3af' }}>相似</span> <span style={{ color: '#4b5563', fontWeight: 600 }}>{toCN(c.similar)}</span></div>}
          {c.transferable.length > 0 && <div><span style={{ color: '#9ca3af' }}>可转</span> <span style={{ color: '#4b5563', fontWeight: 600 }}>{toCN(c.transferable)}</span></div>}
          {c.advanced.length > 0 && <div><span style={{ color: '#9ca3af' }}>进阶</span> <span style={{ color: '#4b5563', fontWeight: 600 }}>{toCN(c.advanced)}</span></div>}
          {c.collaborative.length > 0 && <div><span style={{ color: '#9ca3af' }}>协作</span> <span style={{ color: '#4b5563', fontWeight: 600 }}>{toCN(c.collaborative)}</span></div>}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={s.footer}>
        职业蓝图 · AI 时代的职业认知与路径探索
      </div>
    </div>
  )
}
