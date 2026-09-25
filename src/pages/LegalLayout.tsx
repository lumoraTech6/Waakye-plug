import type { ReactNode } from 'react'
import { logoUrl } from '../assets/images'

function sitePath(segment: string) {
  const base = import.meta.env.BASE_URL
  return `${base}${segment}`.replace(/\/{2,}/g, '/')
}

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)', color: 'var(--deep-red)' }}>
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(254,250,244,0.96)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(92,10,10,0.1)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href={sitePath('')} className="flex items-center gap-2 shrink-0">
            <img src={logoUrl} alt="Waakye Plug" className="h-9 w-auto" />
          </a>
          <a
            href={sitePath('')}
            className="text-sm font-semibold hover:underline underline-offset-2"
            style={{ color: 'var(--red)' }}
          >
            Back to home
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <p className="text-sm font-medium mb-2 opacity-60">Waakye Plug</p>
        <h1 className="font-extrabold mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: 1.1 }}>
          {title}
        </h1>
        <p className="text-sm font-normal mb-10 opacity-65">Last updated: {lastUpdated}</p>
        <div className="legal-prose space-y-10">{children}</div>
      </main>

      <footer className="max-w-3xl mx-auto px-6 pb-12 flex flex-wrap gap-6 text-sm font-medium opacity-70">
        <a href={sitePath('terms')} className="hover:opacity-100">
          Terms of Service
        </a>
        <a href={sitePath('privacy')} className="hover:opacity-100">
          Privacy Policy
        </a>
        <a href={sitePath('')} className="hover:opacity-100">
          Home
        </a>
      </footer>
    </div>
  )
}

export function LegalSections({ sections }: { sections: { heading: string; body: string }[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-bold text-xl mb-4 leading-snug">{section.heading}</h2>
          <div className="space-y-4 text-base leading-relaxed font-normal opacity-90">
            {section.body.split(/\n\n+/).map((paragraph, i) => (
              <p key={i}>{paragraph.trim()}</p>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
