import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { DemoSectionComponent } from './demo-section/demo-section.component';
import { NgApiDocModule } from '../api-docs';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { AppFooterComponent } from '../common/app-footer/app-footer.component';
import { AddNavComponent } from '../common/add-nav/add-nav.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../common/sidebar/search-filter.pipe';

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
    Ng2PageScrollModule,
    RouterModule
  ]
})
export class SharedModule {}
