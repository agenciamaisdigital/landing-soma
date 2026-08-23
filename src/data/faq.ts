export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

export const faqItems: FaqItem[] = [
    {
        id: "tamanho-igreja",
        question: "A sōma funciona para igrejas pequenas e grandes?",
        answer:
            "Sim. A sōma foi projetada para acompanhar o crescimento da sua igreja. Desde comunidades locais com dezenas de membros até redes com milhares de fiéis e múltiplas sedes ou células, a plataforma adapta suas permissões e módulos para atender a sua escala com simplicidade.",
    },
    {
        id: "catolicas-protestantes",
        question: "Atende igrejas católicas e protestantes?",
        answer:
            "Sim! A sōma respeita a nomenclatura e a dinâmica de cada tradição cristã. Seja para organizar paróquias, pastorais e dízimos, seja para gerenciar ministérios, células, pequenos grupos e cultos, você pode personalizar os termos do sistema para a linguagem da sua comunidade.",
    },
    {
        id: "app-membros",
        question: "A sōma possui aplicativo para membros?",
        answer:
            "Sim, os membros contam com um aplicativo intuitivo (iOS e Android) e web app. Nele, eles podem atualizar seu cadastro, acompanhar avisos, participar de células ou grupos, fazer contribuições e acessar materiais — tudo integrado ao painel administrativo da liderança em tempo real.",
    },
    {
        id: "importar-cadastros",
        question: "É possível importar cadastros existentes?",
        answer:
            "Com certeza. Você não precisa recomeçar do zero. Nossa equipe auxilia no processo de importação de planilhas (Excel ou CSV) ou migração de dados do seu sistema antigo, garantindo que nenhum histórico de membro ou contribuição seja perdido.",
    },
    {
        id: "comunicacao-whatsapp",
        question: "Como funciona a comunicação pelo WhatsApp?",
        answer:
            "A sōma possui integração inteligente para envio de mensagens, lembretes de eventos, confirmações de presença e avisos importantes diretamente pelo WhatsApp. Isso garante que a comunicação chegue onde as pessoas realmente leem, aumentando o engajamento.",
    },
    {
        id: "modulo-kids",
        question: "O sistema possui módulo Kids?",
        answer:
            "Sim! O módulo Kids permite a recepção e o check-in seguro das crianças no início dos cultos ou eventos, emissão de etiquetas com identificação do responsável, controle de alergias ou observações e aviso imediato aos pais em caso de necessidade.",
    },
    {
        id: "instalacao-programa",
        question: "Preciso instalar algum programa?",
        answer:
            "Não. A sōma é 100% baseada na nuvem. Você e sua equipe podem acessar o painel administrativo de qualquer lugar, a qualquer hora, utilizando computador, tablet ou smartphone com acesso à internet, sem necessidade de instalações ou servidores locais.",
    },
    {
        id: "escolher-modulos",
        question: "Posso escolher quais módulos utilizar?",
        answer:
            "Sim. A sōma é modular e flexível. Sua igreja pode ativar apenas as funcionalidades que precisa no momento (como gestão de pessoas e financeira) e habilitar novos módulos (como Kids, células, eventos ou app) conforme a necessidade evolui.",
    },
    {
        id: "acompanhamento-implantacao",
        question: "A implantação tem acompanhamento?",
        answer:
            "Sim. Como mostramos na seção de implantação, você não fica sozinho. Nossa equipe realiza o onboarding da sua liderança, treina os voluntários e secretários e acompanha as primeiras semanas de operação para garantir uma transição sem percalços.",
    },
    {
        id: "seguranca-dados",
        question: "Meus dados ficam seguros?",
        answer:
            "Totalmente. A sōma adota altos padrões de segurança da informação, com criptografia de dados de ponta a ponta, backups automáticos diários em servidores de alta disponibilidade e conformidade total com a Lei Geral de Proteção de Dados (LGPD).",
    },
];
