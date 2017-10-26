import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNavComponent } from './add-nav/add-nav.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { LandingComponent } from './landing/landing.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchFilterPipe } from './sidebar/search-filter.pipe';

export { AddNavComponent } from './add-nav/add-nav.component';
export { AppFooterComponent } from './app-footer/app-footer.component';
export { GettingStartedComponent } from './getting-started/getting-started.component';
export { LandingComponent } from './landing/landing.component';
export { TopMenuComponent } from './top-menu/top-menu.component';
export { SidebarComponent } from './sidebar/sidebar.component';
export { SearchFilterPipe } from './sidebar/search-filter.pipe';

@NgModule({
  declarations: [
    AddNavComponent,
    AppFooterComponent,
    GettingStartedComponent,
    LandingComponent,
    TopMenuComponent,
    SidebarComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddNavComponent,
    AppFooterComponent,
    GettingStartedComponent,
    LandingComponent,
    TopMenuComponent,
    SidebarComponent,
    SearchFilterPipe
  ]
})
export class DocsModule {}
