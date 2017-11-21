/* tslint:disable: max-classes-per-file */
import { AccordionModule } from './accordion/accordion.module';
import { AlertModule } from './alert/alert.module';
import { ButtonsModule } from './buttons/buttons.module';
import { CarouselModule } from './carousel/carousel.module';
import { CollapseModule } from './collapse/collapse.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { BsDropdownModule } from './dropdown/bs-dropdown.module';
import { ModalModule } from './modal/modal.module';
import { PaginationModule } from './pagination/pagination.module';
import { ProgressbarModule } from './progressbar/progressbar.module';
import { RatingModule } from './rating/rating.module';
import { SortableModule } from './sortable/index';
import { TabsModule } from './tabs/tabs.module';
import { TimepickerModule } from './timepicker/timepicker.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TypeaheadModule } from './typeahead/typeahead.module';
import { PopoverModule } from './popover/popover.module';
export { listLocales } from './bs-moment/locale/locales.service';
export { setTheme } from './utils/theme-provider';

export {
  AccordionComponent,
  AccordionConfig,
  AccordionModule,
  AccordionPanelComponent
} from './accordion/index';

export { AlertComponent, AlertConfig, AlertModule } from './alert/index';

export {
  ButtonCheckboxDirective,
  ButtonRadioDirective,
  ButtonsModule
} from './buttons/index';

export {
  CarouselComponent,
  CarouselConfig,
  CarouselModule,
  SlideComponent
} from './carousel/index';

export { CollapseDirective, CollapseModule } from './collapse/index';

export {
  DateFormatter,
  DatePickerComponent,
  DatepickerConfig,
  DatepickerModule,
  DayPickerComponent,
  MonthPickerComponent,
  YearPickerComponent,
  BsDatepickerModule,
  BsDatepickerConfig
} from './datepicker/index';

export {
  ModalDirective,
  ModalOptions,
  ModalBackdropOptions,
  ModalBackdropComponent,
  ModalModule,
  BsModalRef,
  BsModalService
} from './modal/index';

export {
  BsDropdownModule,
  BsDropdownConfig,
  BsDropdownState,
  BsDropdownContainerComponent,
  BsDropdownDirective,
  BsDropdownMenuDirective,
  BsDropdownToggleDirective
} from './dropdown/index';

export {
  PagerComponent,
  PaginationComponent,
  PaginationConfig,
  PaginationModule
} from './pagination/index';

export {
  BarComponent,
  ProgressbarComponent,
  ProgressbarConfig,
  ProgressbarModule,
  ProgressDirective
} from './progressbar/index';

export { RatingComponent, RatingModule } from './rating/index';

export {
  DraggableItem,
  DraggableItemService,
  SortableItem,
  SortableComponent,
  SortableModule
} from './sortable/index';

export {
  NgTranscludeDirective,
  TabDirective,
  TabHeadingDirective,
  TabsetComponent,
  TabsetConfig,
  TabsModule
} from './tabs/index';

export {
  TimepickerComponent,
  TimepickerConfig,
  TimepickerModule
} from './timepicker/index';

export {
  TooltipConfig,
  TooltipContainerComponent,
  TooltipDirective,
  TooltipModule
} from './tooltip/index';

export {
  TypeaheadOptions,
  TypeaheadContainerComponent,
  TypeaheadDirective,
  TypeaheadMatch,
  TypeaheadModule
} from './typeahead/index';

export {
  PopoverConfig,
  PopoverContainerComponent,
  PopoverDirective,
  PopoverModule
} from './popover/index';

export { OnChange, LinkedList, isBs3, Trigger, Utils } from './utils/index';

export {
  ComponentLoader,
  ComponentLoaderFactory,
  ContentRef
} from './component-loader/index';

export {
  Positioning,
  PositioningOptions,
  PositioningService,
  positionElements
} from './positioning/index';

export { defineLocale, getSetGlobalLocale, LocaleData } from './bs-moment/index';

export {
  ar,
  cs,
  de,
  enGb,
  es,
  esDo,
  esUs,
  fr,
  he,
  hi,
  hu,
  it,
  ja,
  ko,
  nl,
  nlBe,
  pl,
  ptBr,
  ru,
  sv,
  zhCn,
  tr
} from './locale';
