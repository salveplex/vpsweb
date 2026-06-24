# Android wrapper for Taxiportalen Board

Dette prosjektet kan ikkje pakkast som ei rein offline webapp fordi `index.php` gjer serverside-innlogging mot Taxiportalen. Android-løysinga her er derfor ein liten native `WebView`-app som lastar den deploya board-sida di.

## Kvar ligg appen?

Android-prosjektet ligg i:

- `android-wrapper/`

## Før du bygger

1. Deploy `taxiportalen-board` til eit subdomene eller ein server som køyrer PHP.
2. Opne `android-wrapper/app/build.gradle.kts`.
3. Byt ut:

```kotlin
buildConfigField("String", "BOARD_URL", "\"https://board.example.com/\"")
```

med den faktiske URL-en din, til dømes:

```kotlin
buildConfigField("String", "BOARD_URL", "\"https://board.dittdomene.no/\"")
```

## Bygg i Android Studio

1. Opne `android-wrapper` i Android Studio.
2. La Android Studio installere Android SDK, JDK og Gradle-komponentar om du blir spurd.
3. Bygg appen eller generer APK/AAB frå Android Studio.

## Kva appen støttar

- viser boardet i `WebView`
- pull-to-refresh
- reload-knapp i toppen
- tilbakeknapp inne i webhistorikk
- enkel feilmelding dersom URL manglar eller sida ikkje lastar
