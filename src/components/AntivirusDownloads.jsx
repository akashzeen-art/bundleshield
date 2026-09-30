import styles from '../pages/WifiExtenderPage.module.css'
import { antivirusDownloads } from '../data/antivirusDownloads'
import { ShieldIcon, RadarIcon, LockIcon, BoltIcon } from './Icons'
import useLang from '../i18n/useLang'

const perkIcons = [ShieldIcon, RadarIcon, LockIcon, BoltIcon]

export default function AntivirusDownloads() {
  const { t } = useLang()
  const a = t.antivirusDownloads

  return (
    <section className={`${styles.hero} ${styles.antivirusSection}`} id="antivirus">
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      <div className={styles.inner}>
        <div className={styles.badge}>
          <ShieldIcon size={16} /> {a.badge}
        </div>

        <h2 className={styles.title}>
          {a.titleStart} <span className={styles.accent}>{a.titleAccent}</span>
        </h2>
        <p className={styles.sub}>{a.sub}</p>

        <div className={styles.buttons}>
          {antivirusDownloads.map(d => (
            <a key={d.key} href={d.href} download={d.file} data-lead="download" className={`${styles.dlBtn} ${styles[d.key]}`}>
              <span className={styles.dlLogo}><d.Logo size={30} /></span>
              <span className={styles.dlText}>
                <span className={styles.dlSmall}>{t.downloadPage.downloadFor}</span>
                <span className={styles.dlBig}>{d.platform}</span>
                <span className={styles.dlMeta}>{a[d.metaKey]}</span>
              </span>
            </a>
          ))}
        </div>

        <ul className={styles.perks}>
          {a.perks.map((label, i) => {
            const Icon = perkIcons[i]
            return <li key={i}><Icon size={16} /> {label}</li>
          })}
        </ul>

        <p className={styles.version}>{a.version}</p>
      </div>
    </section>
  )
}
