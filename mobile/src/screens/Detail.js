// ---- Ürün sayfası: orijinal eser ya da demo magneti ----
// Satın alınabiliyorsa "Sipariş Ver"; tükenmiş magnette ya da satılmış eserde "Stok Bildirimi İste".
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MAGNET } from "../../../data/products.js";
import { magnetId, magnetStock } from "../../../lib/catalog.js";
import { C, MAGNET_DEMO_NOTE, formatPrice } from "../config";
import { Button, MagnetImage, ProductImage } from "../ui";

const metaLine = p => [p.medium || p.technique, p.size, p.year].filter(Boolean).join(" · ") || "Künye bilgisi yakında";

export default function Detail({ item, go }) {
  const { product: p, kind, productId, maxQty, stock } = item;
  const magnet = kind === "magnet";
  const canOrder = maxQty > 0;
  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      {magnet ? <MagnetImage product={p} /> : <ProductImage product={p} big />}
      <Text style={s.title}>{item.productName}</Text>
      <Text style={s.meta}>{magnet ? `Buzdolabı magneti · ${MAGNET.prepDays} iş gününde hazırlanır` : metaLine(p)}</Text>
      <Text style={s.price}>{formatPrice(item.price)}</Text>
      {magnet
        ? <Text style={[s.stock, stock === 0 && s.out]}>{stock === 0 ? "Tükendi" : `Stokta ${stock} adet`}</Text>
        : <Text style={[s.stock, !canOrder && s.out]}>{canOrder ? "Satışta · tek adet" : "Satıldı"}</Text>}
      {magnet && <Text style={s.demo}>{MAGNET_DEMO_NOTE}</Text>}

      <View style={{ marginTop: 18 }}>
        {canOrder
          ? <Button title="Sipariş Ver" onPress={() => go("order", productId)} />
          : <Button title="Stok Bildirimi İste" onPress={() => go("notify", productId)} />}
      </View>

      {!magnet && <Text style={s.desc}>{p.desc}</Text>}
      {!magnet && (
        <View style={s.magnetBox}>
          <Text style={s.boxTitle}>Bu eserin magneti</Text>
          <Text style={s.meta}>{formatPrice(MAGNET.price)} · {magnetStock(p.id) === 0 ? "Tükendi" : "Stokta"} (demo)</Text>
          <View style={{ marginTop: 10 }}>
            <Button variant="secondary" title="Magneti gör" onPress={() => go("detail", magnetId(p.id))} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "800", color: C.ink, marginTop: 16 },
  meta: { color: C.muted, marginTop: 4, lineHeight: 20 },
  price: { fontSize: 20, fontWeight: "700", color: C.ink, marginTop: 12 },
  stock: { marginTop: 4, color: C.accent, fontWeight: "600" },
  out: { color: C.error },
  demo: { marginTop: 8, fontSize: 12, fontStyle: "italic", color: C.muted },
  desc: { marginTop: 20, color: C.ink, lineHeight: 22, fontSize: 15 },
  magnetBox: { marginTop: 24, padding: 14, backgroundColor: C.soft, borderRadius: 8 },
  boxTitle: { fontWeight: "700", color: C.ink }
});
