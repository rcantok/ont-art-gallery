#!/usr/bin/env python3
"""ON.TOK fotoğrafından katalog görseli hazırlar: yön düzeltir, tabloyu zeminden kırpar,
iki boy kaydeder (EXIF'siz, yani tarayıcıda ikinci kez dönmez).

Kullanım:
  python3 hazirla.py <kaynak.jpg> <id>                  → kenarları otomatik bulur
  python3 hazirla.py <kaynak.jpg> <id> --frame          → çerçeveli eser: önce çerçeveyi, sonra içindeki tabloyu bulur
  python3 hazirla.py <kaynak.jpg> <id> --box L,T,R,B    → elle kırpma (0–1 arası oranlar)
  ... --trim L,T,R,B                                     → kırpmadan sonra kenarlardan ek pay (oran; kalan şerit için)

Çıktı (AtölyeKart/ altında çalıştırılır):
  images/<id>.jpg         uzun kenar 1400 px — eser penceresi
  images/thumbs/<id>.jpg  uzun kenar 600 px  — ızgara
Son satır: "<id> <genişlik> <yükseklik> box=L,T,R,B" (PRODUCTS'a yazılacak ölçüler büyük görselin).

Otomatik kırpma: zemin rengini fotoğrafın dış şeridinden örnekler; zeminden belirgin biçimde
ayrışan piksellerin çoğunlukta olduğu ilk/son satır ve sütunu tablonun kenarı sayar, sonra
eğik çekimi tolere etmek için kenarlardan %3 içeri girer. Çerçeveli ya da zeminle aynı renkte
kenarı olan eserlerde sonucu gözle kontrol et, gerekirse --box ver.
"""
import os
import sys
from PIL import Image, ImageOps

FULL, THUMB, INSET = 1400, 600, 0.03


def detect_box(img):
    small = img.copy()
    small.thumbnail((400, 400))
    w, h = small.size
    px = small.load()
    band = max(3, int(min(w, h) * 0.03))
    border = [px[x, y] for x in range(w) for y in range(h)
              if x < band or y < band or x >= w - band or y >= h - band]
    bg = tuple(sorted(c[i] for c in border)[len(border) // 2] for i in range(3))

    def differs(c):
        return sum(abs(c[i] - bg[i]) for i in range(3)) > 70

    rows = [sum(differs(px[x, y]) for x in range(w)) / w for y in range(h)]
    cols = [sum(differs(px[x, y]) for y in range(h)) / h for x in range(w)]

    def span(values):
        # Önce sıkı eşik; zemin tabloya çok benziyorsa (az satır geçerse) gevşek eşiğe düş
        for limit in (0.75, 0.5):
            hits = [i for i, v in enumerate(values) if v > limit]
            if hits and hits[-1] - hits[0] > len(values) * 0.5:
                return hits[0], hits[-1] + 1
        return 0, len(values)

    top, bottom = span(rows)
    left, right = span(cols)
    l, t, r, b = left / w, top / h, right / w, bottom / h
    return (l + INSET, t + INSET, r - INSET, b - INSET)


def save(img, path, size):
    out = img.copy()
    out.thumbnail((size, size), Image.LANCZOS)
    out.save(path, "JPEG", quality=74, optimize=True, progressive=True)
    return out.size


def main():
    args = sys.argv[1:]
    if len(args) < 2:
        sys.exit(__doc__)
    src, pid, opts = args[0], args[1], args[2:]
    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    opt = dict(zip(opts[::2], opts[1::2])) if "--frame" not in opts else {"--frame": ""}
    if "--frame" in opts and "--trim" in opts:
        opt["--trim"] = opts[opts.index("--trim") + 1]
    if "--box" in opt:
        box = tuple(float(v) for v in opt["--box"].split(","))
    else:
        box = detect_box(img)
    W, H = img.size
    crop = img.crop((round(box[0] * W), round(box[1] * H), round(box[2] * W), round(box[3] * H)))
    if "--frame" in opt:
        # ikinci tur: çerçeve artık zemin; içindeki tabloyu bul
        inner = detect_box(crop)
        cw, ch = crop.size
        crop = crop.crop((round(inner[0] * cw), round(inner[1] * ch), round(inner[2] * cw), round(inner[3] * ch)))
    if "--trim" in opt:
        tl, tt, tr, tb = (float(v) for v in opt["--trim"].split(","))
        cw, ch = crop.size
        crop = crop.crop((round(tl * cw), round(tt * ch), round((1 - tr) * cw), round((1 - tb) * ch)))
    os.makedirs("images/thumbs", exist_ok=True)
    fw, fh = save(crop, f"images/{pid}.jpg", FULL)
    save(crop, f"images/thumbs/{pid}.jpg", THUMB)
    print(f"{pid} {fw} {fh} box={','.join(f'{v:.3f}' for v in box)}")


if __name__ == "__main__":
    main()
