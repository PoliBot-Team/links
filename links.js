/* ==========================================================================
   TALOS Robotics Team — Configurazione Link e Testi (ITA / ENG)
   Modifica questo file per aggiornare URL, attivare/disattivare link o testi.
   ========================================================================== */

window.TALOS_CONFIG = {
  // URL pubblico del sito (usato per il pulsante "Copia link")
  publicUrl: "https://polibot-team.github.io/links/",

  // Testi principali dell'interfaccia (Italiano / English)
  i18n: {
    it: {
      status: "Politecnico di Torino · RoboCup",
      claimHtml: "Forgiati a Torino.<br><em>Programmati per vincere.</em>",
      bio: "Team studentesco di robotica umanoide per la RoboCup. Prima stagione: nessuna esperienza richiesta, conta la voglia di imparare.",
      areas: [
        "Meccanica & Meccatronica",
        "Elettronica & Embedded",
        "Controllo & Locomozione",
        "Computer Vision & AI"
      ],
      shareBtn: "Copia link pagina",
      shareCopied: "Link copiato negli appunti",
      comingSoon: "In arrivo",
      notReadyToast: "Link non ancora configurato in links.js",
      footerNote: "Politecnico di Torino · RoboCup",
      themeLabel: "Cambia tema chiaro/scuro"
    },
    en: {
      status: "Politecnico di Torino · RoboCup",
      claimHtml: "Forged in Turin.<br><em>Coded to win.</em>",
      bio: "Student humanoid robotics team competing in RoboCup. First season: no experience required — eagerness to learn is what counts.",
      areas: [
        "Mechanics & Mechatronics",
        "Electronics & Embedded",
        "Control & Locomotion",
        "Computer Vision & AI"
      ],
      shareBtn: "Copy page link",
      shareCopied: "Link copied to clipboard",
      comingSoon: "Soon",
      notReadyToast: "Link not configured yet in links.js",
      footerNote: "Politecnico di Torino · RoboCup",
      themeLabel: "Toggle light/dark theme"
    }
  },

  // Gruppi di link stile Linktree.
  // Imposta `enabled: false` per nascondere un link senza cancellarlo.
  // Sostituisci `url: "#"` con il link reale quando disponibile.
  groups: [
    {
      id: "join",
      label: { it: "Entra nel team", en: "Join the team" },
      items: [
        {
          enabled: true,
          featured: true,
          icon: "robot",
          url: "#", // <-- Inserisci qui il link al Form di candidatura (Google Form / Tally / Typeform)
          badge: { it: "Aperto", en: "Open" },
          title: { it: "Candidati al Team", en: "Apply to Join" },
          subtitle: {
            it: "Compila il modulo di reclutamento · Prima stagione",
            en: "Fill out the recruitment form · First season"
          }
        },
        {
          enabled: true,
          featured: false,
          icon: "team",
          url: "#", // <-- Inserisci qui il link al gruppo Telegram / WhatsApp / Discord
          title: { it: "Community & Chat", en: "Community Chat" },
          subtitle: {
            it: "Canale informativo per studenti interessati",
            en: "Info channel for interested students"
          }
        }
      ]
    },
    {
      id: "channels",
      label: { it: "Progetto & Canali", en: "Project & Channels" },
      items: [
        {
          enabled: true,
          featured: false,
          icon: "code",
          url: "https://github.com/PoliBot-Team",
          badge: { it: "Open Source", en: "Open Source" },
          title: { it: "GitHub Organization", en: "GitHub Organization" },
          subtitle: {
            it: "Codice, firmware, visione e documentazione",
            en: "Code, firmware, vision and documentation"
          }
        },
        {
          enabled: true,
          featured: false,
          icon: "vision",
          url: "#", // <-- Inserisci qui il link Instagram (es. https://instagram.com/...)
          title: { it: "Instagram", en: "Instagram" },
          subtitle: {
            it: "Aggiornamenti dal laboratorio e test sui robot",
            en: "Lab updates and robot field tests"
          }
        },
        {
          enabled: true,
          featured: false,
          icon: "trophy",
          url: "#", // <-- Inserisci qui il link LinkedIn del team
          title: { it: "LinkedIn", en: "LinkedIn" },
          subtitle: {
            it: "Partnership, sponsor e traguardi del team",
            en: "Partnerships, sponsors and team milestones"
          }
        },
        {
          enabled: true,
          featured: false,
          icon: "mail",
          url: "#", // <-- Inserisci qui mailto:info@... oppure link contatti
          title: { it: "Contattaci via Email", en: "Contact via Email" },
          subtitle: {
            it: "Per studenti, docenti e proposte di sponsorizzazione",
            en: "For students, faculty and sponsorship inquiries"
          }
        }
      ]
    }
  ]
};
