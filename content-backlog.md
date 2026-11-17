# Content-Backlog

Verbesserungsvorschläge für Inhalte, die nicht sofort umgesetzt werden: fachliche Abläufe, nicht
prüfbare Fakten, mögliche Vereinfachungen, nicht umgesetzte Punkte aus Critical User Reviews.
Erledigte oder verworfene Zeilen werden gelöscht.

## Spalten

| Spalte         | Inhalt                                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Seite**      | Pfad, z.B. `docs/04-accounts/02-mfa/index.mdx`                                                                                         |
| **Stelle**     | Abschnitt, Schritt, Tab, z.B. "Anleitung, Schritt 3 (macOS)"                                                                           |
| **Typ**        | `Kürze`, `Überfliegen`, `Verständlichkeit`, `Erfolgskontrolle` (Critical User Review) oder `Fachlich`, `Fakten`, `Stil`              |
| **Schwere**    | `blockiert` (man macht etwas falsch oder bleibt stecken), `stolpert` (man zögert, sucht, liest doppelt), `Feinschliff`                |
| **Problem**    | Was ist heute so, und warum ist das ein Problem?                                                                                       |
| **Vorschlag**  | Was sollte stattdessen stehen bzw. geprüft werden?                                                                                     |
| **Erfasst**    | Datum `JJJJ-MM-TT`                                                                                                                     |

Zeilen aus einem Critical User Review können unverändert übernommen werden (ohne Spalte `#`).
`|` in Zellen als `\|` schreiben, Zeilenumbrüche als `<br/>`.

## Offene Vorschläge

| Seite | Stelle | Typ | Schwere | Problem | Vorschlag | Erfasst |
| ----- | ------ | --- | ------- | ------- | --------- | ------- |
| `docs/03-support/01-faq/index.mdx` | Admonition "FAQ V1 Seite" (Zeile 46) | Stil | Feinschliff | Der Link auf die alte Website schreibt die Domain `ict-v1.gbsl.website` direkt aus, statt sie über den Schlüssel `ict.legacy.domain` (`i18n/de/code.json`) einzubinden. Ändert sich die Domain, geht diese Stelle vergessen. | Link als `` <a href={`https://${translate({ id: 'ict.legacy.domain' })}/support/it-hilfe/`}>…</a> `` umsetzen (Import `translate` aus `@docusaurus/Translate`), wie auf `docs/03-support/02-austritt/index.mdx`. | 2026-11-17 |
