import type { ReactNode } from "react";

type HighlightVariant = "color" | "surface";

type HighlightProps = {
    children: ReactNode;
    variant?: HighlightVariant;
    className?: string;
};

/**
 * Destaque de palavras-chave da narrativa.
 *
 * "color" e o padrao da marca: apenas azul petroleo, mantendo a
 * sobriedade da identidade.
 * "surface" aplica um fundo suave, util quando o destaque precisa
 * competir com muita informacao ao redor.
 */
export function Highlight({
    children,
    variant = "color",
    className = "",
}: HighlightProps) {
    const variantStyles: Record<HighlightVariant, string> = {
        color: "text-brand",
        surface:
            "rounded-lg bg-brand-soft px-2 py-0.5 text-brand-dark [box-decoration-break:clone] [-webkit-box-decoration-break:clone]",
    };

    const spanClassName = [variantStyles[variant], className]
        .filter(Boolean)
        .join(" ");

    return <span className={spanClassName}>{children}</span>;
}
