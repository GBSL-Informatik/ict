---
name: write-content
description: Verfassen und Überarbeiten von Inhalten für die ICT-Website des Gymnasiums Biel-Seeland (dieses Repo, teaching-dev-Fork, ict.gbsl.website). Verwenden, wenn ein Maintainer eine neue Anleitung, Seite oder FAQ schreiben, eine bestehende Seite überarbeiten, kürzen oder neu gliedern, Screenshots einbinden oder OS-spezifische Schritte (Windows, macOS, iOS, Android) ergänzen will, oder wenn eine Seite einen `## CLAUDE`-Abschnitt mit einem Schreibauftrag enthält. Definiert Hausstil, Seitenaufbau, Komponenten-Konventionen und harte Regeln. Für die Übernahme von Seiten aus der alten Website zusätzlich den Skill `migrate-legacy-content` verwenden.
---

# Inhalte für die ICT-Website verfassen

Die ICT-Website dokumentiert die IT-Infrastruktur des Gymnasiums Biel-Seeland: Konten, MFA, WLAN,
Software, Support. Sie wird von mehreren Lehrpersonen betreut. Der Maintainer entscheidet über
Inhalt und Struktur. Du entwirfst, prüfst und überarbeitest auf Rückmeldung.

Dieser Skill betrifft **ausschliesslich Content**. Er setzt keine anderen Skills oder lokalen
Werkzeuge voraus.

## Ablauf

1. **Auftrag aufnehmen.** Der Maintainer beschreibt den Auftrag im Chat oder in einem
   `## CLAUDE`-Abschnitt auf der vorbereiteten Seite (`grep -rn "^## CLAUDE" docs`). Sind Ziel,
   Zielort oder fachlicher Ablauf unklar, frag nach, bevor du schreibst.
2. **Umfeld lesen.** Schau dir verwandte Seiten in `docs/` und die FAQ-Seite
   `docs/03-support/01-faq/index.mdx` an. Bestehende Seiten sind das Vorbild für den Stil. Wo sie
   diesem Skill widersprechen, gilt der Skill.
3. **Schreiben** nach den Regeln unten.
4. **Prüfen** (siehe [Prüfung](#prüfung)).
5. **Bericht** an den Maintainer (siehe [Bericht](#bericht)). Danach überarbeitest du gezielt
   nach Rückmeldung. **Du committest nie.** Der Maintainer prüft und committet selbst.

## Harte Regeln

- **Keine Personennamen von Maintainern** im Content, in Kommentaren, im Backlog oder in Berichten.
- **Fachliche Abläufe nicht selbst erfinden oder korrigieren.** Die Schritte kommen vom Maintainer
  oder aus der Vorlage. Hältst du einen Ablauf für veraltet, falsch oder umständlich (z.B. weil ein
  Betriebssystem das heute anders löst), übernimmst du ihn unverändert und trägst den Vorschlag in
  [`content-backlog.md`](../../../content-backlog.md) ein (siehe [Backlog](#backlog)). Dasselbe gilt
  für Fakten, die du nicht prüfen kannst (URLs, Fristen, Namen von Diensten).
- **Konsequent siezen.** Findest du im bestehenden Content ausserhalb deines Auftrags die Du-Form,
  korrigierst du sie nicht, sondern meldest sie mit Pfad und Zeile.
- **Deutsch (CH):** `ss`, nie `ß`. **Anführungszeichen: ASCII `"`**, keine `«»`, `„“` oder `“”`.
- **`## CLAUDE`-Abschnitte bleiben stehen.** Der Maintainer entfernt sie, wenn die Seite fertig
  ist.
- **Frische UUIDs, immer** (`uuidgen | tr A-Z a-z`, unter Windows
  `node -e "console.log(crypto.randomUUID())"`): `page_id` jeder neuen Seite und jede `id`
  interaktiver Dokumente. Nie IDs kopieren, denn sie identifizieren gespeicherte Daten der
  Nutzer:innen (IndexedDB).
- **Kein Scope Creep.** Nur die Seiten des Auftrags bearbeiten. Ausnahme: FAQ-Partials und ihr
  Einbinden auf der FAQ-Seite (siehe [FAQ](#faq)). Fehler anderswo meldest du.
- **Upstream-Pfade sind tabu.** Dieses Repo ist ein Fork von
  [teaching-dev](https://github.com/GBSL-Informatik/teaching-dev). `yarn updateTdev` überschreibt
  alles, was in `updateTdev.config.yaml` unter `trackedElements` steht (u.a. `src/` mit Ausnahmen,
  `packages/tdev/`, `updateSync/`, `docusaurus.config.ts`). Eigener Code gehört nach `website/`
  (überschreibt `src/` über die Pfad-Aliase `@tdev-components/*` usw.), `packages/ict/` oder
  `siteConfig.ts`.
- **Neue Komponenten nur auf Entscheid des Maintainers.** Sie kommen nach
  `website/components/<Name>/` und werden auf der Seite explizit importiert. Global registriert
  (in `src/theme/MDXComponents.tsx`, wird nicht von tdev überschrieben) werden sie nur auf
  Anweisung.

## Hausstil

Zielgruppe sind in erster Linie **Schüler:innen**. Hinweise für Lehrpersonen dürfen bleiben, kurz
gehalten (z.B. "Lehrpersonen: `vorname.name@gbsl.ch`").

**So wenig Text wie möglich, so viel wie nötig.**

- **Der Standardfall zuerst und allein.** Eine Anleitung beschreibt die Schritte, die in etwa 90 %
  der Fälle zum Ziel führen. Wer keine Probleme hat, liest keine "Wenn dies, dann das"-Texte.
  Verzweigungen gibt es nur, wenn es keinen einzelnen Standardfall gibt und mehrere Fälle
  zwangsläufig abgedeckt werden müssen (z.B. Betriebssysteme).
- **Zu erwartende Probleme:**
  - In eine **FAQ**, wenn sie dort realistisch einen Mehrwert bringt, d.h. Nutzer:innen suchen auch
    unabhängig von dieser Anleitung nach der Antwort.
  - Sonst als **`:::warning`** oder **`:::danger`** direkt beim betroffenen Schritt.
  - Im Zweifel den Maintainer fragen.
- **Sinnvolle Zusatzinformationen** ("Ist mein Gerät gefährdet, wenn …?", "Muss ich … erlauben?")
  gehören in eine **FAQ, die in die Anleitung eingebettet** wird. Im Zweifelsfall den Maintainer fragen, 
  ob die Information wichtig genug ist oder weg gelassen werden kann.
- **Unnötige Zusatzinformationen** ("Fun Facts", z.B. "Was ist eine MAC-Adresse?") gehören nicht
  auf die Seite.
- **Admonitions und `:::details` sparsam**, nur bei realem Mehrwert. Eine Warnung steht einmal, an
  der Stelle, wo sie gebraucht wird.

### Formulierungen

- Schritte im **Infinitiv**: "Die Schul-E-Mail-Adresse eingeben und auf __Weiter__ klicken." Der
  Imperativ ("Öffnen Sie …") ist erlaubt, wenn der Infinitiv zu umständlich würde.
- Einleitungen, Hinweise und FAQ-Antworten in ganzen Sätzen mit Sie.
- UI-Elemente fett mit Unterstrichen: `__Einstellungen__`. Menüpfade:
  `__Einstellungen__ > __Netzwerk und Internet__ > __WLAN__`.
- Eingaben, Adressen, Dateinamen als Code, wenn sie wörtlich übernommen werden: `vorname.name@edu.gbsl.ch`.
- Icons im Text mit `:mdi[wifi]` (Remark-MDI-Plugin), Tasten mit `[[Ctrl]]` (Remark-KBD-Plugin).

## Seitenaufbau

```mdx
---
page_id: <frische uuid>
sidebar_custom_props:
    icon: mdiWifi
---

import FaqProblem from '@site/docs/03-support/01-faq/questions/_problem.mdx';
import FaqFrage from '@site/docs/03-support/01-faq/questions/_frage.mdx';

# Titel

Ein Satz zum Ziel ("Mit dieser Anleitung verbinden Sie …"). Keine Zusammenfassung der Schritte.

## Anleitung

<Steps>
    1. Erster Schritt im Infinitiv.
       ![--width=400px](images/erster-schritt.png)
    2. Zweiter Schritt.
</Steps>

## Problemlösungen

<FaqProblem />

## Häufige Fragen

<FaqFrage />
```

- **Eingebettete FAQs aufteilen:** Troubleshooting ("Es klappt nicht, was tun?") unter
  `## Problemlösungen`, Zusatzinformationen ("Muss ich …?", "Ist … gefährdet?") danach unter
  `## Häufige Fragen`. Abschnitte ohne Inhalt weglassen.

- Pfad: `docs/<NN-bereich>/<NN-thema>/index.mdx`. Die Zahlenpräfixe bestimmen die Reihenfolge.
  Bilder in `images/` neben der Seite.
- **Anleitungen bestehen aus `<Steps>`**, nicht aus Fliesstext und nicht aus `<ProgressState>`.
  Inhalt innerhalb von JSX-Tags wird eingerückt (siehe bestehende Seiten).
- Sidebar-Icons: Material Design Icons in camelCase (`mdiShieldLockOutline`).
- Die Version `onboarding` (`versioned_docs/version-onboarding/`) wird beim Build aus `docs/`
  erzeugt (`onboarding-sidebar.yml`). **Nie `versioned_docs/` bearbeiten.**
  `onboarding-sidebar.yml`, Weiterleitungen in `siteConfig.ts` und neue Bereiche nur auf Anweisung.

### Betriebssysteme

- Ist eine Anleitung vom Betriebssystem abhängig, braucht es **immer Windows 11 und macOS**, jeweils
  in der beim Schreiben aktuellsten Version. Mobile Betriebssysteme (iOS, Android) kommen dazu, wenn
  das Thema sie betrifft oder die Vorlage sie enthält.
- Differenzierung mit Tabs, **immer mit diesen Werten**, damit die Auswahl seitenübergreifend
  synchron bleibt:

  ```mdx
  <Tabs groupId="os" queryString>
      <TabItem value="win" label="Windows">…</TabItem>
      <TabItem value="macos" label="macOS">…</TabItem>
      <TabItem value="ios" label="iOS">…</TabItem>
      <TabItem value="android" label="Android">…</TabItem>
  </Tabs>
  ```

  Bestehende Abweichungen (z.B. `value="osx"`) meldest du, ohne sie zu korrigieren.
- **Nur differenzieren, was sich unterscheidet.** Gemeinsame Schritte stehen einmal ausserhalb der
  Tabs. Unterscheiden sich nur einzelne Schritte, stehen die Tabs **innerhalb dieser Schritte**.
  Ist der ganze Ablauf verschieden, enthalten die Tabs je eigene `<Steps>`.
- **Der Lesefluss geht vor.** Würde eine Schritt-für-Schritt-Anleitung durch Tab-Selektoren
  auseinandergerissen (z.B. Tabs in mehreren Schritten hintereinander, oder die Nummerierung reisst
  ab), stehen die ganzen `<Steps>` pro OS im Tab. Die Duplikation gemeinsamer Schritte wird dann
  in Kauf genommen.

### FAQ

- Jede FAQ ist ein Partial in `docs/03-support/01-faq/questions/_<slug>.mdx`. Bilder dazu liegen in
  `docs/03-support/01-faq/questions/images/`. Format:

  ```mdx
  <Faq>
      #### Frage als ganzer Satz?
      <Solution>
          Kurze Antwort.
      </Solution>
  </Faq>
  ```

- Die FAQ wird in die Anleitung eingebettet (Import mit `@site/docs/03-support/01-faq/questions/…`,
  wie auf bestehenden Seiten) **und** auf der FAQ-Seite `docs/03-support/01-faq/index.mdx` unter
  einer passenden Überschrift eingebunden. Gibt es keine passende, darfst du eine neue `##`-Überschrift
  anlegen.
- **Keine Admonitions (`:::warning` usw.) in `<Solution>`**, sie werden dort nicht sauber
  gerendert. Wichtiges stattdessen fett hervorheben (z.B. `**Achtung:** …`).
- Bestehende FAQs zuerst prüfen und wiederverwenden statt duplizieren. Bei Bedarf den Maintainer fragen, ob
  eine bestehende FAQ ergänzt oder angepasst werden darf.

### Links

- Interne Links relativ auf die `.mdx`-Datei.
- **Externe Links, die sich ändern können** (SharePoint-/EDUBERN-PDFs, Portale, Formulare, URLs mit
  IDs), kommen zentral in `docs/link-mappings.yaml` und werden mit `@` referenziert:
  `[Anleitung MFA ohne Handy](@mfa-ohne-handy)`. Zuerst prüfen, ob es den Schlüssel schon gibt.
  Neue Schlüssel sind sprechend und in kebab-case. Stabile Links (z.B. `https://www.gbsl.ch`)
  dürfen direkt im Text stehen.
- **Kontaktadressen und ähnliche veränderliche Werte** (E-Mail-Adressen, Telefonnummern,
  Absendernummern usw.) werden **nie ausgeschrieben**, sondern immer über Schlüssel in
  `i18n/de/code.json` eingebunden:
  - `<TLink id="support.students.email" />`: klickbarer Link (`mailto:`/`tel:` wird automatisch
    erkannt). Optional `protocol`, `suffix` (z.B. `?subject=…`), `newTab` oder ein eigener Linktext
    als Inhalt.
  - `<T id="mfa.sms-sender.phone" />`: Wert als reiner Text.

  Zuerst in `i18n/de/code.json` nach einem passenden Schlüssel suchen. Fehlt er, legst du ihn an
  (Schema `<bereich>.<thema>.<art>`, z.B. `support.students.email`; bei Bedarf mit
  `description`) und nennst ihn im Bericht.

### Bilder

- Dateinamen in **kebab-case ohne Umlaute und Leerzeichen**, sprechend:
  `macos-private-wlan-adresse.png`.
- Grösse mit `![--width=400px](images/x.png)`. Eine Bildunterschrift kommt in den Alt-Text, wenn sie
  nötig ist und eine sinnvolle Zusatzinformation liefert.
- **Kleine UI-Ausschnitte** (Buttons, Menüeinträge) kompakt und gleich hoch nebeneinander, ohne Cards:

  ```md
  :::flex
  ::br{.noFlex}
  ![--height=40px --width=auto](images/button-a.png)
  ::br{.noFlex}
  ![--height=40px --width=auto](images/button-b.png)
  :::
  ```
- **Screenshots enthalten kein eingebranntes Markup.** Markierungen (Rahmen, Pfeile) ergänzen die
  Maintainer im eingebauten Excalidraw-Editor (Dev-Server, lokaler Dateizugriff). Dabei entsteht
  `<bild>.excalidraw` neben dem Bild. Diese Dateien bearbeitest du nicht von Hand.
- Neue Screenshots zeigen keine persönlichen Daten (Namen, private WLAN-Namen, Adressen). Fällt dir
  das in einem neuen Bild auf, meldest du es.
- Nur Bilder ablegen, die auch referenziert werden.

## Backlog

[`content-backlog.md`](../../../content-backlog.md) im Repo-Root sammelt Verbesserungsvorschläge,
die du nicht selbst umsetzen darfst (fachliche Abläufe, nicht prüfbare Fakten, mögliche
Vereinfachungen) sowie nicht umgesetzte Punkte aus Critical User Reviews. Pro Vorschlag eine
Tabellenzeile nach den Spalten in der Datei, so genau, dass ein Maintainer sie ohne Rückfrage prüfen
kann. Keine Namen.

## Critical User Review

Verlangt der Maintainer ein "Critical User Review" oder will er Inhalte "kritisch prüfen lassen",
prüft ein **separater Agent ohne Kenntnis des bisherigen Verlaufs** die Seiten mit dem Skill
[`critical-user`](../critical-user/SKILL.md):

- Kannst du Sub-Agents starten, startest du einen und gibst ihm **nur** den Pfad zum Skill und die
  Pfade der zu prüfenden Seiten mit, keine Begründungen und keine Zusammenfassung deiner Arbeit.
  Seinen Bericht gibst du unverändert an den Maintainer weiter.
- Sonst gibst du dem Maintainer einen Prompt für eine neue Session, z.B.:
  "Critical User Review mit `.agents/skills/critical-user/SKILL.md` für `docs/…/index.mdx`."

Verbesserungsaufträge aus dem Review setzt du erst um, wenn der Maintainer sie dir gibt, und nur
die, die er dir gibt. Dabei gelten weiterhin alle Regeln dieses Skills.

## Prüfung

- Alle Bild- und Import-Pfade existieren. Jeder `@`-Link hat einen Schlüssel in
  `docs/link-mappings.yaml`.
- `page_id` und Dokument-IDs sind frisch und kommen genau einmal vor (`grep -rn "<uuid>" docs`).
- Keine Du-Form, kein `ß`, keine typografischen Anführungszeichen in deinen Seiten.
- Tab-Werte entsprechen dem Standard. Neue FAQs sind auf der FAQ-Seite eingebunden.
- Keine ausgeschriebenen Kontaktadressen oder Telefonnummern. Jede `id` von `<TLink>`/`<T>`
  existiert in `i18n/de/code.json`.
- Bei Code-Änderungen (Komponenten): `yarn typecheck` und `yarn prettier --check website`.
  `.md`/`.mdx` sind von Prettier ausgenommen, CI prüft `format:check`.
- **Dev-Server neu starten** nach neuen Seiten oder Änderungen an `siteConfig.ts`/`sidebars.ts`: Ein
  laufender Server löst Links auf Seiten, die nach seinem Start angelegt wurden, nicht auf (sie
  zeigen auf den Dateipfad) und übernimmt `siteConfig.ts` nicht. Den Server des Maintainers nicht
  selbst neu starten, sondern ihn darum bitten, bevor solche Fehler gesucht werden.
- Rendering: Läuft der Dev-Server des Maintainers (`yarn start`, Port 3000) und hast du einen
  Browser, die Seite dort ansehen. Sonst im Bericht festhalten, dass das Rendering nicht geprüft ist.

## Bericht

Kurz, auf Deutsch:

1. **Erstellt/geändert:** Pfade
2. **Entscheide nötig:** offene Fragen (FAQ oder Warnung, neue Komponenten, Zielort)
3. **Backlog und Schlüssel:** neue Einträge in `content-backlog.md`, neue Schlüssel in
   `docs/link-mappings.yaml` und `i18n/de/code.json`
4. **Funde:** Du-Form, abweichende Tab-Werte, Fehler ausserhalb des Auftrags
5. **Nicht geprüft:** z.B. Rendering

Nur berichten, was der Maintainer wissen oder entscheiden muss. Selbstverständliches (z.B. dass
temporäre Dateien gelöscht wurden) gehört nicht in den Bericht. Keine Hinweise zum Commit (keine `git add`-Befehle, keine Commit-Vorschläge). Das Committen ist
Sache des Maintainers.
