import { Component, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';

import { setTheme } from 'ngx-bootstrap/utils';
import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';

const _bs4Css = 'assets/css/bootstrap-4.0.0-beta/css/bootstrap.min.css';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements AfterViewInit {
  currentVersion: string;
  currentTheme: 'bs3' | 'bs4';

  constructor(
    public styleManager: StyleManager,
    private http: Http,
    private _themeStorage: ThemeStorage
  ) {
    const currentTheme = this._themeStorage.getStoredTheme();
    if (currentTheme && currentTheme === 'bs3') {
      this.installTheme('bs4');
    }
  }

  ngAfterViewInit(): any {
    this.http
      .get('assets/json/current-version.json')
      .map(res => res.json())
      .subscribe((data: any) => {
        this.currentVersion = data.version;
      });
  }

  installTheme(theme: 'bs3' | 'bs4') {
    setTheme(theme);
    this.styleManager.setStyle('theme', _bs4Css);

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }
}
