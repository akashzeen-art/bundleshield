import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'
import logo from '../assets/bundleshieldlogo.png'
import { WifiIcon, ShieldIcon } from './Icons'
import useLang from '../i18n/useLang'

const DURATION = 1600

export default function Preloader({ onDone }) {
  const { t } = useLang()
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = 30
    const step = (interval / DURATION) * 100
    let fadeTimer
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev + step >= 100) {
          clearInterval(timer)
          setFading(true)
          fadeTimer = setTimeout(onDone, 500)
          return 100
        }
        return prev + step
      })
    }, interval)
    return () => {
      clearInterval(timer)
      clearTimeout(fadeTimer)
    }
  }, [onDone])

  return (
    <div className={`${styles.overlay} ${fading ? styles.fade : ''}`} role="status" aria-label={t.preloader.loading}>
      <div className={styles.wifiCorner}>
        <WifiIcon size={36} />
      </div>

      <div className={styles.shieldCorner}>
        <ShieldIcon size={30} />
        <div className={styles.scanLine} />
      </div>

      <div className={styles.content}>
        <div className={styles.logoWrap}>
          <img src={logo} alt="Bundle Shield" className={styles.logo} />
          <div className={styles.orbit}>
            <div className={styles.orbitDot} />
          </div>
        </div>

        <div className={styles.tagline}>{t.preloader.tagline}</div>

        <div className={styles.statusRow}>
          <span className={styles.statusItem}>
            <span className={styles.statusDot} style={{ background: 'var(--blue)' }} />
            {t.preloader.boosting}
          </span>
          <span className={styles.statusItem}>
            <span className={styles.statusDot} style={{ background: 'var(--green)' }} />
            {t.preloader.scanning}
          </span>
        </div>

        <div className={styles.barWrap}>
          <div className={styles.bar} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
