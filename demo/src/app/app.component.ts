import { AfterContentInit, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isBs3 } from 'ng2-bootstrap';

@Component({
  selector: 'bs-demo',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterContentInit {
  public get isBs3(): boolean {
    return isBs3();
  }

  private router: Router;

  public constructor(router: Router) {
    this.router = router;
  }

  public ngAfterContentInit(): any {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (typeof PR !== 'undefined') {
          // google code-prettify
          setTimeout(PR.prettyPrint, 50);
        }
      }
    });
  }
}
