import { ActivatedRoute, NavigationEnd, Route, Router, Routes } from '@angular/router';
import { Component, Inject, OnDestroy, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { setTheme, getBsVer, currentBsVersion, IBsVersion } from 'ngx-bootstrap/utils';
import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';
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

  get bsCssFile(): string {
    if (this.currentTheme === 'bs3') {
      return _bs3Css
    }

    if (this.currentTheme === 'bs5') {
      return _bs5Css
    }

    return _bs4Css
  }

  get _bsVersions(): IBsVersion {
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
    this.currentTheme = currentBsVersion();
    this.styleManager.setStyle('theme', this.bsCssFile);
    if (this.currentTheme) {
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }
}


