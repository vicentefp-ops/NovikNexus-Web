import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Mic, 
  Sparkles, 
  PieChart, 
  Scan, 
  ArrowRight, 
  Globe, 
  Activity, 
  Layers, 
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Network,
  ChevronRight
} from 'lucide-react';

// --- Global Noise Texture ---
const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  ></div>
);

const SVGFilters = () => (
  <svg width="0" height="0" className="absolute hidden">
    <defs>
      <filter id="logo-light">
        <feColorMatrix type="matrix" values="
          -0.7203 -0.2797  0  0  1
          -1.7203  0.7203  0  0  1
          -1.6866  0.6866  0  0  1
           0       0       0  1  0
        " />
      </filter>
    </defs>
  </svg>
);

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/34690957910"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
    aria-label="Contact us on WhatsApp"
  >
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
);

// --- Components ---

const Logo = ({ light = false, dark = false, className = "h-14" }: { light?: boolean, dark?: boolean, className?: string }) => (
  <div className="flex flex-col items-center justify-center select-none z-50 relative">
    <img 
      src="/NNLogo3.png" 
      alt="Novik Nexus" 
      className={`${className} w-auto object-contain transition-all duration-300 ${light ? 'mix-blend-screen' : ''} ${dark ? 'mix-blend-multiply' : ''}`}
      style={{ filter: light ? 'url(#logo-light)' : 'none' }}
    />
  </div>
);

const RevealText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const WordReveal = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: delay + (i * 0.03), ease: [0.16, 1, 0.3, 1] }}
          className="mr-[0.25em] mt-[0.1em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-[#901A1E] rounded-full blur-[1px]"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{ 
          y: [0, -100, -200],
          x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
          opacity: [0, 0.8, 0],
          scale: [0, 1.5, 0]
        }}
        transition={{ 
          duration: 5 + Math.random() * 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: Math.random() * 5
        }}
      />
    ))}
  </div>
);

const EcosystemOrbit = () => {
  return (
    <div className="relative w-full h-[700px] flex items-center justify-center">
      {/* Central Glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-64 h-64 bg-[#901A1E]/20 rounded-full blur-3xl"
      />
      
      {/* Central Element (Immobile) */}
      <div className="relative z-50 w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border border-black/5 p-4">
        <Logo dark />
      </div>

      {/* Orbiting Logos */}
      {[
        { src: '/logo.png', class: 'h-20', radius: 200, duration: 25, startAngle: 0 },
        { src: '/Logo Texto.png', class: 'h-14', radius: 280, duration: 35, startAngle: 72 },
        { src: '/Logo Chromic.png', class: 'h-28', radius: 240, duration: 30, startAngle: 144 },
        { src: '/DentWiseLogo1.png', class: 'h-28', radius: 320, duration: 40, startAngle: 216 },
        { src: '/ImplantikLogo1.png', class: 'h-28', radius: 260, duration: 28, startAngle: 288 },
      ].map((logo, i) => (
        <motion.div
          key={i}
          initial={{ rotate: logo.startAngle }}
          animate={{ rotate: logo.startAngle + 360 }}
          transition={{ duration: logo.duration, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div 
            style={{ y: -logo.radius }}
            initial={{ rotate: -logo.startAngle }}
            animate={{ rotate: -(logo.startAngle + 360) }}
            transition={{ duration: logo.duration, repeat: Infinity, ease: "linear" }}
            className="absolute w-44 h-44 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-black/10 flex items-center justify-center p-6"
          >
            <img src={logo.src} alt="App Logo" className={`${logo.class} w-auto object-contain`} />
          </motion.div>
        </motion.div>
      ))}
      
      {/* Decorative rings */}
      <div className="absolute w-[360px] h-[360px] rounded-full border border-black/5" />
      <div className="absolute w-[460px] h-[460px] rounded-full border border-black/5" />
      <div className="absolute w-[580px] h-[580px] rounded-full border border-black/5 border-dashed opacity-50" />
    </div>
  );
};

// Spotlight Card for Ecosystem
const SpotlightCard = ({ children, className = "", isLive = false }: { children: React.ReactNode, className?: string, isLive?: boolean }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      whileHover={isLive ? { scale: 1.02, y: -8 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-10 transition-shadow duration-500 ${className} ${isLive ? 'hover:shadow-2xl hover:shadow-[#901A1E]/15 cursor-pointer' : 'opacity-90'}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-20"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(144,26,30,0.08), transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

// --- Data ---

const products = [
  {
    name: 'Novik',
    url: 'https://novik.ai',
    status: 'live',
    icon: '/logo.png',
    logoClass: 'h-14',
    tagline: 'AI-powered clinical decision support',
    description: 'Novik converts complex patient data into structured, evidence-based recommendations that enhance diagnostic accuracy and treatment planning.\n\nDesigned to support clinicians in high-stakes decisions, reduce variability, and bring consistency to everyday practice at scale.',
    colSpan: 'md:col-span-2 lg:col-span-2',
    image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'PerioVox',
    url: 'https://periovox.ai',
    status: 'live',
    icon: '/Logo Texto.png',
    logoClass: 'h-14',
    tagline: 'Voice-driven periodontal charting',
    description: 'Transforms spoken input into structured periodontal data and generates clinical reports, improving efficiency.',
    colSpan: 'md:col-span-1 lg:col-span-1',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chromic',
    url: 'https://chromic.ai',
    status: 'live',
    icon: '/Logo Chromic.png',
    logoClass: 'h-28',
    tagline: 'AI-based whitening monitoring',
    description: 'Uses calibrated image analysis to objectively track tooth color evolution and treatment outcomes over time.',
    colSpan: 'md:col-span-1 lg:col-span-1',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dentwise',
    url: '#',
    status: 'soon',
    icon: '/DentWiseLogo1.png',
    logoClass: 'h-28',
    tagline: 'Financial comparison platform',
    description: 'Allows clinics to compare financing options and optimize patient payment plans based on key variables.',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    name: 'Implantik',
    url: '#',
    status: 'soon',
    icon: '/ImplantikLogo1.png',
    logoClass: 'h-28',
    tagline: 'AI-powered implant identification',
    description: 'Analyzes radiographic images to identify implant brands and models, facilitating faster clinical decisions.',
    colSpan: 'md:col-span-1 lg:col-span-1',
  }
];

// --- Main App ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax refs
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const stickyRef = useRef(null);
  const philosophyRef = useRef(null);

  // Hero Parallax
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);

  // Positioning Cards Parallax (Fixed Overlap)
  const { scrollYProgress: stickyProgress } = useScroll({ target: stickyRef, offset: ["start end", "end start"] });
  const card1Y = useTransform(stickyProgress, [0, 1], ["10%", "-10%"]);
  const card2Y = useTransform(stickyProgress, [0, 1], ["20%", "-20%"]);

  // Philosophy Parallax
  const { scrollYProgress: philProgress } = useScroll({ target: philosophyRef, offset: ["start end", "end start"] });
  const philBgY = useTransform(philProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-[#901A1E] selection:text-white overflow-x-hidden">
      <NoiseOverlay />
      <SVGFilters />
      <FloatingWhatsApp />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo light={scrolled || !scrolled} className="h-28" /> {/* Force light logo on dark hero */}
          <div className="hidden md:flex items-center space-x-10 text-xs font-semibold tracking-widest uppercase text-white/70">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</a>
            <a href="#vision" className="hover:text-white transition-colors">Vision</a>
            <a href="#contact" className="text-[#901A1E] hover:text-[#D92A32] transition-colors">Partner with us</a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION (Dark & Dynamic) */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-black">
        {/* Animated Orbs Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full h-full relative">
            <FloatingParticles />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex justify-start">
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left lg:pr-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 inline-flex items-center space-x-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#901A1E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#901A1E]"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-white/80">Used by professionals in 25+ countries</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl lg:text-[85px] font-bold tracking-tighter text-white leading-[1] pb-6">
              Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#901A1E] to-[#D92A32]">AI infrastructure</span> <br className="hidden md:block"/>
              for modern dentistry.
            </h1>
            
            <RevealText delay={0.2}>
              <p className="mt-6 text-xl md:text-2xl text-white/60 max-w-xl font-medium leading-tight">
                A unified ecosystem of intelligent applications designed to enhance clinical decision-making, streamline workflows, and improve patient outcomes.
              </p>
            </RevealText>
            
            <RevealText delay={0.4}>
              <div className="mt-12">
                <a href="#ecosystem" className="group relative inline-flex items-center justify-center px-10 py-5 text-base font-semibold text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center">
                    Explore the ecosystem <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </RevealText>
          </div>
        </div>

        {/* Hero Image (Right Side - Stuck to Margin) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute right-0 top-0 bottom-0 h-full w-1/2 hidden lg:block group"
        >
          <img 
            src="/pexels-cottonbro-8090293.jpg" 
            alt="Modern Dentistry AI" 
            className="w-full h-full object-cover object-[70%_center] transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </section>

      {/* 2. ABOUT / COMPANY */}
      <section id="about" ref={aboutRef} className="py-40 bg-[#F5F5F7] relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Text Content */}
            <div className="space-y-12 relative z-20">
              <WordReveal 
                text="Novik Nexus is a digital health technology company focused on building practical, AI-driven solutions for dentistry." 
                className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-black"
              />
              
              <RevealText delay={0.2}>
                <p className="text-xl text-black/60 font-medium leading-relaxed">
                  We develop a portfolio of specialized applications, each designed to solve a specific clinical or operational challenge. Together, they form a connected ecosystem that enhances efficiency, reduces friction, and enables better decisions in everyday practice.
                </p>
              </RevealText>

              <RevealText delay={0.3}>
                <div className="p-10 bg-white rounded-3xl border border-black/5 shadow-xl shadow-black/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#901A1E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-2xl font-bold mb-4 text-black relative z-10">Our approach is simple:</h3>
                  <p className="text-xl text-[#901A1E] font-semibold mb-6 relative z-10">Build tools that professionals actually use.</p>
                  <p className="text-lg text-black/60 font-medium relative z-10">
                    No unnecessary complexity. No experimental features without purpose. Only focused, high-impact solutions designed for real clinical environments.
                  </p>
                </div>
              </RevealText>
            </div>

            {/* Ecosystem Orbit Animation (Right Side) */}
            <div className="relative h-[700px] w-full hidden lg:flex items-center justify-center">
              <EcosystemOrbit />
            </div>

          </div>
        </div>
      </section>

      {/* 3. POSITIONING (Fixed Overlap - Staggered Flex Layout) */}
      <section ref={stickyRef} className="py-40 bg-[#0A0A0A] text-white relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[conic-gradient(from_90deg_at_50%_50%,#0A0A0A_0%,#901A1E_50%,#0A0A0A_100%)] blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Sticky Text Side */}
            <div className="space-y-12 lg:sticky lg:top-40">
              <RevealText>
                <span className="text-[#901A1E] font-bold tracking-widest uppercase text-sm">The Ecosystem</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 leading-[1.1]">
                  An integrated ecosystem, not isolated tools.
                </h2>
              </RevealText>
              <RevealText delay={0.1}>
                <p className="text-2xl text-white/60 font-medium leading-relaxed">
                  Each product within Novik Nexus addresses a critical point in the dental workflow — from diagnosis and documentation to patient communication and financial planning.
                </p>
              </RevealText>
            </div>
            
            {/* Cards Side (Flex Column, Offset, Parallax - NO OVERLAP) */}
            <div className="flex flex-col gap-12 pt-10 lg:pt-0">
              <motion.div style={{ y: card1Y }} className="w-[90%] self-start bg-white/5 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Individually, they solve problems.</h3>
                <p className="text-xl text-white/60 relative z-10">Targeted AI applications for specific clinical needs, designed to integrate seamlessly into existing workflows.</p>
              </motion.div>
              
              <motion.div style={{ y: card2Y }} className="w-[90%] self-end bg-gradient-to-br from-[#901A1E] to-[#5a1013] p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-[#901A1E]/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Together, they create leverage.</h3>
                <p className="text-xl text-white/90 relative z-10">By connecting these solutions, Novik Nexus is building a scalable, data-driven infrastructure for the future of dentistry.</p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCT ECOSYSTEM (Spotlight Cards) */}
      <section id="ecosystem" className="py-40 bg-[#F5F5F7] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <RevealText>
            <div className="mb-24">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">The Portfolio</h2>
              <p className="text-2xl text-black/50 font-medium max-w-3xl">Specialized applications forming a unified intelligence layer.</p>
            </div>
          </RevealText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const isLive = product.status === 'live';
              const CardWrapper = isLive ? 'a' : 'div';
              
              return (
                <motion.div 
                  key={product.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={product.colSpan}
                >
                  <CardWrapper 
                    href={isLive ? product.url : undefined}
                    target={isLive ? "_blank" : undefined}
                    rel={isLive ? "noopener noreferrer" : undefined}
                    className="block h-full"
                  >
                    <SpotlightCard isLive={isLive} className="h-full flex flex-col group">
                      {/* Background Image Reveal */}
                      {product.image && (
                        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale" />
                        </div>
                      )}

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-10">
                          <div className={`${product.logoClass || 'h-14'} max-w-[250px] flex items-center justify-start transition-all duration-500 origin-left
                            ${isLive ? 'group-hover:scale-110' : 'opacity-50 grayscale'}`}>
                            <img src={product.icon} alt={`${product.name} logo`} className="h-full w-auto object-contain" />
                          </div>
                          
                          {!isLive && (
                            <motion.span 
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              className="px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-500 text-xs font-bold tracking-widest uppercase"
                            >
                              Available soon
                            </motion.span>
                          )}
                          {isLive && (
                            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                              <ArrowUpRight className="w-5 h-5 text-[#901A1E]" />
                            </div>
                          )}
                        </div>

                        <h3 className={`text-3xl font-bold tracking-tight mb-3 ${!isLive && 'text-zinc-400'}`}>{product.name}</h3>
                        <p className={`text-lg font-semibold mb-6 ${isLive ? 'text-[#901A1E]' : 'text-zinc-400'}`}>{product.tagline}</p>
                        <p className="text-lg text-black/60 font-medium leading-relaxed flex-grow whitespace-pre-line">{product.description}</p>
                        
                        {isLive && (
                          <div className="mt-10 flex items-center text-sm font-bold tracking-widest uppercase text-black/40 group-hover:text-[#901A1E] transition-colors">
                            Visit {new URL(product.url).hostname}
                          </div>
                        )}
                      </div>
                    </SpotlightCard>
                  </CardWrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHY (Full Width Parallax Image) */}
      <section ref={philosophyRef} className="relative py-40 overflow-hidden bg-black text-white">
        <motion.div style={{ y: philBgY }} className="absolute inset-0 z-0 opacity-60">
          <img 
            src="/pexels-cottonbro-6502015.jpg" 
            alt="AI Support" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-20">
          <RevealText>
            <ShieldCheck className="w-20 h-20 text-[#901A1E] mx-auto mb-10" />
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10">
              AI that supports, <br/>not replaces.
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="text-2xl text-white/70 font-medium leading-relaxed max-w-3xl mx-auto mb-12">
              Artificial intelligence should enhance clinical judgment — not override it. Every product we build is designed to assist professionals, reduce cognitive load, and improve consistency, while keeping the clinician fully in control.
            </p>
            <p className="text-3xl font-bold text-white">
              Technology should be invisible when it works well.<br/>
              <span className="text-[#901A1E]">That is the standard we aim for.</span>
            </p>
          </RevealText>
        </div>
      </section>

      {/* 6. VISION & FUTURE (Bento Grid) */}
      <section id="vision" className="py-40 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Vision Block */}
            <RevealText className="h-full">
              <div className="bg-[#0A0A0A] text-white p-12 md:p-16 rounded-[3rem] h-full flex flex-col justify-between relative overflow-hidden group">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#901A1E]/30 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3"
                />
                <div className="relative z-10">
                  <span className="text-[#901A1E] font-bold tracking-widest uppercase text-sm mb-6 block">The Vision</span>
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">From tools to infrastructure.</h3>
                  <p className="text-xl text-white/70 font-medium leading-relaxed mb-8">
                    We believe the future of healthcare will not be defined by isolated applications, but by connected ecosystems capable of learning, adapting, and improving over time.
                  </p>
                  <p className="text-xl text-white/70 font-medium leading-relaxed">
                    Novik Nexus is designed to evolve into that infrastructure — where data, intelligence, and clinical workflows converge.
                  </p>
                </div>
              </div>
            </RevealText>

            {/* Future Block */}
            <div className="flex flex-col gap-6">
              <RevealText delay={0.2} className="flex-grow">
                <div className="bg-white p-12 md:p-16 rounded-[3rem] border border-black/5 h-full relative overflow-hidden group hover:border-[#901A1E]/20 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#901A1E]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-10 flex items-center relative z-10">
                    <Network className="w-10 h-10 text-[#901A1E] mr-5" />
                    Built to scale
                  </h3>
                  <ul className="space-y-8 relative z-10">
                    {[
                      "Expansion into new clinical verticals",
                      "Integration with existing dental and healthcare software systems",
                      "Development of data-driven insights across the ecosystem",
                      "Strategic partnerships with clinics, institutions, and industry leaders"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start group/item">
                        <div className="w-2 h-2 rounded-full bg-[#901A1E] mt-2.5 mr-5 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                        <span className="text-xl text-black/70 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealText>
            </div>

          </div>
        </div>
      </section>

      {/* 7. TRACTION */}
      <section id="traction" className="py-40 bg-black text-white border-t border-white/5 relative overflow-hidden">
        {/* Background Image with Filter */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/pexels-cottonbro-6502015.jpg" 
            alt="Global Adoption" 
            className="w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <RevealText>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1] text-white">
                Early global adoption.
              </h2>
              <p className="text-2xl text-white/70 font-medium leading-relaxed">
                Novik Nexus applications are already being used by professionals across more than 25 countries, reflecting strong early interest and international scalability.
              </p>
              <p className="mt-6 text-xl text-white/40 font-medium leading-relaxed">
                We are focused on growing this ecosystem responsibly, prioritizing real usage and continuous improvement over artificial growth metrics.
              </p>
            </RevealText>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <RevealText delay={0.2}>
                <div className="p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:shadow-2xl hover:shadow-[#901A1E]/20 transition-all duration-500 group">
                  <div className="text-7xl font-bold text-[#901A1E] mb-4 tracking-tighter group-hover:scale-110 origin-left transition-transform duration-500">25+</div>
                  <div className="text-xl font-bold text-white mb-2">Countries</div>
                  <div className="text-white/50 font-medium">Active professionals</div>
                </div>
              </RevealText>
              <RevealText delay={0.3}>
                <div className="p-12 bg-[#901A1E] text-white rounded-[2.5rem] shadow-xl shadow-black/20 hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                  <div className="text-7xl font-bold mb-4 tracking-tighter text-white relative z-10">5</div>
                  <div className="text-xl font-bold mb-2 relative z-10">Applications</div>
                  <div className="text-white/80 font-medium relative z-10">Unified ecosystem</div>
                </div>
              </RevealText>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLOSING & CONTACT */}
      <section id="contact" className="py-40 px-6 bg-[#901A1E] text-white relative overflow-hidden text-center">
        {/* Animated Abstract pattern */}
        <motion.div 
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)]" 
          style={{ backgroundSize: '40px 40px' }}
        />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealText>
            <h2 className="text-6xl md:text-8xl lg:text-[100px] font-bold tracking-tighter mb-12 leading-[0.9]">
              A new layer of intelligence <br className="hidden md:block"/>for clinical practice.
            </h2>
            
            <a 
              href="mailto:info@noviknexus.com"
              className="group inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-black bg-white rounded-full hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl shadow-black/20"
            >
              <Mail className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Partner with us
            </a>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-[#0A0A0A] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Logo light />
            <span className="text-sm font-medium text-white/40 md:border-l border-white/10 md:pl-8">
              © {new Date().getFullYear()} Novik Nexus. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex gap-6 text-white/50">
              <a href="https://wa.me/34690957910" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="mailto:info@noviknexus.com" className="hover:text-white transition-colors" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <div className="flex gap-8 text-sm font-bold tracking-widest uppercase text-white/40">
              <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms-of-use.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
