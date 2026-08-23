"use client";

import {
    useRef,
    useState,
} from "react";
import {
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
} from "framer-motion";

export type StickyStoryItem = {
    eyebrow: string;
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
};

type StickyStoryProps = {
    items: StickyStoryItem[];
};

export function StickyStory({
    items,
}: StickyStoryProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        mass: 0.8,
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (shouldReduceMotion || items.length === 0) {
            return;
        }

        const nextIndex = Math.min(
            items.length - 1,
            Math.floor(latest * items.length),
        );

        setActiveIndex(nextIndex);
    });

    const activeItem = items[activeIndex];

    if (!activeItem) {
        return null;
    }

    return (
        <div ref={sectionRef} className="relative">
            <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                {/* Painel fixo */}
                <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
                    <div className="w-full py-16 lg:py-0">
                        <div className="relative overflow-hidden rounded-feature border border-border-dark bg-surface-dark-elevated p-8 shadow-elevated sm:p-10">
                            <div className="absolute inset-y-0 left-0 w-1 bg-white/10">
                                <motion.div
                                    className="h-full origin-top bg-brand"
                                    style={{
                                        scaleY: shouldReduceMotion ? 1 : smoothProgress,
                                    }}
                                />
                            </div>

                            <div className="pl-3">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                                    {activeItem.eyebrow}
                                </p>

                                <motion.h3
                                    key={`title-${activeIndex}`}
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : { opacity: 0, y: 16 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="mt-5 font-heading text-3xl font-bold sm:text-4xl"
                                    style={{ color: "var(--text-inverse)" }}
                                >
                                    {activeItem.title}
                                </motion.h3>

                                <motion.p
                                    key={`description-${activeIndex}`}
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : { opacity: 0, y: 12 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.6,
                                        delay: shouldReduceMotion ? 0 : 0.06,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="mt-5 text-lg leading-8 text-text-inverse-muted"
                                >
                                    {activeItem.description}
                                </motion.p>

                                <motion.div
                                    key={`metric-${activeIndex}`}
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : { opacity: 0, scale: 0.96 }
                                    }
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.65,
                                        delay: shouldReduceMotion ? 0 : 0.1,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="mt-10 rounded-card border border-border-dark bg-black/20 p-6"
                                >
                                    <p className="font-heading text-5xl font-bold text-brand">
                                        {activeItem.metric}
                                    </p>

                                    <p className="mt-2 text-sm font-medium text-text-inverse-muted">
                                        {activeItem.metricLabel}
                                    </p>
                                </motion.div>

                                <div className="mt-8 flex gap-2">
                                    {items.map((item, index) => (
                                        <span
                                            key={item.eyebrow}
                                            className={[
                                                "h-1.5 flex-1 rounded-pill transition-colors duration-300",
                                                index === activeIndex
                                                    ? "bg-brand"
                                                    : "bg-white/10",
                                            ].join(" ")}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conteúdo que conduz o scroll */}
                <div>
                    {items.map((item, index) => (
                        <article
                            key={item.eyebrow}
                            className="flex min-h-[72vh] items-center border-b border-border-dark py-20 last:border-b-0"
                        >
                            <div
                                className={[
                                    "w-full transition-opacity duration-500",
                                    index === activeIndex
                                        ? "opacity-100"
                                        : "opacity-40",
                                ].join(" ")}
                            >
                                <span className="font-heading text-6xl font-bold text-brand/20 sm:text-7xl">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                                    {item.eyebrow}
                                </p>

                                <h2
                                    className="mt-4 max-w-xl font-heading text-3xl font-bold sm:text-4xl lg:text-5xl"
                                    style={{ color: "var(--text-inverse)" }}
                                >
                                    {item.title}
                                </h2>

                                <p className="mt-6 max-w-xl text-lg leading-8 text-text-inverse-muted">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}