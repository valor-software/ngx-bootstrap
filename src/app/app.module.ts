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
import { AccordionDocModule } from './components/accordion/accordion-doc.module';
import { AlertsDocModule } from './components/alerts/alerts-docs.module';
import { ButtonsDocModule } from './components/buttons/buttons-doc.module';
import { CarouselDocModule } from './components/carousel/carousel-doc.module';
import { CollapseDocModule } from './components/collapse/collapse-doc.module';
import { DatepickerDocModule } from './components/datepicker/datepicker-doc.module';

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
    DatepickerDocModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
