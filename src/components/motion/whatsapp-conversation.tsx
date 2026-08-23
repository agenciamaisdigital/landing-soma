"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * Tres conversas se alternam em rodizio, mostrando usos diferentes
 * do canal: lembrete de escala, acolhimento de visitante e aviso de
 * evento. O remetente e sempre generico, para a landing servir a
 * qualquer igreja, de qualquer tradicao.
 */
const conversations = [
    {
        id: "escala",
        incoming:
            "Olá, Ana! Você está escalada no Ministério de Louvor no domingo, 27/04, às 10h.",
        incomingTime: "09:12",
        reply: "Confirmado!",
        replyTime: "09:14",
    },
    {
        id: "visitante",
        incoming:
            "Que alegria ter você com a gente ontem, Marcos! Se precisar de qualquer coisa, é só chamar por aqui.",
        incomingTime: "10:03",
        reply: "Obrigado! Me senti muito bem recebido.",
        replyTime: "10:21",
    },
    {
        id: "evento",
        incoming:
            "Lembrete: o Encontro de Mulheres é neste sábado, às 15h. Sua inscrição está confirmada.",
        incomingTime: "18:40",
        reply: "Já estou me organizando pra ir!",
        replyTime: "18:46",
    },
];

const CYCLE = 6.4;

const bubbleShadow = "shadow-[0_12px_32px_rgba(35,37,43,0.16)]";

function TypingDots() {
    return (
        <div className="flex items-center gap-1">
            {[0, 1, 2].map((dot) => (
                <motion.span
                    key={dot}
                    className="block h-1.5 w-1.5 rounded-full bg-text-secondary"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: dot * 0.16,
                    }}
                />
            ))}
        </div>
    );
}

function IncomingBubble({
    text,
    time,
}: {
    text: string;
    time: string;
}) {
    return (
        <div className={`rounded-2xl rounded-tl-sm bg-white p-3.5 ${bubbleShadow}`}>
            <p className="text-[0.68rem] font-bold text-brand">Sua Igreja</p>
            <p className="mt-1 text-xs leading-snug text-text-primary">
                {text}
            </p>
            <p className="mt-1.5 text-right text-[0.6rem] text-text-secondary">
                {time}
            </p>
        </div>
    );
}

function ReplyBubble({ text, time }: { text: string; time: string }) {
    return (
        <div
            className={`ml-auto w-[78%] rounded-2xl rounded-br-sm bg-[#DCF8C6] p-3 ${bubbleShadow}`}
        >
            <p className="text-xs leading-snug text-text-primary">{text}</p>
            <p className="mt-1 text-right text-[0.6rem] text-text-secondary">
                {time}
            </p>
        </div>
    );
}

export function WhatsappConversation() {
    const shouldReduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (shouldReduceMotion) {
            return;
        }

        const timer = setInterval(() => {
            setIndex((current) => (current + 1) % conversations.length);
        }, CYCLE * 1000);

        return () => clearInterval(timer);
    }, [shouldReduceMotion]);

    const wrapper =
        "absolute right-5 top-1/2 w-[58%] max-w-[300px] -translate-y-1/2 sm:right-8";

    // Sem rodizio nem looping para quem pediu movimento reduzido:
    // mostra uma conversa completa e parada.
    if (shouldReduceMotion) {
        const first = conversations[0];

        return (
            <div className={`${wrapper} space-y-2.5`}>
                <IncomingBubble
                    text={first.incoming}
                    time={first.incomingTime}
                />
                <ReplyBubble text={first.reply} time={first.replyTime} />
            </div>
        );
    }

    const conversation = conversations[index];

    return (
        <div className={wrapper}>
            {/* A key remonta o bloco a cada ciclo, reiniciando a cena. */}
            <div
                key={conversation.id}
                className="flex min-h-[200px] flex-col justify-center gap-2.5"
            >
                <motion.div
                    animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, 0] }}
                    transition={{
                        duration: CYCLE,
                        times: [0, 0.1, 0.86, 0.97],
                        ease: "easeOut",
                    }}
                    style={{ willChange: "transform, opacity" }}
                >
                    <IncomingBubble
                        text={conversation.incoming}
                        time={conversation.incomingTime}
                    />
                </motion.div>

                {/* Digitando e resposta dividem o mesmo espaco, para a
                    altura do bloco nao pular durante a cena. */}
                <div className="relative h-[68px]">
                    <motion.div
                        className="absolute inset-x-0 top-0 flex"
                        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                        transition={{
                            duration: CYCLE,
                            times: [0, 0.27, 0.32, 0.46, 0.51, 1],
                            ease: "easeOut",
                        }}
                        style={{ willChange: "opacity" }}
                    >
                        <div
                            className={`ml-auto rounded-2xl rounded-br-sm bg-[#DCF8C6] px-3.5 py-3 ${bubbleShadow}`}
                        >
                            <TypingDots />
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute inset-x-0 top-0"
                        animate={{ opacity: [0, 0, 1, 1, 0], y: [14, 14, 0, 0, 0] }}
                        transition={{
                            duration: CYCLE,
                            times: [0, 0.52, 0.6, 0.86, 0.97],
                            ease: "easeOut",
                        }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <ReplyBubble
                            text={conversation.reply}
                            time={conversation.replyTime}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
