import { AfterViewInit, Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavigationEnd, Router, UrlSerializer } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements AfterViewInit {
  appUrl: string;
  appHash: string;
  currentVersion: string;
  previousDocs: string[] = [];
  isLocalhost = false;
  needPrefix = false;

  constructor(
    private router: Router,
    private http: Http
  ) { }

  ngAfterViewInit(): any {
    // todo: remove this sh**
    this.isLocalhost = location.hostname === 'localhost';
    this.needPrefix = location.pathname !== '/';
    const getUrl = (router: Router) => {
      const indexOfHash = router.routerState.snapshot.url.indexOf('#');

      return router.routerState.snapshot.url.slice(0, indexOfHash);
    };
    let _prev = getUrl(this.router);
    this.router.events.subscribe((event: any) => {
      const _cur = getUrl(this.router);
      this.appHash = location.hash === '#/' ? '' : location.hash;
      if (event instanceof NavigationEnd && _cur !== _prev) {
        _prev = _cur;
      }
    });

    this.http
      .get('assets/json/versions.json')
      .map(res => res.json())
      .subscribe((data: any) => {
        this.previousDocs = data;
      });
    this.http
      .get('assets/json/current-version.json')
      .map(res => res.json())
      .subscribe((data: any) => {
        this.currentVersion = data.version;
      });

    this.appUrl =
      location.protocol +
      '//' +
      location.hostname +
      (this.isLocalhost ? ':' + location.port + '/' : '/');
  }
}
