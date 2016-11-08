import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { ProgressbarDemoComponent } from './demos/progressbar-demo.component';
import { ProgressbarSectionComponent } from './progressbar-section.component';
import { ProgressbarModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    ProgressbarDemoComponent,
    ProgressbarSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProgressbarModule
  ],
  exports: [ProgressbarSectionComponent]
})
export class DemoProgressbarModule {
}
