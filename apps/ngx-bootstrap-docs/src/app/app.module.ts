import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { ngdoc } from '../ng-api-doc';
import { AppComponent } from './app.component';
import { DOCS_TOKENS, DocsModule, NgApiDoc, SIDEBAR_ROUTES, SidebarRoutesStructure } from '@ngx-bootstrap-doc/docs';
// import { ScullyLibModule } from '@scullyio/ng-lib';
import { routes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    DocsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: environment.useHash }),
    // NgxPageScrollModule,
    BsDropdownModule.forRoot()
    // ScullyLibModule
  ],
  providers: [
    { provide: NgApiDoc, useValue: ngdoc },
    { provide: DOCS_TOKENS, useValue: routes },
    { provide: SIDEBAR_ROUTES, useValue: SidebarRoutesStructure }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
