import { createFileRoute, Link } from "@tanstack/react-router";
import { CountdownTimer } from "@/components/CountdownTimer";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { CATEGORIES } from "@/lib/categories";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Impact Awards 2026 — Uganda's Students. Unstoppable Impact." },
      {
        name: "description",
        content:
          "Uganda's national student innovation awards. Celebrating bold innovators aged 9–24 across 12 categories. 8 September 2026, Kampala. Apply free.",
      },
      { property: "og:title", content: "Student Impact Awards 2026" },
      { property: "og:description", content: "Apply free — Uganda's biggest student awards." },
    ],
  }),
  component: Home,
});

const STATS = [
  ["12", "Award Categories"],
  ["9–24", "Age Range"],
  ["300+", "Expected Nominees"],
  ["25 Jul", "Application Deadline"],
];

const TIMELINE = [
  ["Jun", "Launch & Outreach"],
  ["25 Jul", "Applications Close"],
  ["Aug", "Judging & Shortlist"],
  ["8 Sep", "Awards Gala"],
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_30%,#F0C040_0%,transparent_40%),radial-gradient(circle_at_80%_70%,#4B0082_0%,transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,26,46,0)_0%,rgba(17,17,31,0.6)_100%)]" />
        <div className="container-prose relative pt-32 pb-20 md:py-0 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/[0.06] text-xs uppercase tracking-[0.25em] text-gold-light">
              <Sparkles size={12} /> Edition 1 — Kampala 2026
            </div>
            <h1 className="mt-6 font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.98]">
              Uganda's Students.
              <br />
              <span className="gold-shimmer">Unstoppable Impact.</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed">
              The Student Impact Awards 2026 celebrates Uganda's boldest
              innovators aged 9–24 — before their first degree.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-sm bg-gold text-navy font-semibold tracking-wide hover:bg-gold-light transition shadow-[0_8px_30px_-8px_rgba(200,150,12,0.6)]"
              >
                Apply Free <ArrowRight size={16} />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-sm border border-white/30 text-white hover:border-gold hover:text-gold-light transition"
              >
                Explore Awards
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-sm border border-gold/20 bg-white/[0.03] backdrop-blur p-6 md:p-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
                Awards Gala In
              </div>
              <div className="mt-5">
                <CountdownTimer />
              </div>
              <div className="mt-6 pt-5 border-t border-white/10 text-sm text-white/70">
                <div className="font-display text-xl text-white">8 September 2026</div>
                <div className="text-xs mt-1 text-white/55">
                  Makerere Innovation & Incubation Centre · Kampala
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-y border-border">
        <div className="container-prose py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8">
          {STATS.map(([n, l], i) => (
            <div
              key={l}
              className={`text-center px-4 ${
                i !== 0 ? "md:border-l border-border" : ""
              }`}
            >
              <div className="font-display text-4xl md:text-5xl text-navy">{n}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-24 md:py-32">
        <div className="container-prose grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
            <div className="aspect-[4/5] rounded-sm bg-gradient-to-br from-navy via-purple/40 to-navy relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F0C040_0%,transparent_60%)] opacity-30" />
              <div className="absolute inset-8 border border-gold/30 grid place-items-center">
                <div className="text-center text-white">
                  <div className="font-display text-7xl text-gold-light">SIA</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.4em] text-white/60">
                    Est. 2026 · Kampala
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={120}>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold">About SIA</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy leading-tight">
                A national stage for Uganda's pre-degree changemakers.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Born from the Malaika Children Initiative's Youth Leaders
                programme, the Student Impact Awards spotlight the inventors,
                organisers and artists already shifting their communities —
                long before convocation. Every category aligns with the UN
                Sustainable Development Goals.
              </p>
              <Link
                to="/about"
                className="mt-7 inline-flex items-center gap-2 text-navy font-semibold border-b-2 border-gold pb-1 hover:text-gold transition"
              >
                Read the full story <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="py-24 bg-off-white border-y border-border">
        <div className="container-prose">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold">12 Categories</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl text-navy">
                Where impact is recognised.
              </h2>
            </div>
            <Link to="/categories" className="text-sm font-semibold text-navy border-b-2 border-gold pb-1">
              View all categories →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.slice(0, 6).map((c, i) => (
              <AnimateOnScroll key={c.id} delay={i * 60}>
                <Link
                  to="/categories"
                  className="block h-full p-7 bg-white border border-border rounded-sm hover:border-gold transition group"
                >
                  <div className="text-4xl">{c.icon}</div>
                  <h3 className="mt-5 font-display text-2xl text-navy group-hover:text-gold transition">
                    {c.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {c.description}
                  </p>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE PREVIEW */}
      <section className="py-24">
        <div className="container-prose">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Roadmap</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-navy">
              Four months. One stage.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TIMELINE.map(([date, title], i) => (
              <div key={title} className="relative">
                <div className="absolute -top-3 left-0 w-12 h-px bg-gold" />
                <div className="text-xs uppercase tracking-[0.25em] text-gold-light bg-navy inline-block px-2 py-1">
                  Step {i + 1}
                </div>
                <div className="mt-4 font-display text-2xl text-navy">{date}</div>
                <div className="mt-1 text-sm text-muted-foreground">{title}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/timeline" className="text-sm font-semibold text-navy border-b-2 border-gold pb-1">
              See the full timeline →
            </Link>
          </div>
        </div>
      </section>

      {/* SPONSOR CTA */}
      <section className="bg-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_70%_30%,#F0C040_0%,transparent_50%)]" />
        <div className="container-prose relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold-light">For Partners</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
              Partner with Uganda's most exciting student platform.
            </h2>
            <p className="mt-5 text-white/70 text-lg max-w-xl">
              Reach 300+ vetted student innovators, 50+ schools and a national
              broadcast audience. Co-create the future of Ugandan talent.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy rounded-sm font-semibold hover:bg-gold-light transition"
            >
              Become a Partner <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
