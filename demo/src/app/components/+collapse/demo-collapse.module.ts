import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { DocsModule } from '../../docs';
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
    DocsModule,
    RouterModule.forChild(routes)
  ],
  exports: [CollapseSectionComponent],
  entryComponents: [...DEMO_COMPONENTS]
})
export class DemoCollapseModule {}
