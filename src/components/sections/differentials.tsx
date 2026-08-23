"use client";

/*
 * Precisa ser Client Component: o array `differentials` guarda os
 * componentes de icone do lucide-react como dado, e isso e passado
 * para o DifferentialsCarousel (client). Funcoes/componentes nao
 * atravessam a fronteira Server->Client como valor de prop dentro de
 * um array — so como JSX ja renderizado. Marcando a secao inteira
 * como client evita esse limite.
 */

import {
    HeartHandshake,
    MessageCircleMore,
    MonitorSmartphone,
    Waypoints,
    type LucideIcon,
} from "lucide-react";
import { Highlight } from "@/components/ui/highlight";
import { DifferentialsCarousel } from "@/components/motion/differentials-carousel";
import { Reveal } from "@/components/motion/reveal";

type Differential = {
    icon: LucideIcon;
    title: string;
    description: string;
};

/*
 * Descricoes de uma linha so: a pagina ja demonstrou cada um desses
 * pontos nas secoes anteriores. Aqui o papel e concluir, nao explicar
 * de novo.
 */
const differentials: Differential[] = [
    {
        icon: Waypoints,
        title: "Tudo realmente conectado",
        description:
            "A informação cadastrada em um lugar serve a toda a plataforma.",
    },
    {
        icon: MonitorSmartphone,
        title: "Gestão e experiência do membro juntas",
        description:
            "O sistema administrativo e o aplicativo dos membros são o mesmo produto.",
    },
    {
        icon: MessageCircleMore,
        title: "Comunicação que vai além do sistema",
        description:
            "Lembretes, avisos e acompanhamento chegam pelo WhatsApp, onde as pessoas já estão.",
    },
    {
        icon: HeartHandshake,
        title: "Feita para a realidade de igrejas",
        description:
            "Não é um software genérico adaptado depois. Nasceu para a rotina de uma igreja.",
    },
];

export function Differentials() {
    return (
        <section id="diferenciais" className="relative overflow-x-clip bg-background py-20 sm:py-24 lg:py-28">
            <div className="container-page relative">
                <Reveal>
                    <div className="mx-auto max-w-6xl text-center">
                        <h2 className="text-pretty text-3xl text-text-primary sm:text-4xl lg:text-[3rem]">
                            Mais do que um sistema para igreja.
                            <br />
                            <Highlight>Um ecossistema conectado.</Highlight>
                        </h2>

                        <p className="mx-auto mt-7 max-w-3xl text-base text-text-secondary sm:mt-8 sm:text-lg">
                            A sōma foi pensada para integrar gestão,
                            relacionamento e experiência do membro em uma única
                            plataforma, reduzindo ferramentas paralelas e
                            simplificando a rotina de líderes e equipes.
                        </p>
                    </div>
                </Reveal>

                {/* Carrossel guiado por scroll: a tela trava e o scroll
                    vertical vira deslocamento horizontal entre os
                    quatro cards. */}
                <DifferentialsCarousel items={differentials} />

                <Reveal delay={0.1}>
                    <p className="mx-auto mt-10 max-w-3xl text-balance text-center font-heading text-2xl font-bold leading-snug text-text-primary sm:text-3xl lg:mt-12">
                        Menos sistemas isolados. Mais tudo o que faz a igreja
                        acontecer, <Highlight>em um só lugar</Highlight>.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
