module.exports = [
      {
        id: 'home-no',
        locale: 'no',
        slug: 'home',
        eyebrow: 'Lokalt taxiselskap på Voss',
        title: 'Trygt fram på Voss, døgnet rundt.',
        summary:
          'Voss Taxi køyrer personbil, storbil, maxi-taxi, minibuss og rullestolbil for lokale, tilreisande og faste transportoppdrag.',
        hero_image: settings.hero_media,
        blocks: [
          {
            type: 'rich_text',
            title: 'Voss Taxi',
            body: 'Me har bilar til alle typar oppdrag og hjelper deg trygt frå tog, hotell, hytte, fjell og arrangement.',
          },
          {
            type: 'rich_text',
            title: 'Bestill via App',
            body: '### Snappy Taxi\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\n\n### Bestill Taxi i VY appen\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)'
          },
          {
            type: 'cta',
            title: 'Bestill med telefon eller kalkulator',
            body: 'Ring sentralen, eller sjekk pris i kalkulatoren før turen.',
            href: settings.booking_url,
            label: 'Bestill taxi',
          },
        ],
      },
      {
        id: 'services-no',
        locale: 'no',
        slug: 'tenester',
        eyebrow: 'Tenester',
        title: 'Bilar til alle typar oppdrag.',
        summary:
          'Frå korte turar i sentrum til større grupper, rullestoltransport og førehandsbestilte oppdrag.',
        blocks: [],
      },
      {
        id: 'fares-no',
        locale: 'no',
        slug: 'takstar',
        eyebrow: 'Takstar',
        title: 'Tydelege takstar og rask prisoversikt.',
        summary: 'Bruk kalkulatoren for estimat, eller kontakt sentralen for turar som krev planlegging.',
        blocks: [],
      },
      {
        id: 'gallery-no',
        locale: 'no',
        slug: 'galleri',
        eyebrow: 'Galleri',
        title: 'Voss Taxi i kvardagen.',
        summary: 'Eit lite utval frå bilar, oppdrag og transportmiljøet på Voss.',
        blocks: [],
      },
      {
        id: 'contact-no',
        locale: 'no',
        slug: 'kontakt',
        eyebrow: 'Kontakt',
        title: 'Ta kontakt med Voss Taxi.',
        summary: 'Sentralen er klar for bestillingar, spørsmål om oppdrag og praktisk informasjon.',
        blocks: [],
      },
      {
        id: 'wheelchair-no',
        locale: 'no',
        slug: 'rullestol',
        eyebrow: 'Rullestol',
        title: 'Rullestolbil og tilrettelagt transport.',
        summary: 'Ta kontakt for planlegging av trygg og praktisk transport med rullestolbil.',
        blocks: [],
      },
      {
        id: 'feedback-no',
        locale: 'no',
        slug: 'ris-ros',
        title: 'Ris og Ros',
        blocks: [
          {
            type: 'rich_text',
            title: 'Ris og Ros',
            body: 'Her kan du sende formelle klager, eller ros til oss.\n\n## Send klage\n\nVisst du ynskjer å retta ein formell klage, skal denne framsettast skriftleg ved å nytte vala nedanfor, eller på e-post til post@vosstaxi.no.\nMe sender deg innan 14 dagar ein skriftleg beskjed på at klagen er motteken, og informasjon om forventa behandlingstid.\n\nFormelle klagar vil besvarast skriftleg. Dokumentasjon vedrørande klagen oppbevarast hjå oss i tre år etter at klagebehandlinga er avslutta.\n\n## Gje oss ros eller ris\n\nMe ønskjer dine synspunkt, tilbakemeldingar og tips til forbetringar. Det er den beste hjelpen du kan gje oss i arbeidet med å verta endå betre.'
          },
          {
            type: 'contact_form'
          },
          {
            type: 'cta',
            title: 'Generell informasjon',
            body: 'Reglar, rettar og generell informasjon om taxi/drosje.',
            href: '/generell-informasjon',
            label: 'Les meir'
          }
        ],
      },
      {
        id: 'page-maxi-taxi-no',
        locale: 'no',
        slug: 'maxi-taxi',
        title: 'Maxi Taxi',
        eyebrow: 'Voss Taxi',
        summary: '',
        blocks: [
          {
            type: 'rich_text',
            title: 'Maxi Taxi',
            body: `### Rullestolbil og Maxi-Taxi 🚐

**Voss Taxi har lang erfaring med pasient- og rullestoltransport. Vi utfører rullestoloppdrag dagleg og er ein trygg transportpartnar i heile regionen.**

Alle våre lokalkjende sjåførar er opplærte og godkjende for å handtere ulike typar rullestolbrukarar. Vi har alltid fullt fokus på passasjerane sin sikkerheit og komfort under heile transporten. 

Me utfører kvart år eit stort tal transportar for Helse Bergen, og har mange års erfaring med å frakta passasjerar med behov for spesiell assistanse. Dette gjer oss til ein naturleg og profesjonell transportpartnar også for private omsorgsinstitusjonar, eldresenter, og andre som treng sikker transport av eldre og rørslehemma.

> 📞 **Vi er tilgjengelege kvar dag – heile året.**
> Ring (+47) 93 24 98 44 eller send ein e-post til maxi@vosstaxi.no

---

### Vår bilpark for rullestoltransport ♿

Vi har per dags dato:
- **2 minibussar** spesialtilpassa for å ta med éin eller to rullestolar
- **3 stk 8-seters rullestolbilar**, alle utstyrte med trygge og solide ramper for lett og behageleg ombordstiging

Her kan du sjå eit par av bilane våre i teneste:

![](https://cms.vosstaxi.no/uploads/DJI_0168_af2b600165.JPG)

![](https://cms.vosstaxi.no/uploads/20240514_203506_53aa74368f.jpg)

---
`
          }
        ]
      },
      {
        id: 'transportvilkar-no',
        locale: 'no',
        slug: 'transportvilkar',
        title: 'Transportvilkår',
        summary: 'Våre transportvilkår og retningslinjer',
        blocks: [
          {
            type: 'rich_text',
            body: `Transportvilkår

Utarbeidet av Norges Taxiforbund 2000

§ 1 Transportvilkårenes anvendelse
Transportvilkårene er avtalevilkår mellom den reisende og taxifører. På alle forhold som ikke er regulert her, kommer norsk lov til anvendelse.

§ 2 Bestilling av taxi
Ved bestilling av taxi gjennom sentral eller ved telefonbestilling direkte til holdeplass, skal bestiller gi relevante opplysninger som måtte være nødvendig for oppdragets utførelse. Dersom det kreves særskilt utrustet kjøretøy, utvidet setekapasitet eller særlig utstyr (spesialtransport), skal bestiller opplyse dette.

Om bestillingen gjelder f. eks. flere enn fire passasjerer og det viser seg at det faktiske behov er redusert, regnes godtgjørelse og lignende i henhold til bestillingen.

§ 3 Bruk av holdeplass. Fortrinnsrett til taxi.
Ved kø på holdeplass, skal taxifører kjøre den reisende som står for tur. Syke, uføre og personer med småbarn har fortrinnsrett til taxi. For øvrig gjelder de av myndighetene fastsatte bestemmelser om fortrinnsrett til taxi.

Reisende fra holdeplass er fortrinnsberettiget til ledig taxi. Publikum på holdeplass henvises til første ledige taxi, men de har selv rett til å velge taxi. Taxier som eventuelt står foran i køen, må om nødvendig flyttes for å gi plass til utkjøring.

Ved påstigning skal den reisende oppgi sitt reisemål, om eventuell annen oppgjørsform enn kontant betaling og eventuelle andre forhold av betydning for oppdragets utførelse.

§ 4 Praiing utenom holdeplass.
Når taxi er ledig, skal taxifører sørge for at lediglampe er tent og synlig for publikum. Utenfor en avstand fra nærmeste holdeplass, angitt i sentralens kjørereglement/sjåførinstruks, kan fører plukke opp reisende som gir tydelige tegn, så sant stans og påstigning kan skje innenfor rammen av gjeldende trafikkregler og uten hinder for øvrig trafikk.

§ 5 Taxiførers rett til å avvise turer
Taxifører kan avvise ruset person, reisende som opptrer truende eller personer som av andre årsaker taxifører finner saklig grunn til å avvise.

Den reisende har rett til å medbringe førerhund.

Dersom person avvises, kan taxifører kreve godtgjørelse i samsvar med taksameterets pålydende.

§ 6 Oppdragets utførelse
En taxifører skal følge den kjørerute som tar kortest tid til bestemmelsesstedet, hvis den reisende ikke bestemmer noe annet.

Taxifører plikter etter anmodning på samme turen å kjøre passasjerer til forskjellige steder (kombinering av tur). Hvis ikke annet er avtalt, er sist avstigende passasjer ansvarlig for betaling av turen

Ansvar for påbudt bruk av bilbelte og eventuelt at barnesete er forsvarlig festet, følger veitrafikklovens bestemmelser.

Person som trenger assistanse fra taxi til inngangsdør eller lignende, kan anmode om bistand. Bistand taxifører yter passasjeren, etter dennes ønske, til, fra eller utenfor transportmidlet skjer for passasjerens risiko.

Under turen skal fører og passasjer opptre slik at det ikke oppstår fare for medtrafikanter, bagasje, bil og utstyr. Røyking i taxi er forbudt.

Førers bruk av mobiltelefon, dataterminal og lignende under oppdrag skal skje i henhold til sentralens reglement. Bilradio kan benyttes etter den reisendes samtykke.

Taxifører kan kreve forhåndsbetaling for turen.

§ 7 Ventetid, avbrudd og forsinkelser
Ved henting av passasjer og under kjøring plikter taxifører å vente i et tidsintervall som fremgår av kjørereglement/sjåførinstruks, hvis ikke annet er avtalt. For spesielle kjøreoppdrag av typen legekjøring, bryllup, barnedåp og begravelse følger ventetid av oppdragets art.

Ved forhåndsbestilt taxi gjelder at faktisk fremmøte kan avvike fra avtalt fremmøtetidspunkt med et tidsintervall som er angitt i sentralens kjørereglement/sjåførinstruks.

Må en tur avbrytes på grunn av feil med kjøretøyet, har taxifører ikke krav på betaling for den utførte kjøring, hvis han ikke innen rimelig tid kan skaffe annen taxi. Dersom ny taxi skaffes, kan taxifører kreve betalt for det han har kjørt, fratrukket den nye taxiens fremmøtepris. Hvis passasjeren ikke ønsker en annen taxi, har taxifører krav på betaling for den kjøring som er utført.

Ved avbrytelse av tur på grunn av vær- og/eller føreforhold, har taxifører krav på betaling for kjørt lengde. Forsinkelser som skyldes trafikale og meteorologiske forhold gir den reisende ingen rett til avkortning i samlet takst.

8 Betaling, veksling og kvittering
Taxisentralens takstregulativ benyttes som grunnlag for takstberegningen, med mindre annet er avtalt.

Taxiturer skal skje mot kontant betaling. Ved bruk av kredittkort, rekvisisjon eller annen betalingsform skal det avtales med taxifører før turens start. Dersom det gjennom skilting i taxien, sentralens annonsering eller lignende fremgår at bestemte rekvisisjoner, betalings-/kredittkort aksepteres, plikter taxifører å akseptere disse.

Taxifører plikter ikke å veksle større seddelbeløp enn angitt i sentralens kjørereglement/sjåførinstruks. Kjøring i forbindelse med veksling av større beløp, belastes passasjer.

Taxifører plikter på anmodning å gi passasjer datert kvittering. I kvitteringen skal oppgis taxiførers navn, taxiens løyvenummer, passasjerens på- og avstigningssted samt øvrige opplysninger som er nødvendig til kontroll av at vederlaget er regnet i samsvar med gjeldende takstregulativ. I taxi med kvitteringsskrivende taksameter, skal dette benyttes ved utskrift av kvittering.

§ 9 Sikkerhet for betaling
Taxifører skal snarest og innen 24 – tjuefire – timer underrette taxisentralen om gjenstander mottatt som sikkerhet for betaling. Offentlige dokumenter som f. eks. pass og førerkort, aksepteres ikke som panteobjekt. Taxifører plikter å gi passasjeren kvittering på sentralens godkjente blankett for mottatt pant.

Pantekvittering skal være påført kjørerute, kjørebeløp, gebyr, tid og sted for tilbakelevering av pantet.

Gjeldsbrev, godkjent av taxisentralen, kan benyttes som et alternativ til pant i forbindelse med sikkerhet for betaling.

§ 10 Bagasje og lignende
Taxifører skal hjelpe til med å anbringe bagasje og annet i taxien. Fører kan avvise bagasje og annet som etter sitt omfang eller utforming ikke er egnet til å bli transportert i taxien.

Dersom den reisende ønsker å medbringe bagasje utover det som normalt kan påregnes medtatt i ordinær taxi, skal det opplyses til sentralen ved bestilling. Hvis mulig kan da sentralen formidle oppdraget til taxi tilpasset oppdragets art.

§ 11 Hittegods
Taxifører skal etter hver tur straks undersøke om noe er gjenglemt i taxien, slik at glemte saker kan bli levert tilbake til rette vedkommende med det samme.

Er dette ikke mulig, skal fører levere gjenstander gjenglemt i taxien på det av sentralens anviste sted innen 24 timer. Han plikter å dra forsvarlig omsorg for gjenstanden.

§ 12 Ansvar

a) Skade på person
Transportørens ansvar for skade på person under transport er nærmere regulert i bilansvarsloven. Transportøren skal ha forsikring i samsvar med de krav som lovgivningen bestemmer.

b) Bagasje og annet gods
Går håndbagasje eller ting som de reisende medbringer, helt eller delvis tapt, eller blir slike gjenstander skadd under reisen plikter transportøren å erstatte tapet eller skaden, dersom tapet eller skaden skyldes feil eller forsømmelser fra transportørens side.
For skade på og/eller tap av bagasje eller andre ting passasjeren medbringer, er transportørens ansvar begrenset til kr. 60,- pr. kg. av den del av godset som er gått tapt eller blir skadet.

c) Forsinkelse
Erstatningsplikt for forsinkelse oppstår når fremmøte eller tiden for å fullføre oppdraget, overskrider hva som etter omstendighetene må anses som rimelig. Ansvar foreligger ikke dersom forsinkelsen skyldes passasjeren eller omstendigheter som taxifører ikke kunne unngå og hvis følger han ikke kunne forebygge. Transportørens ansvar for forsinkelser er begrenset til transportens kostnader.

d) Den reisendes ansvar
Den reisende plikter å erstatte skader som ved forsett eller uaktsomhet påføres transportøren.

§ 13 Regler ved tvister
Tvist mellom den reisende og taxifører som ikke lar seg løse mellom partene, kan den reisende forelegge sentralen.

§ 14 Reklamasjon, frister og foreldelse
Den som vil kreve erstatning for tap må gi transportøren og/eller den sentralen hvor transportøren er tilsluttet, meddelelse uten ugrunnet opphold.
Krav om erstatning etter disse befordringsvedtekter, foreldes etter et år med mindre andre frister skal anvendes i medhold av annen lovgivning.

§ 15 Opplysning
Transportvilkårene skal, sammen med gjeldende takstregulativ, være tilgjengelig i taxien og forevises den reisende på forlangende.

Scan QR Code and order

Copyright © Voss Taxi

Telefon+4756511340

E-postpost@vosstaxi.no

AdresseVoss Taxi
Uttrågata 19
5700 Voss
Norway`
          }
        ]
      },
      {
        id: 'personvern-no',
        locale: 'no',
        slug: 'personvern',
        title: 'Personvern',
        summary: 'Vår personvernerklæring',
        blocks: [
          {
            type: 'rich_text',
            body: `Når du brukar Voss Taxi, gjev du oss tilgang til opplysningar om deg. Her kan du lesa kva opplysningar me samlar inn, korleis me gjer det og kva me brukar dei til.
Her finn du informasjon om korleis opplysningar om deg, og dine reiser behandlast i våre system. Elektroniske spor om deg knytt til våre tenester er trygge hjå oss, og me vil ikkje misbruka opplysningane dine. Voss Taxi vil behandla dine personopplysningar slik at du får ei enkel og god teneste. Drosjeselskapet er ansvarleg for dei personopplysningane som behandlast.

Formål

For å kunna tilby digital bestilling, førehandsbetaling og tilleggstenester via vosstaxi.no og VY-Appen, må me kunne lagra informasjon som regnast som personopplysningar

Gjennomføring av endringar

Me vil i blant kunna oppdatera Voss Taxis personvernerklæring for å gjenspeila endringar på nettstaden eller ved vår personvernerklæring. Ved større endringar vil me informera om dette via vår heimeside, eller du informerast ved neste gongs pålogging. I særlege tilfeller vil innlogga brukarar varslast direkte ved e-post eller varsel på SMS.

Kva lagrar me og kvifor

Delar av korttype og –nummer for betaling med kreditt- og bankkort: Me lagrar ikkje heile kortnummeret hjå oss, men delar av da lagrast når du registrerar det direkte i våre tenester. Dette lagrast i vår database slik at kunden skal kunna førehandsbetala og henta ut sine digitale kvitteringar etter endt tur. Visst opplysningane registrerast i tredjepartsløysningar, som for eksempel ved lagring av kort via VY-appen, henvisast kunden til tredjeparts eigne vilkår. https://www.vy.no/vilkar-og-personvern/personvern

Telefonnummer: Sjåførar kan bruka telefonnummer til å ta kontakt med kunde ved henting, eller om han eller ho finn gjengløymde ting i bilen. Me vil også bruka telefonnummer til å senda ut bekreftelsar på bestillingar, eller visst noko uforutsett har skjedd som har betydning for levering av tenester.

For- og/eller etternamn: Lagrast slik at me kan gje betre kundeservice om me treng å kontakta kunden, og for å gjera opplevinga med Voss Taxi meir personleg.

Start- og sluttadresser for turar: Brukast til å generera digitale kvitteringar.

Dato og klokkeslett for turar køyrd: Brukast til å generera digitale kvitteringar.

Karthistorikk: For å kunna henta favorittadresser for raskare bestilling.

GPS: Ved bestilling av tur brukast GPS-signal for å finna ut kvar kunden befinn seg (startadresse).

Utvikling av tenester

Me utviklar stadig våre tenester. Når me utviklar tilleggstenester på vosstaxi.no som inneber lagring av personopplysningar, vil me oppdatera desse vilkåra. Oppdaterte vilkår vil til ei kvar tid væra tilgjengeleg på web.

Kva er personopplysningar?

Personopplysningar er informasjon som kan knytast til ein person, for eksempel namn, bustad, telefonnummer, e-postadresse, IP-adresse.

Med personopplysning meiner me opplysningar som kan knytast til ein enkeltperson

Innstillingar for personopplysningar

Du kan begrensa lagring og behandling av opplysningar om deg. Våre tenester vil då ikkje i like stor grad være tilpassa deg.

Du kan når som helst endra databehandlinga som skjer i våre appar i telefonens innstillingar. Her kan du slå av og på varslingar og opne eller slå av sending av GPS-data til lokasjons teneste. Dette påverkar moglegheitene til å få personaliserte tenester og målretta annonsar.

Voss Taxi loggfører også data knytta til dei enkelte taxiturar.

I tillegg er da kun dei opplysningar som du sjølv oppgjev til oss igjennom appen, som lagrast. Me vil ikkje be om opplysningar som me ikkje treng for å kunna oppfylla våre forplittelsar ovanfor deg.

Dine personopplysningar vil ikkje verta brukt til andre føremål, eller verta utlevert til andre, med mindre du samtykkjer til slik utvida bruk.

Dersom du vel å registrera ein profil om deg sjølv i VY-appen, vil du sjølv kunna sjå, redigera og sletta dei personlege opplysningane som er lagra i” Min Profil”. Du må angje brukarnamn og passord for å få tilgang til desse opplysningane.

VY-Appen brukar fleire sikkerhetsteknologiar for å beskytta dine personopplysningar mot uautorisert tilgang, bruk eller vidareformidling.

Ved å kontakta oss kan du få innsyn i dine personopplysningar som er lagra hjå oss

Vy-Appen ryddar løpande i sine databasar. Opplysningar som ikkje lenger er relevante, vert automatisk sletta. Ved å kontakta oss kan du krevja at dine personopplysningar som er lagra hjå oss, vert sletta. I så fall tar me kun vare på opplysningar som me er pålagd av lov å oppbevara.

VY-Appen nyttar informasjonskapslar kun til å verifisera gyldig brukarkonto. Dersom du ønskjer å skreddarsy tenesta til dine spesifikke føremål og preferansar, kan du sjølv konfigurera ei rekkje parameter under «din profil».

Oppdaterte «Retningslinjer for personvern knytt til Voss Taxi» er til ei kvar tid tilgjengeleg på http://vosstaxi.no.

Nokon av våre tenester krevjer at kunden samtykkjer til brukarvilkår på grunn av tenestas omfang. Ved bruk av VY-appen må kunden godkjenna innhenting og lagring av personopplysningar ved fyrste oppstart. På VY.no godkjenner kunden innhenting av personopplysningar ved å registrera seg som brukar og bruke tenesta. Enkelte tenester vil ikkje fungera som tiltenkt utan aktivt samtykke, for eksempel stads tenester.

Alle data kunden sjølv fyller inn for å bruka våre tenester lagrast i vår kundedatabase. Voss Taxi har ikkje anledning til å bruka informasjonen ut over vårt formål. Alt krypterast for å sikra at kommunikasjonen mellom tenestene våre er så sikkert som overhode mogeleg.

Me har ikkje anledning til å lagra eller samla inn informasjon ut over det me har spesifisert i dette dokumentet. Endringar i kva me samlar inn vil bli meldt frå om på førehand.

Me har ingen kontroll over, eller ansvar for, tredjepartsprogramvare med tanke på personopplysningar. Me vil ikkje bruka tredjepartsløysningar som er allment kjend for å bryta personvernopplysningslova i Noreg. Me brukar blant anna Google Maps, Vipps. Vennlegast sjå opplysningar om personvern i desse appane.

Kva brukast informasjonen til?

Me jobbar heile tida for å gje deg ei tilpassa og god oppleving av Voss Taxi. Her er dei viktigaste føremåla me brukar personopplysningar til:

Levera tenestene du forventar av oss

Spara deg for tid og arbeid

Forstå markedstrender og behov

Rett til innsyn, retting og sletting

Kunden har rett til å krevje innsyn i dei registrerte opplysningane, samt rett til å krevje retting og sletting i henhold til personopplysningsloven. Ta kontakt på e-post for kundeservice: personvern@vosstaxi.no

Dersom kunde slettar sin profil vil også tilhøyrande personopplysningar slettast. Reisekvitteringar vil som følgje av detta væra anonyme, slik som før oppretta profil.

Behandlingsansvarleg &amp; Personvernombod

Voss Taxi har eit eiget personvernombud for å sikra ein trygg og god behandling av personopplysningar. Ordninga er initiert av Datatilsynet. Du kan kontakte Voss Taxis personvernombod på e-postadressa personvern@vosstaxi.no.

Kva reglar gjeld for handtering av personopplysningar?

Voss Taxi er ansvarleg for handteringa av personopplysningar som samlast inn ved bruk av våre tenester. Voss Taxi følgjer personopplysningsloven i behandlinga av personopplysningar.

Når du lar oss formidla personopplysningar til andre, vil desse ha eit sjølvstendig ansvar for vidare behandling av opplysningane.

Borns personvern

Me ynskjer ikkje å samla inn eller på annan måte behandla personopplysningar om born under 16 års alder.

Visst born under 16 år alikavel har gjett oss personopplysningar vil me sletta opplysningane så snart me vert oppmerksame på forholdet. Føresette kan kontakta oss som angitt nedanfor.

Sletting av personopplysningar

Me lagrar ikkje personopplysningar lenger og i større grad enn da som er nødvendig for å oppfylle formålet med behandlinga med mindre det er lovpålagt, for eksempel gjennom regnskapsloven. Me har omfattande rutinar for sletting og anonymisering. Du kan sjølv be om å få fjerna opplysningar frå din brukarprofil.

Hovudregelen er at personopplysningar lagrast maksimalt i to år. Kor fort opplysninger vert sletta kan variere.

Innsyn i lagra personopplysningar

Ved ynskje om innsyn i kva slags opplysningar me har om deg, vennligst fyll ut vedlagt skjema og send dette til personvern@vosstaxi.no.Personvern skjema

Scan QR Code and order

Copyright © Voss Taxi

Telefon+4756511340

E-postpost@vosstaxi.no

AdresseVoss Taxi
Uttrågata 19
5700 Voss
Norway`
          }
        ]
      }
    ],
    services: [
      {
        id: 'service-no-1',
        locale: 'no',
        title: 'UT Å FLY',
        description: 'Skal du ut å fly så køyrer me og til og i frå Flesland Lufthavn. Ring eller send oss ein mail for meir informasjon og fastpris.',
        capacity: '1-16 passasjerar',
        sort: 1,
      },
      {
        id: 'service-no-2',
        locale: 'no',
        title: 'RULLESTOL',
        description: 'Voss Taxi har ein variert bilpark med plass til samanleggbare rullestolar, men ved behov for å ha med elektrisk rullestol, eller behov for å sitte i rullestolen under transport har me to 16 setar MaxiTaxiar med plass til 2 brukarar samtidig. Samt 3 stk 8 setar rullestolbil, alle med rampe for lett ombordstigning.',
        capacity: 'Inntil 2 rullestolar',
        sort: 2,
      },
      {
        id: 'service-no-3',
        locale: 'no',
        title: 'HITTEGODS',
        description: 'Har du mista noko? Ta kontakt med oss. Me får stadig inn mobilar, hanskar, huer, vesker, briller, skjerf og paraplyar. Alle gjenstandar som vert funne i våre bilar vert bevart på sentralen vår.',
        capacity: '',
        sort: 3,
      },
      {
        id: 'service-no-4',
        locale: 'no',
        title: 'BORN I BIL',
        description: 'Me har barnestolar med IsoFix og støttebase for born i alle aldrar. I tillegg har me eit breitt utval i belteputer og beltestolar.',
        capacity: '',
        sort: 4,
      },
      {
        id: 'service-no-5',
        locale: 'no',
        title: 'SYKKEL?',
        description: 'Me har og moglegheit for å ta med sykkel. Vennligst opplys om dette på førehand, så tek me med oss stativ.',
        capacity: '',
        sort: 5,
      },
      {
        id: 'service-no-6',
        locale: 'no',
        title: 'FØRARHUND',
        description: 'Alle våre bilar og sjåførar tar med seg hund.',
        capacity: '',
        sort: 6,
      },
    ];