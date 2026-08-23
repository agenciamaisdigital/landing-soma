import Image from "next/image";
import { InstagramGlyph, WhatsAppGlyph, YoutubeGlyph } from "@/components/ui/brand-glyphs";
import { DEMO_WHATSAPP_URL } from "@/lib/constants";

const navigationLinks = [
    { label: "O Problema", href: "#problemas" },
    { label: "A Plataforma", href: "#plataforma" },
    { label: "Relacionamento", href: "#conectado" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Implantação", href: "#implantacao" },
    { label: "FAQ", href: "#faq" },
];

const platformLinks = [
    "Gestão de Membros & Pessoas",
    "Financeiro & Dízimos",
    "Grupos & Células",
    "Módulo Kids & Check-in",
    "Comunicação via WhatsApp",
    "Aplicativo do Membro",
];

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#23252B] text-text-inverse">
            <div className="container-page py-16 sm:py-20">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
                    {/* Coluna de Marca & Visão */}
                    <div className="lg:col-span-5">
                        {/* Logo Horizontal Claro da pasta de imagens */}
                        <Image
                            src="/images/logo-horizontal-claro.png"
                            alt="sōma — Tecnologia para igrejas"
                            width={180}
                            height={48}
                            className="h-10 w-auto object-contain"
                        />

                        <p className="mt-5 max-w-sm text-sm text-text-inverse-muted leading-relaxed sm:text-base">
                            Uma plataforma completa e conectada que simplifica a gestão administrativa
                            e aproxima a igreja dos seus membros em um só lugar.
                        </p>

                        {/* Redes Sociais */}
                        <div className="mt-7 flex items-center gap-3">
                            <a
                                href={DEMO_WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp sōma"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-text-inverse-muted transition-colors duration-200 hover:bg-brand/20 hover:text-white"
                            >
                                <WhatsAppGlyph className="h-5 w-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram sōma"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-text-inverse-muted transition-colors duration-200 hover:bg-brand/20 hover:text-white"
                            >
                                <InstagramGlyph className="h-5 w-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube sōma"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-text-inverse-muted transition-colors duration-200 hover:bg-brand/20 hover:text-white"
                            >
                                <YoutubeGlyph className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Coluna: Navegação */}
                    <div className="lg:col-span-3">
                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-sand">
                            Navegação
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm text-text-inverse-muted">
                            {navigationLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="transition-colors duration-200 hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna: Plataforma */}
                    <div className="lg:col-span-4">
                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-sand">
                            Ecossistema sōma
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm text-text-inverse-muted">
                            {platformLinks.map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-sand/40" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divisória e Rodapé Inferior */}
                <div className="mt-14 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-text-inverse-muted sm:flex-row">
                    <p>© {new Date().getFullYear()} sōma. Todos os direitos reservados.</p>
                    <p className="text-center sm:text-right">
                        Desenvolvido pela agência{" "}
                        <a
                            href="https://agenciamaisdigital.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-brand-sand underline decoration-brand-sand/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                        >
                            + Digital
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
