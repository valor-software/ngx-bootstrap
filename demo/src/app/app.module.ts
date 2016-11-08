import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { routes } from './app.routing';

import { GettingStartedComponent } from './getting-started/getting-started.component';
import { MainMenuComponent } from './common/main-menu/main-menu.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { SearchFilterPipe } from './common/main-menu/search-filter.pipe';

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
import { DemoProgressbarModule } from './components/progressbar';
import { DemoRatingModule } from './components/rating';
import { DemoTabsModule } from './components/tabs';
import { DemoTimepickerModule } from './components/timepicker/index';
import { DemoTooltipModule } from './components/tooltip/index';
import { DemoTypeaheadModule } from './components/typeahead/index';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    TopMenuComponent,
    MainMenuComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    // will be lazy loaded later on
    DemoAccordionModule,
    DemoAlertsModule,
    DemoButtonsModule,
    DemoCarouselModule,
    DemoCollapseModule,
    DemoDatepickerModule,
    DemoDropdownModule,
    DemoModalModule,
    // DemoPaginationModule,
    DemoProgressbarModule,
    DemoRatingModule,
    DemoTabsModule,
    DemoTimepickerModule,
    DemoTooltipModule,
    DemoTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
