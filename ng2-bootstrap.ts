import { ACCORDION_DIRECTIVES } from './components/accordion';
import { AlertComponent } from './components/alert';
import { BUTTON_DIRECTIVES } from './components/buttons';
import { CAROUSEL_DIRECTIVES } from './components/carousel';
import { CollapseDirective } from './components/collapse';
import { DATEPICKER_DIRECTIVES } from './components/datepicker';
import { DROPDOWN_DIRECTIVES } from './components/dropdown';
import { MODAL_DIRECTIVES } from './components/modal';
import { PAGINATION_DIRECTIVES } from './components/pagination';
import { PROGRESSBAR_DIRECTIVES } from './components/progressbar';
import { RatingComponent } from './components/rating';
import { TAB_DIRECTIVES } from './components/tabs';
import { TimepickerComponent } from './components/timepicker';
import { TOOLTIP_DIRECTIVES } from './components/tooltip';
import { TYPEAHEAD_DIRECTIVES } from './components/typeahead';

import { ComponentsHelper } from './components/utils/components-helper.service';

export * from './components/accordion';
export * from './components/alert';
export * from './components/buttons';
export * from './components/carousel';
export * from './components/collapse';
export * from './components/datepicker';
export * from './components/modal';
export * from './components/dropdown';
export * from './components/pagination';
export * from './components/progressbar';
export * from './components/rating';
export * from './components/tabs';
export * from './components/timepicker';
export * from './components/tooltip';
export * from './components/typeahead';

export * from './components/position';
export * from './components/common';
export * from './components/ng2-bootstrap-config';

export { AccordionModule } from './components/accordion/accordion.module';
export { AlertModule } from './components/alert/alert.module';
export { ButtonsModule } from './components/buttons/buttons.module';
export { CarouselModule } from './components/carousel/carousel.module';
export { CollapseModule } from './components/collapse/collapse.module';
export { DatepickerModule } from './components/datepicker/datepicker.module';
export { DropdownModule } from './components/dropdown/dropdown.module';
export { ModalModule } from './components/modal/modal.module';
export { PaginationModule } from './components/pagination/pagination.module';
export { ProgressbarModule } from './components/progressbar/progressbar.module';
export { RatingModule } from './components/rating/rating.module';
export { TabsModule } from './components/tabs/tabs.module';
export { TimepickerModule } from './components/timepicker/timepicker.module';
export { TooltipModule } from './components/tooltip/tooltip.module';
export { TypeaheadModule } from './components/typeahead/typeahead.module';
export { ComponentsHelper } from './components/utils/components-helper.service';

/** @deprecated */
export const BS_VIEW_PROVIDERS:any[] = [{provide: ComponentsHelper, useClass: ComponentsHelper}];

/** @deprecated */
export default {
  directives: [
    AlertComponent,
    ACCORDION_DIRECTIVES,
    BUTTON_DIRECTIVES,
    CAROUSEL_DIRECTIVES,
    CollapseDirective,
    DATEPICKER_DIRECTIVES,
    DROPDOWN_DIRECTIVES,
    MODAL_DIRECTIVES,
    PAGINATION_DIRECTIVES,
    PROGRESSBAR_DIRECTIVES,
    RatingComponent,
    TAB_DIRECTIVES,
    TimepickerComponent,
    TOOLTIP_DIRECTIVES,
    TYPEAHEAD_DIRECTIVES
  ],
  providers: [
    ComponentsHelper
  ]
};

export { Ng2BootstrapModule } from './components/index';
