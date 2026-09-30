export const SELLER = {
  name: 'FORTE DIGITAL SOLUTIONS LLP',
  address: ['417, 4th Floor, Tower A', 'Spaze I Tech Park, Sohna Road', 'Gurugram, Haryana - 122018'],
  gst: '06AAEFF5231E1ZW',
}

export const PRODUCT = {
  name: 'Duo Vault-X',
  description: 'WiFi Extender with Shield Antivirus — fast connectivity and complete device protection in one bundle.',
  sacCode: '0000',
}

export const TAX_RATE = 0.05

export function generateInvoiceNo() {
  return `FR${Date.now().toString(36).toUpperCase()}`
}

export function formatInvoiceDate(date) {
  const d = new Date(date)
  const pad = n => String(n).padStart(2, '0')
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`
}

export function splitTax(total) {
  const amount = Math.round((total / (1 + TAX_RATE)) * 100) / 100
  return { amount, tax: Math.round((total - amount) * 100) / 100, total }
}

export const formatRs = n => `Rs. ${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
