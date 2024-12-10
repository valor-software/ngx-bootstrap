import { Component } from '@angular/core';
import { BsDatepickerDirective, BsDaterangepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-change-locale',
  templateUrl: './change-locale.html',
  standalone: false
})
export class DemoDatepickerChangeLocaleComponent {
  locale = 'en';
  locales = listLocales();

  constructor(private localeService: BsLocaleService) {}

  applyLocale(pop: BsDatepickerDirective | BsDaterangepickerDirective) {
    this.localeService.use(this.locale);
    pop.hide();
    pop.show();
  }
}
