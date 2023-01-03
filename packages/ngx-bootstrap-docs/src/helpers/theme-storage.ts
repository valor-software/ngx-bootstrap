// function storeTheme(theme: AvailableBsVersions) {
//     try {
//         window.localStorage[ThemeStorage.storageKey] = theme;
//     } catch (e) {
//         return null;
//     }
//
//     this.onThemeUpdate.emit(theme);
//     return;
// }
//
// function getStoredTheme(): AvailableBsVersions |null {
//     try {
//         return window.localStorage[ThemeStorage.storageKey] || null;
//     } catch (e) {
//         return null;
//     }
// }
//
// function clearStorage() {
//     try {
//         window.localStorage.removeItem(ThemeStorage.storageKey);
//         return;
//     } catch (e) {
//         return null;
//     }
// }
