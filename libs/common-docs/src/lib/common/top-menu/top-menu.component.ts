import { AfterViewInit, Component, DestroyRef, inject, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  standalone: false
})
export class TopMenuComponent implements AfterViewInit {
  shadowRoutes = ['/documentation', '/discover', '/schematics', '/'];
  appUrl?: string;
  appHash?: string;
  currentVersion?: string;
  isBrowser: boolean;
  initBoxShadow = false;
  isLocalhost = false;
  needPrefix = false;
  destroyRef = inject(DestroyRef);
  previousDocs: {
    url: string;
    version: string;
    unprefixedUrl: string;
  }[] = [];

  constructor(@Inject(PLATFORM_ID) platformId: number, private http: HttpClient, private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    // todo: remove this sh**
    if (typeof window !== 'undefined') {
      this.isLocalhost = location.hostname === 'localhost';
      this.needPrefix = location.pathname !== '/';

      this.appUrl = location.protocol + '//' + location.hostname + (this.isLocalhost ? ':' + location.port + '/' : '/');

      this.http
        .get<{ url: string; version: string; unprefixedUrl: string }[]>('assets/json/versions.json')
        .subscribe((data) => {
          this.previousDocs = data.sort((versionA, versionB) => {
            const versionAsNumberA = Number(versionA.version.split('.').join(''));
            const versionAsNumberB = Number(versionB.version.split('.').join(''));
            return versionAsNumberB - versionAsNumberA;
          });
        });

      this.http.get<{ version: string }>('assets/json/current-version.json').subscribe((data: { version: string }) => {
        this.currentVersion = data.version;
      });
    }

    const getUrl = (router: Router) => {
      const indexOfHash = router.routerState.snapshot.url.indexOf('#');
      return indexOfHash ? router.routerState.snapshot.url : router.routerState.snapshot.url.slice(0, indexOfHash);
    };

    let _prev = getUrl(this.router);
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      const _cur = getUrl(this.router);
      this.initBoxShadow = this.shadowRoutes.includes(_cur);
      if (typeof window !== 'undefined') {
        this.appHash = location.hash === '#/' ? '' : location.hash;
      }

      if (event instanceof NavigationEnd && _cur !== _prev) {
        _prev = _cur;
      }
    });
  }
}
