import { useState, useCallback, useEffect } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Pricing from './components/Pricing'
import WifiHighlights from './components/WifiHighlights'
import Analytics from './components/Analytics'
import Features from './components/Features'
import Faq from './components/Faq'
import Footer from './components/Footer'
import PlanModal from './components/PlanModal'
import { plans, getSavedOrder, goToDownloadPage } from './data/plans'
import WifiExtenderPage from './pages/WifiExtenderPage'
import LegalPage from './pages/LegalPage'
import AboutPage from './pages/AboutPage'
import { termsSections, TERMS_EFFECTIVE_DATE, TERMS_COMPANY, TERMS_PRODUCT } from './data/terms'
import {
  privacySections, privacyIntro, PRIVACY_CONTACT,
  PRIVACY_EFFECTIVE_DATE, PRIVACY_COMPANY, PRIVACY_PRODUCT,
} from './data/privacy'
import { refundSections, REFUND_CONTACT, REFUND_EFFECTIVE_DATE, REFUND_COMPANY } from './data/refund'
import useLang from './i18n/useLang'
import './App.css'

const PRELOADER_KEY = 'duoshield-preloaded'

function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <Pricing />
      <WifiHighlights />
      <Analytics />
      <Features />
      <Faq />
    </>
  )
}

export default function App() {
  const { t } = useLang()
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isDownloadPage = path === '/wifi-extender' || path === '/antivirus'
  const isTermsPage = path === '/terms'
  const isPrivacyPage = path === '/privacy'
  const isRefundPage = path === '/refund'
  const isAboutPage = path === '/about'
  const page = path === '/wifi-extender' ? <WifiExtenderPage />
    : path === '/antivirus' ? <WifiExtenderPage scrollToAntivirus />
    : isTermsPage ? (
      <LegalPage
        title={t.legalPage.termsTitle}
        product={TERMS_PRODUCT}
        company={TERMS_COMPANY}
        effectiveDate={TERMS_EFFECTIVE_DATE}
        sections={termsSections}
      />
    )
    : isPrivacyPage ? (
      <LegalPage
        title={t.legalPage.privacyTitle}
        product={PRIVACY_PRODUCT}
        company={PRIVACY_COMPANY}
        effectiveDate={PRIVACY_EFFECTIVE_DATE}
        intro={privacyIntro}
        sections={privacySections}
        contact={PRIVACY_CONTACT}
      />
    )
    : isRefundPage ? (
      <LegalPage
        title={t.legalPage.refundTitle}
        company={REFUND_COMPANY}
        effectiveDate={REFUND_EFFECTIVE_DATE}
        sections={refundSections}
        contact={REFUND_CONTACT}
      />
    )
    : isAboutPage ? <AboutPage />
    : <HomePage />

  useEffect(() => {
    document.title = isAboutPage ? t.meta.aboutTitle
      : isTermsPage ? t.meta.termsTitle
      : isPrivacyPage ? t.meta.privacyTitle
      : isRefundPage ? t.meta.refundTitle
      : isDownloadPage ? t.meta.downloadTitle
      : t.meta.title
  }, [isDownloadPage, isAboutPage, isTermsPage, isPrivacyPage, isRefundPage, t])

  const [loading, setLoading] = useState(() => !sessionStorage.getItem(PRELOADER_KEY))
  const handleDone = useCallback(() => {
    sessionStorage.setItem(PRELOADER_KEY, '1')
    setLoading(false)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const [lead, setLead] = useState(null)
  const closeLead = useCallback(() => setLead(null), [])

  useEffect(() => {
    const onClick = e => {
      const link = e.target.closest('[data-lead]')
      if (!link) return
      const isDownload = link.dataset.lead === 'download'
      const urlPlan = new URLSearchParams(window.location.search).get('plan')
      if (getSavedOrder()) {
        if (isDownload) return
        e.preventDefault()
        goToDownloadPage(link.getAttribute('href'), plans.some(p => p.id === urlPlan) ? urlPlan : undefined)
        return
      }
      e.preventDefault()
      setLead({
        planId: plans.some(p => p.id === urlPlan) ? urlPlan : undefined,
        download: isDownload ? { href: link.getAttribute('href'), file: link.getAttribute('download') } : null,
        redirect: isDownload ? undefined : link.getAttribute('href'),
      })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!window.location.hash) return
    const target = document.querySelector(window.location.hash)
    if (target) requestAnimationFrame(() => target.scrollIntoView())
  }, [])

  return (
    <div className="app">
      {loading && <Preloader onDone={handleDone} />}
      <Navbar />
      <main>
        {page}
      </main>
      <Footer />
      {lead && <PlanModal planId={lead.planId} download={lead.download} redirect={lead.redirect} onClose={closeLead} />}
    </div>
  )
}
