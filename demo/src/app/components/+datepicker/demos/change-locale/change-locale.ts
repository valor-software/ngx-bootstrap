import { Component } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/bs-moment';

@Component({
  selector: 'demo-datepicker-change-locale',
  templateUrl: './change-locale.html'
})
export class DemoDatepickerChangeLocaleComponent {
  locale = 'en';
  locales = listLocales();

  constructor(private _localeService: BsLocaleService) {
  }

  applyLocale(pop: any) {
    this._localeService.use(this.locale);
    // create new object on each property change
    // so Angular can catch object reference change
    // this.bsConfig = Object.assign({}, { locale: this.locale });
    setTimeout(() => {
      pop.hide();
      pop.show();
    });
  }
}
