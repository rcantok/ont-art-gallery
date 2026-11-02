// ---- Katalog çözümleyici: sayfa (index.html), sunucu (api/) ve mobil aynı kuralı kullanır ----
// Bir sepet/sipariş kimliği ya orijinal eserdir ("ont-001") ya da onun demo magnetidir ("mag-ont-001").
// Ad, fiyat, stok ve adet sınırı yalnızca buradan okunur; tarayıcıdan gelen değere güvenilmez.
import { PRODUCTS, MAGNET, MAGNET_SOLD_OUT } from "../data/products.js";

export const MAGNET_PREFIX = "mag-";
export const magnetId = id => MAGNET_PREFIX + id;
export const magnetStock = id => MAGNET_SOLD_OUT.includes(id) ? 0 : MAGNET.stock;

// Kimliği ürün bilgisine çevirir; bilinmeyen kimlikte null döner.
// maxQty: o an sipariş edilebilecek en fazla adet (0 = satın alınamaz / tükendi).
export function resolveItem(productId) {
  if (typeof productId !== "string") return null;
  if (productId.startsWith(MAGNET_PREFIX)) {
    const product = PRODUCTS.find(p => p.id === productId.slice(MAGNET_PREFIX.length));
    if (!product) return null;
    const stock = magnetStock(product.id);
    return {
      kind: "magnet", productId, product,
      productName: `${product.title} — Magnet`,
      price: MAGNET.price, stock, maxQty: Math.min(MAGNET.maxPerOrder, stock), prepDays: MAGNET.prepDays
    };
  }
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return null;
  const buyable = product.original.status === "available" && product.original.price != null;
  return {
    kind: "original", productId, product,
    productName: product.title,
    price: product.original.price, stock: buyable ? 1 : 0, maxQty: buyable ? 1 : 0, prepDays: null
  };
}
