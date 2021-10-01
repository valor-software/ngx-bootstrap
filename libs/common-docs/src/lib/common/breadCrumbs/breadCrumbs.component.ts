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
  constructor(
    private router: Router
  ) {
    this.scrollSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        let urls = event.url.split('/');
        urls = urls.map(item => {
          const checkParams = item.split('#');
          if (checkParams.length) {
            console.log('item', item);
            console.log('checkParams', checkParams);
            item = checkParams[0];
            console.log('item2', item);
          }
          console.log('item2', item);
          return item;
        });
        console.log(urls);
      }
    });
  }
}
