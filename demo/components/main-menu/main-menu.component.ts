import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { routes } from './../../router.config';
import { SearchFilterPipe } from './search-filter.pipe';
import { Ng2BootstrapTheme, Ng2BootstrapConfig } from '../../../components/ng2-bootstrap-config';

// webpack html imports
let template = require('./main-menu.template.html');

@Component({
  selector: 'main-menu',
  template,
  pipes: [SearchFilterPipe]
})

export class MainMenuComponent {
  public isBs3: boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
  public routes: any = routes;
  public search: any = {};
  public hash: string = '';

  public constructor(private router: Router) {
    this.routes = this.routes.filter((v: any) => v.path !== '**');
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.hash = event.url;
      }
    });
  }
}
