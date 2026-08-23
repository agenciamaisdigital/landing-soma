import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { DEMO_WHATSAPP_URL } from "@/lib/constants";
import { MinistryCloud } from "@/components/motion/ministry-cloud";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

type Pillar = {
    title: string;
    description: string;
    image: string;
    alt: string;
};

const pillars: Pillar[] = [
    {
        title: "Sua estrutura",
        description:
            "Organize ministérios, grupos, líderes, voluntários e públicos de acordo com a realidade da igreja.",
        image: "/images/pilar-estrutura.jpg",
        alt: "Líderes reunidos em volta de uma mesa organizando a programação da igreja",
    },
    {
        title: "Sua comunicação",
        description:
            "Defina quem precisa receber cada informação e conecte a comunicação aos processos da gestão.",
        image: "/images/pilar-comunicacao.jpg",
        alt: "Voluntária passando orientações para um pequeno grupo antes de uma atividade",
    },
    {
        title: "Sua identidade",
        description:
            "Ofereça uma experiência digital alinhada à igreja, do sistema administrativo ao aplicativo dos membros.",
        image: "/images/pilar-identidade.jpg",
        alt: "Voluntária recebendo uma visitante na recepção da igreja",
    },
];

/* Marcas d'agua tom sobre tom: preto a baixissima opacidade sobre o
   areia resulta num bege mais escuro, sem introduzir cor nova. */
const watermarks = [
    "-left-28 top-16 w-[460px] opacity-[0.055]",
    "-right-24 top-[46%] w-[400px] opacity-[0.05]",
    "left-[12%] bottom-[4%] w-[320px] opacity-[0.045]",
];

export function Reality() {
    return (
        <section className="relative overflow-x-clip bg-surface-subtle py-20 sm:py-24 lg:py-28">
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
                        className={`absolute hidden brightness-0 lg:block ${position}`}
                    />
                ))}
            </div>

            <div className="container-page relative">
                <Reveal>
                    <div className="mx-auto max-w-6xl text-center">
                        {/* text-pretty derruba o `balance` que o CSS global
                            aplica em titulos: com balance as linhas ficam
                            curtas e centradas, sem ocupar a largura. */}
                        <h2 className="text-pretty text-3xl text-text-primary sm:text-4xl lg:text-[3rem]">
                            Tecnologia que se adapta à{" "}
                            <Highlight>realidade da sua igreja.</Highlight>
                        </h2>

                        {/* Os termos de busca vivem aqui dentro, como
                            prosa, em vez de numa linha solta. */}
                        <p className="mx-auto mt-7 max-w-4xl text-base text-text-secondary sm:mt-8 sm:text-lg">
                            Cada igreja tem sua estrutura, seus ministérios, sua
                            rotina e sua forma de cuidar de pessoas. A sōma é
                            uma plataforma para igrejas que acompanha diferentes
                            estruturas e formas de organização, sem complicar o
                            que já funciona e sem obrigar sua equipe a depender
                            de vários sistemas.
                        </p>
                    </div>
                </Reveal>

                {/* A nuvem se rearranja sozinha: nenhuma igreja precisa
                    caber num molde fixo. */}
                <Reveal delay={0.08}>
                    <div className="mx-auto mt-14 max-w-3xl sm:mt-16">
                        <MinistryCloud />
                    </div>
                </Reveal>

                <Stagger
                    className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-20"
                    interval={0.12}
                >
                    {pillars.map((pillar, index) => (
                        <StaggerItem key={pillar.title} className="h-full">
                            <div className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-white transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card">
                                <div className="relative h-44 sm:h-48">
                                    <Image
                                        src={pillar.image}
                                        alt={pillar.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />

                                    {/* Numero como selo solido: sobre foto,
                                        texto claro sem fundo fica ilegivel. */}
                                    <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand font-heading text-sm font-bold text-white shadow-card">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-7 sm:p-8">
                                    <h3 className="font-heading text-xl font-bold text-text-primary">
                                        {pillar.title}
                                    </h3>

                                    <p className="mt-2.5 text-sm text-text-secondary sm:text-base">
                                        {pillar.description}
                                    </p>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>

                <Reveal delay={0.1}>
                    <p className="mx-auto mt-16 max-w-3xl text-balance text-center font-heading text-2xl font-bold leading-snug text-text-primary sm:text-3xl lg:mt-20">
                        A tecnologia entra para simplificar. A identidade
                        continua sendo <Highlight>da sua igreja.</Highlight>
                    </p>

                    <div className="mt-9 flex justify-center">
                        <a href={DEMO_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                            <Button size="large">Solicitar demonstração</Button>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
