import legal from './LegalPage.module.css'
import styles from './AboutPage.module.css'
import { aboutParagraphs, aboutFocus, ABOUT_COMPANY, ABOUT_LOCATION } from '../data/about'
import { CheckIcon } from '../components/Icons'
import useLang from '../i18n/useLang'

export default function AboutPage() {
  const { t } = useLang()
  const d = t.aboutPage

  return (
    <>
      <section className={legal.hero}>
        <div className={legal.bg}>
          <div className={legal.orb1} />
          <div className={legal.orb2} />
        </div>

        <div className={legal.heroInner}>
          <nav className={legal.crumbs} aria-label="Breadcrumb">
            <a href="/">{t.legalPage.home}</a>
            <span aria-hidden="true">/</span>
            <span>{d.title}</span>
          </nav>
          <h1 className={legal.title}>{d.title}</h1>
          <p className={legal.product}>{ABOUT_COMPANY}</p>
          <p className={legal.meta}>{ABOUT_LOCATION}</p>
        </div>
      </section>

      <section className={legal.body}>
        <div className={legal.layout}>
          <div className={styles.text}>
            {aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className={styles.focus}>
            <h2 className={styles.focusTitle}>{d.focusTitle}</h2>
            <ul className={styles.focusList}>
              {aboutFocus.map(item => (
                <li key={item}>
                  <span className={styles.check}><CheckIcon size={14} strokeWidth={3} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <address className={styles.company}>
            <strong>{ABOUT_COMPANY}</strong>
            <span>{ABOUT_LOCATION}</span>
          </address>
        </div>
      </section>
    </>
  )
}
