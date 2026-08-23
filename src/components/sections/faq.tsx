import { faqItems } from "@/data/faq";
import { FaqAccordion } from "@/components/motion/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { Highlight } from "@/components/ui/highlight";

export function Faq() {
    // Geracao do schema structured data JSON-LD para SEO no Google
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <section id="faq" className="relative overflow-x-clip bg-background py-20 sm:py-24 lg:py-28">
            {/* Tag de SEO Rich Snippets JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="container-page relative">
                <Reveal>
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex items-center rounded-full bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand sm:text-sm">
                            Perguntas Frequentes
                        </span>

                        <h2 className="mt-4 text-pretty text-3xl text-text-primary sm:text-4xl lg:text-[2.85rem]">
                            Tudo o que você precisa saber sobre a{" "}
                            <Highlight className="brand-wordmark">
                                s<span className="brand-macron">o</span>ma
                            </Highlight>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base text-text-secondary sm:mt-6 sm:text-lg">
                            Respostas objetivas para as principais dúvidas práticas de líderes e
                            equipes antes de agendar uma demonstração.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <FaqAccordion items={faqItems} />
                </Reveal>
            </div>
        </section>
    );
}
