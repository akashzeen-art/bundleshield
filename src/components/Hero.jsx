import styles from './Hero.module.css'
import logo from '../assets/bundleshieldlogo.png'
import { WifiIcon, ShieldIcon, ArrowRightIcon } from './Icons'
import useLang from '../i18n/useLang'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section className={styles.hero} id="top">
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {h.badge}
        </div>
        <h1 className={styles.title}>
          {h.titleLine1}<br />
          <span className={styles.gradWifi}>{h.titleLine2}</span>
        </h1>
        <p className={styles.sub}>{h.sub}</p>
        <div className={styles.ctas}>
          <a href="/wifi-extender" data-lead="wifi" className={styles.btnMain}>
            {h.ctaWifi} <ArrowRightIcon size={18} />
          </a>
          <a href="/antivirus" data-lead="antivirus" className={styles.btnSec}>
            {h.ctaAntivirus} <ArrowRightIcon size={18} />
          </a>
        </div>

        <dl className={styles.stats}>
          {h.stats.map((s, i) => (
            <div key={i} className={styles.stat}>
              <dt className={styles.statValue}>{s.value}</dt>
              <dd className={styles.statLabel}>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.visual}>
        <a href="/wifi-extender" data-lead="wifi" className={`${styles.card} ${styles.cardWifi}`}>
          <div className={styles.cardIcon}><WifiIcon size={22} /></div>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>{h.wifiCard.title}</span>
            <span className={styles.cardSub}>{h.wifiCard.sub}</span>
          </div>
          <div className={styles.cardBadge}>{h.wifiCard.badge}</div>
        </a>

        <div className={styles.hub}>
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <img src={logo} alt="" className={styles.hubLogo} />
        </div>

        <a href="/antivirus" data-lead="antivirus" className={`${styles.card} ${styles.cardVault}`}>
          <div className={styles.cardIcon}><ShieldIcon size={22} /></div>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>{h.vaultCard.title}</span>
            <span className={styles.cardSub}>{h.vaultCard.sub}</span>
          </div>
          <div className={styles.cardBadge}>{h.vaultCard.badge}</div>
        </a>
      </div>
    </section>
  )
}
