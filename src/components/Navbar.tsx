import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/sacia-logo.jpg.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/categories", label: "Categories" },
  { to: "/eligibility", label: "Eligibility" },
  { to: "/timeline", label: "Timeline" },
  { to: "/partners", label: "Partners" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/85 backdrop-blur-md border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="container-prose flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoAsset.url} alt="SIA logo" className="h-10 md:h-12 w-auto object-contain" />
          <span className="font-display text-xl md:text-2xl tracking-tight text-gold-light group-hover:text-gold transition hidden sm:inline">
            SIA<span className="text-white/90 font-sans text-xs align-top ml-1">2026</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-sm tracking-wide transition ${
                  active ? "text-gold-light" : "text-white/85 hover:text-white"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/apply"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-sm bg-gold text-navy text-sm font-semibold tracking-wide hover:bg-gold-light transition shadow-[0_0_0_1px_rgba(240,192,64,0.4)]"
          >
            Apply Now
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 text-white"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-deep/98 backdrop-blur-lg border-t border-gold/20">
          <nav className="container-prose py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-base ${
                  pathname === l.to ? "text-gold-light" : "text-white/85"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/apply"
              className="mt-2 inline-flex justify-center px-5 py-3 rounded-sm bg-gold text-navy font-semibold"
            >
              Apply Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
