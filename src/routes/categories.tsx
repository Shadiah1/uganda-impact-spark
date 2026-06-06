import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { CATEGORIES } from "@/lib/categories";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, School } from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Award Categories — SIA 2026" },
      { name: "description", content: "All 12 award categories for the Student Impact Awards 2026 plus honorary recognitions." },
      { property: "og:title", content: "12 SIA Award Categories" },
      { property: "og:description", content: "From Innovator to Girls in Action — see every category and partner." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Categories"
        title="Twelve categories. One national stage."
        subtitle="Every category aligns with a UN Sustainable Development Goal and is judged by an independent panel."
      />

      <section className="py-20">
        <div className="container-prose">
          <div className="grid md:grid-cols-2 gap-6">
            {CATEGORIES.map((c, i) => (
              <AnimateOnScroll key={c.id} delay={(i % 4) * 60}>
                <div className="bg-white border border-border hover:border-gold/60 rounded-sm overflow-hidden transition">
                  <div className="p-7">
                    <div className="flex items-start gap-5">
                      <div className="text-4xl">{c.icon}</div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
                          Award 0{i + 1 < 10 ? i + 1 : i + 1}
                        </div>
                        <h3 className="mt-2 font-display text-2xl text-navy leading-tight">
                          {c.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="d" className="border-t border-border">
                      <AccordionTrigger className="px-7 hover:no-underline text-sm font-semibold text-navy">
                        Description & Partners
                      </AccordionTrigger>
                      <AccordionContent className="px-7 pb-7">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {c.description}
                        </p>
                        <div className="mt-5">
                          <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-3">
                            Potential Partners
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {c.partners.map((p) => (
                              <span
                                key={p}
                                className="text-xs px-3 py-1 rounded-full bg-gold-pale text-navy border border-gold/30"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-white">
        <div className="container-prose">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-gold-light">Honorary Awards</div>
            <h2 className="mt-3 font-display text-4xl">Two collective honours.</h2>
            <p className="mt-3 text-white/65 max-w-xl mx-auto">
              Beyond individual recognition, SIA salutes the institutions
              shaping student excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-sm border-2 border-gold bg-gradient-to-br from-gold/[0.08] to-transparent">
              <Users className="text-gold-light" size={32} />
              <h3 className="mt-5 font-display text-3xl text-gold-light">
                Student Club of the Year
              </h3>
              <p className="mt-4 text-white/75 leading-relaxed">
                Awarded to a registered student club, society or society of
                clubs whose collective action over the academic year set the
                national standard for student-led impact.
              </p>
            </div>
            <div className="p-10 rounded-sm border border-white/20 bg-white/[0.04] relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-purple/30 blur-3xl" />
              <School className="text-gold-light relative" size={32} />
              <h3 className="mt-5 font-display text-3xl text-gold-light relative">
                School of the Year
              </h3>
              <p className="mt-4 text-white/75 leading-relaxed relative">
                Recognises the school whose culture, leadership and student
                support produced the deepest pipeline of SIA finalists and
                whose contribution to Uganda's youth ecosystem is exceptional.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
