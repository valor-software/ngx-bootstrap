import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Ng2BootstrapModule } from '../components';

import {
  AccordionDemoComponent,
  AlertDemoComponent,
  ButtonsDemoComponent,
  CarouselDemoComponent,
  CollapseDemoComponent,
  DatepickerDemoComponent,
  DropdownDemoComponent,
  ModalDemoComponent,
  PaginationDemoComponent,
  ProgressbarDemoComponent,
  RatingDemoComponent,
  TabsDemoComponent,
  TimepickerDemoComponent,
  TooltipDemoComponent,
  TypeaheadDemoComponent
} from './components';

import { DemoSectionComponent } from './components/demo-section';
import { GettingStartedSectionComponent } from './components/getting-started/getting-started';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SearchFilterPipe } from './components/main-menu/search-filter.pipe';
import { TopMenuComponent } from './components/top-menu/top-menu.component';

import { DemoComponent } from './app.component';
import { routing } from './router.config';

import { AccordionSectionComponent } from './components/accordion-section';
import { AlertSectionComponent } from './components/alert-section';
import { ButtonsSectionComponent } from '../src/app/components/buttons/buttons-section.component';
import { CarouselSectionComponent } from '../src/app/components/carousel/carousel-section.component';
import { CollapseSectionComponent } from '../src/app/components/collapse/collapse-section';
import { DatepickerSectionComponent } from '../src/app/components/datepicker/datepicker-section';
import { DropdownSectionComponent } from '../src/app/components/dropdown/dropdown-section';
import { ModalSectionComponent } from '../src/app/components/modal/modal-section';
import { PaginationSectionComponent } from '../src/app/components/pagination/pagination-section';
import { ProgressbarSectionComponent } from '../src/app/components/progressbar/progressbar-section';
import { RatingSectionComponent } from '../src/app/components/rating/rating-section';
import { TabsSectionComponent } from '../src/app/components/tabs/tabs-section';
import { TimepickerSectionComponent } from '../src/app/components/timepicker/timepicker-section';
import { TooltipSectionComponent } from '../src/app/components/tooltip/tooltip-section';
import { TypeaheadSectionComponent } from './components/typeahead-section';

@NgModule({
  declarations: [
    DemoComponent,
    DemoSectionComponent,
    GettingStartedSectionComponent,
    MainMenuComponent,
    TopMenuComponent,
    SearchFilterPipe,

    AccordionDemoComponent,
    AlertDemoComponent,
    ButtonsDemoComponent,
    CarouselDemoComponent,
    CollapseDemoComponent,
    DatepickerDemoComponent,
    DropdownDemoComponent,
    ModalDemoComponent,
    PaginationDemoComponent,
    ProgressbarDemoComponent,
    RatingDemoComponent,
    TabsDemoComponent,
    TimepickerDemoComponent,
    TooltipDemoComponent,
    TypeaheadDemoComponent,

    AccordionSectionComponent,
    AlertSectionComponent,
    ButtonsSectionComponent,
    CarouselSectionComponent,
    CollapseSectionComponent,
    DatepickerSectionComponent,
    DropdownSectionComponent,
    ModalSectionComponent,
    PaginationSectionComponent,
    ProgressbarSectionComponent,
    RatingSectionComponent,
    TabsSectionComponent,
    TimepickerSectionComponent,
    TooltipSectionComponent,
    TypeaheadSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2BootstrapModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [],
  bootstrap: [DemoComponent]
})

export class Ng2BootstrapDemoModule {
}
