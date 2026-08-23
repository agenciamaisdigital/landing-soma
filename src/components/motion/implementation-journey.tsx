"use client";

import { useEffect, useRef, useState } from "react";
import {
    GraduationCap,
    ScanSearch,
    Settings2,
    Sprout,
    type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppGlyph } from "@/components/ui/brand-glyphs";

/*
 * Padrao de interacao emprestado da secao "Funil de Vendas" do
 * template da agencia (src/components/sections/sales-funnel.tsx):
 * IntersectionObserver decide qual etapa esta mais visivel enquanto a
 * pagina rola normalmente (sem prender a tela), e esse indice comanda
 * o painel fixo a esquerda e o destaque de cada etapa a direita.
 * A identidade visual aqui e inteiramente da soma — so o mecanismo de
 * interacao foi reaproveitado.
 */

type Step = {
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
    accent?: "whatsapp";
};

const steps: Step[] = [
    {
        number: "01",
        title: "Entendemos sua igreja",
        description:
            "Antes de configurar a plataforma, entendemos como sua igreja funciona hoje: estrutura, ministérios, programações, equipes e principais necessidades. A partir disso, orientamos a configuração inicial da sōma de acordo com a realidade da comunidade.",
        icon: ScanSearch,
    },
    {
        number: "02",
        title: "Configuramos a sōma",
        description:
            "Preparamos os principais dados, módulos, permissões e acessos para que o ambiente esteja pronto para começar a ser utilizado. A plataforma se adapta à igreja — não o contrário.",
        icon: Settings2,
    },
    {
        number: "03",
        title: "Apoiamos sua equipe",
        description:
            "Líderes e responsáveis recebem orientação para entender os principais fluxos e começar a utilizar o sistema de gestão da igreja com segurança e autonomia, sem complexidade desnecessária.",
        icon: GraduationCap,
    },
    {
        number: "04",
        title: "Acompanhamento direto pelo WhatsApp",
        description:
            "Durante a implantação, sua igreja conta com um canal direto de suporte pelo WhatsApp para tirar dúvidas, pedir orientações e ajustar detalhes conforme começa a usar a plataforma.",
        icon: WhatsAppGlyph as unknown as LucideIcon,
        accent: "whatsapp",
    },
    {
        number: "05",
        title: "Evoluímos junto com sua igreja",
        description:
            "A implantação é apenas o começo. Conforme a igreja utiliza a sōma, novos módulos e processos podem ser incorporados — a plataforma acompanha o crescimento da comunidade.",
        icon: Sprout,
    },
];

function JourneyPanel({ activeIndex }: { activeIndex: number }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="relative w-full overflow-hidden rounded-feature border border-white/12 bg-white/[0.05] p-7 shadow-elevated sm:p-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-sand">
                Implantação acompanhada
            </p>

            <p className="mt-2 text-sm leading-6 text-text-inverse-muted">
                Da configuração inicial às primeiras semanas de uso.
            </p>

            <div className="relative mt-7">
                <div className="absolute bottom-5 left-4 top-5 w-px bg-white/10" />

                <motion.div
                    className="absolute left-4 top-5 w-px origin-top bg-brand"
                    animate={{
                        height: `${(activeIndex / (steps.length - 1)) * 100}%`,
                    }}
                    transition={
                        shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                    }
                    style={{ maxHeight: "calc(100% - 2.5rem)" }}
                />

                <div className="relative flex flex-col gap-2">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === activeIndex;
                        const isComplete = index < activeIndex;
                        const isWhatsapp = step.accent === "whatsapp";

                        return (
                            <div
                                key={step.number}
                                className={`flex items-center gap-3 rounded-card-sm px-2.5 py-2.5 transition-colors duration-500 ${
                                    isActive ? "bg-white/[0.06]" : ""
                                }`}
                            >
                                <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                                        isActive
                                            ? isWhatsapp
                                                ? "border-[#25D366] bg-[#25D366] text-white"
                                                : "border-brand bg-brand text-white"
                                            : isComplete
                                                ? "border-brand/40 bg-brand/10 text-brand-sand"
                                                : "border-white/12 bg-white/[0.03] text-white/35"
                                    }`}
                                >
                                    <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                                </span>

                                <div className="min-w-0">
                                    <p
                                        className={`text-[0.6rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-500 ${
                                            isActive ? "text-brand-sand" : "text-white/30"
                                        }`}
                                    >
                                        Etapa {step.number}
                                    </p>

                                    <p
                                        className={`truncate text-sm font-semibold transition-colors duration-500 ${
                                            isActive ? "text-white" : "text-white/45"
                                        }`}
                                    >
                                        {step.title}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function CompactTracker({ activeIndex }: { activeIndex: number }) {
    const active = steps[activeIndex];
    const Icon = active.icon;

    return (
        <div className="overflow-hidden rounded-card border border-white/12 bg-[#123B5D]/95 px-4 py-3 shadow-elevated backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] border border-brand/30 bg-brand/15 text-brand-sand">
                    <Icon className="h-4 w-4" strokeWidth={1.9} />
                </span>

                <div className="min-w-0 flex-1">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-brand-sand">
                        Etapa ativa
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-white">
                        {active.number} — {active.title}
                    </p>
                </div>

                <span className="shrink-0 text-xs font-semibold text-white/35">
                    {activeIndex + 1}/{steps.length}
                </span>
            </div>

            <div className="mt-3 flex gap-1.5">
                {steps.map((step, index) => (
                    <span key={step.number} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                        <span
                            className="block h-full origin-left rounded-full bg-brand transition-transform duration-300"
                            style={{ transform: index <= activeIndex ? "scaleX(1)" : "scaleX(0)" }}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
}

function MobileDot({ index, activeIndex }: { index: number; activeIndex: number }) {
    const isActive = index === activeIndex;
    const isComplete = index < activeIndex;

    return (
        <div className="absolute bottom-0 left-0 top-0 flex w-10 justify-center lg:hidden">
            {index !== steps.length - 1 && (
                <div className="absolute bottom-0 top-9 w-px bg-white/10">
                    <div
                        className="w-full origin-top bg-brand transition-[height] duration-500"
                        style={{ height: isComplete ? "100%" : "0%" }}
                    />
                </div>
            )}

            <div
                className={`relative z-10 mt-1 flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-500 ${
                    isActive
                        ? "border-brand bg-brand text-white"
                        : isComplete
                            ? "border-brand/50 bg-brand/10 text-brand-sand"
                            : "border-white/15 bg-[#123B5D] text-white/40"
                }`}
            >
                <span className="text-[0.6rem] font-bold">{String(index + 1).padStart(2, "0")}</span>
            </div>
        </div>
    );
}

export function ImplementationJourney() {
    const [activeIndex, setActiveIndex] = useState(0);
    const articleRefs = useRef<Array<HTMLElement | null>>([]);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const articles = articleRefs.current.filter(
            (article): article is HTMLElement => article !== null,
        );

        if (articles.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                const top = visible[0];
                if (!top) return;

                const index = Number(top.target.getAttribute("data-step-index"));
                if (!Number.isNaN(index)) setActiveIndex(index);
            },
            { root: null, rootMargin: "-34% 0px -34% 0px", threshold: [0, 0.15, 0.35, 0.65, 1] },
        );

        articles.forEach((article) => observer.observe(article));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="grid items-start gap-10 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pt-14">
            <div className="hidden self-stretch lg:block">
                <div className="sticky top-20 flex items-center">
                    <JourneyPanel activeIndex={activeIndex} />
                </div>
            </div>

            <div className="relative">
                <div className="sticky top-20 z-30 mb-8 lg:hidden">
                    <CompactTracker activeIndex={activeIndex} />
                </div>

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === activeIndex;
                    const isComplete = index < activeIndex;
                    const isWhatsapp = step.accent === "whatsapp";

                    return (
                        <article
                            key={step.number}
                            ref={(element) => {
                                articleRefs.current[index] = element;
                            }}
                            data-step-index={index}
                            aria-current={isActive ? "step" : undefined}
                            className="relative flex min-h-[58vh] items-center border-b border-white/10 py-12 pl-14 last:border-b-0 sm:min-h-[56vh] sm:pl-16 lg:min-h-[62vh] lg:pl-0"
                        >
                            <MobileDot index={index} activeIndex={activeIndex} />

                            <motion.div
                                className="w-full"
                                animate={{
                                    opacity: isActive ? 1 : isComplete ? 0.55 : 0.35,
                                }}
                                transition={
                                    shouldReduceMotion
                                        ? { duration: 0 }
                                        : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                                }
                            >
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-card-sm border transition-colors duration-500 ${
                                                isActive
                                                    ? isWhatsapp
                                                        ? "border-[#25D366] bg-[#25D366] text-white"
                                                        : "border-brand bg-brand text-white"
                                                    : "border-white/10 bg-white/[0.03] text-white/40"
                                            }`}
                                        >
                                            <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                                        </span>

                                        <p
                                            className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                                                isActive ? "text-brand-sand" : "text-text-inverse-muted"
                                            }`}
                                        >
                                            {step.number} — {step.title}
                                        </p>
                                    </div>

                                    <h3
                                        className={`mt-6 max-w-2xl font-heading text-2xl font-bold leading-snug transition-colors duration-500 sm:text-3xl ${
                                            isActive ? "text-white" : "text-text-inverse-muted"
                                        }`}
                                    >
                                        {step.title}
                                    </h3>

                                    <p
                                        className={`mt-4 max-w-2xl text-base leading-7 transition-colors duration-500 sm:text-lg ${
                                            isActive ? "text-text-inverse-muted" : "text-white/40"
                                        }`}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
