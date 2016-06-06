import {Component, enableProdMode, ViewContainerRef} from '@angular/core';
import {RouterOutlet, RouteConfig, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../ng2-bootstrap';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {routes} from './config';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';

// todo: enable prod mod only for prod build
// if (false) {
enableProdMode();
// }

let w:any = window;

if (w && w.__theme === 'bs4') {
  Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
}

let tmp = require('./demo.template.html');

@Component({
  selector: 'app',
  template: tmp,
  directives: [RouterOutlet, TopMenuComponent, MainMenuComponent]
})
@RouteConfig(routes)
export class DemoComponent {
  public isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
  private viewContainerRef:ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}

bootstrap(DemoComponent, [ROUTER_PROVIDERS,
  {provide: APP_BASE_HREF, useValue: '/'},
  {provide: LocationStrategy, useClass: HashLocationStrategy}]);

