import { NgModule } from '@angular/core';

import { AccordionModule } from './accordion/accordion.module';
import { AlertModule } from './alert/alert.module';
import { ButtonsModule } from './buttons/buttons.module';
import { CarouselModule } from './carousel/carousel.module';
import { CollapseModule } from './collapse/collapse.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { ModalModule } from './modal/modal.module';
import { PaginationModule } from './pagination/pagination.module';
import { ProgressbarModule } from './progressbar/progressbar.module';
import { RatingModule } from './rating/rating.module';
import { TabsModule } from './tabs/tabs.module';
import { TimepickerModule } from './timepicker/timepicker.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TypeaheadModule } from './typeahead/typeahead.module';
import { ComponentsHelper } from './utils/components-helper.service';

@NgModule({
  exports: [
    AccordionModule, AlertModule, ButtonsModule, CarouselModule, CollapseModule, DatepickerModule, DropdownModule,
    ModalModule, PaginationModule, ProgressbarModule, RatingModule, TabsModule, TimepickerModule, TooltipModule,
    TypeaheadModule
  ],
  providers: [
    {provide: ComponentsHelper, useClass: ComponentsHelper}
  ]
})
export class BsCoreModule {
}
