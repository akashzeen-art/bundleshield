import { PRIVACY_CONTACT } from './privacy'

export const REFUND_EFFECTIVE_DATE = '29/06/2026'
export const REFUND_COMPANY = 'Forte Digital Solutions LLP, Gurugram, India'
export const REFUND_CONTACT = PRIVACY_CONTACT

export const refundSections = [
  {
    id: 'cancellation',
    title: 'Subscription Cancellation',
    body: [
      'You may cancel your subscription at any time. Cancellation will prevent future renewals, while access to the Service will generally continue until the end of the current paid subscription period.',
    ],
  },
  {
    id: 'refunds',
    title: 'Refunds',
    body: [
      'Payments are generally non-refundable once a subscription has been activated, except where required by applicable law or where Forte determines that a refund is appropriate.',
      'Refund requests may be considered in cases such as:',
    ],
    list: [
      'Duplicate or accidental charges.',
      'Technical issues preventing reasonable use of the Service.',
      'Unauthorised transactions reported promptly.',
      'Other circumstances approved by Forte.',
    ],
  },
  {
    id: 'refund-request',
    title: 'Refund Request',
    body: [
      [
        'To request a refund, contact us at ',
        { text: REFUND_CONTACT.email, href: `mailto:${REFUND_CONTACT.email}` },
        ' with:',
      ],
    ],
    list: [
      'Registered email/mobile number.',
      'Transaction/order ID.',
      'Date and amount of payment.',
      'Reason for the refund request.',
    ],
  },
  {
    id: 'refund-processing',
    title: 'Refund Processing',
    body: [
      'Approved refunds will be processed through the original payment method, where possible.',
      'Processing times may vary depending on the payment gateway or bank.',
    ],
  },
  {
    id: 'auto-renewal',
    title: 'Auto-Renewal',
    body: [
      'If your subscription is set to auto-renew, you may cancel it before the next billing date to avoid the next charge.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    body: ['For cancellation or refund-related queries:'],
    contact: true,
  },
]
