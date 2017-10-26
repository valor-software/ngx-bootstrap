import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { DocsModule } from '../../docs';
import { TypeaheadSectionComponent } from './typeahead-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-typeahead.routes';

@NgModule({
  declarations: [
    TypeaheadSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocsModule,
    TypeaheadModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [TypeaheadSectionComponent],
  entryComponents: [...DEMO_COMPONENTS]
})
export class DemoTypeaheadModule {}
