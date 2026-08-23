"use client";

import { useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
} from "framer-motion";

export type CarouselItem = {
    icon: LucideIcon;
    title: string;
    description: string;
};

type CarouselProps = {
    items: CarouselItem[];
};

/*
 * Carrossel horizontal guiado por scroll, no estilo das paginas de
 * produto: a secao trava na tela e o scroll vertical vira deslocamento
 * horizontal entre os cards.
 *
 * Diferencas de proposito em relacao ao carrossel de 6 passos do
 * template da agencia (src/components/sections/implementation-process.tsx):
 * - trilho bem mais curto (poucos itens, nao precisa de tanto scroll);
 * - o card ativo cresce e os vizinhos encolhem/apagam, dando
 *   profundidade em vez de troca seca entre slides identicos;
 * - os numeros acima da barra de progresso sao clicaveis tambem no
 *   desktop, nao so no mobile;
 * - a ponta da barra de progresso fecha com um check, marcando claramente
 *   o fim da sequencia.
 */

function useCardMotion(progress: MotionValue<number>, index: number, total: number) {
    const step = 1 / (total - 1);
    const center = index * step;
    const prev = Math.max(0, center - step);
    const next = Math.min(1, center + step);

    const isFirst = index === 0;
    const isLast = index === total - 1;

    const scaleInput = isFirst
        ? [center, next]
        : isLast
            ? [prev, center]
            : [prev, center, next];
    const scaleOutput = isFirst
        ? [1, 0.9]
        : isLast
            ? [0.9, 1]
            : [0.9, 1, 0.9];

    const opacityInput = isFirst
        ? [center, next]
        : isLast
            ? [prev, center]
            : [prev, center, next];
    const opacityOutput = isFirst
        ? [1, 0.55]
        : isLast
            ? [0.55, 1]
            : [0.55, 1, 0.55];

    const scale = useTransform(progress, scaleInput, scaleOutput);
    const opacity = useTransform(progress, opacityInput, opacityOutput);

    return { scale, opacity };
}

function Card({
    item,
    index,
    total,
    progress,
}: {
    item: CarouselItem;
    index: number;
    total: number;
    progress: MotionValue<number>;
}) {
    const Icon = item.icon;
    const { scale, opacity } = useCardMotion(progress, index, total);

    return (
        <div className="flex h-full items-center justify-center px-4">
            <motion.div
                className="w-full max-w-xl rounded-feature border border-border bg-white p-10 shadow-card sm:p-12"
                style={{ scale, opacity, willChange: "transform, opacity" }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
                        <Icon className="h-8 w-8 text-brand" strokeWidth={1.6} />
                    </div>

                    <span className="font-heading text-6xl font-bold text-brand/10">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>

                <h3 className="mt-8 font-heading text-3xl font-bold leading-snug text-text-primary">
                    {item.title}
                </h3>

                <p className="mt-4 text-lg text-text-secondary">
                    {item.description}
                </p>
            </motion.div>
        </div>
    );
}

function DesktopCarousel({ items }: { items: CarouselItem[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const total = items.length;

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"],
    });

    /*
     * translateX em porcentagem e relativo a largura da PROPRIA caixa
     * que recebe o transform. Por isso a faixa precisa ter largura
     * explicita de `total*100%` (nao apenas somar filhos shrink-0) -
     * sem isso, -75% seria 75% da largura do container visivel, nao
     * das 4 telas de conteudo, e o carrossel nunca chegaria ao fim.
     */
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${((total - 1) / total) * 100}%`],
    );

    function goToStep(index: number) {
        const track = trackRef.current;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const trackTop = window.scrollY + rect.top;
        const scrollable = track.offsetHeight - window.innerHeight;
        const target = trackTop + (index / (total - 1)) * scrollable;

        window.scrollTo({ top: target, behavior: "smooth" });
    }

    return (
        <div ref={trackRef} className="relative hidden h-[200vh] lg:block">
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
                <div className="relative h-[28rem] overflow-hidden">
                    <motion.div
                        className="flex h-full"
                        style={{ x, width: `${total * 100}%` }}
                    >
                        {items.map((item, index) => (
                            <div
                                key={item.title}
                                className="h-full shrink-0"
                                style={{ width: `${100 / total}%` }}
                            >
                                <Card
                                    item={item}
                                    index={index}
                                    total={total}
                                    progress={scrollYProgress}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <ProgressRail
                    total={total}
                    progress={scrollYProgress}
                    onStepClick={goToStep}
                />
            </div>
        </div>
    );
}

function ProgressRail({
    total,
    progress,
    onStepClick,
}: {
    total: number;
    progress: MotionValue<number>;
    onStepClick: (index: number) => void;
}) {
    const scaleX = useTransform(progress, [0, 1], [0, 1]);
    const checkOpacity = useTransform(progress, [0.94, 1], [0, 1]);
    const checkScale = useTransform(progress, [0.94, 1], [0.6, 1]);

    return (
        <div className="mx-auto mt-10 flex w-full max-w-lg items-center gap-4">
            <div className="flex gap-5">
                {Array.from({ length: total }).map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onStepClick(index)}
                        aria-label={`Ir para o diferencial ${index + 1}`}
                        className="font-heading text-xs font-bold tracking-[0.1em] text-text-secondary transition-colors hover:text-brand"
                    >
                        {String(index + 1).padStart(2, "0")}
                    </button>
                ))}
            </div>

            <div className="relative h-1 flex-1 overflow-hidden rounded-pill bg-border">
                <motion.div
                    className="absolute inset-y-0 left-0 rounded-pill bg-brand"
                    style={{ scaleX, transformOrigin: "left center" }}
                />
            </div>

            {/* Marca clara o fim da sequencia. */}
            <motion.span
                className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand"
                style={{ opacity: checkOpacity, scale: checkScale }}
            >
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </motion.span>
        </div>
    );
}

function MobileCarousel({ items }: { items: CarouselItem[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    function handleScroll() {
        const track = trackRef.current;
        if (!track || track.clientWidth === 0) return;

        const index = Math.round(track.scrollLeft / track.clientWidth);
        setActive(Math.max(0, Math.min(index, items.length - 1)));
    }

    function goTo(index: number) {
        const track = trackRef.current;
        if (!track) return;

        track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });
    }

    return (
        <div className="lg:hidden">
            <div
                ref={trackRef}
                onScroll={handleScroll}
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="w-full shrink-0 snap-center px-2"
                        >
                            <div className="rounded-feature border border-border bg-white p-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
                                        <Icon
                                            className="h-6 w-6 text-brand"
                                            strokeWidth={1.6}
                                        />
                                    </div>

                                    <span className="font-heading text-4xl font-bold text-brand/10">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <h3 className="mt-6 font-heading text-xl font-bold leading-snug text-text-primary">
                                    {item.title}
                                </h3>

                                <p className="mt-2.5 text-base text-text-secondary">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
                {items.map((item, index) => (
                    <button
                        key={item.title}
                        type="button"
                        onClick={() => goTo(index)}
                        aria-label={`Ir para o diferencial ${index + 1}`}
                        className={`h-2 rounded-pill transition-all ${
                            active === index ? "w-6 bg-brand" : "w-2 bg-border"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

function StaticGrid({ items }: { items: CarouselItem[] }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2">
            {items.map((item, index) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="rounded-feature border border-border bg-white p-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
                                <Icon className="h-6 w-6 text-brand" strokeWidth={1.6} />
                            </div>

                            <span className="font-heading text-4xl font-bold text-brand/10">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                        </div>

                        <h3 className="mt-6 font-heading text-xl font-bold leading-snug text-text-primary">
                            {item.title}
                        </h3>

                        <p className="mt-2.5 text-base text-text-secondary">
                            {item.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export function DifferentialsCarousel({ items }: CarouselProps) {
    const shouldReduceMotion = useReducedMotion();

    // Sem prender a tela nem carrossel para quem pediu movimento
    // reduzido: grade estatica direto.
    if (shouldReduceMotion) {
        return (
            <div className="mx-auto mt-10 max-w-4xl lg:mt-12">
                <StaticGrid items={items} />
            </div>
        );
    }

    return (
        <div className="mt-10 lg:mt-12">
            <DesktopCarousel items={items} />

            <div className="mx-auto max-w-lg lg:hidden">
                <MobileCarousel items={items} />
            </div>
        </div>
    );
}
