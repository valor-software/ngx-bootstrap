import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../../../components/ng2-bootstrap-config';
import { routes } from './../../router.config';
import { SearchFilterPipe } from './search-filter.pipe';

// webpack html imports
let template = require('./main-menu.template.html');

@Component({
  selector: 'main-menu',
  template,
  pipes: [SearchFilterPipe]
})

export class MainMenuComponent {
  public isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
  public routes:any = routes;
  public search:any = {};
  public hash:string = '';

  public constructor(private router:Router) {
    this.routes = this.routes.filter((v:any) => v.path !== '**');
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        this.hash = event.url;
      }
    });
  }
}
