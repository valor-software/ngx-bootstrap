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
    TypeaheadDemoComponent
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
