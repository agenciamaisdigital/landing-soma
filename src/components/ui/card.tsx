import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "light" | "dark" | "accent";
type CardPadding = "default" | "large";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    variant?: CardVariant;
    padding?: CardPadding;
    interactive?: boolean;
};

const baseStyles = [
    "relative",
    "overflow-hidden",
    "rounded-card",
    "transition-[transform,border-color,box-shadow,background-color]",
    "duration-200",
    "ease-out",
].join(" ");

const variantStyles: Record<CardVariant, string> = {
    light: [
        "border",
        "border-border",
        "bg-surface",
        "text-text-primary",
        "shadow-soft",
    ].join(" "),

    dark: [
        "border",
        "border-border-dark",
        "bg-surface-dark-elevated",
        "text-text-inverse",
        "shadow-elevated",
    ].join(" "),

    accent: [
        "border",
        "border-brand",
        "bg-brand-soft",
        "text-text-primary",
        "shadow-soft",
    ].join(" "),
};

const paddingStyles: Record<CardPadding, string> = {
    default: "p-6",
    large: "p-8 sm:p-10",
};

const interactiveStyles = [
    "hover:-translate-y-1",
    "hover:border-brand-dark",
    "hover:shadow-card",
].join(" ");

export function Card({
    children,
    variant = "light",
    padding = "default",
    interactive = false,
    className = "",
    ...props
}: CardProps) {
    const cardClassName = [
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        interactive ? interactiveStyles : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={cardClassName} {...props}>
            {children}
        </div>
    );
}