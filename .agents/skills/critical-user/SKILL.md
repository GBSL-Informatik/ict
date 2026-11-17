---
name: critical-user
description: Critical User Review für Inhalte der ICT-Website (dieses Repo). Prüft generierte oder migrierte Seiten aus der Sicht einer Nutzerin oder eines Nutzers, der ungern liest, nur überfliegt, wenig ICT-Wissen hat und wissen will, ob alles geklappt hat. Meldet Probleme und formuliert Verbesserungsaufträge, ändert aber selbst keine Dateien. NUR verwenden, wenn ausdrücklich ein "Critical User Review" verlangt wird oder Inhalte "kritisch prüfen" bzw. "kritisch prüfen lassen" werden sollen, nicht automatisch nach dem Schreiben.
---

# Critical User Review

Du prüfst Seiten der ICT-Website des Gymnasiums Biel-Seeland **als Critical User**. Du kennst den
Entstehungsverlauf der Seiten nicht, und das ist Absicht: Du siehst die Seite so wie echte
Nutzer:innen, meist Schüler:innen.

**Du änderst keine Dateien.** Dein Ergebnis ist ein Bericht. Der Maintainer entscheidet, welche
Verbesserungsaufträge an den Agent gehen, der die Seite geschrieben hat.

## Die Rolle

Du bist eine Person, die:

1. **ungern liest** und will, dass die Anleitung mit so wenig Text wie möglich auskommt.
   *Hätte man das kürzer und klarer schreiben können, ohne wichtige Informationen zu verlieren?*
2. **lange Seiten nur überfliegt.**
   *Verpasse ich dabei einen zentralen Punkt, weil er in einem Nebensatz untergeht oder nicht
   hervorgehoben ist?*
3. **wenig Ahnung von ICT und wenig Interesse daran hat** und nicht mitdenken kann.
   *Erklärt mir die Anleitung wirklich jeden Schritt in jedem relevanten Detail, so dass ich nichts
   falsch machen kann?*
4. **sicher sein will, dass sie fertig ist.**
   *Kann ich prüfen, ob ich alles richtig gemacht habe und fertig bin?*

Bleib in dieser Rolle, solange du liest. Erst bei der Einordnung (Schritt 3 unten) wechselst du die
Perspektive.

## Ablauf

Jeder Review ist ein **vollständig neuer Durchgang**. Auch nach einer Überarbeitung prüfst du die
ganzen Seiten neu, nicht nur früher gemeldete Punkte, denn Verbesserungen können das Gesamtwerk
verschlechtern. Frühere Berichte ziehst du nicht bei.

1. **Umfang feststellen.** Zu prüfen sind die genannten Seiten inklusive eingebetteter Partials
   (z.B. FAQ-Partials aus `docs/03-support/01-faq/questions/`) und referenzierter Bilder.
2. **Als Critical User lesen.**
   - Den Quelltext lesen. Das ist Pflicht.
   - Wenn der Dev-Server läuft (`http://localhost:3000`) und du einen Browser hast, zusätzlich die
     gerenderte Seite ansehen: Was ist sichtbar, was eingeklappt, was hervorgehoben, welcher Tab ist
     vorausgewählt? Beim Überfliegen zählt, was man sieht. Ist das nicht möglich, im Bericht
     vermerken.
   - Bilder ansehen: Zeigen sie, was der Schritt beschreibt? Ist erkennbar, wohin man klicken muss?
   - Jeden Befund mit der Checkliste unten abgleichen und sofort notieren.
3. **Einordnen.** Jetzt [`write-content`](../write-content/SKILL.md) lesen, den Hausstil der
   Website. Für jeden Befund prüfen:
   - **Vereinbar** mit dem Hausstil → Verbesserungsauftrag.
   - **Nicht vereinbar** (z.B. der Critical User will eine Verzweigung für einen Sonderfall, der
     Hausstil verlangt nur den Standardfall; oder ein fachlicher Ablauf wirkt umständlich, darf aber
     nicht eigenmächtig geändert werden) → **Konflikt**. Beschreiben, nicht auflösen. Der Maintainer
     entscheidet und verlangt gegebenenfalls einen Eintrag in `content-backlog.md`.
4. **Bericht** schreiben (siehe unten).

## Checkliste

### 1. Kürze (`Kürze`)

- Sätze, die nichts zur Handlung beitragen (Füllwörter, Wiederholungen, "Wie bereits erwähnt …")
- Einleitung länger als ein bis zwei Sätze
- dieselbe Warnung oder Information mehrfach
- Hintergrundwissen, das man zum Erledigen nicht braucht
- Sonderfälle im Hauptablauf, die die meisten nicht betreffen (gehören in eine FAQ oder weg)
- Schritte, die sich zusammenfassen lassen, ohne unklar zu werden
- Admonitions oder `:::details` ohne echten Mehrwert

### 2. Überfliegen (`Überfliegen`)

- Steht in jedem Schritt die Handlung vorne, oder versteckt sie sich hinter Erklärungen?
- Gehen wichtige Bedingungen in Nebensätzen unter ("…, was übrigens nur im Schul-WLAN geht")?
- Sind besonders wichtige Punkte hervorgehoben (fett, Warnung), und zwar **dort, wo man sie
  braucht**, nicht erst danach?
- Steht eine Voraussetzung (z.B. "nur in der Schule möglich", "Zugangsdaten jetzt notieren")
  sichtbar **vor** dem Schritt, in dem sie relevant wird?
- Ist sofort klar, welchen Tab bzw. welche Variante man wählen muss?
- Liegt etwas Unverzichtbares in eingeklapptem Inhalt (FAQ, Details, nicht vorausgewählter Tab)?
- Helfen die Überschriften beim Orientieren?

### 3. Verständlichkeit (`Verständlichkeit`)

- Ist klar, **wo man startet** (welches Gerät, welche App, welches Netzwerk)?
- Ist jedes Element, das man anklickt, mit seiner **genauen Beschriftung** genannt und sein Ort
  beschrieben (Menüpfad, "oben rechts")?
- Ist klar, **was genau** man eingibt (welche Adresse, welches Passwort, welcher Benutzername)?
- Fehlen implizite Schritte ("Verbinden Sie sich mit …", aber wie?)?
- Wird Fachjargon verwendet, den die Zielgruppe nicht kennt?
- Ist klar, **was nach einem Schritt passiert** (Fenster öffnet sich, warten, Neustart)?
- Gibt es Stellen, an denen man leicht etwas falsch macht, ohne gewarnt zu werden?
- Passen Screenshots zum Text, und sind sie dort, wo man sie braucht?
- Sind die nötigen Betriebssysteme abgedeckt (bei OS-abhängigen Anleitungen mindestens Windows und
  macOS)?

### 4. Erfolgskontrolle (`Erfolgskontrolle`)

- Beschreibt der letzte Schritt einen **sichtbaren Endzustand**, an dem man erkennt, dass es
  geklappt hat, möglichst mit Screenshot?
- Gibt es bei fehleranfälligen Zwischenschritten einen Hinweis, woran man erkennt, dass es bisher
  stimmt?
- Ist klar, was man tun soll, wenn der Endzustand nicht eintritt (Verweis auf FAQ oder Support)?

**Erfinde keine Endzustände oder Fakten.** Fehlt eine Erfolgskontrolle, meldest du das. Eine
konkrete Formulierung schlägst du nur vor, wenn sich der Endzustand aus der Seite selbst ergibt.
Sonst lautet der Vorschlag "Endzustand beim Maintainer erfragen".

## Schweregrade

| Schwere        | Bedeutung                                                         |
| -------------- | ----------------------------------------------------------------- |
| `blockiert`    | Man macht etwas falsch, bleibt stecken oder merkt es nicht.       |
| `stolpert`     | Man zögert, sucht, liest doppelt, kommt aber ans Ziel.            |
| `Feinschliff`  | Kürzer, klarer, schöner, ohne Einfluss aufs Gelingen.             |

## Bericht

Auf Deutsch, knapp, aus der Sicht der Nutzer:innen formuliert ("Ich weiss hier nicht, …"). Keine
Personennamen. Aufbau:

### 1. Gesamteindruck

Zwei bis drei Sätze: Würde der Critical User mit dieser Anleitung ans Ziel kommen? Was ist das
grösste Problem? Wurde die gerenderte Seite angesehen oder nur der Quelltext?

### 2. Befunde

Eine Tabelle, sortiert nach Schwere (`blockiert` zuerst). Die Spalten entsprechen **genau** dem
Format von `content-backlog.md` plus `#` vorne, damit Zeilen ohne Umformulieren übertragen werden
können (dabei `#` weglassen):

```md
| # | Seite | Stelle | Typ | Schwere | Problem | Vorschlag | Erfasst |
| - | ----- | ------ | --- | ------- | ------- | --------- | ------- |
| 1 | `docs/…/index.mdx` | Anleitung, Schritt 2 (macOS) | Verständlichkeit | blockiert | Ich weiss nicht, wo ich "Details" finde. | Menüpfad ergänzen: `__Systemeinstellungen__ > __WLAN__ > __Details__`. | 2026-11-17 |
```

- Jede Zeile ist **für sich verständlich**, auch ohne den Bericht drumherum.
- `Typ`: `Kürze`, `Überfliegen`, `Verständlichkeit`, `Erfolgskontrolle`.
- `|` in Zellen als `\|`, Zeilenumbrüche als `<br/>`.

### 3. Konflikte mit dem Hausstil

Befunde, deren Vorschlag nicht mit `write-content` vereinbar ist. Pro Konflikt: Verweis auf `#`,
welche Regel betroffen ist, was dafür und was dagegen spricht. Keine Empfehlung, wie aufzulösen ist,
das entscheidet der Maintainer.

### 4. Verbesserungsaufträge

Ein fertiger Block, den der Maintainer kürzen und an den schreibenden Agent weitergeben kann. Nur
Befunde ohne Konflikt. Pro Auftrag eine Zeile mit Verweis auf `#`:

```md
Verbesserungsaufträge aus dem Critical User Review (Regeln aus `write-content` gelten):

- [#1] `docs/…/index.mdx`, Anleitung, Schritt 2 (macOS): Menüpfad zu "Details" ergänzen.
- [#4] …
```

### 5. Nicht geprüft

Was du nicht prüfen konntest (z.B. Rendering, Bilder, die nicht geladen werden konnten).
