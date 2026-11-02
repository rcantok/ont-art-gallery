// ---- Sipariş (order) ve stok bildirimi (stock_notify) formları ----
// Kurallar web sitesi ve sunucuyla ortak: ../../../lib/validate.js. Sunucu da aynılarını uygular.
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { validateFields } from "../../../lib/validate.js";
import { postForm } from "../api";
import { C, CONTACT_EMAIL, MAGNET_DEMO_NOTE, formatPrice } from "../config";
import { Button, Consent, Field, useSubmitLock } from "../ui";

// Ortak form durumu: alanlar, rıza, hatalar, gönderim
function useForm(names) {
  const [f, setF] = useState(Object.fromEntries(names.map(n => [n, ""])));
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [failure, setFailure] = useState("");
  const lock = useSubmitLock();
  // Yazmaya başlanan alanın hatası kalkar
  const set = n => v => { setF(cur => ({ ...cur, [n]: v })); setErrors(({ [n]: _, ...rest }) => rest); };
  const toggleConsent = v => { setConsent(v); setErrors(({ consent: _, ...rest }) => rest); };
  const submit = (path, extra, onDone) => lock(async () => {
    const all = { ...f, consent };
    const errs = validateFields(all);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    const r = await postForm(path, { ...all, ...extra });
    if (r.ok) { onDone?.(r); return setStatus("done"); }
    setErrors(r.errors);
    setFailure(r.error);
    setStatus("error");
  });
  const props = (n, label, input) => ({ label, value: f[n], onChangeText: set(n), error: errors[n], ...input });
  return { f, consent, toggleConsent, errors, status, failure, submit, props };
}

function Screen({ children }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }} keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </KeyboardAvoidingView>
  );
}

const Failure = ({ form }) => form.status === "error" ? <Text style={s.failure}>{form.failure} Sorun sürerse {CONTACT_EMAIL} adresine yazın.</Text> : null;

export function OrderForm({ item, home }) {
  const form = useForm(["name", "phone", "email", "address"]);
  const [qty, setQty] = useState(1);
  const [placed, setPlaced] = useState(null);
  const magnet = item.kind === "magnet";
  const total = item.price * qty;

  if (form.status === "done") {
    return (
      <Screen>
        <Text style={s.h1}>Siparişiniz alındı</Text>
        <Text style={s.p}>{placed.productName} · {formatPrice(placed.total)}</Text>
        <Text style={s.p}>Sipariş özeti ve kargo bilgisi {placed.email} adresine gönderilecek.</Text>
        {placed.demo && <Text style={s.demo}>{MAGNET_DEMO_NOTE}</Text>}
        <View style={{ marginTop: 20 }}><Button variant="secondary" title="Kataloğa dön" onPress={home} /></View>
      </Screen>
    );
  }
  return (
    <Screen>
      <Text style={s.h1}>Sipariş</Text>
      <View style={s.summary}>
        <Text style={s.item}>{item.productName}</Text>
        {magnet && item.maxQty > 1 && (
          <View style={s.qtyRow}>
            <Text style={s.p}>Adet</Text>
            {Array.from({ length: item.maxQty }, (_, i) => i + 1).map(n => (
              <Pressable key={n} accessibilityRole="radio" accessibilityState={{ selected: qty === n }} onPress={() => setQty(n)} style={[s.qty, qty === n && s.qtyOn]}>
                <Text style={[s.qtyText, qty === n && { color: C.white }]}>{n}</Text>
              </Pressable>
            ))}
          </View>
        )}
        <Text style={s.total}>Toplam {formatPrice(total)}</Text>
        <Text style={s.small}>Kargo ücreti onayda bildirilir. Ödeme demo: kart bilgisi alınmaz.</Text>
        {magnet && <Text style={s.demo}>{MAGNET_DEMO_NOTE}</Text>}
      </View>
      <Field {...form.props("name", "Ad Soyad", { autoComplete: "name", textContentType: "name" })} />
      <Field {...form.props("phone", "Telefon", { keyboardType: "phone-pad", autoComplete: "tel", textContentType: "telephoneNumber" })} />
      <Field {...form.props("email", "E-posta", { keyboardType: "email-address", autoCapitalize: "none", autoComplete: "email", textContentType: "emailAddress" })} />
      <Field {...form.props("address", "Teslimat adresi", { multiline: true, autoComplete: "street-address", textContentType: "fullStreetAddress" })} />
      <Consent value={form.consent} onChange={form.toggleConsent} error={form.errors.consent} />
      <Failure form={form} />
      <Button
        title={form.status === "sending" ? "Gönderiliyor…" : `Siparişi Ver · ${formatPrice(total)}`}
        disabled={form.status === "sending"}
        onPress={() => form.submit("/api/order", { items: [{ productId: item.productId, quantity: qty }] }, r => setPlaced(r.order))}
      />
    </Screen>
  );
}

export function NotifyForm({ item, home }) {
  const form = useForm(["name", "email"]);
  const magnet = item.kind === "magnet";
  if (form.status === "done") {
    return (
      <Screen>
        <Text style={s.h1}>Teşekkürler</Text>
        <Text style={s.p}>{magnet ? "Magnet yeniden stoğa girince size e-postayla haber vereceğiz." : "Benzer bir eser geldiğinde size e-postayla haber vereceğiz."}</Text>
        <View style={{ marginTop: 20 }}><Button variant="secondary" title="Kataloğa dön" onPress={home} /></View>
      </Screen>
    );
  }
  return (
    <Screen>
      <Text style={s.h1}>{magnet ? "Stok gelince haber ver" : "Benzerini haber ver"}</Text>
      <Text style={[s.p, { marginBottom: 16 }]}>
        {item.productName}: {magnet ? "bu magnet tükendi. Yeniden geldiğinde size haber verelim." : "bu eser satıldı. Benzer bir eser geldiğinde size haber verelim."}
      </Text>
      <Field {...form.props("name", "Ad Soyad", { autoComplete: "name", textContentType: "name" })} />
      <Field {...form.props("email", "E-posta", { keyboardType: "email-address", autoCapitalize: "none", autoComplete: "email", textContentType: "emailAddress" })} />
      <Consent value={form.consent} onChange={form.toggleConsent} error={form.errors.consent} />
      <Failure form={form} />
      <Button
        title={form.status === "sending" ? "Gönderiliyor…" : "Haber Ver"}
        disabled={form.status === "sending"}
        onPress={() => form.submit("/api/notify", { productId: item.productId })}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: "800", color: C.ink, marginBottom: 8 },
  p: { color: C.muted, fontSize: 15, lineHeight: 21 },
  summary: { backgroundColor: C.soft, padding: 14, borderRadius: 8, marginBottom: 18, gap: 6 },
  item: { fontWeight: "700", color: C.ink, fontSize: 16 },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  qty: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: C.line, alignItems: "center", justifyContent: "center", backgroundColor: C.white },
  qtyOn: { backgroundColor: C.accent, borderColor: C.accent },
  qtyText: { fontWeight: "700", color: C.ink },
  total: { fontWeight: "700", color: C.ink, fontSize: 16 },
  small: { fontSize: 12, color: C.muted },
  demo: { fontSize: 12, fontStyle: "italic", color: C.muted, marginTop: 4 },
  failure: { color: C.error, fontWeight: "600", marginBottom: 12 }
});
