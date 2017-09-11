import { AfterContentInit, Component, Inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSerializer
} from '@angular/router';
import { isBs3 } from 'ngx-bootstrap/utils';

import {
  PageScrollConfig,
  PageScrollInstance,
  PageScrollService
} from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/common';
import { Analytics } from './api-docs/analytics/analytics';

PageScrollConfig.defaultDuration = 11;
PageScrollConfig.defaultScrollOffset = 70;

@Component({
  selector: 'bs-demo',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterContentInit {
  public get isBs3(): boolean {
    return isBs3();
  }

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageScrollService: PageScrollService,
    private urlSerializer: UrlSerializer,
    private _analytics: Analytics,
    @Inject(DOCUMENT) private document: any
  ) {}

  // almost same logic exists in top-menu component
  public ngAfterContentInit(): any {
    this._analytics.trackPageViews();
    const getUrl = (router: Router) =>
      router.routerState.snapshot.url.slice(
        0,
        router.routerState.snapshot.url.indexOf('#')
      );
    let _prev = getUrl(this.router);
    const justDoIt = (event: any): void => {
      const _cur = getUrl(this.router);
      if (typeof PR !== 'undefined' && _prev !== _cur) {
        _prev = _cur;
        // google code-prettify
        PR.prettyPrint();
      }

      const hash = this.route.snapshot.fragment;
      if (hash) {
        const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleDirectionInstance(
          this.document,
          `#${hash}`,
          true
        );
        this.pageScrollService.start(pageScrollInstance);
      }
    };

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: any) => setTimeout(() => justDoIt(event), 50));
  }
}
