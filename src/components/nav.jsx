import React from "react";

const Navbar = ({ isLoaded }) => {
  const navLinks = ["Our Menu", "The Vibe", "Find Us"];

  const linkClasses = "text-[rgba(245,236,215,0.5)] text-[11px] tracking-[0.2em] uppercase font-sans font-normal transition-colors duration-300 hover:text-[#E67E22]";

    return (
      <nav
        className="relative z-10 flex items-center justify-between px-10 md:px-14 py-7"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-4" onClick={e=>window.location.href="/"}>
          <div className="w-11 h-11 rounded-full border border-[rgba(230,126,34,0.5)] flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border border-[rgba(230,126,34,0.3)] flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-[#E67E22]" />
            </div>
          </div>
          <div>
            <p className="text-[#F5ECD7] text-[13px] tracking-[0.25em] uppercase font-serif font-normal">
              Sultana's
            </p>
            <p className="text-[rgba(245,236,215,0.4)] text-[9px] tracking-[0.2em] uppercase font-sans font-light">
              Est. 1974 · Shivajinagar
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {[["Our Menu","/menu"], ["The Vibe","/about"], ["Find Us","/contact"]].map((item) => (
            <a
              key={Array.isArray(item) ? item[0] : item}
              href={Array.isArray(item) ? item[1] : "#"}
              className="text-[rgba(245,236,215,0.5)] text-[11px] tracking-[0.2em] uppercase font-sans font-normal
                         transition-colors duration-300 hover:text-[#E67E22]"
            >
              {Array.isArray(item) ? item[0] : item}
            </a>
          ))}
        </div>
      </nav>
  );
};

export default Navbar;