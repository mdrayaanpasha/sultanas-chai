import { useState, useEffect, useRef } from "react";

/* ─── Intersection hook ─── */
function useInView(threshold = 0.15) {
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

/* ─── Animated SVG path ─── */
function AnimatedPath({ d, stroke, strokeWidth = 1.2, length, delay = 0, inView, className = "" }) {
  return (
    <path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className={className}
      style={{
        strokeDasharray: length,
        strokeDashoffset: inView ? 0 : length,
        transition: `stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    />
  );
}

/* ─── Sultana's Real Handwriting SVG Signature ─── */
function Signature({ inView }) {
  return (
    <svg
      viewBox="0 0 340 90"
      className="w-72 md:w-80 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* S - sweeping capital */}
      <AnimatedPath
        d="M 18 52 C 14 38, 20 22, 32 20 C 44 18, 52 28, 46 38 C 40 48, 26 50, 24 60 C 22 70, 32 78, 46 72"
        stroke="#E67E22" strokeWidth={1.8} length={130} delay={0.2} inView={inView}
      />
      {/* u-l-t-a */}
      <AnimatedPath
        d="M 54 38 C 54 38, 52 58, 56 62 C 60 66, 64 60, 66 54 C 68 48, 68 62, 72 64 C 76 66, 80 56, 82 48 L 82 70"
        stroke="#E67E22" strokeWidth={1.5} length={120} delay={0.5} inView={inView}
      />
      {/* n */}
      <AnimatedPath
        d="M 88 70 L 88 44 C 88 44, 90 36, 98 38 C 106 40, 106 54, 106 70"
        stroke="#E67E22" strokeWidth={1.5} length={80} delay={0.75} inView={inView}
      />
      {/* a */}
      <AnimatedPath
        d="M 120 52 C 116 44, 108 44, 108 54 C 108 64, 116 68, 122 62 L 122 70"
        stroke="#E67E22" strokeWidth={1.5} length={70} delay={0.95} inView={inView}
      />
      {/* long descender / flourish under Sultana */}
      <AnimatedPath
        d="M 18 80 C 40 86, 80 88, 122 84"
        stroke="rgba(230,126,34,0.35)" strokeWidth={1} length={110} delay={1.1} inView={inView}
      />

      {/* ─ gap ─ */}

      {/* B */}
      <AnimatedPath
        d="M 140 28 L 140 72 M 140 28 C 155 26, 162 34, 158 40 C 154 46, 140 46, 140 46 C 156 46, 164 54, 160 62 C 156 70, 140 70, 140 70"
        stroke="#E67E22" strokeWidth={1.8} length={150} delay={1.25} inView={inView}
      />
      {/* e */}
      <AnimatedPath
        d="M 172 56 C 172 48, 166 44, 162 50 C 158 56, 160 66, 170 66 C 178 66, 180 60, 178 56"
        stroke="#E67E22" strokeWidth={1.5} length={75} delay={1.5} inView={inView}
      />
      {/* g */}
      <AnimatedPath
        d="M 196 48 C 190 44, 182 46, 182 56 C 182 66, 190 70, 198 66 L 198 74 C 198 82, 190 84, 184 80"
        stroke="#E67E22" strokeWidth={1.5} length={90} delay={1.68} inView={inView}
      />
      {/* u */}
      <AnimatedPath
        d="M 204 48 L 204 64 C 204 70, 208 72, 214 68 L 214 48"
        stroke="#E67E22" strokeWidth={1.5} length={60} delay={1.85} inView={inView}
      />
      {/* m */}
      <AnimatedPath
        d="M 220 68 L 220 48 C 220 44, 224 42, 230 44 C 236 46, 236 56, 236 68 M 236 56 C 236 44, 242 42, 248 46 C 252 50, 252 60, 252 68"
        stroke="#E67E22" strokeWidth={1.5} length={110} delay={2.0} inView={inView}
      />

      {/* ─ Underline flourish for Begum ─ */}
      <AnimatedPath
        d="M 138 78 C 170 84, 220 86, 258 80 C 270 78, 278 74, 300 76"
        stroke="rgba(230,126,34,0.4)" strokeWidth={1} length={170} delay={2.2} inView={inView}
      />

      {/* ─ Final ink flick / dot ─ */}
      <circle
        cx="306" cy="75" r="2"
        fill="#E67E22"
        style={{
          opacity: inView ? 0.7 : 0,
          transition: "opacity 0.3s ease 2.5s",
        }}
      />
    </svg>
  );
}

/* ─── Floating spice particle ─── */
function SpiceParticle({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: "3px", height: "3px",
        background: "#E67E22",
        ...style,
      }}
    />
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function SultanasAbout() {
  const [sectionRef, inView] = useInView(0.1);

  const reveal = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C1A10] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >

      {/* ── Grain ── */}
      <div className="pointer-events-none absolute inset-0 opacity-50 z-[1]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")` }}
      />

      {/* ── Full bleed geometric background lines ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2]" preserveAspectRatio="xMidYMid slice">
        {/* Diagonal grid lines */}
        {[0,1,2,3,4].map(i => (
          <line key={i}
            x1={`${-20 + i * 30}%`} y1="0%" x2={`${20 + i * 30}%`} y2="100%"
            stroke="rgba(230,126,34,0.04)" strokeWidth="1"
          />
        ))}
        {/* Top-right corner bracket */}
        <path d="M 85% 4%, L 97% 4%, L 97% 18%" stroke="rgba(230,126,34,0.15)" strokeWidth="1" fill="none" />
        {/* Bottom-left corner bracket */}
        <path d="M 3% 82%, L 3% 96%, L 16% 96%" stroke="rgba(230,126,34,0.15)" strokeWidth="1" fill="none" />
      </svg>

      {/* ── Saffron ambient glow top-right ── */}
      <div className="pointer-events-none absolute -top-20 right-0 w-[500px] h-[500px] rounded-full z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(230,126,34,0.1) 0%, transparent 65%)" }} />
      {/* ── Emerald glow bottom-left ── */}
      <div className="pointer-events-none absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(27,94,32,0.2) 0%, transparent 65%)" }} />

      {/* ── Floating spice dots ── */}
      {[
        { top: "12%", left: "8%", opacity: 0.4, animation: "float1 6s ease-in-out infinite" },
        { top: "35%", right: "6%", opacity: 0.3, animation: "float2 8s ease-in-out infinite 1s" },
        { top: "68%", left: "14%", opacity: 0.25, animation: "float1 7s ease-in-out infinite 2s" },
        { bottom: "18%", right: "12%", opacity: 0.35, animation: "float2 5s ease-in-out infinite 0.5s" },
        { top: "52%", left: "48%", opacity: 0.15, animation: "float1 9s ease-in-out infinite 3s" },
      ].map((s, i) => <SpiceParticle key={i} style={s} />)}

      {/* ══════════════════════ LAYOUT ══════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-0">

        {/* ── LEFT COLUMN — Year pillar + vertical text ── */}
        <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center gap-6 relative">
          {/* Vertical rule */}
          <div
            className="w-px bg-[rgba(230,126,34,0.2)]"
            style={{
              height: inView ? "100%" : "0%",
              transition: "height 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s",
              position: "absolute",
              top: 0,
            }}
          />
          {/* Vertical label */}
          <span
            className="text-[rgba(230,126,34,0.45)] text-[9px] tracking-[0.35em] uppercase font-sans"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              ...reveal(0.6),
            }}
          >
            Since 1974 · Shivajinagar
          </span>
        </div>

        {/* ── CENTER COLUMN — Main content ── */}
        <div className="md:col-span-7 md:px-10 flex flex-col justify-center">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-8" style={reveal(0.1)}>
            <div className="w-8 h-px bg-[rgba(230,126,34,0.5)]" />
            <span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">
              The Story Behind the Chai
            </span>
          </div>

          {/* Primary line — big editorial */}
          <div style={reveal(0.2)} className="mb-2">
            <h2
              className="font-serif text-[#F5ECD7] leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
            >
              My nani ground
            </h2>
            <h2
              className="font-serif leading-[1.05] tracking-[-0.03em]"
              style={{
                fontSize: "clamp(36px, 5.5vw, 68px)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(230,126,34,0.6)",
                fontStyle: "italic",
              }}
            >
              these spices by hand.
            </h2>
            <h2
              className="font-serif text-[#F5ECD7] leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
            >
              Now I do.
            </h2>
          </div>

          {/* Small breath line */}
          <div className="w-16 h-px bg-[rgba(230,126,34,0.3)] my-8" style={reveal(0.38)} />

          {/* Body copy */}
          <p
            className="text-[rgba(245,236,215,0.58)] font-sans font-light leading-[1.9] max-w-lg"
            style={{ fontSize: "clamp(13px, 1.4vw, 15.5px)", letterSpacing: "0.04em", ...reveal(0.48) }}
          >
            Sultana's opened on this same narrow corner of Meenakshi Koil Street in{" "}
            <span className="text-[rgba(245,236,215,0.85)]">1974</span> — a small room, a brass kettle,
            and recipes my grandmother never wrote down because she said{" "}
            <em className="text-[#E67E22] not-italic" style={{ fontStyle: "italic" }}>
              "the hands remember."
            </em>
          </p>

          <p
            className="text-[rgba(245,236,215,0.58)] font-sans font-light leading-[1.9] max-w-lg mt-5"
            style={{ fontSize: "clamp(13px, 1.4vw, 15.5px)", letterSpacing: "0.04em", ...reveal(0.58) }}
          >
            Fifty years later, we're still pulling chai the same way, still
            hand-folding every samosa before the{" "}
            <span className="text-[rgba(245,236,215,0.85)]">4 PM rush.</span>{" "}
            The neighbourhood got louder. We stayed quiet. Just come hungry.
          </p>

          {/* Signature block */}
          <div className="mt-14" style={reveal(0.72)}>
            <Signature inView={inView} />
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[rgba(245,236,215,0.3)] text-[10px] tracking-[0.25em] uppercase font-sans">
                Founder & Head of Kitchen
              </span>
              <div className="flex-1 h-px bg-[rgba(245,236,215,0.07)]" />
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Visual block ── */}
        <div className="hidden md:flex md:col-span-4 flex-col justify-center items-end gap-6 relative pl-10">

          {/* Big year stamp */}
          <div
            className="absolute top-[5%] right-0 font-serif text-[rgba(230,126,34,0.06)] leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(100px, 14vw, 180px)",
              opacity: inView ? 1 : 0,
              transition: "opacity 1.2s ease 0.4s",
            }}
          >
            1974
          </div>

          {/* Stat card 1 */}
          <StatCard
            inView={inView} delay={0.5}
            top="50 Years" sub="of the same recipe"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#E67E22" strokeWidth="1"/>
                <path d="M12 6v6l4 2" stroke="#E67E22" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            }
          />

          {/* Decorative brass kettle sketch */}
          <div
            className="relative"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1s ease 0.7s, transform 1s ease 0.7s",
            }}
          >
            <svg viewBox="0 0 160 200" className="w-36 opacity-[0.18]" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Kettle body */}
              <path d="M 50 80 C 40 80, 28 90, 28 115 C 28 145, 45 170, 80 172 C 115 170, 132 145, 132 115 C 132 90, 120 80, 110 80 Z"
                stroke="#E67E22" strokeWidth="1.5" />
              {/* Spout */}
              <path d="M 28 108 C 16 100, 8 88, 14 78 C 20 68, 30 72, 30 82"
                stroke="#E67E22" strokeWidth="1.5" />
              {/* Handle */}
              <path d="M 132 95 C 150 95, 158 110, 150 125 C 142 140, 132 135, 132 128"
                stroke="#E67E22" strokeWidth="1.5" />
              {/* Lid */}
              <path d="M 55 80 C 55 65, 105 65, 105 80"
                stroke="#E67E22" strokeWidth="1.5" />
              <circle cx="80" cy="60" r="6" stroke="#E67E22" strokeWidth="1.2" />
              {/* Steam lines */}
              <path d="M 68 48 C 66 40, 72 32, 68 24" stroke="#E67E22" strokeWidth="1" strokeLinecap="round" />
              <path d="M 80 44 C 78 36, 84 28, 80 20" stroke="#E67E22" strokeWidth="1" strokeLinecap="round" />
              <path d="M 92 48 C 90 40, 96 32, 92 24" stroke="#E67E22" strokeWidth="1" strokeLinecap="round" />
              {/* Decorative band */}
              <path d="M 38 120 C 50 124, 110 124, 122 120" stroke="#E67E22" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Stat card 2 */}
          <StatCard
            inView={inView} delay={0.85}
            top="Hand-pulled" sub="every single glass, daily"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="#E67E22" strokeWidth="1" strokeLinecap="round"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="#E67E22" strokeWidth="1" strokeLinecap="round"/>
                <line x1="6" y1="1" y2="4" x2="6" stroke="#E67E22" strokeWidth="1" strokeLinecap="round"/>
                <line x1="10" y1="1" y2="4" x2="10" stroke="#E67E22" strokeWidth="1" strokeLinecap="round"/>
                <line x1="14" y1="1" y2="4" x2="14" stroke="#E67E22" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            }
          />

          {/* Bottom Urdu word — ghosted */}
          <div
            className="self-start font-serif text-[rgba(230,126,34,0.08)] leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(60px, 8vw, 96px)",
              fontStyle: "italic",
              opacity: inView ? 1 : 0,
              transition: "opacity 1.4s ease 0.9s",
            }}
          >
            سموسہ
          </div>

        </div>
      </div>

      {/* ── Bottom rule ── */}
      <div
        className="relative z-10 mx-6 md:mx-14 flex items-center gap-5"
        style={{
          opacity: inView ? 0.3 : 0,
          transition: "opacity 1s ease 1.3s",
        }}
      >
        <div className="flex-1 h-px bg-[rgba(230,126,34,0.35)]" />
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#E67E22" />
        </svg>
        <div className="flex-1 h-px bg-[rgba(230,126,34,0.35)]" />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-12px) translateX(5px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-8px) translateX(-6px); }
        }
      `}</style>
    </section>
  );
}

/* ─── Stat card ─── */
function StatCard({ top, sub, icon, inView, delay }) {
  return (
    <div
      className="w-full border border-[rgba(230,126,34,0.14)] bg-[rgba(230,126,34,0.04)]
                 backdrop-blur-sm px-6 py-5 flex items-start gap-4"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(20px)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-[#F5ECD7] font-serif text-lg leading-tight">{top}</p>
        <p className="text-[rgba(245,236,215,0.38)] text-[11px] tracking-[0.12em] uppercase font-sans mt-1">{sub}</p>
      </div>
    </div>
  );
}