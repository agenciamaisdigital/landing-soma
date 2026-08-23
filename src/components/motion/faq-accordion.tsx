"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { type FaqItem } from "@/data/faq";

type FaqAccordionProps = {
    items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
    // Permite que o usuário abra/feche individualmente cada pergunta
    const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
    const shouldReduceMotion = useReducedMotion();

    const toggleItem = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="mx-auto mt-12 max-w-3xl space-y-4 sm:mt-16 sm:space-y-4">
            {items.map((item) => {
                const isOpen = openId === item.id;
                const buttonId = `faq-button-${item.id}`;
                const panelId = `faq-panel-${item.id}`;

                return (
                    <div
                        key={item.id}
                        className={`group rounded-2xl border transition-all duration-300 ${isOpen
                                ? "border-brand/40 bg-surface shadow-soft"
                                : "border-border/80 bg-surface hover:border-brand/30 hover:shadow-xs"
                            }`}
                    >
                        <h3>
                            <button
                                id={buttonId}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggleItem(item.id)}
                                className="flex w-full items-center justify-between gap-4 p-5 text-left font-heading text-lg font-bold text-text-primary sm:p-6 sm:text-xl"
                            >
                                <span className="transition-colors duration-200 group-hover:text-brand">
                                    {item.question}
                                </span>
                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                                            ? "bg-brand/10 text-brand rotate-180"
                                            : "bg-surface-subtle/50 text-text-secondary group-hover:bg-brand/5 group-hover:text-brand"
                                        }`}
                                >
                                    <ChevronDown className="h-5 w-5" />
                                </div>
                            </button>
                        </h3>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                    initial={
                                        shouldReduceMotion
                                            ? { opacity: 1, height: "auto" }
                                            : { opacity: 0, height: 0 }
                                    }
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={
                                        shouldReduceMotion
                                            ? { opacity: 1, height: "auto" }
                                            : { opacity: 0, height: 0 }
                                    }
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.28,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-5 pt-0 text-base text-text-secondary sm:px-6 sm:pb-6 sm:text-[1.05rem] sm:leading-relaxed">
                                        <p className="border-t border-border/40 pt-4">
                                            {item.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
