import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { CollapseDemoComponent } from './demos/collapse-demo.component';
import { CollapseSectionComponent } from './collapse-section.component';
import { CollapseModule } from '../../../../dist/components/collapse/collapse.module';

@NgModule({
  declarations: [
    CollapseDemoComponent,
    CollapseSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CollapseModule
  ],
  exports: [CollapseSectionComponent]
})
export class CollapseDocModule {

}
