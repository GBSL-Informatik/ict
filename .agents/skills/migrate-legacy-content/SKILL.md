---
name: migrate-legacy-content
description: Migriert publizierte Anleitungen aus der Legacy-ICT-Website (Repo ict-website, live unter ict-v1.gbsl.website) auf die neue ICT-Website (dieses Repo). Verwenden, wenn ein Maintainer eine bestehende Anleitung, ein Kapitel oder eine Seite aus ict-website übernehmen, umbauen oder neu aufteilen lassen will, wenn eine vorbereitete Seite einen `## CLAUDE`-Abschnitt mit Migrationsauftrag enthält, oder wenn Legacy-Komponenten, -Bilder oder -Links für eine Migration geprüft werden sollen. Ergänzt den Skill `write-content`, der für Stil und Aufbau gilt.
---

# Legacy-Content migrieren (ict-website → ict)

Du übernimmst Anleitungen aus der alten Website (`ict-website`, live unter
<https://ict-v1.gbsl.website>) in die neue Website (dieses Repo). Der Maintainer entscheidet, was
migriert wird und wie das Resultat aussieht.

**Lies zuerst den Skill [`write-content`](../write-content/SKILL.md) und halte dich vollständig
daran.** Er definiert harte Regeln, Hausstil, Seitenaufbau, FAQ, Links, Bilder, Backlog, Prüfung und
Bericht. Dieser Skill ergänzt nur, was für die Migration speziell gilt. Eine Migration ist **kein
1:1-Kopieren**: Der alte Inhalt wird in den neuen Hausstil überführt.

## Setup: Legacy-Repo als Nachbar

```
<irgendwo>/
├── ict/            ← dieses Repo
└── ict-website/    ← Legacy-Repo (nur lesen)
```

Prüfe zu Beginn, ob `../ict-website/docs` existiert. Falls nicht, **brich ab** und bitte den
Maintainer, das Repo einmalig zu klonen:

```bash
git clone https://github.com/GBSL-Informatik/ict-website.git ../ict-website
```

Lies den Legacy-Inhalt nicht über GitHub (API oder Raw-URLs). Das Repo ist gross (über 200 MB,
grösstenteils Bilder), und die API ist ohne Login rate-limitiert.

Eine URL der alten Website entspricht einem Pfad im Repo:
`https://ict-v1.gbsl.website/byod/wlan/` → `../ict-website/docs/byod/wlan/README.md` (oder
`index.md(x)` bzw. `<name>.md(x)`). Im Frontmatter steht oft zusätzlich `path:`.

## Harte Regeln für die Migration

- **Nur publizierte Artikel.** Seiten mit `draft: true` (viele davon stammen von einer anderen
  Schule, `source: gym-kirchenfeld`) werden ignoriert, ausser der Maintainer verlangt sie
  ausdrücklich.
- **Das Legacy-Repo ist "stale".** Es wird nur gelesen: keine Edits, keine Hinweise auf die neue
  Seite, keine Weiterleitungen von alt zu neu.
- **Links von neu zu alt** (auf `https://ict-v1.gbsl.website/...`, nie auf das GitHub-Repo) sind nur
  erlaubt, wenn der Inhalt im neuen Repo noch nicht existiert **und** in dieser Iteration nicht
  migriert wird. Jeder solche Link kommt in den Bericht. Die Domain wird **nie ausgeschrieben**,
  sondern über den Schlüssel `ict.legacy.domain` aus `i18n/de/code.json` eingebunden (wie auf
  `docs/03-support/02-austritt/index.mdx`):

  ```mdx
  import { translate } from '@docusaurus/Translate';

  Siehe <a href={`https://${translate({ id: 'ict.legacy.domain' })}/byod/drucker/`}>Drucker einrichten (alte Website)</a>.
  ```

  `<TLink>` eignet sich dafür nicht: Es erkennt nur E-Mail-Adressen und Telefonnummern.
- **Fachliche Abläufe unverändert übernehmen.** Veraltete oder umständliche Schritte kommen in den
  Backlog (siehe `write-content`), nicht in eine eigene Korrektur. Der **Stil** wird angepasst, der
  **Ablauf** nicht.
- **Gerätevarianten bleiben erhalten.** Zeigt die Vorlage mehrere Varianten (z.B. Google Pixel und
  Samsung), werden alle migriert. Unterscheiden sich die Schritte deiner Ansicht nach nicht
  relevant, meldest du das im Bericht, damit die Maintainer die Screenshots prüfen. Ein möglicher
  Folgeauftrag ist dann, die Varianten zu einer zusammenzufassen (z.B. nur "Android").
- **Zielort nie raten.** Die alte und die neue Struktur stimmen nicht überein. Der Maintainer gibt
  den Zielort vor. In der Regel stellt er dafür **leere Seiten als "Container"** bereit (nur
  Frontmatter mit `page_id`) und nennt im Chat, welche Legacy-Seite hinein soll. `## CLAUDE`-Blöcke
  werden bei Migrationen normalerweise nicht verwendet. Die vorhandene `page_id` bleibt bestehen.
- **Sidebar prüfen.** `sidebars.ts` enthält für noch nicht migrierte Seiten teilweise Links auf
  ict-v1. Wird eine solche Seite migriert, wird der Legacy-Link durch die neue Seite ersetzt, ohne
  dass ein Eintrag doppelt erscheint. Der Dev-Server meldet Duplikate in seinem Log.

## Ablauf

1. **Auftrag und Zielort klären** (siehe `write-content`).
2. **Quelle analysieren.** Legacy-Seite(n) vollständig lesen, inklusive importierter Partials
   (`_*.mdx`). Inventar erstellen:
   - Komponenten (JSX-Tags, Imports) und Remark-Syntax
   - Bilder, die **tatsächlich referenziert** werden (Legacy-Ordner enthalten oft ungenutzte Bilder)
   - interne und externe Links
   - Inhaltsblöcke, eingeteilt nach Ziel: Schritt / FAQ / Warnung / weglassen (siehe unten)
3. **Komponenten klären.** Fehlt eine Legacy-Komponente im neuen Repo, **stoppe und frag den
   Maintainer** (siehe [Komponenten](#komponenten)).
4. **Migrieren.** Seite nach `write-content` schreiben, Bilder migrieren (siehe
   [Screenshots](#screenshots)), FAQs anlegen und einbinden, Links umsetzen.
5. **Prüfen und berichten** (siehe `write-content`, plus die Zusatzpunkte unten).

## Alten Inhalt überführen

| Legacy                                                                 | Neu                                                                                       |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Du-Form                                                                | Sie-Form; Schritte im Infinitiv                                                           |
| Fliesstext-Anleitung, nummerierte Listen, Pfeil-Ketten (`→`)           | `<Steps>`                                                                                 |
| `«…»`, `„…“`, `“…”`                                                    | ASCII `"…"`; UI-Elemente als `__Element__`                                                |
| Dieselbe Warnung mehrfach (z.B. in jedem OS-Tab)                       | einmal, am gemeinsamen Schritt                                                            |
| Infoboxen (`:::details`) mit sinnvollen Zusatzinfos ("Ist mein Gerät …?") | FAQ-Partial, eingebettet und auf der FAQ-Seite eingebunden                              |
| Infoboxen mit Hintergrundwissen ohne Bezug zur Aufgabe ("Was ist …?")  | weglassen (im Bericht nennen)                                                             |
| Einleitende Admonitions, die nur den Ablauf vorwegnehmen               | ein bis zwei Sätze Einleitung                                                             |
| Übergangs-Hinweise auf frühere Zustände ("Von X zu Y")                 | weglassen, ausser der Maintainer will sie                                                 |
| Ausgeschriebene Kontaktadressen, Telefonnummern                        | `<TLink id="…" />` bzw. `<T id="…" />` (siehe `write-content`)                            |
| OS-Tabs mit `value="osx"` o.ä.                                         | Standard-Tabs `win`/`macos`/`ios`/`android` (siehe `write-content`)                       |
| Ganze Abläufe pro OS dupliziert                                        | gemeinsame Schritte einmal, Tabs nur für die Unterschiede, ausser die `<Steps>` würden dadurch zerrissen (siehe `write-content`) |
| Varianten in `:::details` (z.B. pro Hersteller)                        | Tabs oder Unterabschnitte, nach Rückfrage; Varianten bleiben erhalten (siehe oben)        |

### Frontmatter

Legacy-Felder (`sidebar_position`, `draft`, `description`, `apps`, `systems`, `tags`, `chapter`,
`sidebar_custom_props.path`, `sidebar_custom_props.source`) werden nicht übernommen, ausser das
neue Repo verwendet sie (`grep` prüfen). Icons: Legacy `mdi-wifi` → neu `mdiWifi`.

## Komponenten

Legacy-Komponenten werden **nicht blind übernommen**. Für jede, die im neuen Repo fehlt, entscheidet
der Maintainer:

| Entscheid         | Umsetzung                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| **migrieren**     | nach `website/components/<Name>/`, an React 19 und tdev anpassen, auf der Seite explizit importieren |
| **neu schreiben** | Anforderungen klären, neue Komponente in `website/components/<Name>/`                             |
| **weglassen**     | mit Markdown oder einer bestehenden Komponente umsetzen oder streichen                             |

Lege dem Maintainer vor: Name, Vorkommen im migrierten Content, Funktion, ähnliche Komponente im neuen
Repo, deine Empfehlung. Entscheide nicht selbst.

**Stand** (bei Unsicherheit im Code prüfen):

| Legacy                                                                       | Im neuen Repo                                                                                 |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `Tabs`/`TabItem`, `BrowserWindow`, `Figure`/`SourceRef`, `Dl`, `MdiSelector` | vorhanden; Props und Verhalten können abweichen                                               |
| `Features`, `FeatureCategories`                                              | **werden nicht migriert** (automatische Übersichten der Unterseiten). Ersatzlos weglassen, ohne Rückfrage. |
| `ExcelBox`, `SearchBox`, `Icon`, `PasswordChecker`                           | **fehlen**                                                                                    |

**Remark-Syntax:** Die Legacy-Plugins gibt es auch im neuen Repo (`:mdi[…]`, `[[Taste]]`,
`:::cards`/`:::flex`, Bildgrössen, Definitionslisten, `:::details`/`:::solution`, Medien,
`__strong__`, Link-Annotationen, PDF). Die Syntax kann in der Regel bleiben. Details können
abweichen, deshalb das Rendering prüfen.

## Screenshots

Alle Screenshots sollen langfristig neu aufgenommen werden (ohne eingebranntes Markup). Bis dahin
gilt pro referenziertem Legacy-Bild:

1. Neuen Namen in kebab-case festlegen (siehe `write-content`).
2. **Referenz:** Original unverändert als `images/<name>.reference.<ext>` ablegen. Es dient als
   Vorlage für das Markup und bleibt liegen, bis der Maintainer das Löschen verlangt.
3. **Clean-Variante:** Markup entfernen und als `images/<name>.<ext>` ablegen (gleiche Endung wie die
   Referenz). Diese Datei wird auf der Seite verwendet.

Bilder **ohne Markup** werden nur umbenannt und als `images/<name>.<ext>` abgelegt, ohne Referenz.
Bilder, die nach dem Überführen redundant sind (z.B. drei Screenshots für einen Schritt) oder zu
weggelassenem Inhalt gehören, werden nicht übernommen und im Bericht genannt.

Zum Entfernen gibt es [`scripts/remove-markup.py`](scripts/remove-markup.py). Es erkennt farbige
Markierungen (Standard rot) und füllt sie per Inpainting. Optional schneidet es das Bild zu, z.B. um
mitfotografierte Fenster-Leisten von Bildbetrachtern zu entfernen.

### Einmalige Zustimmung des Maintainers

Das Skript installiert Python-Pakete aus PyPI (OpenCV, NumPy) in ein temporäres Verzeichnis und
verändert Bilder. Deshalb muss jeder Maintainer **einmal** zustimmen. Der Entscheid wird lokal in
`.agents/maintainer.local.yaml` gespeichert (gitignored, gilt also pro Klon und über Sessions
hinweg):

```yaml
remove-markup-script: allowed   # oder: denied
```

- **Vor dem ersten Einsatz** die Datei lesen. Fehlt der Eintrag, erklärst du dem Maintainer kurz:
  was das Skript macht (farbiges Markup erkennen und per Inpainting füllen, optional zuschneiden),
  wozu (saubere Grundlage für Markup mit Excalidraw, bis Screenshots neu aufgenommen werden), was
  es installiert (OpenCV und NumPy aus PyPI, nur im temporären Verzeichnis, danach gelöscht) und
  wo es liegt ([`scripts/remove-markup.py`](scripts/remove-markup.py), ca. 70 Zeilen, zum Ansehen).
  Dann fragst du, ob es verwendet werden darf, und speicherst die Antwort.
- **`allowed`:** Skript ohne weitere Rückfrage verwenden.
- **`denied`:** Skript nie verwenden. Bilder ohne Bereinigung übernehmen (siehe unten). Die
  Entscheidung ändert sich nur, wenn der Maintainer es ausdrücklich verlangt oder die Datei
  anpasst.

### Ausführen

```bash
TMP=$(mktemp -d)                                              # ausserhalb des Repos
python3 -m venv "$TMP/venv"
"$TMP/venv/bin/pip" install -q opencv-python-headless numpy   # Windows: $TMP\venv\Scripts\pip
"$TMP/venv/bin/python" <skill>/scripts/remove-markup.py <quelle> images/<name>.png [--color red] [--crop x,y,b,h]
# … weitere Bilder …
```

Das temporäre Verzeichnis wird pro Migration einmal angelegt und am Ende gelöscht (siehe unten).

Vor dem Bereinigen jedes Original ansehen:

- **UI-Elemente in Markup-Farbe** (z.B. roter Warntext wie "Wird nicht vertraut") mit
  `--keep x,y,b,h` schützen, sonst werden sie mitentfernt.
- **Transparente oder mitfotografierte Ränder** (Bildbetrachter, Fensterleisten) mit `--crop`
  entfernen. Transparente Ränder würden sonst schwarz.

Danach jedes Resultat ansehen (z.B. mehrere Bilder mit `magick … +append` nebeneinander). Auf
ruhigen Flächen verschwindet das Markup sauber, wo es über UI-Elemente oder Text läuft, bleiben
Schmierspuren. Solche Bilder merkst du dir für `--flag`.

### Bilder annehmen oder zurückweisen

1. **Vergleichsseite erzeugen** mit [`scripts/compare-images.py`](scripts/compare-images.py) (nur
   Standardbibliothek, braucht keine Zustimmung):

   ```bash
   "$TMP/venv/bin/python" <skill>/scripts/compare-images.py "$TMP/vergleich.html" <bildordner> [...] --flag <name> [...]
   ```

   Die Seite zeigt jedes Paar nummeriert nebeneinander (links Original, rechts bereinigt). Mit
   `--flag` markierte Bilder sind hervorgehoben. Gib dem Maintainer den Pfad zur Seite (Öffnen per
   Doppelklick) und die nummerierte Liste aus der Ausgabe des Skripts.
2. **Antwort des Maintainers abwarten**, z.B. "zurück: 2, 5". Nicht genannte Bilder gelten als
   angenommen.
3. **Pro zurückgewiesenem Bild:**
   - `<name>.reference.<ext>` nach `<name>.<ext>` kopieren. Weicht die Endung ab, die Referenz-Endung
     übernehmen, die bereinigte Datei löschen und den Verweis auf der Seite anpassen.
   - `<name>.reference.<ext>` löschen (jetzt identisch).
   - Eine Zeile in `content-backlog.md` eintragen: Typ `Stil`, Schwere `Feinschliff`, Vorschlag
     "Screenshot ohne Markup neu aufnehmen".
4. **Referenzdateien angenommener Bilder bleiben liegen.** Sie dienen dem Maintainer als Vorlage, um
   das Markup mit Excalidraw zu übernehmen. Gelöscht werden sie erst, wenn der Maintainer es
   ausdrücklich verlangt.
5. **Aufräumen:** `rm -rf "$TMP"` (auch nach Fehlern). Damit verschwindet auch die Vergleichsseite.
   Das Aufräumen ist selbstverständlich und wird nicht berichtet.

### Ohne Skript

Ist das Skript `denied` oder kann die Python-Umgebung nicht eingerichtet werden, wird das Original
nur als `<name>.<ext>` abgelegt (ohne Referenz) und eine Backlog-Zeile "Screenshot ohne Markup neu
aufnehmen" eingetragen.

Persönliche Daten in alten Screenshots werden ignoriert.

## Bericht: Zusatzpunkte

Zusätzlich zum Bericht nach `write-content`:

- **Quelle → Ziel** (Legacy-Pfad bzw. -URL → neue Pfade), neue Aufteilung
- **Weggelassen:** Inhaltsblöcke, die nicht migriert wurden, mit kurzer Begründung
- **Links auf ict-v1** mit Begründung
- **Screenshots:** Pfad zur Vergleichsseite und nummerierte Liste (siehe oben)
- **Gerätevarianten,** die sich deiner Ansicht nach nicht relevant unterscheiden
- **Komponenten-Entscheide,** die noch offen sind
