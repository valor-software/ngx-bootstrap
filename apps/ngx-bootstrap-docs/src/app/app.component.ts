import { DOCUMENT } from '@angular/common';
import { AfterContentInit, Component, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSerializer } from '@angular/router';
import { PageScrollService } from 'ngx-page-scroll-core';

import { Analytics } from '@ngx-bootstrap-doc/docs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'bs-demo',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterContentInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageScrollService: PageScrollService,
    private urlSerializer: UrlSerializer,
    private analytics: Analytics,
    @Inject(DOCUMENT) private document: any
  ) {}

  // almost same logic exists in top-menu component
  ngAfterContentInit(): any {
    this.analytics.trackPageViews();
    const getUrl = (router: Router) =>
      router.routerState.snapshot.url.slice(0, router.routerState.snapshot.url.indexOf('#'));
    let _prev = getUrl(this.router);
    const justDoIt = (): void => {
      const _cur = getUrl(this.router);
      if (typeof PR !== 'undefined' && _prev !== _cur) {
        _prev = _cur;
        // google code-prettify
        PR.prettyPrint();
      }

      const hash = this.route.snapshot.fragment;
      if (hash) {
        this.pageScrollService.scroll({ document: this.document, scrollTarget: `#${hash}` });
      }
    };

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => setTimeout(() => justDoIt(), 50));
  }
}
