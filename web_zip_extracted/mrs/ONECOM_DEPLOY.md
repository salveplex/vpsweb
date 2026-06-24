# one.com deployment

Legg disse filene i webroten din pa one.com, vanligvis `public_html/`:

- `index.php`
- `index.php.css`
- `index.php.js`
- `config.php`

Steg:

1. Kopier `config.example.php` til `config.php`.
2. Sett riktig brukernavn og passord i `config.php`.
3. Last opp filene til `public_html/`.
4. Besok domenet ditt.

Denne losningen forutsetter at one.com-kontoen din har:

- PHP aktivert
- cURL aktivert
- DOM/XML aktivert
- tilgang til a skrive midlertidige session/cookie-filer

Siden gjor dette:

- logger inn mot Taxiportalen pa serversiden
- filtrerer bort turer med `skulerute`
- viser bare turer med `rullestol`, `storbil` eller `maxi`
- lar deg tildele vogn
- lar deg endre oppmote og utropstid
- husker valgt tema i nettleseren

Merk:

- Jeg fikk ikke kjort PHP lokalt i dette miljoet, sa du bor testlaste opp og sjekke at cURL og DOM er aktiv pa ditt one.com-oppsett.
- Av sikkerhetsgrunner bor `config.php` ikke ligge i git eller deles videre.
