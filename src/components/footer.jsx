import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const NAV_LINKS = [
  { label: "Our Menu",     href: "#" },
  { label: "The Story",    href: "#" },
  { label: "The Vibe",     href: "#" },
  { label: "Find Us",      href: "#" },
  { label: "Reserve",      href: "#" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Zomato",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 10h8M8 14h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="12" cy="8" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
];

/* ─── Animated signature ─── */
function FooterSignature({ inView }) {
  return (
    <svg viewBox="0 0 220 52" className="w-44 overflow-visible" fill="none">
      {/* S */}
      <path d="M 10 32 C 8 24, 12 14, 20 13 C 28 12, 33 18, 29 24 C 25 30, 15 31, 14 37 C 13 43, 20 47, 29 44"
        stroke="#E67E22" strokeWidth="1.4" strokeLinecap="round"
        style={{
          strokeDasharray: 90, strokeDashoffset: inView ? 0 : 90,
          transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}
      />
      {/* ultana */}
      <path d="M 34 24 C 34 24, 32 36, 35 39 C 38 42, 41 37, 43 33 C 45 29, 45 39, 48 40 C 51 41, 54 34, 55 29 L 55 43"
        stroke="#E67E22" strokeWidth="1.3" strokeLinecap="round"
        style={{
          strokeDasharray: 90, strokeDashoffset: inView ? 0 : 90,
          transition: "stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1) 0.55s",
        }}
      />
      <path d="M 59 43 L 59 27 C 59 27, 61 22, 67 24 C 73 26, 73 34, 73 43"
        stroke="#E67E22" strokeWidth="1.3" strokeLinecap="round"
        style={{
          strokeDasharray: 60, strokeDashoffset: inView ? 0 : 60,
          transition: "stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1) 0.75s",
        }}
      />
      <path d="M 82 32 C 78 27, 71 28, 71 34 C 71 41, 78 43, 83 39 L 83 43"
        stroke="#E67E22" strokeWidth="1.3" strokeLinecap="round"
        style={{
          strokeDasharray: 55, strokeDashoffset: inView ? 0 : 55,
          transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1) 0.92s",
        }}
      />
      {/* Underline flourish */}
      <path d="M 10 48 C 35 52, 65 52, 83 49"
        stroke="rgba(230,126,34,0.3)" strokeWidth="0.9" strokeLinecap="round"
        style={{
          strokeDasharray: 80, strokeDashoffset: inView ? 0 : 80,
          transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1) 1.1s",
        }}
      />
      {/* B */}
      <path d="M 96 14 L 96 43 M 96 14 C 107 13, 113 19, 110 24 C 107 29, 96 29, 96 29 C 109 29, 116 35, 112 40 C 108 45, 96 44, 96 44"
        stroke="#E67E22" strokeWidth="1.4" strokeLinecap="round"
        style={{
          strokeDasharray: 110, strokeDashoffset: inView ? 0 : 110,
          transition: "stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1) 1.25s",
        }}
      />
      {/* egum */}
      <path d="M 128 34 C 128 29, 122 27, 119 31 C 116 36, 118 42, 126 42 C 132 42, 134 37, 132 33"
        stroke="#E67E22" strokeWidth="1.3" strokeLinecap="round"
        style={{
          strokeDasharray: 58, strokeDashoffset: inView ? 0 : 58,
          transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1) 1.48s",
        }}
      />
      <path d="M 140 29 L 140 40 C 140 45, 138 48, 132 46"
        stroke="#E67E22" strokeWidth="1.3" strokeLinecap="round"
        style={{
          strokeDasharray: 30, strokeDashoffset: inView ? 0 : 30,
          transition: "stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1) 1.65s",
        }}
      />
      <path d="M 147 43 L 147 29 C 147 25, 151 24, 156 26 C 161 28, 161 36, 161 43 M 161 34 C 161 25, 165 24, 170 26 C 174 28, 174 36, 174 43"
        stroke="#E67E22" strokeWidth="1.3" strokeLinecap="round"
        style={{
          strokeDasharray: 85, strokeDashoffset: inView ? 0 : 85,
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 1.8s",
        }}
      />
      {/* Underline flourish Begum */}
      <path d="M 94 49 C 120 53, 155 53, 178 49"
        stroke="rgba(230,126,34,0.3)" strokeWidth="0.9" strokeLinecap="round"
        style={{
          strokeDasharray: 90, strokeDashoffset: inView ? 0 : 90,
          transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1) 2.05s",
        }}
      />
      {/* Final ink dot */}
      <circle cx="184" cy="48" r="1.8" fill="#E67E22"
        style={{ opacity: inView ? 0.7 : 0, transition: "opacity 0.3s ease 2.35s" }}
      />
    </svg>
  );
}

/* ─── Newsletter input ─── */
function NewsletterInput() {
  const [val, setVal] = useState("");
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    if (val.includes("@")) { setSent(true); }
  };

  return sent ? (
    <div className="flex items-center gap-3 py-3">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-[rgba(245,236,215,0.5)] text-[11px] tracking-[0.12em] font-sans">
        You're on the list. See you at 4 PM.
      </span>
    </div>
  ) : (
    <div
      className="flex items-stretch border transition-colors duration-300"
      style={{ borderColor: focused ? "rgba(230,126,34,0.4)" : "rgba(245,236,215,0.1)" }}
    >
      <input
        type="email"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSubmit()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="your@email.com"
        className="flex-1 bg-transparent px-4 py-3 text-[12px] font-sans tracking-[0.08em]
                   text-[rgba(245,236,215,0.7)] placeholder-[rgba(245,236,215,0.2)] outline-none"
      />
      <button
        onClick={handleSubmit}
        className="px-5 py-3 text-[10px] tracking-[0.2em] uppercase font-sans font-semibold
                   transition-all duration-300"
        style={{
          background: val.includes("@") ? "#E67E22" : "rgba(230,126,34,0.12)",
          color: val.includes("@") ? "#0C1A10" : "rgba(245,236,215,0.3)",
        }}
      >
        Join
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN FOOTER
══════════════════════════════════════ */
export default function SultanasFooter() {
  const [footerRef, inView] = useInView(0.08);

  const reveal = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <footer ref={footerRef} className="relative bg-[#080F0A] overflow-hidden">

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-60 z-[1]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")` }}
      />

      {/* Top saffron glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[200px] z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(230,126,34,0.07) 0%, transparent 65%)" }} />

      {/* Geo lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2]" preserveAspectRatio="xMidYMid slice">
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={`${-20+i*30}%`} y1="0%" x2={`${20+i*30}%`} y2="100%"
            stroke="rgba(230,126,34,0.025)" strokeWidth="1" />
        ))}
      </svg>

      {/* ── Top accent bar ── */}
      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(230,126,34,0.35) 30%, rgba(230,126,34,0.5) 50%, rgba(230,126,34,0.35) 70%, transparent 100%)",
          opacity: inView ? 1 : 0,
          transition: "opacity 1s ease 0.1s",
        }}
      />

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 pt-16 md:pt-24 pb-10">

        {/* ── TOP SECTION ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-[rgba(245,236,215,0.06)]">

          {/* Brand column */}
          <div className="md:col-span-4" style={reveal(0.1)}>

            {/* Logo mark */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full border border-[rgba(230,126,34,0.4)] flex items-center justify-center shrink-0">
                <div className="w-8 h-8 rounded-full border border-[rgba(230,126,34,0.25)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#E67E22]" />
                </div>
              </div>
              <div>
                <p className="text-[#F5ECD7] text-[15px] tracking-[0.2em] uppercase font-serif font-normal">
                  Sultana's
                </p>
                <p className="text-[rgba(245,236,215,0.35)] text-[9px] tracking-[0.22em] uppercase font-sans">
                  Heritage Kitchen
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-[rgba(245,236,215,0.45)] font-serif italic text-[15px] leading-[1.75] mb-8"
              style={{ maxWidth: "280px" }}>
              A quiet corner in the heart of the chaos.
            </p>

            {/* Signature */}
            <div className="mb-2">
              <FooterSignature inView={inView} />
            </div>
            <p className="text-[rgba(245,236,215,0.2)] text-[10px] tracking-[0.2em] uppercase font-sans">
              Founder & Head of Kitchen
            </p>
          </div>

          {/* Nav column */}
          <div className="md:col-span-2 md:col-start-6" style={reveal(0.22)}>
            <p className="text-[#E67E22] text-[9px] tracking-[0.35em] uppercase font-sans mb-6">
              Navigate
            </p>
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[rgba(245,236,215,0.45)] font-sans text-[13px] tracking-[0.06em]
                               transition-colors duration-300 hover:text-[#E67E22] flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#E67E22] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours quick-ref column */}
          <div className="md:col-span-2" style={reveal(0.32)}>
            <p className="text-[#E67E22] text-[9px] tracking-[0.35em] uppercase font-sans mb-6">
              Hours
            </p>
            <div className="flex flex-col gap-3">
              {[
                { days: "Mon – Thu", time: "7 AM – 9 PM" },
                { days: "Fri – Sat",  time: "7 AM – 10 PM" },
                { days: "Sunday",     time: "8 AM – 8 PM" },
              ].map(r => (
                <div key={r.days} className="flex items-baseline justify-between gap-4">
                  <span className="text-[rgba(245,236,215,0.35)] text-[11px] font-sans tracking-[0.04em] shrink-0">
                    {r.days}
                  </span>
                  <span className="flex-1 border-b border-dashed border-[rgba(245,236,215,0.07)] mb-[3px]" />
                  <span className="text-[rgba(245,236,215,0.6)] font-serif text-[12px] shrink-0">
                    {r.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-[#E67E22] mt-1.5 shrink-0" />
              <p className="text-[rgba(245,236,215,0.22)] text-[10px] font-sans leading-relaxed tracking-[0.04em]">
                Famous 4 PM Samosas sell out. Come early.
              </p>
            </div>
          </div>

          {/* Newsletter column */}
          <div className="md:col-span-3 md:col-start-10" style={reveal(0.42)}>
            <p className="text-[#E67E22] text-[9px] tracking-[0.35em] uppercase font-sans mb-2">
              Stay in the loop
            </p>
            <p className="text-[rgba(245,236,215,0.35)] font-sans text-[12px] leading-relaxed tracking-[0.04em] mb-5">
              Specials, new items, and the occasional reminder that the samosas are ready.
            </p>
            <NewsletterInput />

            {/* Social icons */}
            <div className="flex items-center gap-5 mt-8">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="text-[rgba(245,236,215,0.3)] transition-all duration-300 hover:text-[#E67E22]
                             hover:-translate-y-0.5"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={reveal(0.55)}>

          {/* Left — address */}
          <div className="flex items-center gap-2">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="rgba(230,126,34,0.55)" />
            </svg>
            <span className="text-[rgba(245,236,215,0.25)] text-[10px] font-sans tracking-[0.12em]">
              #42, Meenakshi Koil St · Shivajinagar · Bengaluru 560051
            </span>
          </div>

          {/* Center — ornament + copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[rgba(230,126,34,0.2)]" />
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="rgba(230,126,34,0.35)" />
            </svg>
            <span className="text-[rgba(245,236,215,0.18)] text-[10px] font-sans tracking-[0.15em]">
              © {new Date().getFullYear()} Sultana's Heritage Kitchen
            </span>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="rgba(230,126,34,0.35)" />
            </svg>
            <div className="w-8 h-px bg-[rgba(230,126,34,0.2)]" />
          </div>

          {/* Right — Urdu sign-off */}
          <div className="flex items-center gap-2">
            <span className="text-[rgba(245,236,215,0.18)] text-[10px] font-sans tracking-[0.12em]">
              Made with love in Bengaluru
            </span>
            <span className="text-[rgba(230,126,34,0.4)] font-serif text-[14px]">محبت</span>
          </div>
        </div>
      </div>
    </footer>
  );
}