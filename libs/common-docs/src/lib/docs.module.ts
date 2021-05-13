import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPageScrollModule } from 'ngx-page-scroll';
/* common */
// import { AppFooterComponent } from '../common/app-footer/app-footer.component';
// import { AddNavComponent } from '../common/add-nav/add-nav.component';
// import { SidebarComponent } from '../common/sidebar/sidebar.component';
// import { SearchFilterPipe } from '../common/sidebar/search-filter.pipe';
/* common-docs */
import { DemoSectionComponent } from './demo-section/demo-section.component';
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
import { DocsSectionComponent } from './docs-section/docs-section.component';
import {
  NgApiDocModule,
  NgApiDocComponent,
  NgApiDocClassComponent,
  NgApiDocConfigComponent
} from './api-docs/index';
import { SampleBoxComponent } from './api-docs/sample-box/sample-box.component';
/* export */
export {
  NgApiDocModule,
  NgApiDocComponent,
  NgApiDocClassComponent,
  NgApiDocConfigComponent
} from './api-docs/index';
export {
  ExamplesComponent,
  ExamplesComponentModule
} from './demo-section-components/demo-examples-section/index';
export {
  ApiSectionsComponent,
  ApiSectionsComponentModule
} from './demo-section-components/demo-api-section/index';
export { DemoSectionComponent } from './demo-section/demo-section.component';
export { DemoTopSectionComponent } from './demo-section-components/demo-top-section/index';
export { DocsSectionComponent } from './docs-section/docs-section.component';
export { SampleBoxComponent } from './api-docs/sample-box/sample-box.component';
export { ContentSection } from './models/content-section.model';


@NgModule({
  declarations: [
    DemoSectionComponent,
    // SidebarComponent,
    // AppFooterComponent,
    // SearchFilterPipe,
    // AddNavComponent,
    DocsSectionComponent
  ],
  imports: [
    TabsModule.forRoot(),
    CommonModule,
    NgApiDocModule,
    ExamplesComponentModule,
    ApiSectionsComponentModule,
    DemoTopSectionComponentModule,
    NgxPageScrollModule,
    RouterModule
  ],
  exports: [
    // SearchFilterPipe,
    // SidebarComponent,
    // AppFooterComponent,
    // AddNavComponent,
    DemoSectionComponent,
    ExamplesComponentModule,
    ApiSectionsComponentModule,
    NgxPageScrollModule,
    RouterModule,
    DocsSectionComponent
  ],
  providers: [ContentSection],
  entryComponents: [
    DemoTopSectionComponent,
    ExamplesComponent,
    ApiSectionsComponent,
    NgApiDocComponent,
    NgApiDocClassComponent,
    NgApiDocConfigComponent
  ]
})
export class DocsModule {}
