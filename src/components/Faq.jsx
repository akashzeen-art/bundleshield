import styles from './Faq.module.css'
import { PlusIcon } from './Icons'
import useLang from '../i18n/useLang'

export default function Faq() {
  const { t } = useLang()

  return (
    <section className={styles.section} id="faq">
      <div className={styles.header} data-reveal>
        <p className={styles.eyebrow}>{t.faq.eyebrow}</p>
        <h2 className={styles.title}>{t.faq.title}</h2>
        <p className={styles.sub}>{t.faq.sub}</p>
      </div>

      <div className={styles.list} data-reveal>
        {t.faq.items.map((f, i) => (
          <details key={i} className={styles.item} open={i === 0}>
            <summary className={styles.q}>
              <span>{f.q}</span>
              <span className={styles.toggle}><PlusIcon size={16} /></span>
            </summary>
            <p className={styles.a}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
