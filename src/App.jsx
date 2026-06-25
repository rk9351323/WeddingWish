import { useState, useEffect, useRef } from 'react'

const asset = (path) => `${import.meta.env.BASE_URL}images/${path}`

/* ========== Intersection Observer Hook ========== */
function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.15, ...options })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}

/* ========== Floating Marigold Petals ========== */
function FloatingPetals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 6,
    size: 10 + Math.random() * 16,
    rotation: Math.random() * 360,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute opacity-40"
          style={{
            left: `${p.left}%`,
            top: '-30px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `petal-fall ${p.duration}s ${p.delay}s linear infinite`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 2 8 8 8 12C8 16 12 22 12 22C12 22 16 16 16 12C16 8 12 2 12 2Z"
              fill="#f5a623"
              opacity="0.7"
            />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes petal-fall {
          0% { transform: translateY(-30px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.3; }
          100% { transform: translateY(100vh) rotate(720deg) translateX(50px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

/* ========== Ornamental Divider ========== */
function OrnamentDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
      <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="relative">
        <span className="text-2xl sm:text-3xl text-gold animate-rotate-slow inline-block">✦</span>
      </div>
      <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}

/* ========== Navigation ========== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-maroon-dark/95 backdrop-blur-md shadow-lg shadow-maroon/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <span className="font-display text-2xl sm:text-3xl text-gold-light tracking-wide">
          S & M
        </span>
        
        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8 font-body text-sm tracking-widest uppercase text-cream/80">
          <a href="#home" className="hover:text-gold transition-colors duration-300">Home</a>
          <a href="#letter" className="hover:text-gold transition-colors duration-300">Letter</a>
          <a href="#gallery" className="hover:text-gold transition-colors duration-300">Gallery</a>
          <a href="#blessings" className="hover:text-gold transition-colors duration-300">Blessings</a>
        </div>
        <div className="text-gold text-sm font-serif italic hidden sm:block">
          26 June 2026
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden flex flex-col gap-1.5 justify-center items-center w-8 h-8 relative focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-maroon-dark/95 backdrop-blur-md border-t border-gold/20">
          <div className="flex flex-col gap-4 p-4 font-body text-sm tracking-widest uppercase text-cream/80">
            <a href="#home" onClick={handleNavClick} className="hover:text-gold transition-colors duration-300 py-2">Home</a>
            <a href="#letter" onClick={handleNavClick} className="hover:text-gold transition-colors duration-300 py-2">Letter</a>
            <a href="#gallery" onClick={handleNavClick} className="hover:text-gold transition-colors duration-300 py-2">Gallery</a>
            <a href="#blessings" onClick={handleNavClick} className="hover:text-gold transition-colors duration-300 py-2">Blessings</a>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ========== Hero Section ========== */
function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={asset('wedding_decor.jpg')}
          alt="Wedding decoration"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 text-5xl sm:text-7xl opacity-20 text-gold animate-float">✿</div>
      <div className="absolute top-40 right-16 text-4xl sm:text-6xl opacity-15 text-amber-300 animate-float-reverse delay-300">❀</div>
      <div className="absolute bottom-40 left-20 text-3xl sm:text-5xl opacity-15 text-gold-light animate-float delay-700">✿</div>
      <div className="absolute bottom-28 right-12 text-4xl opacity-20 text-amber-200 animate-float-reverse delay-500">❁</div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Small decorative text */}
        <p className={`font-body text-xs sm:text-sm tracking-[0.35em] uppercase text-amber-200/80 mb-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          ✦ &nbsp; A Celebration of Love &nbsp; ✦
        </p>

        {/* Bride & Groom Names */}
        <h1 className={`font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-tight transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Silki
        </h1>

        <div className={`flex items-center justify-center gap-4 my-2 sm:my-4 transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold" />
          <span className="font-serif text-xl sm:text-2xl text-gold italic">&</span>
          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <h1 className={`font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-tight transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Mukesh
        </h1>

        {/* Subtitle */}
        <p className={`font-serif text-lg sm:text-xl md:text-2xl text-amber-100/90 mt-6 sm:mt-8 italic transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          "Two souls, one journey — united in love forever"
        </p>

        {/* Wedding Date Badge */}
        <div className={`mt-8 sm:mt-12 inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-gold/40 bg-maroon/30 backdrop-blur-sm transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-gold text-lg">🪷</span>
          <span className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase text-cream/90">
            Wedding Celebration 26 june 2026
          </span>
          <span className="text-gold text-lg">🪷</span>
        </div>

        {/* Scroll indicator */}
        <div className={`mt-12 sm:mt-16 animate-gentle-bounce transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-6 h-10 rounded-full border-2 border-cream/40 mx-auto flex items-start justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-gold animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========== Welcome Banner ========== */
function WelcomeBanner() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} className="relative py-16 sm:py-24 bg-cream mandala-bg overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute top-8 left-8 text-4xl sm:text-6xl opacity-10 text-maroon animate-float">✿</div>
      <div className="absolute bottom-8 right-8 text-4xl sm:text-6xl opacity-10 text-gold animate-float-reverse">❁</div>

      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-amber-700 mb-4">
            ✦ Welcome to a Sacred Union ✦
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon mb-6 leading-snug">
            A New Chapter of
            <span className="gold-shimmer block mt-1 text-4xl sm:text-5xl md:text-6xl font-display">
              Eternal Love
            </span>
          </h2>
          <OrnamentDivider />
          <p className="font-serif text-lg sm:text-xl text-maroon-light/80 max-w-2xl mx-auto leading-relaxed italic mt-6">
            With blessings from both families and the divine grace above, we celebrate 
            the beautiful union of <strong className="text-maroon">Silki Kumari</strong> and{' '}
            <strong className="text-maroon">Mukesh Kumar</strong>. May their journey together 
            be filled with love, laughter, and everlasting happiness.
          </p>
        </div>

        {/* Bride Portrait */}
        <div className={`mt-12 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative inline-block">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold via-amber-400 to-maroon opacity-30 blur-lg animate-pulse-glow" />
            <img
              src={asset('bride_silki.jpg')}
              alt="Silki Kumari - The Beautiful Bride"
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover object-top border-4 border-gold/60 shadow-xl"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-maroon/90 px-5 py-1.5 rounded-full">
              <span className="font-display text-lg sm:text-xl text-gold-light">Silki</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========== Letter Section ========== */
function LetterSection() {
  const [ref, inView] = useInView()

  return (
    <section id="letter" ref={ref} className="relative py-16 sm:py-24 bg-gradient-to-b from-cream via-cream-dark to-cream paisley-pattern">
      <div className="max-w-3xl mx-auto px-4">
        <div className={`text-center mb-10 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-amber-700 mb-3">
            ✦ From the Heart ✦
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon">
            A Brother's Love Letter
          </h2>
          <OrnamentDivider />
        </div>

        {/* Greeting Card */}
        <div className={`greeting-card rounded-2xl p-8 sm:p-12 md:p-16 shadow-2xl transition-all duration-1200 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-2xl text-gold/40">❧</div>
          <div className="absolute top-4 right-4 text-2xl text-gold/40 scale-x-[-1]">❧</div>
          <div className="absolute bottom-4 left-4 text-2xl text-gold/40 scale-y-[-1]">❧</div>
          <div className="absolute bottom-4 right-4 text-2xl text-gold/40 scale-[-1]">❧</div>

          {/* Letter Header */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="font-display text-4xl sm:text-5xl text-maroon">Dear Didi</span>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-10 bg-gold/50" />
              <span className="text-gold text-sm">🪷</span>
              <div className="h-px w-10 bg-gold/50" />
            </div>
          </div>

          {/* Letter Body */}
          <div className="font-serif text-base sm:text-lg md:text-xl text-maroon-dark/85 leading-relaxed sm:leading-loose space-y-5 sm:space-y-6 italic">
            <p className="first-letter:text-5xl first-letter:font-heading first-letter:text-maroon first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
              As I sit here writing this, my heart is full of emotions that words can barely hold. 
              You've been more than a sister to me — you've been my first friend, my protector, 
              my guide, and the one person who always believed in me.
            </p>

            <p>
              From those childhood fights over the TV remote to sharing secrets late at night, 
              from your scolding that always came wrapped in love to the way you saved the 
              best piece of everything for me — every memory with you is a treasure I hold close.
            </p>

            <p>
              Today, as you begin this beautiful new chapter with Mukesh bhaiya, 
              I want you to know that you are carrying a piece of my heart with you. 
              The house will feel emptier, the dinner table a little quieter, and 
              the laughter a bit softer — but I know you're stepping into a world 
              of love and happiness that you truly deserve.
            </p>

            <p>
              May your life together be as radiant as the vermillion on your forehead, 
              as pure as the sacred vows you take, and as beautiful as the smile 
              that has lit up our home for all these years.
            </p>

            <p className="text-maroon font-medium not-italic">
              I promise to always be just a phone call away. No matter where life takes us, 
              you will forever be my <span className="font-display text-2xl text-maroon">Silki Didi</span> — 
              my pride, my joy, my first hero.
            </p>
          </div>

          {/* Letter Footer */}
          <div className="mt-8 sm:mt-10 text-right">
            <div className="inline-block text-right">
              <p className="font-body text-sm text-amber-700 tracking-wider uppercase mb-1">
                With all my love & prayers,
              </p>
              <p className="font-display text-3xl sm:text-4xl text-maroon">
                Your Younger Brother
              </p>
              <p className="font-serif text-sm text-gold-dark italic mt-1">
                — Forever grateful for you ♥
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements below card */}
        <div className="text-center mt-8">
          <span className="text-4xl opacity-30">🪷</span>
        </div>
      </div>
    </section>
  )
}

/* ========== Gallery Section ========== */
function GallerySection() {
  const [ref, inView] = useInView()

  const photos = [
    {
      src: asset('bride_silki.jpg'),
      caption: 'The Beautiful Bride',
      rotation: '-rotate-2',
    },
    {
      src: asset('wedding_decor.jpg'),
      caption: 'Wedding Celebrations',
      rotation: 'rotate-1',
    },
    {
      src: asset('haldi_ceremony.png'),
      caption: 'Haldi Ceremony',
      rotation: '-rotate-1',
    },
    {
      src: asset('pooja_matkor.jpg'),
      caption: 'Pooja Matkor',
      rotation: 'rotate-2',
    },
    {
      src: asset('mehndi_hands.png'),
      caption: 'Mehndi Magic',
      rotation: 'rotate-1',
    },
    {
      src: asset('wedding_mandap.png'),
      caption: 'Sacred Mandap',
      rotation: '-rotate-2',
    },
    {
      src: asset('wedding_ceremony.png'),
      caption: 'Wedding Rituals',
      rotation: 'rotate-1',
    },
  ]

  return (
    <section id="gallery" ref={ref} className="relative py-16 sm:py-24 bg-gradient-to-b from-cream to-cream-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 mandala-bg opacity-50" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-amber-700 mb-3">
            ✦ Cherished Moments ✦
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon">
            Beautiful Memories
          </h2>
          <OrnamentDivider />
          <p className="font-serif text-base sm:text-lg text-maroon-light/70 italic mt-4 max-w-lg mx-auto">
            A glimpse into the beautiful journey that led to this sacred day
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`polaroid ${photo.rotation} cursor-pointer group`}>
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Caption */}
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <p className="font-display text-xl sm:text-2xl text-maroon-light group-hover:text-maroon transition-colors duration-300">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ========== Blessings / Footer Section ========== */
function BlessingsFooter() {
  const [ref, inView] = useInView()

  return (
    <footer id="blessings" ref={ref} className="relative bg-dark overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-maroon via-gold to-maroon" />
      
      {/* Border image */}
      <div className="w-full h-16 sm:h-24 overflow-hidden opacity-30">
        <img
          src={asset('wedding_border.png')}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative py-16 sm:py-24 px-4">
        {/* Floating decorative elements */}
        <div className="absolute top-16 left-8 text-4xl opacity-10 text-gold animate-float">✦</div>
        <div className="absolute bottom-20 right-12 text-5xl opacity-10 text-gold animate-float-reverse">❁</div>

        <div className="max-w-3xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-5xl sm:text-6xl block mb-6 animate-gentle-bounce">🙏</span>
            
            <p className="font-body text-xs tracking-[0.3em] uppercase text-amber-500/70 mb-4">
              ✦ Final Blessing ✦
            </p>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-cream mb-6">
              A Heartwarming Blessing
            </h2>

            <OrnamentDivider className="my-6" />

            <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-amber-100/80 leading-relaxed italic max-w-2xl mx-auto">
              "May the sacred fire that witnessed your vows light your path forever. 
              May Lord Ganesha remove every obstacle, and may your love bloom like 
              the marigolds of a thousand spring mornings. 
              <br /><br />
              May you find in each other a home, a haven, and a forever friend. 
              May your laughter echo through the years, and may your bond grow 
              stronger with every passing season."
            </blockquote>

            <div className={`mt-10 transition-all duration-1000 delay-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              <p className="font-display text-3xl sm:text-4xl gold-shimmer mb-2">
                Silki & Mukesh
              </p>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-cream/50">
                Together Forever • 2026
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={`mt-16 sm:mt-20 pt-8 border-t border-cream/10 text-center transition-all duration-1000 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-serif text-sm text-cream/30 italic">
            Made with ♥ by her loving younger brother
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-px w-8 bg-gold/20" />
            <span className="text-gold/30 text-xs">🪷</span>
            <span className="h-px w-8 bg-gold/20" />
          </div>
          <p className="font-body text-xs text-cream/20 mt-3 tracking-wider">
            © 2026 — A Wedding Wish for Silki Didi
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ========== Main App ========== */
export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <FloatingPetals />
      <Navbar />
      <HeroSection />
      <WelcomeBanner />
      <LetterSection />
      <GallerySection />
      <BlessingsFooter />
    </div>
  )
}
