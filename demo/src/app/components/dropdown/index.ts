import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { DropdownSectionComponent } from './dropdown-section.component';
import { DropdownModule } from 'ng2-bootstrap';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    DropdownSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    DropdownModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [DropdownSectionComponent]
})
export class DemoDropdownModule {
}
