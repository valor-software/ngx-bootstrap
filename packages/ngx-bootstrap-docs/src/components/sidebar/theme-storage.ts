// Copyright (c) 2017 Google, Inc.
export type AvailableBsVersions = 'bs4' | 'bs5';

export class ThemeStorage {
    static storageKey = 'bs-theme-storage-current';

    storeTheme(theme: AvailableBsVersions) {
        try {
            window.localStorage[ThemeStorage.storageKey] = theme;
        } catch (e) {
            return null;
        }

        return;
    }

    getStoredTheme(): AvailableBsVersions |null {
        try {
            return window.localStorage[ThemeStorage.storageKey] || null;
        } catch (e) {
            return null;
        }
    }

    clearStorage() {
        try {
            window.localStorage.removeItem(ThemeStorage.storageKey);
            return;
        } catch (e) {
            return null;
        }
    }
}
