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
import { MainMenuComponent } from './common/main-menu/main-menu.component';
import { SearchFilterPipe } from './common/main-menu/search-filter.pipe';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    TopMenuComponent,
    MainMenuComponent,
    SearchFilterPipe,
    AppFooterComponent
  ],
  imports: [
    NgApiDocModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: true}),
    Ng2PageScrollModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    {provide: NgApiDoc, useValue: ngdoc}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
