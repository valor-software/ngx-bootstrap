import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { TabsSectionComponent } from './tabs-section.component';
import { TabsModule } from 'ng2-bootstrap';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    TabsSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TabsModule.forRoot()
  ],
  exports: [TabsSectionComponent]
})
export class DemoTabsModule {
}
