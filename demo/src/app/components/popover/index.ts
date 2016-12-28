import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ng2-bootstrap';
import { SharedModule } from '../../shared';
import { DEMO_COMPONENTS } from './demos/index';
import { PopoverSectionComponent } from './popover-section.component';

@NgModule({
  declarations: [
    PopoverSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PopoverModule.forRoot()
  ],
  exports: [PopoverSectionComponent]
})
export class DemoPopoverModule {}
