import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Megaphone, ClipboardCheck, Gavel, Sparkles, Mic, Trophy } from "lucide-react";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — Student Impact Awards 2026" },
      { name: "description", content: "Six phases from launch to gala. Plus the full event-day schedule for SIA 2026." },
      { property: "og:title", content: "SIA 2026 Timeline" },
      { property: "og:description", content: "Roadmap to 8 September 2026 in Kampala." },
    ],
  }),
  component: TimelinePage,
});

const PHASES = [
  { icon: Megaphone, date: "June 2026", title: "Launch & National Outreach", body: "Public launch, school visits across Uganda's four regions, partner activations, and free application portal opens." },
  { icon: ClipboardCheck, date: "1 Jun – 25 Jul 2026", title: "Open Applications", body: "Six weeks of submissions. Daily clinics on @sia.ug socials. Outreach to under-represented districts." },
  { icon: Gavel, date: "26 Jul – 15 Aug 2026", title: "Judging & Shortlisting", body: "Independent expert panels score by category. Verification calls with endorsers. Top five per category advance." },
  { icon: Sparkles, date: "16 Aug – 5 Sep 2026", title: "Finalist Spotlight Series", body: "Daily features across national TV, radio and social. Each finalist gets mentorship pairing and travel support." },
  { icon: Mic, date: "7 Sep 2026", title: "Innovation Showcase", body: "Public exhibition day at Makerere Innovation & Incubation Centre. Finalist demos, partner booths, school tours." },
  { icon: Trophy, date: "8 Sep 2026", title: "Awards Gala", body: "Live ceremony with broadcast coverage. Twelve category winners, two honorary awards, alumni induction." },
];

const SCHEDULE: [string, string, boolean][] = [
  ["08:00 – 09:00", "Guest arrival, accreditation & breakfast reception", false],
  ["09:00 – 09:30", "National anthem, opening prayer, welcome remarks", false],
  ["09:30 – 10:00", "Keynote address — Chief Guest", false],
  ["10:00 – 11:00", "Finalist showcase walk-through", false],
  ["11:00 – 12:30", "Award Block 1 — Innovator, Academic Excellence, Entrepreneur", true],
  ["12:30 – 13:30", "Lunch & networking", false],
  ["13:30 – 15:00", "Award Block 2 — Sustainability, Green Earth, Blue Earth, Media", true],
  ["15:00 – 15:30", "Cultural performance", false],
  ["15:30 – 16:30", "Award Block 3 — Activist, Ability, Talented, Tomorrow's Leader, Girls in Action", true],
  ["16:30 – 17:00", "Honorary Awards: Student Club & School of the Year", true],
  ["17:00", "Closing remarks & alumni induction", false],
];

function TimelinePage() {
  return (
    <>
      <PageHero
        breadcrumb="Timeline"
        title="Six phases. One unforgettable September."
        subtitle="Every step from national outreach to the live awards gala — published in advance."
      />

      <section className="py-24">
        <div className="container-prose">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent" />
            <div className="space-y-12">
              {PHASES.map(({ icon: Icon, date, title, body }, i) => {
                const left = i % 2 === 0;
                return (
                  <AnimateOnScroll key={i}>
                    <div className={`md:grid md:grid-cols-2 md:gap-12 items-center ${left ? "" : "md:[direction:rtl]"}`}>
                      <div className={`md:[direction:ltr] ${left ? "md:text-right" : ""}`}>
                        <div className="inline-flex items-center gap-3 mb-3">
                          {left ? (
                            <>
                              <span className="text-xs uppercase tracking-[0.25em] text-gold">{date}</span>
                              <div className="w-10 h-px bg-gold" />
                            </>
                          ) : (
                            <>
                              <div className="w-10 h-px bg-gold" />
                              <span className="text-xs uppercase tracking-[0.25em] text-gold">{date}</span>
                            </>
                          )}
                        </div>
                        <h3 className="font-display text-3xl text-navy">{title}</h3>
                        <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
                      </div>
                      <div className={`md:[direction:ltr] hidden md:flex ${left ? "justify-start" : "justify-end"}`}>
                        <div className="w-16 h-16 rounded-full bg-navy grid place-items-center border-4 border-gold">
                          <Icon className="text-gold-light" size={22} />
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-off-white border-y border-border">
        <div className="container-prose max-w-4xl">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Event Day</div>
          <h2 className="mt-3 font-display text-4xl text-navy">8 September 2026 — schedule.</h2>

          <div className="mt-10 bg-white border border-border rounded-sm overflow-hidden">
            {SCHEDULE.map(([time, item, gold], i) => (
              <div
                key={i}
                className={`grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-4 px-6 py-5 border-b border-border last:border-b-0 ${
                  gold ? "bg-gold-pale/60" : ""
                }`}
              >
                <div className={`font-mono text-sm ${gold ? "text-navy font-semibold" : "text-muted-foreground"}`}>
                  {time}
                </div>
                <div className={gold ? "text-navy font-semibold" : "text-navy"}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-white">
        <div className="container-prose text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-light">Countdown</div>
          <h2 className="mt-3 font-display text-4xl">Until the gala.</h2>
          <div className="mt-10 flex justify-center">
            <CountdownTimer />
          </div>
        </div>
      </section>
    </>
  );
}
