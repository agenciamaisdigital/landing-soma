"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";

/*
 * Sequencia presa na tela que conta o conceito da marca.
 *
 * As tres partes NAO convergem para o centro: cada uma fica no seu
 * lugar e o que se move e a ligacao entre elas. Convergencia ja e a
 * historia da secao anterior, e aqui contrariaria a propria copy
 * ("cada parte com sua funcao, todas trabalhando juntas").
 */

type NodeSpec = {
    id: string;
    label: string;
    start: number;
    from: number;
};

const nodes: NodeSpec[] = [
    { id: "web", label: "Gestão Web", start: 0.24, from: -70 },
    { id: "pessoas", label: "Líderes e equipes", start: 0.36, from: 0 },
    { id: "app", label: "Membros", start: 0.48, from: 70 },
];

/* Altura fixa da area das imagens: mantem os tres centros na mesma
   linha, e e a mesma altura usada pelos conectores, para a linha
   cruzar exatamente no meio deles. */
const mediaArea = "flex h-64 items-center justify-center sm:h-72 lg:h-80";

function AppearingNode({
    progress,
    spec,
    reduced,
    children,
}: {
    progress: MotionValue<number>;
    spec: NodeSpec;
    reduced: boolean;
    children: ReactNode;
}) {
    const opacity = useTransform(progress, [spec.start, spec.start + 0.1], [0, 1]);
    const scale = useTransform(progress, [spec.start, spec.start + 0.14], [0.88, 1]);
    const x = useTransform(
        progress,
        [spec.start, spec.start + 0.14],
        [spec.from, 0],
    );

    return (
        <motion.div
            className="flex shrink-0 flex-col items-center"
            style={
                reduced
                    ? undefined
                    : { opacity, scale, x, willChange: "transform, opacity" }
            }
        >
            <div className={mediaArea}>{children}</div>

            <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.08em] text-brand-sand sm:text-sm">
                {spec.label}
            </p>
        </motion.div>
    );
}

/*
 * Conector entre duas partes.
 *
 * Feito com scaleX de um elemento, e nao com pathLength de SVG:
 * pathLength depende de getTotalLength e falha silenciosamente em
 * varios casos. Aqui a linha e um bloco simples que cresce, e o
 * flex-1 faz ela ocupar exatamente o vao que sobrar entre as partes.
 */
function Connector({
    progress,
    start,
    reduced,
    reverse = false,
}: {
    progress: MotionValue<number>;
    start: number;
    reduced: boolean;
    reverse?: boolean;
}) {
    const scaleX = useTransform(progress, [start, start + 0.14], [0, 1]);
    const dotOpacity = useTransform(
        progress,
        [start + 0.16, start + 0.26],
        [0, 1],
    );

    const endpoint =
        "absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-sand";

    return (
        <div className={`hidden flex-1 items-center ${mediaArea} md:flex`}>
            <div className="relative h-0.5 w-full">
                <motion.div
                    className="absolute inset-0 rounded-pill bg-brand-sand/60"
                    style={
                        reduced
                            ? { opacity: 0.6 }
                            : {
                                scaleX,
                                transformOrigin: reverse ? "right" : "left",
                                willChange: "transform",
                            }
                    }
                />

                {!reduced && (
                    <motion.div
                        className="absolute inset-0"
                        style={{ opacity: dotOpacity }}
                    >
                        <span className={`${endpoint} left-0 -translate-x-1/2`} />
                        <span className={`${endpoint} right-0 translate-x-1/2`} />

                        {/* Pulso percorrendo a ligacao, em looping */}
                        <motion.span
                            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            animate={{
                                left: reverse ? ["100%", "0%"] : ["0%", "100%"],
                            }}
                            transition={{
                                duration: 2.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatDelay: 0.6,
                                delay: reverse ? 1.2 : 0,
                            }}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export function ConnectedBody() {
    const trackRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const reduced = Boolean(shouldReduceMotion);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"],
    });

    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 32,
        mass: 0.7,
    });

    // Headline em dois tempos
    const line1 = useTransform(progress, [0.02, 0.1], [0, 1]);
    const line1Y = useTransform(progress, [0.02, 0.1], [18, 0]);
    const line2 = useTransform(progress, [0.13, 0.22], [0, 1]);
    const line2Y = useTransform(progress, [0.13, 0.22], [18, 0]);

    const closingOpacity = useTransform(progress, [0.86, 0.96], [0, 1]);
    const closingY = useTransform(progress, [0.86, 0.96], [16, 0]);

    const stage = (
        <div className="container-wide relative flex w-full flex-col items-center">
            <h2 className="text-center text-3xl text-white sm:text-4xl lg:text-5xl">
                <motion.span
                    className="block"
                    style={reduced ? undefined : { opacity: line1, y: line1Y }}
                >
                    Um só corpo.
                </motion.span>

                <motion.span
                    className="mt-1 block text-brand-sand"
                    style={reduced ? undefined : { opacity: line2, y: line2Y }}
                >
                    Tudo conectado.
                </motion.span>
            </h2>

            <div className="mt-10 flex w-full max-w-7xl flex-col items-center gap-10 sm:mt-12 md:flex-row md:items-start md:gap-4">
                <AppearingNode progress={progress} spec={nodes[0]} reduced={reduced}>
                    {/* Largura explicita: `w-full` aqui dentro de um
                        container que encolhe para o conteudo vira
                        dependencia circular e colapsa. */}
                    <Image
                        src="/images/dashboard-web.png"
                        alt="Sistema de gestão da igreja no computador"
                        width={1448}
                        height={1086}
                        className="h-auto w-[340px] drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:w-[400px]"
                    />
                </AppearingNode>

                <Connector progress={progress} start={0.56} reduced={reduced} />

                <AppearingNode progress={progress} spec={nodes[1]} reduced={reduced}>
                    <div className="relative h-56 w-56 overflow-hidden rounded-full ring-4 ring-white/15 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                        <Image
                            src="/images/lideres-equipe-foto.png"
                            alt="Equipe de líderes e voluntários organizando as atividades juntos"
                            fill
                            sizes="288px"
                            className="object-cover"
                        />
                    </div>
                </AppearingNode>

                <Connector
                    progress={progress}
                    start={0.6}
                    reduced={reduced}
                    reverse
                />

                <AppearingNode progress={progress} spec={nodes[2]} reduced={reduced}>
                    <Image
                        src="/images/app-membro-home.png"
                        alt="Aplicativo do membro no celular"
                        width={1122}
                        height={1402}
                        className="h-auto w-[180px] drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:w-[210px]"
                    />
                </AppearingNode>
            </div>

            <motion.p
                className="mt-12 max-w-2xl text-balance text-center font-heading text-2xl font-bold leading-snug text-white sm:mt-14 sm:text-3xl lg:text-4xl"
                style={
                    reduced ? undefined : { opacity: closingOpacity, y: closingY }
                }
            >
                Cada parte com{" "}
                <span className="text-brand-sand">sua função</span>. Todas{" "}
                <span className="text-brand-sand">trabalhando juntas</span>.
            </motion.p>
        </div>
    );

    // Sem prender a tela para quem pediu movimento reduzido.
    if (reduced) {
        return <div className="py-20">{stage}</div>;
    }

    return (
        <div ref={trackRef} className="relative h-[250vh]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                {stage}
            </div>
        </div>
    );
}
