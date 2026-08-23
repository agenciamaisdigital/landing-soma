import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DEMO_WHATSAPP_URL } from "@/lib/constants";

const navItems = [
    { label: "Home", href: "#hero" },
    { label: "O Problema", href: "#problemas" },
    { label: "Plataforma", href: "#plataforma" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Implantação", href: "#implantacao" },
    { label: "FAQ", href: "#faq" },
];

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md transition-all duration-200">
            <div className="container-page flex h-14 items-center justify-between sm:h-16">
                {/* Apenas o símbolo sōma na cor Azul Petróleo */}
                <a href="#hero" className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105">
                    <Image
                        src="/images/simbolo-azul-petroleo.png"
                        alt="sōma"
                        width={40}
                        height={40}
                        priority
                        className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
                    />
                </a>

                {/* Links de Navegação Desktop */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-brand"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Botão de Ação do Cabeçalho: Fale conosco */}
                <div className="flex items-center gap-3">
                    <a href={DEMO_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="default" className="text-xs sm:text-sm">
                            Fale conosco
                        </Button>
                    </a>
                </div>
            </div>
        </header>
    );
}
