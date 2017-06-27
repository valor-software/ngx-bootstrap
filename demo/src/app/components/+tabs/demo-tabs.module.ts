import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../../shared';
import { TabsSectionComponent } from './tabs-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-tabs.routes';

@NgModule({
  declarations: [
    TabsSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TabsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [TabsSectionComponent]
})
export class DemoTabsModule {
}
