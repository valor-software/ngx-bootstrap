import { ActivatedRoute, NavigationEnd, Router, Routes, UrlSegment } from '@angular/router';
import { Component, HostBinding, Inject, inject, Renderer2 } from '@angular/core';

import { AvailableBsVersions, currentBsVersion, getBsVer, IBsVersion, setTheme } from 'ngx-bootstrap/utils';
import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';
import { DOCS_TOKENS } from '../../tokens/docs-routes-token';
import { NestedRouteType, SidebarRouteItemValueType, SidebarRoutesType } from '../../models/sidebar-routes.model';
import { SIDEBAR_ROUTES } from '../../tokens/docs-sidebar-routes-token';
import { initNestedRoutes } from './helpers/sidebar-helpers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const _bs4Css = 'assets/css/bootstrap-4.5.3/css/bootstrap.min.css';
const _bs5Css = 'assets/css/bootstrap-5.2.3/css/bootstrap.min.css';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  standalone: false
})
export class SidebarComponent {
  isShown = false;

  routesStructure?: SidebarRoutesType;
  objectKeys = Object.keys;
  @HostBinding('class.menuIsOpened') menuIsOpened = true;

  get bsCssFile(): string {
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
  bodyElement: HTMLBodyElement;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private themeStorage: ThemeStorage,
    public styleManager: StyleManager,
    @Inject(DOCS_TOKENS) _routes: Routes,
    @Inject(SIDEBAR_ROUTES) sidebarRoutesStructure: SidebarRoutesType
  ) {
    if (innerWidth <= 991) {
      this.menuIsOpened = false;
    }
    this.bodyElement = inject(Renderer2).selectRootElement('body', true);
    this.routesStructure = initNestedRoutes(_routes, sidebarRoutesStructure);
    this.initBodyClass();
    this.firstMenuIniting(_routes);
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.firstMenuIniting(_routes);
      }
    });
    const themeFromUrl = this.activatedRoute.snapshot.queryParams['_bsVersion'];
    const currentTheme = themeFromUrl || this.themeStorage.getStoredTheme();
    if (currentTheme) {
      this.installTheme(currentTheme);
    }
  }

  get sideBarItemIsOpened(): void | keyof SidebarRoutesType {
    for (const item in this.routesStructure) {
      if (this.routesStructure[item as keyof SidebarRoutesType].isOpened) {
        return item as keyof SidebarRoutesType;
      }
    }
  }

  firstMenuIniting(routes: Routes) {
    this.resetMenuItems();
    this.openMenuWithRoutePath(this.checkRoutePath(), routes);
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
    }

    if (typeof value !== 'undefined' && value !== this.menuIsOpened) {
      this.menuIsOpened = value;
    }

    this.initBodyClass();
  }

  initBodyClass() {
    if (this.menuIsOpened) {
      this.bodyElement.classList.add('menuIsOpened');
    } else {
      this.bodyElement.classList.remove('menuIsOpened');
    }
  }

  toggleMenuItem(event: Event, value: string): void {
    event.stopPropagation();
    if (this.routesStructure) {
      const key = value.toLowerCase();
      this.resetMenuItems();
      this.routesStructure[key as keyof SidebarRoutesType].isOpened =
        !this.routesStructure[key as keyof SidebarRoutesType].isOpened;
      if (this.routesStructure[key as keyof SidebarRoutesType].path) {
        this.router.navigate([this.routesStructure[key as keyof SidebarRoutesType].path]);
      }
    }
  }

  resetMenuItems() {
    for (const item in this.routesStructure) {
      this.routesStructure[item as keyof SidebarRoutesType].isOpened = false;
      this.resetSemiMenu(this.routesStructure[item as keyof SidebarRoutesType].nestedRoutes);
    }
  }

  openSemiItemMenu(semiMenu: NestedRouteType, nestedRoutes: NestedRouteType[]) {
    this.resetSemiMenu(nestedRoutes);
    semiMenu.isOpened = true;
    if (semiMenu.path) {
      this.router.navigate([semiMenu.path]);
      this.closeAdaptiveMenu();
    }
  }

  closeAdaptiveMenu() {
    if (innerWidth <= 991) {
      this.menuIsOpened = false;
      this.toggleSideBar(false);
    }
  }

  resetSemiMenu(nestedRoutes: NestedRouteType[]) {
    nestedRoutes.forEach((item) => {
      item.isOpened = false;
    });
  }

  checkRoutePath(): string[] {
    const tree: UrlSegment[] = this.router.parseUrl(this.router.url).root?.children?.['primary']?.segments;
    const result = new Set<string>();
    tree?.map((segment) => {
      result.add(segment.path);
    });
    return [...result];
  }

  openMenuWithRoutePath(path: string[], routes: Routes) {
    if (!this.routesStructure) {
      return;
    }

    if (path.length > 1) {
      this.openMenuWithRoute(`/${path[0]}/${path[1]}`, path[0]);
      return;
    }

    const currentRoute = routes.filter((route) => route.path === path[0]);
    if (
      !currentRoute?.length ||
      (!currentRoute[0].data?.[1]?.sideBarParentTitle && !currentRoute[0].children?.length)
    ) {
      return;
    }

    const key = currentRoute[0].children?.length ? currentRoute[0].path : currentRoute[0].data?.[1]?.sideBarParentTitle;
    this.openMenuWithRoute(path[0], key);
  }

  openMenuWithRoute(routePath: string, parentPath: string) {
    if (!this.routesStructure) {
      return;
    }

    this.routesStructure[parentPath as keyof SidebarRoutesType].isOpened = true;
    const currentMenuItem = this.routesStructure?.[parentPath as keyof SidebarRoutesType].nestedRoutes.find(
      (route) => route.path === routePath
    );
    this.setMenuProperties(currentMenuItem);
  }

  setMenuProperties(currentMenuItem?: NestedRouteType) {
    if (!currentMenuItem) {
      return;
    }

    const params = this.router.parseUrl(this.router.url).queryParams;
    currentMenuItem.isOpened = true;
    currentMenuItem.fragments.forEach((item: { title: string; path: string; isOpened: boolean }) => {
      item.isOpened = item.path === params['tab'];
    });
  }

  getRouteStructureKey(value: string): SidebarRouteItemValueType | undefined {
    return this.routesStructure?.[value as keyof SidebarRoutesType];
  }
}
