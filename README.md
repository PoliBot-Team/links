# TALOS Robotics Team — Links

Pagina stile Linktree per il team **TALOS Robotics** (Politecnico di Torino · RoboCup), costruita secondo le specifiche del Brand Book (`Grafite`, `Bronzo`, `Patina`, `Saira Condensed` + `IBM Plex`).

URL pubblico atteso con GitHub Pages:
`https://polibot-team.github.io/links/`

## Struttura dei file

- `index.html` — Struttura della pagina e asset SVG vettoriali del brand
- `style.css` — Stili responsive e variabili per tema **scuro (Grafite)** e **chiaro (Alluminio)**
- `links.js` — Configurazione centralizzata di **link** e **testi ITA/ENG**
- `app.js` — Rendering dinamico dei link, cambio lingua `IT/EN`, toggle tema e copia link
- `favicon.svg` — Icona monogramma ufficiale

## Come aggiornare i link

Apri `links.js` e modifica i campi `url` all'interno di `groups`:

- Sostituisci `url: "#"` con il link reale (es. Google Form, Telegram, Instagram, LinkedIn, `mailto:...`).
- Imposta `enabled: false` se vuoi nascondere temporaneamente un pulsante senza cancellarlo.
- Imposta `featured: true` sul link principale (es. modulo di candidatura) per evidenziarlo con il colore di segnale Patina.

## Pubblicazione su GitHub Pages

1. Fai commit e push sul branch `main` del repository `PoliBot-Team/links`.
2. Su GitHub vai in **Settings → Pages**.
3. Sotto **Build and deployment**, scegli **Deploy from a branch** → branch `main` → folder `/ (root)` e salva.
4. Dopo qualche secondo la pagina sarà online su `https://polibot-team.github.io/links/`, pronta per essere collegata al QR code del volantino.
