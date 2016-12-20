import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { DropdownDemoComponent } from './demos/dropdown-demo.component';
import { DropdownSectionComponent } from './dropdown-section.component';
import { DropdownModule } from 'ng2-bootstrap';
import { NgApiDocModule } from '../../api-docs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  declarations: [
    DropdownDemoComponent,
    DropdownSectionComponent
  ],
  imports: [
    DropdownModule.forRoot(),
    NgApiDocModule,
    Ng2PageScrollModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [DropdownSectionComponent]
})
export class DemoDropdownModule {
}
