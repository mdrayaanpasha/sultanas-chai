import { useState, useEffect, useRef } from "react";

/* ── Steam particle ── */
function SteamWisp({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: "2px",
        background: "linear-gradient(to top, rgba(230,126,34,0.35), transparent)",
        filter: "blur(1px)",
        ...style,
      }}
    />
  );
}

/* ── Animated kettle SVG ── */
function KettleSVG({ inView }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  // Gentle bob
  const bob = Math.sin(tick * 0.04) * 3;

  return (
    <svg
      viewBox="0 0 220 260"
      className="w-40 md:w-52 overflow-visible"
      fill="none"
      style={{ transform: `translateY(${bob}px)`, transition: "transform 0.1s linear" }}
    >
      {/* Glow behind kettle */}
      <circle cx="110" cy="160" r="70" fill="rgba(230,126,34,0.06)" />

      {/* Kettle body */}
      <path
        d="M 55 100 C 44 100, 30 112, 30 138 C 30 172, 50 205, 110 207 C 170 205, 190 172, 190 138 C 190 112, 176 100, 165 100 Z"
        fill="rgba(230,126,34,0.1)" stroke="#E67E22" strokeWidth="1.5"
      />
      {/* Kettle highlight */}
      <path d="M 60 110 C 55 125, 50 145, 52 168" stroke="rgba(245,236,215,0.1)" strokeWidth="2" strokeLinecap="round" />

      {/* Spout */}
      <path
        d="M 30 130 C 16 122, 6 106, 14 94 C 22 82, 34 88, 34 100"
        stroke="#E67E22" strokeWidth="1.5" fill="none"
      />

      {/* Handle */}
      <path
        d="M 190 116 C 210 116, 220 134, 212 150 C 204 166, 190 160, 190 152"
        stroke="#E67E22" strokeWidth="1.5" fill="none"
      />

      {/* Lid */}
      <path d="M 64 100 C 64 82, 156 82, 156 100" stroke="#E67E22" strokeWidth="1.5" />
      <circle cx="110" cy="75" r="8" stroke="#E67E22" strokeWidth="1.2" fill="none" />
      <circle cx="110" cy="75" r="3" fill="rgba(230,126,34,0.4)" />

      {/* Decorative band */}
      <path d="M 42 150 C 60 156, 160 156, 178 150" stroke="rgba(230,126,34,0.2)" strokeWidth="1" />
      <path d="M 38 135 C 58 139, 162 139, 182 135" stroke="rgba(230,126,34,0.12)" strokeWidth="0.8" />

      {/* Steam — animated */}
      {[85, 108, 132].map((x, i) => (
        <path
          key={x}
          d={`M ${x} 68 C ${x - 4} ${52 + i * 2}, ${x + 5} ${36 + i * 2}, ${x - 3} ${20 + i * 2}`}
          stroke="rgba(230,126,34,0.4)"
          strokeWidth="1"
          strokeLinecap="round"
          style={{
            strokeDasharray: 60,
            strokeDashoffset: inView ? 0 : 60,
            transition: `stroke-dashoffset 1.2s ease ${0.6 + i * 0.3}s`,
            animation: `steam-path 3s ease-in-out infinite ${i * 0.8}s`,
          }}
        />
      ))}

      {/* Plate shadow */}
      <ellipse cx="110" cy="218" rx="62" ry="9" fill="rgba(0,0,0,0.3)" />
    </svg>
  );
}

/* ── Animated counter for 404 ── */
function FourOhFour({ inView }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setShow(true), 200);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <div className="relative flex items-baseline justify-center gap-0 select-none leading-none">
      {/* Giant ghost 404 */}
      <div
        className="absolute inset-0 flex items-center justify-center font-serif leading-none pointer-events-none"
        style={{
          fontSize: "clamp(160px, 28vw, 340px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(230,126,34,0.06)",
          fontStyle: "italic",
          opacity: show ? 1 : 0,
          transition: "opacity 1.2s ease 0.4s",
        }}
      >
        404
      </div>

      {/* Foreground 404 */}
      {["4", "0", "4"].map((char, i) => (
        <span
          key={i}
          className="font-serif"
          style={{
            fontSize: "clamp(72px, 14vw, 160px)",
            color: i === 1 ? "transparent" : "rgba(245,236,215,0.08)",
            WebkitTextStroke: i === 1 ? "1.5px rgba(230,126,34,0.5)" : "1px rgba(245,236,215,0.12)",
            letterSpacing: "-0.04em",
            fontStyle: "italic",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : `translateY(${i % 2 === 0 ? 30 : -30}px)`,
            transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

/* ── Ticker text ── */
const TICKER_ITEMS = [
  "The chai is still hot",
  "The samosas are ready",
  "Wrong corner, right neighbourhood",
  "Page not found · پتہ نہیں ملا",
  "Try the menu instead",
  "Est. 1974 · Still here",
];

function Ticker() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset(o => o - 1), 30);
    return () => clearInterval(id);
  }, []);
  const content = [...TICKER_ITEMS, ...TICKER_ITEMS].join("  ·  ");
  const px = offset % 800;

  return (
    <div className="overflow-hidden whitespace-nowrap border-t border-b border-[rgba(245,236,215,0.06)] py-3">
      <span
        className="inline-block text-[9px] tracking-[0.3em] uppercase font-sans"
        style={{
          color: "rgba(245,236,215,0.18)",
          transform: `translateX(${px}px)`,
          transition: "none",
          willChange: "transform",
        }}
      >
        {content}&nbsp;&nbsp;&nbsp;&nbsp;{content}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function Sultanas404() {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => { setLoaded(true); setInView(true); }, 120);
    return () => clearTimeout(t);
  }, []);

  const reveal = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-[#0C1A10] flex flex-col overflow-hidden"
    >
      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
      />

      {/* Diagonal geo */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[2]" preserveAspectRatio="xMidYMid slice">
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={`${-20+i*30}%`} y1="0%" x2={`${20+i*30}%`} y2="100%"
            stroke="rgba(230,126,34,0.025)" strokeWidth="1" />
        ))}
        {/* Corner brackets */}
        <path d="M 3% 3% L 3% 11%, M 3% 3% L 10% 3%" stroke="rgba(230,126,34,0.12)" strokeWidth="1" fill="none"/>
        <path d="M 97% 89% L 97% 97%, M 97% 97% L 90% 97%" stroke="rgba(230,126,34,0.12)" strokeWidth="1" fill="none"/>
      </svg>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(230,126,34,0.09) 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(27,94,32,0.14) 0%, transparent 70%)" }} />

      {/* Steam wisps from bottom */}
      {[20, 35, 50, 65, 80].map((left, i) => (
        <SteamWisp
          key={i}
          style={{
            left: `${left}%`,
            bottom: "15%",
            height: "40px",
            animation: `steam-rise ${3.5 + i * 0.6}s ease-in infinite ${i * 0.7}s`,
          }}
        />
      ))}

      {/* ── NAV ── */}
      <header
        className="relative z-10 flex items-center justify-between px-6 md:px-14 py-6 border-b border-[rgba(245,236,215,0.07)]"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full border border-[rgba(230,126,34,0.4)] flex items-center justify-center">
            <div className="w-[5px] h-[5px] rounded-full bg-[#E67E22]" />
          </div>
          <div>
            <p className="text-[#F5ECD7] text-[12px] tracking-[0.22em] uppercase font-serif">Sultana's</p>
            <p className="text-[rgba(245,236,215,0.3)] text-[8px] tracking-[0.2em] uppercase font-sans">Heritage Kitchen</p>
          </div>
        </div>
        <a href="/" className="text-[rgba(245,236,215,0.35)] text-[10px] tracking-[0.2em] uppercase font-sans
                                transition-colors duration-300 hover:text-[#E67E22] flex items-center gap-2">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Back to Home
        </a>
      </header>

      {/* Ticker */}
      <div
        className="relative z-10"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.4s" }}
      >
        <Ticker />
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-14 py-12">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left — text */}
          <div>
            {/* 404 number */}
            <div style={reveal(0.1)}>
              <FourOhFour inView={inView} />
            </div>

            {/* Divider */}
            <div
              className="flex items-center gap-4 my-6"
              style={reveal(0.45)}
            >
              <div className="w-10 h-px bg-[rgba(230,126,34,0.35)]" />
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="rgba(230,126,34,0.5)" />
              </svg>
              <span className="text-[rgba(230,126,34,0.5)] text-[9px] tracking-[0.35em] uppercase font-sans">
                Page Not Found
              </span>
              <div className="w-10 h-px bg-[rgba(230,126,34,0.35)]" />
            </div>

            {/* Headline */}
            <h1
              className="font-serif text-[#F5ECD7] leading-[1.1] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(26px, 3.8vw, 46px)", ...reveal(0.5) }}
            >
              You've taken a wrong<br />
              <span style={{ fontStyle: "italic", color: "transparent", WebkitTextStroke: "1px rgba(230,126,34,0.5)" }}>
                turn somewhere.
              </span>
            </h1>

            {/* Body */}
            <p
              className="text-[rgba(245,236,215,0.42)] font-sans font-light leading-[1.85] mb-8"
              style={{ fontSize: "13px", letterSpacing: "0.04em", maxWidth: "420px", ...reveal(0.62) }}
            >
              This page doesn't exist — but the chai does, and the samosas are ready at 4 PM.
              Come back to where the neighbourhood makes sense.
            </p>

            {/* Urdu note */}
            <p
              className="font-serif italic text-[rgba(230,126,34,0.45)] text-base mb-10"
              style={reveal(0.7)}
            >
              پتہ نہیں ملا — the address was not found
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4" style={reveal(0.78)}>
              <PrimaryBtn href="/">Take me home</PrimaryBtn>
              <SecondaryBtn href="/menu">See the menu</SecondaryBtn>
              <SecondaryBtn href="/contact">Find us</SecondaryBtn>
            </div>
          </div>

          {/* Right — kettle illustration + context */}
          <div
            className="flex flex-col items-center gap-8"
            style={reveal(0.3)}
          >
            {/* Kettle */}
            <KettleSVG inView={inView} />

            {/* Context card */}
            <div
              className="w-full border border-[rgba(245,236,215,0.07)] p-6 relative"
              style={{ background: "rgba(245,236,215,0.02)" }}
            >
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[rgba(230,126,34,0.2)]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[rgba(230,126,34,0.2)]" />

              <p className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#E67E22] mb-4">
                While you're here
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { href: "/menu",    label: "Our full menu",       note: "22 items, all made by hand"       },
                  { href: "/about",   label: "Our story",           note: "Started in 1974 with ₹600"        },
                  { href: "/contact", label: "Directions",          note: "#42, Meenakshi Koil St"           },
                ].map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between gap-4 group transition-all duration-300"
                  >
                    <div>
                      <p className="font-sans text-[13px] text-[rgba(245,236,215,0.65)] transition-colors duration-300 group-hover:text-[#F5ECD7]">
                        {link.label}
                      </p>
                      <p className="font-sans text-[10px] text-[rgba(245,236,215,0.25)] tracking-[0.06em]">
                        {link.note}
                      </p>
                    </div>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      className="shrink-0 text-[rgba(230,126,34,0.35)] transition-all duration-300 group-hover:text-[#E67E22] group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── BOTTOM STRIP ── */}
      <footer
        className="relative z-10 border-t border-[rgba(245,236,215,0.06)] px-6 md:px-14 py-5
                   flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ opacity: inView ? 1 : 0, transition: "opacity 1s ease 1.2s" }}
      >
        <div className="flex items-center gap-2">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(230,126,34,0.5)"/>
          </svg>
          <span className="text-[rgba(245,236,215,0.25)] text-[10px] font-sans tracking-[0.12em]">
            #42, Meenakshi Koil St · Shivajinagar · Bengaluru 560051
          </span>
        </div>
        <span className="text-[rgba(245,236,215,0.15)] text-[10px] font-sans tracking-[0.15em] uppercase">
          Error 404 — © {new Date().getFullYear()} Sultana's Heritage Kitchen
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[rgba(245,236,215,0.2)] text-[10px] font-sans tracking-[0.1em]">Open Daily · 7 AM – 9 PM</span>
        </div>
      </footer>

      <style>{`
        @keyframes steam-rise {
          0%   { opacity: 0;   transform: translateY(0)     scaleX(1);   }
          20%  { opacity: 0.5;                                            }
          100% { opacity: 0;   transform: translateY(-55px) scaleX(1.6); }
        }
        @keyframes steam-path {
          0%, 100% { opacity: 0.4; transform: translateY(0);   }
          50%       { opacity: 0.7; transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

/* ── Buttons ── */
function PrimaryBtn({ children, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="px-7 py-[14px] text-[11px] tracking-[0.22em] uppercase font-sans font-semibold
                 transition-all duration-300 inline-block"
      style={{
        background: hov ? "#CF6D17" : "#E67E22",
        color: "#0C1A10",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hov ? "0 10px 36px rgba(230,126,34,0.4)" : "0 4px 18px rgba(230,126,34,0.2)",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

function SecondaryBtn({ children, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="px-7 py-[13px] text-[11px] tracking-[0.22em] uppercase font-sans font-normal
                 bg-transparent transition-all duration-300 inline-block"
      style={{
        color: hov ? "#F5ECD7" : "rgba(245,236,215,0.5)",
        border: `1px solid ${hov ? "rgba(245,236,215,0.45)" : "rgba(245,236,215,0.15)"}`,
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}