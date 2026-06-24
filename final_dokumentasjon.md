# Voss Taxi Web – Komplett System- og Designarkitektur

Dette dokumentet er en dyptgående teknisk manual for Voss Taxi sin nettside. Den dekker alt fra server-infrastruktur og proxy-routing, til CMS-integrasjoner (Strapi), frontend-arkitektur (React/Vite), og detaljer om designsystemet (farger, fonter, glassmorphism-effekter). 

Målet er at man skal kunne bygge opp siden *helt* identisk fra bunnen av, kun basert på denne guiden.

---

## 1. Systemarkitektur & Hosting

Hele systemet kjører på en selvstendig Linux VPS. Arkitekturen er delt opp i tre hoveddeler:
1. **Frontend (React SPA):** Bygges med Vite til statiske filer (`/dist`).
2. **Backend (Node.js HTTP Server):** En skreddersydd webserver (`server.js`) som serverer filene, fungerer som en reverse-proxy for spesifikke adresser, og håndterer e-post API.
3. **CMS (Strapi):** Innhold ligger på et eksternt subdomene (`cms.vosstaxi.no`).

### 1.1. Server & Nginx
- **IP / Server:** VPS kjører Ubuntu Linux. Hoved-IP er `85.190.102.196`.
- **Nginx:** Står helt forrest (Port 80/443). Oppgaven til Nginx er utelukkende å terminere SSL-sertifikater (Let's Encrypt) og rute trafikken inn til den interne Node.js applikasjonen på port `3200`.
- **Node.js & PM2:** Koden kjøres via prosess-manageren `PM2` med app-navnet `vpsweb`. 

### 1.2. Miljøvariabler (.env)
Dette er hjertet for at integrasjonene skal fungere.
- **Lokalt (`.env.production`):** 
  ```env
  VITE_STRAPI_API_URL=https://cms.vosstaxi.no
  ```
  *(Forteller Vite hvor innhold skal hentes fra under bygging/kjøring).*
- **Server (`.env.server` omdøpt til `.env` på VPS):** 
  ```env
  PORT=3200
  HOST=127.0.0.1
  SMTP_USER=post@vosstaxi.no
  SMTP_PASS=<passord_for_one_com_epost>
  ```
  *(Brukes av `server.js` til å sende e-post og vite hvilken port den skal kjøre på).*

---

## 2. Ruting, Proxy og Eksterne Systemer (server.js)

`server.js` bruker utelukkende integrerte Node-moduler (`node:http`, `node:fs`) og avstår fra store biblioteker som Express for maksimal ytelse.

### 2.1. Proxy for Hardware og Tredjepart
Voss Taxi bruker eksternt utstyr og bookingsystemer som er knyttet mot spesifikke URLer. Fordi de nye systemene ligger hos One.com (`46.30.213.149`), har `server.js` spesialregler:
- **`/fliser/` og `/portal/`:** 
  Dersom noen (eller maskinvaren) prøver å gå inn på `vosstaxi.no/fliser`, fanger serveren det opp før React får sjansen.
  ```javascript
  if (req.url === '/fliser' || req.url.startsWith('/fliser/')) {
    const newPath = req.url.replace(/^\/fliser\/?/, '');
    res.writeHead(308, { Location: `https://fliser.vosstaxi.no/${newPath}` });
    res.end();
  }
  ```
  Den bruker HTTP `308 Permanent Redirect` som sikrer at nettlesere og hardware vet at dette er det nye faste bostedet, uten å endre HTTP-metoden.

### 2.2. E-post API (`POST /api/contact`)
Skjemaet på frontend ("Kontakt" og "Personvern") gjør en POST-forespørsel til `/api/contact`. 
- `server.js` mottar requesten, parser JSON-kroppen, og sjekker feltet `target`. 
- Dersom det er sendt fra personvern-siden går e-posten til `personvern@vosstaxi.no`, ellers til `post@vosstaxi.no`. 
- `nodemailer` autentiserer mot `send.one.com` på port `465` (secure) ved bruk av variablene i `.env`.

---

## 3. Frontend & CMS (React + Strapi)

### 3.1. Strapi Data-fetching (`src/lib/directus.ts`)
Selv om filen heter "directus" av historiske årsaker, snakker den nå med **Strapi** (`/api/pages?populate=*`).
Når brukeren laster siden, kjøres koden:
1. Henter siden fra Strapi basert på *slug* (f.eks. `kontakt` eller `home`).
2. Siden `content`-feltet (Rich Text) av og til har rare query-parametere for bilder, vaskes det automatisk i frontend med regex:
   ```typescript
   cleanContent = cleanContent.replace(/\?etag=[^)]+/g, '')
   ```
3. **Automagiske blokker:** Koden skyter inn kontaktskjema-blokken (`contact_form`) dynamisk dersom den laster inn spesifikke sider:
   ```typescript
   if (item.slug === 'personvern' || item.slug === 'kontakt' || item.slug === 'contact') {
       blocks.push({ type: 'contact_form' });
   }
   ```

### 3.2. Sideoppsett (`App.tsx`)
Applikasjonen bruker lokaliserings-routing via React Router (`/no/...` og `/en/...`).
- På toppen av `App.tsx` injiseres `react-helmet-async` for å bygge riktige SEO-tags, canonical lenker og dynamisk `<title>` for gjeldende side.
- Den legger også inn strukturert data (`application/ld+json`) satt opp med Schema.org typen `TaxiService`.

---

## 4. Designsystemet, Farger & Layout (`index.css`)

Nettsiden er utformet for å gi en "Wow!"-effekt – den føles som en premium app fremfor et klassisk nettsted. Dette oppnås via et skreddersydd CSS-regelsett.

### 4.1. Fargepalett (CSS Variabler)
Appen har en innebygd Dark/Light mode toggle (`data-theme="dark"`).
* **Light Mode Base:** Bakgrunn `#f8f9fa`, Tekst `#1a1b1e`.
* **Dark Mode Base:** Bakgrunn `#11100d`, Tekst `#ffffff`, Mørk surface `#211d16`.
* **Voss Taxi Accent (Gul):** 
  - Variabelen `--accent: #ebb305` (Light) og `#e5b93f` (Dark).
  - Merkevare-farge: `--color-taxi: #d8ae3d`.

### 4.2. Typografi
Nettsiden benytter moderne sans-serif fontstack:
1. **Overskrifter / Hero (`--font-display`):** Spesialfonten **"Handel Go"** og **"Handel Gothic"** blandet med "Outfit". Dette gir taxi-looket som minner om taksameter/dashbord.
2. **Brødtekst (`--font-sans`):** Bruker Google Fonten **"Outfit"**.
3. **Detaljer / Dashbord (`--font-mono`):** **"JetBrains Mono"** brukes for tidspunkter, destinasjoner, og "tekniske" elementer for å gi det et "system"-utseende.

### 4.3. Premium Design-effekter
For å skape dybde og dynamikk, benyttes flere tunge CSS-effekter:
- **Glassmorphism:** Komponenter benytter variabelen `--glass: rgba(255, 255, 255, 0.8)` og `--glass-strong` sammen med Tailwind sin `backdrop-blur-md` for å se delvis transparente ut mot bakgrunnsfilmen.
- **Micro-animasjoner:** Alle knapper og skjema-elementer har transition-regler.
  - Hover: Løfter opp knappen med `transform: translateY(-3px)`.
  - Active: Klemmer knappen ned med `transform: scale(0.985)`.
- **Gradients og Vignetter:** 
  - Klassene `.hero-vignette` og `.bg-gradient` benytter `radial-gradient` med en "srgb color-mix" for å farge overgangene mykt inn i bakgrunnsfargen.
  - `.hero-yellow-blade`: Et enormt asymmetrisk grafisk gult "knivblad" (`transform: skewX(-16deg)`) som ligger i bakgrunnen for å bryte opp den ellers boksete layouten.

### 4.4. Hero & Video-spiller
- Bakgrunnen på forsiden er en `loop` video plassert med `z-index: -50`. Den velger tilfeldig ett av 31 klipp (`clip_00.mp4` til `clip_30.mp4`) ved hver oppdatering. 
- Oppå videoen legges klassen `.hero-video` med CSS filters: `saturate(0.9) contrast(1.08) brightness(0.95)` for å sikre at teksten foran er leselig uavhengig av klippet som vises.
- **Cockpit Map (`.hero-cockpit`):** Et design-element som etterligner en ruteoversikt med pulserende `.map-node` "dots" som animerer over skjermen for å illustrere en reise fra A til B.

---

## 5. Deployment / Byggeprosess

Prosjektet publiseres direkte fra utviklerens PC (Windows) ved å kjøre `deploy_live.ps1` i PowerShell.

### Steg-for-steg under deploy:
1. **Bygging:** Kjører `npm run build` som består av TypeScript-validering (`tsc -b`) og Vite-kompilering (`vite build`).
2. **Minifisering:** Alle filer optimaliseres, og PWA Service Workers (`sw.js`) genereres for offline støtte og caching.
3. **Klargjøring av VPS:** Oppretter mappene på `vosstaxi@85.190.102.196`, sletter innholdet i den gamle `dist`-mappen via SSH batch commands.
4. **Opplasting:** Kopierer opp den nye `dist/` mappen, `server.js` filen og den skjulte `.env.server` (som inneholder passordene).
5. **Omstart:** Kjører `pm2 restart vpsweb` på serveren via SSH for å la Node laste inn ny filstruktur og de nye proxy-reglene umiddelbart uten nedetid.

---

Ved å følge logikken over, skal det være mulig å både endre server-config, utvide designet i `index.css`, og administrere CMS og Proxy-ruting uten at noe knekker. Dette dokumentet er din blueprint.
