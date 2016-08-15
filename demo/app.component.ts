import { Component, ViewContainerRef, AfterContentInit } from '@angular/core';
import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../ng2-bootstrap';
import { Router, NavigationEnd } from '@angular/router';

let w:any = window;

if (w && w.__theme === 'bs4') {
  Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
}

let template = require('./demo.template.html');

@Component({
  selector: 'demo',
  template
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
