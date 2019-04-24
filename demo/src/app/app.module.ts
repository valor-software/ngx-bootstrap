import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { ngdoc } from '../ng-api-doc';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { DocumentationComponent } from './common/documentation/documentation.component';
import { LandingComponent } from './common/landing/landing.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { DocsModule } from './docs';
import { NgApiDoc } from './docs/api-docs/api-docs.model';
import { StyleManager } from './theme/style-manager';
import { ThemeStorage } from './theme/theme-storage';

@NgModule({
  declarations: [AppComponent, DocumentationComponent, TopMenuComponent, LandingComponent],
  imports: [
    BrowserAnimationsModule,
    DocsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: environment.useHash }),
    NgxPageScrollModule,
    BsDropdownModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ngx-bootstrap' })
  ],
  providers: [ThemeStorage, StyleManager, { provide: NgApiDoc, useValue: ngdoc }],
  bootstrap: [AppComponent]
})
export class AppModule {}
