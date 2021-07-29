import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPageScrollModule } from 'ngx-page-scroll';
/* common */
import { AppFooterComponent } from './common/app-footer/app-footer.component';
import { AddNavComponent } from './common/add-nav/add-nav.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { SearchFilterPipe } from './common/sidebar/search-filter.pipe';

/* docs */
import { DemoSectionComponent } from './demo-section/demo-section.component';
import { ContentSection } from './models/content-section.model';
import {
  DemoTopSectionComponent,
  DemoTopSectionComponentModule
} from './demo-section-components/demo-top-section/index';
import { ExamplesComponent, ExamplesComponentModule } from './demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent, ApiSectionsComponentModule } from './demo-section-components/demo-api-section/index';
import { DocsSectionComponent } from './docs-section/docs-section.component';
import { NgApiDocClassComponent, NgApiDocComponent, NgApiDocConfigComponent, NgApiDocModule } from './api-docs/index';
import { LandingComponent } from './common/landing/landing.component';
import { DocumentationComponent } from './common/documentation/documentation.component';
import { DiscoverComponent } from './common/discover/discover.component';
import { SchematicsComponent } from './common/schematics/schematics.component';

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
export { AppFooterComponent } from './common/app-footer/app-footer.component';
export { AddNavComponent } from './common/add-nav/add-nav.component';
export { SidebarComponent } from './common/sidebar/sidebar.component';
export { SearchFilterPipe } from './common/sidebar/search-filter.pipe';
export { LandingComponent } from './common/landing/landing.component';
export { DocumentationComponent } from './common/documentation/documentation.component';
export { DiscoverComponent } from './common/discover/discover.component';
export { SchematicsComponent } from './common/schematics/schematics.component';
export { StyleManager } from './theme/style-manager';
export { ThemeStorage } from './theme/theme-storage';
export { NgApiDoc } from './api-docs/api-docs.model';
export { TopMenuComponent } from './common/top-menu/top-menu.component';
export { Analytics } from './api-docs/analytics/analytics';
export { DOCS_TOKENS } from './tokens/docs-routes-token';

@NgModule({
  declarations: [
    DemoSectionComponent,
    SidebarComponent,
    AppFooterComponent,
    SearchFilterPipe,
    AddNavComponent,
    DocsSectionComponent,
    LandingComponent,
    DocumentationComponent,
    DiscoverComponent,
    SchematicsComponent
  ],
  imports: [
    TabsModule,
    CommonModule,
    NgApiDocModule,
    ExamplesComponentModule,
    ApiSectionsComponentModule,
    DemoTopSectionComponentModule,
    NgxPageScrollModule,
  ],
  exports: [
    SearchFilterPipe,
    SidebarComponent,
    AppFooterComponent,
    AddNavComponent,
    DemoSectionComponent,
    ExamplesComponentModule,
    ApiSectionsComponentModule,
    NgxPageScrollModule,
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
