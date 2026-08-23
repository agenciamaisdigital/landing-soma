"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { CalendarDays, Clock3 } from "lucide-react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";
import {
    InstagramGlyph,
    SheetGlyph,
    WhatsAppGlyph,
    YoutubeGlyph,
} from "@/components/ui/brand-glyphs";

type Piece = {
    id: string;
    x: number;
    y: number;
    rotate: number;
    content: ReactNode;
};

/**
 * Peça solta que converge para o centro conforme o scroll avança.
 * O wrapper externo cuida da centralização para nao competir com
 * o transform que o motion aplica no elemento interno.
 */
function ConvergingPiece({
    piece,
    progress,
    reduced,
}: {
    piece: Piece;
    progress: MotionValue<number>;
    reduced: boolean;
}) {
    // Um respiro inicial: as pecas ficam paradas por um instante
    // depois que o palco trava, antes de comecarem a se organizar.
    const x = useTransform(progress, [0.08, 0.85], [piece.x, 0]);
    const y = useTransform(progress, [0.08, 0.85], [piece.y, 0]);
    const rotate = useTransform(progress, [0.08, 0.85], [piece.rotate, 0]);
    const scale = useTransform(progress, [0.08, 0.85], [1, 0.52]);
    const opacity = useTransform(progress, [0.08, 0.5, 0.82], [1, 0.92, 0]);

    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
                style={
                    reduced
                        ? {
                            x: piece.x,
                            y: piece.y,
                            rotate: piece.rotate,
                            opacity: 0.55,
                        }
                        : {
                            x,
                            y,
                            rotate,
                            scale,
                            opacity,
                            willChange: "transform, opacity",
                        }
                }
            >
                {piece.content}
            </motion.div>
        </div>
    );
}

const card =
    "rounded-2xl border border-border bg-white shadow-[0_14px_36px_rgba(35,37,43,0.13)]";

const tile =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem]";

function Line({ width }: { width: string }) {
    return (
        <span
            className={`block h-2 rounded-pill bg-text-secondary/15 ${width}`}
        />
    );
}

const pieces: Piece[] = [
    {
        id: "whatsapp",
        x: -404,
        y: -118,
        rotate: -9,
        content: (
            <div className={`${card} w-[176px] p-3`}>
                <div className="flex items-center gap-2.5">
                    <span className={`${tile} bg-[#25D366]`}>
                        <WhatsAppGlyph className="h-5 w-5 text-white" />
                    </span>

                    <div className="min-w-0">
                        <p className="truncate text-[0.7rem] font-semibold text-text-primary">
                            Grupo · Louvor
                        </p>
                        <p className="text-[0.62rem] text-text-secondary">
                            12 não lidas
                        </p>
                    </div>
                </div>

                <div className="mt-2.5 space-y-1.5">
                    <Line width="w-full" />
                    <Line width="w-2/3" />
                </div>
            </div>
        ),
    },
    {
        id: "instagram",
        x: 392,
        y: -146,
        rotate: 8,
        content: (
            <div className={`${card} w-[168px] p-3`}>
                <div className="flex items-center gap-2.5">
                    <span
                        className={tile}
                        style={{
                            background:
                                "linear-gradient(135deg,#F9CE34 0%,#EE2A7B 55%,#6228D7 100%)",
                        }}
                    >
                        <InstagramGlyph className="h-5 w-5 text-white" />
                    </span>

                    <div className="min-w-0">
                        <p className="truncate text-[0.7rem] font-semibold text-text-primary">
                            @suaigreja
                        </p>
                        <p className="text-[0.62rem] text-text-secondary">
                            Post do evento
                        </p>
                    </div>
                </div>

                <div className="mt-2.5 h-9 rounded-lg bg-text-secondary/10" />
            </div>
        ),
    },
    {
        id: "youtube",
        x: -448,
        y: 96,
        rotate: -6,
        content: (
            <div className={`${card} w-[172px] p-3`}>
                <div className="flex items-center gap-2.5">
                    <span className={`${tile} bg-[#FF0000]`}>
                        <YoutubeGlyph className="h-5 w-5 text-white" />
                    </span>

                    <div className="min-w-0">
                        <p className="truncate text-[0.7rem] font-semibold text-text-primary">
                            Culto ao vivo
                        </p>
                        <p className="flex items-center gap-1 text-[0.62rem] text-text-secondary">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF0000]" />
                            transmitindo
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "planilha",
        x: 336,
        y: 128,
        rotate: 7,
        content: (
            <div className={`${card} w-[176px] p-3`}>
                <div className="flex items-center gap-2.5">
                    <span className={`${tile} bg-[#1D6F42]`}>
                        <SheetGlyph className="h-5 w-5 text-white" />
                    </span>

                    <p className="truncate text-[0.7rem] font-semibold text-text-primary">
                        membros.xlsx
                    </p>
                </div>

                <div className="mt-2.5 space-y-1">
                    {[
                        ["w-10", "w-12", "w-8"],
                        ["w-12", "w-8", "w-11"],
                        ["w-9", "w-12", "w-7"],
                    ].map((row, index) => (
                        <div key={index} className="flex gap-1">
                            {row.map((width, cell) => (
                                <span
                                    key={cell}
                                    className={`h-2 ${width} rounded-[2px] bg-text-secondary/15`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: "agenda",
        x: -128,
        y: 208,
        rotate: -11,
        content: (
            <div className={`${card} w-[132px] overflow-hidden`}>
                <div className="flex items-center gap-1.5 bg-brand px-3 py-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-white" />
                    <p className="text-[0.6rem] font-semibold uppercase tracking-wide text-white">
                        Agenda
                    </p>
                </div>

                <div className="flex items-center gap-2.5 p-3">
                    <div className="text-center leading-none">
                        <p className="text-[0.55rem] font-bold uppercase text-brand">
                            Dom
                        </p>
                        <p className="font-heading text-xl font-bold text-text-primary">
                            27
                        </p>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1.5">
                        <Line width="w-full" />
                        <Line width="w-3/4" />
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "escala",
        x: 108,
        y: -222,
        rotate: 6,
        content: (
            <div className={`${card} w-[164px] p-3`}>
                <div className="flex items-center gap-2.5">
                    <span className={`${tile} bg-brand-soft`}>
                        <Clock3
                            className="h-5 w-5 text-brand"
                            strokeWidth={1.8}
                        />
                    </span>

                    <div className="min-w-0">
                        <p className="truncate text-[0.7rem] font-semibold text-text-primary">
                            Escala · Sábado
                        </p>
                        <p className="text-[0.62rem] text-text-secondary">
                            19h · 6 voluntários
                        </p>
                    </div>
                </div>

                <div className="mt-2.5 space-y-1.5">
                    {[0, 1].map((row) => (
                        <div key={row} className="flex items-center gap-1.5">
                            <span className="h-3 w-3 shrink-0 rounded-[3px] border border-text-secondary/25" />
                            <Line width="flex-1" />
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: "evento",
        x: 470,
        y: 26,
        rotate: 10,
        content: (
            <div className={`${card} w-[152px] overflow-hidden`}>
                <div className="h-12 bg-[#EFE3C4]" />

                <div className="p-3">
                    <p className="truncate text-[0.7rem] font-semibold text-text-primary">
                        Encontro de Jovens
                    </p>
                    <p className="mt-1 text-[0.62rem] text-text-secondary">
                        Banner · 03 mai
                    </p>
                </div>
            </div>
        ),
    },
];

export function Convergence() {
    const trackRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    /*
     * O "trilho" tem 2 telas de altura e o palco fica preso (sticky)
     * enquanto ele passa. Resultado: as pecas sobem bagunçadas, o palco
     * trava ao encostar no topo e so entao o scroll organiza tudo.
     */
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"],
    });

    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 32,
        mass: 0.7,
    });

    const symbolOpacity = useTransform(progress, [0.55, 0.92], [0, 1]);
    const symbolScale = useTransform(progress, [0.55, 1], [0.7, 1]);
    const haloOpacity = useTransform(progress, [0.62, 1], [0, 0.55]);
    const haloScale = useTransform(progress, [0.62, 1], [0.55, 1.4]);

    const stage = (
        <div className="relative h-[400px] w-full overflow-hidden sm:h-[500px] lg:h-[580px]">
            <div className="absolute inset-0 scale-[0.52] sm:scale-[0.78] lg:scale-100">
                {/* Halo que se abre quando as partes viram uma só */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        className="h-64 w-64 rounded-full bg-brand/12 blur-3xl"
                        style={
                            shouldReduceMotion
                                ? { opacity: 0.5 }
                                : {
                                    opacity: haloOpacity,
                                    scale: haloScale,
                                    willChange: "transform, opacity",
                                }
                        }
                    />
                </div>

                {pieces.map((piece) => (
                    <ConvergingPiece
                        key={piece.id}
                        piece={piece}
                        progress={progress}
                        reduced={Boolean(shouldReduceMotion)}
                    />
                ))}

                {/* O corpo formado */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        style={
                            shouldReduceMotion
                                ? { opacity: 1 }
                                : {
                                    opacity: symbolOpacity,
                                    scale: symbolScale,
                                    willChange: "transform, opacity",
                                }
                        }
                    >
                        <Image
                            src="/images/simbolo-azul-petroleo.png"
                            alt=""
                            aria-hidden="true"
                            width={590}
                            height={590}
                            className="h-44 w-44 sm:h-52 sm:w-52"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );

    // Sem prender a tela para quem pediu movimento reduzido.
    if (shouldReduceMotion) {
        return stage;
    }

    return (
        <div ref={trackRef} className="relative h-[200vh]">
            <div className="sticky top-0 flex h-screen items-center">
                {stage}
            </div>
        </div>
    );
}
