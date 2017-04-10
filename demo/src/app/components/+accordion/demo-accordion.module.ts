import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { SharedModule } from '../../shared';
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
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [AccordionSectionComponent]
})
export class DemoAccordionModule {
  public static routes:any = routes;
}
