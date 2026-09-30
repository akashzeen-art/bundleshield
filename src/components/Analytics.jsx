import { useRef, useState } from 'react'
import styles from './Analytics.module.css'
import { ArrowDownRightIcon, ArrowUpRightIcon, ActivityIcon, TrendingUpIcon } from './Icons'
import useLang from '../i18n/useLang'

const bandwidthData = [
  { time: '00:00', down: 18, up: 8 },
  { time: '02:00', down: 12, up: 5 },
  { time: '04:00', down: 8, up: 3 },
  { time: '06:00', down: 22, up: 10 },
  { time: '08:00', down: 65, up: 28 },
  { time: '10:00', down: 88, up: 35 },
  { time: '12:00', down: 94, up: 42 },
  { time: '14:00', down: 78, up: 31 },
  { time: '16:00', down: 85, up: 38 },
  { time: '18:00', down: 72, up: 29 },
  { time: '20:00', down: 60, up: 24 },
  { time: '22:00', down: 45, up: 18 },
]

const deviceUsage = [
  { name: 'iPhone', usage: 42 },
  { name: 'MacBook', usage: 78 },
  { name: 'Smart TV', usage: 31 },
  { name: 'Android', usage: 55 },
  { name: 'Dell XPS', usage: 89 },
]

const miniStats = [
  { value: '94.2 Mbps', Icon: ArrowDownRightIcon, tone: 'blue' },
  { value: '24.8 Mbps', Icon: ArrowUpRightIcon, tone: 'cyan' },
  { value: '18.4 GB', Icon: ActivityIcon, tone: 'green' },
]

const TICKS = [0, 25, 50, 75, 100]

function smoothPath(pts) {
  return pts.reduce((d, p, i) => {
    if (i === 0) return `M${p[0]},${p[1]}`
    const p0 = pts[i - 2] || pts[i - 1]
    const p1 = pts[i - 1]
    const p3 = pts[i + 1] || p
    const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6]
    const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6]
    return `${d} C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p[0]},${p[1]}`
  }, '')
}

function BandwidthChart() {
  const { t } = useLang()
  const W = 440, H = 170, L = 30, R = 8, T = 10, B = 24
  const svgRef = useRef(null)
  const [hover, setHover] = useState(null)

  const x = i => L + (i * (W - L - R)) / (bandwidthData.length - 1)
  const y = v => T + (1 - v / 100) * (H - T - B)
  const base = y(0)

  const series = ['down', 'up'].map(key => {
    const pts = bandwidthData.map((d, i) => [x(i), y(d[key])])
    const line = smoothPath(pts)
    return { key, line, area: `${line} L${x(bandwidthData.length - 1)},${base} L${x(0)},${base} Z` }
  })

  const onMove = e => {
    const box = svgRef.current.getBoundingClientRect()
    const vx = ((e.clientX - box.left) / box.width) * W
    const i = Math.round(((vx - L) / (W - L - R)) * (bandwidthData.length - 1))
    setHover(Math.max(0, Math.min(bandwidthData.length - 1, i)))
  }

  const h = hover !== null ? bandwidthData[hover] : null

  return (
    <div className={styles.chartWrap}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={styles.svg}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label={t.analytics.bandwidthAria}
      >
        <defs>
          <linearGradient id="an-gDown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity="0.25" />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="an-gUp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity="0.22" />
            <stop offset="95%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {TICKS.map(t => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className={styles.gridLine} />
            <text x={L - 8} y={y(t) + 3} textAnchor="end" className={styles.axisText}>{t}</text>
          </g>
        ))}
        {bandwidthData.map((d, i) => i % 3 === 0 && (
          <text key={d.time} x={x(i)} y={H - 6} textAnchor="middle" className={styles.axisText}>{d.time}</text>
        ))}

        {series.map(s => (
          <g key={s.key}>
            <path d={s.area} fill={`url(#an-g${s.key === 'down' ? 'Down' : 'Up'})`} />
            <path d={s.line} fill="none" stroke={s.key === 'down' ? '#0ea5e9' : '#22c55e'} strokeWidth="2.2" className={styles.line} />
          </g>
        ))}

        {h && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={T} y2={base} className={styles.hoverLine} />
            <circle cx={x(hover)} cy={y(h.down)} r="4" fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
            <circle cx={x(hover)} cy={y(h.up)} r="4" fill="#fff" stroke="#22c55e" strokeWidth="2" />
          </g>
        )}

        <rect x={L} y={T} width={W - L - R} height={H - T - B} fill="transparent" />
      </svg>

      {h && (
        <div
          className={styles.tooltip}
          style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > 8 ? '-105%' : '5%'})` }}
        >
          <p className={styles.tooltipTime}>{h.time}</p>
          <p><span className={styles.dotDown} /> {t.analytics.download}: <strong>{h.down} Mbps</strong></p>
          <p><span className={styles.dotUp} /> {t.analytics.upload}: <strong>{h.up} Mbps</strong></p>
        </div>
      )}
    </div>
  )
}

function DeviceChart() {
  const { t } = useLang()
  const W = 440, H = 150, L = 30, R = 8, T = 10, B = 24
  const slot = (W - L - R) / deviceUsage.length
  const barW = slot * 0.5
  const y = v => T + (1 - v / 100) * (H - T - B)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} role="img" aria-label={t.analytics.deviceAria}>
      <defs>
        <linearGradient id="an-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      {TICKS.map(t => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className={styles.gridLine} />
          <text x={L - 8} y={y(t) + 3} textAnchor="end" className={styles.axisText}>{t}</text>
        </g>
      ))}

      {deviceUsage.map((d, i) => {
        const cx = L + slot * i + slot / 2
        const top = y(d.usage)
        return (
          <g key={d.name} className={styles.barGroup}>
            <rect
              x={cx - barW / 2}
              y={top}
              width={barW}
              height={y(0) - top}
              rx="6"
              fill="url(#an-bar)"
              className={styles.bar}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <title>{`${d.name}: ${d.usage} MB`}</title>
            </rect>
            <text x={cx} y={top - 6} textAnchor="middle" className={styles.barValue}>{d.usage} MB</text>
            <text x={cx} y={H - 6} textAnchor="middle" className={styles.axisText}>{d.name}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Analytics() {
  const { t } = useLang()
  const a = t.analytics

  return (
    <section className={styles.section} id="analytics">
      <div className={styles.inner}>
        <div className={styles.charts} data-reveal>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <h4 className={styles.cardTitle}>{a.bandwidthTitle}</h4>
                <p className={styles.cardSub}>{a.bandwidthSub}</p>
              </div>
              <div className={styles.legend}>
                <span><span className={styles.dotDown} /> {a.download}</span>
                <span><span className={styles.dotUp} /> {a.upload}</span>
              </div>
            </div>
            <BandwidthChart />
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <h4 className={styles.cardTitle}>{a.deviceTitle}</h4>
                <p className={styles.cardSub}>{a.deviceSub}</p>
              </div>
              <span className={styles.badge}>{a.devices(deviceUsage.length)}</span>
            </div>
            <DeviceChart />
          </div>

          <div className={styles.miniRow}>
            {miniStats.map((s, i) => (
              <div key={s.tone} className={`${styles.mini} ${styles[s.tone]}`}>
                <div className={styles.miniIcon}><s.Icon size={15} strokeWidth={2.5} /></div>
                <p className={styles.miniValue}>{s.value}</p>
                <p className={styles.miniLabel}>{a.miniStats[i]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.copy} data-reveal style={{ '--reveal-delay': '0.1s' }}>
          <p className={styles.eyebrow}>{a.eyebrow}</p>
          <h2 className={styles.title}>
            {a.titleLine1}<br />
            <span className={styles.accent}>{a.titleLine2}</span>
          </h2>
          <p className={styles.lead}>{a.lead}</p>

          <div className={styles.points}>
            {a.points.map((p, i) => (
              <div key={i} className={styles.point}>
                <span className={styles.pointBar} />
                <div>
                  <p className={styles.pointTitle}>{p.title}</p>
                  <p className={styles.pointDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.saved}>
            <div className={styles.savedIcon}><TrendingUpIcon size={20} /></div>
            <div>
              <p className={styles.savedTitle}>{a.savedTitle}</p>
              <p className={styles.savedDesc}>{a.savedDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
