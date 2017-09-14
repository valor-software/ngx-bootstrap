import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../../shared';
import { DatepickerSectionComponent } from './datepicker-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-datepicker.routes';

import { defineLocale } from 'ngx-bootstrap/bs-moment';
import {

  ar, cs, de, enGb, es, esDo, esUs, fr, hi, it, ja, ko, nl, nlBe, pl, ptBr, ru, zhCn
} from 'ngx-bootstrap/locale';

const locales = [ar, cs, de, enGb, es, esDo, esUs, fr, hi, it, ja, ko, nl, nlBe, pl, ptBr, ru, zhCn];

locales.forEach(locale => defineLocale(locale.abbr, locale));

@NgModule({
  declarations: [DatepickerSectionComponent, ...DEMO_COMPONENTS],
  imports: [
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [DatepickerSectionComponent]
})
export class DemoDatepickerModule {}
