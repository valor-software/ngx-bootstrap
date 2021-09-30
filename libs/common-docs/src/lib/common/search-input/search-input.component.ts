import { ActivatedRoute, NavigationEnd, Route, Router, Routes } from "@angular/router";
import { Component, Inject, OnDestroy, Renderer2, Input } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { DOCS_TOKENS } from '../../tokens/docs-routes-token';
import { Subscription } from "rxjs";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'search-input',
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent implements OnDestroy{
  @Input() showInput = true;
  isShown = false;
  routes: Routes;
  search = { text: '' };
  // scrollSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    @Inject(DOCS_TOKENS) _routes: Routes,
    private renderer: Renderer2
  ) {
    this.routes = _routes.filter((v: Route) => v.path !== '**');
    // this.scrollSubscription = this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     this.toggle(false);
    //   }
    // });
  }

  preventReloading(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.key === 'Enter') {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    // this.scrollSubscription.unsubscribe();
  }
}


