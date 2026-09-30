import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './PlanModal.module.css'
import { plans, formatPrice, ORDER_KEY } from '../data/plans'
import { generateInvoiceNo } from '../data/invoice'
import { ArrowRightIcon, DownloadIcon } from './Icons'
import Invoice from './Invoice'
import useLang from '../i18n/useLang'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MOBILE_RE = /^[6-9]\d{9}$/

function validate({ name, email, mobile }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = true
  if (!EMAIL_RE.test(email.trim())) errors.email = true
  if (!MOBILE_RE.test(mobile)) errors.mobile = true
  return errors
}

const LEADS_URL = 'https://wifi.vault-x.world/api/leads'

const DEFAULT_PLAN = plans.find(p => p.popular)?.id ?? plans[0].id

export default function PlanModal({ planId = DEFAULT_PLAN, download, redirect = '/wifi-extender', onClose }) {
  const { t } = useLang()
  const m = t.planModal
  const [form, setForm] = useState({ name: '', email: '', mobile: '', plan: planId })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [invoice, setInvoice] = useState(null)
  const firstInput = useRef(null)

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    firstInput.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const update = field => e => {
    const value = field === 'mobile' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(err => ({ ...err, [field]: undefined }))
  }

  const onSubmit = async e => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return

    setSubmitting(true)
    const order = {
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile,
      plan: form.plan,
      invoiceNo: generateInvoiceNo(),
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(ORDER_KEY, JSON.stringify(order))
    await Promise.race([
      fetch(LEADS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: order.name, email: order.email, mobile: order.mobile, plan: order.plan }),
      }).catch(() => {}),
      new Promise(resolve => setTimeout(resolve, 3000)),
    ])

    setSubmitting(false)
    setInvoice({ ...order, price: plans.find(p => p.id === order.plan)?.price ?? 0 })
  }

  const proceed = () => {
    if (download) {
      const link = document.createElement('a')
      link.href = download.href
      link.download = download.file || ''
      document.body.appendChild(link)
      link.click()
      link.remove()
      onClose()
      return
    }
    window.location.href = `${redirect}?plan=${encodeURIComponent(form.plan)}`
  }

  if (invoice) {
    return createPortal(
      <div className={`${styles.backdrop} print-backdrop`}>
        <div className={`${styles.modal} ${styles.modalWide} print-modal`} role="dialog" aria-modal="true" aria-label={m.invoiceAria}>
          <button type="button" className={`${styles.close} no-print`} onClick={onClose} aria-label={m.close}>×</button>
          <h3 className={`${styles.title} no-print`}>{m.invoiceTitleStart} <span>{m.invoiceTitleAccent}</span> {m.invoiceTitleEnd}</h3>
          <p className={`${styles.sub} no-print`}>{m.invoiceSub}</p>

          <Invoice invoice={invoice} />

          <div className={`${styles.actions} no-print`}>
            <button type="button" className={styles.secondary} onClick={() => {
              const prevTitle = document.title
              document.title = `Invoice-${invoice.invoiceNo}`
              window.print()
              document.title = prevTitle
            }}>
              <DownloadIcon size={16} /> {m.downloadInvoice}
            </button>
            <button type="button" className={styles.submit} onClick={proceed}>
              {download ? m.continueDownload : m.continuePage} <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>,
      document.body,
    )
  }

  return createPortal(
    <div className={styles.backdrop} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="plan-modal-title">
        <button type="button" className={styles.close} onClick={onClose} aria-label={m.close}>×</button>

        <h3 id="plan-modal-title" className={styles.title}>{m.titleStart} <span>{m.titleAccent}</span> {m.titleEnd}</h3>
        <p className={styles.sub}>{download ? m.subDownload : m.subPage}</p>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <label className={styles.field}>
            <span>{m.name}</span>
            <input
              ref={firstInput}
              type="text"
              autoComplete="name"
              placeholder={m.namePlaceholder}
              value={form.name}
              onChange={update('name')}
              aria-invalid={!!errors.name}
            />
            {errors.name && <em>{m.errors.name}</em>}
          </label>

          <label className={styles.field}>
            <span>{m.email}</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && <em>{m.errors.email}</em>}
          </label>

          <label className={styles.field}>
            <span>{m.mobile}</span>
            <div className={styles.phone}>
              <b>+91</b>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={form.mobile}
                onChange={update('mobile')}
                aria-invalid={!!errors.mobile}
              />
            </div>
            {errors.mobile && <em>{m.errors.mobile}</em>}
          </label>

          <fieldset className={styles.field}>
            <span>{m.selectedPlan}</span>
            <div className={styles.plans} role="radiogroup">
              {plans.map(p => (
                <label key={p.id} className={`${styles.planOpt} ${form.plan === p.id ? styles.planActive : ''}`}>
                  <input
                    type="radio"
                    name="plan"
                    value={p.id}
                    checked={form.plan === p.id}
                    onChange={update('plan')}
                  />
                  <b>{t.plans[p.id].name}</b>
                  <small>{m.combo(p.wifi, p.antivirus)}</small>
                  <strong>₹{formatPrice(p.price)}<i>{m.perMonth}</i></strong>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className={styles.submit} disabled={submitting}>
            {submitting ? m.wait : <>{download ? m.downloadNow : m.continue} <ArrowRightIcon size={16} /></>}
          </button>
        </form>
      </div>
    </div>,
    document.body,
  )
}
