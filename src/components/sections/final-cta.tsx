import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Highlight } from "@/components/ui/highlight";
import { Button } from "@/components/ui/button";
import { DEMO_WHATSAPP_URL } from "@/lib/constants";

export function FinalCta() {
    return (
        <section id="cta" className="relative overflow-x-clip bg-[#23252B] py-16 sm:py-24 lg:py-28">
            {/* Efeitos de luzes discretas no fundo da seção */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-36 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
                <div className="absolute -right-36 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-sand/5 blur-3xl" />
            </div>

            <div className="container-page relative">
                <Reveal>
                    <div className="relative overflow-hidden rounded-feature border border-white/10 bg-[#23252B] shadow-elevated">
                        {/* Imagem de fundo com o app em uso real */}
                        <Image
                            src="/images/cta-app-membros.jpg"
                            alt="Pessoas utilizando o aplicativo para membros da sōma no celular"
                            fill
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            className="object-cover object-right sm:object-center"
                        />

                        {/* Overlay em tom Grafite #23252B para garantir leitura e transição perfeita */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#23252B] via-[#23252B]/95 to-[#23252B]/75 sm:via-[#23252B]/90 sm:to-[#23252B]/50 lg:to-[#23252B]/35" />

                        {/* Conteúdo Principal */}
                        <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:p-20">
                            {/* Wordmark sōma sutil no fundo do card */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-6 -top-10 select-none text-8xl font-bold tracking-tighter text-white/[0.03] sm:text-9xl"
                            >
                                sōma
                            </div>

                            <div className="max-w-2xl text-left">
                                {/* Logo Vertical Claro no lugar do badge */}
                                <div className="mb-8">
                                    <Image
                                        src="/images/logo-vertical-calro.png"
                                        alt="sōma — Tecnologia para igrejas"
                                        width={140}
                                        height={140}
                                        className="h-16 w-auto object-contain sm:h-20"
                                        priority
                                    />
                                </div>

                                {/* Título Principal */}
                                <h2 className="text-pretty text-3xl font-bold text-white sm:text-4xl lg:text-[3.15rem] lg:leading-[1.15]">
                                    Leve a experiência da sua igreja para a{" "}
                                    <Highlight className="text-brand-sand">
                                        mão dos membros
                                    </Highlight>
                                    .
                                </h2>

                                {/* Subtítulo */}
                                <p className="mt-6 text-base text-text-inverse-muted sm:mt-7 sm:text-lg lg:text-xl lg:leading-relaxed">
                                    Com a sōma, sua igreja reúne gestão, comunicação e aplicativo em um
                                    único ecossistema, aproximando pessoas e facilitando a rotina da
                                    comunidade.
                                </p>

                                {/* Apenas Botão Principal: Solicitar demonstração */}
                                <div className="mt-9 flex flex-col items-start sm:mt-11">
                                    <a href={DEMO_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                        <Button
                                            variant="primary"
                                            size="large"
                                            className="w-full sm:w-auto text-base font-bold shadow-card"
                                        >
                                            <span>Solicitar demonstração</span>
                                            <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
