import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements AfterViewInit {
  appUrl?: string;
  appHash?: string;
  currentVersion?: string;
  isBrowser: boolean;

  previousDocs: {
    url: string;
    version: string;
    unprefixedUrl: string;
  }[] = [];

  isLocalhost = false;
  needPrefix = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: number,
    private http: HttpClient,
    private router: Router
  ) {
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

      this.http.get<any>('assets/json/versions.json')
        .subscribe((data: { url: string; version: string; unprefixedUrl: string }[]) => {
          this.previousDocs.push(data[0]);
          this.previousDocs = this.previousDocs
            .concat(data.reverse())
            .slice(0, -1);
        });

      this.http.get<{ version: string }>('assets/json/current-version.json')
        .subscribe((data: { version: string }) => {
          this.currentVersion = data.version;
        });
    }

    const getUrl = (router: Router) => {
      const indexOfHash = router.routerState.snapshot.url.indexOf('#');

      return router.routerState.snapshot.url.slice(0, indexOfHash);
    };

    let _prev = getUrl(this.router);
    this.router.events.subscribe((event: any) => {
      const _cur = getUrl(this.router);
      if (typeof window !== 'undefined') {
        this.appHash = location.hash === '#/' ? '' : location.hash;
      }
      if (event instanceof NavigationEnd && _cur !== _prev) {
        _prev = _cur;
      }
    });
  }
}
