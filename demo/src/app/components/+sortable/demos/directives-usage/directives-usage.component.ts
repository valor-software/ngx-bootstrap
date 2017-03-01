import { Component } from '@angular/core';

@Component({
  selector: 'directives-usage-demo',
  templateUrl: './directives-usage.component.html'
})
export class DirectivesUsageDemoComponent {
  public activeItemIndex: number = -1;
  public header: string[] = ['ID', 'Company', 'Contact', 'Country'];
  public rows: any[] = [
    {
      id: 1,
      company: 'Alfreds Futterkiste',
      contact: 'Maria Anders',
      country: 'Germany'
    },
    {
      id: 2,
      company: 'Centro comercial Moctezuma',
      contact: 'Francisco Chang',
      country: 'Mexico'
    },
    {
      id: 3,
      company: 'Ernst Handel',
      contact: 'Roland Mendel',
      country: 'Austria'
    },
    {
      id: 4,
      company: 'Island Trading',
      contact: 'Helen Bennett',
      country: 'UK'
    },
    {
      id: 5,
      company: 'Laughing Bacchus Winecellars',
      contact: 'Yoshi Tannamuri',
      country: 'Canada'
    },
    {
      id: 6,
      company: 'Magazzini Alimentari Riuniti',
      contact: 'Giovanni Rovelli',
      country: 'Italy'
    }
  ];
}
