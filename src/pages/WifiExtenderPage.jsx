import { useEffect, useState } from 'react'
import styles from './WifiExtenderPage.module.css'
import Download from '../components/Download'
import WifiHighlights from '../components/WifiHighlights'
import AntivirusDownloads from '../components/AntivirusDownloads'
import { downloads } from '../data/downloads'
import { plans, formatPrice, ORDER_KEY } from '../data/plans'
import { WifiIcon, MonitorIcon, BlockIcon, ChartIcon, CheckIcon } from '../components/Icons'
import useLang from '../i18n/useLang'

function getSelectedOrder() {
  const planId = new URLSearchParams(window.location.search).get('plan')
  const plan = plans.find(p => p.id === planId)
  if (!plan) return null
  let name = ''
  try { name = JSON.parse(localStorage.getItem(ORDER_KEY))?.name || '' } catch { /* ignore bad data */ }
  return { plan, firstName: name.split(' ')[0] }
}

const perkIcons = [WifiIcon, MonitorIcon, BlockIcon, ChartIcon]

export default function WifiExtenderPage({ scrollToAntivirus = false }) {
  const { t } = useLang()
  const d = t.downloadPage
  const [order] = useState(getSelectedOrder)

  useEffect(() => {
    if (!scrollToAntivirus) return
    const target = document.getElementById('antivirus')
    if (target) requestAnimationFrame(() => target.scrollIntoView())
  }, [scrollToAntivirus])

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.grid} />
        </div>

        <div className={styles.inner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <a href="/">{d.home}</a>
            <span aria-hidden="true">/</span>
            <span>{d.crumb}</span>
          </nav>

          <div className={styles.badge}>
            <WifiIcon size={16} /> {d.badge}
          </div>

          <h1 className={styles.title}>
            {d.titleStart} <span className={styles.accent}>{d.titleAccent}</span>
          </h1>
          <p className={styles.sub}>{d.sub}</p>

          {order && (
            <div className={styles.order}>
              <span className={styles.orderCheck}><CheckIcon size={14} strokeWidth={3} /></span>
              <span>
                {order.firstName ? d.thanks(order.firstName) : ''}{d.yourPlan}{' '}
                <strong>{d.planLine(order.plan, t.plans[order.plan.id].name, formatPrice(order.plan.price))}</strong>
              </span>
            </div>
          )}

          <div className={styles.buttons}>
            {downloads.map(dl => (
              <a key={dl.key} href={dl.href} download={dl.file} data-lead="download" className={`${styles.dlBtn} ${styles[dl.key]}`}>
                <span className={styles.dlLogo}><dl.Logo size={30} /></span>
                <span className={styles.dlText}>
                  <span className={styles.dlSmall}>{d.downloadFor}</span>
                  <span className={styles.dlBig}>{dl.platform}</span>
                  <span className={styles.dlMeta}>{t.wifiDownloads[dl.key].meta}</span>
                </span>
              </a>
            ))}
          </div>

          <ul className={styles.perks}>
            {d.perks.map((label, i) => {
              const Icon = perkIcons[i]
              return <li key={i}><Icon size={16} /> {label}</li>
            })}
          </ul>

          <p className={styles.version}>{d.version}</p>
        </div>
      </section>

      <AntivirusDownloads />
      <Download />
      <WifiHighlights showCta={false} />
    </>
  )
}
