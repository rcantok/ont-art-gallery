// ---- ONT Art Gallery mobil (Expo) ----
// Web sitesinin telefon sürümü: katalog, ürün sayfası, "Sipariş Ver" ve "Stok Bildirimi İste".
// Katalog (data/products.js), ürün kuralları (lib/catalog.js) ve form kuralları (lib/validate.js) web ile aynı dosyalardır.
// Gezinme basit bir yığın: her ekran { name, id }; geri tuşu bir öncekine döner.
import { useEffect, useState } from "react";
import { BackHandler, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { resolveItem } from "../lib/catalog.js";
import { C } from "./src/config";
import Catalog from "./src/screens/Catalog";
import Detail from "./src/screens/Detail";
import { NotifyForm, OrderForm } from "./src/screens/Forms";

export default function App() {
  const [stack, setStack] = useState([{ name: "catalog" }]);
  const route = stack[stack.length - 1];
  const go = (name, id) => setStack(cur => [...cur, { name, id }]);
  const back = () => setStack(cur => cur.length > 1 ? cur.slice(0, -1) : cur);
  const home = () => setStack([{ name: "catalog" }]);

  // Android geri tuşu
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (stack.length === 1) return false;
      back();
      return true;
    });
    return () => sub.remove();
  }, [stack.length]);

  const item = route.id ? resolveItem(route.id) : null;
  const screen = route.name === "catalog" ? <Catalog open={id => go("detail", id)} />
    : !item ? <Text style={{ padding: 16 }}>Ürün bulunamadı.</Text>
    : route.name === "detail" ? <Detail key={route.id} item={item} go={go} />
    : route.name === "order" ? <OrderForm item={item} home={home} />
    : <NotifyForm item={item} home={home} />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.app} edges={["top", "left", "right"]}>
        <StatusBar style="dark" />
        <View style={s.header}>
          {stack.length > 1
            ? <Pressable onPress={back} hitSlop={12} accessibilityRole="button" accessibilityLabel="Geri"><Text style={s.back}>‹ Geri</Text></Pressable>
            : <View style={{ width: 52 }} />}
          <Text style={s.logo}>ONT</Text>
          <View style={{ width: 52 }} />
        </View>
        <View style={{ flex: 1 }}>{screen}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  app: { flex: 1, backgroundColor: C.white },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.line },
  back: { color: C.accent, fontSize: 16, fontWeight: "600", width: 52 },
  logo: { fontSize: 20, letterSpacing: 5, fontWeight: "500", color: C.ink, fontFamily: Platform.select({ ios: "Georgia", default: "serif" }) }
});
