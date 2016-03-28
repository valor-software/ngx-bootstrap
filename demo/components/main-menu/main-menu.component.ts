import {Component, Inject} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

import {config} from './../../config';
import {SearchFilter} from './search-filter.pipe';

// webpack html imports
let template = require('./main-menu.template.html');

@Component({
  selector: 'main-menu',
  template: template,
  directives: [RouterLink],
  pipes: [SearchFilter]
})

export class MainMenuComponent {
  private routes:any = config.routes;
  private router:Router;
  private search:any = {};

  constructor(@Inject(Router) router:Router) {
    this.router = router;
  }
}
