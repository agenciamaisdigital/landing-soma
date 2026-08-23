type LogoSize = "sm" | "default" | "lg";
type LogoTone = "dark" | "light";

type LogoProps = {
    withDescriptor?: boolean;
    size?: LogoSize;
    tone?: LogoTone;
    className?: string;
};

const sizeStyles: Record<LogoSize, string> = {
    sm: "text-lg",
    default: "text-2xl",
    lg: "text-3xl",
};

const symbolSizeStyles: Record<LogoSize, string> = {
    sm: "h-7 w-7",
    default: "h-9 w-9",
    lg: "h-11 w-11",
};

export function SomaSymbol({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            fill="none"
            aria-hidden="true"
        >
            <circle
                cx="50"
                cy="50"
                r="33"
                stroke="var(--brand-primary)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray="13 12.5"
            />
            <circle cx="83" cy="50" r="6" fill="var(--brand-primary)" />
            <circle cx="68.5" cy="78.6" r="6" fill="var(--brand-primary-dark)" />
            <circle cx="31.5" cy="78.6" r="6" fill="var(--brand-primary)" />
            <circle cx="17" cy="50" r="6" fill="var(--brand-primary-dark)" />
            <circle cx="31.5" cy="21.4" r="6" fill="var(--brand-primary)" />
            <circle cx="68.5" cy="21.4" r="6" fill="var(--brand-primary-dark)" />
        </svg>
    );
}

export function Logo({
    withDescriptor = true,
    size = "default",
    tone = "dark",
    className = "",
}: LogoProps) {
    const textColor = tone === "dark" ? "text-text-primary" : "text-white";
    const descriptorColor =
        tone === "dark" ? "text-text-secondary" : "text-text-inverse-muted";

    return (
        <div className={`inline-flex items-center gap-2.5 ${className}`}>
            <SomaSymbol className={symbolSizeStyles[size]} />
            <div className="flex flex-col leading-none">
                <span
                    className={`brand-wordmark ${sizeStyles[size]} ${textColor}`}
                >
                    s<span className="brand-macron">o</span>ma
                </span>
                {withDescriptor && (
                    <span
                        className={`mt-1 text-[0.7rem] font-medium tracking-wide ${descriptorColor}`}
                    >
                        Tecnologia para igrejas
                    </span>
                )}
            </div>
        </div>
    );
}
