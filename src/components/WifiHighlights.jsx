import styles from './WifiHighlights.module.css'
import { WifiIcon, MonitorIcon, BlockIcon, ChartIcon, ArrowRightIcon } from './Icons'
import useLang from '../i18n/useLang'

const highlightIcons = [WifiIcon, MonitorIcon, BlockIcon, ChartIcon]

export default function WifiHighlights({ showCta = true }) {
  const { t } = useLang()
  const w = t.howItWorks

  return (
    <section className={styles.section} id="wifi">
      <div className={styles.header} data-reveal>
        <p className={styles.eyebrow}>{w.eyebrow}</p>
        <h2 className={styles.title}>{w.titleStart} <span className={styles.accent}>{w.titleAccent}</span></h2>
        <p className={styles.sub}>{w.sub}</p>
      </div>

      <ol className={styles.steps}>
        {w.steps.map((s, i) => (
          <li key={i} className={styles.step} data-reveal style={{ '--reveal-delay': `${i * 0.1}s` }}>
            <span className={styles.stepNum}>{i + 1}</span>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p className={styles.stepDesc}>{s.desc}</p>
          </li>
        ))}
      </ol>

      <div className={styles.setupRow} data-reveal>
        <div className={styles.setupBadge}>
          <span className={styles.setupDot} />
          {w.setupLabel} <strong>{w.setupValue}</strong>
        </div>
      </div>

      <div className={styles.grid}>
        {w.highlights.map((h, i) => {
          const Icon = highlightIcons[i]
          return (
            <div key={i} className={styles.card} data-reveal style={{ '--reveal-delay': `${i * 0.08}s` }}>
              <div className={styles.icon}><Icon size={22} /></div>
              <h3 className={styles.cardTitle}>{h.title}</h3>
              <p className={styles.cardDesc}>{h.desc}</p>
            </div>
          )
        })}
      </div>

      {showCta && (
        <div className={styles.ctaRow} data-reveal>
          <a href="/wifi-extender" data-lead="wifi" className={styles.btn}>
            {w.cta} <ArrowRightIcon size={18} />
          </a>
        </div>
      )}
    </section>
  )
}
