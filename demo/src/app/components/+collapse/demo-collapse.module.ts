import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { SharedModule } from '../../shared';
import { CollapseSectionComponent } from './collapse-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-collapse.routes';

@NgModule({
  declarations: [
    CollapseSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CollapseModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [CollapseSectionComponent]
})
export class DemoCollapseModule {

}
