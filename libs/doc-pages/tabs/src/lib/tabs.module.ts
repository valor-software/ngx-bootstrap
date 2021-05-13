import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { DocsModule } from '@ngx-bootstrap-doc/docs';
import { TabsSectionComponent } from './tabs-section.component';
import { DEMO_COMPONENTS } from './demos/index';
import { routes } from './demo-tabs.routes';
/*exports*/
export { TabsSectionComponent } from './tabs-section.component';

@NgModule({
  declarations: [
    TabsSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    DocsModule,
    TabsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [TabsSectionComponent],
  entryComponents: [...DEMO_COMPONENTS]
})
export class DemoTabsModule {}
