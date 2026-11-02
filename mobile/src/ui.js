// ---- Ortak parçalar: düğme, metin alanı, rıza kutusu, eser ve magnet görseli ----
import { useRef } from "react";
import { Image, Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { C, PRIVACY_URL, imageUrl } from "./config";

export function Button({ title, onPress, disabled, variant = "accent" }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [s.btn, variant === "secondary" && s.btnSecondary, (pressed || disabled) && { opacity: 0.6 }]}
    >
      <Text style={[s.btnText, variant === "secondary" && { color: C.ink }]}>{title}</Text>
    </Pressable>
  );
}

export function Field({ label, error, ...input }) {
  return (
    <View style={s.field}>
      <Text style={s.label}>{label}</Text>
      <TextInput style={[s.input, error && { borderColor: C.error }, input.multiline && { minHeight: 80, textAlignVertical: "top" }]} accessibilityLabel={label} {...input} />
      {error ? <Text style={s.error}>{error}</Text> : null}
    </View>
  );
}

// KVKK açık rıza kutusu: işaretlenmeden gönderilemez (sunucu da zorunlu tutar)
export function Consent({ value, onChange, error }) {
  return (
    <View style={s.field}>
      <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: value }} onPress={() => onChange(!value)} style={s.consent}>
        <View style={[s.box, value && s.boxOn, error && { borderColor: C.error }]}>{value ? <Text style={s.tick}>✓</Text> : null}</View>
        <Text style={s.consentText}>
          Kişisel verilerimin siparişimin/talebimin yerine getirilmesi için işlenmesine açık rıza veriyorum.{" "}
          <Text style={s.link} onPress={() => Linking.openURL(PRIVACY_URL)}>Aydınlatma Metni</Text>
        </Text>
      </Pressable>
      {error ? <Text style={s.error}>{error}</Text> : null}
    </View>
  );
}

// Çift gönderim kilidi: düğme "Gönderiliyor…" olana kadar geçen kısa anda ikinci dokunuşu da durdurur
export function useSubmitLock() {
  const busy = useRef(false);
  return async run => {
    if (busy.current) return;
    busy.current = true;
    try { await run(); } finally { busy.current = false; }
  };
}

export function ProductImage({ product, big }) {
  const { thumb, src, alt, width, height } = product.image;
  return <Image source={{ uri: imageUrl(big ? src : thumb) }} accessibilityLabel={alt} style={{ width: "100%", aspectRatio: big ? width / height : 1, backgroundColor: C.matte }} resizeMode={big ? "contain" : "cover"} />;
}

// Eseri buzdolabı kapağındaki bir magnet gibi gösterir; eğiklik kimlikten türetilir (web ile aynı)
const tiltOf = id => ([...id].reduce((t, c) => t + c.charCodeAt(0), 0) % 7 - 3) * 0.8;
export function MagnetImage({ product }) {
  const { thumb, alt, width, height } = product.image;
  return (
    <View style={s.fridge}>
      <View style={[s.magnet, { width: `${Math.min(72, 72 * width / height)}%`, aspectRatio: width / height, transform: [{ rotate: `${tiltOf(product.id)}deg` }] }]}>
        <Image source={{ uri: imageUrl(thumb) }} accessibilityLabel={`${alt} (magnet görünümü)`} style={{ flex: 1, borderRadius: 6 }} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  btn: { backgroundColor: C.accent, paddingVertical: 14, paddingHorizontal: 18, borderRadius: 6, alignItems: "center" },
  btnSecondary: { backgroundColor: C.white, borderWidth: 1, borderColor: C.ink },
  btnText: { color: C.white, fontWeight: "700", fontSize: 15 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: "600", color: C.ink, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: C.line, borderRadius: 6, padding: 12, fontSize: 16, color: C.ink, backgroundColor: C.white },
  error: { color: C.error, fontSize: 13, marginTop: 4 },
  consent: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  box: { width: 22, height: 22, borderWidth: 1.5, borderColor: C.muted, borderRadius: 4, alignItems: "center", justifyContent: "center", marginTop: 1 },
  boxOn: { backgroundColor: C.accent, borderColor: C.accent },
  tick: { color: C.white, fontWeight: "800", fontSize: 14 },
  consentText: { flex: 1, fontSize: 13, color: C.muted, lineHeight: 19 },
  link: { color: C.accent, fontWeight: "700", textDecorationLine: "underline" },
  fridge: { width: "100%", aspectRatio: 1, backgroundColor: C.soft, alignItems: "center", justifyContent: "center" },
  magnet: { backgroundColor: C.white, padding: 3, borderRadius: 8, overflow: "visible", shadowColor: C.ink, shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 6 }, elevation: 5 }
});
