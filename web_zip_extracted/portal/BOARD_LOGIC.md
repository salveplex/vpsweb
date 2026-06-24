# Taxiportalen Board Logic

Dette dokumentet forklarer korleis tavla er tenkt å fungere, på ein enkel måte, slik at andre kan forstå vala som er gjort.

## Overordna tanke

Tavla skal vise det som er viktig akkurat no.

- `Aktive` skal vise det som framleis krev handling eller merksemd.
- `Pågåande` skal vise turar som allereie er i gang.
- `Ferdige` skal vise turar som er avslutta.

Målet er at hovudskjermen ikkje skal fyllast opp av turar som eigentleg berre "går sin gang".

## Fanene

### Aktive

Her skal turane ligge så lenge dei framleis er relevante å jobbe med.

Desse blir rekna som aktive:

- turar som ikkje er `Ja-svar`
- turar som ikkje er `Køyrd`
- turar som ikkje er flytta til `Pågåande` av spesialreglar

Talet på `Aktive` viser berre turar for dagens dato som ikkje er:

- `Ja-svar`
- `Køyrd`

### Pågåande

Dette er turar som er i gang, eller som i praksis allereie høyrer til ein pågåande tur.

Desse blir flytta hit:

- turar med status `Ja-svar`
- turar med status `Man. Sendt` når `Taxi` allereie har eit løyve/bil sett

Tanken her er:

- `Ja-svar` betyr at ein bil har godkjent turen og er på veg
- `Man. Sendt` med allereie tildelt taxi tyder ofte at dette er ein ny del av ein eksisterande pågåande tur

### Ferdige

Hit går turane når status blir:

- `Køyrd`

## Treff i dag

`Treff i dag` på toppen viser:

- alle turar for dagens dato
- uansett status

Dette talet er meint som eit totalbilete av kor mange turar som ligg på dagens dato.

## Type-kolonnen

`Type` viser om turen er lokal eller inter.

### Lokal

Ein tur blir `Lokal` dersom vi ikkje finn noko postnummer utanfor lokalområdet.

### Inter

Ein tur blir `Inter` dersom vi finn eit postnummer i `Frå` eller `Til` som ikkje er i lokal-lista.

Lokal-lista er:

- `5274`
- `5275`
- `5700`
- `5701`
- `5702`
- `5703`
- `5704`
- `5705`
- `5706`
- `5707`
- `5708`
- `5709`
- `5710`
- `5711`
- `5712`
- `5713`
- `5714`
- `5715`
- `5723`

Viktig:

- dersom `Frå` eller `Til` er tomt, blir det ikkje rekna som `Inter`
- dersom `Frå` eller `Til` berre er adresse utan postnummer, blir det heller ikkje rekna som `Inter`

Det er berre eksplisitte postnummer utanfor lista som gir `Inter`.

## Melding til bil

`Melding til bil` ligg ikkje som eiga kolonne lenger.

I staden:

- kvar rad kan ha ein `Melding`-knapp
- meldinga blir vist/skjult ved behov

Poenget er å halde tabellen reinare, men framleis ha meldinga tilgjengeleg.

## Statusar og meininga med dei

### Utrop

`Utrop` betyr at turen krev merksemd no.

Derfor:

- `send.mp3` blir spela kvart 10. sekund
- lyden stoppar når status ikkje lenger er `Utrop`

### Tildelt

`Tildelt` betyr at taxi er sett på turen.

Tanken her er:

- når turen faktisk har taxi sett, skal den sjå meir "avklart" ut
- derfor får tids-pillene same grå stil som ferdige/pågåande tider

Dersom taxi blir fjerna igjen, eller går tilbake til `Venter`, skal denne grå markeringa forsvinne og dei vanlege reglane gjelde.

### Ja-svar

`Ja-svar` betyr at turen er godkjend og i praksis på veg.

Derfor:

- turen flyttast til `Pågåande`
- statuspille, taxi-pille og tids-piller får "pågår / avklart"-uttrykk

### Man. Sendt

`Man. Sendt` er behandla som ein status som ligg tett opp mot `Ja-svar` når taxi allereie er sett.

Derfor:

- den kan flyttast til `Pågåande`
- den får same statusfarge som `Ja-svar`
- taxi-pilla får same farge som `Ja-svar`
- tids-pillene får same grå stil når taxi faktisk er sett

### Sender

`Sender` har eigen oransje statuspille.

### Manuell

Statusar som betyr manuell behandling blir viste som `Manuell`.

Den har ei djup oransje pille for å vere tydeleg, men ikkje same type varsel som raude feilstatusar.

### Endret og No contact

Desse brukar same djupe oransje pille som `Manuell`.

### Timeout og Nei-svar

Desse brukar raud pille for å vere tydeleg negative/avvikande statusar.

## Tids-piller

Tidene i:

- `Utrop`
- `Oppmøte`
- `Time`

skiftar stil ut frå status og situasjon.

### Grå tids-piller

Desse blir brukte når turen er "avklart nok", til dømes:

- `Køyrd`
- `Ja-svar`
- `Tildelt` når taxi faktisk er sett
- `Man. Sendt` når taxi faktisk er sett

### Vanlege / varslande tids-piller

Desse blir brukte når turen framleis krev meir merksemd.

Poenget er at ein raskt skal kunne sjå skilnaden mellom:

- turar som framleis ventar på handling
- turar som allereie er i gang eller avklart

## Taxi-piller

Taxi-kolonnen har eigne piller for å gjere det lett å sjå om turen:

- ventar på bil
- har fått taxi
- er pågåande / godkjend

For statusar som `Ja-svar` og `Man. Sendt` blir taxi-pilla gitt same grøne uttrykk for å vise at turen høyrer til ein "pågåande" tilstand.

## Viktig designprinsipp

Den viktigaste tanken bak tavla er:

- det som krev handling skal vere synleg på `Aktive`
- det som er i gang skal flyttast bort frå hovudbildet
- det som er ferdig skal ligge for seg sjølv

Med andre ord:

- mindre støy
- betre oversikt
- lettare å sjå kva som faktisk må følgjast opp akkurat no
