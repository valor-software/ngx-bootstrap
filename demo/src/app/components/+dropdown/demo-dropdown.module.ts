import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { SharedModule } from '../../shared';
import { DropdownSectionComponent } from './dropdown-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-dropdown.routes';

@NgModule({
  declarations: [
    DropdownSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    DropdownModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [DropdownSectionComponent]
})
export class DemoDropdownModule {
}
