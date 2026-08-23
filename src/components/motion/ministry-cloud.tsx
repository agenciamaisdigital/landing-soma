"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/*
 * Nuvem de ministerios que se rearranja sozinha.
 *
 * Cada arranjo tem uma quantidade e uma combinacao diferente, para
 * sugerir que a estrutura acompanha a realidade de cada igreja, em
 * vez de obrigar todas a caberem no mesmo molde.
 */
const arrangements = [
    [
        "Louvor",
        "Kids",
        "Jovens",
        "Diaconia",
        "Recepção",
        "Células",
    ],
    [
        "Casais",
        "Missões",
        "Louvor",
        "Intercessão",
        "Kids",
        "Mídia",
        "Ação Social",
        "Jovens",
    ],
    [
        "Kids",
        "Adolescentes",
        "Louvor",
        "Escola Bíblica",
        "Voluntários",
    ],
    [
        "Mídia",
        "Louvor",
        "Kids",
        "Novos na fé",
        "Células",
        "Terceira idade",
        "Diaconia",
    ],
];

const CYCLE = 4200;

/* Alterna o peso visual das etiquetas, para a nuvem nao virar uma
   grade uniforme. */
const chipTones = [
    "border-brand/25 bg-white text-text-primary",
    "border-transparent bg-brand text-white",
    "border-border bg-white text-text-secondary",
    "border-brand/20 bg-brand-soft text-brand-dark",
];

export function MinistryCloud() {
    const shouldReduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (shouldReduceMotion) {
            return;
        }

        const timer = setInterval(() => {
            setIndex((current) => (current + 1) % arrangements.length);
        }, CYCLE);

        return () => clearInterval(timer);
    }, [shouldReduceMotion]);

    const current = arrangements[shouldReduceMotion ? 0 : index];

    const chip =
        "rounded-pill border px-4 py-2 text-sm font-medium shadow-soft";

    if (shouldReduceMotion) {
        return (
            <div className="flex flex-wrap items-center justify-center gap-2.5">
                {current.map((name, position) => (
                    <span
                        key={name}
                        className={`${chip} ${chipTones[position % chipTones.length]}`}
                    >
                        {name}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <div className="flex min-h-[136px] flex-wrap items-center justify-center gap-2.5 sm:min-h-[120px]">
            <AnimatePresence mode="popLayout">
                {current.map((name, position) => (
                    <motion.span
                        key={name}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            duration: 0.45,
                            delay: position * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`${chip} ${chipTones[position % chipTones.length]}`}
                    >
                        {name}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
}
