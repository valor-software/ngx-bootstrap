import { NgModule } from '@angular/core';

import { AccordionModule } from './accordion';
import { AlertModule } from './alert';
import { ButtonsModule } from './buttons';
import { CarouselModule } from './carousel';
import { CollapseModule } from './collapse';
import { DatepickerModule } from './datepicker';
import { DropdownModule } from './dropdown';
import { ModalModule } from './modal';
import { PaginationModule } from './pagination';
import { ProgressbarModule } from './progressbar';
import { RatingModule } from './rating';
import { TabsModule } from './tabs';
import { TimepickerModule } from './timepicker';
import { TooltipModule } from './tooltip';
import { TypeaheadModule } from './typeahead';

@NgModule({
  exports: [
    AccordionModule, AlertModule, ButtonsModule, CarouselModule, CollapseModule, DatepickerModule, DropdownModule,
    ModalModule, PaginationModule, ProgressbarModule, RatingModule, TabsModule, TimepickerModule,
    TooltipModule, TypeaheadModule
  ]
})
export class Ng2BootstrapModule {
}
