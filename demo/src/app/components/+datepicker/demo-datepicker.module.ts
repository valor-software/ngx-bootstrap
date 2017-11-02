import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { DocsModule } from '../../docs';
import { DatepickerSectionComponent } from './datepicker-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-datepicker.routes';

import { defineLocale, LocaleData } from 'ngx-bootstrap/bs-moment';
import {
  ar, cs, de, enGb, es, esDo, esUs, fr, hi, it, ja, ko, nl, nlBe, pl, ptBr, sv, ru, zhCn, tr
} from 'ngx-bootstrap/locale';

const locales = [ar, cs, de, enGb, es, esDo, esUs, fr, hi, hu, it, ja, ko, nl, nlBe, pl, ptBr, sv, ru, zhCn, tr, he];
locales.forEach((locale: LocaleData) => defineLocale(locale.abbr, locale));

@NgModule({
  declarations: [
    DatepickerSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocsModule,
    RouterModule.forChild(routes)
  ],
  exports: [DatepickerSectionComponent],
  entryComponents: [...DEMO_COMPONENTS]
})
export class DemoDatepickerModule {}
