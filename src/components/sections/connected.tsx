import Image from "next/image";
import { Laptop, Smartphone, UsersRound, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { DEMO_WHATSAPP_URL } from "@/lib/constants";
import { ConnectedBody } from "@/components/motion/connected-body";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

type Journey = {
    icon: LucideIcon;
    title: string;
    description: string;
};

const journey: Journey[] = [
    {
        icon: Laptop,
        title: "Gestão Web",
        description:
            "A igreja organiza pessoas, agenda, ministérios, eventos, Kids, contribuições e comunicação em um único ambiente.",
    },
    {
        icon: UsersRound,
        title: "Líderes e equipes",
        description:
            "Ministérios e voluntários acompanham pessoas, atividades, escalas e responsabilidades com mais organização.",
    },
    {
        icon: Smartphone,
        title: "Membros",
        description:
            "O aplicativo aproxima cada pessoa da rotina da igreja, reunindo informações, eventos, escalas, contribuições e outros serviços no celular.",
    },
];

/* Tres marcas d'agua espalhadas: quebram o azul chapado sem
   introduzir cor nova. */
const watermarks = [
    "-right-24 top-16 w-[520px] opacity-[0.05]",
    "-left-32 top-[42%] w-[440px] opacity-[0.04]",
    "right-[6%] bottom-[8%] w-[380px] opacity-[0.045]",
];

export function Connected() {
    return (
        <section id="conectado" className="relative overflow-x-clip bg-surface-dark py-20 sm:py-24 lg:py-28">
            {/* Camadas de fundo: profundidade sem campo de cor chapado */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                {watermarks.map((position) => (
                    <Image
                        key={position}
                        src="/images/simbolo-azul-petroleo.png"
                        alt=""
                        width={590}
                        height={590}
                        className={`absolute hidden brightness-0 invert lg:block ${position}`}
                    />
                ))}

                {/* Brilho suave em azul petroleo, dando volume ao fundo */}
                <div className="absolute left-1/2 top-[30%] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]" />
            </div>

            <div className="relative">
                <div className="container-page">
                    {/* A origem da palavra vem antes: quem entende que
                        soma significa corpo lê a sequencia seguinte de
                        outro jeito. */}
                    <Reveal>
                        <div className="mx-auto max-w-2xl rounded-feature border border-white/12 bg-white/[0.06] px-8 py-8 text-center backdrop-blur-sm sm:px-10 sm:py-9">
                            <Image
                                src="/images/simbolo-azul-petroleo.png"
                                alt=""
                                aria-hidden="true"
                                width={590}
                                height={590}
                                className="mx-auto h-12 w-12 brightness-0 invert sm:h-14 sm:w-14"
                            />

                            <p className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl">
                                σῶμα · s<span className="brand-macron">o</span>ma
                            </p>

                            <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-sand sm:text-sm">
                                Do grego: corpo
                            </p>

                            <p className="mx-auto mt-5 max-w-lg text-balance text-sm text-text-inverse-muted sm:text-base">
                                A igreja é formada por muitas pessoas,
                                ministérios, dons e funções. Partes diferentes
                                que, juntas, formam um só corpo.
                            </p>

                            <p className="mx-auto mt-4 max-w-lg text-balance text-sm font-semibold text-white sm:text-base">
                                É desse conceito que nasce a sōma:{" "}
                                <Highlight className="text-brand-sand">
                                    tecnologia conectando cada parte da igreja.
                                </Highlight>
                            </p>
                        </div>
                    </Reveal>
                </div>

                <ConnectedBody />

                <div className="container-page">
                    <Reveal>
                        <p className="mx-auto max-w-2xl text-balance text-center text-base text-text-inverse-muted sm:text-lg">
                            A gestão acontece no sistema Web. Líderes e equipes
                            acompanham o que precisam. Membros permanecem
                            conectados pelo aplicativo e pelos canais de
                            comunicação da igreja.
                        </p>
                    </Reveal>

                    <Stagger
                        className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14"
                        interval={0.12}
                    >
                        {journey.map((step) => {
                            const Icon = step.icon;

                            return (
                                <StaggerItem key={step.title} className="h-full">
                                    <div className="flex h-full flex-col rounded-card border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition-[transform,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.11]">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand">
                                            <Icon
                                                className="h-5 w-5 text-white"
                                                strokeWidth={1.7}
                                            />
                                        </div>

                                        <h3 className="mt-5 font-heading text-lg font-bold text-white">
                                            {step.title}
                                        </h3>

                                        <p className="mt-2.5 text-sm text-text-inverse-muted">
                                            {step.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </Stagger>

                    <Reveal delay={0.08}>
                        <p className="mx-auto mt-14 max-w-3xl text-balance text-center font-heading text-xl font-bold leading-snug text-white sm:text-2xl">
                            Quem administra ganha{" "}
                            <span className="text-brand-sand">organização</span>.
                            Quem lidera ganha{" "}
                            <span className="text-brand-sand">agilidade</span>.
                            Quem participa fica mais{" "}
                            <span className="text-brand-sand">conectado</span>.
                        </p>

                        <div className="mt-9 flex justify-center">
                            <a href={DEMO_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" size="large">
                                    Solicitar demonstração
                                </Button>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
