import styles from './Products.module.css'
import { WifiIcon, ShieldIcon, CheckIcon, ArrowRightIcon } from './Icons'
import useLang from '../i18n/useLang'

const products = [
  { key: 'wifi', Icon: WifiIcon, href: '/wifi-extender', lead: 'wifi' },
  { key: 'vault', Icon: ShieldIcon, href: '/antivirus', lead: 'antivirus' },
]

export default function Products() {
  const { t } = useLang()

  return (
    <section className={styles.section} id="products">
      <div className={styles.header} data-reveal>
        <p className={styles.eyebrow}>{t.products.eyebrow}</p>
        <h2 className={styles.title}>{t.products.title}</h2>
        <p className={styles.sub}>{t.products.sub}</p>
      </div>

      <div className={styles.grid}>
        {products.map((p, i) => {
          const c = t.products[p.key]
          return (
            <article
              key={p.key}
              className={`${styles.card} ${styles[p.key]}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 0.12}s` }}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}><p.Icon size={26} /></div>
                <span className={styles.tag}>{c.tag}</span>
              </div>

              <div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardHeadline}>{c.headline}</p>
              </div>
              <p className={styles.cardDesc}>{c.desc}</p>

              <ul className={styles.featureList}>
                {c.features.map((f, j) => (
                  <li key={j} className={styles.featureItem}>
                    <span className={styles.check}><CheckIcon size={14} strokeWidth={3} /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className={styles.metaRow}>
                {c.meta.map((m, j) => (
                  <div key={j} className={styles.metaStat}>
                    <span className={styles.metaNum}>{m.num}</span>
                    <span className={styles.metaLabel}>{m.label}</span>
                  </div>
                ))}
              </div>

              <a href={p.href} data-lead={p.lead} className={styles.btn}>
                {c.cta} <ArrowRightIcon size={18} />
              </a>

              <div className={styles.statusBar}>
                <span className={styles.dot} />
                <span>{c.status}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
