import type {
    HTMLAttributes,
    ReactNode,
} from "react";

type SectionVariant = "light" | "subtle" | "dark" | "brand";
type SectionSpacing = "compact" | "default" | "spacious";
type SectionContainer = "default" | "wide" | "text" | "compact";

type SectionProps = HTMLAttributes<HTMLElement> & {
    children: ReactNode;
    variant?: SectionVariant;
    spacing?: SectionSpacing;
    container?: SectionContainer;
};

const variantStyles: Record<SectionVariant, string> = {
    light: "bg-surface text-text-primary",
    subtle: "bg-surface-subtle text-text-primary",
    dark: "bg-surface-dark text-text-inverse",
    brand: "bg-brand text-black",
};

const spacingStyles: Record<SectionSpacing, string> = {
    compact: "py-12 sm:py-16 lg:py-20",
    default: "py-16 sm:py-20 lg:py-28",
    spacious: "py-20 sm:py-28 lg:py-36",
};

const containerStyles: Record<SectionContainer, string> = {
    default: "container-page",
    wide: "container-wide",
    text: "container-text",
    compact: "container-compact",
};

export function Section({
    children,
    variant = "light",
    spacing = "default",
    container = "default",
    className = "",
    ...props
}: SectionProps) {
    const sectionClassName = [
        variantStyles[variant],
        spacingStyles[spacing],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={sectionClassName} {...props}>
            <div className={containerStyles[container]}>
                {children}
            </div>
        </section>
    );
}