import { Component, ViewContainerRef, AfterContentInit } from '@angular/core';
import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../ng2-bootstrap';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { ROUTER_DIRECTIVES, Router, NavigationEnd } from '@angular/router';

let w:any = window;

if (w && w.__theme === 'bs4') {
  Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
}

let template = require('./demo.template.html');

@Component({
  selector: 'demo',
  template,
  directives: [ROUTER_DIRECTIVES, TopMenuComponent, MainMenuComponent]
})

export class DemoComponent implements AfterContentInit {
  public isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
  private viewContainerRef:ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef, private router:Router) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }

  public ngAfterContentInit():any {
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        if (typeof PR !== 'undefined') {
          // google code-prettify
          setTimeout(PR.prettyPrint, 50);
        }
      }
    });
  }
}
