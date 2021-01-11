import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { defineLocale, LocaleData } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';

import {
  arLocale, bgLocale, caLocale, csLocale, daLocale, deLocale, enGbLocale, esDoLocale, esLocale, esUsLocale, etLocale, frLocale, heLocale,
  hiLocale, hrLocale, fiLocale, glLocale, huLocale, idLocale, itLocale, jaLocale, kaLocale, kkLocale, koLocale, ltLocale, lvLocale, mnLocale, nbLocale,
  nlBeLocale, nlLocale, plLocale, ptBrLocale, ruLocale, roLocale, skLocale, slLocale, sqLocale, svLocale, thLocale, thBeLocale, trLocale, viLocale,
  zhCnLocale, ukLocale, faLocale
} from 'ngx-bootstrap/locale';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { DocsModule } from '../../docs';
import { DatepickerSectionComponent } from './datepicker-section.component';
import { routes } from './demo-datepicker.routes';
import { DEMO_COMPONENTS } from './demos';

const locales = [
  arLocale, bgLocale, caLocale, csLocale, daLocale, deLocale, enGbLocale, esDoLocale, esLocale, esUsLocale, etLocale, frLocale,
  heLocale, hiLocale, hrLocale, fiLocale, glLocale, huLocale, idLocale, itLocale, jaLocale, kaLocale, kkLocale, koLocale, ltLocale, lvLocale, mnLocale,
  nbLocale, nlBeLocale, nlLocale, plLocale, ptBrLocale, ruLocale, roLocale, skLocale, slLocale, sqLocale, svLocale, thLocale, thBeLocale,
  trLocale, ukLocale, viLocale, zhCnLocale, faLocale
];

locales.forEach((locale: LocaleData) => {
  if (!locale.abbr) {
    return;
  }

  defineLocale(locale.abbr, locale);
});

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
