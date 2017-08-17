import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2PageScrollModule } from 'ng2-page-scroll/ng2-page-scroll';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { MainMenuComponent } from './common/main-menu/main-menu.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { SearchFilterPipe } from './common/main-menu/search-filter.pipe';
import { AppFooterComponent } from './common/app-footer/app-footer.component';

import { NgApiDocModule } from './api-docs/index';
import { NgApiDoc } from './api-docs/api-docs.model';
import { ngdoc } from '../ng-api-doc';

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
    RouterModule.forRoot(routes, {useHash: true}),
    Ng2PageScrollModule.forRoot()
  ],
  providers: [
    {provide: NgApiDoc, useValue: ngdoc}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
