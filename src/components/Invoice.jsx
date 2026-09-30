import styles from './Invoice.module.css'
import { SELLER, PRODUCT, formatInvoiceDate, splitTax, formatRs } from '../data/invoice'

export default function Invoice({ invoice }) {
  const { amount, tax, total } = splitTax(invoice.price)

  return (
    <div className={styles.invoice}>
      <div className={styles.heading}>Customer Invoice</div>

      <div className={styles.split}>
        <div className={styles.cell}>
          <p className={styles.label}>From :-</p>
          <p className={styles.seller}>{SELLER.name}</p>
          <p className={styles.address}>
            {SELLER.address.map(line => <span key={line}>{line}</span>)}
            <span>GST: {SELLER.gst}</span>
          </p>
        </div>
        <div className={`${styles.cell} ${styles.side}`}>
          <dl className={styles.pairs}>
            <dt>Date</dt><dd>{formatInvoiceDate(invoice.createdAt)}</dd>
            <dt>Invoice No</dt><dd className={styles.strong}>{invoice.invoiceNo}</dd>
          </dl>
        </div>
      </div>

      <dl className={styles.rows}>
        <div><dt>Description</dt><dd>{PRODUCT.description}</dd></div>
        <div><dt>Product Name</dt><dd>{PRODUCT.name}</dd></div>
        <div><dt>SAC Code</dt><dd>{PRODUCT.sacCode}</dd></div>
      </dl>

      <div className={styles.split}>
        <div className={styles.cell}>
          <dl className={styles.pairs}>
            <dt>Customer Mobile No</dt><dd>{invoice.mobile}</dd>
            <dt>Name</dt><dd>{invoice.name}</dd>
            <dt>Email Id</dt><dd>{invoice.email}</dd>
          </dl>
        </div>
        <div className={`${styles.cell} ${styles.side}`}>
          <dl className={styles.pairs}>
            <dt>Amount</dt><dd>{formatRs(amount)}</dd>
            <dt>Tax 5%</dt><dd>{formatRs(tax)}</dd>
            <dt>Tax Value</dt><dd>{formatRs(tax)}</dd>
          </dl>
        </div>
      </div>

      <div className={`${styles.split} ${styles.totalRow}`}>
        <div className={styles.cell} />
        <div className={`${styles.cell} ${styles.side}`}>
          <dl className={styles.pairs}>
            <dt className={styles.strong}>Total Amount</dt><dd className={styles.strong}>{formatRs(total)}</dd>
          </dl>
        </div>
      </div>

      <div className={styles.footer}>This is a computer generated invoice that does not need any signatures.</div>
    </div>
  )
}
