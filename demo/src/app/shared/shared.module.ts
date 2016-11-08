import { NgModule } from '@angular/core';
import { DemoSectionComponent } from './demo-section/demo-section.component';
import { TabsModule } from 'ng2-bootstrap/components/tabs/tabs.module';

@NgModule({
  declarations: [DemoSectionComponent],
  imports: [TabsModule],
  exports: [DemoSectionComponent]
})
export class SharedModule{}
