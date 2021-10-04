import { Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bread-crumbs',
  templateUrl: 'breadCrumbs.component.html'
})

export class BreadCrumbsComponent {
  scrollSubscription: Subscription;
  routeArray: string[] = [];

  constructor(
    private router: Router
  ) {
    this.scrollSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        let urls = event.url.split('/');
        urls = urls.filter(item => item);
        urls = urls.map(item => {
          const checkFragments = item.split('#');
          if (checkFragments.length && checkFragments[0]) {
            item = checkFragments[0];
          }

          return item;
        });
        this.routeArray = urls;
      }
    });
  }

  navigate(index?: number) {
    if (index !== undefined) {
      index++;
    }

    if (!index) {
      this.router.navigate(['']);
      return;
    }

    const urls = this.routeArray.slice(0, index);
    this.router.navigate([`/${urls.join('/')}`]);
  }
}
