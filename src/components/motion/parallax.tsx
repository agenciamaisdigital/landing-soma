"use client";

import {
    useRef,
    type ReactNode,
} from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";

type ParallaxProps = {
    children: ReactNode;
    className?: string;
    distance?: number;
    scaleFrom?: number;
    scaleTo?: number;
};

export function Parallax({
    children,
    className = "",
    distance = 48,
    scaleFrom = 0.98,
    scaleTo = 1.02,
}: ParallaxProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const rawY = useTransform(
        scrollYProgress,
        [0, 1],
        [distance, -distance],
    );

    const rawScale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [scaleFrom, 1, scaleTo],
    );

    const smoothY = useSpring(rawY, {
        stiffness: 90,
        damping: 28,
        mass: 0.8,
    });

    const smoothScale = useSpring(rawScale, {
        stiffness: 90,
        damping: 28,
        mass: 0.8,
    });

    return (
        <div ref={targetRef} className={className}>
            <motion.div
                style={{
                    y: shouldReduceMotion ? 0 : smoothY,
                    scale: shouldReduceMotion ? 1 : smoothScale,
                    willChange: shouldReduceMotion
                        ? "auto"
                        : "transform",
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}