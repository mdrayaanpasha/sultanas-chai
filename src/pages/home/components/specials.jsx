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

const items = [
  {
    number: "01",
    urdu: "سموسہ",
    name: "The Heritage Mutton Samosa",
    tag: "Famous 4 PM",
    desc: "A 30-year-old spice blend, slow-cooked kheema, folded into hand-pulled pastry that flakes when you bite it. Served with two chutneys — green and tamarind. Not negotiable.",
    note: "Best ordered at 4 PM sharp. They sell out.",
    image: "https://ik.imagekit.io/yylpuqff5/ASSIGNMENTs/samosa.png",
    flip: false,
  },
  {
    number: "02",
    urdu: "سلیمانی",
    name: "Sulemani Chai",
    tag: "The Signature",
    desc: "Black tea, pulled from height to raise the froth, cut with just enough cardamom to make you close your eyes. No milk. No shortcuts. Served in a glass so you see the colour.",
    note: "Pairs with anything. Goes with everything.",
    image: "https://ik.imagekit.io/yylpuqff5/ASSIGNMENTs/sulaimani.png",
    flip: true,
  },
  {
    number: "03",
    urdu: "دلخوش",
    name: "Khoya Dilkhush",
    tag: "House Sweet",
    desc: "Mawa stuffed in flaky pastry, finished with a silver leaf. The name means 'happy heart' — nani's words, not ours. Made in small batches each morning and gone by noon.",
    note: "Order extra. You'll regret it if you don't.",
    image: "https://ik.imagekit.io/yylpuqff5/ASSIGNMENTs/puffs.png",
    flip: false,
  },
  {
    number: "04",
    urdu: "ایرانی",
    name: "Irani Chai & Osmania",
    tag: "Morning Ritual",
    desc: "Strong, milky Irani chai served in a wide ceramic cup alongside two butter-crisp Osmania biscuits. The combination that half of Shivajinagar grew up with. Now you will too.",
    note: "Served only until 11 AM.",
    image: "https://ik.imagekit.io/yylpuqff5/ASSIGNMENTs/tea.png",
    flip: true,
  },
];

function MenuItem({ item, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const delay = index * 0.15;

  return (
    <div
      className="relative grid grid-cols-1 md:grid-cols-12 gap-0 group border-b border-[rgba(245,236,215,0.06)] last:border-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + 0.2}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + 0.2}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Number + Urdu Column ── */}
      <div className={`md:col-span-1 flex flex-col justify-center items-center py-10 relative z-10 ${item.flip ? "md:order-3" : "md:order-1"}`}>
        <span className="font-serif text-[rgba(230,126,34,0.15)] leading-none text-5xl md:text-7xl">
          {item.number}
        </span>
        <div className="w-px h-8 bg-[rgba(230,126,34,0.15)] my-2" />
        <span className="font-serif text-[rgba(230,126,34,0.3)] text-xl [writing-mode:vertical-rl]">
          {item.urdu}
        </span>
      </div>

  {/* ── Photo Column (1:1 Ratio) ── */}
<div className={`md:col-span-5 flex items-center justify-center py-12 relative z-10 md:order-2`}>
  <div
    className="relative aspect-square w-64 md:w-80 flex items-center justify-center overflow-hidden"
    style={{
      transform: hovered ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
    }}
  >
    <img 
      src={item.image} 
      alt={item.name} 
      className="w-full h-full object-cover drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
    />
  </div>
</div>

      {/* ── Content Column ── */}
      <div className={`md:col-span-6 flex flex-col justify-center px-6 md:px-14 py-10 relative z-10 ${item.flip ? "md:order-1" : "md:order-3"}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-px bg-[#E67E22]/50" />
          <span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">
            {item.tag}
          </span>
        </div>

        <h3 className="font-serif text-[#F5ECD7] leading-tight mb-4 text-3xl md:text-4xl">
          {item.name}
        </h3>

        <p className="text-[#F5ECD7]/50 font-sans font-light leading-relaxed mb-6 text-sm md:text-base max-w-md">
          {item.desc}
        </p>

        <div className="flex items-start gap-3 border-l-2 border-[#E67E22]/30 pl-4 py-1">
          <p className="text-[#F5ECD7]/30 font-sans text-[11px] tracking-wider italic">
            {item.note}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SultanasFeatured() {
  const [sectionRef, inView] = useInView(0.05);

  return (
    <section ref={sectionRef} className="relative bg-[#0C1A10] overflow-hidden py-24">
      {/* Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-40 z-[1] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-20 transition-all duration-1000" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-px bg-[#E67E22]" />
            <span className="text-[#E67E22] text-[10px] tracking-widest uppercase">The Classics</span>
          </div>
          <h2 className="font-serif text-[#F5ECD7] text-5xl md:text-7xl">
            Signature <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#E67E22] to-[#D4A017]">Flavors</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {items.map((item, i) => (
            <MenuItem key={item.number} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}