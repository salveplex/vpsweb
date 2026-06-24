# one.com deployment

Legg innhald i `C:\Users\SalveSove\Documents\codex\taxiportalen-board\` i webroten til det nye subdomenet ditt hos one.com.

Filer:

- `index.php`
- `index.php.css`
- `index.php.js`
- `config.php`
- `config.local.php`

Steg:

1. Kopier `config.example.php` til `config.local.php`.
2. Sett Taxiportalen-brukarnamn og passord i `config.local.php`.
3. La `config.php` vere utan hemmelege verdiar, eller bruk miljøvariablar for innlogging.
4. Last opp filene til webroten for subdomenet.
5. Åpne subdomenet i nettlesar.

Sida gjer dette:

- logger inn mot Taxiportalen på serversida
- filtrerer bort `skulerute`
- viser turar med `rullestol`, `storbil` eller `maxi`
- viser eigne statusfargar
- speler lyd når ein eksisterande tur skiftar status mellom oppdateringar

Merk:

- Nokre nettlesarar krev eit første klikk på sida før lyd får spelast av.
- PHP, cURL og DOM/XML må vere aktivert på one.com.