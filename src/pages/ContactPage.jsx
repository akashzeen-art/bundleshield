import legal from './LegalPage.module.css'
import styles from './ContactPage.module.css'
import { CONTACT_COMPANY, CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from '../data/contact'
import { MapPinIcon, MailIcon, PhoneIcon } from '../components/Icons'
import useLang from '../i18n/useLang'

export default function ContactPage() {
  const { t } = useLang()
  const d = t.contactPage

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
          <p className={legal.product}>{CONTACT_COMPANY}</p>
          <p className={legal.meta}>{d.subtitle}</p>
        </div>
      </section>

      <section className={legal.body}>
        <div className={styles.cards}>
          <address className={styles.card}>
            <span className={styles.icon}><MapPinIcon size={20} /></span>
            <h2 className={styles.cardTitle}>{d.addressTitle}</h2>
            <p>{CONTACT_ADDRESS}</p>
          </address>

          <div className={styles.card}>
            <span className={styles.icon}><MailIcon size={20} /></span>
            <h2 className={styles.cardTitle}>{d.emailTitle}</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.value}>{CONTACT_EMAIL}</a>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}><PhoneIcon size={20} /></span>
            <h2 className={styles.cardTitle}>{d.phoneTitle}</h2>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className={styles.value}>{CONTACT_PHONE}</a>
          </div>
        </div>
      </section>
    </>
  )
}
