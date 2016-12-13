import { AfterContentInit, Component, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from 'ng2-bootstrap';

let w:any = window;

if (w && w.__theme === 'bs4') {
  Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
}

@Component({
  selector: 'bs-demo',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterContentInit {
  public isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;

  private router:Router;
  public constructor(router:Router) {
    this.router = router;
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
