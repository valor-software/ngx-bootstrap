import {Component, Inject} from '@angular/core';
import {RouterLink, Router} from '@angular/router-deprecated';

import {routes} from './../../config';
import {SearchFilterPipe} from './search-filter.pipe';
import {Ng2BootstrapTheme, Ng2BootstrapConfig} from '../../../components/ng2-bootstrap-config';

// webpack html imports
let template = require('./main-menu.template.html');

@Component({
  selector: 'main-menu',
  template: template,
  directives: [RouterLink],
  pipes: [SearchFilterPipe]
})

export class MainMenuComponent {
  public isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
  public routes:any = routes;
  public router:Router;
  public search:any = {};
  public hash: string = '';

  public constructor(@Inject(Router) router:Router) {
    this.router = router;
    this.router.subscribe((hash:string)=>this.hash = hash);
  }
}
