export const plans = [
  { id: 'starter', wifi: 1, antivirus: 1, price: 300 },
  { id: 'family', wifi: 1, antivirus: 3, price: 1000, popular: true },
  { id: 'pro', wifi: 1, antivirus: 5, price: 2000 },
  { id: 'ultimate', wifi: 1, antivirus: 10, price: 5000 },
]

export const formatPrice = n => n.toLocaleString('en-IN')

export const ORDER_KEY = 'duoshield-order'

export function getSavedOrder() {
  try {
    const order = JSON.parse(localStorage.getItem(ORDER_KEY))
    return order?.email ? order : null
  } catch {
    return null
  }
}

export function goToDownloadPage(href, planId) {
  const order = getSavedOrder()
  if (order && planId && order.plan !== planId) {
    localStorage.setItem(ORDER_KEY, JSON.stringify({ ...order, plan: planId }))
  }
  window.location.href = `${href}?plan=${encodeURIComponent(planId || order?.plan || '')}`
}
