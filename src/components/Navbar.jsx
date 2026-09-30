import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo from '../assets/bundleshieldlogo.png'
import useLang from '../i18n/useLang'
import { GlobeIcon, ChevronDownIcon } from './Icons'

const links = [
  { href: '/#products', key: 'products' },
  { href: '/#pricing', key: 'pricing' },
  { href: '/#wifi', key: 'howItWorks' },
  { href: '/wifi-extender', key: 'download', lead: 'wifi' },
  { href: '/#features', key: 'features' },
  { href: '/#faq', key: 'faq' },
]

const infoLinks = [
  { href: '/about', key: 'about' },
  { href: '/terms', key: 'terms' },
  { href: '/privacy', key: 'privacy' },
  { href: '/refund', key: 'refund' },
]

function LanguageSelect() {
  const { lang, setLang, t } = useLang()
  return (
    <label className={styles.lang}>
      <GlobeIcon size={16} />
      <select value={lang} onChange={e => setLang(e.target.value)} aria-label={t.language.label}>
        <option value="hi">{t.language.hi}</option>
        <option value="en">{t.language.en}</option>
      </select>
    </label>
  )
}

export default function Navbar() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(() => window.location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (window.location.pathname !== '/') return
    const sections = links
      .filter(l => l.href.startsWith('/#'))
      .map(l => document.querySelector(l.href.slice(1)))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(`/#${e.target.id}`) })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="/" className={styles.logo} onClick={close}>
        <img src={logo} alt="Bundle Shield Logo" className={styles.logoImg} />
      </a>

      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} data-lead={l.lead} onClick={close} className={active === l.href ? styles.active : ''}>
              {t.nav[l.key]}
            </a>
          </li>
        ))}
        <li className={styles.info}>
          <button
            type="button"
            className={`${styles.moreBtn} ${infoLinks.some(l => l.href === active) ? styles.moreActive : ''}`}
            aria-haspopup="true"
          >
            {t.nav.more} <ChevronDownIcon size={14} strokeWidth={2.5} />
          </button>
          <div className={styles.infoMenu}>
            {infoLinks.map(l => (
              <a key={l.href} href={l.href} onClick={close} className={active === l.href ? styles.active : ''}>
                {t.footer[l.key]}
              </a>
            ))}
          </div>
        </li>
        <li className={styles.mobileCta}>
          <a href="/#pricing" onClick={close} className={styles.btnPrimary}>{t.nav.getBundle}</a>
        </li>
      </ul>

      <div className={styles.right}>
        <LanguageSelect />
        <div className={styles.actions}>
          <a href="/#pricing" className={styles.btnPrimary}>{t.nav.getBundle}</a>
        </div>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
