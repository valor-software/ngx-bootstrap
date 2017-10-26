import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { DemoSectionComponent } from './demo-section/demo-section.component';
import { NgApiDocModule } from './api-docs';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { AppFooterComponent } from '../common/app-footer/app-footer.component';
import { AddNavComponent } from '../common/add-nav/add-nav.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../common/sidebar/search-filter.pipe';
import { ContentSection } from './models/content-section.model';
import {
  DemoTopSectionComponent,
  DemoTopSectionComponentModule
} from './demo-section-components/demo-top-section/index';
import {
  ExamplesComponent,
  ExamplesComponentModule
} from './demo-section-components/demo-examples-section/index';
import {
  ApiSectionsComponent,
  ApiSectionsComponentModule
} from './demo-section-components/demo-api-section/index';

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
    DemoTopSectionComponentModule,
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
  entryComponents: [DemoTopSectionComponent, ExamplesComponent, ApiSectionsComponent]
})
export class SharedModule {}
