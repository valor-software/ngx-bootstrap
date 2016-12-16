import { window } from './facade/browser';

export enum Ng2BootstrapTheme {BS3 = 1, BS4 = 2}

export class Ng2BootstrapConfig {
  protected static _theme:Ng2BootstrapTheme = Ng2BootstrapTheme.BS3;

  public static get theme():Ng2BootstrapTheme {
    // hack as for now
    if (window.__theme === 'bs4') {
      return Ng2BootstrapTheme.BS4;
    }
    return this._theme;
  }

  public static set theme(v:Ng2BootstrapTheme) {
    this._theme = v;
  }
}
