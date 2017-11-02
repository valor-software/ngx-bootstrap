import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Ng2PageScrollModule } from 'ng2-page-scroll/ng2-page-scroll';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ngdoc } from '../ng-api-doc';
import { NgApiDoc } from './docs/api-docs/api-docs.model';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { LandingComponent } from './common/landing/landing.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { GettingStartedComponent } from './common/getting-started/getting-started.component';

import { ThemeStorage } from './theme/theme-storage';
import { StyleManager } from './theme/style-manager';
import { DocsModule } from './docs';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    TopMenuComponent,
    LandingComponent
  ],
  imports: [
    DocsModule,
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
