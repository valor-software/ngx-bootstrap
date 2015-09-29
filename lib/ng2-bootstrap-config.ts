export enum Ng2BootstrapTheme {BS3 = 1, BS4 = 2}

export class Ng2BootstrapConfig {
  private static _theme: Ng2BootstrapTheme;
  static get theme():Ng2BootstrapTheme {
    // hack as for now
    let w: any = window;
    if (w && w.__theme === 'bs4') {
      return Ng2BootstrapTheme.BS4;
    }
    return (this._theme || Ng2BootstrapTheme.BS3);
  }
  static set theme(v:Ng2BootstrapTheme){
    this._theme = v;
  }
}
