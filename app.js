/* ==========================================================================
   TALOS Robotics Team — Links Page Controller (i18n + Theme + Rendering)
   ========================================================================== */

(function () {
  const cfg = window.TALOS_CONFIG;
  if (!cfg) return;

  const ICONS = {
    robot:
      '<rect x="5" y="7" width="14" height="11" rx="3"/><path d="M12 3.5V7"/><circle cx="12" cy="3" r=".8"/><circle cx="9.5" cy="12.5" r="1.2"/><circle cx="14.5" cy="12.5" r="1.2"/><path d="M3 11v4M21 11v4M9 21h6M12 18v3"/>',
    code:
      '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/>',
    vision:
      '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    trophy:
      '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M12 14v3M8 21h8M9.5 17h5v4h-5z"/>',
    team:
      '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/>',
    mail:
      '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    globe:
      '<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    sensor:
      '<circle cx="6" cy="12" r="2.5"/><path d="M10 8a6 6 0 0 1 0 8M13.5 5.5a9 9 0 0 1 0 13M17 3a12 12 0 0 1 0 18"/>',
    sun:
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon:
      '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/>',
    arrowUpRight:
      '<path d="M7 17L17 7M9 7h8v8"/>'
  };

  const els = {
    status: document.getElementById("i18n-status"),
    claim: document.getElementById("i18n-claim"),
    bio: document.getElementById("i18n-bio"),
    areas: document.getElementById("areas-list"),
    groups: document.getElementById("links-root"),
    shareBtn: document.getElementById("share-btn"),
    shareLabel: document.getElementById("share-label"),
    footerNote: document.getElementById("i18n-footer"),
    themeBtn: document.getElementById("theme-toggle"),
    themeIcon: document.getElementById("theme-icon"),
    langBtns: document.querySelectorAll(".lang-btn"),
    themeMeta: document.querySelector('meta[name="theme-color"]')
  };

  function getInitialLang() {
    try {
      const saved = localStorage.getItem("talos_lang");
      if (saved === "it" || saved === "en") return saved;
    } catch (_) {}
    return navigator.language && navigator.language.toLowerCase().startsWith("it")
      ? "it"
      : "en";
  }

  function getInitialTheme() {
    try {
      const saved = localStorage.getItem("talos_theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch (_) {}
    return "dark";
  }

  let currentLang = getInitialLang();
  let currentTheme = getInitialTheme();
  let shareResetTimer = null;

  function makeSvg(pathMarkup) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = pathMarkup;
    return svg;
  }

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    if (els.themeMeta) {
      els.themeMeta.setAttribute("content", theme === "light" ? "#EFF2F4" : "#1D252D");
    }
    if (els.themeIcon) {
      els.themeIcon.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;
    }
    try {
      localStorage.setItem("talos_theme", theme);
    } catch (_) {}
  }

  function renderAreas(areas) {
    els.areas.innerHTML = "";
    areas.forEach((label) => {
      const span = document.createElement("span");
      span.className = "area-tag";
      span.textContent = label;
      els.areas.appendChild(span);
    });
  }

  function renderGroups(lang) {
    const t = cfg.i18n[lang];
    els.groups.innerHTML = "";

    cfg.groups.forEach((group) => {
      const activeItems = group.items.filter((item) => item.enabled !== false);
      if (activeItems.length === 0) return;

      const section = document.createElement("section");
      section.className = "link-group";
      section.setAttribute("aria-label", group.label[lang] || group.label.it);

      const heading = document.createElement("h2");
      heading.className = "group-label";
      heading.textContent = group.label[lang] || group.label.it;
      section.appendChild(heading);

      const list = document.createElement("div");
      list.className = "link-list";

      activeItems.forEach((item) => {
        const isPlaceholder = !item.url || item.url === "#";
        const isExternal = /^https?:\/\//i.test(item.url);

        const card = document.createElement("a");
        card.className = "link-card" + (item.featured ? " is-featured" : "");
        card.href = item.url || "#";
        if (isExternal) {
          card.target = "_blank";
          card.rel = "noopener noreferrer";
        }
        if (isPlaceholder) {
          card.setAttribute("data-placeholder", "true");
          card.addEventListener("click", (e) => {
            e.preventDefault();
            showShareFeedback(t.notReadyToast);
          });
        }

        const iconBox = document.createElement("span");
        iconBox.className = "link-icon";
        iconBox.appendChild(makeSvg(ICONS[item.icon] || ICONS.globe));
        card.appendChild(iconBox);

        const body = document.createElement("span");
        body.className = "link-body";

        const titleRow = document.createElement("span");
        titleRow.className = "link-title-row";

        const title = document.createElement("span");
        title.className = "link-title";
        title.textContent = item.title[lang] || item.title.it;
        titleRow.appendChild(title);

        if (isPlaceholder) {
          const badge = document.createElement("span");
          badge.className = "link-badge";
          badge.textContent = t.comingSoon;
          titleRow.appendChild(badge);
        } else if (item.badge && (item.badge[lang] || item.badge.it)) {
          const badge = document.createElement("span");
          badge.className = "link-badge";
          badge.textContent = item.badge[lang] || item.badge.it;
          titleRow.appendChild(badge);
        }

        body.appendChild(titleRow);

        const subText = item.subtitle && (item.subtitle[lang] || item.subtitle.it);
        if (subText) {
          const sub = document.createElement("span");
          sub.className = "link-sub";
          sub.textContent = subText;
          body.appendChild(sub);
        }

        card.appendChild(body);

        const arrow = document.createElement("span");
        arrow.className = "link-arrow";
        arrow.appendChild(makeSvg(ICONS.arrowUpRight));
        card.appendChild(arrow);

        list.appendChild(card);
      });

      section.appendChild(list);
      els.groups.appendChild(section);
    });
  }

  function applyLang(lang) {
    currentLang = lang;
    const t = cfg.i18n[lang] || cfg.i18n.it;

    document.documentElement.lang = lang;
    els.status.textContent = t.status;
    els.claim.innerHTML = t.claimHtml;
    els.bio.textContent = t.bio;
    els.footerNote.textContent = t.footerNote;
    els.shareLabel.textContent = t.shareBtn;
    els.themeBtn.setAttribute("aria-label", t.themeLabel);
    els.themeBtn.setAttribute("title", t.themeLabel);

    els.langBtns.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });

    renderAreas(t.areas);
    renderGroups(lang);

    try {
      localStorage.setItem("talos_lang", lang);
    } catch (_) {}
  }

  function showShareFeedback(message) {
    if (shareResetTimer) clearTimeout(shareResetTimer);
    els.shareLabel.textContent = message;
    shareResetTimer = setTimeout(() => {
      els.shareLabel.textContent = cfg.i18n[currentLang].shareBtn;
    }, 2200);
  }

  function handleShare() {
    const t = cfg.i18n[currentLang];
    const url =
      window.location.protocol === "file:"
        ? cfg.publicUrl
        : window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        () => showShareFeedback(t.shareCopied),
        () => fallbackCopy(url, t.shareCopied)
      );
    } else {
      fallbackCopy(url, t.shareCopied);
    }
  }

  function fallbackCopy(text, okMsg) {
    const input = document.createElement("input");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      showShareFeedback(okMsg);
    } catch (_) {}
    document.body.removeChild(input);
  }

  // Event Listeners
  els.langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lang !== currentLang) {
        applyLang(btn.dataset.lang);
      }
    });
  });

  els.themeBtn.addEventListener("click", () => {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  els.shareBtn.addEventListener("click", handleShare);

  // Initial Render
  applyTheme(currentTheme);
  applyLang(currentLang);
})();
