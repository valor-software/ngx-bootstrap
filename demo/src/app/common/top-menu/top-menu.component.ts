import { AfterViewInit, Component, Inject, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements AfterViewInit {
  public isShown: boolean = false;

  private renderer: Renderer;
  private document: any;
  private router: Router;

  public constructor(renderer: Renderer, @Inject(DOCUMENT) document: any, router: Router) {
    this.router = router;
    this.renderer = renderer;
    this.document = document;
  }

  public ngAfterViewInit(): any {
    // todo: remove this sh**
    const getUrl = (router: Router) => router.routerState.snapshot.url.slice(0, router.routerState.snapshot.url.indexOf('#'));
    let _prev = getUrl(this.router);
    this.router.events.subscribe((event: any) => {
      let _cur = getUrl(this.router);
      if (event instanceof NavigationEnd && _cur !== _prev) {
        _prev = _cur;
        this.toggle(false);
      }
    });
  }

  public toggle(isShown?: boolean): void {
    this.isShown = typeof isShown === 'undefined' ? !this.isShown : isShown;
    if (this.document && this.document.body) {
      this.renderer.setElementClass(this.document.body, 'isOpenMenu', this.isShown);
      if (this.isShown === false) {
        this.renderer.setElementProperty(this.document.body, 'scrollTop', 0);
      }
    }
  }
}
