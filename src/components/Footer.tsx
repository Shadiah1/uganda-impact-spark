import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Music2 } from "lucide-react";
import logoAsset from "@/assets/sacia-logo.jpg.asset.json";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80 mt-24">
      <div className="hairline-gold" />
      <div className="container-prose py-16 grid gap-12 md:grid-cols-3">
        <div>
          <img src={logoAsset.url} alt="SIA logo" className="h-16 w-auto object-contain mb-3" />
          <p className="mt-4 text-sm leading-relaxed text-white/65 max-w-xs">
            The Student Impact Awards celebrate Uganda's boldest young innovators
            aged 9–24 — organised by the Malaika Children Initiative.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Music2, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition"
                aria-label="Social link"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-5">Explore</h4>
          <ul className="space-y-3 text-sm">
            {[
              ["/about", "About SIA"],
              ["/categories", "Award Categories"],
              ["/eligibility", "Eligibility & FAQ"],
              ["/timeline", "Timeline"],
              ["/partners", "Partners"],
              ["/apply", "Apply Now"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold-light transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-5">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>Malaika Children Initiative</li>
            <li>Makerere University, Kampala</li>
            <li>
              <a href="mailto:hello@sia.ug" className="hover:text-gold-light">
                hello@sia.ug
              </a>
            </li>
            <li>
              <a href="mailto:partners@sia.ug" className="hover:text-gold-light">
                partners@sia.ug
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs text-gold-light/90 tracking-wide">
            Applications are FREE — sia.ug
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-prose py-6 flex flex-col md:flex-row justify-between text-xs text-white/50">
          <span>© 2026 Malaika Children Initiative. All rights reserved.</span>
          <span>Student Impact Awards — 8 September 2026, Kampala.</span>
        </div>
      </div>
    </footer>
  );
}
