import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { DocsModule } from '../../docs';
import { AccordionSectionComponent } from './accordion-section.component';
import { DEMO_COMPONENTS } from './demos';

import { routes } from './demo-accordion.routes';

@NgModule({
  declarations: [
    AccordionSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    AccordionModule.forRoot(),
    CommonModule,
    FormsModule,
    DocsModule,
    RouterModule.forChild(routes)
  ],
  exports: [AccordionSectionComponent],
  entryComponents: [...DEMO_COMPONENTS]
})
export class DemoAccordionModule {
  static routes: any = routes;
}
