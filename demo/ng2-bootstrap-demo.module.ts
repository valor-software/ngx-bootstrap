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
import { TopMenuComponent } from './components/top-menu/top-menu.component';

import { DemoComponent } from './app.component';
import { routing } from './router.config';

import { AccordionSectionComponent } from './components/accordion-section';
import { AlertSectionComponent } from './components/alert-section';
import { ButtonsSectionComponent } from './components/buttons-section';
import { CarouselSectionComponent } from './components/carousel-section';
import { CollapseSectionComponent } from './components/collapse-section';
import { DatepickerSectionComponent } from './components/datepicker-section';
import { DropdownSectionComponent } from './components/dropdown-section';
import { ModalSectionComponent } from './components/modal-section';
import { PaginationSectionComponent } from './components/pagination-section';
import { ProgressbarSectionComponent } from './components/progressbar-section';
import { RatingSectionComponent } from './components/rating-section';
import { TabsSectionComponent } from './components/tabs-section';
import { TimepickerSectionComponent } from './components/timepicker-section';
import { TooltipSectionComponent } from './components/tooltip-section';
import { TypeaheadSectionComponent } from './components/typeahead-section';

@NgModule({
  declarations: [
    AccordionDemoComponent,
    AlertDemoComponent,
    ButtonsDemoComponent,
    CarouselDemoComponent,
    CollapseDemoComponent,
    DatepickerDemoComponent,
    DemoComponent,
    DemoSectionComponent,
    DropdownDemoComponent,
    GettingStartedSectionComponent,
    MainMenuComponent,
    ModalDemoComponent,
    PaginationDemoComponent,
    ProgressbarDemoComponent,
    RatingDemoComponent,
    TabsDemoComponent,
    TimepickerDemoComponent,
    TooltipDemoComponent,
    TopMenuComponent,
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
