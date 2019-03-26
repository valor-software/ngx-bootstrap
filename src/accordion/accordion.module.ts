import { FadeInDirectiveComponent } from './fade-animations.component';
/* tslint:disable: max-classes-per-file */
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';


import { AccordionComponent } from './accordion.component';
import { AccordionConfig } from './accordion.config';
import { AccordionPanelComponent } from './accordion-group.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  imports: [CommonModule, CollapseModule],
  declarations: [AccordionComponent, AccordionPanelComponent, FadeInDirectiveComponent],
  exports: [AccordionComponent, AccordionPanelComponent]
})
export class AccordionModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AccordionModule, providers: [AccordionConfig] };
  }
}
