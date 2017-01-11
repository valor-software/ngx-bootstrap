import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { TypeaheadModule } from 'ng2-bootstrap';
import { TypeaheadSectionComponent } from './typeahead-section.component';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    TypeaheadSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TypeaheadModule.forRoot()
  ],
  exports: [TypeaheadSectionComponent]
})
export class DemoTypeaheadModule {

}
