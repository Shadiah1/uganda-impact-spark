import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Briefcase, Mic, Facebook, Instagram, Twitter, Music2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Student Impact Awards 2026" },
      { name: "description", content: "Get in touch with the Student Impact Awards team — Malaika Children Initiative, Kampala." },
      { property: "og:title", content: "Contact SIA 2026" },
      { property: "og:description", content: "Email, social and the Makerere University address." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(160),
  subject: z.string().trim().min(3, "Subject is required").max(120),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});
type Form = z.infer<typeof schema>;

function ContactPage() {
  const form = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (v: Form) => {
    console.log("contact", v);
    toast.success("Message sent. We'll respond within 2 business days.");
    form.reset();
  };

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        title="Let's talk SIA."
        subtitle="Whether you're an applicant, partner or member of the press — we're here to help."
      />

      <section className="py-20">
        <div className="container-prose grid md:grid-cols-3 gap-6">
          {[
            { icon: Mail, title: "General Enquiries", email: "hello@sia.ug", body: "Questions about applications, eligibility or the awards programme." },
            { icon: Briefcase, title: "Partnerships", email: "partners@sia.ug", body: "Sponsorship, in-kind support, and bespoke partnership conversations." },
            { icon: Mic, title: "Media & Press", email: "press@sia.ug", body: "Interviews, broadcast coordination, finalist features and press passes." },
          ].map(({ icon: Icon, title, email, body }) => (
            <div key={title} className="p-8 bg-white border border-border rounded-sm">
              <div className="w-12 h-12 grid place-items-center bg-gold-pale text-gold rounded-sm">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-2xl text-navy">{title}</h3>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{body}</p>
              <a href={`mailto:${email}`} className="mt-5 inline-block font-semibold text-navy border-b-2 border-gold pb-0.5 hover:text-gold transition">
                {email}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-off-white border-y border-border">
        <div className="container-prose grid lg:grid-cols-2 gap-12">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Send a message</div>
            <h2 className="mt-3 font-display text-4xl text-navy">We read every one.</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <Field label="Your name" error={form.formState.errors.name?.message}>
                <input {...form.register("name")} className={inputCls} />
              </Field>
              <Field label="Email" error={form.formState.errors.email?.message}>
                <input type="email" {...form.register("email")} className={inputCls} />
              </Field>
              <Field label="Subject" error={form.formState.errors.subject?.message}>
                <input {...form.register("subject")} className={inputCls} />
              </Field>
              <Field label="Message" error={form.formState.errors.message?.message}>
                <textarea rows={6} {...form.register("message")} className={inputCls} />
              </Field>
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="px-8 py-4 bg-navy text-white font-semibold rounded-sm hover:bg-navy-deep transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Find us</div>
            <h2 className="mt-3 font-display text-4xl text-navy">Makerere University.</h2>
            <address className="mt-6 not-italic text-navy text-lg leading-relaxed">
              Malaika Children Initiative<br />
              Makerere Innovation & Incubation Centre<br />
              Makerere University, Kampala<br />
              Uganda
            </address>

            <div className="mt-8 rounded-sm overflow-hidden border border-border">
              <iframe
                title="Makerere University map"
                src="https://www.google.com/maps?q=Makerere+University,+Kampala,+Uganda&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-8">
              <div className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Follow</div>
              <div className="flex gap-3">
                {[Facebook, Instagram, Music2, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 grid place-items-center rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-gold-light transition"
                    aria-label="Social"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const inputCls = "w-full px-4 py-3 rounded-sm bg-white border border-border text-navy focus:outline-none focus:border-gold transition";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-navy/70">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="block mt-1 text-xs text-red-soft">{error}</span>}
    </label>
  );
}
