"use client";

import type { ReactNode } from "react";
import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
    children: ReactNode;
    className?: string;
    direction?: RevealDirection;
    distance?: number;
    delay?: number;
    duration?: number;
    once?: boolean;
    amount?: number;
};

function getHiddenPosition(
    direction: RevealDirection,
    distance: number,
) {
    switch (direction) {
        case "up":
            return { x: 0, y: distance };

        case "down":
            return { x: 0, y: -distance };

        case "left":
            return { x: distance, y: 0 };

        case "right":
            return { x: -distance, y: 0 };

        case "none":
        default:
            return { x: 0, y: 0 };
    }
}

export function Reveal({
    children,
    className = "",
    direction = "up",
    distance = 24,
    delay = 0,
    duration = 0.85,
    once = true,
    amount = 0.2,
}: RevealProps) {
    const shouldReduceMotion = useReducedMotion();
    const hiddenPosition = getHiddenPosition(direction, distance);

    const variants: Variants = {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            x: shouldReduceMotion ? 0 : hiddenPosition.x,
            y: shouldReduceMotion ? 0 : hiddenPosition.y,
        },

        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: shouldReduceMotion
                ? {
                    duration: 0,
                }
                : {
                    duration,
                    delay,
                    ease: [0.22, 1, 0.36, 1],
                },
        },
    };

    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once,
                amount,
                margin: "0px 0px -8% 0px",
            }}
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