export const PRIVACY_EFFECTIVE_DATE = '29/09/2026'
export const PRIVACY_COMPANY = 'Forte Digital Solutions LLP, Gurugram, India'
export const PRIVACY_PRODUCT = 'Forte WiFi Extender + Antivirus Combo'

export const PRIVACY_CONTACT = {
  name: 'Forte Digital Solutions LLP',
  email: 'support@fortedigitalsolutions.com',
  phone: '+91 89297 28030',
}

export const privacyIntro = 'Forte Digital Solutions LLP ("Forte", "we", "us") respects your privacy. This Privacy Policy explains how we collect, use, store and protect your information when you use the Forte WiFi Extender + Antivirus Combo ("Service").'

export const privacySections = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: ['We may collect:'],
    list: [
      'Name, email, phone number and account/login details.',
      'Subscription and transaction information. Payment details are processed by authorised payment partners.',
      'Device information such as model, operating system, IP address and app version.',
      'WiFi/network information such as network name, signal strength and connection status.',
      'Security information, including threat detections, file hashes and suspicious URLs.',
      'Usage, diagnostic and customer-support information.',
    ],
    after: [
      'We do not intentionally access the content of your personal files, messages or photos. Files may be scanned only when required for malware detection.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Information',
    body: ['We use information to:'],
    list: [
      'Provide and manage the Service and subscriptions.',
      'Detect and prevent security threats.',
      'Improve WiFi performance and Service functionality.',
      'Process payments and prevent fraud.',
      'Provide customer support and service notifications.',
      'Send promotional communications where permitted.',
      'Comply with applicable laws.',
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing of Information',
    body: [
      'We do not sell personal information.',
      'Information may be shared with authorised service providers, including payment, hosting, analytics and communication providers, or with authorities where legally required.',
    ],
  },
  {
    id: 'security-retention',
    title: 'Data Security & Retention',
    body: [
      'We use reasonable technical and organisational safeguards to protect your information.',
      'Data is retained only for as long as necessary to provide the Service, meet legal requirements or resolve disputes, after which it is deleted or anonymised where applicable.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    body: [
      `Subject to applicable law, you may request access, correction or deletion of your personal data, withdraw consent, or raise a grievance by contacting us at ${PRIVACY_CONTACT.email}.`,
    ],
  },
  {
    id: 'cookies-permissions',
    title: 'Cookies & Permissions',
    body: [
      'The Service may use cookies, SDKs and similar technologies.',
      'The app may also require permissions such as network, storage, location or notifications for certain features.',
    ],
  },
  {
    id: 'children',
    title: "Children's Privacy",
    body: [
      'The Service is intended for users aged 18 years and above. We do not knowingly collect children\'s personal data without appropriate consent.',
    ],
  },
  {
    id: 'updates-contact',
    title: 'Updates & Contact',
    body: [
      'We may update this Privacy Policy from time to time. The latest version will be published with the updated effective date.',
    ],
    contact: true,
  },
]
