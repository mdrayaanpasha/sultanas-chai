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

const HOURS = [
  { day: "Monday",    open: "07:00", close: "21:00", note: null },
  { day: "Tuesday",   open: "07:00", close: "21:00", note: null },
  { day: "Wednesday", open: "07:00", close: "21:00", note: null },
  { day: "Thursday",  open: "07:00", close: "21:00", note: null },
  { day: "Friday",    open: "07:00", close: "22:00", note: "Extended hours" },
  { day: "Saturday",  open: "07:00", close: "22:00", note: "Extended hours" },
  { day: "Sunday",    open: "08:00", close: "20:00", note: "Slower mornings" },
];

const TODAY = new Date().getDay(); // 0 = Sunday, 1 = Monday…
const DAY_INDEX_MAP = [6, 0, 1, 2, 3, 4, 5]; // maps JS getDay() → HOURS index
const todayIndex = DAY_INDEX_MAP[TODAY];

function isCurrentlyOpen() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes();
  const current = h * 60 + m;
  const t = HOURS[todayIndex];
  const [oh, om] = t.open.split(":").map(Number);
  const [ch, cm] = t.close.split(":").map(Number);
  return current >= oh * 60 + om && current < ch * 60 + cm;
}

/* ── Street map SVG placeholder ── */
function MapPlaceholder() {
  return (
    <svg viewBox="0 0 480 360" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="480" height="360" fill="#0e1f12" />

      {/* Grid of streets */}
      {/* Horizontals */}
      {[60, 120, 180, 240, 300].map(y => (
        <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="rgba(245,236,215,0.05)" strokeWidth="1" />
      ))}
      {/* Verticals */}
      {[80, 160, 240, 320, 400].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="360" stroke="rgba(245,236,215,0.05)" strokeWidth="1" />
      ))}

      {/* Main roads — thicker */}
      <line x1="0" y1="180" x2="480" y2="180" stroke="rgba(245,236,215,0.12)" strokeWidth="3" />
      <line x1="240" y1="0" x2="240" y2="360" stroke="rgba(245,236,215,0.12)" strokeWidth="3" />
      {/* Diagonal — Meenakshi Koil St */}
      <line x1="80" y1="0" x2="320" y2="360" stroke="rgba(230,126,34,0.25)" strokeWidth="2.5" />
      <line x1="320" y1="0" x2="80" y2="360" stroke="rgba(245,236,215,0.07)" strokeWidth="1.5" />

      {/* Road labels */}
      <text x="130" y="170" fill="rgba(245,236,215,0.2)" fontSize="8" letterSpacing="1" fontFamily="sans-serif">MEENAKSHI KOIL ST</text>
      <text x="10" y="175" fill="rgba(245,236,215,0.12)" fontSize="7" letterSpacing="1" fontFamily="sans-serif">RUSSELL MARKET RD</text>
      <text x="250" y="60" fill="rgba(245,236,215,0.1)" fontSize="7" letterSpacing="1" fontFamily="sans-serif" transform="rotate(90, 250, 60)">SHIVAJINAGAR MAIN</text>

      {/* City blocks — subtle fills */}
      <rect x="82" y="62" width="76" height="56" rx="2" fill="rgba(245,236,215,0.02)" />
      <rect x="164" y="62" width="74" height="56" rx="2" fill="rgba(245,236,215,0.02)" />
      <rect x="82" y="124" width="76" height="54" rx="2" fill="rgba(245,236,215,0.02)" />
      <rect x="244" y="124" width="74" height="54" rx="2" fill="rgba(245,236,215,0.02)" />
      <rect x="164" y="184" width="74" height="54" rx="2" fill="rgba(245,236,215,0.02)" />
      <rect x="244" y="184" width="74" height="54" rx="2" fill="rgba(245,236,215,0.02)" />
      <rect x="82" y="244" width="76" height="54" rx="2" fill="rgba(245,236,215,0.02)" />
      <rect x="324" y="62" width="74" height="56" rx="2" fill="rgba(245,236,215,0.02)" />
      <rect x="324" y="184" width="74" height="54" rx="2" fill="rgba(245,236,215,0.02)" />

      {/* Russell Market — landmark box */}
      <rect x="20" y="200" width="56" height="40" rx="3"
        fill="rgba(27,94,32,0.2)" stroke="rgba(34,120,34,0.35)" strokeWidth="1" />
      <text x="48" y="218" fill="rgba(245,236,215,0.3)" fontSize="6" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">RUSSELL</text>
      <text x="48" y="228" fill="rgba(245,236,215,0.3)" fontSize="6" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">MARKET</text>

      {/* Radial glow at pin location */}
      <circle cx="200" cy="160" r="48" fill="rgba(230,126,34,0.08)" />
      <circle cx="200" cy="160" r="30" fill="rgba(230,126,34,0.1)" />
      <circle cx="200" cy="160" r="16" fill="rgba(230,126,34,0.15)" />

      {/* Pulsing ring */}
      <circle cx="200" cy="160" r="26" stroke="rgba(230,126,34,0.35)" strokeWidth="1" fill="none">
        <animate attributeName="r" values="20;36;20" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" />
      </circle>

      {/* Pin marker */}
      <path d="M 200 130 C 188 130, 180 139, 180 150 C 180 165, 200 178, 200 178 C 200 178, 220 165, 220 150 C 220 139, 212 130, 200 130 Z"
        fill="#E67E22" opacity="0.95" />
      <circle cx="200" cy="150" r="6" fill="#0C1A10" />

      {/* Address tag */}
      <rect x="210" y="126" width="90" height="26" rx="3"
        fill="rgba(12,26,16,0.9)" stroke="rgba(230,126,34,0.3)" strokeWidth="1" />
      <text x="255" y="136" fill="rgba(245,236,215,0.7)" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">#42, Meenakshi Koil St</text>
      <text x="255" y="146" fill="rgba(230,126,34,0.7)" fontSize="6" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">Shivajinagar · 560051</text>

      {/* Compass rose */}
      <g transform="translate(444, 28)">
        <circle cx="0" cy="0" r="14" fill="rgba(12,26,16,0.7)" stroke="rgba(230,126,34,0.2)" strokeWidth="1"/>
        <path d="M 0 -10 L 2 -2 L 0 0 L -2 -2 Z" fill="#E67E22" opacity="0.7" />
        <path d="M 0 10 L 2 2 L 0 0 L -2 2 Z" fill="rgba(245,236,215,0.25)" />
        <text x="0" y="-12" fill="rgba(230,126,34,0.6)" fontSize="6" textAnchor="middle" fontFamily="sans-serif">N</text>
      </g>

      {/* Scale bar */}
      <g transform="translate(20, 336)">
        <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(245,236,215,0.2)" strokeWidth="1.5" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(245,236,215,0.2)" strokeWidth="1" />
        <line x1="40" y1="-3" x2="40" y2="3" stroke="rgba(245,236,215,0.2)" strokeWidth="1" />
        <text x="20" y="-5" fill="rgba(245,236,215,0.2)" fontSize="6" textAnchor="middle" fontFamily="sans-serif">200m</text>
      </g>

      {/* Vignette overlay */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(12,26,16,0.7)" />
      </radialGradient>
      <rect width="480" height="360" fill="url(#vignette)" />

      {/* Top label */}
      <text x="240" y="20" fill="rgba(245,236,215,0.15)" fontSize="8" textAnchor="middle"
        letterSpacing="3" fontFamily="sans-serif" textTransform="uppercase">SHIVAJINAGAR · BENGALURU</text>
    </svg>
  );
}

/* ══════════════════════ MAIN ══════════════════════ */
export default function SultanasLocation() {
  const [sectionRef, inView] = useInView(0.08);
  const open = isCurrentlyOpen();

  const reveal = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C1A10] overflow-hidden py-24 md:py-36"
    >
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-50 z-[1]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
      />

      {/* Geo lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2]" preserveAspectRatio="xMidYMid slice">
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={`${-20+i*30}%`} y1="0%" x2={`${20+i*30}%`} y2="100%"
            stroke="rgba(230,126,34,0.03)" strokeWidth="1" />
        ))}
        <path d="M 88% 3% L 97% 3% L 97% 14%" stroke="rgba(230,126,34,0.1)" strokeWidth="1" fill="none"/>
        <path d="M 3% 86% L 3% 97% L 14% 97%" stroke="rgba(230,126,34,0.1)" strokeWidth="1" fill="none"/>
      </svg>

      {/* Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(230,126,34,0.07) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">

        {/* ── Section header ── */}
        <div className="mb-16 md:mb-24" style={reveal(0.1)}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-[rgba(230,126,34,0.45)]" />
            <span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">
              Visit Us
            </span>
          </div>
          <h2
            className="font-serif text-[#F5ECD7] leading-[1.06] tracking-[-0.025em]"
            style={{ fontSize: "clamp(34px, 5vw, 62px)" }}
          >
            Find your way to<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(230,126,34,0.55)", fontStyle: "italic" }}>
              the corner.
            </span>
          </h2>
        </div>

        {/* ══ MAIN GRID ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

          {/* ── LEFT: Hours ── */}
          <div
            className="lg:col-span-5 flex flex-col"
            style={reveal(0.2)}
          >
            <div className="border border-[rgba(245,236,215,0.07)] p-8 md:p-10 flex-1 relative overflow-hidden">

              {/* Card corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[rgba(230,126,34,0.25)]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[rgba(230,126,34,0.25)]" />

              {/* Hours header */}
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans mb-2">
                    Opening Hours
                  </p>
                  <h3 className="font-serif text-[#F5ECD7] text-2xl">When we're here</h3>
                </div>
                {/* Live open/closed pill */}
                <div
                  className="flex items-center gap-2 px-4 py-2 border rounded-full"
                  style={{
                    borderColor: open ? "rgba(34,180,34,0.3)" : "rgba(245,236,215,0.1)",
                    background: open ? "rgba(27,94,32,0.2)" : "rgba(245,236,215,0.04)",
                  }}
                >
                  <span
                    className="w-[6px] h-[6px] rounded-full"
                    style={{
                      background: open ? "#4ade80" : "rgba(245,236,215,0.3)",
                      boxShadow: open ? "0 0 6px rgba(74,222,128,0.6)" : "none",
                      animation: open ? "pulse 2s ease-in-out infinite" : "none",
                    }}
                  />
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase font-sans"
                    style={{ color: open ? "#4ade80" : "rgba(245,236,215,0.35)" }}
                  >
                    {open ? "Open Now" : "Closed"}
                  </span>
                </div>
              </div>

              {/* Hours rows */}
              <div className="flex flex-col divide-y divide-[rgba(245,236,215,0.05)]">
                {HOURS.map((h, i) => {
                  const isToday = i === todayIndex;
                  return (
                    <div
                      key={h.day}
                      className="flex items-center justify-between py-[14px] group"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateX(0)" : "translateX(-12px)",
                        transition: `opacity 0.6s ease ${0.3 + i * 0.06}s, transform 0.6s ease ${0.3 + i * 0.06}s`,
                      }}
                    >
                      {/* Day name */}
                      <div className="flex items-center gap-3">
                        {isToday && (
                          <div className="w-1 h-1 rounded-full bg-[#E67E22]" />
                        )}
                        <span
                          className="font-sans text-[13px] tracking-[0.06em]"
                          style={{
                            color: isToday ? "#F5ECD7" : "rgba(245,236,215,0.45)",
                            fontWeight: isToday ? 500 : 400,
                            marginLeft: isToday ? 0 : "16px",
                          }}
                        >
                          {h.day}
                        </span>
                        {h.note && (
                          <span className="text-[9px] tracking-[0.15em] text-[rgba(230,126,34,0.5)] uppercase font-sans hidden sm:inline">
                            {h.note}
                          </span>
                        )}
                      </div>

                      {/* Times */}
                      <div className="flex items-center gap-2">
                        <span
                          className="font-serif text-[15px]"
                          style={{ color: isToday ? "#E67E22" : "rgba(245,236,215,0.55)" }}
                        >
                          {h.open}
                        </span>
                        <span className="text-[rgba(245,236,215,0.2)] text-xs">—</span>
                        <span
                          className="font-serif text-[15px]"
                          style={{ color: isToday ? "#E67E22" : "rgba(245,236,215,0.55)" }}
                        >
                          {h.close}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Special note */}
              <div
                className="mt-8 pt-6 border-t border-[rgba(245,236,215,0.06)] flex items-start gap-3"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="rgba(230,126,34,0.5)" strokeWidth="1.2"/>
                  <path d="M12 8v4l3 3" stroke="rgba(230,126,34,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <p className="text-[rgba(245,236,215,0.28)] text-[11px] font-sans leading-relaxed tracking-[0.04em]">
                  The Famous 4 PM Mutton Samosas sell out fast.
                  We recommend arriving by 3:45 PM on weekends.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Map + Contact ── */}
          <div className="lg:col-span-7 flex flex-col gap-6" style={reveal(0.3)}>

            {/* Map */}
            <div
              className="relative border border-[rgba(245,236,215,0.07)] overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <MapPlaceholder />

              {/* Map overlay label */}
              <div className="absolute bottom-4 left-4 z-10">
                <div
                  className="px-4 py-3 border border-[rgba(230,126,34,0.25)] backdrop-blur-sm"
                  style={{ background: "rgba(12,26,16,0.85)" }}
                >
                  <p className="text-[#E67E22] text-[9px] tracking-[0.3em] uppercase font-sans mb-1">
                    Near Russell Market
                  </p>
                  <p className="text-[rgba(245,236,215,0.7)] font-serif text-sm italic">
                    Corner of Meenakshi Koil St
                  </p>
                </div>
              </div>

              {/* Get directions button */}
              <a
                href="https://maps.google.com/?q=Meenakshi+Koil+Street+Shivajinagar+Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 border
                           border-[rgba(230,126,34,0.3)] backdrop-blur-sm text-[10px] tracking-[0.2em]
                           uppercase font-sans text-[rgba(245,236,215,0.65)] transition-all duration-300
                           hover:text-[#E67E22] hover:border-[rgba(230,126,34,0.6)]"
                style={{ background: "rgba(12,26,16,0.85)" }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    fill="currentColor" />
                </svg>
                Get Directions
              </a>
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Address */}
              <ContactCard
                inView={inView} delay={0.45}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="#E67E22" strokeWidth="1.2" fill="none"/>
                    <circle cx="12" cy="9" r="2.5" stroke="#E67E22" strokeWidth="1"/>
                  </svg>
                }
                label="Address"
                lines={["#42, Meenakshi Koil St", "Shivajinagar, Bengaluru", "Karnataka — 560051"]}
              />

              {/* Phone */}
              <ContactCard
                inView={inView} delay={0.55}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 0 0 .07 2.82 2 2 0 012.06 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="#E67E22" strokeWidth="1.2" fill="none"/>
                  </svg>
                }
                label="Phone"
                lines={["+91 80 2356 7890", "WhatsApp available", "10 AM – 8 PM only"]}
                href="tel:+918023567890"
              />

              {/* Landmark */}
              <ContactCard
                inView={inView} delay={0.65}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#E67E22" strokeWidth="1.2" fill="none"/>
                    <polyline points="9 22 9 12 15 12 15 22" stroke="#E67E22" strokeWidth="1.2"/>
                  </svg>
                }
                label="Landmark"
                lines={["3 min walk from", "Russell Market", "Look for brass signage"]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
}

/* ─── Contact card ─── */
function ContactCard({ icon, label, lines, inView, delay, href }) {
  const [hov, setHov] = useState(false);
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative border p-6 flex flex-col gap-3 transition-colors duration-300"
      style={{
        borderColor: hov ? "rgba(230,126,34,0.25)" : "rgba(245,236,215,0.07)",
        background: hov ? "rgba(230,126,34,0.04)" : "transparent",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s, border-color 0.3s, background 0.3s`,
        textDecoration: "none",
        cursor: href ? "pointer" : "default",
      }}
    >
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l transition-colors duration-300"
        style={{ borderColor: hov ? "rgba(230,126,34,0.4)" : "rgba(230,126,34,0.15)" }} />
      {icon}
      <p className="text-[#E67E22] text-[9px] tracking-[0.3em] uppercase font-sans">{label}</p>
      <div className="flex flex-col gap-1">
        {lines.map((l, i) => (
          <p key={i}
            className="font-sans text-[12px] leading-relaxed"
            style={{ color: i === 0 ? "rgba(245,236,215,0.75)" : "rgba(245,236,215,0.35)" }}
          >
            {l}
          </p>
        ))}
      </div>
    </Tag>
  );
}