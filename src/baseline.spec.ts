import { async, TestBed } from '@angular/core/testing';
import { AlertModule } from './alert/alert.module';
import { AccordionModule } from './accordion/accordion.module';
import { ButtonsModule } from './buttons/buttons.module';
import { CarouselModule } from './carousel/carousel.module';
import { CollapseModule } from './collapse/collapse.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { BsDropdownModule } from './dropdown/bs-dropdown.module';
import { ModalModule } from './modal/modal.module';
import { PaginationModule } from './pagination/pagination.module';
import { ProgressbarModule } from './progressbar/progressbar.module';
import { PopoverModule } from './popover/popover.module';
import { RatingModule } from './rating/rating.module';
import { TabsModule } from './tabs/tabs.module';
import { TimepickerModule } from './timepicker/timepicker.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TypeaheadModule } from './typeahead/typeahead.module';

describe('datepicker: [bsDatepickerDayDecorator]', () => {
  beforeEach(
    async(() => TestBed.configureTestingModule({
        imports: [
          AccordionModule.forRoot(),
          AlertModule.forRoot(),
          ButtonsModule.forRoot(),
          CarouselModule.forRoot(),
          CollapseModule.forRoot(),
          DatepickerModule.forRoot(),
          BsDropdownModule.forRoot(),
          ModalModule.forRoot(),
          PaginationModule.forRoot(),
          ProgressbarModule.forRoot(),
          PopoverModule.forRoot(),
          RatingModule.forRoot(),
          TabsModule.forRoot(),
          TimepickerModule.forRoot(),
          TooltipModule.forRoot(),
          TypeaheadModule.forRoot()
        ]
      }).compileComponents()
    ));
});
