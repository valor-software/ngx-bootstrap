import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ng2-bootstrap';
import { DemoSectionComponent } from './demo-section/demo-section.component';

@NgModule({
  declarations: [DemoSectionComponent],
  imports: [TabsModule.forRoot(), CommonModule],
  exports: [DemoSectionComponent]
})
export class SharedModule {
}
