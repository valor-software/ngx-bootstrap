import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { CollapseSectionComponent } from './collapse-section.component';
import { CollapseModule } from 'ng2-bootstrap';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    CollapseSectionComponent,
    ...DEMO_COMPONENTS
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
