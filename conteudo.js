/* ==========================================================
   CONTEÚDO DO PORTFÓLIO

   Todo o texto do site mora neste arquivo, em português (pt)
   e inglês (en), lado a lado. Para atualizar o portfólio,
   edite só os valores entre aspas: o HTML é montado sozinho.

   Nos títulos, a palavra entre *asteriscos* ganha o destaque
   em itálico colorido.
   ========================================================== */

window.CONTENT = {

    /* ==========================================================
       DADOS PESSOAIS
       ========================================================== */

    person: {
        name: "Enzo Maximiliano Rodrigues Lemes",
        shortName: "Enzo Maximiliano",  
        initials: "EM",
        photo: "img/foto.jpg",
        photoAlt: {
            pt: "Foto de Enzo Maximiliano Rodrigues Lemes",
            en: "Photo of Enzo Maximiliano Rodrigues Lemes"
        },

        // Frases que se alternam logo abaixo do nome.
        roles: {
            pt: ["Analista de Sistemas", "Engenheiro de Software", "Estudando Cybersecurity"],
            en: ["Systems Analyst", "Software Engineer", "Studying Cybersecurity"]
        },

        lead: {
            pt: "Sou Analista de Sistemas e Desenvolvedor com experiência em infraestrutura de TI, automação de processos, desenvolvimento de sistemas e melhoria contínua.",
            en: "I am a Systems Analyst and Software Developer with experience in IT infrastructure, process automation, software development, and continuous improvement."
        },

        city: "Maringá",
        state: "PR",
        region: { pt: "Paraná, Brasil", en: "Paraná, Brazil" },
        location: { pt: "Maringá · Paraná · Brasil", en: "Maringá · Paraná · Brazil" },
        timeZone: "America/Sao_Paulo",

        // Ano da primeira experiência em TI (WRA).
        itSince: 2022
    },


    /* ==========================================================
       CONTATO
       ========================================================== */

    contact: {
        email: "enzo.max.rlemes@gmail.com",
        phone: "(44) 99770-3440",
        phoneIntl: "5544997703440",
        linkedin: "https://www.linkedin.com/in/enzo-maximiliano/",
        linkedinLabel: "in/enzo-maximiliano",
        github: "https://github.com/enzomaximilinao",
        githubLabel: "@enzomaximilinao",

        text: {
            pt: "Obrigado por visitar meu portfólio. Estou sempre aberto para novas oportunidades, experiências, desafios e networking. Se você procura um profissional comprometido, apaixonado por tecnologia e focado em entregar resultados, ficarei feliz em conversar.",
            en: "Thank you for visiting my portfolio. I am always open to new opportunities, experiences, challenges, and networking. If you are looking for a dedicated professional, passionate about technology and committed to delivering results, I would be happy to connect with you."
        }
    },


    /* ==========================================================
       SOBRE MIM
       ========================================================== */

    about: {
        // Texto grande que acende palavra por palavra durante a rolagem.
        text: {
            pt: "Sou um profissional apaixonado por tecnologia, inovação e melhoria contínua. Minha carreira foi construída atuando em ambientes onde infraestrutura, desenvolvimento, suporte técnico, processos e gestão caminham juntos. Ao longo da minha experiência, participei da implantação de sistemas, administração de servidores, desenvolvimento de aplicações, documentação, análise de processos, suporte técnico e automação de atividades empresariais. Tenho facilidade para aprender novas tecnologias, compreender processos de negócio e propor soluções que aumentem a eficiência operacional das empresas. Acredito que tecnologia deve gerar resultados concretos, simplificando rotinas, reduzindo custos e criando oportunidades para crescimento.",
            en: "I am a professional passionate about technology, innovation, and continuous improvement. My career has been built by working in environments where infrastructure, software development, technical support, business processes, and management work together. Throughout my professional experience, I have participated in system implementation, server administration, application development, technical documentation, process analysis, technical support, and business process automation. I quickly adapt to new technologies, understand business processes, and develop solutions that improve operational efficiency. I believe technology should deliver measurable results by simplifying workflows, reducing costs, and creating opportunities for sustainable growth."
        },

        purpose: {
            pt: "Tenho como principal objetivo utilizar a tecnologia para simplificar rotinas, aumentar a produtividade e transformar desafios de negócio em soluções eficientes, escaláveis e de alto impacto.",
            en: "My primary goal is to leverage technology to simplify workflows, increase productivity, and transform business challenges into efficient, scalable, and high-impact solutions."
        },

        journey: {
            pt: "Ao longo da minha trajetória, participei da implantação de soluções tecnológicas, administração de ambientes corporativos, desenvolvimento de aplicações, gerenciamento de infraestrutura e otimização de processos empresariais.",
            en: "Throughout my career, I have contributed to the implementation of technology solutions, corporate IT environment administration, application development, infrastructure management, and the optimization of business processes."
        },

        objective: {
            pt: "Meu objetivo é atuar como Analista de Sistemas ou Engenheiro de Software, participando do desenvolvimento de soluções tecnológicas que gerem valor para empresas e pessoas. Busco oportunidades que me permitam trabalhar com desenvolvimento de software, automação de processos, arquitetura de sistemas, análise de requisitos e infraestrutura, sempre mantendo o foco em inovação, qualidade e evolução profissional.",
            en: "My goal is to work as a Systems Analyst or Software Engineer, contributing to the development of technology solutions that create value for businesses and people. I am seeking opportunities that allow me to work with software development, process automation, systems architecture, requirements analysis, and infrastructure, while maintaining a strong focus on innovation, quality, and continuous professional growth."
        },

        // Habilidades principais.
        highlights: [
            {
                icon: "server",
                title: { pt: "Infraestrutura e Suporte", en: "Infrastructure & Technical Support" },
                text: {
                    pt: "Sou altamente capacitado na manutenção e otimização de servidores, redes e equipamentos, garantindo que os sistemas funcionem de maneira eficiente e segura.",
                    en: "Highly skilled in maintaining and optimizing servers, networks, and IT equipment, ensuring systems operate efficiently, securely, and reliably."
                }
            },
            {
                icon: "workflow",
                title: { pt: "Análise e Melhoria de Processos", en: "Process Analysis & Improvement" },
                text: {
                    pt: "Tenho expertise em identificar áreas de melhoria nos processos empresariais e implementar soluções que aumentem a produtividade e a eficiência.",
                    en: "Experienced in identifying opportunities for process optimization and implementing solutions that increase productivity and operational efficiency."
                }
            },
            {
                icon: "code",
                title: { pt: "Programação", en: "Software Development" },
                text: {
                    pt: "Tenho forte experiência em várias linguagens de programação como Java, React Native, PHP e CSS, com foco no desenvolvimento de soluções escaláveis e de alta qualidade.",
                    en: "Strong experience with programming languages and technologies such as Java, React Native, PHP, and CSS, focused on building scalable, high-quality software solutions."
                }
            }
        ]
    },


    /* ==========================================================
       EXPERIÊNCIAS
       Datas no formato "AAAA-MM". Deixe end: null no emprego atual.
       A mais recente fica primeiro.
       ========================================================== */

    experiences: [
        {
            company: "Official TI",
            role: { pt: "Analista de Operações", en: "Operations Analyst" },
            start: "2026-03",
            end: null,
            tags: { pt: ["Operações", "Financeiro", "Chamados"], en: ["Operations", "Finance", "Ticketing"] },
            items: {
                pt: [
                    "Execução de atividades administrativas e operacionais, com foco na organização de processos internos e no suporte às demandas diárias da empresa.",
                    "Controle de mensalidades, custos operacionais e acompanhamento financeiro.",
                    "Gerenciamento dos canais de comunicação administrativo, financeiro e fiscal.",
                    "Abertura, classificação e direcionamento de chamados para a equipe técnica conforme prioridade e disponibilidade."
                ],
                en: [
                    "Performed administrative and operational activities, focusing on organizing internal processes and supporting the company's daily operations.",
                    "Managed monthly payments, operational costs, and financial tracking.",
                    "Managed administrative, financial, and tax communication channels.",
                    "Opened, categorized, and assigned support tickets to the technical team based on priority and availability."
                ]
            }
        },
        {
            company: "BTZ",
            role: { pt: "Assistente Administrativo Sênior", en: "Senior Administrative Assistant" },
            start: "2025-07",
            end: "2025-12",
            tags: { pt: ["Compras", "Pedidos", "Logística"], en: ["Procurement", "Orders", "Logistics"] },
            items: {
                pt: [
                    "Mapeamento e controle de Ordens de Compra (OC) e Ordens de Serviço (OS).",
                    "Suporte ao processo de compras de materiais e equipamentos.",
                    "Cadastro de equipamentos em sistemas corporativos.",
                    "Implantação de solução integrada para gestão de pedidos.",
                    "Controle de produção, logística, planilhas e emissão de Notas Fiscais."
                ],
                en: [
                    "Mapped and monitored Purchase Orders (PO) and Service Orders (SO).",
                    "Supported the procurement process for materials and equipment.",
                    "Registered equipment in corporate systems.",
                    "Implemented an integrated solution for order management.",
                    "Managed production, logistics, spreadsheets, and invoice issuance."
                ]
            }
        },
        {
            company: "Royaltoys",
            role: { pt: "Analista de Processos", en: "Process Analyst" },
            start: "2024-02",
            end: "2024-06",
            tags: { pt: ["Processos", "Produção", "Logística"], en: ["Processes", "Production", "Logistics"] },
            items: {
                pt: [
                    "Mapeamento e reestruturação de processos internos.",
                    "Otimização do fluxo entre setores, aumentando a eficiência operacional.",
                    "Implantação de solução integrada para gestão de pedidos.",
                    "Melhoria do controle de produção e logística."
                ],
                en: [
                    "Mapped and restructured internal processes.",
                    "Optimized workflows between departments, improving operational efficiency.",
                    "Implemented an integrated order management solution.",
                    "Improved production and logistics control."
                ]
            }
        },
        {
            company: "WRA",
            role: { pt: "Analista de Suporte e Infraestrutura", en: "IT Support & Infrastructure Analyst" },
            start: "2022-06",
            end: "2023-07",
            tags: { pt: ["Suporte", "Infraestrutura", "Redes"], en: ["Support", "Infrastructure", "Networking"] },
            items: {
                pt: [
                    "Diagnóstico e resolução de problemas em desktops, notebooks e servidores.",
                    "Instalação e configuração de sistemas operacionais Windows.",
                    "Manutenção preventiva e corretiva de hardware.",
                    "Configuração de redes locais (LAN), roteadores e impressoras.",
                    "Atendimento remoto e presencial aos usuários.",
                    "Gestão de chamados por meio de sistema de tickets."
                ],
                en: [
                    "Diagnosed and resolved issues with desktops, laptops, and servers.",
                    "Installed and configured Windows operating systems.",
                    "Performed preventive and corrective hardware maintenance.",
                    "Configured local area networks (LAN), routers, and printers.",
                    "Provided both remote and on-site technical support to end users.",
                    "Managed support requests through a ticketing system."
                ]
            }
        }
    ],


    /* ==========================================================
       HABILIDADES TÉCNICAS
       ========================================================== */

    skills: [
        {
            id: "programacao",
            label: { pt: "Programação", en: "Programming" },
            items: [
                {
                    icon: "code",
                    title: { pt: "Desenvolvimento de Sistemas", en: "Systems Development" },
                    text: {
                        pt: "Experiência no desenvolvimento de aplicações web, integração com bancos de dados, APIs e manutenção de sistemas.",
                        en: "Experience in web application development, database integration, APIs, and system maintenance."
                    }
                },
                {
                    icon: "server",
                    title: { pt: "Infraestrutura de TI", en: "IT Infrastructure" },
                    text: {
                        pt: "Administração de servidores Windows e Linux, backup, virtualização, redes, firewall e suporte corporativo.",
                        en: "Administration of Windows and Linux servers, backup, virtualization, networking, firewall management, and corporate technical support."
                    }
                },
                {
                    icon: "workflow",
                    title: { pt: "Automação e Processos", en: "Automation and Processes" },
                    text: {
                        pt: "Mapeamento de processos, Power BI, Power Query, SQL, documentação, melhoria contínua e otimização operacional.",
                        en: "Process mapping, Power BI, Power Query, SQL, technical documentation, continuous improvement, and operational optimization."
                    }
                },
                {
                    icon: "layers",
                    title: { pt: "Análise de Sistemas", en: "Systems Analysis" },
                    text: {
                        pt: "Levantamento de requisitos, documentação técnica, implantação de soluções, treinamento de usuários e suporte a sistemas corporativos.",
                        en: "Requirements gathering, technical documentation, solution implementation, user training, and enterprise systems support."
                    }
                }
            ]
        },
        {
            id: "gestao",
            label: { pt: "Gestão de Processos", en: "Process Management" },
            items: [
                {
                    icon: "route",
                    title: { pt: "Análise e otimização de processos", en: "Process Analysis and Optimization" },
                    text: {
                        pt: "Identificação e aprimoramento de processos internos, contribuindo para uma maior eficiência operacional.",
                        en: "Identification and improvement of internal processes, contributing to greater operational efficiency."
                    }
                },
                {
                    icon: "chart",
                    title: { pt: "Análise de dados", en: "Data Analysis" },
                    text: {
                        pt: "Aplicação de técnicas analíticas para identificar tendências e propor melhorias estratégicas.",
                        en: "Application of analytical techniques to identify trends and propose strategic improvements."
                    }
                },
                {
                    icon: "table",
                    title: { pt: "Ferramentas de produtividade", en: "Productivity Tools" },
                    text: {
                        pt: "Domínio de softwares de gestão, como planilhas e plataformas específicas, para organização e monitoramento de dados.",
                        en: "Proficiency in management software, including spreadsheets and specialized platforms, for data organization and monitoring."
                    }
                }
            ]
        },
        {
            id: "idiomas",
            label: { pt: "Idiomas", en: "Languages" },
            items: [
                {
                    icon: "globe",
                    title: { pt: "Inglês", en: "English" },
                    level: { pt: "Avançado (C1)", en: "Advanced (C1)" },
                    text: {
                        pt: "Acredito que minha fluência no idioma é essencial para compreender e aplicar as últimas tendências e inovações tecnológicas de forma global.",
                        en: "I believe my fluency in English is essential for understanding and applying the latest global technology trends and innovations."
                    }
                }
            ]
        }
    ],

    // Palavras da faixa que desliza entre as seções.
    stack: [
        "Java", "React Native", "PHP", "CSS", "SQL", "Power BI", "Power Query",
        "Windows Server", "Linux", "Firewall", "Backup", "APIs",
        { pt: "Redes", en: "Networking" },
        { pt: "Virtualização", en: "Virtualization" },
        { pt: "Bancos de dados", en: "Databases" },
        { pt: "Mapeamento de processos", en: "Process mapping" },
        { pt: "Suporte técnico", en: "Technical support" },
        "Cybersecurity"
    ],


    /* ==========================================================
       FORMAÇÃO ACADÊMICA
       ========================================================== */

    education: [
        {
            slug: { pt: "engenharia-de-software", en: "software-engineering" },
            title: { pt: "Engenharia de Software", en: "Software Engineering" },
            kind: { pt: "Bacharelado", en: "Bachelor's degree" },
            school: "UNICESUMAR",
            place: "Maringá",
            period: "2026",
            icon: "graduation",
            text: {
                pt: "Formação superior em Engenharia de Software, com foco em desenvolvimento, arquitetura de sistemas, engenharia de software e soluções tecnológicas.",
                en: "Bachelor's degree in Software Engineering, focused on development, systems architecture, software engineering, and technology solutions."
            },
            // image: versão leve exibida no site; imageFull: original, aberto em nova aba.
            image: "img/diploma-engenharia.jpg",
            imageFull: "img/Eng.png",
            imageAlt: {
                pt: "Diploma de Bacharel em Engenharia de Software emitido pela UNICESUMAR",
                en: "Bachelor's diploma in Software Engineering issued by UNICESUMAR"
            },
            action: { pt: "Ver diploma", en: "View diploma" }
        },
        {
            slug: { pt: "cs50-cybersecurity", en: "cs50-cybersecurity" },
            title: { pt: "Cybersecurity", en: "Cybersecurity" },
            kind: { pt: "Formação complementar", en: "Complementary training" },
            school: "Harvard",
            place: "CS50",
            period: "2026",
            icon: "shield",
            text: {
                pt: "Formação complementar em fundamentos de cibersegurança e segurança da informação, pelo curso CS50's Introduction to Cybersecurity.",
                en: "Complementary training in cybersecurity and information security fundamentals, through CS50's Introduction to Cybersecurity."
            },
            image: "img/certificado-harvard.jpg",
            imageFull: "img/Harvard.png",
            imageAlt: {
                pt: "Certificado do curso CS50's Introduction to Cybersecurity, da Universidade Harvard",
                en: "Certificate for CS50's Introduction to Cybersecurity, from Harvard University"
            },
            action: { pt: "Ver certificado", en: "View certificate" }
        },
        {
            slug: { pt: "analise-e-desenvolvimento-de-sistemas", en: "systems-analysis-and-development" },
            title: { pt: "Análise e Desenvolvimento de Sistemas", en: "Systems Analysis and Development" },
            kind: { pt: "Formação superior", en: "Higher education" },
            school: "UNICESUMAR",
            place: "Maringá",
            period: "2022 - 2025",
            icon: "database",
            text: {
                pt: "Formação superior em desenvolvimento de sistemas, programação, desenvolvimento web, bancos de dados e soluções tecnológicas.",
                en: "Higher education in systems development, programming, web development, databases, and technology solutions."
            }
        }
    ],


    /* ==========================================================
       TEXTOS DA INTERFACE
       ========================================================== */

    ui: {
        meta: {
            title: {
                pt: "Enzo Maximiliano Rodrigues Lemes | Analista de Sistemas e Engenheiro de Software",
                en: "Enzo Maximiliano Rodrigues Lemes | Systems Analyst and Software Engineer"
            },
            description: {
                pt: "Portfólio de Enzo Maximiliano Rodrigues Lemes, Analista de Sistemas e Engenheiro de Software em Maringá (PR), com experiência em infraestrutura de TI, automação de processos e desenvolvimento de sistemas.",
                en: "Portfolio of Enzo Maximiliano Rodrigues Lemes, Systems Analyst and Software Engineer based in Maringá, Brazil, experienced in IT infrastructure, process automation, and software development."
            }
        },

        nav: [
            { id: "inicio", label: { pt: "Início", en: "Home" } },
            { id: "sobre", label: { pt: "Sobre", en: "About" } },
            { id: "experiencias", label: { pt: "Experiências", en: "Experience" } },
            { id: "habilidades", label: { pt: "Habilidades", en: "Skills" } },
            { id: "formacao", label: { pt: "Formação", en: "Education" } },
            { id: "contato", label: { pt: "Contato", en: "Contact" } }
        ],

        skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
        loading: { pt: "Carregando portfólio", en: "Loading portfolio" },
        menuOpen: { pt: "Abrir menu", en: "Open menu" },
        menuClose: { pt: "Fechar menu", en: "Close menu" },
        menuTitle: { pt: "Navegação", en: "Navigation" },
        themeToLight: { pt: "Ativar tema claro", en: "Switch to light theme" },
        themeToDark: { pt: "Ativar tema escuro", en: "Switch to dark theme" },
        language: { pt: "Idioma", en: "Language" },
        palette: { pt: "Abrir paleta de comandos", en: "Open command palette" },
        search: { pt: "Buscar", en: "Search" },
        stack: { pt: "Tecnologias e competências", en: "Technologies and competencies" },
        marqueePause: { pt: "Pausar faixa animada", en: "Pause scrolling banner" },
        marqueePlay: { pt: "Retomar faixa animada", en: "Resume scrolling banner" },

        hero: {
            currently: { pt: "Atualmente na", en: "Currently at" },
            ctaPrimary: { pt: "Ver experiências", en: "View experience" },
            ctaSecondary: { pt: "Fale comigo", en: "Get in touch" },
            scroll: { pt: "Role para explorar", en: "Scroll to explore" },
            stats: {
                companies: { pt: "empresas", en: "companies" },
                education: { pt: "formações", en: "qualifications" },
                english: { pt: "inglês", en: "English" },
                since: { pt: "em TI desde", en: "in IT since" }
            }
        },

        about: {
            title: { pt: "Sobre *mim*", en: "About *me*" },
            purpose: { pt: "Propósito", en: "Purpose" },
            journey: { pt: "Trajetória", en: "Background" },
            objective: { pt: "Objetivo profissional", en: "Career objective" },
            highlights: { pt: "Principais áreas de atuação", en: "Core areas of expertise" }
        },

        experience: {
            title: { pt: "Experiências *profissionais*", en: "Professional *experience*" },
            present: { pt: "Atual", en: "Present" },
            to: { pt: "até", en: "to" },
            current: { pt: "Emprego atual", en: "Current role" },
            month: { pt: "mês", en: "month" },
            months: { pt: "meses", en: "months" },
            year: { pt: "ano", en: "year" },
            years: { pt: "anos", en: "years" },
            and: { pt: "e", en: "and" },
            summary: {
                pt: "Uma trajetória que passa por suporte, infraestrutura, processos e operações, da mais recente para a primeira.",
                en: "A path through support, infrastructure, processes, and operations, from the most recent to the first."
            }
        },

        skills: {
            title: { pt: "Habilidades *técnicas*", en: "Technical *skills*" },
            all: { pt: "Todas", en: "All" },
            filter: { pt: "Filtrar habilidades", en: "Filter skills" }
        },

        education: {
            title: { pt: "Formação *acadêmica*", en: "Academic *background*" },
            subtitle: { pt: "Qualificações e conhecimentos da minha carreira.", en: "Qualifications and knowledge from my career." }
        },

        contact: {
            title: { pt: "Vamos *conversar?*", en: "Let's *connect*" },
            email: { pt: "E-mail", en: "Email" },
            phone: { pt: "Telefone", en: "Phone" },
            location: { pt: "Localização", en: "Location" },
            send: { pt: "Enviar e-mail", en: "Send email" },
            copy: { pt: "Copiar e-mail", en: "Copy email" },
            copied: { pt: "E-mail copiado!", en: "Email copied!" },
            copyFail: { pt: "Não consegui copiar. O e-mail é ", en: "Could not copy. The email is " },
            call: { pt: "Ligar", en: "Call" },
            open: { pt: "Abrir perfil", en: "Open profile" }
        },

        footer: {
            rights: { pt: "Todos os direitos reservados.", en: "All rights reserved." },
            top: { pt: "Voltar ao topo", en: "Back to top" },
            hint: { pt: "Dica: aperte {key} para navegar pelo teclado.", en: "Tip: press {key} to navigate with the keyboard." }
        },

        paletteUi: {
            placeholder: { pt: "Digite um comando ou busque uma seção...", en: "Type a command or search a section..." },
            empty: { pt: "Nenhum resultado para", en: "No results for" },
            groups: {
                nav: { pt: "Navegação", en: "Navigation" },
                actions: { pt: "Ações", en: "Actions" },
                links: { pt: "Links", en: "Links" }
            },
            goTo: { pt: "Ir para", en: "Go to" },
            theme: { pt: "Alternar tema claro/escuro", en: "Toggle light/dark theme" },
            lang: { pt: "Switch to English", en: "Mudar para português" },
            copyEmail: { pt: "Copiar e-mail", en: "Copy email" },
            sendEmail: { pt: "Enviar e-mail", en: "Send email" },
            whatsapp: { pt: "Conversar no WhatsApp", en: "Chat on WhatsApp" },
            linkedin: { pt: "Abrir LinkedIn", en: "Open LinkedIn" },
            github: { pt: "Abrir GitHub", en: "Open GitHub" },
            top: { pt: "Voltar ao topo", en: "Back to top" },
            print: { pt: "Imprimir ou salvar em PDF", en: "Print or save as PDF" },
            hints: { pt: "navegar", en: "navigate" },
            select: { pt: "selecionar", en: "select" },
            close: { pt: "fechar", en: "close" }
        },

        lightbox: {
            close: { pt: "Fechar", en: "Close" },
            open: { pt: "Abrir em nova aba", en: "Open in new tab" },
            zoomIn: { pt: "Clique na imagem para ampliar", en: "Click the image to zoom in" }
        },

        suggest: {
            text: { pt: "Prefere ler em português?", en: "Prefer to read in English?" },
            action: { pt: "Mudar", en: "Switch" },
            dismiss: { pt: "Dispensar", en: "Dismiss" }
        },

        egg: {
            on: { pt: "Modo cyber ativado. Bem-vindo ao sistema.", en: "Cyber mode on. Welcome to the system." }
        },

        noscript: {
            pt: "Este portfólio precisa de JavaScript para ser exibido. Contato: enzo.max.rlemes@gmail.com",
            en: "This portfolio needs JavaScript to be displayed. Contact: enzo.max.rlemes@gmail.com"
        }
    }
};
