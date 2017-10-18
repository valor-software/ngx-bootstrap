import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { DemoSectionComponent } from './demo-section/demo-section.component';
import { NgApiDocModule } from '../api-docs';
import { ExamplesComponentModule } from '../common/content-sections/examples/index';
import { ApiSectionsComponentModule } from '../common/content-sections/api-sections/index';
import { UsageComponentModule } from '../common/content-sections/usage/index';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { AppFooterComponent } from '../common/app-footer/app-footer.component';
import { AddNavComponent } from '../common/add-nav/add-nav.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../common/sidebar/search-filter.pipe';
import { UsageComponent } from '../common/content-sections/usage/usage.component';
import { ContentSection } from '../models/content-section.model';

@NgModule({
  declarations: [
    DemoSectionComponent,
    SidebarComponent,
    AppFooterComponent,
    SearchFilterPipe,
    AddNavComponent
  ],
  imports: [
    TabsModule.forRoot(),
    FormsModule,
    CommonModule,
    NgApiDocModule,
    ExamplesComponentModule,
    ApiSectionsComponentModule,
    UsageComponentModule,
    Ng2PageScrollModule,
    RouterModule
  ],
  exports: [
    SearchFilterPipe,
    SidebarComponent,
    AppFooterComponent,
    AddNavComponent,
    DemoSectionComponent,
    NgApiDocModule,
    ExamplesComponentModule,
    ApiSectionsComponentModule,
    Ng2PageScrollModule,
    RouterModule
  ],
  providers: [ContentSection],
  entryComponents: [UsageComponent]
})
export class SharedModule {}
