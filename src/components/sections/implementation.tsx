import { Highlight } from "@/components/ui/highlight";
import { ImplementationJourney } from "@/components/motion/implementation-journey";
import { Reveal } from "@/components/motion/reveal";

export function Implementation() {
    return (
        <section id="implantacao" className="relative overflow-x-clip bg-surface-dark py-20 sm:py-24 lg:py-28">
            {/* Elementos graficos discretos: bem menos presentes que o
                fundo azul da secao 4, para nao repetir a mesma cena.
                overflow-x-clip (nao overflow-hidden): overflow-hidden
                em qualquer ancestral quebra o sticky vertical do painel
                esquerdo da jornada. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 top-24 h-80 w-80 rounded-full bg-brand/[0.06] blur-3xl" />
                <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-brand-sand/[0.04] blur-3xl" />
            </div>

            <div className="container-page relative">
                <Reveal>
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-pretty text-3xl text-white sm:text-4xl lg:text-[2.85rem]">
                            Você não precisa{" "}
                            <Highlight className="text-brand-sand">
                                implantar tudo sozinho.
                            </Highlight>
                        </h2>

                        <p className="mx-auto mt-7 max-w-2xl text-base text-text-inverse-muted sm:mt-8 sm:text-lg">
                            A implantação da sōma é acompanhada de perto para
                            que a plataforma seja configurada de acordo com a
                            realidade da sua igreja, facilitando a entrada da
                            equipe e o início da operação.
                        </p>
                    </div>
                </Reveal>

                <ImplementationJourney />

                <Reveal delay={0.1}>
                    <div className="mx-auto mt-14 max-w-3xl text-center lg:mt-16">
                        <p className="text-balance font-heading text-2xl font-bold leading-snug text-white sm:text-3xl">
                            Tecnologia é importante.{" "}
                            <Highlight className="text-brand-sand">
                                Ter alguém ao lado
                            </Highlight>{" "}
                            durante a implantação também.
                        </p>

                        <p className="mx-auto mt-4 max-w-xl text-base text-text-inverse-muted">
                            Da configuração inicial às primeiras semanas de
                            uso, a equipe da sōma acompanha sua igreja de
                            perto.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
