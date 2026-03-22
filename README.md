# Vintest Live

En lokal webbapp for en vinprovning med flera spelare. Varden skapar en session, spelare ansluter med sina telefoner, gissar pa tre viner och ser sedan leaderboard samt roliga sammanfattningsstats.

Projektet ar byggt som en enkel statisk webbapp:

- `index.html`
- `styles.css`
- `game.js`

Ingen byggkedja eller `npm install` behovs. Appen anvander Firebase Realtime Database for flerspelarstod och laddar Firebase via CDN.

## Funktioner

- Flerspelarsession med sessionkod
- Upp till flera samtidiga spelare pa egna telefoner
- Tre vin per provning
- Gissning av:
  - fyllighet
  - stravhet
  - fruktsyra
  - doft och smak
  - land
  - distrikt via karta
- Egna anteckningar per vin
- Personlig vinranking med slider och vinglas
- Spara utkast per vin innan slutlig submit
- Slutlig submit som laser svaren
- Leaderboard och host-stats efter submit
- Standardviner fran Systembolaget
- Mojlighet att lasa in vin via Systembolaget-lank

## Projektstruktur

```text
/Users/felixkahrstrom/Wine game
├── index.html
├── styles.css
├── game.js
└── README.md
```

## Krav

- En modern webblasare
- Internetuppkoppling
- Ett Firebase-projekt med Realtime Database aktiverat
- Python 3 om du vill starta en enkel lokal webbserver med `python3 -m http.server`

## Snabbstart

1. Oppna Terminal.
2. Ga till projektmappen:

```bash
cd "/Users/felixkahrstrom/Wine game"
```

3. Starta en lokal server:

```bash
python3 -m http.server 8080
```

4. Oppna appen i webblasaren:

- Pa datorn: `http://localhost:8080`
- Pa mobilen pa samma Wi-Fi: `http://DIN-LOKALA-IP:8080`

Exempel:

```text
http://192.168.0.152:8080
```

## Om du far 404

Det betyder oftast att servern startades fran fel mapp.

Kontrollera detta innan du startar servern:

```bash
cd "/Users/felixkahrstrom/Wine game"
pwd
ls
```

Du ska se:

- `/Users/felixkahrstrom/Wine game`
- `index.html`
- `game.js`
- `styles.css`

Starta sedan servern igen:

```bash
python3 -m http.server 8080
```

## Forsta gangen: koppla till Firebase

Appen anvander Firebase Realtime Database for att synka:

- spelare
- vin
- sparade utkast
- submissions
- leaderboard
- stats

### 1. Skapa Firebase-projekt

1. Ga till Firebase Console.
2. Skapa ett nytt projekt.
3. Hoppa over Analytics om du vill.

### 2. Aktivera Realtime Database

1. Oppna `Realtime Database`.
2. Valt `Create Database`.
3. Valj region, helst i Europa.
4. Borja i `test mode` om du bara ska kora privat.

Obs: `test mode` ar bra for snabb uppstart, men ar inte en bra slutlig sakerhetsinstallation.

### 3. Skapa en Web App i projektet

1. Gå till `Project settings`.
2. Under `Your apps`, klicka pa webbikonen `</>`.
3. Registrera appen.
4. Kopiera konfigurationsobjektet.

Det ser ut ungefar sa har:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### 4. Klistra in konfigurationen i `game.js`

Oppna filen:

- [game.js](/Users/felixkahrstrom/Wine game/game.js)

Langst upp finns:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
```

Byt ut varden med din egen Firebase-konfiguration.

Obs:

- `measurementId` ar inte kritisk for spelet
- `databaseURL` maste vara korrekt for att multiplayer ska fungera

### 5. Testa anslutningen

1. Starta servern.
2. Oppna appen.
3. Valj `Jag ar vard`.
4. Om sessionen skapas och du far en kod fungerar databasen.

## Hur man anvander appen

### Som vard

1. Oppna appen pa datorn.
2. Klicka `Jag ar vard`.
3. En ny session skapas automatiskt.
4. Dela sessionkoden med spelarna.
5. Kontrollera de tre vinerna i vardpanelen.
6. Starta provningen.
7. Nar alla har submitat, visa resultat och las stats.

### Som spelare

1. Oppna samma URL pa mobilen.
2. Klicka `Jag ar spelare`.
3. Ange namn och sessionkod.
4. Gissa pa varje vin.
5. Spara andringar om du vill komma tillbaka senare.
6. Nar du ar klar, klicka `Submit`.
7. Bekrafta i popupen.

Efter submit:

- svaren blir lasta
- leaderboard visas

## Standardviner

Projektet startar med tre standardviner fran Systembolaget:

- `Zecci Valpolicella Ripasso Superiore`
- `Alain Jaume Grand Veneur Organic Reserve`
- `Baron de Ley Reserva`

Lankar:

- [Zecci](https://www.systembolaget.se/produkt/vin/zecci-7418901/)
- [Alain Jaume](https://www.systembolaget.se/produkt/vin/alain-jaume-7203401/)
- [Baron de Ley](https://www.systembolaget.se/produkt/vin/baron-de-ley-252501/)

## Lasa in andra viner via Systembolaget-lank

I vardpanelen finns ett falt for `Systembolaget-lank`.

Flode:

1. Klistra in en produktlank.
2. Klicka `Las fran Systembolaget-lank`.
3. Kontrollera att namn, omrade, klockor och smakprofil ser rimliga ut.
4. Klicka `Spara`.

Obs:

- De tre standardvinerna har handjusterad data i projektet
- Ovriga lankar bygger pa en enklare parser och kan behova manuell justering

## Multiplayerlogik

Spelet anvander tre viktiga datanivåer:

- `drafts`
  - sparade utkast per spelare och vin
- `submissions`
  - slutligt inlamnade svar
- `scores`
  - beraknade poang och leaderboard

Unsaved lokal input ska inte skrivas over av andra spelares sparningar. Projektet har lokal draft-cache for detta i klienten.

## Resultat och stats

Efter submit visar appen:

- leaderboard
- poang per spelare
- fun stats, till exempel:
  - publikfavorit
  - basta gissningarna
  - kvallens luring
  - mest debatt
  - ursprungsnasor

## Om du vill pusha projektet till GitHub

Exempel:

```bash
cd "/Users/felixkahrstrom/Wine game"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DITT_NAMN/DITT_REPO.git
git push -u origin main
```

## Underhall

Det har README-dokumentet ska hallas uppdaterat nar projektet andras.

Min arbetsregel for det har projektet framover:

- om startflode andras, uppdatera `Snabbstart`
- om Firebase-flode andras, uppdatera `Forsta gangen: koppla till Firebase`
- om nya funktioner laggs till, uppdatera `Funktioner`
- om resultatlogik eller statistik andras, uppdatera `Resultat och stats`

## Felsokning

### Sidan laddar inte pa mobilen

Kontrollera:

- att dator och mobil ar pa samma Wi-Fi
- att servern kor
- att du anvander ratt lokal IP
- att brandvaggen inte blockerar anslutningen

### Firebase fungerar inte

Kontrollera:

- att `firebaseConfig` i `game.js` ar korrekt
- att `Realtime Database` ar skapad
- att `databaseURL` stammer
- att databasen tillater las/skrivning for testet

### Appen visar konstiga multiplayerfel

Borja med att kontrollera:

- att varje spelare anvander sin egen enhet
- att sidan ar omladdad efter nya kodandringar
- att gamla sessioner inte ateranvands i onodan

## Nasta mojliga forbattringar

- Riktiga SVG-landkonturer for annu exaktare karta
- Firebase Hosting for publik lank
- Export av resultat
- Tydligare hostkontroll for nar alla submitat
- Fler statistikvyer och sammanfattningar
