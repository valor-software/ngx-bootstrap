import { Component } from '@angular/core';

import { PagesModel } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'demo-pagination-custom-template',
  templateUrl: './custom-template.html'
})
export class DemoPaginationCustomTemplateComponent {

  convertToRoman(pageInfo: PagesModel): string {
    const roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };

    let pageNumber = pageInfo.number;

    return Object.keys(roman).reduce((acc, symbol) => {
      const numeralSystem = Math.floor(pageNumber / roman[symbol]);
      // tslint:disable-next-line:no-parameter-reassignment
      pageNumber -= numeralSystem * roman[symbol];

      return acc + symbol.repeat(numeralSystem);
    }, '');
  }
}
