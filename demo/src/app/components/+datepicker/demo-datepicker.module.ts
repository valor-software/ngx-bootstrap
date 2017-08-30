import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../../shared';
import { DatepickerSectionComponent } from './datepicker-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-datepicker.routes';

import { defineLocale, getSetGlobalLocale } from 'ngx-bootstrap/bs-moment';
import {
  ar, de, enGb, es, esDo, esUs, fr, hi, it, ja, ko, nl, nlBe, pl, ptBr, ru, zhCn
} from 'ngx-bootstrap/locale';

const locales = [ar, de, enGb, es, esDo, esUs, fr, hi, it, ja, ko, nl, nlBe, pl, ptBr, ru, zhCn];

locales.forEach(locale => defineLocale(locale.abbr, locale));

getSetGlobalLocale('en');

@NgModule({
  declarations: [
    DatepickerSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [DatepickerSectionComponent]
})
export class DemoDatepickerModule {
}
