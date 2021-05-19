// Copyright (c) 2017 Google, Inc.
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ThemeStorage {
  static storageKey = 'bs-theme-storage-current';

  onThemeUpdate: EventEmitter<string> = new EventEmitter<string>();

  storeTheme(theme: 'bs3' | 'bs4' | 'bs5') {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme;
    } catch (e) {
      return null;
    }

    this.onThemeUpdate.emit(theme);
  }

  getStoredTheme(): 'bs3' | 'bs4' | 'bs5' |null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch (e) {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch (e) {
      return null;
    }
  }
}
