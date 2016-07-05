import {
  Component, enableProdMode, ViewContainerRef, AfterContentInit
} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {
  RouterOutlet, RouteConfig, ROUTER_PROVIDERS, Router
} from '@angular/router-deprecated';
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../ng2-bootstrap';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {routes} from './config';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';

// google code-prettify
declare const PR:any;

// todo: enable prod mod only for prod build
if (ENV) {
enableProdMode();
}

let w:any = window;

if (w && w.__theme === 'bs4') {
  Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
}

let tmp = require('./demo.template.html');

@Component({
  selector: 'demo',
  template: tmp,
  directives: [RouterOutlet, TopMenuComponent, MainMenuComponent]
})
@RouteConfig(routes)
export class DemoComponent implements AfterContentInit {
  public isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
  private viewContainerRef:ViewContainerRef;
  private router: Router;

  public constructor(viewContainerRef:ViewContainerRef, router: Router) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;

    this.router = router;
  }

  public ngAfterContentInit():any {
    this.router.subscribe(() => {
      if (typeof PR !== 'undefined') {
        // google code-prettify
        setTimeout(PR.prettyPrint, 50);
      }
    });
  }
}

bootstrap(DemoComponent, [ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  {provide: APP_BASE_HREF, useValue: '/'},
  {provide: LocationStrategy, useClass: HashLocationStrategy}]);
