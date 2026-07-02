import { createFileRoute } from "@tanstack/react-router";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CATEGORIES, HONORARY } from "@/lib/categories";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight, Play, Facebook, Instagram, Twitter, Linkedin, Youtube,
  Check, X, Info, Mail, Phone, MapPin, Target, Eye, Trophy, Users, Calendar,
  Megaphone, ClipboardCheck, Gavel, Sparkles, Mic, Heart,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import logoAsset from "@/assets/sia-logo.png.asset.json";
import trophyAsset from "@/assets/sia-trophy.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Impact Awards 2026 — Uganda's Students. Unstoppable Impact." },
      {
        name: "description",
        content:
          "Uganda's national student innovation awards. Celebrating bold innovators aged 9–24 across 10 categories. 8 September 2026, Kampala. Apply free.",
      },
      { property: "og:title", content: "Student Impact Awards 2026" },
      { property: "og:description", content: "Apply free — Uganda's biggest student awards." },
    ],
  }),
  component: Home,
});

/* ----------------------- Static data ----------------------- */

const PHASES = [
  { icon: Megaphone, date: "June 2026", title: "Launch & National Outreach", body: "Public launch, school visits across Uganda's four regions, partner activations, and the free application portal opens." },
  { icon: ClipboardCheck, date: "1 Jun – 25 Jul 2026", title: "Open Applications", body: "Free applications accepted across all categories. Daily clinics on social media." },
  { icon: Gavel, date: "26 Jul – 15 Aug 2026", title: "Judging & Shortlisting", body: "Independent expert panels score by category. Verification calls with endorsers. Top finalists advance." },
  { icon: Sparkles, date: "16 Aug – 5 Sep 2026", title: "Finalist Spotlight Series", body: "Daily features across national TV, radio and social. Each finalist receives mentorship pairing." },
  { icon: Mic, date: "7 Sep 2026", title: "Innovation Showcase", body: "Public exhibition day at Makerere Innovation & Incubation Centre — finalist demos, partner booths, school tours." },
  { icon: Trophy, date: "8 Sep 2026", title: "Awards Gala", body: "Live ceremony with broadcast coverage. Category winners, honorary awards, alumni induction." },
];

const PARTNERS = [
  "Malaika Children's Initiative",
  "Makerere Innovation & Incubation Centre",
];

const TIERS = [
  {
    name: "Platinum", price: "UGX 5,000,000+",
    benefits: ["Title sponsor of two categories", "Stage co-host slot at the gala", "Premium logo on all assets", "20 VIP gala seats", "Co-branded national press release"],
  },
  {
    name: "Gold", price: "UGX 2,500,000",
    benefits: ["Title sponsor of one category", "Logo on broadcast bumpers", "12 VIP gala seats", "Booth at Innovation Showcase", "Post-event impact report"],
  },
  {
    name: "Silver", price: "UGX 1,000,000",
    benefits: ["Co-sponsor of one category", "Logo on website + social", "6 VIP gala seats", "Mention in finalist features", "Highlight reel feature"],
  },
  {
    name: "Bronze", price: "UGX 500,000",
    benefits: ["Community Partner listing", "Logo on programme booklet", "2 gala seats", "Social media thank-you posts", "Invitation to alumni events"],
  },
];


const CAN = [
  "Aged 9–24 on 1 January 2026.",
  "Enrolled in a Ugandan primary, secondary or tertiary institution.",
  "Have not yet completed an undergraduate degree.",
  "Lead or co-lead an original project or initiative.",
  "Endorsed by a teacher, head of department or principal.",
];
const CANNOT = [
  "Holders of a completed Bachelor's degree or higher.",
  "Applicants outside the 9–24 age range.",
  "Students enrolled outside Uganda.",
  "Submissions without verifiable school endorsement.",
  "Direct family members of SIA judges or organising team.",
];

const FAQ: [string, string][] = [
  ["Is there an application fee?", "No. Applications to the Student Impact Awards are completely FREE."],
  ["Can I apply in more than one category?", "Yes — you may submit up to two distinct applications across different categories."],
  ["Can a group of students apply together?", "Yes, for project-based categories. One lead applicant must be named."],
  ["Do I need to be enrolled at the time of the awards?", "You must be enrolled when you apply (by 25 July 2026)."],
  ["My school is not on a partner list — can I still apply?", "Absolutely. SIA is open to every Ugandan student in every accredited institution."],
  ["What if I am under 18?", "A parent or legal guardian must co-sign the consent step in the application."],
  ["How are entries judged?", "Each category has an independent expert panel scoring on originality, impact, scalability and integrity."],
  ["When and where is the ceremony?", "Tuesday 8 September 2026 at the Makerere Innovation & Incubation Centre, Kampala."],
];

/* ----------------------- Schemas ----------------------- */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(160),
  subject: z.string().trim().min(3, "Subject is required").max(120),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});
type ContactForm = z.infer<typeof contactSchema>;

const applySchema = z.object({
  fullName: z.string().trim().min(2, "Full name required").max(100),
  age: z.coerce.number().min(9, "Min age 9").max(24, "Max age 24"),
  email: z.string().trim().email("Valid email"),
  phone: z.string().trim().min(7, "Phone required"),
  institution: z.string().trim().min(2, "Institution required"),
  category: z.string().min(1, "Choose a category"),
  projectTitle: z.string().trim().min(3, "Title required"),
  projectSummary: z.string().trim().min(20, "Tell us a bit more").max(1200),
  consent: z.literal(true, { message: "Required" }),
});
type ApplyForm = z.infer<typeof applySchema>;

const partnerSchema = z.object({
  org: z.string().trim().min(2, "Organisation required"),
  name: z.string().trim().min(2, "Contact name required"),
  email: z.string().trim().email("Valid email"),
  tier: z.string().min(1, "Pick a tier"),
  message: z.string().trim().min(10, "Tell us a bit more"),
});
type PartnerForm = z.infer<typeof partnerSchema>;

/* ----------------------- Ribbons ----------------------- */

function Ribbons() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#C0392B" /><stop offset="100%" stopColor="#922B21" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#D4A017" /><stop offset="100%" stopColor="#8B6508" />
        </linearGradient>
        <linearGradient id="g3" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#065F46" /><stop offset="100%" stopColor="#022C22" />
        </linearGradient>
      </defs>
      <path d="M -100 700 C 200 200, 600 100, 900 350 S 1400 800, 1600 500" stroke="url(#g1)" strokeWidth="220" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M -100 850 C 300 400, 700 300, 1000 550 S 1500 950, 1700 700" stroke="url(#g3)" strokeWidth="200" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M -100 550 C 250 100, 750 50, 1050 250 S 1500 700, 1700 400" stroke="url(#g2)" strokeWidth="140" fill="none" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/* ============================ PAGE ============================ */

function Home() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-navy text-white overflow-hidden">
        <Ribbons />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl mt-16">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-gold-light/90 mb-8">
            Malaika Children's Initiative presents
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] tracking-tight">
            STUDENT<br /><span className="gold-shimmer">IMPACT</span><br />AWARDS
          </h1>
          <div className="mt-8 text-sm md:text-base uppercase tracking-[0.35em] text-white/85">
            Edition 1 · Kampala · 2026
          </div>
          <button
            onClick={() => scrollTo("apply")}
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-red-soft hover:bg-red-deep text-white text-sm uppercase tracking-[0.25em] font-semibold transition shadow-[0_10px_40px_-10px_rgba(192,57,43,0.7)]"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Apply by 25 July 2026
            <ArrowRight size={16} />
          </button>
        </div>
        <button onClick={() => scrollTo("about")} className="relative z-10 mt-16 mb-8 text-center text-white/60 text-xs uppercase tracking-[0.3em] hover:text-gold-light transition">
          ↓ Scroll to explore
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-off-white py-28 md:py-32">
        <div className="container-prose max-w-5xl">
          <AnimateOnScroll>
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">About</div>
            <h2 className="font-display text-4xl md:text-5xl text-navy leading-tight">
              Recognising the students already shaping <span className="text-gold">Uganda</span>.
            </h2>
          </AnimateOnScroll>

          <div className="mt-12 grid lg:grid-cols-2 gap-12">
            <AnimateOnScroll>
              <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
                <p>
                  The Student Impact Awards are Uganda's national stage for student
                  changemakers — innovators, entrepreneurs, activists, artists and
                  scholars whose work is already shifting their schools and communities.
                </p>
                <p>
                  Organised by the <strong className="text-navy">Malaika Children's Initiative</strong>,
                  SIA brings together finalists from across Uganda for a unique programme of
                  coaching, mentorship and media training leading up to the live awards ceremony.
                </p>
                <p>
                  The 2026 Ceremony will take place on <strong className="text-navy">Tuesday, 8 September 2026</strong> at the
                  <strong className="text-navy"> Makerere Innovation & Incubation Centre</strong> in Kampala.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={120}>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { icon: Eye, title: "Vision", body: "A Uganda where every student innovator is seen, mentored and funded — irrespective of school, region or means." },
                  { icon: Target, title: "Mission", body: "Identify, celebrate and accelerate the boldest student-led impact in Uganda through a free, transparent awards programme." },
                  { icon: Heart, title: "Our Values", body: "Integrity, inclusivity, excellence and youth-led leadership at every stage of the programme." },
                  { icon: Trophy, title: "Our Promise", body: "Free to enter. Mentorship for every finalist. A lifelong alumni network for every winner." },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="bg-white border border-border p-6 rounded-sm">
                    <div className="w-10 h-10 grid place-items-center rounded-sm bg-gold-pale text-gold">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 font-display text-xl text-navy">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* MEET THE SIA — trophy showcase */}
      <section className="bg-navy text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,#D4A017_0%,transparent_55%),radial-gradient(circle_at_85%_75%,#4B0082_0%,transparent_55%)]" />
        <div className="container-prose relative grid lg:grid-cols-2 gap-14 items-center">
          <AnimateOnScroll>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-gold/30 via-transparent to-purple/20 blur-3xl opacity-60" />
              <div className="relative overflow-hidden rounded-sm border border-gold/30 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                <img
                  src={trophyAsset.url}
                  alt="The Student Impact Awards 2026 trophy — Student Innovator of the Year"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-navy-deep/85 backdrop-blur-sm border border-gold/40 rounded-sm px-5 py-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold-light">The 2026 Trophy</div>
                <div className="mt-1 font-display text-lg md:text-xl text-white">Honouring Impact, Inspiring Change</div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={120}>
            <div className="text-xs uppercase tracking-[0.4em] text-gold-light/90">Meet the</div>
            <img src={logoAsset.url} alt="Student Impact Awards" className="mt-6 h-20 md:h-28 w-auto object-contain" />
            <p className="mt-8 text-lg md:text-xl leading-relaxed text-white/80">
              Uganda's boldest young changemakers. Fearless and persistent, they are in every
              district — often working quietly against the odds to invent, organise, teach,
              perform and build a more equitable Uganda.
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              On 8 September 2026, one of them will lift this trophy as Uganda's
              <span className="text-gold-light"> Student Innovator of the Year</span>.
            </p>
            <button
              onClick={() => scrollTo("categories")}
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-gold text-navy hover:bg-gold-light text-sm uppercase tracking-[0.25em] font-semibold transition"
            >
              See the categories <ArrowRight size={16} />
            </button>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="bg-white py-28 md:py-32 border-y border-border">
        <div className="container-prose">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[0.4em] text-gold mb-4">The 2026 Edition</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-[0.05em] text-navy">
              Award <span className="text-gold">Categories</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Ten competitive categories plus two honorary recognitions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((c, i) => (
              <AnimateOnScroll key={c.id} delay={(i % 3) * 80}>
                <div className="h-full bg-off-white border border-border hover:border-gold/60 rounded-sm p-7 transition group">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{c.icon}</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
                        Award {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-2 font-display text-xl text-navy leading-tight">{c.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* HONORARY */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <div className="text-xs uppercase tracking-[0.3em] text-red-soft mb-3">Honorary Awards · Certificates</div>
              <h3 className="font-display text-3xl text-navy">Two collective honours.</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {HONORARY.map((h) => (
                <div key={h.id} className="bg-navy text-white p-8 rounded-sm border-2 border-gold">
                  <div className="text-3xl">{h.icon}</div>
                  <h4 className="mt-4 font-display text-2xl text-gold-light">{h.name}</h4>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14">
            <button
              onClick={() => scrollTo("apply")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy hover:bg-gold-light rounded-sm text-sm uppercase tracking-[0.25em] font-semibold transition"
            >
              Apply Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section id="eligibility" className="bg-off-white py-28 md:py-32">
        <div className="container-prose">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Eligibility & FAQ</div>
            <h2 className="font-display text-4xl md:text-5xl text-navy">Who can apply?</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              SIA is free, transparent and open to every eligible Ugandan student.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-sm border border-gold/40 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 grid place-items-center bg-navy text-gold-light rounded-sm"><Check size={18} /></div>
                <h3 className="font-display text-2xl text-navy">You CAN apply if…</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {CAN.map((c) => (
                  <li key={c} className="flex gap-3 text-navy text-[15px] leading-relaxed">
                    <Check size={18} className="text-gold shrink-0 mt-0.5" /> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm border border-navy/15 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 grid place-items-center bg-navy text-gold-light rounded-sm"><X size={18} /></div>
                <h3 className="font-display text-2xl text-navy">You CANNOT apply if…</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {CANNOT.map((c) => (
                  <li key={c} className="flex gap-3 text-navy text-[15px] leading-relaxed">
                    <X size={18} className="text-navy/50 shrink-0 mt-0.5" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>


          <div className="mt-10 max-w-5xl mx-auto flex gap-4 p-6 border-l-4 border-gold bg-gold-pale rounded-sm">
            <Info className="text-gold shrink-0" />
            <p className="text-navy leading-relaxed">
              <strong>Applicants under 18:</strong> a parent or legal guardian must co-sign the
              consent declaration when applying.
            </p>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="font-display text-3xl text-navy text-center">Frequently asked questions</h3>
            <Accordion type="single" collapsible className="mt-8">
              {FAQ.map(([q, a], i) => (
                <AccordionItem key={i} value={`f-${i}`} className="border-b border-border">
                  <AccordionTrigger className="text-left text-navy font-display text-lg hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="bg-white py-28 md:py-32 border-y border-border">
        <div className="container-prose max-w-5xl">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Timeline</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-[0.05em] text-navy">
              Six phases. One September.
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent" />
            <div className="space-y-12">
              {PHASES.map(({ icon: Icon, date, title, body }, i) => {
                const left = i % 2 === 0;
                return (
                  <AnimateOnScroll key={i}>
                    <div className={`md:grid md:grid-cols-2 md:gap-12 items-center ${left ? "" : "md:[direction:rtl]"}`}>
                      <div className={`md:[direction:ltr] ${left ? "md:text-right" : ""}`}>
                        <div className="text-xs uppercase tracking-[0.25em] text-red-soft font-semibold">{date}</div>
                        <h3 className="mt-2 font-display text-2xl text-navy">{title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
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

          <div className="mt-20 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Countdown to the gala</div>
            <div className="mt-6 flex justify-center"><CountdownTimer /></div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="bg-navy text-white py-28 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_30%,#D4A017_0%,transparent_45%),radial-gradient(circle_at_80%_70%,#C0392B_0%,transparent_45%)]" />
        <div className="container-prose relative">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.4em] text-gold-light mb-3">Partners</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-[0.05em]">
              Stand with Uganda's <span className="text-gold">brightest</span>.
            </h2>
          </div>

          {/* Current partners */}
          <div className="text-center text-xs uppercase tracking-[0.4em] text-white/60 mb-8">
            In partnership with
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-20">
            {PARTNERS.map((p) => (
              <div key={p} className="font-display text-lg md:text-2xl text-gold-light tracking-wide text-center">
                {p}
              </div>
            ))}
          </div>

          {/* Sponsorship tiers */}
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-[0.3em] text-gold-light mb-2">Sponsorship Tiers</div>
            <h3 className="font-display text-3xl">Four ways to partner — plus in-kind support.</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((t, i) => (
              <AnimateOnScroll key={t.name}>
                <div className="relative h-full bg-white/[0.03] border border-gold/30 rounded-sm p-7 flex flex-col text-white backdrop-blur-sm hover:border-gold/60 transition-colors">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold-light/70">Tier 0{i + 1}</div>
                  <h4 className="mt-2 font-display text-3xl text-gold-light">{t.name}</h4>
                  <div className="mt-1 font-mono text-xs text-white/70 tracking-wider">{t.price}</div>
                  <div className="my-5 h-px bg-gold/20" />
                  <ul className="space-y-2.5 text-sm text-white/80 flex-1">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-gold/70 mt-0.5">—</span><span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>


          <div className="mt-8 max-w-3xl mx-auto p-6 border-l-4 border-gold bg-white/[0.04] rounded-sm">
            <div className="flex gap-4">
              <Heart className="text-gold shrink-0" />
              <p className="text-white/85 leading-relaxed">
                <strong className="text-gold-light">In-kind support welcome.</strong> We also accept
                in-kind partnerships — venue, logistics, broadcast time, equipment, mentorship,
                travel and more. Talk to us about a bespoke package.
              </p>
            </div>
          </div>

          {/* Partner enquiry form */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl text-center text-gold-light">Become a partner</h3>
            <PartnerEnquiryForm />
          </div>
        </div>
      </section>

      {/* APPLY / NOMINATE */}
      <section id="apply" className="bg-off-white py-28 md:py-32">
        <div className="container-prose max-w-5xl">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Apply or Nominate</div>
            <h2 className="font-display text-4xl md:text-5xl text-navy">Two ways to take part.</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Applications and nominations are completely free. Deadline 25 July 2026.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-navy text-gold-light font-medium text-sm tracking-wide">
              ⏳ Closes 25 July 2026
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Applicant */}
            <div className="group relative bg-white border border-gold/30 rounded-sm p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">01 · For students</div>
              <h3 className="mt-3 font-display text-3xl text-navy">Applicant Form</h3>
              <p className="mt-3 text-navy/70 leading-relaxed flex-1">
                Apply directly if you are a Ugandan student aged 9–24 leading your own
                project, initiative or innovation.
              </p>
              <div className="my-6 h-px bg-gold/20" />
              <a
                href="https://form.jotform.com/261625720398058"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-navy text-gold-light font-medium tracking-wide uppercase text-sm hover:bg-navy/90 transition-colors rounded-sm"
              >
                Open Applicant Form →
              </a>
              <div className="mt-3 text-xs text-navy/50 break-all font-mono">
                form.jotform.com/261625720398058
              </div>
            </div>

            {/* Nomination */}
            <div className="group relative bg-navy text-white border border-gold/40 rounded-sm p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold-light">02 · For teachers, mentors & peers</div>
              <h3 className="mt-3 font-display text-3xl text-gold-light">Nomination Form</h3>
              <p className="mt-3 text-white/75 leading-relaxed flex-1">
                Know a remarkable student, teacher or club? Nominate them for recognition —
                including our Honorary Awards.
              </p>
              <div className="my-6 h-px bg-gold/30" />
              <a
                href="https://form.jotform.com/261630897198067"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gold text-navy font-medium tracking-wide uppercase text-sm hover:bg-gold-light transition-colors rounded-sm"
              >
                Open Nomination Form →
              </a>
              <div className="mt-3 text-xs text-white/50 break-all font-mono">
                form.jotform.com/261630897198067
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CEREMONY VIDEO BLOCK */}
      <section className="bg-white py-24 border-y border-border">
        <div className="container-prose max-w-5xl">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Watch the</div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-[0.05em] text-navy">2026 Ceremony</h2>
            <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
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

      {/* CONTACT */}
      <section id="contact" className="bg-navy text-white py-28 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_70%_30%,#D4A017_0%,transparent_50%)]" />
        <div className="container-prose relative">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-gold-light mb-3">Contact</div>
            <h2 className="font-display text-4xl md:text-5xl">Let's talk SIA.</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="font-display text-2xl text-gold-light">Get in touch</h3>
              <ul className="mt-6 space-y-5 text-white/85">
                <li className="flex items-start gap-3">
                  <Mail className="text-gold-light shrink-0 mt-1" size={18} />
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60">Email</div>
                    <a href="mailto:studentimpactawards@gmail.com" className="text-lg hover:text-gold-light transition break-all">
                      studentimpactawards@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-gold-light shrink-0 mt-1" size={18} />
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60">Phone</div>
                    <a href="tel:+256779753082" className="text-lg hover:text-gold-light transition">
                      +256 779 753 082
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-gold-light shrink-0 mt-1" size={18} />
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60">Find us</div>
                    <address className="not-italic text-white/90 leading-relaxed">
                      Malaika Children's Initiative<br />
                      Makerere Innovation & Incubation Centre<br />
                      Makerere University, Kampala, Uganda
                    </address>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <div className="text-xs uppercase tracking-[0.25em] text-gold-light mb-4">Follow #SIAUganda</div>
                <div className="flex gap-3">
                  {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                    <a key={i} href="#" aria-label="Social" className="w-11 h-11 grid place-items-center rounded-full border border-white/20 hover:border-gold hover:text-gold transition">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-sm overflow-hidden border border-white/10">
                <iframe
                  title="Makerere University map"
                  src="https://www.google.com/maps?q=Makerere+University,+Kampala,+Uganda&output=embed"
                  width="100%" height="260" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl text-gold-light">Send a message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================ Forms ============================ */

const darkInp = "w-full px-4 py-3 rounded-sm bg-white/[0.05] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-gold transition";
const lightInp = "w-full px-4 py-3 rounded-sm bg-white border border-border text-navy focus:outline-none focus:border-gold transition";

function DarkField({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-[0.2em] text-gold-light">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="block mt-1 text-xs text-red-300">{error}</span>}
    </label>
  );
}

function LightField({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-[0.2em] text-navy/70">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="block mt-1 text-xs text-red-soft">{error}</span>}
    </label>
  );
}

function ContactForm() {
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const onSubmit = (v: ContactForm) => {
    console.log("contact", v);
    toast.success("Message sent. We'll respond within 2 business days.");
    form.reset();
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <DarkField label="Your name" error={form.formState.errors.name?.message}>
        <input {...form.register("name")} className={darkInp} />
      </DarkField>
      <DarkField label="Email" error={form.formState.errors.email?.message}>
        <input type="email" {...form.register("email")} className={darkInp} />
      </DarkField>
      <DarkField label="Subject" error={form.formState.errors.subject?.message}>
        <input {...form.register("subject")} className={darkInp} />
      </DarkField>
      <DarkField label="Message" error={form.formState.errors.message?.message}>
        <textarea rows={5} {...form.register("message")} className={darkInp} />
      </DarkField>
      <button type="submit" disabled={form.formState.isSubmitting} className="px-8 py-4 bg-gold text-navy font-semibold rounded-sm hover:bg-gold-light transition disabled:opacity-50">
        Send Message
      </button>
    </form>
  );
}

function PartnerEnquiryForm() {
  const form = useForm<PartnerForm>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { org: "", name: "", email: "", tier: "", message: "" },
  });
  const onSubmit = (v: PartnerForm) => {
    console.log("partner", v);
    toast.success("Thank you — our partnerships team will reply within 48 hours.");
    form.reset();
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 grid sm:grid-cols-2 gap-4">
      <DarkField label="Organisation" error={form.formState.errors.org?.message}>
        <input {...form.register("org")} className={darkInp} />
      </DarkField>
      <DarkField label="Contact name" error={form.formState.errors.name?.message}>
        <input {...form.register("name")} className={darkInp} />
      </DarkField>
      <DarkField label="Email" error={form.formState.errors.email?.message}>
        <input type="email" {...form.register("email")} className={darkInp} />
      </DarkField>
      <DarkField label="Tier of interest" error={form.formState.errors.tier?.message}>
        <select {...form.register("tier")} className={darkInp}>
          <option value="">Select a tier…</option>
          {TIERS.map((t) => <option key={t.name} value={t.name}>{t.name} — {t.price}</option>)}
          <option value="In-kind">In-kind support</option>
          <option value="Custom">Custom / bespoke</option>
        </select>
      </DarkField>
      <DarkField label="Message" error={form.formState.errors.message?.message} className="sm:col-span-2">
        <textarea rows={4} {...form.register("message")} className={darkInp} />
      </DarkField>
      <div className="sm:col-span-2">
        <button type="submit" className="px-8 py-4 bg-gold text-navy font-semibold rounded-sm hover:bg-gold-light transition">
          Send Enquiry
        </button>
      </div>
    </form>
  );
}

function ApplyForm() {
  const form = useForm<ApplyForm>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      fullName: "", email: "", phone: "", institution: "",
      category: "", projectTitle: "", projectSummary: "",
    },
  });
  const onSubmit = (v: ApplyForm) => {
    console.log("application", v);
    toast.success("Application submitted! Check your email for confirmation.");
    form.reset();
  };
  const errs = form.formState.errors;
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border border-border rounded-sm p-8 md:p-10 grid sm:grid-cols-2 gap-5">
      <LightField label="Full name" error={errs.fullName?.message}>
        <input {...form.register("fullName")} className={lightInp} />
      </LightField>
      <LightField label="Age" error={errs.age?.message}>
        <input type="number" min={9} max={24} {...form.register("age")} className={lightInp} />
      </LightField>
      <LightField label="Email" error={errs.email?.message}>
        <input type="email" {...form.register("email")} className={lightInp} />
      </LightField>
      <LightField label="Phone" error={errs.phone?.message}>
        <input {...form.register("phone")} className={lightInp} />
      </LightField>
      <LightField label="Institution / School" error={errs.institution?.message} className="sm:col-span-2">
        <input {...form.register("institution")} className={lightInp} />
      </LightField>
      <LightField label="Category" error={errs.category?.message} className="sm:col-span-2">
        <select {...form.register("category")} className={lightInp}>
          <option value="">Select category…</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </LightField>
      <LightField label="Project title" error={errs.projectTitle?.message} className="sm:col-span-2">
        <input {...form.register("projectTitle")} className={lightInp} />
      </LightField>
      <LightField label="Briefly describe your project & impact" error={errs.projectSummary?.message} className="sm:col-span-2">
        <textarea rows={5} {...form.register("projectSummary")} className={lightInp} />
      </LightField>
      <label className="sm:col-span-2 flex gap-3 items-start p-4 border border-border rounded-sm cursor-pointer hover:border-gold transition">
        <input type="checkbox" {...form.register("consent")} className="mt-1 accent-gold" />
        <div>
          <span className="text-sm text-navy leading-relaxed">
            I confirm the information provided is true and accurate, I have read the
            eligibility criteria, and I consent to SIA processing my data for this application.
          </span>
          {errs.consent?.message && <div className="text-xs text-red-soft mt-1">{String(errs.consent.message)}</div>}
        </div>
      </label>
      <div className="sm:col-span-2 flex flex-wrap gap-4 items-center justify-between border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          A full endorsement letter from your teacher / principal will be requested if you are shortlisted.
        </p>
        <button type="submit" className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-gold text-navy font-semibold hover:bg-gold-light transition">
          Submit Application <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
