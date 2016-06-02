import {Component, Inject} from '@angular/core';
import {RouterLink, Router} from '@angular/router-deprecated';

import {routes} from './../../config';
import {SearchFilterPipe} from './search-filter.pipe';

// webpack html imports
let template = require('./main-menu.template.html');

@Component({
  selector: 'main-menu',
  template: template,
  directives: [RouterLink],
  pipes: [SearchFilterPipe]
})

export class MainMenuComponent {
  public routes:any = routes;
  public router:Router;
  public search:any = {};

  public constructor(@Inject(Router) router:Router) {
    this.router = router;
  }
}
