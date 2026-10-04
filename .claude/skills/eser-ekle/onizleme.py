#!/usr/bin/env python3
"""Görsellerden toplu önizleme (kontak sayfası) üretir; kırpmaları topluca gözle kontrol etmek için.

Kullanım: python3 onizleme.py <cikti.png> <sütun> <hücre_px> <görsel1> <görsel2> ...
Her hücrenin altına dosya adı (uzantısız) yazılır; zemin koyu gridir.
"""
import sys
from PIL import Image, ImageDraw


def main():
    if len(sys.argv) < 5:
        sys.exit(__doc__)
    out, cols, cell, files = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4:]
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * (cell + 18)), (40, 40, 40))
    draw = ImageDraw.Draw(sheet)
    for i, path in enumerate(files):
        im = Image.open(path)
        im.thumbnail((cell - 8, cell - 8))
        x, y = (i % cols) * cell, (i // cols) * (cell + 18)
        sheet.paste(im, (x + (cell - im.width) // 2, y + (cell - im.height) // 2))
        draw.text((x + 4, y + cell + 2), path.split("/")[-1].rsplit(".", 1)[0], fill=(230, 230, 230))
    sheet.save(out)
    print(f"{out}: {len(files)} görsel")


if __name__ == "__main__":
    main()
