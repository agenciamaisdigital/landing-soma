import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { SomaSymbol } from "@/components/ui/logo";
import { Reveal } from "@/components/motion/reveal";
import { DEMO_WHATSAPP_URL } from "@/lib/constants";

function ProductMockup() {
    return (
        <div className="relative">
            <SomaSymbol className="pointer-events-none absolute -right-6 -top-10 h-48 w-48 opacity-[0.06] sm:h-64 sm:w-64" />

            <div className="relative mx-auto max-w-lg lg:max-w-none">
                <Image
                    src="/images/dashboard-web.png"
                    alt="Painel administrativo da sōma mostrando membros, ministérios, eventos e escalas de uma igreja"
                    width={1448}
                    height={1086}
                    priority
                    className="w-full drop-shadow-[0_30px_60px_rgba(35,37,43,0.16)]"
                />

                <div className="absolute -bottom-10 -left-6 w-[34%] sm:-bottom-12 sm:-left-10">
                    <Image
                        src="/images/app-membro-home.png"
                        alt="Aplicativo do membro da sōma com acessos rápidos a agenda, eventos, ministérios e doações"
                        width={1122}
                        height={1402}
                        className="w-full drop-shadow-[0_24px_48px_rgba(35,37,43,0.18)]"
                    />
                </div>
            </div>
        </div>
    );
}

export function Hero() {
    return (
        <section id="hero" className="relative overflow-hidden bg-background">
            <div className="container-page grid items-center gap-16 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:py-28">
                <Reveal>
                    <Image
                        src="/images/logo-horizontal-azul-petroleo2.png"
                        alt="sōma"
                        width={1672}
                        height={941}
                        priority
                        className="h-16 w-auto sm:h-20"
                    />

                    <h1 className="mt-8 max-w-lg text-4xl text-text-primary sm:mt-9 sm:text-5xl lg:text-[3.15rem]">
                        Toda a sua igreja conectada{" "}
                        <Highlight>em um só lugar.</Highlight>
                    </h1>

                    <p className="mt-7 max-w-xl text-base text-text-secondary sm:mt-8 sm:text-lg">
                        Gestão, pessoas, ministérios, escalas, eventos,
                        comunicação e aplicativo do membro integrados em uma
                        única plataforma.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                        <a href={DEMO_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                            <Button size="large">Solicitar demonstração</Button>
                        </a>
                        <a href="#plataforma">
                            <Button variant="secondary" size="large">
                                Conhecer a plataforma
                            </Button>
                        </a>
                    </div>

                    <p className="mt-6 max-w-md text-sm text-text-secondary">
                        Menos planilhas, menos ferramentas espalhadas e mais
                        tempo para cuidar de pessoas.
                    </p>
                </Reveal>

                <Reveal direction="left" delay={0.1}>
                    <ProductMockup />
                </Reveal>
            </div>
        </section>
    );
}
