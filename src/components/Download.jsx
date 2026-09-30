import styles from './Download.module.css'
import { CheckIcon, DownloadIcon } from './Icons'
import { downloads } from '../data/downloads'
import useLang from '../i18n/useLang'

export default function Download() {
  const { t } = useLang()
  const w = t.wifiDownloads

  return (
    <section className={styles.section} id="download">
      <div className={styles.header} data-reveal>
        <p className={styles.eyebrow}>{w.eyebrow}</p>
        <h2 className={styles.title}>{w.titleStart} <span className={styles.accent}>WifiVault</span> {w.titleEnd}</h2>
        <p className={styles.sub}>{w.sub}</p>
      </div>

      <div className={styles.grid}>
        {downloads.map((d, i) => {
          const c = w[d.key]
          return (
            <article
              key={d.key}
              className={`${styles.card} ${styles[d.key]}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 0.1}s` }}
            >
              <div className={styles.top}>
                <div className={styles.icon}><d.Logo size={28} /></div>
                <span className={styles.platform}>{d.platform}</span>
              </div>

              <div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.meta}>{c.meta}</p>
              </div>

              <div>
                <p className={styles.listTitle}>{w.requirements}</p>
                <ul className={styles.notes}>
                  {c.requirements.map((n, j) => (
                    <li key={j}>
                      <span className={styles.check}><CheckIcon size={12} strokeWidth={3} /></span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={styles.listTitle}>{w.howToInstall}</p>
                <ol className={styles.steps}>
                  {c.notes.map((n, idx) => (
                    <li key={idx}>
                      <span className={styles.stepNum}>{idx + 1}</span>
                      {n}
                    </li>
                  ))}
                </ol>
              </div>

              <a href={d.href} download={d.file} data-lead="download" className={styles.btn}>
                <DownloadIcon size={18} strokeWidth={2.2} />
                {c.cta}
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
