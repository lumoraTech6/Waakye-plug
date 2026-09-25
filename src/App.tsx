import { useState, useEffect, useRef } from 'react'
import { logoUrl, waakyeDishUrl } from './assets/images'

const ORDER_URL = 'https://waakye-plug2.vercel.app'
const WHATSAPP_URL = 'https://wa.me/233599995651'
const TIKTOK_URL = 'https://www.tiktok.com/@waakyeplug'

function whatsAppLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

function sitePath(segment: string) {
  return `${import.meta.env.BASE_URL}${segment}`.replace(/\/{2,}/g, '/')
}

// --- Scroll reveal hook ---
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = (e.target as HTMLElement).dataset.delay || '0'
            setTimeout(() => e.target.classList.add('in-view'), Number(delay))
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// --- Cursor tilt hook ---
function useCursorTilt(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`
    }
    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref])
}

// --- Adinkra SVG pattern ---
function AdinkraPattern({ id, color, opacity = 0.13 }: { id: string; color: string; opacity?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={id} x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1.4" opacity={opacity}>
            {/* Gye Nyame-inspired cross/disc symbol */}
            <ellipse cx="35" cy="35" rx="18" ry="11" />
            <ellipse cx="35" cy="35" rx="9" ry="5" />
            <circle cx="35" cy="35" r="2.5" fill={color} stroke="none" />
            <line x1="35" y1="24" x2="35" y2="17" />
            <line x1="35" y1="46" x2="35" y2="53" />
            <line x1="17" y1="35" x2="10" y2="35" />
            <line x1="53" y1="35" x2="60" y2="35" />
            {/* Sankofa-inspired arc at corner */}
            <path d="M 5 5 Q 15 2 12 12" strokeWidth="1" />
            <path d="M 5 5 Q 2 15 12 12" strokeWidth="1" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

// --- Floating glossy shape ---
function GlossyShape({
  color,
  className,
  style,
}: {
  color: 'gold' | 'red'
  className?: string
  style?: React.CSSProperties
}) {
  const isGold = color === 'gold'
  const bg = isGold
    ? 'linear-gradient(135deg, #FFE55C 0%, #FFD700 50%, #E6B800 100%)'
    : 'linear-gradient(135deg, #FF6B6B 0%, #FF2D2D 50%, #CC0000 100%)'
  const shadow = isGold
    ? '0 12px 40px rgba(255,215,0,0.5), inset 0 1px 0 rgba(255,255,255,0.5)'
    : '0 12px 40px rgba(255,45,45,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
  return (
    <div
      className={className}
      style={{
        background: bg,
        boxShadow: shadow,
        borderRadius: '999px',
        ...style,
      }}
    />
  )
}

// ===================== NAV =====================
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    { label: 'How it works', href: '#how' },
    { label: 'Menu', href: '#menu' },
    { label: 'Vendors', href: '#network-vendors' },
    { label: 'Riders', href: '#network-riders' },
    { label: 'FAQ', href: '#faq' },
  ]
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      <div
        className="w-full max-w-5xl transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(16px)',
          borderRadius: '999px',
          boxShadow: scrolled
            ? '0 8px 40px rgba(92,10,10,0.14)'
            : '0 4px 20px rgba(92,10,10,0.08)',
          padding: '10px 20px',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 shrink-0">
            <img src={logoUrl} alt="Waakye Plug" className="h-9 w-auto" />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-colors hover:bg-[#FFF3B0]"
                  style={{ color: 'var(--deep-red)' }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Order now CTA */}
          <a
            href="https://waakye-plug2.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg shrink-0"
            style={{ background: 'var(--red)' }}
          >
            Order now
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{
                background: 'var(--deep-red)',
                transform: open ? 'rotate(45deg) translate(3px, 3px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{
                background: 'var(--deep-red)',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{
                background: 'var(--deep-red)',
                transform: open ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-3 pb-2 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-semibold hover:bg-[#FFF3B0]"
                style={{ color: 'var(--deep-red)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://waakye-plug2.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-5 py-3 rounded-full text-sm font-bold text-white text-center"
              style={{ background: 'var(--red)' }}
            >
              Order now
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

// ===================== HERO =====================
function Hero() {
  const tiltRef = useRef<HTMLDivElement>(null)
  useCursorTilt(tiltRef)
  const heroRef = useRef<HTMLDivElement>(null)

  // parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const y = window.scrollY
      const shapes = heroRef.current.querySelectorAll<HTMLElement>('[data-parallax]')
      shapes.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0')
        el.style.transform = `translateY(${y * speed}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
      style={{ background: 'var(--cream)' }}
    >
      {/* Adinkra corners */}
      <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden opacity-40">
        <AdinkraPattern id="adinkra-hero-tr" color="#FFD700" opacity={0.18} />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 overflow-hidden opacity-30">
        <AdinkraPattern id="adinkra-hero-bl" color="#FF2D2D" opacity={0.15} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div>
          {/* Location pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'var(--gold-light)', color: 'var(--deep-red)', border: '1.5px solid var(--gold)' }}
          >
            <span
              className="w-2 h-2 rounded-full inline-block animate-pulse"
              style={{ background: 'var(--red)' }}
            />
            Delivering in Ho, Volta Region
          </div>

          <h1
            className="font-black leading-[0.92] mb-6"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              color: 'var(--deep-red)',
              letterSpacing: '-0.02em',
            }}
          >
            Chale,<br />
            let&apos;s{' '}
            <span style={{ color: 'var(--red)' }}>eat!</span>
          </h1>

          <p
            className="text-lg md:text-xl font-medium mb-8 max-w-md leading-relaxed"
            style={{ color: 'var(--deep-red)', opacity: 0.8 }}
          >
            Real Ghanaian food, delivered hot and ready. Your favorite Waakye, fresh from vetted local vendors.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://waakye-plug2.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full font-bold text-white text-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: 'var(--red)', boxShadow: '0 8px 30px rgba(255,45,45,0.35)' }}
            >
              Order now
            </a>
            <a
              href="#network-vendors"
              className="inline-flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
              style={{
                border: '2.5px solid var(--gold)',
                color: 'var(--deep-red)',
                background: 'transparent',
              }}
            >
              Become a vendor
            </a>
          </div>
        </div>

        {/* Right: hero visual */}
        <div className="relative flex items-center justify-center min-h-[460px]">
          {/* Floating shapes */}
          <GlossyShape
            color="gold"
            className="absolute float-a"
            style={{ width: 90, height: 44, top: '8%', left: '4%' }}
          />
          <GlossyShape
            color="red"
            className="absolute float-b"
            style={{ width: 60, height: 60, top: '18%', right: '2%' }}
          />
          <GlossyShape
            color="gold"
            className="absolute float-c"
            style={{ width: 44, height: 44, bottom: '20%', left: '8%' }}
          />
          <GlossyShape
            color="red"
            className="absolute float-a"
            style={{ width: 110, height: 50, bottom: '10%', right: '5%' }}
          />
          <GlossyShape
            color="gold"
            className="absolute float-b"
            style={{ width: 34, height: 34, top: '50%', right: '18%' }}
          />

          {/* Phone mockup (placeholder for screenshot) */}
          <div
            className="absolute right-0 top-10 hidden lg:block"
            style={{
              transform: 'perspective(600px) rotateY(-12deg) rotateX(4deg)',
              width: 140,
              zIndex: 1,
            }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#fff',
                boxShadow: '0 20px 60px rgba(92,10,10,0.2)',
                border: '3px solid var(--deep-red)',
                height: 280,
                width: 140,
                padding: '16px 10px',
              }}
            >
              <div className="text-center mb-3">
                <div className="text-xs font-bold" style={{ color: 'var(--deep-red)' }}>
                  Your Order
                </div>
              </div>
              {['Order placed', 'Vendor cooking', 'Rider assigned', 'On the way'].map((step, i) => (
                <div key={step} className="flex items-center gap-2 mb-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      background: i < 3 ? 'var(--red)' : '#eee',
                      color: i < 3 ? '#fff' : '#aaa',
                    }}
                  >
                    {i < 3 ? '✓' : ''}
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: i < 3 ? 'var(--deep-red)' : '#bbb' }}
                  >
                    {step}
                  </span>
                </div>
              ))}
              <div
                className="mt-4 rounded-xl p-2 text-center text-xs font-semibold"
                style={{ background: 'var(--gold-light)', color: 'var(--deep-red)' }}
              >
                Rider 8 min away
              </div>
            </div>
          </div>

          {/* Main food card */}
          <div
            ref={tiltRef}
            className="relative cursor-pointer transition-transform duration-200"
            style={{
              borderRadius: 32,
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(92,10,10,0.22)',
              width: '100%',
              maxWidth: 340,
              zIndex: 2,
              border: '3px solid var(--gold)',
            }}
          >
            <img
              src={waakyeDishUrl}
              alt="A plate of waakye with spaghetti, gari, shito, boiled egg and fried plantain"
              className="w-full object-cover"
              style={{ height: 340 }}
              loading="eager"
            />
            {/* Hot and ready chip */}
            <div
              className="absolute top-4 left-4 px-4 py-2 rounded-full font-bold text-sm float-b"
              style={{
                background: 'var(--gold)',
                color: 'var(--deep-red)',
                boxShadow: '0 4px 16px rgba(255,215,0,0.5)',
              }}
            >
              Hot and ready
            </div>
            {/* Bottom overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{
                background: 'linear-gradient(to top, rgba(92,10,10,0.85) 0%, transparent 100%)',
              }}
            >
              <p className="text-white font-bold text-lg">Waakye with everything</p>
              <p className="text-white text-sm opacity-80 font-medium">Spaghetti, gari, shito, egg</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===================== MARQUEE =====================
function Marquee() {
  const items = [
    'Waakye',
    'Jollof',
    'Banku and Tilapia',
    'Kelewele',
    'Red Red',
    'Waakye',
    'Jollof',
    'Banku and Tilapia',
    'Kelewele',
    'Red Red',
  ]
  return (
    <div
      className="relative overflow-hidden py-5"
      style={{ background: 'var(--red)' }}
    >
      <div className="marquee-track flex items-center gap-0 whitespace-nowrap" style={{ width: 'max-content' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-white font-bold text-lg md:text-xl px-6" style={{ letterSpacing: '0.02em' }}>
              {item}
            </span>
            {/* Adinkra separator */}
            <span className="text-white opacity-60 font-black text-xl">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ===================== MENU CARDS =====================
type MenuItem = {
  name: string
  tagline: string
  desc: string
  img: string
  accent: string
  bg: string
  available: boolean
}

const menuItems: MenuItem[] = [
  {
    name: 'Waakye',
    tagline: 'The O.G. Rice and beans done right.',
    desc: 'Classic waakye with spaghetti, gari, stew, shito, boiled egg, and fried plantain. No wahala.',
    img: waakyeDishUrl,
    accent: '#FFD700',
    bg: '#FFF9CC',
    available: true,
  },
  {
    name: 'Jollof',
    tagline: 'Ghana Jollof, chale. Period.',
    desc: 'Smoky, tomato-soaked rice slow-cooked in seasoned broth. Ghana jollof, the way you know it.',
    img: 'https://images.unsplash.com/photo-1602873520153-ec56ca3c205b?w=500&h=700&fit=crop&auto=format',
    accent: '#FF2D2D',
    bg: '#FFE8E8',
    available: false,
  },
  {
    name: 'Banku + Tilapia',
    tagline: 'Fermented, grilled, perfect.',
    desc: 'Smooth fermented corn dough paired with crispy grilled tilapia and fiery pepper sauce. A Volta classic.',
    img: 'https://images.unsplash.com/photo-1665332111329-dd9d7fa46c74?w=500&h=700&fit=crop&auto=format',
    accent: '#FFD700',
    bg: '#FFFBE0',
    available: false,
  },
  {
    name: 'Kelewele',
    tagline: 'Spiced plantain, fried golden.',
    desc: 'Ripe plantain cubed and seasoned with ginger, pepper, and spices, then fried until crispy and sweet.',
    img: 'https://images.unsplash.com/photo-1765584830084-eb3d2268b263?w=500&h=700&fit=crop&auto=format',
    accent: '#E6B800',
    bg: '#FFF3B0',
    available: false,
  },
  {
    name: 'Red Red',
    tagline: 'Beans and palm oil, pure comfort.',
    desc: 'Black-eyed beans in rich palm oil stew, served with fried ripe plantain. Simple, warm, and satisfying.',
    img: 'https://images.unsplash.com/photo-1586993966545-a56595567034?w=500&h=700&fit=crop&auto=format',
    accent: '#FF2D2D',
    bg: '#FFE8E8',
    available: false,
  },
]

function MenuComingSoonBadge({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const isLight = variant === 'light'
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider shrink-0"
      style={{
        background: isLight ? 'rgba(255,255,255,0.96)' : 'rgba(92,10,10,0.55)',
        color: isLight ? 'var(--deep-red)' : '#fff',
        border: `1.5px solid ${isLight ? 'var(--gold)' : 'rgba(255,215,0,0.55)'}`,
        boxShadow: isLight ? '0 4px 18px rgba(92,10,10,0.14)' : '0 4px 18px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: isLight ? 'var(--red)' : 'var(--gold)' }}
        aria-hidden
      />
      Coming soon
    </span>
  )
}

function MenuItemAction({ item, tone }: { item: MenuItem; tone: 'light' | 'dark' }) {
  if (item.available) {
    return (
      <a
        href={ORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex mt-4 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105"
        style={{ background: 'var(--gold)', color: 'var(--deep-red)' }}
      >
        Order {item.name}
      </a>
    )
  }

  const isDark = tone === 'dark'
  return (
    <div className="mt-4 space-y-3">
      <p
        className="text-sm leading-relaxed"
        style={{ color: isDark ? 'rgba(255,255,255,0.88)' : 'var(--deep-red)', opacity: isDark ? 1 : 0.82 }}
      >
        {item.name} is coming to Ho soon. We&apos;re lining up vendors now. Order waakye today and watch this space.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <MenuComingSoonBadge variant={isDark ? 'dark' : 'light'} />
        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold underline-offset-2 hover:underline"
          style={{ color: isDark ? 'var(--gold)' : '#8A6800' }}
        >
          Order waakye instead
        </a>
      </div>
    </div>
  )
}

function MenuCards() {
  const [active, setActive] = useState(0)
  return (
    <section id="menu" className="py-20 px-6" style={{ background: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="reveal font-extrabold mb-3 text-center"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--deep-red)', lineHeight: 1.05 }}
        >
          What are you{' '}
          <span style={{ color: 'var(--red)' }}>craving?</span>
        </h2>
        <p
          className="reveal text-center font-medium mb-12 text-lg"
          style={{ color: 'var(--deep-red)', opacity: 0.7 }}
          data-delay="100"
        >
          Waakye is live. Tap a dish to see what&apos;s ready and what&apos;s next.
        </p>

        {/* Mobile: vertical cards */}
        <div className="flex flex-col gap-5 md:hidden">
          {menuItems.map((item, i) => (
            <div
              key={item.name}
              className="reveal rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
              data-delay={`${i * 80}`}
              style={{
                border: `2.5px solid ${active === i ? item.accent : 'transparent'}`,
                background: active === i ? item.bg : '#fff',
                boxShadow: active === i ? `0 12px 40px rgba(0,0,0,0.1)` : '0 4px 16px rgba(0,0,0,0.06)',
                opacity: item.available ? 1 : active === i ? 1 : 0.92,
              }}
              onClick={() => setActive(i === active ? -1 : i)}
            >
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full object-cover transition-all duration-300"
                  style={{
                    height: 200,
                    filter: item.available ? 'none' : 'saturate(0.65) brightness(0.92)',
                  }}
                  loading="lazy"
                />
                {item.available ? (
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'var(--gold)', color: 'var(--deep-red)' }}
                  >
                    Order now
                  </span>
                ) : (
                  <span className="absolute top-3 right-3">
                    <MenuComingSoonBadge />
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-extrabold text-xl" style={{ color: 'var(--deep-red)' }}>
                    {item.name}
                  </h3>
                </div>
                <p className="font-medium text-sm mb-2" style={{ color: item.accent === '#FFD700' ? '#8A6800' : '#7C1010' }}>
                  {item.tagline}
                </p>
                {active === i && (
                  <>
                    {item.available ? (
                      <p className="text-sm font-normal leading-relaxed" style={{ color: 'var(--deep-red)', opacity: 0.8 }}>
                        {item.desc}
                      </p>
                    ) : null}
                    <MenuItemAction item={item} tone="light" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal accordion */}
        <div className="hidden md:flex gap-3 h-[480px]">
          {menuItems.map((item, i) => {
            const isActive = active === i
            const imgFilter = item.available
              ? isActive
                ? 'brightness(0.7)'
                : 'brightness(0.5) saturate(0.8)'
              : isActive
                ? 'brightness(0.55) saturate(0.55)'
                : 'brightness(0.42) saturate(0.45)'
            return (
              <div
                key={item.name}
                className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 flex-shrink-0"
                style={{
                  flexGrow: isActive ? 3 : 1,
                  flexBasis: isActive ? 260 : 80,
                  border: `2.5px solid ${isActive ? item.accent : 'rgba(92,10,10,0.08)'}`,
                  boxShadow: isActive ? `0 16px 60px rgba(0,0,0,0.15)` : '0 4px 20px rgba(0,0,0,0.07)',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  opacity: item.available ? 1 : isActive ? 1 : 0.88,
                }}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  style={{ filter: imgFilter }}
                  loading="lazy"
                />
                {!item.available && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: isActive ? 'rgba(254,250,244,0.08)' : 'rgba(254,250,244,0.22)',
                    }}
                  />
                )}
                {!isActive && !item.available && (
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                    <MenuComingSoonBadge variant="dark" />
                  </span>
                )}
                {!isActive && item.available && (
                  <span
                    className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'var(--gold)', color: 'var(--deep-red)' }}
                  >
                    Live
                  </span>
                )}
                {/* Collapsed: vertical label */}
                {!isActive && (
                  <div
                    className="absolute inset-0 flex items-end justify-center pb-6"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    <span className="text-white font-extrabold text-lg tracking-wide rotate-180">
                      {item.name}
                    </span>
                  </div>
                )}
                {/* Expanded: info */}
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 z-10"
                    style={{
                      background: 'linear-gradient(to top, rgba(92,10,10,0.95) 0%, transparent 100%)',
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: item.accent, color: 'var(--deep-red)' }}
                      >
                        {item.tagline}
                      </div>
                      {!item.available && <MenuComingSoonBadge variant="dark" />}
                    </div>
                    <h3 className="text-white font-extrabold text-2xl mb-2">{item.name}</h3>
                    {item.available && (
                      <p className="text-white text-sm opacity-90 leading-relaxed">{item.desc}</p>
                    )}
                    <MenuItemAction item={item} tone="dark" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ===================== HOW IT WORKS =====================
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Pick a vendor near you',
      body: 'We show approved vendors within 6 km. Each kitchen is vetted by our team. Real cooks, real kitchens.',
      accent: 'var(--gold)',
      rotate: '-4deg',
      z: 1,
    },
    {
      num: '02',
      title: 'Build your bowl',
      body: 'Choose your waakye and extras. Gari? Extra shito? Double egg? Build it exactly how you like it.',
      accent: 'var(--red)',
      rotate: '0deg',
      z: 2,
    },
    {
      num: '03',
      title: 'We bring it hot',
      body: 'Track your rider live. Pay when it arrives: cash or MoMo. No wahala, no upfront card.',
      accent: 'var(--gold)',
      rotate: '4deg',
      z: 3,
    },
  ]
  return (
    <section
      id="how"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#FFF5D6' }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <AdinkraPattern id="adinkra-how" color="#FFD700" opacity={0.1} />
      </div>
      <div className="relative max-w-5xl mx-auto">
        <h2
          className="reveal font-extrabold text-center mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'var(--deep-red)', lineHeight: 1.05 }}
        >
          Simple as{' '}
          <span style={{ color: 'var(--red)' }}>1, 2, 3</span>
        </h2>
        <p
          className="reveal text-center font-medium mb-16 text-lg"
          style={{ color: 'var(--deep-red)', opacity: 0.7 }}
          data-delay="100"
        >
          Three steps from craving to eating.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4"
          style={{ perspective: '1000px' }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="reveal"
              data-delay={`${i * 120}`}
              style={{
                transform: `perspective(800px) rotate(${step.rotate})`,
                transition: 'transform 0.3s ease',
                zIndex: step.z,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = `perspective(800px) rotate(0deg) translateY(-8px)`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = `perspective(800px) rotate(${step.rotate})`
              }}
            >
              <div
                className="rounded-3xl p-8 h-full"
                style={{
                  background: '#fff',
                  border: `3px solid ${step.accent}`,
                  boxShadow: `0 12px 40px rgba(0,0,0,0.1), 6px 6px 0px ${step.accent}`,
                }}
              >
                <div
                  className="font-black mb-4 leading-none"
                  style={{ fontSize: '4rem', color: step.accent, opacity: 0.9 }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-extrabold text-xl mb-3 leading-tight"
                  style={{ color: 'var(--deep-red)' }}
                >
                  {step.title}
                </h3>
                <p className="font-medium leading-relaxed" style={{ color: 'var(--deep-red)', opacity: 0.75 }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===================== LIVE TRACKING =====================
function LiveTracking() {
  const phoneRef = useRef<HTMLDivElement>(null)
  useCursorTilt(phoneRef)
  return (
    <section className="py-24 px-6" style={{ background: 'var(--cream)' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <h2
            className="reveal-left font-extrabold mb-6 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--deep-red)' }}
          >
            Watch your food{' '}
            <span style={{ color: 'var(--red)' }}>come to you</span>
          </h2>
          <div className="reveal-left space-y-5" data-delay="100">
            {[
              { step: '01', label: 'Rider assigned', desc: 'A local rider from your community picks up your order.' },
              { step: '02', label: 'Picked up', desc: 'Food is packed and on the move. Still hot when it gets to you.' },
              { step: '03', label: 'Delivered', desc: 'Tap to pay on delivery. Cash or MoMo. No stress.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm"
                  style={{ background: 'var(--red)', color: '#fff' }}
                >
                  {item.step}
                </div>
                <div>
                  <p className="font-bold text-base" style={{ color: 'var(--deep-red)' }}>
                    {item.label}
                  </p>
                  <p className="font-normal text-sm leading-relaxed" style={{ color: 'var(--deep-red)', opacity: 0.72 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: phone mockup */}
        <div className="flex justify-center">
          <div
            ref={phoneRef}
            className="reveal-right cursor-pointer transition-transform duration-200"
            data-delay="80"
            style={{
              width: 240,
              transform: 'perspective(800px) rotateY(-8deg) rotateX(4deg)',
            }}
          >
            <div
              className="rounded-[40px] overflow-hidden"
              style={{
                background: '#fff',
                border: '4px solid var(--deep-red)',
                boxShadow: '0 32px 80px rgba(92,10,10,0.25)',
                padding: '24px 16px',
                height: 420,
              }}
            >
              <div
                className="rounded-2xl p-3 mb-4 text-center"
                style={{ background: 'var(--red)' }}
              >
                <p className="text-white font-bold text-sm">Live Order Tracking</p>
              </div>
              {/* Progress stepper */}
              <div className="relative">
                <div
                  className="absolute left-4 top-0 bottom-0 w-0.5"
                  style={{ background: '#eee' }}
                />
                <div
                  className="absolute left-4 top-0 w-0.5"
                  style={{ background: 'var(--red)', height: '70%' }}
                />
                {['Order placed', 'Vendor confirmed', 'Rider assigned', 'On the way', 'Delivered'].map((s, i) => (
                  <div key={s} className="flex items-center gap-3 mb-5 relative pl-8">
                    <div
                      className="absolute left-2.5 w-3 h-3 rounded-full border-2"
                      style={{
                        background: i < 4 ? 'var(--red)' : '#eee',
                        borderColor: i < 4 ? 'var(--red)' : '#ddd',
                      }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: i < 4 ? 'var(--deep-red)' : '#ccc' }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="rounded-xl p-3 mt-2 text-center"
                style={{ background: 'var(--gold-light)', border: '1.5px solid var(--gold)' }}
              >
                <p className="font-bold text-sm" style={{ color: 'var(--deep-red)' }}>
                  Rider is 8 min away
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===================== TRUST =====================
function TrustSection() {
  const tiles = [
    {
      title: 'Personally vetted vendors',
      desc: 'Our team picks every kitchen. No random listings, just cooks who know their craft.',
    },
    {
      title: 'Local riders, your community',
      desc: 'Our riders live in Ho. They know the streets, they care about the community, and they get there fast.',
    },
    {
      title: 'Simple pay on delivery',
      desc: 'Cash or MoMo when your food arrives. No card, no upfront payment, no risk.',
    },
  ]
  return (
    <section className="py-24 px-6" style={{ background: '#FFE8E8' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2
              className="reveal font-extrabold mb-5 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--deep-red)' }}
            >
              Every vendor{' '}
              <span style={{ color: 'var(--red)' }}>personally vetted</span>
            </h2>
            <p
              className="reveal font-medium text-lg leading-relaxed"
              style={{ color: 'var(--deep-red)', opacity: 0.8 }}
              data-delay="100"
            >
              We don&apos;t list just anybody. Our team visits, tastes, and approves every vendor on Waakye Plug before
              they go live. Home-cooked Ghanaian food from people who care what lands on your plate.
            </p>
          </div>
          <div className="space-y-5">
            {tiles.map((tile, i) => (
              <div
                key={tile.title}
                className="reveal rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg"
                data-delay={`${i * 100}`}
                style={{
                  background: '#fff',
                  border: '2px solid var(--red)',
                  boxShadow: '0 4px 20px rgba(255,45,45,0.08)',
                }}
              >
                <h3 className="font-bold text-base mb-1.5" style={{ color: 'var(--red)' }}>
                  {tile.title}
                </h3>
                <p className="font-normal text-sm leading-relaxed" style={{ color: 'var(--deep-red)', opacity: 0.8 }}>
                  {tile.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ===================== JOIN NETWORK =====================
function NetworkCardIcon({ kind }: { kind: 'vendor' | 'rider' | 'support' }) {
  const styles: Record<typeof kind, { bg: string; color: string; glyph: string }> = {
    vendor: { bg: 'var(--gold-light)', color: '#8A6800', glyph: '✦' },
    rider: { bg: '#FFE8E8', color: 'var(--red)', glyph: '●' },
    support: { bg: 'var(--gold-light)', color: 'var(--deep-red)', glyph: '✉' },
  }
  const s = styles[kind]
  return (
    <span
      className="inline-flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold mb-6"
      style={{ background: s.bg, color: s.color }}
      aria-hidden
    >
      {s.glyph}
    </span>
  )
}

function JoinNetwork() {
  const cards = [
    {
      title: 'Start selling',
      sub: 'For vendors',
      desc: 'Do you cook for Ho? Join our network to reach new customers. We handle delivery so you can focus on the food.',
      img: 'https://images.unsplash.com/photo-1709837167686-a2e33aad1bf0?w=800&h=600&fit=crop&auto=format',
      cta: 'See more',
      href: whatsAppLink('Hi Waakye Plug, I would like to apply as a vendor.'),
      border: 'var(--gold)',
      panel: '#FFF9CC',
      link: '#8A6800',
      icon: 'vendor' as const,
      sectionId: 'network-vendors',
    },
    {
      title: 'Deliver with us',
      sub: 'For riders',
      desc: 'Join our riders bringing hot meals across Ho. Flexible hours, local routes, and pay per delivery. Motorbike and phone is all you need.',
      img: 'https://images.unsplash.com/photo-1667844141292-0754524d5897?w=800&h=600&fit=crop&auto=format',
      cta: 'See more',
      href: whatsAppLink('Hi Waakye Plug, I would like to become a rider.'),
      border: 'var(--red)',
      panel: '#FFE8E8',
      link: 'var(--red)',
      icon: 'rider' as const,
      sectionId: 'network-riders',
    },
    {
      title: 'Talk to us',
      sub: 'WhatsApp support',
      desc: 'Order on WhatsApp or message us for help. No app needed. Send a text and we will sort you out.',
      img: 'https://images.unsplash.com/photo-1786634719105-ff6b1666f376?w=800&h=600&fit=crop&auto=format',
      cta: 'Chat now',
      href: whatsAppLink('Hi Waakye Plug, I need help with an order.'),
      border: 'var(--gold)',
      panel: '#FFF5D6',
      link: '#8A6800',
      icon: 'support' as const,
      sectionId: 'network-support',
    },
  ]
  return (
    <section id="network" className="py-28 md:py-36 px-4 sm:px-6" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto">
        <h2
          className="reveal font-extrabold text-center mb-5"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'var(--deep-red)', lineHeight: 1.05 }}
        >
          Join our{' '}
          <span style={{ color: 'var(--red)' }}>network</span>
        </h2>
        <p
          className="reveal text-center font-medium mb-16 md:mb-20 text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--deep-red)', opacity: 0.7 }}
          data-delay="100"
        >
          Cooks, riders, and hungry people in Ho. Come join us.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {cards.map((card, i) => (
            <a
              key={card.title}
              id={card.sectionId}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group flex flex-col min-h-[520px] md:min-h-[560px] rounded-[28px] overflow-hidden scroll-mt-28 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              data-delay={`${i * 100}`}
              style={{
                border: `2px solid ${card.border}`,
                background: '#fff',
                boxShadow: '0 12px 40px rgba(92,10,10,0.08)',
              }}
            >
              {/* White content — generous padding */}
              <div className="flex flex-col flex-1 px-8 pt-10 pb-8 md:px-10 md:pt-12 md:pb-10">
                <NetworkCardIcon kind={card.icon} />
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: card.link, opacity: 0.85 }}
                >
                  {card.sub}
                </p>
                <h3
                  className="font-extrabold leading-tight mb-6"
                  style={{
                    color: 'var(--deep-red)',
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-normal text-base md:text-[1.05rem] leading-relaxed flex-1"
                  style={{ color: 'var(--deep-red)', opacity: 0.78 }}
                >
                  {card.desc}
                </p>
                <span
                  className="inline-flex items-center gap-2 mt-10 font-bold text-sm uppercase tracking-widest transition-all group-hover:gap-3"
                  style={{ color: card.link }}
                >
                  {card.cta} <span aria-hidden>&rarr;</span>
                </span>
              </div>

              {/* Bottom visual panel */}
              <div
                className="relative h-48 sm:h-52 md:h-56 shrink-0 overflow-hidden"
                style={{ background: card.panel }}
              >
                <img
                  src={card.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${card.panel} 0%, transparent 45%)`,
                  }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===================== FAQ =====================
const faqs = [
  {
    q: 'What is Waakye Plug?',
    a: "Waakye Plug is Ho's local food delivery platform. We connect you with personally vetted Ghanaian food vendors and independent riders so you can get authentic home-cooked meals delivered to your door.",
  },
  {
    q: 'Where do you deliver?',
    a: "We deliver within Ho, Volta Region right now. More areas are coming as we grow. Follow us on TikTok for updates.",
  },
  {
    q: 'How do I pay?',
    a: 'You pay on delivery. Cash or Mobile Money (MoMo). No card and no paying upfront. You pay when your food arrives.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most orders arrive within 30 to 45 minutes. Our riders live in Ho and know the streets.',
  },
  {
    q: 'How do I sell on Waakye Plug?',
    a: "Apply through our vendor form and our team will reach out. We visit every kitchen before we list them. Quality first.",
  },
  {
    q: 'How do I become a rider?',
    a: "Fill out our rider application. You set your own schedule and earn per delivery. All you need is a motorbike and a smartphone.",
  },
]

function FAQ() {
  const [active, setActive] = useState(0)
  return (
    <section id="faq" className="py-24 px-6" style={{ background: '#FFF9CC' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="reveal font-extrabold text-center mb-14"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'var(--deep-red)', lineHeight: 1.05 }}
        >
          Got questions?{' '}
          <span style={{ color: 'var(--red)' }}>No wahala.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Questions */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <button
                key={faq.q}
                onClick={() => setActive(i)}
                className="text-left px-5 py-4 rounded-2xl font-semibold text-base transition-all"
                style={{
                  background: active === i ? 'var(--red)' : '#fff',
                  color: active === i ? '#fff' : 'var(--deep-red)',
                  border: `2px solid ${active === i ? 'var(--red)' : 'rgba(92,10,10,0.12)'}`,
                  boxShadow: active === i ? '0 8px 24px rgba(255,45,45,0.2)' : 'none',
                }}
              >
                {faq.q}
              </button>
            ))}
          </div>

          {/* Answer panel */}
          <div
            className="reveal-right rounded-3xl p-8 min-h-48"
            style={{
              background: 'var(--gold)',
              border: '2px solid var(--gold)',
              boxShadow: '0 12px 40px rgba(255,215,0,0.3)',
            }}
          >
            <p className="font-bold text-base mb-3" style={{ color: 'var(--deep-red)' }}>
              {faqs[active].q}
            </p>
            <p className="font-normal text-base leading-relaxed" style={{ color: 'var(--deep-red)', opacity: 0.85 }}>
              {faqs[active].a}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===================== CTA BANNER =====================
function CTABanner() {
  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'var(--red)' }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <AdinkraPattern id="adinkra-cta" color="#FFD700" opacity={0.2} />
      </div>
      {/* Floating shapes */}
      <GlossyShape
        color="gold"
        className="absolute float-a"
        style={{ width: 80, height: 40, top: '15%', left: '6%', opacity: 0.6 }}
      />
      <GlossyShape
        color="gold"
        className="absolute float-b"
        style={{ width: 50, height: 50, bottom: '20%', right: '8%', opacity: 0.5 }}
      />
      <GlossyShape
        color="gold"
        className="absolute float-c"
        style={{ width: 100, height: 44, top: '60%', left: '2%', opacity: 0.4 }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2
          className="reveal font-black text-white mb-6 leading-none"
          style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.02em' }}
        >
          Hungry?<br />
          No wahala.
        </h2>
        <p className="reveal text-white font-medium text-lg mb-10 opacity-90" data-delay="100">
          Real Ghanaian food, delivered hot. Order in seconds.
        </p>
        <a
          href="https://waakye-plug2.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal inline-flex items-center px-10 py-5 rounded-full font-extrabold text-xl transition-all hover:scale-105 hover:shadow-2xl"
          data-delay="200"
          style={{
            background: 'var(--gold)',
            color: 'var(--deep-red)',
            boxShadow: '0 12px 40px rgba(255,215,0,0.45)',
          }}
        >
          Order now
        </a>
      </div>
    </section>
  )
}

// ===================== FOOTER =====================
function Footer() {
  const [email, setEmail] = useState('')
  const cols = [
    {
      heading: 'Company',
      links: [
        { label: 'About us', href: '#hero' },
        { label: 'How it works', href: '#how' },
        { label: 'Menu', href: '#menu' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      heading: 'For vendors',
      links: [
        {
          label: 'Apply as a vendor',
          href: whatsAppLink('Hi Waakye Plug, I would like to apply as a vendor.'),
          external: true,
        },
        { label: 'How selling works', href: '#how' },
        { label: 'Vendor FAQ', href: '#faq' },
        { label: 'Support', href: WHATSAPP_URL, external: true },
      ],
    },
    {
      heading: 'For riders',
      links: [
        {
          label: 'Become a rider',
          href: whatsAppLink('Hi Waakye Plug, I would like to become a rider.'),
          external: true,
        },
        { label: 'Order app', href: ORDER_URL, external: true },
        { label: 'Rider FAQ', href: '#faq' },
        { label: 'Support', href: WHATSAPP_URL, external: true },
      ],
    },
    {
      heading: 'Near you',
      links: [
        { label: 'Waakye near me', href: '#menu' },
        { label: 'Banku near me', href: '#menu' },
        { label: 'Jollof near me', href: '#menu' },
        { label: 'Order in Ho', href: ORDER_URL, external: true },
      ],
    },
  ]
  const socialLinks = [
    { label: 'TikTok', short: 'TT', href: TIKTOK_URL },
    { label: 'WhatsApp', short: 'WA', href: WHATSAPP_URL },
  ]
  return (
    <footer
      className="relative pt-16 pb-10 px-6 overflow-hidden"
      style={{ background: 'var(--red)' }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-25">
        <AdinkraPattern id="adinkra-footer" color="#FFD700" opacity={0.15} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Top: logo + newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-14">
          {/* Logo + tagline */}
          <div className="max-w-xs">
            <img
              src={logoUrl}
              alt="Waakye Plug"
              className="h-14 w-auto mb-4"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-white font-medium text-sm leading-relaxed opacity-85">
              Chale, let&apos;s eat. Authentic Ghanaian food delivered fresh in Ho, Volta Region.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-110"
                  style={{ border: '2px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)' }}
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-sm">
            <p className="text-white font-bold text-base mb-2">Stay in the loop</p>
            <p className="text-white text-sm opacity-80 mb-4 font-normal">
              Get updates on new vendors, dishes, and delivery areas.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const trimmed = email.trim()
                if (!trimmed) return
                window.open(
                  whatsAppLink(`Please add me to Waakye Plug updates: ${trimmed}`),
                  '_blank',
                  'noopener,noreferrer',
                )
                setEmail('')
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full text-sm font-medium outline-none"
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  color: '#fff',
                }}
              />
              <button
                type="submit"
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold transition-all hover:scale-110"
                style={{ background: 'var(--gold)', color: 'var(--deep-red)' }}
                aria-label="Subscribe"
              >
                &rarr;
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="text-white font-bold text-sm mb-4 opacity-60 uppercase tracking-wider">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-white text-sm font-normal opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}
        >
          <p className="text-white text-sm opacity-60 font-normal">
            &copy; {new Date().getFullYear()} Waakye Plug. Built in Ghana.
          </p>
          <div className="flex gap-6">
            <a
              href={sitePath('terms')}
              className="text-white text-sm opacity-60 hover:opacity-90 transition-opacity font-normal"
            >
              Terms
            </a>
            <a
              href={sitePath('privacy')}
              className="text-white text-sm opacity-60 hover:opacity-90 transition-opacity font-normal"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ===================== APP =====================
export default function App() {
  useReveal()
  return (
    <div style={{ fontFamily: 'Outfit, sans-serif' }}>
      <Nav />
      <Hero />
      <Marquee />
      <MenuCards />
      <HowItWorks />
      <LiveTracking />
      <TrustSection />
      <JoinNetwork />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  )
}
