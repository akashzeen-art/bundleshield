import styles from './Features.module.css'
import { GlobeIcon, RadarIcon, LockIcon, DevicesIcon, ArrowRightIcon } from './Icons'
import useLang from '../i18n/useLang'

const featureStyles = [
  { Icon: GlobeIcon, color: '#0ea5e9' },
  { Icon: RadarIcon, color: '#16a34a' },
  { Icon: LockIcon, color: '#16a34a' },
  { Icon: DevicesIcon, color: '#0ea5e9' },
]

export default function Features() {
  const { t } = useLang()
  const f = t.features

  return (
    <section className={styles.section} id="features">
      <div className={styles.header} data-reveal>
        <p className={styles.eyebrow}>{f.eyebrow}</p>
        <h2 className={styles.title}>{f.title}</h2>
        <p className={styles.sub}>{f.sub}</p>
      </div>

      <div className={styles.grid}>
        {f.items.map((item, i) => {
          const { Icon, color } = featureStyles[i]
          return (
            <div
              key={i}
              className={styles.card}
              data-reveal
              style={{ '--c': color, '--reveal-delay': `${i * 0.08}s` }}
            >
              <div className={styles.icon}><Icon size={22} /></div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          )
        })}
      </div>

      <div className={styles.cta} data-reveal>
        <div className={styles.ctaBox}>
          <div className={styles.ctaGlow} />
          <h3>{f.ctaTitle}</h3>
          <div className={styles.ctaBtns}>
            <a href="https://wifi.vault-x.world/register" target="_blank" rel="noopener noreferrer" className={styles.btnMain}>
              {f.getStarted} <ArrowRightIcon size={18} />
            </a>
            <a href="#pricing" className={styles.btnGhost}>{f.viewPricing}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
