import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordionSectionComponent } from './accordion-section.component';
import { AccordionDemoComponent } from './demos/accordion-demo.component';
import { DemoSectionComponent } from '../../shared/demo-section/demo-section.component';
import { AccordionModule } from '../../../../dist/components/accordion';
import { TabsModule } from '../../../../dist/components/tabs';

@NgModule({
  declarations: [
    AccordionSectionComponent,
    AccordionDemoComponent,
    DemoSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    TabsModule
  ],
  exports: [AccordionSectionComponent]
})
export class AccordionDocsModule{}
