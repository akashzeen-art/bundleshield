import styles from './Footer.module.css'
import logo from '../assets/bundleshieldlogo.png'
import useLang from '../i18n/useLang'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className={styles.footer}>
      <div className={styles.glowBlue} />
      <div className={styles.glowGreen} />
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <span className={styles.logoBadge}>
            <img src={logo} alt="Bundle Shield" className={styles.logoImg} />
          </span>
          <span className={styles.brand}>{t.footer.brandFirst} <span>{t.footer.brandSecond}</span></span>
        </div>
        <p className={styles.tagline}>{t.footer.tagline}</p>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© {new Date().getFullYear()} {t.footer.brandFirst} {t.footer.brandSecond}. {t.footer.rights}</p>
      </div>
    </footer>
  )
}
