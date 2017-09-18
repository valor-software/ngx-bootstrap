import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Ng2PageScrollModule } from 'ng2-page-scroll/ng2-page-scroll';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ngdoc } from '../ng-api-doc';
import { NgApiDoc } from './api-docs/api-docs.model';

import { NgApiDocModule } from './api-docs/index';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { AppFooterComponent } from './common/app-footer/app-footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { AddNavComponent } from './common/add-nav/add-nav.component';
import { SearchFilterPipe } from './common/sidebar/search-filter.pipe';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { ThemeStorage } from './theme/theme-storage';
import { StyleManager } from './theme/style-manager';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    TopMenuComponent,
    SidebarComponent,
    AddNavComponent,
    SearchFilterPipe,
    AppFooterComponent
  ],
  imports: [
    NgApiDocModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    Ng2PageScrollModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    ThemeStorage,
    StyleManager,
    { provide: NgApiDoc, useValue: ngdoc }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
