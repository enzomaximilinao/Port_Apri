/* ==========================================================
   PORTFÓLIO · INTERAÇÕES

   Monta todas as seções a partir do conteudo.js e liga as
   funções: tema, idioma, paleta de comandos (Ctrl/⌘ + K),
   visualizador de diplomas e animações leves de entrada.
   ========================================================== */

(function () {
    "use strict";

    const C = window.CONTENT;
    const root = document.documentElement;

    if (!C) {
        root.classList.add("failsafe");
        return;
    }


    /* ==========================================================
       UTILITÁRIOS
       ========================================================== */

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const motionOK = () => !reducedMotion.matches;
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

    const store = {
        get(key) {
            try {
                return localStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (error) {
                // Navegação privada ou armazenamento bloqueado: segue sem salvar.
            }
        }
    };

    const safe = (fn) => {
        try {
            fn();
        } catch (error) {
            console.error(error);
        }
    };

    const state = {
        lang: root.lang === "en" ? "en" : "pt",
        theme: root.dataset.theme === "light" ? "light" : "dark",
        active: "inicio",
        skillFilter: "all",
        introDone: false,
        marqueePaused: false
    };


    /* ==========================================================
       TEXTOS NOS DOIS IDIOMAS
       ========================================================== */

    // Devolve o texto no idioma atual. Aceita string simples ou { pt, en }.
    function t(value) {
        if (value && typeof value === "object" && !Array.isArray(value) && ("pt" in value || "en" in value)) {
            return value[state.lang];
        }
        return value;
    }

    // Texto da interface pelo caminho, ex.: ui("hero.ctaPrimary").
    function ui(path) {
        const node = path.split(".").reduce((current, key) => (current ? current[key] : undefined), C.ui);
        const text = t(node);
        return text === undefined || text === null ? "" : text;
    }

    function esc(value) {
        return String(value).replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char]));
    }

    // "Sobre *mim*" vira "Sobre <em>mim</em>" (a palavra destacada ganha a cor em degradê).
    const rich = (text) => esc(text).replace(/\*([^*]+)\*/g, "<em>$1</em>");
    const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => (key in values ? values[key] : ""));
    const pad = (number) => String(number).padStart(2, "0");


    /* ==========================================================
       ÍCONES
       ========================================================== */

    const ICONS = {
        arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
        arrowUpRight: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
        arrowUp: '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
        mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/>',
        copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>',
        check: '<path d="M20 6 9 17l-5-5"/>',
        phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
        pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        close: '<path d="M18 6 6 18M6 6l12 12"/>',
        server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/>',
        workflow: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M6.5 10v3.5a3 3 0 0 0 3 3H14"/>',
        code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
        shield: '<path d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6z"/><path d="m9 12 2 2 4-4"/>',
        layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>',
        route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5"/>',
        chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
        table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
        globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19z"/>',
        graduation: '<path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 9v6"/>',
        database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
        target: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.5"/>',
        briefcase: '<rect x="2.5" y="7" width="19" height="13.5" rx="2.5"/><path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"/><path d="M2.5 12.5h19"/>',
        terminal: '<path d="m5 17 5-5-5-5"/><path d="M12 19h7"/>',
        sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
        moon: '<path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z"/>',
        hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
        printer: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
        pause: '<path d="M8 5v14M16 5v14"/>',
        play: '<path d="m7 4 13 8-13 8z"/>',
        zoom: '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.2-4.2M11 8v6M8 11h6"/>',
        external: '<path d="M14 4h6v6"/><path d="M10 14 20 4"/><path d="M19 13.5V19a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 19V6.5A1.5 1.5 0 0 1 5.5 5H11"/>'
    };

    const BRANDS = {
        linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
        github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
        whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
    };

    const icon = (name, extraClass = "") =>
        `<svg class="icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;

    const brand = (name) =>
        `<svg class="icon icon--fill" viewBox="0 0 24 24" aria-hidden="true"><path d="${BRANDS[name]}"/></svg>`;


    /* ==========================================================
       PEÇAS DE MARCAÇÃO REAPROVEITADAS
       ========================================================== */

    // Número da seção e título. O número é só marcador visual; o título já diz o assunto.
    function headMain(number, title, id, extraClass = "") {
        return `<div class="section-head__main">
            <p class="eyebrow" data-reveal aria-hidden="true">
                <span class="eyebrow__num">${number}</span>
                <span class="eyebrow__line"></span>
            </p>
            <h2 class="title ${extraClass}" id="${id}" data-reveal style="--delay:.06s">${rich(title)}</h2>
        </div>`;
    }

    const MONTHS = {
        pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
        en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };

    function parseMonth(value) {
        if (!value) {
            const now = new Date();
            return { y: now.getFullYear(), m: now.getMonth() + 1 };
        }
        const [y, m] = value.split("-").map(Number);
        return { y, m };
    }

    const monthLabel = (date) => `${MONTHS[state.lang][date.m - 1]} ${date.y}`;
    const monthsBetween = (from, to) => (to.y - from.y) * 12 + (to.m - from.m) + 1;

    function durationLabel(total) {
        const L = C.ui.experience;
        const years = Math.floor(total / 12);
        const months = total % 12;
        const parts = [];
        if (years) parts.push(`${years} ${t(years === 1 ? L.year : L.years)}`);
        if (months) parts.push(`${months} ${t(months === 1 ? L.month : L.months)}`);
        return parts.join(` ${t(L.and)} `);
    }

    function periodMarkup(startLabel, endLabel, startAttr, endAttr) {
        const time = (label, attr) => `<time${attr ? ` datetime="${attr}"` : ""}>${esc(label)}</time>`;
        return `<span class="period">
            ${time(startLabel, startAttr)}
            <span class="period__sep" aria-hidden="true"></span>
            <span class="sr-only">${esc(ui("experience.to"))}</span>
            ${time(endLabel, endAttr)}
        </span>`;
    }

    // "2022 - 2025" vira período com traço desenhado; "2026" fica como está.
    function simplePeriod(text) {
        const parts = String(text).split(/\s+-\s+/);
        return parts.length === 2 ? periodMarkup(parts[0], parts[1], parts[0], parts[1]) : `<span class="period">${esc(text)}</span>`;
    }

    const currentJob = () => C.experiences.find((job) => !job.end) || null;


    /* ==========================================================
       MONTAGEM DAS SEÇÕES
       ========================================================== */

    function renderNav() {
        $("#nav-list").innerHTML = C.ui.nav.map((item) =>
            `<li><a class="nav__link" href="#${item.id}" data-nav="${item.id}">${esc(t(item.label))}</a></li>`
        ).join("");
    }

    function renderMenu() {
        const c = C.contact;
        $("#menu-inner").innerHTML = `
            <div class="menu__top">
                <a class="logo" href="#inicio" data-nav="inicio" aria-label="${esc(C.person.name)}"><span class="logo__mark">${esc(C.person.initials)}</span></a>
                <button class="icon-btn" type="button" data-menu-close aria-label="${esc(ui("menuClose"))}" autofocus>${icon("close")}</button>
            </div>
            <ol class="menu__list">
                ${C.ui.nav.map((item, i) => `
                    <li>
                        <a class="menu__link" href="#${item.id}" data-nav="${item.id}" style="--i:${i}">
                            <span class="menu__num">${pad(i + 1)}</span>
                            <span class="menu__label">${esc(t(item.label))}</span>
                        </a>
                    </li>`).join("")}
            </ol>
            <div class="menu__foot">
                <a class="menu__email" href="mailto:${c.email}">${esc(c.email)}</a>
                <div class="menu__row">
                    <div class="menu__socials">
                        <a class="icon-btn" href="${c.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${brand("linkedin")}</a>
                        <a class="icon-btn" href="${c.github}" target="_blank" rel="noopener" aria-label="GitHub">${brand("github")}</a>
                        <a class="icon-btn" href="https://wa.me/${c.phoneIntl}" target="_blank" rel="noopener" aria-label="WhatsApp">${brand("whatsapp")}</a>
                    </div>
                    <p class="menu__clock">${esc(C.person.city)} · <span data-clock></span></p>
                </div>
            </div>`;
    }

    function renderHero() {
        const p = C.person;
        const job = currentJob();
        const nameParts = p.name.split(" ");
        const roles = t(p.roles);
        const english = C.skills.flatMap((group) => group.items).find((item) => item.level);
        const englishLevel = english ? (t(english.level).match(/[ABC][12]/) || [""])[0] : "";
        const S = C.ui.hero.stats;

        const stat = (label, value, counts) =>
            `<div class="stat"><dt class="stat__label">${esc(t(label))}</dt><dd class="stat__value"${counts ? ` data-count="${value}"` : ""}>${value}</dd></div>`;

        $("#inicio").setAttribute("aria-labelledby", "hero-title");
        $("#inicio").innerHTML = `
            <div class="hero__grid" aria-hidden="true"></div>

            <div class="container hero__inner">
                <div class="hero__content">
                    ${job ? `
                        <p class="status" data-hero>
                            <span class="pulse-dot" aria-hidden="true"></span>
                            <span>${esc(ui("hero.currently"))} <strong>${esc(job.company)}</strong></span>
                        </p>` : ""}

                    <h1 class="hero__name" id="hero-title" data-hero style="--delay:.05s">
                        <span class="line">${esc(nameParts.slice(0, 2).join(" "))}</span>
                        <span class="line"><em>${esc(nameParts.slice(2).join(" "))}</em></span>
                    </h1>

                    <p class="hero__role" data-hero style="--delay:.1s">
                        <span class="hero__role-prefix" aria-hidden="true">&gt;_</span>
                        <span class="sr-only">${esc(roles.join(", "))}</span>
                        <span class="rotator" aria-hidden="true">${esc(roles[0])}</span>
                        <span class="caret" aria-hidden="true"></span>
                    </p>

                    <p class="hero__lead" data-hero style="--delay:.15s">${esc(t(p.lead))}</p>

                    <div class="hero__ctas" data-hero style="--delay:.2s">
                        <a class="btn btn--primary" href="#experiencias"><span>${esc(ui("hero.ctaPrimary"))}</span>${icon("arrowRight")}</a>
                        <a class="btn btn--ghost" href="#contato"><span>${esc(ui("hero.ctaSecondary"))}</span></a>
                        <div class="hero__socials">
                            <a class="icon-btn" href="${C.contact.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${brand("linkedin")}</a>
                            <a class="icon-btn" href="${C.contact.github}" target="_blank" rel="noopener" aria-label="GitHub">${brand("github")}</a>
                        </div>
                    </div>

                    <dl class="stats" data-hero style="--delay:.25s">
                        ${stat(S.companies, C.experiences.length, true)}
                        ${stat(S.education, C.education.length, true)}
                        ${englishLevel ? stat(S.english, englishLevel, false) : ""}
                        ${stat(S.since, p.itSince, false)}
                    </dl>
                </div>

                <div class="hero__visual" data-hero style="--delay:.1s">
                    <div class="portrait">
                        <div class="portrait__frame">
                            <img class="portrait__img" src="${encodeURI(p.photo)}" alt="${esc(t(p.photoAlt))}" width="800" height="800" fetchpriority="high">
                        </div>
                    </div>
                    <p class="portrait__caption">
                        <span>${esc(p.city)}, ${esc(p.state)}</span>
                        <span><span data-clock></span> <span data-offset></span></span>
                    </p>
                </div>
            </div>

            <a class="scroll-cue" href="#sobre" data-hero style="--delay:.4s">
                <span>${esc(ui("hero.scroll"))}</span>
                <span class="scroll-cue__line" aria-hidden="true"></span>
            </a>`;
    }

    function renderMarquee() {
        const star = '<svg class="marquee__sep" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0z"/></svg>';
        const items = C.stack.map((item) => `<li class="marquee__item">${esc(t(item))}${star}</li>`).join("");
        const paused = state.marqueePaused;
        const box = $("#marquee");
        box.classList.toggle("is-paused", paused);
        box.innerHTML = `
            <div class="marquee__viewport">
                <div class="marquee__track">
                    <ul class="marquee__list" aria-label="${esc(ui("stack"))}">${items}</ul>
                    <ul class="marquee__list" aria-hidden="true" inert>${items}</ul>
                </div>
            </div>
            <button class="icon-btn marquee__toggle" type="button" aria-pressed="${paused}" aria-label="${esc(ui(paused ? "marqueePlay" : "marqueePause"))}">${icon(paused ? "play" : "pause")}</button>`;
    }

    function renderAbout() {
        const A = C.about;
        const L = C.ui.about;

        // A primeira frase vira destaque; o restante fica em tamanho de leitura ao lado.
        const text = t(A.text);
        const cut = text.indexOf(". ");
        const lead = cut > 0 ? text.slice(0, cut + 1) : text;
        const rest = cut > 0 ? text.slice(cut + 2) : "";

        $("#sobre").setAttribute("aria-labelledby", "about-title");
        $("#sobre").innerHTML = `
            <div class="container">
                <header class="section-head">${headMain("01", t(L.title), "about-title")}</header>

                <div class="about__intro">
                    <p class="about__lead" data-reveal>${esc(lead)}</p>
                    ${rest ? `<p class="about__text" data-reveal style="--delay:.08s">${esc(rest)}</p>` : ""}
                </div>

                <div class="bento">
                    <article class="card b-purpose" data-reveal>
                        <h3 class="card__label">${icon("target")}${esc(t(L.purpose))}</h3>
                        <p class="purpose__text">${esc(t(A.purpose))}</p>
                    </article>

                    <article class="card b-terminal terminal" data-reveal style="--delay:.08s" aria-hidden="true">
                        <div class="terminal__bar">
                            <span class="terminal__dot"></span><span class="terminal__dot"></span><span class="terminal__dot"></span>
                            <span class="terminal__title">enzo@portfolio: ~</span>
                        </div>
                        <div class="terminal__body" data-terminal></div>
                    </article>

                    <article class="card b-journey" data-reveal>
                        <h3 class="card__label">${icon("route")}${esc(t(L.journey))}</h3>
                        <p class="card__text">${esc(t(A.journey))}</p>
                    </article>

                    <article class="card b-objective" data-reveal>
                        <h3 class="card__label">${icon("briefcase")}${esc(t(L.objective))}</h3>
                        <p class="card__text">${esc(t(A.objective))}</p>
                    </article>
                </div>

                <h3 class="subhead" data-reveal>${esc(t(L.highlights))}</h3>
                <div class="highlights">
                    ${A.highlights.map((item, i) => `
                        <article class="card hl-card" data-reveal style="--delay:${i * 0.06}s">
                            <span class="icon-box">${icon(item.icon)}</span>
                            <h4 class="hl-card__title">${esc(t(item.title))}</h4>
                            <p class="card__text">${esc(t(item.text))}</p>
                        </article>`).join("")}
                </div>
            </div>`;
    }

    function renderExperience() {
        const L = C.ui.experience;
        const jobs = C.experiences;

        $("#experiencias").setAttribute("aria-labelledby", "exp-title");
        $("#experiencias").innerHTML = `
            <div class="container exp">
                <aside class="exp__aside">
                    ${headMain("02", t(L.title), "exp-title")}
                    <p class="exp__summary" data-reveal>${esc(t(L.summary))}</p>
                </aside>

                <div class="timeline">
                    <span class="timeline__line" aria-hidden="true"><span class="timeline__fill"></span></span>
                    <ol class="timeline__list">
                        ${jobs.map((job) => {
                            const start = parseMonth(job.start);
                            const end = parseMonth(job.end);
                            const current = !job.end;
                            return `
                                <li class="tl-item">
                                    <span class="tl-item__dot" aria-hidden="true"></span>
                                    <article class="card tl-card" data-reveal>
                                        <div class="tl-card__top">
                                            ${periodMarkup(monthLabel(start), current ? t(L.present) : monthLabel(end), job.start, job.end)}
                                            <span class="duration">${esc(durationLabel(monthsBetween(start, end)))}</span>
                                        </div>
                                        <h3 class="tl-card__company">
                                            ${esc(job.company)}
                                            ${current ? `<span class="badge-live"><span class="pulse-dot" aria-hidden="true"></span>${esc(t(L.current))}</span>` : ""}
                                        </h3>
                                        <p class="tl-card__role">${esc(t(job.role))}</p>
                                        <ul class="tl-card__list">${t(job.items).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
                                        <div class="tl-card__tags">${t(job.tags).map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</div>
                                    </article>
                                </li>`;
                        }).join("")}
                    </ol>
                </div>
            </div>`;
    }

    function renderSkills() {
        const L = C.ui.skills;
        const all = C.skills.flatMap((group) => group.items.map((item) => ({ item, group })));
        const filters = [{ id: "all", label: L.all, count: all.length }]
            .concat(C.skills.map((group) => ({ id: group.id, label: group.label, count: group.items.length })));
        const hidden = (group) => state.skillFilter !== "all" && state.skillFilter !== group.id;

        $("#habilidades").setAttribute("aria-labelledby", "skills-title");
        $("#habilidades").innerHTML = `
            <div class="container">
                <header class="section-head section-head--split">
                    ${headMain("03", t(L.title), "skills-title")}
                    <div class="filters" role="group" aria-label="${esc(t(L.filter))}" data-reveal>
                        ${filters.map((f) => `
                            <button class="filter" type="button" data-filter="${f.id}" aria-pressed="${state.skillFilter === f.id}">
                                ${esc(t(f.label))}<span class="filter__count">${f.count}</span>
                            </button>`).join("")}
                    </div>
                </header>

                <div class="skills-grid">
                    ${all.map(({ item, group }, i) => `
                        <article class="card skill-card" data-group="${group.id}" data-reveal style="--delay:${(i % 4) * 0.05}s"${hidden(group) ? " hidden" : ""}>
                            <div class="skill-card__top">
                                <span class="icon-box">${icon(item.icon)}</span>
                                <span class="skill-card__group">${esc(t(group.label))}</span>
                            </div>
                            <h3 class="skill-card__title">${esc(t(item.title))}</h3>
                            ${item.level ? `<span class="tag skill-card__level">${esc(t(item.level))}</span>` : ""}
                            <p class="skill-card__text">${esc(t(item.text))}</p>
                            <span class="skill-card__index" aria-hidden="true">${pad(i + 1)}</span>
                        </article>`).join("")}
                </div>
            </div>`;
    }

    function renderEducation() {
        const L = C.ui.education;

        $("#formacao").setAttribute("aria-labelledby", "edu-title");
        $("#formacao").innerHTML = `
            <div class="container">
                <header class="section-head">
                    ${headMain("04", t(L.title), "edu-title")}
                    <p class="subtitle" data-reveal>${esc(t(L.subtitle))}</p>
                </header>

                <div class="edu-grid">
                    ${C.education.map((item, i) => `
                        <div class="edu-item" data-reveal style="--delay:${i * 0.06}s">
                            <article class="card edu-card">
                                ${item.image ? `
                                    <button class="edu-card__media" type="button" data-lightbox="${i}" aria-label="${esc(t(item.action))}: ${esc(t(item.title))}">
                                        <img src="${encodeURI(item.image)}" alt="${esc(t(item.imageAlt))}" loading="lazy" decoding="async">
                                        <span class="edu-card__zoom" aria-hidden="true">${icon("zoom")}${esc(t(item.action))}</span>
                                    </button>` : `
                                    <div class="edu-card__art" aria-hidden="true">
                                        <span class="edu-card__art-icon">${icon(item.icon)}</span>
                                    </div>`}
                                <div class="edu-card__body">
                                    <p class="edu-card__meta"><span>${esc(t(item.kind))}</span>${simplePeriod(item.period)}</p>
                                    <h3 class="edu-card__title">${esc(t(item.title))}</h3>
                                    <p class="edu-card__school">${esc(item.school)} · ${esc(item.place)}</p>
                                    <p class="edu-card__text">${esc(t(item.text))}</p>
                                </div>
                            </article>
                        </div>`).join("")}
                </div>
            </div>`;
    }

    function renderContact() {
        const c = C.contact;
        const L = C.ui.contact;
        const arrow = icon("arrowUpRight", "contact-card__arrow");

        $("#contato").setAttribute("aria-labelledby", "contact-title");
        $("#contato").innerHTML = `
            <div class="container">
                <div class="contact__head">
                    ${headMain("05", t(L.title), "contact-title", "contact__title")}
                    <p class="contact__text" data-reveal>${esc(t(c.text))}</p>
                </div>

                <div class="contact__grid">
                    <div class="card contact-card contact-card--email" data-reveal>
                        <div class="contact-card__top"><h3 class="card__label">${icon("mail")}${esc(t(L.email))}</h3></div>
                        <p class="contact-card__value">${esc(c.email)}</p>
                        <div class="contact-card__actions">
                            <button class="chip-btn" type="button" data-copy-email>${icon("copy")}<span>${esc(t(L.copy))}</span></button>
                            <a class="chip-btn chip-btn--accent" href="mailto:${c.email}">${icon("arrowUpRight")}<span>${esc(t(L.send))}</span></a>
                        </div>
                    </div>

                    <a class="card contact-card contact-card--linkedin" href="${c.linkedin}" target="_blank" rel="noopener" data-reveal style="--delay:.05s">
                        <div class="contact-card__top"><h3 class="card__label">${brand("linkedin")}LinkedIn</h3>${arrow}</div>
                        <div>
                            <p class="contact-card__value">${esc(c.linkedinLabel)}</p>
                            <p class="contact-card__sub">${esc(t(L.open))}</p>
                        </div>
                    </a>

                    <a class="card contact-card contact-card--github" href="${c.github}" target="_blank" rel="noopener" data-reveal>
                        <div class="contact-card__top"><h3 class="card__label">${brand("github")}GitHub</h3>${arrow}</div>
                        <div>
                            <p class="contact-card__value">${esc(c.githubLabel)}</p>
                            <p class="contact-card__sub">${esc(t(L.open))}</p>
                        </div>
                    </a>

                    <div class="card contact-card contact-card--phone" data-reveal style="--delay:.05s">
                        <div class="contact-card__top"><h3 class="card__label">${icon("phone")}${esc(t(L.phone))}</h3></div>
                        <p class="contact-card__value">${esc(c.phone)}</p>
                        <div class="contact-card__actions">
                            <a class="chip-btn" href="tel:+${c.phoneIntl}">${icon("phone")}<span>${esc(t(L.call))}</span></a>
                            <a class="chip-btn" href="https://wa.me/${c.phoneIntl}" target="_blank" rel="noopener">${brand("whatsapp")}<span>WhatsApp</span></a>
                        </div>
                    </div>

                    <div class="card contact-card contact-card--location" data-reveal style="--delay:.1s">
                        <div class="contact-card__top"><h3 class="card__label">${icon("pin")}${esc(t(L.location))}</h3></div>
                        <div>
                            <p class="contact-card__value">${esc(t(C.person.location))}</p>
                            <p class="contact-card__sub"><span data-clock></span> <span data-offset></span></p>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    function renderFooter() {
        const c = C.contact;
        const keys = `<kbd>${isMac ? "⌘" : "Ctrl"}</kbd><kbd>K</kbd>`;

        $("#footer").innerHTML = `
            <div class="container footer__top">
                <nav class="footer__nav" aria-label="${esc(ui("menuTitle"))}">
                    ${C.ui.nav.map((item) => `<a href="#${item.id}">${esc(t(item.label))}</a>`).join("")}
                </nav>
                <div class="footer__socials">
                    <a class="icon-btn" href="mailto:${c.email}" aria-label="${esc(ui("contact.email"))}">${icon("mail")}</a>
                    <a class="icon-btn" href="${c.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${brand("linkedin")}</a>
                    <a class="icon-btn" href="${c.github}" target="_blank" rel="noopener" aria-label="GitHub">${brand("github")}</a>
                </div>
            </div>

            <div class="container">
                <svg class="footer__wordmark" viewBox="0 0 1000 140" aria-hidden="true">
                    <defs>
                        <linearGradient id="wordmark-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stop-color="currentColor" stop-opacity=".95" />
                            <stop offset="1" stop-color="currentColor" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                    <text x="0" y="110" font-size="120" fill="url(#wordmark-fill)">${esc(C.person.shortName)}</text>
                </svg>
            </div>

            <div class="container footer__bottom">
                <p>© ${new Date().getFullYear()} ${esc(C.person.name)}. ${esc(ui("footer.rights"))}</p>
                <p>${fill(esc(ui("footer.hint")), { key: keys })}</p>
            </div>`;
    }

    // Textos fixos do HTML (botões do cabeçalho, rótulos de acessibilidade, título da aba).
    function applyStaticTexts() {
        $$("[data-i18n]").forEach((el) => { el.textContent = ui(el.dataset.i18n); });
        $$("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", ui(el.dataset.i18nAria)); });

        document.title = ui("meta.title");
        const description = $('meta[name="description"]');
        if (description) description.setAttribute("content", ui("meta.description"));

        $("#palette-input").placeholder = ui("paletteUi.placeholder");
        $("#palette-keys").textContent = isMac ? "⌘ K" : "Ctrl K";
        $("#palette-foot").innerHTML = `
            <span><kbd>↑</kbd><kbd>↓</kbd>${esc(ui("paletteUi.hints"))}</span>
            <span><kbd>↵</kbd>${esc(ui("paletteUi.select"))}</span>
            <span><kbd>esc</kbd>${esc(ui("paletteUi.close"))}</span>`;

        $$(".lang-switch__btn").forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.lang === state.lang)));
        updateThemeButton();
        updateMenuButton();
    }

    function renderAll() {
        applyStaticTexts();
        renderNav();
        renderMenu();
        renderHero();
        renderMarquee();
        renderAbout();
        renderExperience();
        renderSkills();
        renderEducation();
        renderContact();
        renderFooter();
        updateClocks();
        fitWordmark();
    }


    /* ==========================================================
       ANIMAÇÕES DE ENTRADA
       ========================================================== */

    let revealObserver = null;

    function observeReveals(instant) {
        const targets = $$("[data-reveal], [data-terminal]");
        const animate = root.classList.contains("anim") && "IntersectionObserver" in window;

        if (revealObserver) revealObserver.disconnect();

        if (instant || !animate) {
            targets.forEach((el) => {
                el.classList.add("is-in");
                if (el.hasAttribute("data-terminal")) runTerminal(el, true);
            });
            return;
        }

        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                revealObserver.unobserve(entry.target);
                entry.target.classList.add("is-in");
                if (entry.target.hasAttribute("data-terminal")) runTerminal(entry.target, false);
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

        targets.forEach((el) => revealObserver.observe(el));
    }

    function playIntro() {
        const hero = $("#inicio");
        if (!root.classList.contains("anim")) {
            hero.classList.add("is-in");
            state.introDone = true;
            return;
        }
        // Dois quadros de espera garantem que o estado inicial seja pintado antes da transição.
        requestAnimationFrame(() => requestAnimationFrame(() => {
            hero.classList.add("is-in");
            setTimeout(runCounters, 250);
            setTimeout(() => {
                state.introDone = true;
                startRotator();
            }, 900);
        }));
    }


    /* ---------- CARGOS QUE SE ALTERNAM ---------- */

    const GLYPHS = "!<>_\\/[]{}=+*^?#01";
    let rotatorTimer = 0;

    function scramble(el, finalText, duration = 600) {
        cancelAnimationFrame(el._scramble || 0);
        const start = performance.now();
        const length = Math.max(el.textContent.length, finalText.length);
        const frame = (now) => {
            const progress = clamp((now - start) / duration, 0, 1);
            let output = "";
            for (let i = 0; i < length; i++) {
                const char = finalText[i] || "";
                const settled = progress >= (i / length) * 0.7 + 0.3;
                output += settled || char === " " ? char : GLYPHS[(Math.random() * GLYPHS.length) | 0];
            }
            el.textContent = output;
            if (progress < 1) el._scramble = requestAnimationFrame(frame);
            else el.textContent = finalText;
        };
        el._scramble = requestAnimationFrame(frame);
    }

    function startRotator() {
        clearInterval(rotatorTimer);
        const roles = t(C.person.roles);
        if (!motionOK() || roles.length < 2) return;
        let index = 0;
        rotatorTimer = setInterval(() => {
            const el = $(".rotator");
            if (!el || document.hidden || scrollY > innerHeight) return;
            index = (index + 1) % roles.length;
            scramble(el, roles[index]);
        }, 3000);
    }


    /* ---------- CONTADORES ---------- */

    function runCounters() {
        if (!motionOK()) return;
        $$("[data-count]").forEach((el) => {
            const target = Number(el.dataset.count);
            const start = performance.now();
            const duration = 900;
            const frame = (now) => {
                const progress = clamp((now - start) / duration, 0, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
                if (progress < 1) requestAnimationFrame(frame);
            };
            el.textContent = "0";
            requestAnimationFrame(frame);
        });
    }


    /* ---------- TERMINAL ---------- */

    let terminalRun = 0;

    function terminalLines() {
        const job = currentJob() || C.experiences[0];
        const en = state.lang === "en";
        return [
            { cmd: "whoami", out: C.person.name.toLowerCase() },
            { cmd: en ? "cat role.txt" : "cat cargo.txt", out: `${t(job.role)} @ ${job.company}` },
            { cmd: en ? "ls education/" : "ls formacao/", out: C.education.map((item) => `${t(item.slug)}/`).join("  "), accent: true },
            { cmd: en ? "echo $LOCATION" : "echo $LOCAL", out: t(C.person.location) }
        ];
    }

    async function runTerminal(body, instant) {
        const run = ++terminalRun;
        const prompt = '<span class="terminal__prompt">enzo@portfolio</span><span class="terminal__path">:~$</span> ';
        const outClass = (line) => `terminal__out${line.accent ? " terminal__out--accent" : ""}`;
        const lines = terminalLines();

        if (instant || !motionOK()) {
            body.innerHTML = lines.map((line) =>
                `<div class="terminal__line">${prompt}<span class="terminal__cmd">${esc(line.cmd)}</span></div>` +
                `<div class="${outClass(line)}">${esc(line.out)}</div>`
            ).join("") + `<div class="terminal__line">${prompt}<span class="terminal__caret"></span></div>`;
            return;
        }

        body.innerHTML = "";
        for (const line of lines) {
            const row = document.createElement("div");
            row.className = "terminal__line";
            row.innerHTML = `${prompt}<span class="terminal__cmd"></span><span class="terminal__caret"></span>`;
            body.appendChild(row);
            const cmd = $(".terminal__cmd", row);

            await sleep(220);
            for (const char of line.cmd) {
                if (run !== terminalRun) return;
                cmd.textContent += char;
                await sleep(28 + Math.random() * 35);
            }
            await sleep(140);
            if (run !== terminalRun) return;

            $(".terminal__caret", row).remove();
            const out = document.createElement("div");
            out.className = outClass(line);
            out.textContent = line.out;
            body.appendChild(out);
        }

        const last = document.createElement("div");
        last.className = "terminal__line";
        last.innerHTML = `${prompt}<span class="terminal__caret"></span>`;
        body.appendChild(last);
    }


    /* ==========================================================
       ROLAGEM: PROGRESSO, CABEÇALHO E LINHA DO TEMPO
       ========================================================== */

    const S = {};
    let scrollTicking = false;
    let lastScrollY = scrollY;

    function cacheScrollTargets() {
        S.header = $("#header");
        S.progress = $("#progress");
        S.toTop = $("#to-top");
        S.timeline = $(".timeline");
        S.tlItems = $$(".tl-item");
    }

    function onScroll() {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(updateScroll);
    }

    function updateScroll() {
        scrollTicking = false;
        const y = scrollY;
        const vh = innerHeight;
        const progress = clamp(y / Math.max(1, root.scrollHeight - vh), 0, 1);

        // Leituras primeiro, escritas depois (evita recalcular o layout várias vezes).
        const tlRect = S.timeline ? S.timeline.getBoundingClientRect() : null;
        const itemTops = S.tlItems.map((item) => item.getBoundingClientRect().top);

        S.progress.style.setProperty("--p", progress.toFixed(4));
        S.toTop.style.setProperty("--p", progress.toFixed(4));
        S.toTop.classList.toggle("is-visible", y > vh * 0.8);
        S.header.classList.toggle("is-top", y < 24);

        const delta = y - lastScrollY;
        if (Math.abs(delta) > 6) {
            S.header.classList.toggle("is-hidden", delta > 0 && y > 320 && !S.header.contains(document.activeElement));
            lastScrollY = y;
        }

        if (tlRect) {
            const line = vh * 0.6;
            S.timeline.style.setProperty("--tl", clamp((line - tlRect.top) / tlRect.height, 0, 1).toFixed(4));
            S.tlItems.forEach((item, i) => item.classList.toggle("is-active", itemTops[i] + 40 < line));
        }
    }


    /* ---------- SEÇÃO ATIVA NO MENU ---------- */

    function setupSectionSpy() {
        if (!("IntersectionObserver" in window)) return;
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        C.ui.nav.forEach((item) => {
            const section = document.getElementById(item.id);
            if (section) spy.observe(section);
        });
    }

    function setActive(id) {
        state.active = id;
        $$("[data-nav]").forEach((link) => {
            if (link.dataset.nav === id) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
        });
        placeNavIndicator();
    }

    function placeNavIndicator() {
        const indicator = $(".nav__indicator");
        const link = $(`.nav__link[data-nav="${state.active}"]`);
        if (!indicator) return;
        if (!link || !link.offsetWidth) {
            indicator.classList.remove("is-on");
            return;
        }
        indicator.style.setProperty("--x", `${link.offsetLeft}px`);
        indicator.style.setProperty("--w", `${link.offsetWidth}px`);
        indicator.classList.add("is-on");
    }

    function goTo(id) {
        const target = document.getElementById(id);
        if (!target) return;
        target.scrollIntoView({ behavior: motionOK() ? "smooth" : "auto", block: "start" });
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        try {
            history.replaceState(null, "", `#${id}`);
        } catch (error) {
            // Alguns navegadores bloqueiam em file://
        }
    }


    /* ==========================================================
       TEMA CLARO E ESCURO
       ========================================================== */

    function updateThemeButton() {
        $("#theme-toggle").setAttribute("aria-label", ui(state.theme === "dark" ? "themeToLight" : "themeToDark"));
        const meta = $('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", state.theme === "dark" ? "#07070c" : "#f6f6fa");
    }

    function setTheme(theme, origin) {
        const apply = () => {
            state.theme = theme;
            root.dataset.theme = theme;
            store.set("theme", theme);
            updateThemeButton();
        };

        if (!document.startViewTransition || !motionOK()) {
            apply();
            return;
        }

        // Revela o novo tema num círculo que nasce do botão.
        root.classList.add("vt-theme");
        const transition = document.startViewTransition(apply);
        transition.ready.then(() => {
            const x = origin ? origin.x : innerWidth - 60;
            const y = origin ? origin.y : 40;
            const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 500, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
            );
        }).catch(() => {});
        transition.finished.finally(() => root.classList.remove("vt-theme"));
    }

    function toggleTheme(origin) {
        setTheme(state.theme === "dark" ? "light" : "dark", origin);
    }


    /* ==========================================================
       IDIOMA
       ========================================================== */

    function withTransition(update, className) {
        if (!document.startViewTransition || !motionOK()) {
            update();
            return;
        }
        root.classList.add(className);
        const transition = document.startViewTransition(update);
        transition.finished.finally(() => root.classList.remove(className));
    }

    function setLang(lang) {
        if (lang === state.lang) return;
        hideSuggest();
        withTransition(() => {
            state.lang = lang;
            root.lang = lang === "en" ? "en" : "pt-BR";
            store.set("lang", lang);
            try {
                const url = new URL(location.href);
                url.searchParams.set("lang", lang);
                history.replaceState(null, "", url);
            } catch (error) {
                // Alguns navegadores bloqueiam em file://
            }
            renderAll();
            afterRender(true);
        }, "vt-lang");
    }

    // Sugere o outro idioma quando o navegador do visitante fala outra língua.
    function maybeSuggestLanguage() {
        if (store.get("lang") || store.get("lang-suggest-off") || new URLSearchParams(location.search).has("lang")) return;
        const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]).map((l) => l.toLowerCase());
        const target = langs.some((l) => l.startsWith("pt")) ? "pt" : "en";
        if (target === state.lang) return;

        const texts = C.ui.suggest;
        const box = $("#suggest");
        box.setAttribute("lang", target === "en" ? "en" : "pt-BR");
        box.innerHTML = `
            <span>${esc(texts.text[target])}</span>
            <button class="chip-btn chip-btn--accent" type="button" data-suggest-go>${esc(texts.action[target])}</button>
            <button class="icon-btn" type="button" data-suggest-off aria-label="${esc(texts.dismiss[target])}">${icon("close")}</button>`;
        box.addEventListener("click", (event) => {
            if (event.target.closest("[data-suggest-go]")) setLang(target);
            else if (event.target.closest("[data-suggest-off]")) {
                store.set("lang-suggest-off", "1");
                hideSuggest();
            }
        });
        setTimeout(() => { box.hidden = false; }, 1500);
    }

    function hideSuggest() {
        const box = $("#suggest");
        if (box) box.hidden = true;
    }


    /* ==========================================================
       JANELAS (menu, paleta e visualizador)
       ========================================================== */

    const menu = $("#menu");
    const palette = $("#palette");
    const lightbox = $("#lightbox");

    function openDialog(dialog) {
        if (dialog.open) return;
        dialog._closing = null;
        dialog.classList.remove("is-closing");
        dialog.showModal();
        root.classList.add("has-dialog");
    }

    // Fecha com animação. "then" roda só depois que a janela fechou de fato
    // (rolar a página antes disso é cancelado pelo próprio fechamento).
    function closeDialog(dialog, then) {
        if (!dialog.open) {
            if (then) then();
            return;
        }
        if (then) dialog.addEventListener("close", () => setTimeout(then, 0), { once: true });
        if (dialog.classList.contains("is-closing")) return;
        if (!motionOK()) {
            dialog.close();
            return;
        }
        const token = {};
        dialog._closing = token;
        dialog.classList.add("is-closing");
        const finish = () => {
            if (dialog._closing !== token) return;
            dialog._closing = null;
            dialog.classList.remove("is-closing");
            if (dialog.open) dialog.close();
        };
        const onEnd = (event) => {
            if (event.target !== dialog) return;
            dialog.removeEventListener("animationend", onEnd);
            finish();
        };
        dialog.addEventListener("animationend", onEnd);
        setTimeout(finish, 450);
    }

    function setupDialogs() {
        [menu, palette, lightbox].forEach((dialog) => {
            dialog.addEventListener("cancel", (event) => {
                event.preventDefault();
                closeDialog(dialog);
            });
            dialog.addEventListener("click", (event) => {
                if (event.target === dialog) closeDialog(dialog);
            });
            dialog.addEventListener("close", () => {
                if (!$$("dialog[open]").length) root.classList.remove("has-dialog");
                if (dialog === menu) updateMenuButton();
            });
        });
    }


    /* ---------- MENU DO CELULAR ---------- */

    function updateMenuButton() {
        const btn = $("#menu-btn");
        const open = menu.open && !menu.classList.contains("is-closing");
        btn.setAttribute("aria-expanded", String(open));
        btn.setAttribute("aria-label", ui(open ? "menuClose" : "menuOpen"));
    }

    function openMenu() {
        const rect = $("#menu-btn").getBoundingClientRect();
        menu.style.setProperty("--ox", `${rect.left + rect.width / 2}px`);
        menu.style.setProperty("--oy", `${rect.top + rect.height / 2}px`);
        openDialog(menu);
        updateMenuButton();
    }

    function setupMenu() {
        $("#menu-btn").addEventListener("click", openMenu);
        menu.addEventListener("click", (event) => {
            const link = event.target.closest("[data-nav]");
            if (link) {
                event.preventDefault();
                const id = link.dataset.nav;
                closeDialog(menu, () => goTo(id));
                return;
            }
            if (event.target.closest("[data-menu-close]")) closeDialog(menu);
        });
        // Se a tela crescer com o menu aberto, ele fecha sozinho.
        matchMedia("(min-width: 900px)").addEventListener("change", (event) => {
            if (event.matches && menu.open) menu.close();
        });
    }


    /* ---------- PALETA DE COMANDOS (Ctrl/⌘ + K) ---------- */

    const paletteInput = $("#palette-input");
    const paletteList = $("#palette-list");
    let paletteItems = [];
    let paletteShown = [];
    let paletteActive = 0;

    const normalize = (text) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

    function buildPaletteItems() {
        const P = C.ui.paletteUi;
        const c = C.contact;
        const openLink = (url) => () => window.open(url, "_blank", "noopener");

        const items = C.ui.nav.map((item) => ({
            group: "nav",
            icon: "hash",
            label: `${t(P.goTo)} ${t(item.label)}`,
            run: () => goTo(item.id)
        }));

        items.push(
            { group: "actions", icon: state.theme === "dark" ? "sun" : "moon", label: t(P.theme), run: () => toggleTheme() },
            { group: "actions", icon: "globe", label: t(P.lang), run: () => setLang(state.lang === "pt" ? "en" : "pt") },
            { group: "actions", icon: "copy", label: t(P.copyEmail), hint: c.email, run: copyEmail },
            { group: "actions", icon: "mail", label: t(P.sendEmail), run: () => { location.href = `mailto:${c.email}`; } }
        );

        C.education.forEach((item, i) => {
            if (item.image) items.push({ group: "actions", icon: "graduation", label: `${t(item.action)}: ${t(item.title)}`, run: () => openLightbox(i) });
        });

        items.push(
            { group: "actions", icon: "printer", label: t(P.print), run: () => window.print() },
            { group: "actions", icon: "arrowUp", label: t(P.top), run: () => goTo("inicio") },
            { group: "links", brand: "linkedin", label: t(P.linkedin), hint: "linkedin.com", run: openLink(c.linkedin) },
            { group: "links", brand: "github", label: t(P.github), hint: "github.com", run: openLink(c.github) },
            { group: "links", brand: "whatsapp", label: t(P.whatsapp), hint: c.phone, run: openLink(`https://wa.me/${c.phoneIntl}`) }
        );

        return items;
    }

    function renderPalette() {
        const query = normalize(paletteInput.value.trim());
        const tokens = query.split(/\s+/).filter(Boolean);
        paletteShown = paletteItems.filter((item) => {
            const haystack = normalize(`${item.label} ${item.hint || ""}`);
            return tokens.every((token) => haystack.includes(token));
        });
        paletteActive = clamp(paletteActive, 0, Math.max(0, paletteShown.length - 1));
        $("#palette-status").textContent = String(paletteShown.length);

        if (!paletteShown.length) {
            paletteList.innerHTML = `<li class="palette__empty" role="presentation">${esc(ui("paletteUi.empty"))} "${esc(paletteInput.value)}"</li>`;
            paletteInput.removeAttribute("aria-activedescendant");
            return;
        }

        const groups = C.ui.paletteUi.groups;
        let html = "";
        let lastGroup = null;
        paletteShown.forEach((item, i) => {
            if (item.group !== lastGroup) {
                html += `<li class="palette__group" role="presentation">${esc(t(groups[item.group]))}</li>`;
                lastGroup = item.group;
            }
            html += `
                <li class="palette__item" id="palette-option-${i}" role="option" aria-selected="${i === paletteActive}" data-index="${i}">
                    <span class="palette__item-icon" aria-hidden="true">${item.brand ? brand(item.brand) : icon(item.icon)}</span>
                    <span class="palette__item-label">${esc(item.label)}</span>
                    ${item.hint ? `<span class="palette__item-hint" aria-hidden="true">${esc(item.hint)}</span>` : ""}
                </li>`;
        });
        paletteList.innerHTML = html;
        paletteInput.setAttribute("aria-activedescendant", `palette-option-${paletteActive}`);
    }

    function setPaletteActive(index, scrollIntoView = true) {
        if (!paletteShown.length) return;
        paletteActive = (index + paletteShown.length) % paletteShown.length;
        $$(".palette__item", paletteList).forEach((el) => {
            el.setAttribute("aria-selected", String(Number(el.dataset.index) === paletteActive));
        });
        paletteInput.setAttribute("aria-activedescendant", `palette-option-${paletteActive}`);
        const active = $(`#palette-option-${paletteActive}`);
        if (active && scrollIntoView) active.scrollIntoView({ block: "nearest" });
    }

    function runPaletteItem(index) {
        const item = paletteShown[index];
        if (!item) return;
        closeDialog(palette, item.run);
    }

    function openPalette() {
        [menu, lightbox].forEach((dialog) => dialog.open && dialog.close());
        paletteItems = buildPaletteItems();
        paletteInput.value = "";
        paletteActive = 0;
        renderPalette();
        openDialog(palette);
        paletteInput.focus();
    }

    function setupPalette() {
        $("#palette-btn").addEventListener("click", openPalette);

        paletteInput.addEventListener("input", () => {
            paletteActive = 0;
            renderPalette();
        });

        paletteInput.addEventListener("keydown", (event) => {
            const moves = { ArrowDown: paletteActive + 1, ArrowUp: paletteActive - 1, Home: 0, End: paletteShown.length - 1 };
            if (event.key in moves) {
                event.preventDefault();
                setPaletteActive(moves[event.key]);
            } else if (event.key === "Enter") {
                event.preventDefault();
                runPaletteItem(paletteActive);
            }
        });

        paletteList.addEventListener("mousemove", (event) => {
            const option = event.target.closest(".palette__item");
            if (option && Number(option.dataset.index) !== paletteActive) setPaletteActive(Number(option.dataset.index), false);
        });

        paletteList.addEventListener("click", (event) => {
            const option = event.target.closest(".palette__item");
            if (option) runPaletteItem(Number(option.dataset.index));
        });
    }


    /* ---------- VISUALIZADOR DE DIPLOMAS ---------- */

    const lbStage = $("#lightbox-stage");
    const lbImg = $("#lightbox-img");

    function openLightbox(index) {
        const item = C.education[index];
        if (!item || !item.image) return;
        lbImg.src = encodeURI(item.image);
        lbImg.alt = t(item.imageAlt);
        lbStage.classList.remove("is-zoomed");
        $("#lightbox-caption").innerHTML = `
            <span>${esc(t(item.title))} · ${esc(item.school)}</span>
            <small>${esc(ui("lightbox.zoomIn"))}</small>
            <a href="${encodeURI(item.imageFull || item.image)}" target="_blank" rel="noopener">${icon("external")}${esc(ui("lightbox.open"))}</a>`;
        lightbox.setAttribute("aria-label", t(item.imageAlt));
        openDialog(lightbox);
    }

    function setupLightbox() {
        const setOrigin = (event, rect) => {
            lbImg.style.setProperty("--zx", `${clamp((event.clientX - rect.left) / rect.width, 0, 1) * 100}%`);
            lbImg.style.setProperty("--zy", `${clamp((event.clientY - rect.top) / rect.height, 0, 1) * 100}%`);
        };

        lbStage.addEventListener("click", (event) => {
            if (!lbStage.classList.contains("is-zoomed")) setOrigin(event, lbImg.getBoundingClientRect());
            lbStage.classList.toggle("is-zoomed");
        });

        lbStage.addEventListener("mousemove", (event) => {
            if (lbStage.classList.contains("is-zoomed")) setOrigin(event, lbStage.getBoundingClientRect());
        });

        $("#lightbox-close").addEventListener("click", () => closeDialog(lightbox));
    }


    /* ==========================================================
       AÇÕES: COPIAR E-MAIL, AVISOS, FILTRO, FAIXA ANIMADA
       ========================================================== */

    let toastTimer = 0;

    function toast(message, iconName = "check") {
        const el = $("#toast");
        el.innerHTML = `${icon(iconName)}<span>${esc(message)}</span>`;
        el.classList.add("is-visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2600);
    }

    async function copyEmail() {
        const email = C.contact.email;
        let ok = false;
        try {
            await navigator.clipboard.writeText(email);
            ok = true;
        } catch (error) {
            const area = document.createElement("textarea");
            area.value = email;
            area.setAttribute("readonly", "");
            area.style.cssText = "position:fixed;opacity:0;pointer-events:none";
            document.body.appendChild(area);
            area.select();
            try {
                ok = document.execCommand("copy");
            } catch (fallbackError) {
                ok = false;
            }
            area.remove();
        }

        toast(ok ? ui("contact.copied") : `${ui("contact.copyFail")}${email}`, ok ? "check" : "mail");

        const btn = $("[data-copy-email]");
        if (btn && ok) {
            btn.classList.add("is-done");
            btn.innerHTML = `${icon("check")}<span>${esc(ui("contact.copied"))}</span>`;
            setTimeout(() => {
                btn.classList.remove("is-done");
                btn.innerHTML = `${icon("copy")}<span>${esc(ui("contact.copy"))}</span>`;
            }, 2200);
        }
    }

    function filterSkills(id) {
        if (id === state.skillFilter) return;
        const cards = $$(".skill-card");
        const update = () => {
            state.skillFilter = id;
            cards.forEach((card) => { card.hidden = id !== "all" && card.dataset.group !== id; });
            $$("[data-filter]").forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.filter === id)));
        };

        if (!document.startViewTransition || !motionOK()) {
            update();
            return;
        }
        // Cada cartão ganha um nome só durante a transição, para deslizar até o novo lugar.
        cards.forEach((card, i) => { card.style.viewTransitionName = `skill-${i}`; });
        root.classList.add("vt-filter");
        const transition = document.startViewTransition(update);
        transition.finished.finally(() => {
            cards.forEach((card) => { card.style.viewTransitionName = ""; });
            root.classList.remove("vt-filter");
        });
    }

    function toggleMarquee() {
        state.marqueePaused = !state.marqueePaused;
        const paused = state.marqueePaused;
        $("#marquee").classList.toggle("is-paused", paused);
        const btn = $(".marquee__toggle");
        if (btn) {
            btn.setAttribute("aria-pressed", String(paused));
            btn.setAttribute("aria-label", ui(paused ? "marqueePlay" : "marqueePause"));
            btn.innerHTML = icon(paused ? "play" : "pause");
        }
    }


    /* ==========================================================
       RELÓGIO DE MARINGÁ
       ========================================================== */

    const clockFormats = {};
    let offsetLabel = "";

    function updateClocks() {
        const now = new Date();
        const zone = C.person.timeZone;
        const key = state.lang;
        let short;
        let long;
        try {
            if (!clockFormats[key]) {
                const locale = key === "en" ? "en-GB" : "pt-BR";
                clockFormats[key] = {
                    short: new Intl.DateTimeFormat(locale, { timeZone: zone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }),
                    long: new Intl.DateTimeFormat(locale, { timeZone: zone, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" })
                };
            }
            short = clockFormats[key].short.format(now);
            long = clockFormats[key].long.format(now);
            if (!offsetLabel) {
                const part = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "shortOffset" })
                    .formatToParts(now).find((item) => item.type === "timeZoneName");
                offsetLabel = part ? part.value : "";
            }
        } catch (error) {
            short = now.toTimeString().slice(0, 5);
            long = now.toTimeString().slice(0, 8);
        }
        $$("[data-clock]").forEach((el) => { el.textContent = el.dataset.clock === "seconds" ? long : short; });
        $$("[data-offset]").forEach((el) => { el.textContent = offsetLabel; });
    }


    /* ==========================================================
       DETALHES FINAIS
       ========================================================== */

    // Ajusta a assinatura grande do rodapé à largura exata do texto.
    function fitWordmark() {
        const svg = $(".footer__wordmark");
        const text = svg && $("text", svg);
        if (!text) return;
        try {
            const box = text.getBBox();
            if (box.width) svg.setAttribute("viewBox", `${box.x.toFixed(1)} ${(box.y + box.height * 0.08).toFixed(1)} ${box.width.toFixed(1)} ${(box.height * 0.84).toFixed(1)}`);
        } catch (error) {
            // getBBox falha se o SVG ainda não foi desenhado; o viewBox padrão serve.
        }
    }

    // Código Konami: ↑ ↑ ↓ ↓ ← → ← → B A
    const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let konamiStep = 0;
    let raining = false;

    function trackKonami(event) {
        const key = event.key && event.key.length === 1 ? event.key.toLowerCase() : event.key;
        if (key === KONAMI[konamiStep]) konamiStep += 1;
        else konamiStep = key === KONAMI[0] ? 1 : 0;
        if (konamiStep === KONAMI.length) {
            konamiStep = 0;
            cyberMode();
        }
    }

    function cyberMode() {
        toast(ui("egg.on"), "terminal");
        if (!motionOK() || raining) return;
        raining = true;

        const canvas = $("#rain");
        const ctx = canvas.getContext("2d");
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const width = innerWidth;
        const height = innerHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.scale(ratio, ratio);

        const size = 16;
        const drops = Array.from({ length: Math.ceil(width / size) }, () => Math.random() * -40);
        const glyphs = "01アイウエオカキクケコサシスセソ{}[]<>/=+*#$";
        const styles = getComputedStyle(root);
        const colors = [styles.getPropertyValue("--accent").trim(), styles.getPropertyValue("--accent-2").trim()];
        const fade = state.theme === "dark" ? "rgba(7, 7, 12, 0.16)" : "rgba(246, 246, 250, 0.2)";
        const endAt = performance.now() + 6000;
        let last = 0;

        canvas.classList.add("is-on");
        const draw = (now) => {
            if (now - last > 50) {
                last = now;
                ctx.fillStyle = fade;
                ctx.fillRect(0, 0, width, height);
                ctx.font = `${size}px "Geist Mono", monospace`;
                drops.forEach((row, i) => {
                    ctx.fillStyle = colors[i % 2];
                    ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, row * size);
                    drops[i] = row * size > height && Math.random() > 0.97 ? 0 : row + 1;
                });
            }
            if (now < endAt) {
                requestAnimationFrame(draw);
                return;
            }
            canvas.classList.remove("is-on");
            setTimeout(() => {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                raining = false;
            }, 700);
        };
        requestAnimationFrame(draw);
    }

    function greet() {
        const pt = state.lang === "pt";
        console.log("%c EM ", "background:#6a5ae6;color:#fff;font:600 13px/2 monospace;border-radius:6px;padding:2px 8px");
        console.log(pt
            ? "Olá, dev curioso! Este portfólio é HTML, CSS e JavaScript puro, sem framework.\nDica: experimente o código Konami  ↑ ↑ ↓ ↓ ← → ← → B A"
            : "Hi, curious dev! This portfolio is plain HTML, CSS and JavaScript, no framework.\nTip: try the Konami code  ↑ ↑ ↓ ↓ ← → ← → B A");
    }


    /* ==========================================================
       LIGAÇÕES DE EVENTOS
       ========================================================== */

    function bindEvents() {
        $("#theme-toggle").addEventListener("click", (event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        });

        $$(".lang-switch__btn").forEach((btn) => btn.addEventListener("click", () => setLang(btn.dataset.lang)));

        // Delegação: continua funcionando depois que o conteúdo é remontado na troca de idioma.
        document.addEventListener("click", (event) => {
            const target = event.target instanceof Element ? event.target : null;
            if (!target) return;
            if (target.closest("[data-copy-email]")) copyEmail();
            else if (target.closest("[data-lightbox]")) openLightbox(Number(target.closest("[data-lightbox]").dataset.lightbox));
            else if (target.closest("[data-filter]")) filterSkills(target.closest("[data-filter]").dataset.filter);
            else if (target.closest(".marquee__toggle")) toggleMarquee();
        });

        document.addEventListener("keydown", (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key && event.key.toLowerCase() === "k") {
                event.preventDefault();
                if (palette.open) closeDialog(palette);
                else openPalette();
                return;
            }
            trackKonami(event);
        });

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", () => {
            placeNavIndicator();
            onScroll();
        }, { passive: true });
    }

    function afterRender(instant) {
        cacheScrollTargets();
        observeReveals(instant);
        setActive(state.active);
        if (instant) {
            $("#inicio").classList.add("is-in");
            if (state.introDone) startRotator();
        }
        updateScroll();
    }


    /* ==========================================================
       INÍCIO
       ========================================================== */

    function boot() {
        if (motionOK()) root.classList.add("anim");

        renderAll();
        bindEvents();
        safe(setupDialogs);
        safe(setupMenu);
        safe(setupPalette);
        safe(setupLightbox);
        safe(setupSectionSpy);
        afterRender(false);
        safe(playIntro);

        setInterval(updateClocks, 1000);
        if (document.fonts) {
            document.fonts.ready.then(() => {
                fitWordmark();
                placeNavIndicator();
            });
        }
        safe(greet);
        safe(maybeSuggestLanguage);

        window.PORTFOLIO_READY = true;
    }

    boot();
})();
