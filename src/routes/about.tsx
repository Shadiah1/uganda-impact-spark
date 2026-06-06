import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { Target, Eye, Calendar, Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Student Impact Awards 2026" },
      { name: "description", content: "The story behind SIA, organised by Malaika Children Initiative — celebrating Uganda's pre-degree innovators." },
      { property: "og:title", content: "About the Student Impact Awards" },
      { property: "og:description", content: "Origin, vision and objectives of Uganda's national student awards." },
    ],
  }),
  component: AboutPage,
});

const OBJECTIVES = [
  "Spotlight Ugandan students whose work is already changing their schools and communities.",
  "Build a vetted national pipeline of young talent for universities, employers and funders.",
  "Anchor youth recognition to the UN Sustainable Development Goals.",
  "Provide mentorship, media coverage and seed support to every shortlisted finalist.",
  "Strengthen the Malaika Children Initiative's Youth Leaders programme as a year-round movement.",
];

const PROGRAMME = [
  { icon: Calendar, title: "Month 1 — Open Call", text: "National outreach across 100+ schools, regional info sessions, free applications." },
  { icon: Users, title: "Month 2 — Judging", text: "Independent expert panels score entries against published criteria. Public spotlight series begins." },
  { icon: Trophy, title: "Month 3 — Awards Gala", text: "Live ceremony at Makerere Innovation & Incubation Centre on 8 September 2026." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        title="Recognising the students already shaping Uganda."
        subtitle="SIA is the flagship initiative of Malaika Children Initiative — built to honour the country's pre-degree innovators, organisers, athletes and creators."
      />

      <section className="py-24">
        <div className="container-prose grid lg:grid-cols-2 gap-16">
          <AnimateOnScroll>
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Our Story</div>
            <h2 className="font-display text-4xl text-navy leading-tight">
              From the Youth Leaders programme to a national stage.
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-5">
              <p>
                The Malaika Children Initiative has spent the last decade
                training young Ugandans through its Youth Leaders programme —
                an annual cohort of secondary and tertiary students mentored
                in leadership, civic action and innovation.
              </p>
              <p>
                Year after year, alumni returned with the same observation:
                Uganda is overflowing with student-led projects, but the
                recognition stops at internal school assemblies. There was no
                national stage that celebrated young people <em>before</em>{" "}
                their first degree.
              </p>
              <p>
                The Student Impact Awards close that gap. Every category is
                mapped to a UN Sustainable Development Goal, every finalist
                receives mentorship, and every winner becomes part of a
                lifelong alumni network.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 bg-off-white border-y border-border">
        <div className="container-prose grid md:grid-cols-2 gap-8">
          {[
            { icon: Eye, title: "Vision", body: "A Uganda where every student innovator, organiser and creator is seen, mentored and funded — irrespective of school, region or means." },
            { icon: Target, title: "Mission", body: "To identify, celebrate and accelerate the boldest student-led impact in Uganda through a free, transparent, nationally televised awards programme." },
          ].map(({ icon: Icon, title, body }) => (
            <AnimateOnScroll key={title}>
              <div className="bg-white border border-border p-10 rounded-sm h-full">
                <div className="w-12 h-12 grid place-items-center rounded-sm bg-gold-pale text-gold">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 font-display text-3xl text-navy">{title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-prose">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Objectives</div>
          <h2 className="mt-3 font-display text-4xl text-navy">Five commitments.</h2>
          <ul className="mt-10 space-y-5">
            {OBJECTIVES.map((o, i) => (
              <AnimateOnScroll key={i} delay={i * 70}>
                <li className="flex gap-6 border-l-2 border-gold pl-6 py-4 bg-white">
                  <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-lg text-navy leading-relaxed pt-1">{o}</p>
                </li>
              </AnimateOnScroll>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container-prose">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-light text-center">Programme Structure</div>
          <h2 className="mt-3 font-display text-4xl text-center">A three-month national rhythm.</h2>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {PROGRAMME.map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-8 border border-white/15 rounded-sm bg-white/[0.03]">
                <div className="w-12 h-12 grid place-items-center bg-gold text-navy rounded-sm">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 font-display text-2xl text-gold-light">{title}</h3>
                <p className="mt-3 text-white/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
