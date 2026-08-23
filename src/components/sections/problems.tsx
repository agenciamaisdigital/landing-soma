import {
    CalendarClock,
    Database,
    LayoutDashboard,
    MessagesSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { DEMO_WHATSAPP_URL } from "@/lib/constants";
import { Convergence } from "@/components/motion/convergence";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const problems = [
    {
        icon: Database,
        title: "Informações espalhadas",
        description:
            "Cadastros de membros, visitantes e ministérios em lugares diferentes.",
    },
    {
        icon: CalendarClock,
        title: "Escalas difíceis de organizar",
        description:
            "Confirmações e substituições resolvidas manualmente, uma a uma.",
    },
    {
        icon: MessagesSquare,
        title: "Comunicação descentralizada",
        description:
            "Avisos divididos entre WhatsApp, redes sociais e outros canais.",
    },
    {
        icon: LayoutDashboard,
        title: "Pouca visão da gestão",
        description:
            "Nenhum lugar único para acompanhar o que acontece na igreja.",
    },
];

export function Problems() {
    return (
        <section id="problemas" className="bg-surface-subtle py-20 sm:py-24 lg:py-28">
            <div className="container-page">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl text-text-primary sm:text-4xl lg:text-[2.85rem]">
                            Planilhas, grupos e ferramentas{" "}
                            <Highlight>que não conversam.</Highlight>
                        </h2>

                        <p className="mx-auto mt-7 max-w-xl text-balance text-base text-text-secondary sm:mt-8 sm:text-lg">
                            Quando membros, ministérios, escalas e comunicação
                            ficam espalhados, a rotina fica mais difícil de
                            organizar. A sōma é um sistema de gestão para
                            igrejas que reúne tudo em{" "}
                            <Highlight className="font-medium">
                                um só ambiente
                            </Highlight>
                            .
                        </p>
                    </div>
                </Reveal>
            </div>

            <Convergence />

            <div className="container-page">
                <Stagger
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    interval={0.14}
                >
                    {problems.map((problem) => {
                        const Icon = problem.icon;

                        return (
                            <StaggerItem key={problem.title} className="h-full">
                                <div className="group flex h-full flex-col rounded-card border border-border/70 bg-white p-6 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft transition-colors duration-300 group-hover:bg-brand">
                                        <Icon
                                            className="h-6 w-6 text-brand transition-colors duration-300 group-hover:text-white"
                                            strokeWidth={1.6}
                                        />
                                    </div>

                                    <h3 className="mt-5 flex min-h-14 items-start font-heading text-lg font-bold leading-tight text-text-primary">
                                        {problem.title}
                                    </h3>

                                    <p className="text-sm text-text-secondary">
                                        {problem.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </Stagger>

                <Reveal delay={0.08}>
                    <div className="mt-12 flex flex-col items-center gap-6 rounded-feature bg-surface-dark px-8 py-8 text-center sm:px-10 md:flex-row md:justify-between md:gap-10 md:text-left lg:mt-14 lg:px-12">
                        <div>
                            <p className="font-heading text-xl font-bold text-white sm:text-2xl">
                                Menos ferramentas desconectadas.
                            </p>

                            <p className="mt-2 text-sm text-text-inverse-muted sm:text-base">
                                Uma gestão de igreja mais simples e integrada.
                            </p>
                        </div>

                        <a href={DEMO_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
                            <Button variant="secondary" size="large" className="w-full sm:w-auto">
                                Solicitar demonstração
                            </Button>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
