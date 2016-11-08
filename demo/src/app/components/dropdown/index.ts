import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { DropdownDemoComponent } from './demos/dropdown-demo.component';
import { DropdownSectionComponent } from './dropdown-section.component';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  declarations: [
    DropdownDemoComponent,
    DropdownSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DropdownModule
  ],
  exports: [DropdownSectionComponent]
})
export class DemoDropdownModule {
}
