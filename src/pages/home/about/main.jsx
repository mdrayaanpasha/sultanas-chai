import { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/nav";
import SultanasFooter from "../../../components/footer";

/* ── useInView ── */
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

/* ── Animated SVG signature ── */
function Signature({ inView, scale = 1 }) {
  const s = (len, delay) => ({
    strokeDasharray: len,
    strokeDashoffset: inView ? 0 : len,
    transition: `stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });
  return (
    <svg viewBox="0 0 260 60" style={{ width: `${scale * 220}px` }} fill="none" className="overflow-visible">
      <path d="M10 38 C8 28,13 16,22 14 C31 12,38 20,33 28 C28 36,16 38,15 46 C14 52,22 56,33 52"
        stroke="#E67E22" strokeWidth="1.6" strokeLinecap="round" style={s(100,0.2)} />
      <path d="M40 28 C40 28,38 42,42 46 C46 50,50 44,52 38 C54 32,54 46,58 48 C62 50,65 40,67 33 L67 50"
        stroke="#E67E22" strokeWidth="1.4" strokeLinecap="round" style={s(95,0.5)} />
      <path d="M72 50 L72 30 C72 30,74 24,81 26 C88 28,88 38,88 50"
        stroke="#E67E22" strokeWidth="1.4" strokeLinecap="round" style={s(65,0.72)} />
      <path d="M98 36 C93 28,84 29,83 37 C82 46,91 51,99 46 L99 52"
        stroke="#E67E22" strokeWidth="1.4" strokeLinecap="round" style={s(62,0.9)} />
      <path d="M10 54 C35 58,65 58,99 55" stroke="rgba(230,126,34,0.3)" strokeWidth="0.9" strokeLinecap="round" style={s(95,1.08)} />
      <path d="M116 16 L116 50 M116 16 C128 15,135 22,131 28 C127 34,116 34,116 34 C130 34,138 41,133 47 C128 53,116 52,116 52"
        stroke="#E67E22" strokeWidth="1.6" strokeLinecap="round" style={s(125,1.22)} />
      <path d="M150 40 C150 34,143 31,139 36 C135 42,138 50,147 50 C154 50,156 44,154 40"
        stroke="#E67E22" strokeWidth="1.4" strokeLinecap="round" style={s(60,1.5)} />
      <path d="M162 34 L162 48 C162 54,159 56,152 53"
        stroke="#E67E22" strokeWidth="1.4" strokeLinecap="round" style={s(28,1.68)} />
      <path d="M170 50 L170 32 C170 28,174 27,180 29 C186 31,186 40,186 50 M186 40 C186 28,190 27,196 31 C200 34,200 42,200 50"
        stroke="#E67E22" strokeWidth="1.4" strokeLinecap="round" style={s(90,1.82)} />
      <path d="M114 56 C145 60,175 60,203 56"
        stroke="rgba(230,126,34,0.3)" strokeWidth="0.9" strokeLinecap="round" style={s(95,2.0)} />
      <circle cx="210" cy="54" r="2" fill="#E67E22" style={{ opacity: inView ? 0.7 : 0, transition: "opacity 0.3s ease 2.3s" }} />
    </svg>
  );
}

/* ── Founder photo placeholder ── */
function FounderPhoto({ initials, index, inView }) {
  const [hov, setHov] = useState(false);
  const patterns = [
    <svg key="a" viewBox="0 0 200 200" className="w-full h-full" fill="none">
      <rect width="200" height="200" fill="rgba(12,26,16,0.5)" />
      {[0,1,2,3].map(i => [0,1,2,3].map(j => (
        <path key={`${i}-${j}`}
          d={`M${25+i*50} ${25+j*50} L${50+i*50} ${j*50} L${25+i*50} ${-25+j*50} L${i*50} ${j*50} Z`}
          stroke="rgba(230,126,34,0.12)" strokeWidth="0.8" fill="rgba(230,126,34,0.04)" />
      )))}
      <circle cx="100" cy="100" r="55" stroke="rgba(230,126,34,0.15)" strokeWidth="1" fill="none" />
    </svg>,
    <svg key="b" viewBox="0 0 200 200" className="w-full h-full" fill="none">
      <rect width="200" height="200" fill="rgba(12,26,16,0.5)" />
      {Array.from({length:9},(_,i)=>(<line key={`h${i}`} x1="0" y1={i*25} x2="200" y2={i*25} stroke="rgba(230,126,34,0.07)" strokeWidth="0.7"/>))}
      {Array.from({length:9},(_,i)=>(<line key={`v${i}`} x1={i*25} y1="0" x2={i*25} y2="200" stroke="rgba(230,126,34,0.07)" strokeWidth="0.7"/>))}
      <circle cx="100" cy="100" r="60" stroke="rgba(230,126,34,0.2)" strokeWidth="1" fill="none"/>
    </svg>,
    <svg key="c" viewBox="0 0 200 200" className="w-full h-full" fill="none">
      <rect width="200" height="200" fill="rgba(12,26,16,0.5)" />
      {[30,50,70,90].map(r => (
        <circle key={r} cx="100" cy="100" r={r}
          stroke="rgba(230,126,34,0.1)" strokeWidth="0.8" fill="none"
          strokeDasharray={`${Math.PI*r*0.4} ${Math.PI*r*0.6}`} />
      ))}
    </svg>,
  ];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: "3/4",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.9s ease ${0.2 + index * 0.15}s, transform 0.9s ease ${0.2 + index * 0.15}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l z-10 transition-colors duration-300"
        style={{ borderColor: hov ? "rgba(230,126,34,0.5)" : "rgba(230,126,34,0.2)" }} />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r z-10 transition-colors duration-300"
        style={{ borderColor: hov ? "rgba(230,126,34,0.5)" : "rgba(230,126,34,0.2)" }} />
      <div className="absolute inset-0">{patterns[index % patterns.length]}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3" style={{ border: "1px solid rgba(230,126,34,0.3)", background: "rgba(12,26,16,0.7)", backdropFilter: "blur(4px)" }}>
          <span className="font-serif text-[#E67E22] text-2xl tracking-wide">{initials}</span>
        </div>
        <div className="w-8 h-px bg-[rgba(230,126,34,0.3)]" />
      </div>
    </div>
  );
}

/* ── Value card ── */
function ValueCard({ number, title, body, symbol, inView, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="relative border p-8 md:p-10 transition-colors duration-300 group"
      style={{
        borderColor: hov ? "rgba(230,126,34,0.22)" : "rgba(245,236,215,0.07)",
        background: hov ? "rgba(230,126,34,0.03)" : "transparent",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s, border-color 0.3s, background 0.3s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l transition-colors duration-300"
        style={{ borderColor: hov ? "rgba(230,126,34,0.4)" : "rgba(230,126,34,0.15)" }} />
      <div className="absolute top-4 right-5 font-serif leading-none select-none pointer-events-none"
        style={{ fontSize: "48px", color: "transparent", WebkitTextStroke: "1px rgba(230,126,34,0.07)", fontStyle: "italic", opacity: hov ? 1 : 0.6 }}
      >
        {symbol}
      </div>
      <span className="text-[rgba(230,126,34,0.35)] text-[10px] tracking-[0.35em] font-sans uppercase block mb-4">{number}</span>
      <h3 className="font-serif text-[#F5ECD7] text-xl md:text-2xl leading-tight mb-4">{title}</h3>
      <p className="text-[rgba(245,236,215,0.45)] font-sans font-light text-[13px] leading-[1.85] tracking-[0.04em]">{body}</p>
    </div>
  );
}

const VALUES = [
  { number: "01", title: "Nothing frozen, nothing premixed.", symbol: "تازہ", body: "Every samosa is folded the same morning it's sold. The chai masala is ground weekly. We have no freezers. This limits how much we can serve — we're fine with that." },
  { number: "02", title: "The suppliers have names.", symbol: "محلہ", body: "Our mutton comes from Rauf Mia at the Russell Market, who we've bought from since 1989. The khoya is from a dairy two streets over. Provenance isn't a marketing word for us. It's a phone number." },
  { number: "03", title: "The chair is always yours.", symbol: "خیر", body: "We don't rush tables. The 4 PM regulars have been sitting in the same seats for thirty years. Some of them barely order — they just come to sit. That's enough for us." },
];

const TEAM = [
  { initials: "SB", name: "Sultana Begum", role: "Founder & Head of Kitchen", urdu: "بانی", bio: "Started Sultana's in 1974 at 26, with one gas burner and a recipe she learned by watching, never measuring. She still tastes every batch of masala before it goes into anything.", year: "Since 1974", showSignature: true },
  { initials: "IB", name: "Imran Begum", role: "Second Generation, Front of House", urdu: "وارث", bio: "Sultana's son. Grew up behind the counter, handed over the front-of-house at 24. Knows every regular by name and order. Has tried to modernize exactly three things — all three were vetoed by his mother.", year: "Since 2001", showSignature: false },
  { initials: "FK", name: "Fatima Khaleeli", role: "Chai & Kitchen", urdu: "استاد", bio: "Has been pulling chai here for 18 years. She's the one who decides when the cardamom is right. Never measured a thing. Doesn't plan to start.", year: "Since 2006", showSignature: false },
];

export default function SultanasAboutPage() {
  const [loaded, setLoaded] = useState(false);
  const [heroRef, heroInView] = useInView(0.1);
  const [storyRef, storyInView] = useInView(0.08);
  const [valuesRef, valuesInView] = useInView(0.06);
  const [teamRef, teamInView] = useInView(0.06);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const reveal = (inView, delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <div className="relative min-h-screen bg-[#0C1A10] overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }} />
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[2]" preserveAspectRatio="xMidYMid slice">
        {[0,1,2,3,4].map(i => (<line key={i} x1={`${-20+i*30}%`} y1="0%" x2={`${20+i*30}%`} y2="100%" stroke="rgba(230,126,34,0.025)" strokeWidth="1" />))}
      </svg>

      {/* ══════════ NAV BAR ══════════ */}
      <Navbar isLoaded={loaded} />

      <div className="relative z-10 mx-10 md:mx-14 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(230,126,34,0.3), rgba(230,126,34,0.15), transparent)", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.3s" }} />

      {/* ══════════ HERO ══════════ */}
      <section ref={heroRef} className="relative z-10 px-6 md:px-14 py-20 md:py-32 overflow-hidden border-b border-[rgba(245,236,215,0.06)]">
        <div className="absolute right-0 bottom-0 font-serif leading-none select-none pointer-events-none" style={{ fontSize: "clamp(140px, 22vw, 280px)", color: "transparent", WebkitTextStroke: "1px rgba(230,126,34,0.04)", fontStyle: "italic", opacity: heroInView ? 1 : 0, transition: "opacity 1.4s ease 0.3s" }}>1974</div>
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-6" style={reveal(heroInView, 0.1)}>
              <div className="w-8 h-px bg-[rgba(230,126,34,0.45)]" />
              <span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">Our Story</span>
            </div>
            <h1 className="font-serif text-[#F5ECD7] leading-[1.04] tracking-[-0.025em] mb-8" style={{ fontSize: "clamp(42px, 6.5vw, 82px)", ...reveal(heroInView, 0.2) }}>
              Not a brand.<br /><span style={{ color: "transparent", WebkitTextStroke: "1px rgba(230,126,34,0.55)", fontStyle: "italic" }}>A family kitchen.</span>
            </h1>
            <p className="text-[rgba(245,236,215,0.5)] font-sans font-light text-base leading-[1.9] max-w-xl" style={{ letterSpacing: "0.04em", ...reveal(heroInView, 0.35) }}>
              Started in 1974 by a woman who knew two things — how to make chai properly, and that people needed a place to sit quietly. Fifty years later, not much has changed. That's the point.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-4" style={reveal(heroInView, 0.45)}>
            {[{ n: "50+", label: "Years on the same corner" }, { n: "3", label: "Generations who've eaten here" }, { n: "1", label: "Gas burner it started on" }].map(({ n, label }) => (
              <div key={label} className="flex items-center gap-5 border-b border-[rgba(245,236,215,0.06)] pb-4">
                <span className="font-serif text-[#E67E22] shrink-0" style={{ fontSize: "clamp(28px, 3vw, 38px)" }}>{n}</span>
                <span className="text-[rgba(245,236,215,0.35)] font-sans text-[12px] tracking-[0.08em] leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BRAND STORY ══════════ */}
      <section ref={storyRef} className="relative z-10 px-6 md:px-14 py-20 md:py-28 border-b border-[rgba(245,236,215,0.06)]">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(230,126,34,0.07) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <span className="text-[rgba(230,126,34,0.3)] text-[9px] tracking-[0.35em] uppercase font-sans" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", ...reveal(storyInView, 0.1) }}>The Beginning</span>
          </div>
          <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div style={reveal(storyInView, 0.15)}>
              <p className="font-serif italic text-[#F5ECD7] leading-[1.65] mb-6" style={{ fontSize: "clamp(18px, 2.2vw, 22px)" }}>"I didn't open a tea shop. I opened the only place in the neighbourhood where you could sit down and nobody would ask you to leave."</p>
              <p className="text-[rgba(245,236,215,0.42)] font-sans font-light text-[13px] leading-[1.9] tracking-[0.04em]">Sultana Begum arrived on Meenakshi Koil Street in 1974 with ₹600, two steel vessels, and a spice blend she'd memorised by watching her mother cook.</p>
            </div>
            <div style={reveal(storyInView, 0.3)}>
              <p className="text-[rgba(245,236,215,0.42)] font-sans font-light text-[13px] leading-[1.9] tracking-[0.04em] mb-6">The neighbourhood was chaotic then too. Russell Market traders, autorickshaw drivers, office workers cutting through on their lunch breaks.</p>
              <p className="text-[rgba(245,236,215,0.42)] font-sans font-light text-[13px] leading-[1.9] tracking-[0.04em]">In 2001, her son Imran took over. In 2012, they repainted. That's the full list of changes since 1974. The spice blend is still the same.</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto mt-16 md:mt-20 py-10 border-t border-b border-[rgba(230,126,34,0.12)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={reveal(storyInView, 0.5)}>
          <div className="flex items-start gap-6">
            <div className="font-serif text-[#E67E22] leading-none shrink-0" style={{ fontSize: "64px", lineHeight: 0.7, opacity: 0.3 }}>"</div>
            <p className="font-serif italic text-[rgba(245,236,215,0.7)] leading-[1.55]" style={{ fontSize: "clamp(16px, 2vw, 20px)", maxWidth: "600px" }}>Some things shouldn't change. The hands remember what recipes forget.</p>
          </div>
          <div className="shrink-0 flex flex-col items-start md:items-end gap-1">
            <Signature inView={storyInView} scale={0.85} />
            <span className="text-[rgba(245,236,215,0.25)] text-[10px] tracking-[0.2em] uppercase font-sans mt-1">Sultana Begum, Founder</span>
          </div>
        </div>
      </section>

      {/* ══════════ VALUES ══════════ */}
      <section ref={valuesRef} className="relative z-10 px-6 md:px-14 py-20 md:py-28 border-b border-[rgba(245,236,215,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14" style={reveal(valuesInView, 0.1)}>
            <div>
              <div className="flex items-center gap-4 mb-5"><div className="w-8 h-px bg-[rgba(230,126,34,0.45)]" /><span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">How We Work</span></div>
              <h2 className="font-serif text-[#F5ECD7] leading-[1.06] tracking-[-0.02em]" style={{ fontSize: "clamp(30px, 4vw, 52px)" }}>Three things we<br /><span style={{ fontStyle: "italic", color: "rgba(245,236,215,0.65)" }}>won't compromise on.</span></h2>
            </div>
            <p className="text-[rgba(245,236,215,0.28)] font-sans text-[11px] tracking-[0.1em] leading-relaxed md:text-right max-w-xs">Not a manifesto. Just the way we've always done it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (<ValueCard key={v.number} {...v} inView={valuesInView} delay={0.2 + i * 0.15} />))}
          </div>
        </div>
      </section>

      {/* ══════════ TEAM ══════════ */}
      <section ref={teamRef} className="relative z-10 px-6 md:px-14 py-20 md:py-28">
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full z-[2]" style={{ background: "radial-gradient(ellipse, rgba(27,94,32,0.12) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-14" style={reveal(teamInView, 0.1)}><div className="w-8 h-px bg-[rgba(230,126,34,0.45)]" /><span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">The People</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {TEAM.map((person, i) => (
              <div key={person.name} className="flex flex-col" style={reveal(teamInView, 0.15 + i * 0.15)}>
                <FounderPhoto initials={person.initials} index={i} inView={teamInView} />
                <div className="mt-6">
                  <div className="flex items-baseline justify-between gap-3 mb-1"><h3 className="font-serif text-[#F5ECD7] text-lg leading-tight">{person.name}</h3><span className="font-serif text-[rgba(230,126,34,0.35)] text-sm italic shrink-0">{person.urdu}</span></div>
                  <p className="text-[#E67E22] text-[10px] tracking-[0.2em] uppercase font-sans mb-1">{person.role}</p>
                  <p className="text-[rgba(245,236,215,0.2)] text-[9px] tracking-[0.2em] uppercase font-sans mb-4">{person.year}</p>
                  <div className="w-10 h-px bg-[rgba(230,126,34,0.2)] mb-4" />
                  <p className="text-[rgba(245,236,215,0.4)] font-sans font-light text-[12px] leading-[1.85] tracking-[0.04em]">{person.bio}</p>
                  {person.showSignature && (<div className="mt-5 opacity-70"><Signature inView={teamInView} scale={0.7} /></div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto mt-24 flex items-center gap-5" style={{ opacity: teamInView ? 0.3 : 0, transition: "opacity 1s ease 1s" }}>
          <div className="flex-1 h-px bg-[rgba(230,126,34,0.35)]" /><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#E67E22" /></svg>
          <span className="font-serif italic text-[rgba(230,126,34,0.4)] text-sm">محبت سے بنایا — Bengaluru</span>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#E67E22" /></svg><div className="flex-1 h-px bg-[rgba(230,126,34,0.35)]" />
        </div>
      </section>
      <SultanasFooter />
    </div>
  );
}