import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/sacia-logo.jpg.asset.json";

const links = [
  { hash: "about", label: "About" },
  { hash: "categories", label: "Categories" },
  { hash: "eligibility", label: "Eligibility" },
  { hash: "timeline", label: "Timeline" },
  { hash: "partners", label: "Partners" },
  { hash: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // determine active section
      let current = "";
      for (const l of links) {
        const el = document.getElementById(l.hash);
        if (el && el.getBoundingClientRect().top <= 120) current = l.hash;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (hash: string) => {
    setOpen(false);
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.href = `/#${hash}`;
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy/90 backdrop-blur-md border-b border-gold/20" : "bg-navy/40 backdrop-blur-sm"
      }`}
    >
      <div className="container-prose flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={logoAsset.url} alt="SIA logo" className="h-10 md:h-12 w-auto object-contain" />
          <span className="font-display text-xl md:text-2xl tracking-tight text-gold-light group-hover:text-gold transition hidden sm:inline">
            SIA<span className="text-white/90 font-sans text-xs align-top ml-1">2026</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => {
            const isActive = active === l.hash;
            return (
              <button
                key={l.hash}
                onClick={() => go(l.hash)}
                className={`relative text-sm tracking-wide transition ${
                  isActive ? "text-gold-light" : "text-white/85 hover:text-white"
                }`}
              >
                {l.label}
                {isActive && <span className="absolute -bottom-2 left-0 right-0 h-px bg-gold" />}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go("apply")}
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-sm bg-gold text-navy text-sm font-semibold tracking-wide hover:bg-gold-light transition shadow-[0_0_0_1px_rgba(240,192,64,0.4)]"
          >
            Apply Now
          </button>
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden p-2 text-white" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-deep/98 backdrop-blur-lg border-t border-gold/20">
          <nav className="container-prose py-6 flex flex-col gap-4">
            {links.map((l) => (
              <button
                key={l.hash}
                onClick={() => go(l.hash)}
                className={`text-left text-base ${active === l.hash ? "text-gold-light" : "text-white/85"}`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("apply")}
              className="mt-2 inline-flex justify-center px-5 py-3 rounded-sm bg-gold text-navy font-semibold"
            >
              Apply Free
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
