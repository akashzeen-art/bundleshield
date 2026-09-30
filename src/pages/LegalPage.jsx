import styles from './LegalPage.module.css'
import useLang from '../i18n/useLang'

function Paragraph({ content }) {
  const parts = Array.isArray(content) ? content : [content]
  return (
    <p>
      {parts.map((part, i) => typeof part === 'string'
        ? part
        : <a key={i} href={part.href}>{part.text}</a>)}
    </p>
  )
}

export default function LegalPage({ title, product, company, effectiveDate, intro, sections, contact }) {
  const { t } = useLang()
  const d = t.legalPage

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
        </div>

        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <a href="/">{d.home}</a>
            <span aria-hidden="true">/</span>
            <span>{title}</span>
          </nav>
          <h1 className={styles.title}>{title}</h1>
          {product && <p className={styles.product}>{product}</p>}
          <p className={styles.meta}>
            {company} <span aria-hidden="true">·</span> {d.lastUpdated} {effectiveDate}
          </p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.layout}>
          <article>
            {d.englishNote && <p className={styles.note}>{d.englishNote}</p>}
            {intro && <p className={styles.intro}>{intro}</p>}
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.num}>{i + 1}</span>
                  {s.title}
                </h2>
                {s.body?.map((p, j) => <Paragraph key={j} content={p} />)}
                {s.list && (
                  <ul className={styles.list}>
                    {s.list.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                )}
                {s.after?.map((p, j) => <Paragraph key={j} content={p} />)}
                {s.contact && contact && (
                  <address className={styles.contact}>
                    <strong>{contact.name}</strong>
                    <span>{d.email} <a href={`mailto:${contact.email}`}>{contact.email}</a></span>
                    <span>{d.phone} <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></span>
                  </address>
                )}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  )
}
