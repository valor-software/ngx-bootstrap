/// <reference path="../typings/browser.d.ts" />
import {Component, provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {RouterOutlet, RouteConfig, ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';

import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../ng2-bootstrap';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {TopMenuComponent} from './components/top-menu/top-menu.component';

import {config} from './config';

// todo: enable prod mod only for prod build
enableProdMode();

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

@RouteConfig(config.routes)

export class Demo {
  private isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
}

bootstrap(Demo, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue: '/'})]);

