import { WindowsLogo, AndroidLogo } from '../components/Icons'

const FILES_BASE = 'https://wifi.vault-x.world/downloads'

export const downloads = [
  {
    key: 'windows',
    Logo: WindowsLogo,
    platform: 'Windows',
    href: `${FILES_BASE}/wifi-extender-setup.exe`,
    file: 'wifi-extender-setup.exe',
  },
  {
    key: 'android',
    Logo: AndroidLogo,
    platform: 'Android',
    href: `${FILES_BASE}/android-app.apk`,
    file: 'android-app.apk',
  },
]
