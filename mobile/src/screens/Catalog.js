// ---- Katalog: Eserler ve Magnetler sekmeleri, iki sütunlu ızgara ----
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { PRODUCTS, MAGNET } from "../../../data/products.js";
import { magnetId, magnetStock } from "../../../lib/catalog.js";
import { C, MAGNET_DEMO_NOTE, formatPrice } from "../config";
import { MagnetImage, ProductImage } from "../ui";

const TABS = { works: "Eserler", magnets: "Magnetler" };

export default function Catalog({ open }) {
  const [tab, setTab] = useState("works");
  const magnets = tab === "magnets";
  return (
    <FlatList
      key={tab}
      data={PRODUCTS}
      keyExtractor={p => p.id}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ padding: 16, gap: 18 }}
      ListHeaderComponent={
        <View style={{ gap: 12 }}>
          <View style={s.tabs} accessibilityRole="tablist">
            {Object.entries(TABS).map(([k, label]) => (
              <Pressable key={k} accessibilityRole="tab" accessibilityState={{ selected: tab === k }} onPress={() => setTab(k)} style={[s.tab, tab === k && s.tabOn]}>
                <Text style={[s.tabText, tab === k && s.tabTextOn]}>{label}</Text>
              </Pressable>
            ))}
          </View>
          {magnets
            ? <Text style={s.lede}>Her eserin buzdolabı magneti: {formatPrice(MAGNET.price)}, {MAGNET.prepDays} iş gününde hazırlanır. <Text style={s.demo}>{MAGNET_DEMO_NOTE}</Text></Text>
            : <Text style={s.lede}>{PRODUCTS.length} özgün eser. Her biri tek adet.</Text>}
        </View>
      }
      renderItem={({ item: p }) => {
        const stock = magnetStock(p.id);
        return (
          <Pressable style={s.card} onPress={() => open(magnets ? magnetId(p.id) : p.id)} accessibilityLabel={p.title}>
            {magnets ? <MagnetImage product={p} /> : <ProductImage product={p} />}
            <Text style={s.title} numberOfLines={1}>{p.title}</Text>
            {magnets
              ? <Text style={[s.price, stock === 0 && s.out]}>{stock === 0 ? "Tükendi" : formatPrice(MAGNET.price)}</Text>
              : <Text style={[s.price, p.original.status === "sold" && s.out]}>{p.original.status === "sold" ? "Satıldı" : formatPrice(p.original.price)}</Text>}
          </Pressable>
        );
      }}
    />
  );
}

const s = StyleSheet.create({
  tabs: { flexDirection: "row", gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: C.line },
  tabOn: { backgroundColor: C.ink, borderColor: C.ink },
  tabText: { fontWeight: "600", color: C.ink },
  tabTextOn: { color: C.white },
  lede: { color: C.muted, fontSize: 14, lineHeight: 20 },
  demo: { fontSize: 12, fontStyle: "italic" },
  card: { flex: 1, maxWidth: "50%" },
  title: { marginTop: 8, fontWeight: "700", color: C.ink },
  price: { marginTop: 2, color: C.muted },
  out: { color: C.error, fontWeight: "600" }
});
