import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/nav";

/* ── useInView hook ── */
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

/* ── Dietary tag colours ── */
const TAG_STYLE = {
  V:  { bg: "rgba(34,120,34,0.15)",  border: "rgba(34,160,34,0.3)",  text: "rgba(100,220,100,0.8)",  label: "V"  },
  VE: { bg: "rgba(20,100,20,0.12)",  border: "rgba(34,140,34,0.25)", text: "rgba(80,200,80,0.7)",   label: "VE" },
  GF: { bg: "rgba(180,120,0,0.12)",  border: "rgba(200,160,0,0.3)",  text: "rgba(230,200,80,0.8)",  label: "GF" },
  HS: { bg: "rgba(180,30,0,0.12)",   border: "rgba(220,60,0,0.3)",   text: "rgba(255,100,60,0.8)",  label: "🌶" },
};

function Tag({ type }) {
  const s = TAG_STYLE[type];
  if (!s) return null;
  return (
    <span
      className="inline-flex items-center px-[7px] py-[2px] text-[9px] tracking-[0.15em] font-sans rounded-sm"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
    >
      {s.label}
    </span>
  );
}

/* ══════════════════════════════════════
    MENU DATA
══════════════════════════════════════ */
const MENU = [
  {
    id: "chai",
    category: "Chai & Kahwa",
    urdu: "چائے",
    note: "All chai is hand-pulled, served in glass",
    items: [
      { name: "Sulemani Chai",       desc: "Black tea pulled from height, cardamom-cut, no milk. The one we're known for.",             price: 40,  tags: ["V", "GF"], signature: true  },
      { name: "Irani Chai",          desc: "Strong milky chai in a wide ceramic cup. Comes with two Osmania biscuits.",                  price: 55,  tags: ["V"]                        },
      { name: "Kahwa",               desc: "Kashmiri green tea with saffron, almonds, and whole cardamom. Slow and aromatic.",           price: 70,  tags: ["V", "GF"]                 },
      { name: "Masala Chai",         desc: "Ginger-forward, with black pepper and tulsi. The warming kind.",                             price: 45,  tags: ["V", "GF"]                 },
      { name: "Noon Chai",           desc: "Pink salted Kashmiri chai with cream and crushed pistachios. Unusual and worth it.",         price: 75,  tags: ["V", "GF"]                 },
    ],
  },
  {
    id: "samosas",
    category: "Samosas & Snacks",
    urdu: "سموسہ",
    note: "All samosas hand-folded. Available from 3:30 PM",
    items: [
      { name: "Mutton Samosa",       desc: "A 30-year-old spice blend, slow-cooked kheema, handmade pastry. Served with two chutneys.",  price: 35,  tags: ["GF"],     signature: true },
      { name: "Aloo Samosa",         desc: "Spiced potato and green pea, with a hint of amchur. Crisp, not greasy.",                    price: 25,  tags: ["V", "GF"]                },
      { name: "Keema Pav",           desc: "Spiced minced mutton, buttered pav, raw onion, and lime. Messy and perfect.",               price: 65,  tags: ["HS"]                     },
      { name: "Bun Maska",           desc: "Irani-style bun, fresh butter, a glass of chai on the side. Non-negotiable morning ritual.", price: 40,  tags: ["V"]                      },
      { name: "Lukhmi",              desc: "Hyderabadi flat pastry squares filled with spiced mince. Crunchy at the edges, soft inside.",price: 45,  tags: []                         },
      { name: "Osmania Biscuits",    desc: "Butter-crisp, slightly sweet. Sold by the plate. Made fresh each morning.",                 price: 30,  tags: ["V"]                      },
    ],
  },
  {
    id: "mithais",
    category: "Mithais & Sweets",
    urdu: "مٹھائی",
    note: "Made in small batches daily. Gone when they're gone",
    items: [
      { name: "Khoya Dilkhush",      desc: "Mawa-stuffed flaky pastry, silver leaf finish. The name means 'happy heart'.",             price: 50,  tags: ["V"],      signature: true },
      { name: "Double Ka Meetha",    desc: "Bread halwa with saffron, ghee, fried raisins, and cashews. Dense and celebratory.",        price: 60,  tags: ["V"]                      },
      { name: "Sheer Khurma",        desc: "Vermicelli pudding with dates, rose water, and condensed milk. Served warm.",               price: 65,  tags: ["V", "GF"]                },
      { name: "Phirni",              desc: "Rice flour set custard with cardamom and pistachio, served in a clay pot.",                  price: 55,  tags: ["V", "GF"]                },
      { name: "Badam Halwa",         desc: "Slow-cooked almond halwa with saffron and ghee. Small portions, very rich.",                price: 80,  tags: ["V", "GF"]                },
      { name: "Seasonal Mithai",     desc: "Ask the counter. Changes with the calendar and Ammijaan's mood.",                          price: null, tags: ["V"]                      },
    ],
  },
  {
    id: "specials",
    category: "Kitchen Specials",
    urdu: "خاص",
    note: "Limited plates. Available lunch onwards",
    items: [
      { name: "Nihari",              desc: "Slow-braised beef shank, overnight spices, topped with ginger and fresh coriander. With pav.", price: 180, tags: ["GF", "HS"], signature: true },
      { name: "Haleem",              desc: "Cracked wheat and mutton slow-cooked for six hours. Consistency of velvet.",                price: 150, tags: ["GF"]                    },
      { name: "Mutton Biryani",      desc: "Dum-cooked, bone-in, with fried onion and saffron rice. Available Friday and Saturday only.", price: 200, tags: ["GF"]                  },
      { name: "Egg Bhurji & Pav",    desc: "Scrambled eggs with green chilli and onion, buttered pav on the side.",                    price: 80,  tags: ["V", "HS"]               },
    ],
  },
];

/* ── Single menu item row ── */
function MenuItem({ item, index, inView }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="relative flex items-start justify-between gap-4 py-5 group"
      style={{
        borderBottom: "1px solid rgba(245,236,215,0.06)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.6s ease ${0.05 * index}s, transform 0.6s ease ${0.05 * index}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="absolute inset-0 -mx-4 md:-mx-6 pointer-events-none transition-opacity duration-300 rounded-sm"
        style={{ background: "rgba(230,126,34,0.04)", opacity: hov ? 1 : 0 }}
      />

      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span
            className="font-serif leading-snug transition-colors duration-300"
            style={{
              fontSize: "clamp(14px, 1.5vw, 16px)",
              color: hov ? "#F5ECD7" : "rgba(245,236,215,0.88)",
            }}
          >
            {item.name}
          </span>
          {item.signature && (
            <span
              className="text-[9px] tracking-[0.2em] uppercase font-sans px-2 py-[3px] rounded-sm"
              style={{
                background: "rgba(230,126,34,0.12)",
                border: "1px solid rgba(230,126,34,0.25)",
                color: "#E67E22",
              }}
            >
              Signature
            </span>
          )}
          <div className="flex gap-1">
            {item.tags.map(t => <Tag key={t} type={t} />)}
          </div>
        </div>
        <p
          className="font-sans font-light leading-[1.65] pr-4"
          style={{
            fontSize: "clamp(11px, 1.2vw, 13px)",
            color: "rgba(245,236,215,0.38)",
            letterSpacing: "0.04em",
          }}
        >
          {item.desc}
        </p>
      </div>

      <div className="relative z-10 shrink-0 flex flex-col items-end">
        {item.price !== null ? (
          <span
            className="font-serif transition-colors duration-300"
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              color: hov ? "#E67E22" : "rgba(245,236,215,0.7)",
              letterSpacing: "-0.01em",
            }}
          >
            ₹{item.price}
          </span>
        ) : (
          <span
            className="font-serif italic"
            style={{ fontSize: "13px", color: "rgba(245,236,215,0.25)" }}
          >
            Ask us
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Category section ── */
function MenuSection({ section }) {
  const [ref, inView] = useInView(0.05);

  return (
    <div ref={ref} className="mb-20 md:mb-28">
      <div
        className="flex items-start justify-between gap-6 mb-8 pb-6"
        style={{ borderBottom: "1px solid rgba(230,126,34,0.18)" }}
      >
        <div>
          <div className="flex items-baseline gap-5">
            <h2
              className="font-serif text-[#F5ECD7] leading-none tracking-[-0.02em]"
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.8s ease 0.05s, transform 0.8s ease 0.05s",
              }}
            >
              {section.category}
            </h2>
            <span
              className="font-serif text-[rgba(230,126,34,0.25)] leading-none"
              style={{
                fontSize: "clamp(22px, 2.8vw, 32px)",
                fontStyle: "italic",
                opacity: inView ? 1 : 0,
                transition: "opacity 0.8s ease 0.15s",
              }}
            >
              {section.urdu}
            </span>
          </div>
          {section.note && (
            <p
              className="text-[rgba(245,236,215,0.28)] text-[11px] font-sans tracking-[0.1em] mt-2"
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 0.8s ease 0.25s",
              }}
            >
              {section.note}
            </p>
          )}
        </div>

        <div
          className="shrink-0 mt-1"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
        >
          <span
            className="text-[10px] tracking-[0.2em] font-sans"
            style={{ color: "rgba(230,126,34,0.4)" }}
          >
            {String(section.items.length).padStart(2, "0")} items
          </span>
        </div>
      </div>

      <div className="px-0 md:px-2">
        {section.items.map((item, i) => (
          <MenuItem key={item.name} item={item} index={i} inView={inView} />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
    MAIN PAGE
══════════════════════════════════════ */
export default function SultanasMenu() {
  const [activeTab, setActiveTab] = useState("all");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const displayed = activeTab === "all"
    ? MENU
    : MENU.filter(s => s.id === activeTab);

  return (
    <div className="relative min-h-screen bg-[#0C1A10] overflow-x-hidden">

      <div className="pointer-events-none fixed inset-0 z-50 opacity-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
      />

      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[2]" preserveAspectRatio="xMidYMid slice">
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={`${-20+i*30}%`} y1="0%" x2={`${20+i*30}%`} y2="100%"
            stroke="rgba(230,126,34,0.025)" strokeWidth="1" />
        ))}
      </svg>

      {/* ── SHARED NAV ── */}
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

      {/* ── MENU HEADER ── */}
      <header
        className="relative z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="px-6 md:px-14 py-14 md:py-20 relative overflow-hidden">
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[rgba(230,126,34,0.04)]
                       leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(120px, 20vw, 220px)", fontStyle: "italic" }}
          >
            قائمہ
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[rgba(230,126,34,0.45)]" />
                <span className="text-[#E67E22] text-[10px] tracking-[0.35em] uppercase font-sans">
                  The Menu
                </span>
              </div>
              <h1
                className="font-serif text-[#F5ECD7] leading-[1.04] tracking-[-0.025em]"
                style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
              >
                Everything we make,<br />
                <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(230,126,34,0.5)", fontStyle: "italic" }}>
                  made by hand.
                </span>
              </h1>
            </div>

            <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
              {Object.entries(TAG_STYLE).map(([key, s]) => (
                <div key={key} className="flex items-center gap-2">
                  <Tag type={key} />
                  <span className="text-[rgba(245,236,215,0.3)] text-[10px] font-sans tracking-[0.08em]">
                    {key === "V" ? "Vegetarian" : key === "VE" ? "Vegan" : key === "GF" ? "Gluten-free" : "Spicy"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-0 overflow-x-auto scrollbar-hide border-t border-[rgba(245,236,215,0.06)]">
          {[{ id: "all", label: "All", urdu: "" }, ...MENU.map(s => ({ id: s.id, label: s.category, urdu: s.urdu }))].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="shrink-0 flex items-center gap-2 px-6 md:px-8 py-4 text-[11px] tracking-[0.15em]
                         uppercase font-sans transition-all duration-300 relative"
              style={{
                color: activeTab === tab.id ? "#F5ECD7" : "rgba(245,236,215,0.35)",
                background: activeTab === tab.id ? "rgba(230,126,34,0.06)" : "transparent",
                borderBottom: activeTab === tab.id ? "1.5px solid #E67E22" : "1.5px solid transparent",
              }}
            >
              {tab.label}
              {tab.urdu && (
                <span className="font-serif text-[rgba(230,126,34,0.4)]"
                  style={{ fontSize: "13px", fontStyle: "italic" }}>
                  {tab.urdu}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* ── MENU CONTENT ── */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 md:px-14 py-16 md:py-24">
        {activeTab === "all" ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-0">
            <div>
              {MENU.filter((_, i) => i % 2 === 0).map(section => (
                <MenuSection key={section.id} section={section} />
              ))}
            </div>
            <div className="xl:mt-20">
              {MENU.filter((_, i) => i % 2 !== 0).map(section => (
                <MenuSection key={section.id} section={section} />
              ))}
            </div>
          </div>
        ) : (
          displayed.map(section => (
            <MenuSection key={section.id} section={section} />
          ))
        )}

        <div
          className="mt-8 pt-12 border-t border-[rgba(245,236,215,0.06)] flex flex-col md:flex-row
                     items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-3">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10" stroke="rgba(230,126,34,0.45)" strokeWidth="1.2"/>
              <path d="M12 8v4" stroke="rgba(230,126,34,0.45)" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1" fill="rgba(230,126,34,0.45)"/>
            </svg>
            <p className="text-[rgba(245,236,215,0.25)] text-[11px] font-sans leading-relaxed tracking-[0.04em] max-w-md">
              Prices are inclusive of all taxes. Menu changes with the season and availability.
              Please inform us of any allergies — we take them seriously.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-px bg-[rgba(230,126,34,0.25)]" />
            <span className="font-serif italic text-[rgba(230,126,34,0.4)] text-sm">محبت سے بنایا</span>
            <div className="w-8 h-px bg-[rgba(230,126,34,0.25)]" />
          </div>
        </div>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}