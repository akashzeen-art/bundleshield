import { WindowsLogo, AppleLogo } from '../components/Icons'

const FILES_BASE = 'https://antivirus.vault-x.world/files'

export const antivirusDownloads = [
  {
    key: 'windows',
    Logo: WindowsLogo,
    platform: 'Windows',
    metaKey: 'windowsMeta',
    href: `${FILES_BASE}/AntiVirusPro-Setup.exe`,
    file: 'AntiVirusPro-Setup.exe',
  },
  {
    key: 'mac',
    Logo: AppleLogo,
    platform: 'macOS',
    metaKey: 'macMeta',
    href: `${FILES_BASE}/AntiVirusPro-mac.dmg`,
    file: 'AntiVirusPro-mac.dmg',
  },
]
