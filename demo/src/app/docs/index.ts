import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
/* common */
import {
  SidebarComponent,
  AppFooterComponent,
  AddNavComponent,
  SearchFilterPipe
} from '../common';
/* docs */
import { DemoSectionComponent } from './demo-section/demo-section.component';
import { ContentSection } from './models/content-section.model';
import {
  DemoTopSectionComponent,
  DemoTopSectionComponentModule
} from './demo-section-components/demo-top-section';
import {
  ExamplesComponent,
  ExamplesComponentModule
} from './demo-section-components/demo-examples-section';
import {
  ApiSectionsComponent,
  ApiSectionsComponentModule
} from './demo-section-components/demo-api-section';
import { DocsSectionComponent } from './docs-section/docs-section.component';
import {
  NgApiDocModule,
  NgApiDocComponent,
  NgApiDocClassComponent,
  NgApiDocConfigComponent
} from './api-docs';
/* export */
export { DemoSectionComponent } from './demo-section/demo-section.component';
export { DemoTopSectionComponent } from './demo-section-components/demo-top-section';
export { ExamplesComponent } from './demo-section-components/demo-examples-section';
export { ApiSectionsComponent } from './demo-section-components/demo-api-section';
export { DocsSectionComponent } from './docs-section/docs-section.component';
export {
  NgApiDocComponent,
  NgApiDocClassComponent,
  NgApiDocConfigComponent
} from './api-docs';

@NgModule({
  declarations: [
    DemoSectionComponent,
    SidebarComponent,
    AppFooterComponent,
    SearchFilterPipe,
    AddNavComponent,
    DocsSectionComponent
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
