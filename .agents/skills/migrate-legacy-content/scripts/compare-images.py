"""Erzeugt eine HTML-Vergleichsseite für bereinigte Screenshots.

Sucht in den angegebenen Ordnern Paare aus `<name>.reference.<ext>` (Original mit Markup) und
`<name>.<ext>` (bereinigt, Endung darf abweichen) und stellt sie nummeriert nebeneinander dar.
Die Nummern werden auch auf stdout ausgegeben, damit der Maintainer im Chat darauf verweisen kann.

Aufruf:
    python compare-images.py <ausgabe.html> <bildordner> [<bildordner> ...] [--flag <name> ...]

`--flag` markiert Bilder (Name ohne Endung), bei denen Spuren der Bereinigung sichtbar sind.
Benötigt nur die Python-Standardbibliothek.
"""

import argparse
import base64
import html
import mimetypes
import sys
from pathlib import Path

IMAGE_EXT = {'.png', '.jpg', '.jpeg', '.webp', '.gif'}


def data_uri(path: Path) -> str:
    # Bilder werden eingebettet, damit die Seite in jedem Viewer funktioniert (file://-Verweise
    # werden von manchen Umgebungen blockiert).
    mime = mimetypes.guess_type(path.name)[0] or 'image/png'
    return f'data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}'


def find_pairs(folders):
    pairs = []
    for folder in folders:
        for ref in sorted(Path(folder).resolve().rglob('*.reference.*')):
            if ref.suffix.lower() not in IMAGE_EXT:
                continue
            stem = ref.name[: -len('.reference' + ref.suffix)]
            clean = [
                p
                for p in ref.parent.glob(stem + '.*')
                if p.suffix.lower() in IMAGE_EXT and p.name == stem + p.suffix
            ]
            pairs.append((stem, ref, clean[0] if clean else None))
    return pairs


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument('out')
    p.add_argument('folders', nargs='+')
    p.add_argument('--flag', action='append', default=[])
    a = p.parse_args()

    pairs = find_pairs(a.folders)
    if not pairs:
        print('Keine Paare <name>.reference.<ext> / <name>.<ext> gefunden.', file=sys.stderr)
        return 1

    rows = []
    for i, (stem, ref, clean) in enumerate(pairs, 1):
        flagged = stem in a.flag
        clean_html = (
            f'<img src="{data_uri(clean)}" alt="">' if clean else '<p class="missing">fehlt</p>'
        )
        rows.append(
            f'''<section class="{'flag' if flagged else ''}">
  <h2>{i}. {html.escape(stem)}{' &mdash; <span>Spuren sichtbar</span>' if flagged else ''}</h2>
  <div class="pair">
    <figure><figcaption>Original (mit Markup)</figcaption><img src="{data_uri(ref)}" alt=""></figure>
    <figure><figcaption>Bereinigt</figcaption>{clean_html}</figure>
  </div>
  <p class="path">{html.escape(str(clean or ref.parent))}</p>
</section>'''
        )
        print(f'{i}. {stem}{"  [Spuren sichtbar]" if flagged else ""}')

    page = f'''<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><title>Screenshots vergleichen</title>
<style>
body {{ font-family: system-ui, sans-serif; margin: 2rem; background: #f6f6f6; }}
section {{ background: #fff; border-radius: 8px; padding: 1rem 1.5rem; margin-bottom: 2rem; }}
section.flag {{ outline: 3px solid #e8a400; }}
h2 span {{ color: #b37f00; }}
.pair {{ display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }}
figure {{ margin: 0; }}
figcaption {{ font-size: .85rem; color: #666; margin-bottom: .3rem; }}
img {{ max-width: 100%; border: 1px solid #ddd; }}
.path {{ font-size: .75rem; color: #888; }}
.missing {{ color: #c00; }}
</style></head><body>
<h1>Screenshots vergleichen</h1>
<p>Bilder, bei denen das Original verwendet werden soll, im Chat mit Nummer melden, z.B. "zurück: 2, 5".</p>
{''.join(rows)}
</body></html>'''
    Path(a.out).write_text(page, encoding='utf-8')
    print(f'Vergleichsseite: {Path(a.out).resolve()}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
