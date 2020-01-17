import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';
import { Router } from '@angular/router';

const _bs4Css = 'assets/css/bootstrap-4.0.0/css/bootstrap.min.css';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements AfterViewInit {
  currentVersion: string;
  currentTheme: 'bs3' | 'bs4';

  constructor(public styleManager: StyleManager,
              private http: HttpClient,
              private themeStorage: ThemeStorage,
              private router: Router) {
    const currentTheme = this.themeStorage.getStoredTheme();
    if (currentTheme && currentTheme === 'bs3') {
      this.installTheme('bs4');
    }
  }

  ngAfterViewInit(): any {
    if (typeof window !== 'undefined') {
      this.http.get<any>('assets/json/current-version.json').subscribe(data => {
        this.currentVersion = data.version;
      });
    }
  }

  installTheme(theme: 'bs3' | 'bs4') {
    setTheme(theme);
    this.styleManager.setStyle('theme', _bs4Css);

    if (this.currentTheme) {
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

  scrollToSection() {
    this.router.navigate(['.', 'documentation' ], {fragment: 'getting-started'});
  }
}
