// Metro, uygulama klasörünün dışındaki ortak dosyaları da paketlesin:
// ../data/products.js (eser kataloğu) ve ../lib/validate.js (form kuralları) web sitesiyle aynı dosyalardır.
// AtölyeKart bir npm workspace değil (Vercel web yayını Expo'yu kurmasın diye), bu yüzden üst klasör elle izleniyor.
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.watchFolders = [path.resolve(__dirname, "..")];

module.exports = config;
