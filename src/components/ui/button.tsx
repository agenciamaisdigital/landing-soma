import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark";
type ButtonSize = "default" | "large";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
};

const baseStyles = [
    "inline-flex",
    "min-h-11",
    "items-center",
    "justify-center",
    "gap-2",
    "rounded-button",
    "font-sans",
    "font-semibold",
    "leading-none",
    "transition-[background-color,color,border-color,box-shadow,transform]",
    "duration-200",
    "ease-out",
    "hover:-translate-y-0.5",
    "active:translate-y-0",
    "disabled:pointer-events-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-45",
    "disabled:transform-none",
].join(" ");

const variantStyles: Record<ButtonVariant, string> = {
    primary: [
        "border",
        "border-brand",
        "bg-brand",
        "text-white",
        "shadow-soft",
        "hover:border-brand-hover",
        "hover:bg-brand-hover",
        "hover:shadow-card",
    ].join(" "),

    secondary: [
        "border",
        "border-border",
        "bg-white",
        "text-text-primary",
        "shadow-soft",
        "hover:border-brand",
        "hover:bg-brand-soft",
        "hover:text-brand-dark",
    ].join(" "),

    dark: [
        "border",
        "border-border-dark",
        "bg-transparent",
        "text-text-inverse",
        "hover:border-brand",
        "hover:bg-brand",
        "hover:text-white",
    ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
    default: "px-5 py-3 text-sm",
    large: "px-7 py-4 text-base",
};

export function Button({
    children,
    variant = "primary",
    size = "default",
    fullWidth = false,
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    const widthStyle = fullWidth ? "w-full" : "";

    const buttonClassName = [
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyle,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button type={type} className={buttonClassName} {...props}>
            {children}
        </button>
    );
}