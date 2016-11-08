import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TypeaheadDemoComponent } from './demos/typeahead-demo.component';
import { TypeaheadSectionComponent } from './typeahead-section.component';

@NgModule({
  declarations: [
    TypeaheadDemoComponent,
    TypeaheadSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TypeaheadModule
  ],
  exports: [TypeaheadSectionComponent]
})
export class DemoTypeaheadModule {

}
