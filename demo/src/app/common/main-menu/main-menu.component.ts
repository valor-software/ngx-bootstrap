import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isBs3 } from 'ngx-bootstrap/utils';
import { routes } from '../../app.routing';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent {
  public get isBs3(): boolean {
    return isBs3();
  }

  public routes: any = routes;
  public search: any = {};
  public hash: string = '';

  private router: Router;

  public constructor(router: Router) {
    this.router = router;
    this.routes = this.routes.filter((v: any) => v.path !== '**');
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.hash = event.url;
      }
    });
  }
}
