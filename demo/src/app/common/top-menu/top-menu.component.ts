import { AfterViewInit, Component, Inject, Renderer } from '@angular/core';
import { Http } from '@angular/http';
import { DOCUMENT } from '@angular/platform-browser';
import { NavigationEnd, Router, UrlSerializer } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements AfterViewInit {
  public isShown = false;
  public appUrl: string;
  public appHash: string;
  public currentVersion: string;
  public previousDocs: string[] = [];
  public isLocalhost = false;

  public constructor(
    private renderer: Renderer,
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private http: Http
  ) {}

  public ngAfterViewInit(): any {
    // todo: remove this sh**
    this.isLocalhost = location.hostname === 'localhost';
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
        this.toggle(false);
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

  public toggle(isShown?: boolean): void {
    this.isShown = typeof isShown === 'undefined' ? !this.isShown : isShown;
    if (this.document && this.document.body) {
      this.renderer.setElementClass(
        this.document.body,
        'isOpenMenu',
        this.isShown
      );
      if (this.isShown === false) {
        this.renderer.setElementProperty(this.document.body, 'scrollTop', 0);
      }
    }
  }
}
