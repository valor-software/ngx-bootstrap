import { Component } from '@angular/core';

@Component({
  selector: 'custom-item-template-demo',
  templateUrl: './custom-item-template.html'
})
export class CustomItemTemplateDemoComponent {
  public items: any[] = [
    { name: 'Windstorm', url: 'http://comicvine.gamespot.com/windstorm/4005-10258/'},
    { name: 'Mr. Nice', url: 'https://en.wikipedia.org/wiki/Mr._Nice' },
    { name: 'Bombasto', url: 'no info' },
    { name: 'Celeritas', url: 'http://eu.battle.net/d3/en/profile/Cyberlink-2400/hero/13514741' },
    { name: 'Magneta', url: 'http://marvel.wikia.com/wiki/Magneta_(Earth-982)' },
    { name: 'RubberMan', url: 'http://americanhorrorstory.wikia.com/wiki/Rubber_Man' },
    { name: 'Dynama', url: 'https://en.wikipedia.org/wiki/Dynamo_(comics)' },
    { name: 'Dr. IQ', url: 'http://www.imdb.com/title/tt0135089/' },
    { name: 'Magma', url: 'https://en.wikipedia.org/wiki/Magma_(band)' },
    { name: 'Tornado', url: 'https://en.wikipedia.org/wiki/Tornado' },
    { name: 'Mr. O', url: 'no info' },
    { name: 'Tomato', url: 'https://en.wikipedia.org/wiki/Tomato' }
  ];

  public fixDisabledItems: boolean = false;
  public disabledItems: string[] = [ 'Windstorm', 'Tornado', 'Mr. O', 'Magneta' ];

  public set disableItems(value: boolean) {
    this._disableItems = value;
    this.items
      .filter((x: any) => this.disabledItems.indexOf(x.name) > -1)
      .forEach((x: any) => x.disabled = value);
  }

  public get disableItems(): boolean {
    return this._disableItems;
  }

  private _disableItems: boolean = false;

  public isItemDisabled(item: any): boolean {
    return item.disabled;
  }
}
