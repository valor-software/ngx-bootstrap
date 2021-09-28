import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { setTheme, getBsVer, currentBsVersion, IBsVersion, AvailableBsVersions } from 'ngx-bootstrap/utils';
import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';
import { DOCS_TOKENS } from '../../tokens/docs-routes-token';
import { SIDEBAR_ROUTES, SidebarRoutesType, updateNestedRoutes } from "../../tokens/docs-sidebar-routes-token";

const _bs3Css = 'assets/css/bootstrap-3.3.7/css/bootstrap.min.css';
const _bs4Css = 'assets/css/bootstrap-4.5.3/css/bootstrap.min.css';
const _bs5Css = 'assets/css/bootstrap-5.1.0/css/bootstrap.min.css';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  isShown = false;
  menuIsOpened = true;
  routesStructure?: SidebarRoutesType;
  objectKeys = Object.keys;

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
  search = { text: '' };
  currentTheme?: AvailableBsVersions;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private themeStorage: ThemeStorage,
    public styleManager: StyleManager,
    @Inject(DOCUMENT) private document: any,
    @Inject(DOCS_TOKENS) _routes: Routes,
    @Inject(SIDEBAR_ROUTES) sidebarRoutesStructure: SidebarRoutesType
  ) {
    this.routesStructure = updateNestedRoutes(_routes, sidebarRoutesStructure);
    // console.log(this.routesStructure);
    const themeFromUrl = this.activatedRoute.snapshot.queryParams._bsVersion;
    const currentTheme = themeFromUrl || this.themeStorage.getStoredTheme();
    if (currentTheme) {
      this.installTheme(currentTheme);
    }
  }

  get sideBarItemIsOpened(): void | string {
    for(const item in this.routesStructure) {
      if (this.routesStructure[item as keyof SidebarRoutesType].isOpened) {
        return item;
      }
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
    this.resetMenuItems();
    if (typeof value === 'undefined') {
      this.menuIsOpened = !this.menuIsOpened;
      return;
    }

    if (value !== this.menuIsOpened) {
      this.menuIsOpened = value;
    }
  }

  toggoleMenuItem(value: string): void {
    if (this.routesStructure) {
      const key = value.toLowerCase();
      this.resetMenuItems();
      this.routesStructure[key as keyof SidebarRoutesType].isOpened = !this.routesStructure[key as keyof SidebarRoutesType].isOpened;
    }

  }

  resetMenuItems() {
    for(const item in this.routesStructure) {
      this.routesStructure[item as keyof SidebarRoutesType].isOpened = false;
    }
  }

}


