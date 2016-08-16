import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { GettingStartedSectionComponent } from './components/getting-started/getting-started';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { DemoSectionComponent } from './components/demo-section';
import { DemoComponent } from './app.component';
import { routing } from './router.config';

@NgModule({
  declarations: [
    DemoComponent,
    GettingStartedSectionComponent,
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
    MainMenuComponent,
    TopMenuComponent,
    DemoSectionComponent
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
