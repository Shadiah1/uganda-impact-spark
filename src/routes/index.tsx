import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { CATEGORIES } from "@/lib/categories";
import { ArrowRight, Play, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import logoAsset from "@/assets/sacia-logo.jpg.asset.json";

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

const TIMELINE = [
  ["June 2026", "Launch & National Outreach", "Campaign rollout across schools, universities and youth networks nationwide."],
  ["June – 25 July 2026", "Open Call for Applications", "Free applications accepted across all 12 award categories."],
  ["26 July – 15 August 2026", "Internal Assessment & Due Diligence", "Submissions reviewed against eligibility and impact criteria."],
  ["16 – 25 August 2026", "Judges' Panel Review", "Independent panel of educators, innovators and industry leaders shortlists finalists."],
  ["28 August 2026", "Notification of Finalists", "Finalists privately notified and onboarded."],
  ["1 September 2026", "Public Announcement of Finalists", "Finalists revealed to the public and partner press."],
  ["7 September 2026", "Finalists Programme", "Mentorship sessions, masterclasses and media training in Kampala."],
  ["8 September 2026", "Awards Gala — Kampala", "Live ceremony at Makerere Innovation & Incubation Centre."],
] as const;

const PARTNERS = [
  "Malaika Children Initiative",
  "Makerere Innovation & Incubation Centre",
  "Ministry of Education & Sports",
  "UNCST",
  "NBS TV",
];

function Ribbons() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#C0392B" />
          <stop offset="100%" stopColor="#922B21" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#8B6508" />
        </linearGradient>
        <linearGradient id="g3" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#065F46" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
      </defs>
      <path
        d="M -100 700 C 200 200, 600 100, 900 350 S 1400 800, 1600 500"
        stroke="url(#g1)"
        strokeWidth="220"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M -100 850 C 300 400, 700 300, 1000 550 S 1500 950, 1700 700"
        stroke="url(#g3)"
        strokeWidth="200"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M -100 550 C 250 100, 750 50, 1050 250 S 1500 700, 1700 400"
        stroke="url(#g2)"
        strokeWidth="140"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function Home() {
  return (
    <>
      {/* HERO — full-bleed navy with curved color ribbons */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-navy text-white overflow-hidden">
        <Ribbons />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />

        <div className="relative z-10 text-center px-6 max-w-4xl mt-16">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-gold-light/90 mb-8">
            Malaika Children Initiative presents
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] tracking-tight">
            STUDENT
            <br />
            <span className="gold-shimmer">IMPACT</span>
            <br />
            AWARDS
          </h1>

          <div className="mt-8 text-sm md:text-base uppercase tracking-[0.35em] text-white/85">
            Edition 1 · Kampala · 2026
          </div>

          <Link
            to="/apply"
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-red-soft hover:bg-red-deep text-white text-sm uppercase tracking-[0.25em] font-semibold transition shadow-[0_10px_40px_-10px_rgba(192,57,43,0.7)]"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Apply by 25 July 2026
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative z-10 mt-16 mb-8 text-center text-white/60 text-xs uppercase tracking-[0.3em]">
          ↓ Scroll to explore
        </div>
      </section>

      {/* MEET THE SIA — intro narrative */}
      <section className="bg-navy text-white py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,#D4A017_0%,transparent_60%)]" />
        <div className="container-prose relative max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-4xl uppercase tracking-[0.15em] text-white/80">
            Meet the
          </h2>
          <img
            src={logoAsset.url}
            alt="Student Impact Awards"
            className="mx-auto mt-8 h-28 md:h-40 w-auto object-contain"
          />
          <p className="mt-12 text-lg md:text-xl leading-relaxed text-white/80">
            The Student Impact Awards are Uganda's boldest young changemakers. Fearless and
            persistent, they are in every district — often working quietly against the odds to
            invent, organise, teach, perform and build a more equitable Uganda. They remind us
            that progress starts with people, and that the future is already in the classroom.
          </p>
          <p className="mt-8 text-base md:text-lg leading-relaxed text-white/65">
            Each year, the Student Impact Awards programme champions student innovators aged 9 to
            24 — from primary schools to final-year undergraduates — recognising the inventors,
            journalists, athletes, artists and activists already shifting their communities, long
            before convocation.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-off-white py-28 md:py-32">
        <div className="container-prose max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl text-navy">
            About the <span className="text-gold">Student Impact Awards</span>
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/80">
            <p>
              In 2026, the Malaika Children Initiative will bring together finalists from across
              Uganda for a unique programme of coaching, mentorship and media training leading up
              to the live Student Impact Awards Ceremony, where the winners are unveiled.
            </p>
            <p>
              This year's Ceremony will take place on <strong className="text-navy">Tuesday, 8 September 2026</strong> at the{" "}
              <strong className="text-navy">Makerere Innovation & Incubation Centre</strong> in
              Kampala. It will reach national audiences through partner broadcasters and a live
              YouTube stream.
            </p>
            <p>
              The Student Impact Awards programme is powered by the Malaika Children Initiative's
              Youth Leaders pillar. Every category aligns with the UN Sustainable Development Goals
              and is made possible in partnership with Uganda's leading universities, innovation
              hubs, ministries and media houses.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white py-28 md:py-32 border-y border-border">
        <div className="container-prose max-w-5xl">
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-[0.1em] text-navy text-center">
            Timeline
          </h2>
          <div className="hairline-gold w-32 mx-auto mt-6" />

          <div className="mt-16 grid md:grid-cols-2 gap-x-16">
            {TIMELINE.map(([date, title, body], i) => (
              <AnimateOnScroll key={date} delay={i * 60}>
                <div className="py-8 border-b border-border last:border-b-0">
                  <div className="text-xs uppercase tracking-[0.3em] text-red-soft font-semibold">
                    {date}
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-navy">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS STRIP */}
      <section className="bg-off-white py-20 border-b border-border">
        <div className="container-prose">
          <div className="text-center text-xs uppercase tracking-[0.4em] text-muted-foreground mb-10">
            In partnership with
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="font-display text-base md:text-lg text-navy/70 hover:text-navy transition tracking-wide"
              >
                {p}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/partners"
              className="text-sm font-semibold text-navy border-b-2 border-gold pb-1 hover:text-gold transition"
            >
              See all partners →
            </Link>
          </div>
        </div>
      </section>

      {/* THE 2026 EDITION CATEGORIES — featured 3 */}
      <section className="bg-navy text-white py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_30%,#D4A017_0%,transparent_45%),radial-gradient(circle_at_80%_70%,#C0392B_0%,transparent_45%)]" />
        <div className="container-prose relative">
          <div className="text-center mb-20">
            <div className="text-xs uppercase tracking-[0.4em] text-gold-light mb-4">The 2026</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-[0.05em]">
              Edition <span className="text-gold">Categories</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CATEGORIES.slice(0, 3).map((c, i) => {
              const accents = ["bg-red-soft", "bg-gold", "bg-green"];
              return (
                <AnimateOnScroll key={c.id} delay={i * 100}>
                  <div className="group h-full flex flex-col bg-white/[0.04] border border-white/10 rounded-sm p-8 hover:border-gold/50 transition">
                    <div className={`w-14 h-14 grid place-items-center rounded-full ${accents[i]} text-2xl mb-6`}>
                      {c.icon}
                    </div>
                    <div className="text-xs uppercase tracking-[0.3em] text-white/50">Award</div>
                    <h3 className="mt-3 font-display text-3xl text-white leading-tight">
                      {c.name}
                    </h3>
                    <p className="mt-5 text-sm text-white/70 leading-relaxed flex-1">
                      {c.description}
                    </p>
                    <Link
                      to="/apply"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-light hover:text-gold transition border-b border-gold/40 pb-1 self-start"
                    >
                      Apply Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 hover:border-gold hover:text-gold-light rounded-sm text-sm uppercase tracking-[0.25em]"
            >
              View all 12 categories <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CEREMONY VIDEO BLOCK */}
      <section className="bg-off-white py-28">
        <div className="container-prose max-w-5xl">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Watch the</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-[0.05em] text-navy">
              2026 Ceremony
            </h2>
            <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Live · 8 September 2026 · Makerere
            </div>
          </div>

          <div className="relative aspect-video rounded-sm overflow-hidden bg-navy group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-red-deep/40 to-navy" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#D4A017_0%,transparent_55%)] opacity-30" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-soft grid place-items-center group-hover:scale-110 transition shadow-2xl">
                <Play size={32} className="text-white ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-gold-light">Live stream</div>
                <div className="font-display text-xl md:text-2xl mt-1">Tune in 8 September 2026</div>
              </div>
              <div className="text-xs uppercase tracking-[0.25em] hidden md:block">YouTube · Partner TV</div>
            </div>
          </div>
        </div>
      </section>

      {/* SHARE & NEWSLETTER */}
      <section className="bg-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_70%_30%,#D4A017_0%,transparent_50%)]" />
        <div className="container-prose relative grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xs uppercase tracking-[0.4em] text-gold-light">
              Share & follow
            </h3>
            <div className="mt-4 font-display text-4xl md:text-5xl">#SIAUganda</div>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "X" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-12 h-12 grid place-items-center rounded-full border border-white/20 hover:border-gold hover:text-gold transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.4em] text-gold-light">
              Sign up for the newsletter
            </h3>
            <p className="mt-4 text-white/70 text-lg leading-relaxed max-w-md">
              Be first to know about finalists, ceremony tickets and partner announcements.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                className="flex-1 px-5 py-4 bg-white/5 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:border-gold outline-none transition"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-gold text-navy font-semibold uppercase text-xs tracking-[0.25em] hover:bg-gold-light transition rounded-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
