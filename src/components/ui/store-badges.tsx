/*
 * Selos das lojas desenhados em vetor.
 * Sao apenas visuais por enquanto: nao levam a lugar nenhum,
 * porque o aplicativo ainda nao esta publicado.
 */

const badgeStyles = [
    "inline-flex",
    "items-center",
    "gap-2.5",
    "rounded-xl",
    "border",
    "border-white/25",
    "bg-white/5",
    "px-4",
    "py-2.5",
].join(" ");

function AppleGlyph() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 shrink-0 text-white"
            aria-hidden="true"
        >
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" />
        </svg>
    );
}

function PlayGlyph() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0"
            aria-hidden="true"
        >
            <path
                fill="#00D2FF"
                d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l.1.1L13 12.1v-.2z"
            />
            <path
                fill="#FFCE00"
                d="m16.2 15.3-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2z"
            />
            <path
                fill="#FF3A44"
                d="M16.3 15.2 13.1 12 3.6 21.5c.4.4 1 .4 1.7.1z"
            />
            <path
                fill="#00C853"
                d="M16.3 8.8 5.3 2.4c-.7-.4-1.3-.3-1.7.1L13.1 12z"
            />
        </svg>
    );
}

export function StoreBadges({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-wrap gap-3 ${className}`}>
            <span className={badgeStyles}>
                <AppleGlyph />
                <span className="text-left leading-tight">
                    <span className="block text-[0.6rem] text-text-inverse-muted">
                        Baixar na
                    </span>
                    <span className="block text-sm font-semibold text-white">
                        App Store
                    </span>
                </span>
            </span>

            <span className={badgeStyles}>
                <PlayGlyph />
                <span className="text-left leading-tight">
                    <span className="block text-[0.6rem] text-text-inverse-muted">
                        Disponível no
                    </span>
                    <span className="block text-sm font-semibold text-white">
                        Google Play
                    </span>
                </span>
            </span>
        </div>
    );
}
