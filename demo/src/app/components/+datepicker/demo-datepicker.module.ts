import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { defineLocale, LocaleData } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  arLocale, csLocale, daLocale, deLocale, enGbLocale, esDoLocale, esLocale, esUsLocale, frLocale, heLocale, hiLocale,
  fiLocale, glLocale,
  huLocale, idLocale, itLocale, jaLocale, koLocale, mnLocale, nlBeLocale, nlLocale, plLocale, ptBrLocale, ruLocale,
  roLocale, skLocale, slLocale, svLocale, thLocale, trLocale, zhCnLocale
} from 'ngx-bootstrap/locale';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { DocsModule } from '../../docs';
import { DatepickerSectionComponent } from './datepicker-section.component';
import { routes } from './demo-datepicker.routes';
import { DEMO_COMPONENTS } from './demos';

const locales = [
  arLocale, csLocale, daLocale, deLocale, enGbLocale, esDoLocale, esLocale, esUsLocale, frLocale, heLocale, hiLocale,
  fiLocale, glLocale,
  huLocale, idLocale, itLocale, jaLocale, koLocale, mnLocale, nlBeLocale, nlLocale, plLocale, ptBrLocale, ruLocale,
  roLocale, skLocale, slLocale, svLocale, thLocale, trLocale, zhCnLocale
];
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
export class DemoDatepickerModule {
}
