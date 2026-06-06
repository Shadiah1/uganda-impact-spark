import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Megaphone, Tv, Users } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Student Impact Awards 2026" },
      { name: "description", content: "Sponsor Uganda's national student awards. Four partnership tiers and a national platform." },
      { property: "og:title", content: "Partner with SIA 2026" },
      { property: "og:description", content: "Reach 300+ student innovators and a national broadcast audience." },
    ],
  }),
  component: PartnersPage,
});

const REASONS = [
  { icon: Users, title: "National reach", body: "300+ vetted student finalists, 100+ schools, 4 regions — directly engaged across a four-month campaign." },
  { icon: Tv, title: "Broadcast & social", body: "TV partner integration, daily finalist spotlights across Facebook, Instagram, TikTok and X." },
  { icon: Megaphone, title: "Brand-led storytelling", body: "Co-branded category sponsorship, on-stage moments at the gala, and post-event impact reports." },
];

const TIERS = [
  {
    name: "Platinum",
    price: "USh 80M+",
    color: "from-gold/30 to-gold/[0.05]",
    border: "border-gold",
    benefits: [
      "Title sponsor of two categories",
      "Stage co-host slot at the gala",
      "Premium logo placement on all assets",
      "20 VIP gala seats + private after-party",
      "Co-branded national press release",
    ],
  },
  {
    name: "Gold",
    price: "USh 50M",
    color: "from-purple/30 to-purple/[0.05]",
    border: "border-purple",
    benefits: [
      "Title sponsor of one category",
      "Logo on broadcast bumpers",
      "12 VIP gala seats",
      "Booth at Innovation Showcase",
      "Quarterly impact report",
    ],
  },
  {
    name: "Silver",
    price: "USh 25M",
    color: "from-blue-700/30 to-blue-700/[0.05]",
    border: "border-blue-700",
    benefits: [
      "Co-sponsor of one category",
      "Logo on website + social",
      "6 VIP gala seats",
      "Mention in finalist features",
      "Post-event highlight reel",
    ],
  },
  {
    name: "Community",
    price: "USh 10M",
    color: "from-green/30 to-green/[0.05]",
    border: "border-green",
    benefits: [
      "Listed as Community Partner",
      "Logo on programme booklet",
      "2 gala seats",
      "Social media thank-you posts",
      "Invitation to alumni network events",
    ],
  },
];

const SECTORS: [string, number][] = [
  ["Government & Public Sector", 5],
  ["Banking & Finance", 4],
  ["Telco & Tech", 4],
  ["Education & Foundations", 6],
  ["Media", 4],
];

const partnerSchema = z.object({
  org: z.string().trim().min(2, "Organisation name is required").max(120),
  name: z.string().trim().min(2, "Contact name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  tier: z.string().min(1, "Pick a tier of interest"),
  message: z.string().trim().min(10, "Tell us a bit more").max(800),
});
type PartnerForm = z.infer<typeof partnerSchema>;

function PartnersPage() {
  const form = useForm<PartnerForm>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { org: "", name: "", email: "", phone: "", tier: "", message: "" },
  });

  const onSubmit = (v: PartnerForm) => {
    console.log("partner enquiry", v);
    toast.success("Thank you — our partnerships team will reply within 48 hours.");
    form.reset();
  };

  return (
    <>
      <PageHero
        breadcrumb="Partners"
        title="Stand with Uganda's brightest students."
        subtitle="Partnership at SIA is more than a logo placement — it's co-ownership of the country's most exciting youth platform."
      />

      <section className="py-20">
        <div className="container-prose grid md:grid-cols-3 gap-6">
          {REASONS.map(({ icon: Icon, title, body }) => (
            <AnimateOnScroll key={title}>
              <div className="p-8 bg-white border border-border rounded-sm h-full">
                <div className="w-12 h-12 grid place-items-center bg-navy text-gold-light rounded-sm">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-2xl text-navy">{title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="py-20 bg-off-white border-y border-border">
        <div className="container-prose">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Sponsorship Tiers</div>
          <h2 className="mt-3 font-display text-4xl text-navy">Four ways to partner.</h2>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((t) => (
              <AnimateOnScroll key={t.name}>
                <div className={`relative h-full bg-gradient-to-b ${t.color} border-2 ${t.border} rounded-sm p-7 flex flex-col`}>
                  <div className="text-xs uppercase tracking-[0.25em] text-navy/70">Tier</div>
                  <h3 className="mt-2 font-display text-3xl text-navy">{t.name}</h3>
                  <div className="mt-1 font-mono text-sm text-navy/80">{t.price}</div>
                  <ul className="mt-6 space-y-3 text-sm text-navy/90 flex-1">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-gold mt-0.5">◆</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-prose">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Partners by Sector</div>
          <h2 className="mt-3 font-display text-4xl text-navy">A growing coalition.</h2>

          <div className="mt-10 space-y-10">
            {SECTORS.map(([sector, n]) => (
              <div key={sector}>
                <div className="text-sm font-semibold text-navy mb-4 uppercase tracking-wider">{sector}</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {Array.from({ length: n }).map((_, i) => (
                    <div
                      key={i}
                      className="h-20 rounded-sm border border-dashed border-border bg-white grid place-items-center text-muted-foreground text-xs"
                    >
                      Logo Slot
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container-prose max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-light">Partnership Enquiry</div>
          <h2 className="mt-3 font-display text-4xl">Let's talk.</h2>
          <p className="mt-3 text-white/70">
            Tell us about your organisation and we'll share the full partnership deck.
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 grid sm:grid-cols-2 gap-5">
            <Field label="Organisation" error={form.formState.errors.org?.message}>
              <input {...form.register("org")} className={inputCls} />
            </Field>
            <Field label="Contact Name" error={form.formState.errors.name?.message}>
              <input {...form.register("name")} className={inputCls} />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <input type="email" {...form.register("email")} className={inputCls} />
            </Field>
            <Field label="Phone" error={form.formState.errors.phone?.message}>
              <input {...form.register("phone")} className={inputCls} />
            </Field>
            <Field label="Tier of Interest" error={form.formState.errors.tier?.message} className="sm:col-span-2">
              <select {...form.register("tier")} className={inputCls}>
                <option value="">Select a tier…</option>
                {TIERS.map((t) => (
                  <option key={t.name} value={t.name}>{t.name} — {t.price}</option>
                ))}
                <option value="Custom">Custom / bespoke partnership</option>
              </select>
            </Field>
            <Field label="Message" error={form.formState.errors.message?.message} className="sm:col-span-2">
              <textarea rows={5} {...form.register("message")} className={inputCls} />
            </Field>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="px-8 py-4 bg-gold text-navy font-semibold rounded-sm hover:bg-gold-light transition disabled:opacity-50"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-sm bg-white/[0.04] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-gold transition";

function Field({
  label, error, children, className = "",
}: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-[0.2em] text-gold-light">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="block mt-1 text-xs text-red-300">{error}</span>}
    </label>
  );
}
