import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isBs3, setTheme } from 'ngx-bootstrap/utils';
import { routes } from '../../app.routing';
import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';

const _bs3Css =
  '/assets/css/bootstrap.min.css';
const _bs4Css =
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent {
  public get isBs3(): boolean {
    return isBs3();
  }

  public routes: any = routes;
  public search: any = {};

  currentTheme: 'bs3' | 'bs4';

  public constructor(
    private router: Router,
    public styleManager: StyleManager,
    private _themeStorage: ThemeStorage
  ) {
    const currentTheme = this._themeStorage.getStoredTheme();
    if (currentTheme) {
      this.installTheme(currentTheme);
    }

    this.router = router;
    this.routes = this.routes.filter((v: any) => v.path !== '**');
  }

  installTheme(theme: 'bs3' | 'bs4') {
    setTheme(theme);
    this.currentTheme = this.isBs3 ? 'bs3' : 'bs4';
    this.styleManager.setStyle('theme', this.isBs3 ? _bs3Css : _bs4Css);

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }
}
