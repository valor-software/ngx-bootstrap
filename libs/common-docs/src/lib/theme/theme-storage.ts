// Copyright (c) 2017 Google, Inc.
import { EventEmitter, Injectable } from '@angular/core';
import { availableBsVersions } from 'ngx-bootstrap/utils';

@Injectable()
export class ThemeStorage {
  static storageKey = 'bs-theme-storage-current';

  onThemeUpdate: EventEmitter<string> = new EventEmitter<string>();

  storeTheme(theme: availableBsVersions) {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme;
    } catch (e) {
      return null;
    }

    this.onThemeUpdate.emit(theme);
    return;
  }

  getStoredTheme(): availableBsVersions |null {
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
