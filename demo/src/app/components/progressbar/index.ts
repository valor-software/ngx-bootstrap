import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { ProgressbarSectionComponent } from './progressbar-section.component';
import { ProgressbarModule } from 'ng2-bootstrap';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    ProgressbarSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProgressbarModule.forRoot()
  ],
  exports: [ProgressbarSectionComponent]
})
export class DemoProgressbarModule {
}
