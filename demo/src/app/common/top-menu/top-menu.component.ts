import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
<<<<<<< HEAD
import { map } from 'rxjs/operators';
=======
>>>>>>> upstream/development

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements AfterViewInit {
  appUrl: string;
  appHash: string;
  currentVersion: string;
  previousDocs: string[] = [];
  isLocalhost = false;
  needPrefix = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngAfterViewInit(): any {
    // todo: remove this sh**
    if (typeof window !== 'undefined') {
      this.isLocalhost = location.hostname === 'localhost';
      this.needPrefix = location.pathname !== '/';
<<<<<<< HEAD
      this.appUrl =
        location.protocol +
        '//' +
        location.hostname +
        (this.isLocalhost ? ':' + location.port + '/' : '/');
      this.http
        .get('assets/json/versions.json')
        .pipe(
          map(res => res.json())
        )
        .subscribe((data: any) => {
          this.previousDocs = data;
        });
      this.http
        .get('assets/json/current-version.json')
        .pipe(
          map(res => res.json())
        )
        .subscribe((data: any) => {
          this.currentVersion = data.version;
        });
=======
      this.appUrl = location.protocol + '//' + location.hostname + (this.isLocalhost ? ':' + location.port + '/' : '/');
      this.http.get<any>('assets/json/versions.json').subscribe(data => {
        this.previousDocs = data;
      });
      this.http.get<{ version: string }>('assets/json/current-version.json').subscribe(data => {
        this.currentVersion = data.version;
      });
>>>>>>> upstream/development
    }
    const getUrl = (router: Router) => {
      const indexOfHash = router.routerState.snapshot.url.indexOf('#');

      return router.routerState.snapshot.url.slice(0, indexOfHash);
    };
    let _prev = getUrl(this.router);
    this.router.events.subscribe((event: any) => {
      const _cur = getUrl(this.router);
      if (typeof window !== 'undefined') {
        this.appHash = location.hash === '#/' ? '' : location.hash;
      }
      if (event instanceof NavigationEnd && _cur !== _prev) {
        _prev = _cur;
      }
    });
  }
}
