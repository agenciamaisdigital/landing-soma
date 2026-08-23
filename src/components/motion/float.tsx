"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FloatProps = {
    children: ReactNode;
    className?: string;
    distance?: number;
    duration?: number;
    delay?: number;
};

/**
 * Flutuacao continua e sutil, em looping.
 * Nao roda para quem pediu movimento reduzido no sistema.
 */
export function Float({
    children,
    className = "",
    distance = 10,
    duration = 5,
    delay = 0,
}: FloatProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            animate={{ y: [0, -distance, 0] }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
        >
            {children}
        </motion.div>
    );
}

type PulseRingProps = {
    className?: string;
    color?: string;
};

/**
 * Anel que se abre e some, em looping, para marcar um ponto vivo
 * da interface (um check confirmado, um canal ativo).
 */
export function PulseRing({
    className = "",
    color = "var(--brand-primary)",
}: PulseRingProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return null;
    }

    return (
        <motion.span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 rounded-full ${className}`}
            style={{ border: `2px solid ${color}`, willChange: "transform, opacity" }}
            animate={{ scale: [1, 1.7, 1.7], opacity: [0.55, 0, 0] }}
            transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.6, 1],
            }}
        />
    );
}
