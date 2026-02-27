import { useState, useEffect } from "react";
import Navbar from "../../../components/nav";

const urduWords = ["چائے", "سموسہ", "ورثہ", "محبت"];
const urduMeanings = ["Chai", "Samosa", "Heritage", "Love"];

const tags = [
  "Famous 4 PM Mutton Samosas",
  "Hand-Pulled Sulemani Chai",
  "Khoya Dilkhush",
  "Est. 1974",
];

export default function SultanasHero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % urduWords.length);
        setWordVisible(true);
      }, 600);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C1A10] flex flex-col overflow-hidden">

      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.55]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full z-[1]"
        style={{ background: "radial-gradient(ellipse, rgba(230,126,34,0.13) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute bottom-0 -right-[10%] w-[400px] h-[400px] rounded-full z-[1]"
        style={{ background: "radial-gradient(ellipse, rgba(27,94,32,0.18) 0%, transparent 70%)" }} />

      {/* ── Steam wisps ── */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute bottom-[20%] w-[2px] h-[30px] rounded-full blur-[1px] z-[2]"
          style={{
            left: `${30 + i * 12}%`,
            background: "linear-gradient(to top, rgba(230,126,34,0.3), transparent)",
            animation: `steam ${3 + i * 0.7}s ease-in infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}



      {/* Divider */}
      <div
        className="relative z-10 mx-10 md:mx-14 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(230,126,34,0.3), rgba(230,126,34,0.15), transparent)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 0.3s",
        }}
      />
        <Navbar isLoaded={loaded} />

      {/* ══════════════════════════════
          HERO BODY
      ══════════════════════════════ */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">

        {/* Rotating Urdu word */}
        <div className="h-20 flex items-center justify-center mb-2">
          <span
            className="font-serif italic text-[#E67E22]"
            style={{
              fontSize: "clamp(52px, 8vw, 88px)",
              lineHeight: 1,
              textShadow: "0 0 60px rgba(230,126,34,0.4)",
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {urduWords[wordIndex]}
          </span>
        </div>

        {/* Meaning */}
        <p
          className="text-[#F5ECD7] text-[11px] tracking-[0.3em] uppercase font-sans mb-10"
          style={{ opacity: wordVisible ? 0.45 : 0, transition: "opacity 0.4s ease 0.1s" }}
        >
          — {urduMeanings[wordIndex]} —
        </p>

        {/* Main heading */}
        <h1
          className="font-serif font-normal leading-[1.08] tracking-[-0.02em] text-[#F5ECD7] max-w-4xl"
          style={{
            fontSize: "clamp(38px, 6.5vw, 82px)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          A quiet corner in the
          <br />
          <span
            className="font-serif italic"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(245,236,215,0.45)",
            }}
          >
            heart of the chaos.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-[rgba(245,236,215,0.5)] font-sans font-light tracking-[0.07em] leading-[1.75] max-w-md mt-7 mb-14"
          style={{
            fontSize: "clamp(14px, 1.6vw, 17px)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.45s",
          }}
        >
          Heritage recipes from 1974. Hand-pulled Sulemani chai.
          <br />
          Come for the samosa, stay for the stories.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 items-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.65s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.65s",
          }}
        >
          <PrimaryBtn>Explore Our Menu</PrimaryBtn>
          <SecondaryBtn>Reserve a Table</SecondaryBtn>
        </div>

        {/* Ornament divider */}
        <div
          className="flex items-center gap-5 mt-20"
          style={{
            opacity: loaded ? 0.4 : 0,
            transition: "opacity 1s ease 1s",
          }}
        >
          <div className="w-16 h-px bg-[rgba(230,126,34,0.5)]" />
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#E67E22" />
          </svg>
          <div className="w-16 h-px bg-[rgba(230,126,34,0.5)]" />
        </div>

        {/* Tag chips */}
        <div
          className="flex flex-wrap justify-center gap-3 mt-8"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease 1.1s",
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-5 py-[7px] rounded-full border border-[rgba(245,236,215,0.12)]
                         bg-[rgba(245,236,215,0.03)] text-[rgba(245,236,215,0.4)]
                         text-[10px] tracking-[0.15em] uppercase font-sans backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </main>

      {/* ══════════════════════════════
          BOTTOM BAR
      ══════════════════════════════ */}
      <footer
        className="relative z-10 flex flex-col md:flex-row items-center justify-between
                   gap-4 px-10 md:px-14 py-6 border-t border-[rgba(245,236,215,0.07)]"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.4s ease 1.2s",
        }}
      >
        <div className="flex items-center gap-2">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="rgba(230,126,34,0.7)"
            />
          </svg>
          <span className="text-[rgba(245,236,215,0.35)] text-[11px] tracking-[0.1em] font-sans">
            #42, Meenakshi Koil St · Shivajinagar · Bengaluru
          </span>
        </div>

        <span className="text-[rgba(245,236,215,0.28)] text-[10px] tracking-[0.15em] uppercase font-sans">
          Open Daily · 7 AM – 9 PM
        </span>

        <div className="flex gap-6">
          {["Instagram", "WhatsApp"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-[rgba(245,236,215,0.28)] text-[10px] tracking-[0.12em] uppercase font-sans
                         no-underline transition-colors duration-300 hover:text-[#E67E22]"
            >
              {s}
            </a>
          ))}
        </div>
      </footer>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes steam {
          0%   { opacity: 0;   transform: translateY(0)     scaleX(1);   }
          20%  { opacity: 0.6;                                            }
          80%  { opacity: 0.2;                                            }
          100% { opacity: 0;   transform: translateY(-60px) scaleX(1.5); }
        }
      `}</style>
    </div>
  );
}

/* ─── Primary CTA ─── */
function PrimaryBtn({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="px-9 py-4 rounded-sm text-[11px] tracking-[0.22em] uppercase font-sans font-semibold
                 cursor-pointer transition-all duration-300"
      style={{
        background: hov ? "#CF6D17" : "#E67E22",
        color: "#0C1A10",
        border: "none",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hov
          ? "0 12px 40px rgba(230,126,34,0.45)"
          : "0 4px 20px rgba(230,126,34,0.22)",
      }}
    >
      {children}
    </button>
  );
}

/* ─── Secondary CTA ─── */
function SecondaryBtn({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="px-9 py-4 rounded-sm text-[11px] tracking-[0.22em] uppercase font-sans font-normal
                 bg-transparent cursor-pointer transition-all duration-300"
      style={{
        color: hov ? "#F5ECD7" : "rgba(245,236,215,0.55)",
        border: `1px solid ${hov ? "rgba(245,236,215,0.5)" : "rgba(245,236,215,0.18)"}`,
        transform: hov ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {children}
    </button>
  );
}