import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { CATEGORIES } from "@/lib/categories";
import { Check, ChevronLeft, ChevronRight, Upload } from "lucide-react";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply Free — Student Impact Awards 2026" },
      { name: "description", content: "Submit your application for SIA 2026. Free, four steps, deadline 25 July 2026." },
      { property: "og:title", content: "Apply to the Student Impact Awards 2026" },
      { property: "og:description", content: "Open to Ugandan students aged 9–24. Applications close 25 July 2026." },
    ],
  }),
  component: ApplyPage,
});

const DISTRICTS = [
  "Kampala","Wakiso","Mukono","Jinja","Mbale","Tororo","Soroti","Gulu","Lira","Arua",
  "Mbarara","Kabale","Kasese","Fort Portal","Hoima","Masaka","Mityana","Mubende","Iganga","Bushenyi",
  "Kitgum","Pader","Moroto","Kotido","Nebbi","Apac","Kumi","Kapchorwa","Bundibugyo","Rakai",
];

const schema = z.object({
  // Step 1
  fullName: z.string().trim().min(2, "Full name required").max(100),
  age: z.coerce.number().min(9, "Min age 9").max(24, "Max age 24"),
  dob: z.string().min(1, "Date of birth required"),
  gender: z.enum(["Female", "Male", "Prefer not to say"], { message: "Select gender" }),
  district: z.string().min(1, "District required"),
  institution: z.string().trim().min(2, "Institution required").max(150),
  institutionType: z.enum(["Primary", "Secondary", "Tertiary / University", "TVET / Vocational"], { message: "Type required" }),
  level: z.string().trim().min(1, "Level / year required").max(50),
  schoolHead: z.string().trim().min(2, "School head name required").max(100),
  schoolHeadPhone: z.string().trim().min(7, "Phone required").max(30),

  // Step 2
  projectTitle: z.string().trim().min(3, "Title required").max(120),
  category: z.string().min(1, "Category required"),
  problem: z.string().trim().min(20, "Describe the problem").max(800),
  solution: z.string().trim().min(20, "Describe the solution").max(800),
  impact: z.string().trim().min(10, "Describe impact").max(800),
  beneficiaries: z.coerce.number().min(1, "Required").max(10_000_000),
  videoUrl: z.string().url("Enter a valid URL").or(z.literal("")).optional(),

  // Step 3
  endorserName: z.string().trim().min(2, "Required").max(100),
  endorserRole: z.string().trim().min(2, "Required").max(100),
  endorserOrg: z.string().trim().min(2, "Required").max(150),
  endorserPhone: z.string().trim().min(7, "Required").max(30),
  endorserEmail: z.string().trim().email("Valid email").max(160),
  endorsementFileName: z.string().optional(),

  // Step 4
  consentTrue: z.literal(true, { message: "Required" }),
  consentRules: z.literal(true, { message: "Required" }),
  consentMedia: z.literal(true, { message: "Required" }),
  consentData: z.literal(true, { message: "Required" }),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
});
type Form = z.infer<typeof schema>;

const STEPS = ["Personal Info", "Project", "Endorsement", "Consent"];
const STEP_FIELDS: (keyof Form)[][] = [
  ["fullName","age","dob","gender","district","institution","institutionType","level","schoolHead","schoolHeadPhone"],
  ["projectTitle","category","problem","solution","impact","beneficiaries","videoUrl"],
  ["endorserName","endorserRole","endorserOrg","endorserPhone","endorserEmail"],
  ["consentTrue","consentRules","consentMedia","consentData"],
];

function ApplyPage() {
  const [step, setStep] = useState(0);
  const form = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { videoUrl: "", endorsementFileName: "" },
  });

  const next = async () => {
    const ok = await form.trigger(STEP_FIELDS[step] as any);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (v: Form) => {
    console.log("application", v);
    toast.success("Application submitted! Check your email for confirmation.");
    form.reset();
    setStep(0);
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <>
      <PageHero
        breadcrumb="Apply"
        title="Apply to SIA 2026."
        subtitle="Four steps. Roughly fifteen minutes. Completely free."
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-gold text-navy font-semibold text-sm">
          ⏳ Applications close: 25 July 2026
        </div>
      </PageHero>

      <section className="py-16 bg-off-white border-b border-border">
        <div className="container-prose max-w-3xl">
          <div className="flex justify-between text-xs uppercase tracking-[0.2em] mb-3">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`flex-1 text-center ${
                  i === step ? "text-navy font-semibold" : i < step ? "text-gold" : "text-muted-foreground"
                }`}
              >
                <div className="flex justify-center mb-2">
                  <div className={`w-7 h-7 grid place-items-center rounded-full text-xs ${
                    i < step ? "bg-gold text-navy" : i === step ? "bg-navy text-gold-light" : "bg-white border border-border text-muted-foreground"
                  }`}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                </div>
                {s}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </section>

      <section className="py-16">
        <div className="container-prose max-w-3xl">
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border border-border rounded-sm p-8 md:p-12">
            {step === 0 && <StepPersonal form={form} />}
            {step === 1 && <StepProject form={form} />}
            {step === 2 && <StepEndorsement form={form} />}
            {step === 3 && <StepConsent form={form} />}

            <div className="mt-10 pt-8 border-t border-border flex justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-border text-navy disabled:opacity-40 hover:border-gold transition"
              >
                <ChevronLeft size={16} /> Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-navy text-white font-semibold hover:bg-navy-deep transition"
                >
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-gold text-navy font-semibold hover:bg-gold-light transition"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

/* ------- Step blocks ------- */

function StepPersonal({ form }: { form: UseFormReturn<Form> }) {
  const { register, formState: { errors } } = form;
  return (
    <Section title="Step 1 · Personal Info" desc="Tell us who you are and where you study.">
      <Row>
        <Field label="Full name" error={errors.fullName?.message}><input {...register("fullName")} className={inp} /></Field>
        <Field label="Age" error={errors.age?.message}><input type="number" min={9} max={24} {...register("age")} className={inp} /></Field>
      </Row>
      <Row>
        <Field label="Date of birth" error={errors.dob?.message}><input type="date" {...register("dob")} className={inp} /></Field>
        <Field label="Gender" error={errors.gender?.message}>
          <select {...register("gender")} className={inp}>
            <option value="">Select…</option>
            <option>Female</option><option>Male</option><option>Prefer not to say</option>
          </select>
        </Field>
      </Row>
      <Field label="District" error={errors.district?.message}>
        <select {...register("district")} className={inp}>
          <option value="">Select district…</option>
          {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </Field>
      <Field label="Institution name" error={errors.institution?.message}><input {...register("institution")} className={inp} /></Field>
      <Field label="Institution type" error={errors.institutionType?.message}>
        <div className="grid sm:grid-cols-2 gap-3 mt-1">
          {(["Primary","Secondary","Tertiary / University","TVET / Vocational"] as const).map((t) => (
            <label key={t} className="flex items-center gap-3 px-4 py-3 border border-border rounded-sm cursor-pointer hover:border-gold transition has-[:checked]:border-gold has-[:checked]:bg-gold-pale">
              <input type="radio" value={t} {...register("institutionType")} className="accent-gold" />
              <span className="text-sm text-navy">{t}</span>
            </label>
          ))}
        </div>
      </Field>
      <Row>
        <Field label="Level / Year" error={errors.level?.message}><input placeholder="e.g. S5, Year 2" {...register("level")} className={inp} /></Field>
        <Field label="School head name" error={errors.schoolHead?.message}><input {...register("schoolHead")} className={inp} /></Field>
      </Row>
      <Field label="School head phone" error={errors.schoolHeadPhone?.message}><input {...register("schoolHeadPhone")} className={inp} /></Field>
    </Section>
  );
}

function StepProject({ form }: { form: UseFormReturn<Form> }) {
  const { register, formState: { errors }, watch } = form;
  const solutionLen = (watch("solution") || "").length;
  return (
    <Section title="Step 2 · Project" desc="What are you submitting?">
      <Field label="Project title" error={errors.projectTitle?.message}><input {...register("projectTitle")} className={inp} /></Field>
      <Field label="Category" error={errors.category?.message}>
        <select {...register("category")} className={inp}>
          <option value="">Select category…</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </Field>
      <Field label="Problem you're solving" error={errors.problem?.message}><textarea rows={3} {...register("problem")} className={inp} /></Field>
      <Field label="Your solution" error={errors.solution?.message} hint={`${solutionLen} / 800`}>
        <textarea rows={4} maxLength={800} {...register("solution")} className={inp} />
      </Field>
      <Field label="Impact achieved so far" error={errors.impact?.message}><textarea rows={3} {...register("impact")} className={inp} /></Field>
      <Row>
        <Field label="Number of beneficiaries" error={errors.beneficiaries?.message}><input type="number" min={1} {...register("beneficiaries")} className={inp} /></Field>
        <Field label="Video URL (optional)" error={errors.videoUrl?.message}><input placeholder="https://youtube.com/…" {...register("videoUrl")} className={inp} /></Field>
      </Row>
    </Section>
  );
}

function StepEndorsement({ form }: { form: UseFormReturn<Form> }) {
  const { register, formState: { errors }, setValue, watch } = form;
  const fileName = watch("endorsementFileName");
  return (
    <Section title="Step 3 · Endorsement" desc="A teacher, principal or supervisor must endorse your application.">
      <Row>
        <Field label="Endorser name" error={errors.endorserName?.message}><input {...register("endorserName")} className={inp} /></Field>
        <Field label="Role" error={errors.endorserRole?.message}><input {...register("endorserRole")} className={inp} /></Field>
      </Row>
      <Field label="Organisation / school" error={errors.endorserOrg?.message}><input {...register("endorserOrg")} className={inp} /></Field>
      <Row>
        <Field label="Phone" error={errors.endorserPhone?.message}><input {...register("endorserPhone")} className={inp} /></Field>
        <Field label="Email" error={errors.endorserEmail?.message}><input type="email" {...register("endorserEmail")} className={inp} /></Field>
      </Row>
      <Field label="Endorsement letter (PDF or image)">
        <label className="flex items-center gap-3 px-4 py-4 border border-dashed border-border rounded-sm cursor-pointer hover:border-gold transition">
          <Upload size={18} className="text-gold" />
          <span className="text-sm text-navy">{fileName || "Click to upload signed endorsement"}</span>
          <input
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            onChange={(e) => setValue("endorsementFileName", e.target.files?.[0]?.name || "")}
          />
        </label>
      </Field>
    </Section>
  );
}

function StepConsent({ form }: { form: UseFormReturn<Form> }) {
  const { register, formState: { errors }, watch } = form;
  const age = Number(watch("age"));
  const under18 = age && age < 18;
  return (
    <Section title="Step 4 · Consent" desc="Read and confirm before submitting.">
      <div className="space-y-4">
        {[
          ["consentTrue","All information in this application is true and complete to the best of my knowledge."],
          ["consentRules","I have read and agree to the SIA 2026 rules, eligibility criteria and judging process."],
          ["consentMedia","I grant SIA permission to feature my name, photo and project in promotional materials."],
          ["consentData","I consent to SIA processing my personal data in line with Uganda's Data Protection and Privacy Act."],
        ].map(([name, label]) => (
          <label key={name} className="flex gap-3 items-start p-4 border border-border rounded-sm cursor-pointer hover:border-gold transition">
            <input type="checkbox" {...register(name as any)} className="mt-1 accent-gold" />
            <div>
              <span className="text-sm text-navy leading-relaxed">{label}</span>
              {errors[name as keyof Form]?.message && (
                <div className="text-xs text-red-soft mt-1">{String(errors[name as keyof Form]?.message)}</div>
              )}
            </div>
          </label>
        ))}
      </div>

      {under18 ? (
        <div className="mt-8 p-6 border-l-4 border-gold bg-gold-pale rounded-sm">
          <div className="text-sm font-semibold text-navy">Parent / Guardian consent (required, under 18)</div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <Field label="Parent / guardian name"><input {...register("parentName")} className={inp} /></Field>
            <Field label="Parent / guardian phone"><input {...register("parentPhone")} className={inp} /></Field>
          </div>
        </div>
      ) : null}
    </Section>
  );
}

/* ------- Tiny helpers ------- */

const inp = "w-full px-4 py-3 rounded-sm bg-white border border-border text-navy focus:outline-none focus:border-gold transition";

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-3xl text-navy">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-5">{children}</div>;
}
function Field({
  label, error, hint, children,
}: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex justify-between items-baseline">
        <span className="text-xs uppercase tracking-[0.2em] text-navy/70">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <div className="mt-2">{children}</div>
      {error && <span className="block mt-1 text-xs text-red-soft">{error}</span>}
    </label>
  );
}
