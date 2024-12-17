import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation  } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ngdoc } from '../ng-api-doc';
import { AppComponent } from './app.component';
import { DOCS_TOKENS, DocsModule, NgApiDoc, SIDEBAR_ROUTES, SidebarRoutesStructure } from '@ngx-bootstrap-doc/docs';
import { routes } from './app.routing';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserAnimationsModule,
        DocsModule,
        ], providers: [
        provideRouter(routes, withEnabledBlockingInitialNavigation()),
        { provide: NgApiDoc, useValue: ngdoc },
        { provide: DOCS_TOKENS, useValue: routes },
        { provide: SIDEBAR_ROUTES, useValue: SidebarRoutesStructure },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
}
