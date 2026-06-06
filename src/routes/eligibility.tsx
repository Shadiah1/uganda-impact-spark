import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, X, Info } from "lucide-react";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Eligibility & FAQ — SIA 2026" },
      { name: "description", content: "Who can apply for the Student Impact Awards 2026 — eligibility rules, age table, FAQs." },
      { property: "og:title", content: "SIA 2026 Eligibility & FAQ" },
      { property: "og:description", content: "Check if you qualify for Uganda's national student awards." },
    ],
  }),
  component: EligibilityPage,
});

const CAN = [
  "Aged 9–24 on 1 January 2026.",
  "Currently enrolled in a Ugandan primary, secondary or tertiary institution.",
  "Have not yet completed an undergraduate degree.",
  "Holding a valid Ugandan student ID or admission letter.",
  "Lead or co-lead an original project, work or initiative.",
  "Endorsed by a teacher, head of department or principal.",
];

const CANNOT = [
  "Holders of a completed Bachelor's degree or higher.",
  "Applicants outside the 9–24 age range on 1 January 2026.",
  "Students enrolled in institutions outside Uganda.",
  "Projects led entirely by adults with the student as nominal lead.",
  "Submissions without verifiable endorsement from a school official.",
  "Direct family members of SIA judges, board or core organising team.",
];

const TABLE = [
  ["9 – 13", "Primary school", "P4 – P7", "Yes"],
  ["14 – 17", "Secondary school", "S1 – S6", "Yes"],
  ["18 – 22", "University / tertiary", "Pre-degree", "Yes"],
  ["18 – 24", "TVET / Vocational", "Certificate / Diploma", "Yes"],
  ["Any", "Completed Bachelor's", "Post-degree", "No"],
];

const FAQ: [string, string][] = [
  ["Is there an application fee?", "No. Applications to the Student Impact Awards are completely FREE. We never charge applicants, finalists or winners."],
  ["Can I apply in more than one category?", "Yes — you may submit up to two distinct applications across different categories, but each must reflect separate work."],
  ["Can a group of students apply together?", "Yes, for project-based categories (e.g. Innovator, Sustainability, Green Earth). One lead applicant must be named; co-leads can be listed in the submission."],
  ["Do I need to be enrolled at the time of the awards?", "You must be enrolled when you apply (by 25 July 2026). If you complete your studies between application and the gala, you remain eligible."],
  ["My school is not on a partner list — can I still apply?", "Absolutely. SIA is open to every Ugandan student in every accredited institution, public or private."],
  ["What if I am under 18?", "A parent or legal guardian must co-sign the consent step in the application. You'll find the conditional consent fields in Step 4."],
  ["How are entries judged?", "Each category has an independent expert panel scoring against published criteria: originality, evidence of impact, scalability and integrity."],
  ["Will my data be shared?", "No personal data is sold or shared. Endorser contacts are used solely for verification."],
  ["When and where is the ceremony?", "Tuesday 8 September 2026 at the Makerere Innovation & Incubation Centre, Kampala. Finalists receive travel support."],
  ["How do I follow updates?", "Follow @sia.ug on Facebook, Instagram, TikTok and X, or subscribe via the contact page."],
];

function EligibilityPage() {
  return (
    <>
      <PageHero
        breadcrumb="Eligibility"
        title="Who can apply?"
        subtitle="SIA is free, transparent and open to every eligible Ugandan student. Check the rules below before you apply."
      />

      <section className="py-20">
        <div className="container-prose grid md:grid-cols-2 gap-6">
          <div className="rounded-sm border-2 border-green/40 bg-green/[0.04] p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 grid place-items-center bg-green text-white rounded-sm">
                <Check size={18} />
              </div>
              <h3 className="font-display text-2xl text-green">You CAN apply if…</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {CAN.map((c) => (
                <li key={c} className="flex gap-3 text-navy text-[15px] leading-relaxed">
                  <Check size={18} className="text-green shrink-0 mt-0.5" /> {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border-2 border-red-soft/40 bg-red-soft/[0.04] p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 grid place-items-center bg-red-soft text-white rounded-sm">
                <X size={18} />
              </div>
              <h3 className="font-display text-2xl text-red-soft">You CANNOT apply if…</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {CANNOT.map((c) => (
                <li key={c} className="flex gap-3 text-navy text-[15px] leading-relaxed">
                  <X size={18} className="text-red-soft shrink-0 mt-0.5" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-off-white border-y border-border">
        <div className="container-prose">
          <h2 className="font-display text-3xl text-navy">Age & institution table</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left bg-white border border-border">
              <thead className="bg-navy text-white">
                <tr>
                  {["Age Range", "Institution Type", "Level", "Eligible?"].map((h) => (
                    <th key={h} className="px-5 py-4 text-xs uppercase tracking-[0.2em] font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-5 py-4 ${
                        j === 3 ? (cell === "Yes" ? "text-green font-semibold" : "text-red-soft font-semibold") : "text-navy"
                      }`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex gap-4 p-6 border-l-4 border-gold bg-gold-pale rounded-sm">
            <Info className="text-gold shrink-0" />
            <p className="text-navy leading-relaxed">
              <strong>Applicants under 18:</strong> a parent or legal guardian
              must co-sign the consent declaration in Step 4 of the
              application. Without this signature the submission cannot be
              processed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-prose max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">FAQ</div>
          <h2 className="mt-3 font-display text-4xl text-navy">Frequently asked questions.</h2>

          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-navy font-display text-xl hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
