import { ActivatedRoute, Route, NavigationEnd, Router, Routes } from '@angular/router';
import { Component, Inject, HostBinding, Renderer2, HostListener } from "@angular/core";
import { DOCUMENT } from '@angular/common';

import { setTheme, getBsVer, currentBsVersion, IBsVersion, AvailableBsVersions } from 'ngx-bootstrap/utils';
import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';
import { DOCS_TOKENS } from '../../tokens/docs-routes-token';
import { SIDEBAR_ROUTES, SidebarRoutesType, updateNestedRoutes, NestedRoute } from "../../tokens/docs-sidebar-routes-token";
import { Subscription } from "rxjs";

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

  routesStructure?: SidebarRoutesType;
  objectKeys = Object.keys;
  scrollSubscription: Subscription;
  @HostBinding('class.menuIsOpened') menuIsOpened = true;

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
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    @Inject(DOCS_TOKENS) _routes: Routes,
    @Inject(SIDEBAR_ROUTES) sidebarRoutesStructure: SidebarRoutesType
  ) {
    if (innerWidth <= 991) {
      this.menuIsOpened = false;
    }
    this.routesStructure = updateNestedRoutes(_routes, sidebarRoutesStructure);
    this.initBodyClass();
    this.scrollSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.openMenuWithRoutePath(this.checkRoutePath(event.url), _routes);
      }
    });
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
    }

    if (typeof value !== 'undefined' && value !== this.menuIsOpened) {
      this.menuIsOpened = value;
    }

    this.initBodyClass();
  }

  initBodyClass() {
    if (this.menuIsOpened) {
      this._renderer.addClass(this.document.body, 'menuIsOpened');
    } else {
      this._renderer.removeClass(this.document.body, 'menuIsOpened');
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

  openSemiItemMenu(semiMenu: NestedRoute, nestedRoutes: NestedRoute[]) {
    this.resetSemiMenu(nestedRoutes);
    semiMenu.isOpened = true;
  }

  resetSemiMenu(nestedRoutes: NestedRoute[]) {
    nestedRoutes.forEach(item => {
      item.isOpened = false;
    });
  }

  checkRoutePath(path: string): string {
    let currentPath = path.split('/');
    currentPath = currentPath[1].split('#');
    return currentPath[0];
  }

  openMenuWithRoutePath(path: string, routes: Routes) {
    const cyrrentRoute = routes.filter(route => route.path === path);
    if (!cyrrentRoute?.length || !cyrrentRoute[0].data?.[1].sideBarParentTitle || !this.routesStructure) {
      return;
    }

    const key = cyrrentRoute[0].data?.[1].sideBarParentTitle;
    this.routesStructure[key as keyof SidebarRoutesType].isOpened = true;
    const currentMenuItem = this.routesStructure?.[key as keyof SidebarRoutesType].nestedRoutes.find(route => route.path === path);
    if (currentMenuItem) {
      currentMenuItem.isOpened = true;
    }

  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

}


