// Copyright (c) 2017 Google, Inc.
export type AvailableBsVersions = 'bs4' | 'bs5';
export const storageKey = 'bs-theme-storage-current';

export function storeTheme(theme: AvailableBsVersions) {
    try {
        window.localStorage[storageKey] = theme;
    } catch (e) {
        return null;
    }

    return;
}

export function getStoredTheme(): AvailableBsVersions |null {
    try {
        return window.localStorage[storageKey] || null;
    } catch (e) {
        return null;
    }
}

export function clearStorage() {
    try {
        window.localStorage.removeItem(storageKey);
        return;
    } catch (e) {
        return null;
    }
}

