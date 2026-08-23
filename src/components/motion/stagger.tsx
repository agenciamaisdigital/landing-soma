"use client";

import type { ReactNode } from "react";
import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

type StaggerProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    interval?: number;
    once?: boolean;
    amount?: number;
};

type StaggerItemProps = {
    children: ReactNode;
    className?: string;
    distance?: number;
    duration?: number;
};

export function Stagger({
    children,
    className = "",
    delay = 0,
    interval = 0.12,
    once = true,
    amount = 0.2,
}: StaggerProps) {
    const shouldReduceMotion = useReducedMotion();

    const containerVariants: Variants = {
        hidden: {},

        visible: {
            transition: shouldReduceMotion
                ? {
                    delayChildren: 0,
                    staggerChildren: 0,
                }
                : {
                    delayChildren: delay,
                    staggerChildren: interval,
                },
        },
    };

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once,
                amount,
                margin: "0px 0px -8% 0px",
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = "",
    distance = 22,
    duration = 0.85,
}: StaggerItemProps) {
    const shouldReduceMotion = useReducedMotion();

    const itemVariants: Variants = {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : distance,
        },

        visible: {
            opacity: 1,
            y: 0,
            transition: shouldReduceMotion
                ? {
                    duration: 0,
                }
                : {
                    duration,
                    ease: [0.22, 1, 0.36, 1],
                },
        },
    };

    return (
        <motion.div
            className={className}
            variants={itemVariants}
            style={{
                willChange: shouldReduceMotion
                    ? "auto"
                    : "transform, opacity",
            }}
        >
            {children}
        </motion.div>
    );
}