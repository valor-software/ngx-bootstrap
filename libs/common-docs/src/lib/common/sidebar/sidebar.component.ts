import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { setTheme, getBsVer, currentBsVersion, IBsVersion, AvailableBsVersions } from 'ngx-bootstrap/utils';
import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';
import { DOCS_TOKENS } from '../../tokens/docs-routes-token';

const _bs3Css = 'assets/css/bootstrap-3.3.7/css/bootstrap.min.css';
const _bs4Css = 'assets/css/bootstrap-4.5.3/css/bootstrap.min.css';
const _bs5Css = 'assets/css/bootstrap-5.1.0/css/bootstrap.min.css';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host:{
    '[class.menuIsOpened]': 'menuIsOpened',
  }
})
export class SidebarComponent {
  isShown = false;
  menuIsOpened = true;

  get bsCssFile(): string {
    if (this.currentTheme === 'bs3') {
      return _bs3Css;
    }

    if (this.currentTheme === 'bs5') {
      return _bs5Css;
    }

    return _bs4Css;
  }

  get _bsVersions(): IBsVersion {
    return getBsVer();
  }

  routes: Routes;
  search = { text: '' };
  currentTheme?: AvailableBsVersions;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private themeStorage: ThemeStorage,
    public styleManager: StyleManager,
    @Inject(DOCUMENT) private document: any,
    @Inject(DOCS_TOKENS) _routes: Routes
  ) {
    this.routes = _routes.filter((v: Route) => v.path !== '**');
    const themeFromUrl = this.activatedRoute.snapshot.queryParams._bsVersion;
    const currentTheme = themeFromUrl || this.themeStorage.getStoredTheme();
    if (currentTheme) {
      this.installTheme(currentTheme);
    }
  }

  installTheme(theme: AvailableBsVersions) {
    setTheme(theme);
    this.currentTheme = currentBsVersion();
    this.styleManager.setStyle('theme', this.bsCssFile);
    if (this.currentTheme) {
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

  toggleSideBar(value?: boolean) {
    if (typeof value === 'undefined') {
      this.menuIsOpened = !this.menuIsOpened;
      return;
    }

    if (value !== this.menuIsOpened) {
      this.menuIsOpened = value;
    }
  }
}


