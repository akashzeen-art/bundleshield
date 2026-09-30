import { useCallback, useState } from 'react'
import styles from './Pricing.module.css'
import PlanModal from './PlanModal'
import { plans, formatPrice, getSavedOrder, goToDownloadPage } from '../data/plans'
import { WifiIcon, ShieldIcon, CheckIcon, ArrowRightIcon } from './Icons'
import useLang from '../i18n/useLang'

export default function Pricing() {
  const { t } = useLang()
  const pr = t.pricing
  const [selected, setSelected] = useState(null)
  const closeModal = useCallback(() => setSelected(null), [])
  const choose = planId => {
    if (getSavedOrder()) goToDownloadPage('/wifi-extender', planId)
    else setSelected(planId)
  }

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.header} data-reveal>
        <p className={styles.eyebrow}>{pr.eyebrow}</p>
        <h2 className={styles.title}>{pr.titleStart} <span className={styles.accent}>{pr.titleAccent}</span></h2>
      </div>

      <div className={styles.grid}>
        {plans.map((p, i) => {
          const c = t.plans[p.id]
          return (
            <article
              key={p.id}
              className={`${styles.card} ${p.popular ? styles.popular : ''}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 0.08}s` }}
            >
              {p.popular && <span className={styles.ribbon}>{pr.popular}</span>}

              <div>
                <h3 className={styles.planName}>{c.name}</h3>
                <p className={styles.planTagline}>{c.tagline}</p>
              </div>

              <div className={styles.combo}>
                <span className={styles.comboNum}>{p.wifi}</span>
                <span className={styles.comboPlus}>+</span>
                <span className={styles.comboNum}>{p.antivirus}</span>
                <span className={styles.comboLabel}>{pr.combo}</span>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.currency}>₹</span>
                <span className={styles.price}>{formatPrice(p.price)}</span>
                <span className={styles.period}>{pr.perMonth}</span>
              </div>

              <ul className={styles.devices}>
                <li className={styles.deviceWifi}>
                  <span className={styles.deviceIcon}><WifiIcon size={16} /></span>
                  <span>{pr.wifiDevices(p.wifi)}</span>
                </li>
                <li className={styles.deviceVault}>
                  <span className={styles.deviceIcon}><ShieldIcon size={16} /></span>
                  <span>{pr.antivirusDevices(p.antivirus)}</span>
                </li>
              </ul>

              <ul className={styles.extras}>
                {c.extras.map((e, j) => (
                  <li key={j}>
                    <span className={styles.check}><CheckIcon size={12} strokeWidth={3} /></span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className={styles.btn} onClick={() => choose(p.id)}>
                {pr.choose(c.name)} <ArrowRightIcon size={16} />
              </button>
            </article>
          )
        })}
      </div>

      {selected && <PlanModal planId={selected} onClose={closeModal} />}
    </section>
  )
}
