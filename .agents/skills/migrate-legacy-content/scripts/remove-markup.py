"""Entfernt farbiges Markup (Kreise, Pfeile, Rahmen) aus einem Screenshot.

Erkennt stark gesättigte Pixel im gewählten Farbbereich, vergrössert die Maske leicht und füllt
die Stellen per Inpainting (OpenCV). Optional wird das Bild vorher zugeschnitten.

Aufruf:
    python remove-markup.py <eingabe> <ausgabe> [--color red|orange|yellow|green|blue|magenta]
                            [--crop x,y,breite,hoehe] [--grow 2] [--mask <maske.png>]

Benötigt: opencv-python-headless, numpy
"""

import argparse
import sys

import cv2
import numpy as np

# OpenCV-Hue: 0..180
HUE_RANGES = {
    'red': [(0, 10), (165, 180)],
    'orange': [(8, 22)],
    'yellow': [(22, 35)],
    'green': [(40, 85)],
    'blue': [(95, 130)],
    'magenta': [(135, 165)],
}


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument('src')
    p.add_argument('dst')
    p.add_argument('--color', action='append', choices=HUE_RANGES.keys())
    p.add_argument('--crop', help='x,y,breite,hoehe in Pixeln (vor dem Entfernen angewendet)')
    p.add_argument('--grow', type=int, default=2, help='Masken-Vergrösserung in Iterationen')
    p.add_argument('--min-sat', type=int, default=120)
    p.add_argument('--min-val', type=int, default=90)
    p.add_argument('--mask', help='Maske zusätzlich als Bild speichern (zur Kontrolle)')
    a = p.parse_args()

    img = cv2.imread(a.src, cv2.IMREAD_COLOR)
    if img is None:
        print(f'Kann Bild nicht lesen: {a.src}', file=sys.stderr)
        return 1

    if a.crop:
        x, y, w, h = (int(v) for v in a.crop.split(','))
        img = img[y : y + h, x : x + w]

    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    mask = np.zeros(img.shape[:2], np.uint8)
    for color in a.color or ['red']:
        for lo, hi in HUE_RANGES[color]:
            mask |= cv2.inRange(hsv, (lo, a.min_sat, a.min_val), (hi, 255, 255))
    if a.grow > 0:
        mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=a.grow)

    out = cv2.inpaint(img, mask, 5, cv2.INPAINT_TELEA)
    if not cv2.imwrite(a.dst, out):
        print(f'Kann Bild nicht schreiben: {a.dst}', file=sys.stderr)
        return 1
    if a.mask:
        cv2.imwrite(a.mask, mask)

    share = (mask > 0).mean() * 100
    print(f'{a.dst}: {share:.1f}% der Pixel ersetzt')
    return 0


if __name__ == '__main__':
    sys.exit(main())
