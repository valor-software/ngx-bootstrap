import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { CollapseDemoComponent } from './demos/collapse-demo.component';
import { CollapseSectionComponent } from './collapse-section.component';
import { CollapseModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    CollapseDemoComponent,
    CollapseSectionComponent
  ],
  imports: [
    CollapseModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [CollapseSectionComponent]
})
export class DemoCollapseModule {

}
