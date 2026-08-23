import Image from "next/image";
import {
    CalendarDays,
    CircleCheck,
    HandCoins,
    MessagesSquare,
    Network,
    UsersRound,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { DEMO_WHATSAPP_URL } from "@/lib/constants";
import { StoreBadges } from "@/components/ui/store-badges";
import { WhatsAppGlyph } from "@/components/ui/brand-glyphs";
import { Float, PulseRing } from "@/components/motion/float";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { WhatsappConversation } from "@/components/motion/whatsapp-conversation";

type Area = {
    eyebrow: string;
    title: string;
    description: string;
    icon: LucideIcon;
    span: string;
};

/**
 * Blocos de apoio da plataforma.
 * Os blocos de destaque (App do Membro, Kids e Comunicacao) sao
 * montados separadamente porque recebem mockup do produto.
 */
const areas: Area[] = [
    {
        eyebrow: "Pessoas e Relacionamento",
        title: "Conheça e acompanhe melhor sua comunidade.",
        description:
            "Membros, famílias e visitantes em uma base organizada, incluindo acompanhamento da jornada de visitantes e relacionamento com pessoas.",
        icon: UsersRound,
        span: "lg:col-span-2",
    },
    {
        eyebrow: "Ministérios, Grupos e Escalas",
        title: "Equipes organizadas e pessoas servindo no lugar certo.",
        description:
            "Ministérios, voluntários, pequenos grupos e escalas trabalhando de forma integrada, reduzindo controles paralelos e facilitando a rotina dos líderes.",
        icon: Network,
        span: "lg:col-span-2",
    },
    {
        eyebrow: "Agenda e Eventos",
        title: "Toda a programação da igreja organizada.",
        description:
            "Cultos e atividades recorrentes na agenda, além de eventos especiais com informações, divulgação e integração com o aplicativo dos membros.",
        icon: CalendarDays,
        span: "sm:col-span-2 lg:col-span-2",
    },
];

const cardBase =
    "flex h-full flex-col rounded-card border border-border bg-background p-6 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card sm:p-7";

function Eyebrow({
    children,
    tone = "brand",
}: {
    children: string;
    tone?: "brand" | "inverse" | "dark";
}) {
    const toneStyles = {
        brand: "text-brand",
        inverse: "text-text-inverse-muted",
        dark: "text-brand-dark",
    };

    return (
        <p
            className={`text-xs font-semibold uppercase tracking-[0.08em] ${toneStyles[tone]}`}
        >
            {children}
        </p>
    );
}

export function Platform() {
    return (
        <section id="plataforma" className="overflow-x-clip bg-surface py-20 sm:py-24 lg:py-28">
            <div className="container-page">
                <Reveal>
                    {/* Largura maior que o padrao para acompanhar a
                        proporcao do mosaico de 1200px logo abaixo. */}
                    <div className="mx-auto max-w-5xl text-center">
                        <h2 className="text-3xl text-text-primary sm:text-4xl lg:text-[3rem]">
                            Tudo o que sua igreja precisa, conectado{" "}
                            <Highlight>em uma única plataforma.</Highlight>
                        </h2>

                        <p className="mx-auto mt-7 max-w-3xl text-balance text-base text-text-secondary sm:mt-8 sm:text-lg">
                            A sōma reúne gestão, relacionamento, comunicação e
                            experiência do membro em um único ecossistema. Um{" "}
                            <span className="font-medium text-text-primary">
                                sistema de gestão para igrejas
                            </span>{" "}
                            pensado para simplificar a rotina de quem
                            administra e aproximar ainda mais quem participa.
                        </p>
                    </div>
                </Reveal>

                <Stagger
                    className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6"
                    interval={0.1}
                >
                    {/* ---- App do Membro: bloco principal ---- */}
                    <StaggerItem className="sm:col-span-2 lg:col-span-6">
                        <div className="relative rounded-feature bg-surface-dark">
                            <div className="grid items-center gap-8 px-7 py-10 sm:px-12 sm:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-14 lg:py-14">
                                <div className="relative z-10">
                                    <Eyebrow tone="inverse">
                                        App do Membro
                                    </Eyebrow>

                                    <h3 className="mt-3 max-w-md font-heading text-2xl font-bold text-white sm:text-3xl">
                                        Sua igreja no celular de cada membro.
                                    </h3>

                                    <p className="mt-4 max-w-lg text-sm text-text-inverse-muted sm:text-base">
                                        Agenda, eventos, ministérios, escalas,
                                        doações, transmissão ao vivo,
                                        conteúdos e serviços da igreja
                                        reunidos em uma experiência simples e
                                        personalizada.
                                    </p>

                                    <StoreBadges className="mt-7" />
                                </div>

                                {/* O mockup extrapola a moldura azul de
                                    proposito. O recorte lateral fica na
                                    section, para nao gerar rolagem
                                    horizontal no celular. */}
                                <div className="relative min-h-[190px] sm:min-h-[240px] lg:min-h-[280px]">
                                    <div className="absolute left-1/2 top-1/2 w-[118%] -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-[-10%] lg:w-[125%] lg:translate-x-0">
                                        <Float distance={12} duration={6.5}>
                                            <Image
                                                src="/images/app-membro-3d.png"
                                                alt="Aplicativo do membro da sōma em dois celulares, mostrando a tela inicial e a tela de um evento"
                                                width={1672}
                                                height={941}
                                                className="w-full drop-shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
                                            />
                                        </Float>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </StaggerItem>

                    {/* ---- Blocos de apoio ---- */}
                    {areas.map((area) => {
                        const Icon = area.icon;

                        return (
                            <StaggerItem
                                key={area.eyebrow}
                                className={area.span}
                            >
                                <div className={`group ${cardBase}`}>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft transition-colors duration-300 group-hover:bg-brand">
                                        <Icon
                                            className="h-5 w-5 text-brand transition-colors duration-300 group-hover:text-white"
                                            strokeWidth={1.7}
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <Eyebrow>{area.eyebrow}</Eyebrow>

                                        <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-text-primary">
                                            {area.title}
                                        </h3>

                                        <p className="mt-2.5 text-sm text-text-secondary">
                                            {area.description}
                                        </p>
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}

                    {/* ---- Kids: foto real + cartao de check-in em codigo ---- */}
                    <StaggerItem className="sm:col-span-2 lg:col-span-3">
                        <div className="group flex h-full flex-col overflow-hidden rounded-feature border border-brand-sand bg-brand-sand transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card">
                            <div className="relative h-52 sm:h-60">
                                <Image
                                    src="/images/kids-checkin-foto.jpg"
                                    alt="Pai entregando o filho aos cuidados da professora do ministério infantil"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />

                                {/* Cartao flutuante: a tecnologia aparece aqui,
                                    nao na foto, para nao travar um fluxo. */}
                                <div className="absolute bottom-4 left-4 max-w-[62%]">
                                    <Float distance={7} duration={4.5}>
                                        <div className="rounded-card-sm border border-border bg-white/95 p-3 shadow-card backdrop-blur-sm">
                                            <div className="flex items-center gap-1.5">
                                                <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                                                    <PulseRing />
                                                    <CircleCheck
                                                        className="h-4 w-4 text-brand"
                                                        strokeWidth={2}
                                                    />
                                                </span>
                                                <p className="text-[0.7rem] font-bold text-brand">
                                                    Check-in confirmado
                                                </p>
                                            </div>

                                            <p className="mt-1.5 text-xs font-semibold leading-tight text-text-primary">
                                                Miguel Santos
                                            </p>
                                            <p className="text-[0.68rem] leading-tight text-text-secondary">
                                                Kids 3 a 5 anos · Sala 2
                                            </p>
                                        </div>
                                    </Float>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-7 sm:p-9">
                                <Eyebrow tone="dark">Kids</Eyebrow>

                                <h3 className="mt-2 max-w-sm font-heading text-xl font-bold leading-snug text-text-primary sm:text-2xl">
                                    Mais segurança e organização no cuidado com
                                    as crianças.
                                </h3>

                                <p className="mt-3 text-sm text-text-secondary sm:text-base">
                                    Cadastro de crianças e responsáveis,
                                    organização das atividades do ministério
                                    infantil e processos de check-in e
                                    check-out.
                                </p>
                            </div>
                        </div>
                    </StaggerItem>

                    {/* ---- Financeiro: azul petroleo para quebrar a
                         sequencia clara no meio da secao ---- */}
                    <StaggerItem className="sm:col-span-2 lg:col-span-3">
                        <div className="flex h-full flex-col rounded-feature bg-brand p-7 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-elevated sm:p-9">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                                <HandCoins
                                    className="h-6 w-6 text-white"
                                    strokeWidth={1.7}
                                />
                            </div>

                            <div className="mt-5">
                                <Eyebrow tone="inverse">
                                    Financeiro e Contribuições
                                </Eyebrow>

                                <h3 className="mt-2 max-w-sm font-heading text-xl font-bold leading-snug text-white sm:text-2xl">
                                    Facilite contribuições e tenha mais
                                    organização financeira.
                                </h3>

                                <p className="mt-3 text-sm text-text-inverse-muted sm:text-base">
                                    Dízimos, ofertas e outras contribuições
                                    conectadas à experiência digital da igreja,
                                    com organização das informações
                                    financeiras no sistema.
                                </p>
                            </div>

                            <div className="mt-auto flex flex-wrap gap-2 pt-7">
                                {["Dízimos", "Ofertas", "Campanhas"].map(
                                    (item) => (
                                        <span
                                            key={item}
                                            className="rounded-pill border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white"
                                        >
                                            {item}
                                        </span>
                                    ),
                                )}
                            </div>
                        </div>
                    </StaggerItem>

                    {/* ---- Comunicação e WhatsApp: foto real + balões em codigo ---- */}
                    <StaggerItem className="sm:col-span-2 lg:col-span-6">
                        <div className="overflow-hidden rounded-feature border border-border bg-background">
                            <div className="grid md:grid-cols-[1fr_1.05fr] md:items-stretch">
                                <div className="p-7 sm:p-9 lg:p-11">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
                                        <MessagesSquare
                                            className="h-6 w-6 text-brand"
                                            strokeWidth={1.7}
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <Eyebrow>Comunicação</Eyebrow>

                                        <h3 className="mt-2 max-w-md font-heading text-xl font-bold leading-snug text-text-primary sm:text-2xl">
                                            Comunique, informe e engaje sua
                                            comunidade.
                                        </h3>

                                        <p className="mt-3 max-w-lg text-sm text-text-secondary sm:text-base">
                                            Use a comunicação integrada da sōma
                                            para enviar informações, lembretes
                                            e mensagens importantes pelo{" "}
                                            <span className="font-medium text-text-primary">
                                                WhatsApp
                                            </span>
                                            , alcançando membros, visitantes,
                                            voluntários e públicos específicos.
                                        </p>
                                    </div>

                                    <div className="mt-7 inline-flex items-center gap-3 rounded-pill border border-border bg-white px-4 py-3">
                                        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] bg-[#25D366]">
                                            <PulseRing
                                                className="rounded-[0.7rem]"
                                                color="#25D366"
                                            />
                                            <WhatsAppGlyph className="h-5 w-5 text-white" />
                                        </span>

                                        <p className="text-sm font-semibold leading-tight text-text-primary">
                                            Comunicação integrada
                                            <br />
                                            <span className="text-text-secondary">
                                                via WhatsApp
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="relative min-h-[320px] sm:min-h-[380px]">
                                    <Image
                                        src="/images/whatsapp-pessoa-foto.png"
                                        alt="Membro da igreja recebendo uma mensagem no celular"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover object-left"
                                    />

                                    {/* Conversa montada em codigo: texto nitido,
                                        cor exata da marca e copy editavel. */}
                                    <WhatsappConversation />
                                </div>
                            </div>
                        </div>
                    </StaggerItem>
                </Stagger>

                <Reveal delay={0.08}>
                    <div className="mt-14 flex justify-center lg:mt-16">
                        <a href={DEMO_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                            <Button size="large">Solicitar demonstração</Button>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
