import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from 'ng2-bootstrap';
import { routes } from '../../app.routing';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent {
  public isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
  public routes:any = routes;
  public search:any = {};
  public hash:string = '';

  private router: Router;
  public constructor(router:Router) {
    this.router = router;
    this.routes = this.routes.filter((v:any) => v.path !== '**');
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        this.hash = event.url;
      }
    });
  }
}
