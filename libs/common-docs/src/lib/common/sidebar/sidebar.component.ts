import { ActivatedRoute, NavigationEnd, Route, Router, Routes } from '@angular/router';
import { Component, Inject, OnDestroy, Renderer2, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { setTheme, getBsVer, isBs3 } from 'ngx-bootstrap/utils';
import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';
import { IBsVersion, bsVerions} from '../../models/bsVersions.model';
import { Subscription } from 'rxjs';
import { DOCS_TOKENS } from '../../tokens/docs-routes-token';
const _bs3Css = 'assets/css/bootstrap-3.3.7/css/bootstrap.min.css';
const _bs4Css = 'assets/css/bootstrap-4.0.0/css/bootstrap.min.css';
const _bs5Css = 'assets/css/bootstrap-5.0.1/css/bootstrap.min.css';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnDestroy {
  isShown = false;

  /** @deprecated */
  get isBs3(): boolean {
    return isBs3();
  }

  get bsCssFile(): string {
    const bsVer = this._getBsVer;
    return bsVer.isBs3 ? _bs3Css : bsVer.isBs5 ? _bs5Css : _bs4Css
  }

  get currentBsVersion(): 'bs3' | 'bs4' | 'bs5' {
    const bsVer = this._getBsVer;
    const resVersion = Object.keys(bsVer).find(key => bsVer[key])
    return bsVerions[resVersion]
  }

  get _getBsVer (): IBsVersion {
    return getBsVer()
  }

  routes: Routes;
  search = { text: '' };

  currentTheme: 'bs3' | 'bs4' | 'bs5';
  scrollSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
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

    this.scrollSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.toggle(false);
      }
    });
  }

  toggle(isShown?: boolean): void {
    this.isShown = typeof isShown === 'undefined' ? !this.isShown : isShown;
    if (this.document && this.document.body) {

      if (this.isShown) {
        this.renderer.addClass(this.document.body, 'isOpenMenu');
      } else {
        this.renderer.removeClass(this.document.body, 'isOpenMenu');
      }

      if (this.isShown === false && this.document.documentElement) {
        this.renderer.setProperty(this.document.documentElement, 'scrollTop', '0');
        this.renderer.setProperty(this.document.body, 'scrollTop', '0');
      }
    }
  }

  installTheme(theme: 'bs3' | 'bs4' | 'bs5') {
    setTheme(theme);
    this.currentTheme = this.currentBsVersion;
    this.styleManager.setStyle('theme', this.bsCssFile);
    if (this.currentBsVersion) {
      this.themeStorage.storeTheme(this.currentBsVersion);
    }
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }
}


