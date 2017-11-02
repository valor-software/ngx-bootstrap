import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DocsModule } from '../../docs';
import { DropdownSectionComponent } from './dropdown-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-dropdown.routes';

@NgModule({
  declarations: [
    DropdownSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    FormsModule,
    DocsModule,
    RouterModule.forChild(routes)
  ],
  exports: [DropdownSectionComponent],
  entryComponents: [...DEMO_COMPONENTS]
})
export class DemoDropdownModule {}
