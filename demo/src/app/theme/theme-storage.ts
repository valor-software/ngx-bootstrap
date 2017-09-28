// Copyright (c) 2017 Google, Inc.

import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ThemeStorage {
  static storageKey = 'bs-theme-storage-current';

  public onThemeUpdate: EventEmitter<string> = new EventEmitter<string>();

  public storeTheme(theme: 'bs3' | 'bs4') {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme;
    } catch (e) {}
    this.onThemeUpdate.emit(theme);
  }

  public getStoredTheme(): 'bs3' | 'bs4' {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch (e) {
      return null;
    }
  }

  public clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch (e) {}
  }
}
