import App from './App'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

function normalizePath(pathname: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  let path = pathname
  if (base && base !== '/' && path.startsWith(base)) {
    path = path.slice(base.length) || '/'
  }
  path = path.replace(/\/+$/, '') || '/'
  return path.toLowerCase()
}

export default function Root() {
  const path = normalizePath(window.location.pathname)

  if (path === '/privacy') return <PrivacyPage />
  if (path === '/terms') return <TermsPage />
  return <App />
}
