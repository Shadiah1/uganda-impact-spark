import { Facebook, Instagram, Twitter, Music2, Mail, Phone } from "lucide-react";
import logoAsset from "@/assets/sacia-logo.jpg.asset.json";

const sections = [
  ["about", "About SIA"],
  ["categories", "Award Categories"],
  ["eligibility", "Eligibility & FAQ"],
  ["timeline", "Timeline"],
  ["partners", "Partners"],
  ["apply", "Apply Now"],
  ["contact", "Contact"],
] as const;

export function Footer() {
  const go = (hash: string) => {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <footer className="bg-navy-deep text-white/80 mt-24">
      <div className="hairline-gold" />
      <div className="container-prose py-16 grid gap-12 md:grid-cols-3">
        <div>
          <img src={logoAsset.url} alt="SIA logo" className="h-16 w-auto object-contain mb-3" />
          <p className="mt-4 text-sm leading-relaxed text-white/65 max-w-xs">
            The Student Impact Awards celebrate Uganda's boldest young innovators
            aged 9–24 — organised by the Malaika Children's Initiative.
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
            {sections.map(([hash, label]) => (
              <li key={hash}>
                <button onClick={() => go(hash)} className="hover:text-gold-light transition">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-5">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>Malaika Children's Initiative</li>
            <li>Makerere Innovation & Incubation Centre, Kampala</li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-gold-light" />
              <a href="mailto:studentimpactawards@gmail.com" className="hover:text-gold-light break-all">
                studentimpactawards@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-gold-light" />
              <a href="tel:+256779753082" className="hover:text-gold-light">
                +256 779 753 082
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs text-gold-light/90 tracking-wide">
            Applications are FREE
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-prose py-6 flex flex-col md:flex-row justify-between text-xs text-white/50">
          <span>© 2026 Malaika Children's Initiative. All rights reserved.</span>
          <span>Student Impact Awards — 8 September 2026, Kampala.</span>
        </div>
      </div>
    </footer>
  );
}
