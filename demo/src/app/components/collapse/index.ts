import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { CollapseDemoComponent } from './demos/collapse-demo.component';
import { CollapseSectionComponent } from './collapse-section.component';
import { CollapseModule } from 'ng2-bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { NgApiDocModule } from '../../api-docs';

@NgModule({
  declarations: [
    CollapseDemoComponent,
    CollapseSectionComponent
  ],
  imports: [
    CollapseModule.forRoot(),
    NgApiDocModule,
    Ng2PageScrollModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [CollapseSectionComponent]
})
export class DemoCollapseModule {

}
