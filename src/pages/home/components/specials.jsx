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

/* ─── Item illustrations as SVG ─── */
const SamosaIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
    {/* Glow */}
    <circle cx="100" cy="120" r="60" fill="rgba(230,126,34,0.08)" />
    {/* Samosa body */}
    <path d="M 100 45 L 155 145 L 45 145 Z"
      fill="rgba(230,126,34,0.12)" stroke="#E67E22" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Flaky pastry texture lines */}
    <path d="M 100 45 L 100 145" stroke="rgba(230,126,34,0.2)" strokeWidth="0.8" />
    <path d="M 100 45 C 115 80, 140 100, 155 145" stroke="rgba(230,126,34,0.15)" strokeWidth="0.8" />
    <path d="M 100 45 C 85 80, 60 100, 45 145" stroke="rgba(230,126,34,0.15)" strokeWidth="0.8" />
    {/* Crisp edge highlight */}
    <path d="M 100 48 L 152 143" stroke="rgba(245,236,215,0.15)" strokeWidth="1" />
    {/* Filling peek */}
    <ellipse cx="100" cy="135" rx="22" ry="6" fill="rgba(230,126,34,0.18)" stroke="rgba(230,126,34,0.3)" strokeWidth="0.8"/>
    {/* Steam lines */}
    <path d="M 88 36 C 86 26, 92 18, 88 10" stroke="rgba(230,126,34,0.4)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M 100 30 C 98 20, 104 12, 100 4" stroke="rgba(230,126,34,0.4)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M 112 36 C 110 26, 116 18, 112 10" stroke="rgba(230,126,34,0.4)" strokeWidth="1" strokeLinecap="round"/>
    {/* Plate shadow */}
    <ellipse cx="100" cy="158" rx="50" ry="8" fill="rgba(0,0,0,0.3)" />
    {/* Chutney dot */}
    <circle cx="68" cy="152" r="8" fill="rgba(34,100,34,0.35)" stroke="rgba(34,120,34,0.4)" strokeWidth="0.8"/>
    <circle cx="132" cy="152" r="8" fill="rgba(180,60,20,0.3)" stroke="rgba(200,80,30,0.4)" strokeWidth="0.8"/>
  </svg>
);

const ChaiIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
    {/* Glow */}
    <circle cx="100" cy="120" r="55" fill="rgba(230,126,34,0.07)" />
    {/* Saucer */}
    <ellipse cx="100" cy="162" rx="52" ry="10" fill="rgba(230,126,34,0.08)" stroke="rgba(230,126,34,0.25)" strokeWidth="1"/>
    {/* Glass body */}
    <path d="M 70 100 L 75 155 L 125 155 L 130 100 Z"
      fill="rgba(230,126,34,0.15)" stroke="rgba(230,126,34,0.4)" strokeWidth="1.2" strokeLinejoin="round"/>
    {/* Chai liquid level */}
    <path d="M 72 120 L 128 120" stroke="rgba(230,126,34,0.2)" strokeWidth="0.8"/>
    {/* Liquid fill gradient effect */}
    <path d="M 73 122 L 76 155 L 124 155 L 127 122 Z" fill="rgba(180,80,10,0.2)"/>
    {/* Glass highlights */}
    <path d="M 75 105 L 77 148" stroke="rgba(245,236,215,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M 125 108 L 123 145" stroke="rgba(245,236,215,0.08)" strokeWidth="1" strokeLinecap="round"/>
    {/* Handle */}
    <path d="M 130 112 C 148 112, 154 130, 148 140 C 142 150, 130 146, 130 140"
      stroke="rgba(230,126,34,0.45)" strokeWidth="1.2" fill="none"/>
    {/* Steam wisps */}
    <path d="M 88 92 C 85 80, 92 70, 88 58" stroke="rgba(230,126,34,0.5)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M 100 86 C 97 74, 104 64, 100 52" stroke="rgba(230,126,34,0.5)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M 112 92 C 109 80, 116 70, 112 58" stroke="rgba(230,126,34,0.5)" strokeWidth="1" strokeLinecap="round"/>
    {/* Foam ring at top */}
    <ellipse cx="100" cy="100" rx="30" ry="5" fill="rgba(245,210,150,0.12)" stroke="rgba(230,126,34,0.3)" strokeWidth="0.8"/>
  </svg>
);

const KhoyaIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
    <circle cx="100" cy="115" r="58" fill="rgba(230,126,34,0.07)" />
    {/* Plate */}
    <ellipse cx="100" cy="158" rx="55" ry="10" fill="rgba(230,126,34,0.08)" stroke="rgba(230,126,34,0.2)" strokeWidth="1"/>
    {/* Mithai block */}
    <rect x="55" y="100" width="90" height="55" rx="6"
      fill="rgba(220,140,60,0.18)" stroke="rgba(230,126,34,0.45)" strokeWidth="1.2"/>
    {/* Diamond top */}
    <path d="M 100 78 L 145 100 L 100 122 L 55 100 Z"
      fill="rgba(220,140,60,0.15)" stroke="rgba(230,126,34,0.4)" strokeWidth="1.2" strokeLinejoin="round"/>
    {/* Texture cross-hatch */}
    <path d="M 62 108 L 138 108" stroke="rgba(230,126,34,0.12)" strokeWidth="0.7"/>
    <path d="M 62 118 L 138 118" stroke="rgba(230,126,34,0.12)" strokeWidth="0.7"/>
    <path d="M 62 128 L 138 128" stroke="rgba(230,126,34,0.12)" strokeWidth="0.7"/>
    <path d="M 62 138 L 138 138" stroke="rgba(230,126,34,0.12)" strokeWidth="0.7"/>
    {/* Silver leaf detail */}
    <ellipse cx="100" cy="90" rx="18" ry="5" fill="rgba(245,236,215,0.08)" stroke="rgba(245,236,215,0.2)" strokeWidth="0.8"/>
    {/* Cardamom pod */}
    <ellipse cx="78" cy="152" rx="5" ry="3" fill="rgba(34,80,34,0.3)" stroke="rgba(34,100,34,0.4)" strokeWidth="0.8"/>
    <ellipse cx="122" cy="152" rx="5" ry="3" fill="rgba(34,80,34,0.3)" stroke="rgba(34,100,34,0.4)" strokeWidth="0.8"/>
    {/* Sparkle dots */}
    {[[100,75],[86,82],[114,80]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="1.5" fill="rgba(245,236,215,0.5)"/>
    ))}
  </svg>
);

const IraniChaiIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
    <circle cx="100" cy="120" r="55" fill="rgba(230,126,34,0.06)" />
    {/* Saucer */}
    <ellipse cx="100" cy="164" rx="56" ry="10" fill="rgba(230,126,34,0.07)" stroke="rgba(230,126,34,0.2)" strokeWidth="1"/>
    {/* Cup body — traditional karak wide cup */}
    <path d="M 65 105 Q 62 158 100 160 Q 138 158 135 105 Z"
      fill="rgba(180,60,10,0.14)" stroke="rgba(230,126,34,0.4)" strokeWidth="1.2"/>
    {/* Rim */}
    <ellipse cx="100" cy="105" rx="35" ry="7"
      fill="rgba(220,140,60,0.1)" stroke="rgba(230,126,34,0.35)" strokeWidth="1.2"/>
    {/* Liquid surface */}
    <ellipse cx="100" cy="105" rx="32" ry="5" fill="rgba(180,80,20,0.2)"/>
    {/* Handle */}
    <path d="M 135 118 C 152 118, 158 138, 148 148 C 140 156, 132 150, 132 144"
      stroke="rgba(230,126,34,0.4)" strokeWidth="1.2" fill="none"/>
    {/* Ornate band on cup */}
    <path d="M 67 128 Q 100 132, 133 128" stroke="rgba(230,126,34,0.2)" strokeWidth="0.8"/>
    {/* Steam */}
    <path d="M 86 94 C 83 82, 90 72, 86 60" stroke="rgba(230,126,34,0.45)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M 100 88 C 97 76, 104 66, 100 54" stroke="rgba(230,126,34,0.45)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M 114 94 C 111 82, 118 72, 114 60" stroke="rgba(230,126,34,0.45)" strokeWidth="1" strokeLinecap="round"/>
    {/* Biscuit / Osmania */}
    <rect x="56" y="152" width="20" height="10" rx="2"
      fill="rgba(230,180,80,0.15)" stroke="rgba(230,126,34,0.3)" strokeWidth="0.8"/>
    <rect x="124" y="152" width="20" height="10" rx="2"
      fill="rgba(230,180,80,0.15)" stroke="rgba(230,126,34,0.3)" strokeWidth="0.8"/>
  </svg>
);

const items = [
  {
    number: "01",
    urdu: "سموسہ",
    name: "The Heritage Mutton Samosa",
    tag: "Famous 4 PM",
    desc: "A 30-year-old spice blend, slow-cooked kheema, folded into hand-pulled pastry that flakes when you bite it. Served with two chutneys — green and tamarind. Not negotiable.",
    note: "Best ordered at 4 PM sharp. They sell out.",
    Illustration: SamosaIllustration,
    accent: "#E67E22",
    flip: false,
  },
  {
    number: "02",
    urdu: "سلیمانی",
    name: "Sulemani Chai",
    tag: "The Signature",
    desc: "Black tea, pulled from height to raise the froth, cut with just enough cardamom to make you close your eyes. No milk. No shortcuts. Served in a glass so you see the colour.",
    note: "Pairs with anything. Goes with everything.",
    Illustration: ChaiIllustration,
    accent: "#D4A017",
    flip: true,
  },
  {
    number: "03",
    urdu: "دلخوش",
    name: "Khoya Dilkhush",
    tag: "House Sweet",
    desc: "Mawa stuffed in flaky pastry, finished with a silver leaf. The name means 'happy heart' — nani's words, not ours. Made in small batches each morning and gone by noon.",
    note: "Order extra. You'll regret it if you don't.",
    Illustration: KhoyaIllustration,
    accent: "#C0A080",
    flip: false,
  },
  {
    number: "04",
    urdu: "ایرانی",
    name: "Irani Chai & Osmania",
    tag: "Morning Ritual",
    desc: "Strong, milky Irani chai served in a wide ceramic cup alongside two butter-crisp Osmania biscuits. The combination that half of Shivajinagar grew up with. Now you will too.",
    note: "Served only until 11 AM.",
    Illustration: IraniChaiIllustration,
    accent: "#E67E22",
    flip: true,
  },
];

/* ─── Single item row ─── */
function MenuItem({ item, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const delay = index * 0.15;

  return (
    <div
      className="relative grid grid-cols-1 md:grid-cols-12 gap-0 group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + 0.2}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + 0.2}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover background wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${item.flip ? "70%" : "30%"} 50%, rgba(230,126,34,0.05) 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* ── Number + Urdu column ── */}
      <div className={`md:col-span-1 flex flex-col justify-center items-center py-10 relative z-10 ${item.flip ? "md:order-3" : "md:order-1"}`}>
        <span
          className="font-serif text-[rgba(230,126,34,0.15)] leading-none"
          style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
        >
          {item.number}
        </span>
        <div className="w-px h-8 bg-[rgba(230,126,34,0.15)] my-2" />
        <span
          className="font-serif text-[rgba(230,126,34,0.3)]"
          style={{ fontSize: "20px", writingMode: "vertical-rl" }}
        >
          {item.urdu}
        </span>
      </div>

      {/* ── Illustration panel ── */}
      <div
        className={`md:col-span-4 flex items-center justify-center py-8 relative z-10 ${item.flip ? "md:order-2" : "md:order-2"}`}
      >
        <div
          className="w-48 h-48 md:w-56 md:h-56 relative"
          style={{
            transform: hovered ? "scale(1.06) translateY(-4px)" : "scale(1) translateY(0)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Plate circle behind */}
          <div
            className="absolute inset-4 rounded-full"
            style={{
              border: `1px solid rgba(230,126,34,${hovered ? 0.18 : 0.08})`,
              transition: "border-color 0.4s",
            }}
          />
          <item.Illustration />
        </div>
      </div>

      {/* ── Copy column ── */}
      <div className={`md:col-span-6 flex flex-col justify-center px-6 md:px-10 py-10 relative z-10 ${item.flip ? "md:order-1" : "md:order-3"}`}>
        {/* Tag */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-px bg-[rgba(230,126,34,0.5)]" />
          <span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">
            {item.tag}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-serif text-[#F5ECD7] leading-[1.15] mb-4"
          style={{ fontSize: "clamp(22px, 2.8vw, 34px)", letterSpacing: "-0.01em" }}
        >
          {item.name}
        </h3>

        {/* Description */}
        <p
          className="text-[rgba(245,236,215,0.5)] font-sans font-light leading-[1.85] mb-5"
          style={{ fontSize: "clamp(13px, 1.3vw, 15px)", letterSpacing: "0.04em", maxWidth: "440px" }}
        >
          {item.desc}
        </p>

        {/* Chef's note */}
        <div
          className="flex items-start gap-3 border-l-2 pl-4 py-1"
          style={{ borderColor: "rgba(230,126,34,0.3)" }}
        >
          <p className="text-[rgba(245,236,215,0.3)] font-sans text-[11px] tracking-[0.1em] leading-relaxed italic">
            {item.note}
          </p>
        </div>
      </div>

      {/* ── Divider line ── */}
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function SultanasFeatured() {
  const [sectionRef, inView] = useInView(0.05);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C1A10] overflow-hidden py-24 md:py-36"
    >
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-50 z-[1]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
      />

      {/* Background geo */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2]" preserveAspectRatio="xMidYMid slice">
        {[0,1,2,3,4].map(i => (
          <line key={i}
            x1={`${-20 + i * 30}%`} y1="0%" x2={`${20 + i * 30}%`} y2="100%"
            stroke="rgba(230,126,34,0.03)" strokeWidth="1"
          />
        ))}
        <path d="M 2% 2%, L 2% 12%, M 2% 2%, L 10% 2%" stroke="rgba(230,126,34,0.12)" strokeWidth="1" fill="none"/>
        <path d="M 98% 88%, L 98% 98%, M 98% 98%, L 90% 98%" stroke="rgba(230,126,34,0.12)" strokeWidth="1" fill="none"/>
      </svg>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(230,126,34,0.07) 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(27,94,32,0.15) 0%, transparent 65%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">

        {/* ── Section header ── */}
        <div
          className="mb-20"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-[rgba(230,126,34,0.45)]" />
            <span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">
              What We're Known For
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-serif text-[#F5ECD7] leading-[1.06] tracking-[-0.025em]"
              style={{ fontSize: "clamp(34px, 5vw, 62px)" }}
            >
              The ones people<br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(230,126,34,0.55)",
                  fontStyle: "italic",
                }}
              >
                come back for.
              </span>
            </h2>
            <p
              className="text-[rgba(245,236,215,0.35)] font-sans text-[12px] tracking-[0.12em] leading-relaxed md:text-right max-w-xs"
              style={{ letterSpacing: "0.06em" }}
            >
              Every item below has been on the menu<br className="hidden md:block"/>
              since before you were probably born.
            </p>
          </div>
        </div>

        {/* ── Items ── */}
        <div className="flex flex-col divide-y divide-[rgba(245,236,215,0.06)]">
          {items.map((item, i) => (
            <MenuItem key={item.number} item={item} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1s ease 0.9s",
          }}
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-px bg-[rgba(230,126,34,0.35)]" />
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#E67E22" opacity="0.5" />
            </svg>
            <div className="w-16 h-px bg-[rgba(230,126,34,0.35)]" />
          </div>

          <a
            href="#"
            className="group flex items-center gap-4 text-[rgba(245,236,215,0.5)] font-sans text-[11px]
                       tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[#E67E22]"
          >
            View Full Menu
            <span
              className="inline-block w-10 h-px bg-current transition-all duration-300 group-hover:w-16"
            />
          </a>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes steamrise {
          0%   { opacity: 0; transform: translateY(0) scaleX(1); }
          20%  { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-40px) scaleX(1.4); }
        }
      `}</style>
    </section>
  );
}