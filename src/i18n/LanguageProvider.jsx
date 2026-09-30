import { useEffect, useMemo, useState } from 'react'
import { LanguageContext, LANG_KEY } from './context'
import { translations, DEFAULT_LANG } from './translations'

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(LANG_KEY)
    return translations[saved] ? saved : DEFAULT_LANG
  })

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
