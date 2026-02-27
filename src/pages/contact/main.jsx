import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/nav";
import SultanasFooter from "../../components/footer";

function useInView(threshold = 0.08) {
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

const HOURS = [
  { day: "Monday",    open: "07:00", close: "21:00", note: null },
  { day: "Tuesday",   open: "07:00", close: "21:00", note: null },
  { day: "Wednesday", open: "07:00", close: "21:00", note: null },
  { day: "Thursday",  open: "07:00", close: "21:00", note: null },
  { day: "Friday",    open: "07:00", close: "22:00", note: "Extended" },
  { day: "Saturday",  open: "07:00", close: "22:00", note: "Extended" },
  { day: "Sunday",    open: "08:00", close: "20:00", note: "Slow mornings" },
];

const TODAY_IDX = [6,0,1,2,3,4,5][new Date().getDay()];

function isOpen() {
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = HOURS[TODAY_IDX].open.split(":").map(Number);
  const [ch, cm] = HOURS[TODAY_IDX].close.split(":").map(Number);
  return cur >= oh * 60 + om && cur < ch * 60 + cm;
}

/* ── Field component ── */
function Field({ label, type = "text", placeholder, value, onChange, as, rows, options }) {
  const [focused, setFocused] = useState(false);
  const base = {
    background: "transparent",
    border: `1px solid ${focused ? "rgba(230,126,34,0.45)" : "rgba(245,236,215,0.1)"}`,
    color: "rgba(245,236,215,0.85)",
    outline: "none",
    transition: "border-color 0.3s",
    width: "100%",
    fontFamily: "sans-serif",
    fontSize: "13px",
    letterSpacing: "0.04em",
    padding: "12px 14px",
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] tracking-[0.28em] uppercase font-sans"
        style={{ color: focused ? "#E67E22" : "rgba(245,236,215,0.35)", transition: "color 0.3s" }}>
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          rows={rows || 4}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, resize: "none" }}
          className="placeholder-[rgba(245,236,215,0.18)]"
        />
      ) : as === "select" ? (
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(230,126,34,0.5)' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "36px", cursor: "pointer" }}
        >
          {options.map(o => <option key={o.value} value={o.value} style={{ background: "#0C1A10" }}>{o.label}</option>)}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
          className="placeholder-[rgba(245,236,215,0.18)]"
        />
      )}
    </div>
  );
}

/* ── Map SVG ── */
function MapSVG() {
  return (
    <svg viewBox="0 0 560 380" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="380" fill="#0e1f12" />
      {[70,140,210,280,350].map(y => <line key={`h${y}`} x1="0" y1={y} x2="560" y2={y} stroke="rgba(245,236,215,0.04)" strokeWidth="1"/>)}
      {[80,160,240,320,400,480].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="380" stroke="rgba(245,236,215,0.04)" strokeWidth="1"/>)}
      <line x1="0" y1="190" x2="560" y2="190" stroke="rgba(245,236,215,0.1)" strokeWidth="3"/>
      <line x1="280" y1="0" x2="280" y2="380" stroke="rgba(245,236,215,0.1)" strokeWidth="3"/>
      <line x1="60" y1="0" x2="360" y2="380" stroke="rgba(230,126,34,0.3)" strokeWidth="2.5"/>
      <line x1="360" y1="0" x2="60" y2="380" stroke="rgba(245,236,215,0.06)" strokeWidth="1.5"/>
      {[[82,72,78,56],[166,72,76,56],[82,134,78,54],[248,134,76,54],[166,194,76,54],[248,194,76,54],[82,254,78,54],[330,72,78,56],[330,194,76,54],[166,254,76,54],[82,14,78,54]].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="rgba(245,236,215,0.02)"/>
      ))}
      <rect x="16" y="210" width="58" height="44" rx="3" fill="rgba(27,94,32,0.2)" stroke="rgba(34,120,34,0.35)" strokeWidth="1"/>
      <text x="45" y="230" fill="rgba(245,236,215,0.3)" fontSize="6.5" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">RUSSELL</text>
      <text x="45" y="241" fill="rgba(245,236,215,0.3)" fontSize="6.5" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">MARKET</text>
      <circle cx="214" cy="168" r="54" fill="rgba(230,126,34,0.07)"/>
      <circle cx="214" cy="168" r="34" fill="rgba(230,126,34,0.1)"/>
      <circle cx="214" cy="168" r="18" fill="rgba(230,126,34,0.15)"/>
      <circle cx="214" cy="168" r="28" stroke="rgba(230,126,34,0.4)" strokeWidth="1" fill="none">
        <animate attributeName="r" values="22;42;22" dur="2.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      <path d="M214 138 C202 138,192 148,192 160 C192 176,214 190,214 190 C214 190,236 176,236 160 C236 148,226 138,214 138Z" fill="#E67E22" opacity="0.95"/>
      <circle cx="214" cy="160" r="6" fill="#0C1A10"/>
      <rect x="226" y="130" width="102" height="30" rx="3" fill="rgba(12,26,16,0.92)" stroke="rgba(230,126,34,0.3)" strokeWidth="1"/>
      <text x="277" y="141" fill="rgba(245,236,215,0.7)" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.4">#42, Meenakshi Koil St</text>
      <text x="277" y="153" fill="rgba(230,126,34,0.7)" fontSize="6" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.4">Shivajinagar · 560051</text>
      <text x="115" y="178" fill="rgba(245,236,215,0.18)" fontSize="7.5" letterSpacing="1" fontFamily="sans-serif">MEENAKSHI KOIL ST</text>
      <text x="18" y="186" fill="rgba(245,236,215,0.1)" fontSize="7" letterSpacing="0.8" fontFamily="sans-serif">RUSSELL MARKET RD</text>
      <g transform="translate(524,26)">
        <circle cx="0" cy="0" r="14" fill="rgba(12,26,16,0.8)" stroke="rgba(230,126,34,0.2)" strokeWidth="1"/>
        <path d="M0-10 L2-2 L0 0 L-2-2Z" fill="#E67E22" opacity="0.7"/>
        <path d="M0 10 L2 2 L0 0 L-2 2Z" fill="rgba(245,236,215,0.2)"/>
        <text x="0" y="-12" fill="rgba(230,126,34,0.6)" fontSize="6" textAnchor="middle" fontFamily="sans-serif">N</text>
      </g>
      <line x1="20" y1="356" x2="66" y2="356" stroke="rgba(245,236,215,0.2)" strokeWidth="1.5"/>
      <line x1="20" y1="352" x2="20" y2="360" stroke="rgba(245,236,215,0.2)" strokeWidth="1"/>
      <line x1="66" y1="352" x2="66" y2="360" stroke="rgba(245,236,215,0.2)" strokeWidth="1"/>
      <text x="43" y="350" fill="rgba(245,236,215,0.2)" fontSize="6" textAnchor="middle" fontFamily="sans-serif">200m</text>
      <radialGradient id="vig" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="100%" stopColor="rgba(12,26,16,0.65)"/>
      </radialGradient>
      <rect width="560" height="380" fill="url(#vig)"/>
      <text x="280" y="18" fill="rgba(245,236,215,0.1)" fontSize="8" textAnchor="middle" letterSpacing="4" fontFamily="sans-serif">SHIVAJINAGAR · BENGALURU</text>
    </svg>
  );
}

/* ── Contact info card ── */
function InfoCard({ icon, label, primary, secondary, href, inView, delay }) {
  const [hov, setHov] = useState(false);
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex items-start gap-5 p-6 border transition-all duration-300"
      style={{
        borderColor: hov ? "rgba(230,126,34,0.25)" : "rgba(245,236,215,0.07)",
        background: hov ? "rgba(230,126,34,0.04)" : "transparent",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s, border-color 0.3s, background 0.3s`,
        textDecoration: "none",
        cursor: href ? "pointer" : "default",
      }}
    >
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l transition-colors duration-300"
        style={{ borderColor: hov ? "rgba(230,126,34,0.45)" : "rgba(230,126,34,0.15)" }}/>
      <div className="shrink-0 mt-0.5 transition-colors duration-300"
        style={{ color: hov ? "#E67E22" : "rgba(230,126,34,0.6)" }}>
        {icon}
      </div>
      <div>
        <p className="text-[9px] tracking-[0.3em] uppercase font-sans mb-1"
          style={{ color: hov ? "#E67E22" : "rgba(245,236,215,0.3)" }}>
          {label}
        </p>
        <p className="font-sans text-[13.5px] leading-relaxed mb-0.5"
          style={{ color: "rgba(245,236,215,0.8)" }}>
          {primary}
        </p>
        {secondary && (
          <p className="font-sans text-[11px] leading-relaxed"
            style={{ color: "rgba(245,236,215,0.3)" }}>
            {secondary}
          </p>
        )}
      </div>
    </Tag>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function SultanasContact() {
  const [loaded, setLoaded] = useState(false);
  const [topRef, topInView] = useInView(0.1);
  const [hoursRef, hoursInView] = useInView(0.08);
  const [formRef, formInView] = useInView(0.08);

  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "catering", date: "", guests: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  const open = isOpen();

  const reveal = (iv, d) => ({
    opacity: iv ? 1 : 0,
    transform: iv ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  return (
    <div className="relative min-h-screen bg-[#0C1A10] overflow-x-hidden">

      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
      />
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[2]" preserveAspectRatio="xMidYMid slice">
        {[0,1,2,3,4].map(i => <line key={i} x1={`${-20+i*30}%`} y1="0%" x2={`${20+i*30}%`} y2="100%" stroke="rgba(230,126,34,0.025)" strokeWidth="1"/>)}
      </svg>

      {/* ── NAV ── */}
      <Navbar isLoaded={loaded} />

      {/* Divider */}
      <div
        className="relative z-10 mx-10 md:mx-14 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(230,126,34,0.3), rgba(230,126,34,0.15), transparent)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 0.3s",
        }}
      />

      {/* ── PAGE HERO ── */}
      <section
        ref={topRef}
        className="relative z-10 px-6 md:px-14 py-16 md:py-24 border-b border-[rgba(245,236,215,0.06)] overflow-hidden"
      >
        <div className="absolute right-0 bottom-0 font-serif leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(100px, 18vw, 220px)",
            color: "transparent", WebkitTextStroke: "1px rgba(230,126,34,0.04)",
            fontStyle: "italic",
            opacity: topInView ? 1 : 0, transition: "opacity 1.4s ease 0.3s",
          }}>
          پتہ
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-6" style={reveal(topInView, 0.1)}>
              <div className="w-8 h-px bg-[rgba(230,126,34,0.45)]" />
              <span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">Find Us</span>
            </div>
            <h1
              className="font-serif text-[#F5ECD7] leading-[1.04] tracking-[-0.025em]"
              style={{ fontSize: "clamp(40px, 6vw, 76px)", ...reveal(topInView, 0.2) }}
            >
              We're on the corner.<br />
              <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(230,126,34,0.55)", fontStyle: "italic" }}>
                You can't miss us.
              </span>
            </h1>
            <p className="text-[rgba(245,236,215,0.42)] font-sans font-light leading-[1.85] max-w-lg mt-6"
              style={{ fontSize: "clamp(13px, 1.4vw, 15px)", letterSpacing: "0.04em", ...reveal(topInView, 0.35) }}>
              Three minutes from Russell Market. Look for the brass sign and the smell of cardamom.
              If you can't find us, call — we'll talk you in.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9" style={reveal(topInView, 0.45)}>
            <div
              className="border p-6 relative"
              style={{ borderColor: open ? "rgba(74,222,128,0.2)" : "rgba(245,236,215,0.08)" }}
            >
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l"
                style={{ borderColor: open ? "rgba(74,222,128,0.3)" : "rgba(230,126,34,0.2)" }} />
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: open ? "#4ade80" : "rgba(245,236,215,0.3)",
                    boxShadow: open ? "0 0 8px rgba(74,222,128,0.7)" : "none",
                    animation: open ? "pulse-dot 2s ease-in-out infinite" : "none",
                  }}
                />
                <span className="font-serif text-lg"
                  style={{ color: open ? "#4ade80" : "rgba(245,236,215,0.5)" }}>
                  {open ? "Open right now" : "Currently closed"}
                </span>
              </div>
              <p className="font-sans text-[12px] leading-relaxed"
                style={{ color: "rgba(245,236,215,0.35)", letterSpacing: "0.04em" }}>
                Today: <span style={{ color: "rgba(245,236,215,0.65)" }}>
                  {HOURS[TODAY_IDX].open} – {HOURS[TODAY_IDX].close}
                </span>
                {HOURS[TODAY_IDX].note && (
                  <span style={{ color: "rgba(230,126,34,0.5)" }}> · {HOURS[TODAY_IDX].note}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-14 py-16 md:py-24 border-b border-[rgba(245,236,215,0.06)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            className="lg:col-span-7 border border-[rgba(245,236,215,0.07)] overflow-hidden relative"
            style={{
              aspectRatio: "16/10",
              ...reveal(topInView, 0.3),
            }}
          >
            <MapSVG />
            <div className="absolute bottom-4 left-4 z-10">
              <div className="px-4 py-3 border border-[rgba(230,126,34,0.25)] backdrop-blur-sm"
                style={{ background: "rgba(12,26,16,0.88)" }}>
                <p className="text-[#E67E22] text-[9px] tracking-[0.3em] uppercase font-sans mb-1">Near Russell Market</p>
                <p className="text-[rgba(245,236,215,0.7)] font-serif text-sm italic">Corner of Meenakshi Koil St</p>
              </div>
            </div>
            <a
              href="#"
              className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 border backdrop-blur-sm
                         text-[10px] tracking-[0.2em] uppercase font-sans transition-all duration-300
                         hover:text-[#E67E22] hover:border-[rgba(230,126,34,0.6)]"
              style={{ background: "rgba(12,26,16,0.88)", borderColor: "rgba(230,126,34,0.3)", color: "rgba(245,236,215,0.6)" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
              </svg>
              Open in Maps
            </a>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <InfoCard inView={topInView} delay={0.4} label="Address" primary="#42, Meenakshi Koil Street" secondary="Shivajinagar, Bengaluru — 560051" href="#" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.3" fill="none"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.2"/></svg>} />
            <InfoCard inView={topInView} delay={0.52} label="Phone" primary="+91 80 2356 7890" secondary="WhatsApp available · 10 AM – 8 PM" href="tel:+918023567890" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3-8.57A2 2 0 012.06 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.3" fill="none"/></svg>} />
            <InfoCard inView={topInView} delay={0.64} label="Email" primary="hello@sultanaskitchen.in" secondary="We reply within 24 hours" href="mailto:hello@sultanaskitchen.in" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.3"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.3"/></svg>} />
            <InfoCard inView={topInView} delay={0.76} label="Instagram" primary="@sultanasheritagekitchen" secondary="DMs open for quick questions" href="#" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.3"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>} />
          </div>
        </div>
      </section>

      <section ref={hoursRef} className="relative z-10 px-6 md:px-14 py-16 md:py-24 border-b border-[rgba(245,236,215,0.06)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4" style={reveal(hoursInView, 0.1)}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[rgba(230,126,34,0.45)]" />
              <span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">Hours</span>
            </div>
            <h2 className="font-serif text-[#F5ECD7] leading-[1.1] tracking-[-0.02em] mb-6" style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>When we're<br /><span style={{ fontStyle: "italic", color: "rgba(245,236,215,0.6)" }}>here for you.</span></h2>
            <p className="text-[rgba(245,236,215,0.35)] font-sans font-light text-[12px] leading-[1.85] tracking-[0.04em] mb-8">We open early because the neighbourhood starts early. We close when the last customer leaves, which is usually a little after the posted time.</p>
            <div className="border border-[rgba(230,126,34,0.2)] p-4 relative" style={{ background: "rgba(230,126,34,0.04)" }}>
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[rgba(230,126,34,0.3)]" />
              <div className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" stroke="#E67E22" strokeWidth="1.2"/><path d="M12 8v4" stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#E67E22"/></svg>
                <p className="text-[rgba(245,236,215,0.45)] text-[11px] font-sans leading-relaxed tracking-[0.04em]"><span className="text-[rgba(245,236,215,0.7)]">Famous 4 PM Mutton Samosas</span> sell out fast. Arrive by 3:45 PM on weekends.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="border border-[rgba(245,236,215,0.07)] overflow-hidden">
              <div className="grid grid-cols-12 px-6 py-3 border-b border-[rgba(245,236,215,0.06)]" style={{ background: "rgba(245,236,215,0.02)" }}>
                <span className="col-span-5 text-[9px] tracking-[0.3em] uppercase font-sans text-[rgba(245,236,215,0.25)]">Day</span>
                <span className="col-span-4 text-[9px] tracking-[0.3em] uppercase font-sans text-[rgba(245,236,215,0.25)]">Opens</span>
                <span className="col-span-3 text-[9px] tracking-[0.3em] uppercase font-sans text-[rgba(245,236,215,0.25)] text-right">Closes</span>
              </div>
              {HOURS.map((h, i) => {
                const isToday = i === TODAY_IDX;
                return (
                  <div key={h.day} className="grid grid-cols-12 items-center px-6 py-[15px] transition-colors duration-200" style={{ borderBottom: i < HOURS.length - 1 ? "1px solid rgba(245,236,215,0.04)" : "none", background: isToday ? "rgba(230,126,34,0.05)" : "transparent", opacity: hoursInView ? 1 : 0, transform: hoursInView ? "translateX(0)" : "translateX(-10px)", transition: `opacity 0.6s ease ${0.1 + i * 0.06}s, transform 0.6s ease ${0.1 + i * 0.06}s, background 0.2s` }}>
                    <div className="col-span-5 flex items-center gap-3">
                      {isToday && <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22] shrink-0" style={{ boxShadow: "0 0 5px rgba(230,126,34,0.8)" }} />}
                      <span className="font-sans text-[13px] tracking-[0.05em]" style={{ color: isToday ? "#F5ECD7" : "rgba(245,236,215,0.45)", fontWeight: isToday ? 500 : 400, marginLeft: isToday ? 0 : "18px" }}>{h.day}</span>
                    </div>
                    <div className="col-span-4"><span className="font-serif text-[15px]" style={{ color: isToday ? "#E67E22" : "rgba(245,236,215,0.55)" }}>{h.open}</span></div>
                    <div className="col-span-3 flex justify-end"><span className="font-serif text-[15px]" style={{ color: isToday ? "#E67E22" : "rgba(245,236,215,0.55)" }}>{h.close}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section ref={formRef} className="relative z-10 px-6 md:px-14 py-16 md:py-24">
        <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full z-[2]" style={{ background: "radial-gradient(ellipse, rgba(230,126,34,0.07) 0%, transparent 70%)" }}/>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4" style={reveal(formInView, 0.1)}>
              <div className="flex items-center gap-4 mb-6"><div className="w-8 h-px bg-[rgba(230,126,34,0.45)]" /><span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">Enquiries</span></div>
              <h2 className="font-serif text-[#F5ECD7] leading-[1.1] tracking-[-0.02em] mb-6" style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>Catering,<br />events & large<br /><span style={{ fontStyle: "italic", color: "rgba(245,236,215,0.55)" }}>orders.</span></h2>
              <p className="text-[rgba(245,236,215,0.38)] font-sans font-light text-[12px] leading-[1.85] tracking-[0.04em] mb-8">Minimum 24 hours notice for catering. We'll tell you if we can't do it.</p>
            </div>

            <div className="md:col-span-7 md:col-start-6" style={reveal(formInView, 0.25)}>
              {submitted ? (
                <div className="border border-[rgba(74,222,128,0.2)] p-10 relative flex flex-col items-center text-center gap-6" style={{ background: "rgba(27,94,32,0.08)", minHeight: "400px", justifyContent: "center" }}>
                  <div className="w-16 h-16 rounded-full border border-[rgba(74,222,128,0.3)] flex items-center justify-center" style={{ background: "rgba(27,94,32,0.2)" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h3 className="font-serif text-[#F5ECD7] text-2xl mb-3">We've got your enquiry.</h3>
                  <p className="font-serif italic text-[rgba(230,126,34,0.5)] text-sm">شکریہ — Thank you</p>
                </div>
              ) : (
                <div className="border border-[rgba(245,236,215,0.07)] p-8 md:p-10 relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Your Name *" placeholder="Ayesha Mirza" value={form.name} onChange={set("name")} />
                    <Field label="Email Address *" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
                    <Field label="Phone Number" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                    <Field label="Enquiry Type" as="select" value={form.type} onChange={set("type")} options={[{ value: "catering",  label: "Catering / Event" }, { value: "bulk", label: "Bulk Order" }, { value: "corporate", label: "Corporate Service" }, { value: "other", label: "Something Else" }]} />
                    <div className="sm:col-span-2"><Field label="Your Message *" as="textarea" rows={4} placeholder="Tell us what you have in mind." value={form.message} onChange={set("message")} /></div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button onClick={handleSubmit} className="px-10 py-4 text-[11px] tracking-[0.22em] uppercase font-sans font-semibold transition-all duration-300" style={{ background: form.name && form.email && form.message ? "#E67E22" : "rgba(230,126,34,0.15)", color: form.name && form.email && form.message ? "#0C1A10" : "rgba(245,236,215,0.3)", cursor: form.name && form.email && form.message ? "pointer" : "not-allowed" }}>Send Enquiry</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </section>
        <SultanasFooter />

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}