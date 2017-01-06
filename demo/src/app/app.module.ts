import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2PageScrollModule } from 'ng2-page-scroll/ng2-page-scroll';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { MainMenuComponent } from './common/main-menu/main-menu.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { SearchFilterPipe } from './common/main-menu/search-filter.pipe';
import { AppFooterComponent } from './common/app-footer/app-footer.component';
// will be lazy loaded later
import { DemoAccordionModule } from './components/accordion';
import { DemoAlertsModule } from './components/alerts';
import { DemoButtonsModule } from './components/buttons';
import { DemoCarouselModule } from './components/carousel';
import { DemoCollapseModule } from './components/collapse';
import { DemoDatepickerModule } from './components/datepicker';
import { DemoDropdownModule } from './components/dropdown';
import { DemoModalModule } from './components/modal';
import { DemoPaginationModule } from './components/pagination';
import { DemoPopoverModule } from './components/popover/index';
import { DemoProgressbarModule } from './components/progressbar';
import { DemoRatingModule } from './components/rating';
import { DemoSortableModule } from './components/sortable';
import { DemoTabsModule } from './components/tabs';
import { DemoTimepickerModule } from './components/timepicker/index';
import { DemoTooltipModule } from './components/tooltip/index';
import { DemoTypeaheadModule } from './components/typeahead/index';
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
    Ng2PageScrollModule.forRoot(),
    // will be lazy loaded later on
    DemoAccordionModule,
    DemoAlertsModule,
    DemoButtonsModule,
    DemoCarouselModule,
    DemoCollapseModule,
    DemoDatepickerModule,
    DemoDropdownModule,
    DemoModalModule,
    DemoPaginationModule,
    DemoPopoverModule,
    DemoProgressbarModule,
    DemoRatingModule,
    DemoSortableModule,
    DemoTabsModule,
    DemoTimepickerModule,
    DemoTooltipModule,
    DemoTypeaheadModule
  ],
  providers: [
    {provide: NgApiDoc, useValue: ngdoc}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
