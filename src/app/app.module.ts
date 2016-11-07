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
import { AccordionDocModule } from './components/accordion';
import { AlertsDocModule } from './components/alerts';
import { ButtonsDocModule } from './components/buttons';
import { CarouselDocModule } from './components/carousel';
import { CollapseDocModule } from './components/collapse';
import { DatepickerDocModule } from './components/datepicker';
import { DropdownDocModule } from './components/dropdown';
import { ModalDocModule } from './components/modal';
import { PaginationDocModule } from './components/pagination';
import { ProgressbarDocModule } from './components/progressbar';
import { RatingDocModule } from './components/rating';
import { DemoTabsModule } from './components/tabs';

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
    AccordionDocModule,
    AlertsDocModule,
    ButtonsDocModule,
    CarouselDocModule,
    CollapseDocModule,
    DatepickerDocModule,
    DropdownDocModule,
    ModalDocModule,
    PaginationDocModule,
    ProgressbarDocModule,
    RatingDocModule,
    DemoTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
