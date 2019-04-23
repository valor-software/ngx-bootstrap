/* tslint:disable: no-unused-variable */
import { AccordionModule } from './accordion/accordion.module';
import { AlertModule } from './alert/alert.module';
import { BsDatepickerInlineConfig } from './datepicker/bs-datepicker-inline.config';
import { BsDaterangepickerConfig } from './datepicker/bs-daterangepicker.config';
import { BsDropdownModule } from './dropdown/bs-dropdown.module';
import { ButtonsModule } from './buttons/buttons.module';
import { CarouselModule } from './carousel/carousel.module';
import { CollapseModule } from './collapse/collapse.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { ModalModule } from './modal/modal.module';
import { PaginationModule } from './pagination/pagination.module';
import { PopoverModule } from './popover/popover.module';
import { ProgressbarModule } from './progressbar/progressbar.module';
import { RatingModule } from './rating/rating.module';
import { SortableModule } from './sortable/index';
import { TabsModule } from './tabs/tabs.module';
import { TimepickerModule } from './timepicker/timepicker.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TypeaheadModule } from './typeahead/typeahead.module';

export { listLocales } from './chronos/locale/locales';
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
  BsDatepickerConfig,
  BsDatepickerDirective,
  BsDatepickerInlineConfig,
  BsDatepickerModule,
  BsDaterangepickerConfig,
  BsDaterangepickerDirective,
  BsLocaleService,
  DateFormatter,
  DatePickerComponent,
  DatepickerConfig,
  DatepickerModule,
  DayPickerComponent,
  MonthPickerComponent,
  YearPickerComponent
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
  PaginationModule,
  PageChangedEvent
} from './pagination/index';

export {
  BarComponent,
  ProgressbarComponent,
  ProgressbarConfig,
  ProgressbarModule
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
  TabComponent,
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

export {
  OnChange,
  document,
  window,
  parseTriggers,
  LinkedList,
  isBs3,
  Trigger,
  warnOnce,
  Utils,
  listenToTriggersV2,
  registerOutsideClick
} from './utils/index';

export {
  ComponentLoader,
  ComponentLoaderFactory,
  ContentRef,
  BsComponentRef
} from './component-loader/index';

export {
  Positioning,
  PositioningOptions,
  PositioningService,
  positionElements
} from './positioning/index';

export {
  Action,
  MiniState,
  MiniStore
} from './mini-ngrx/index';

export {
  defineLocale,
  getSetGlobalLocale,
  LocaleData,
  parseDate,
  formatDate,
  getDay,
  isFirstDayOfWeek,
  isSameYear,
  isSameDay,
  isSameMonth,
  getFullYear,
  getFirstDayOfMonth,
  getMonth,
  getLocale,
  updateLocale,
  isAfter,
  isBefore,
  isArray,
  isDateValid,
  isDate,
  shiftDate,
  setFullDate,
  endOf,
  startOf,
  TimeUnit
} from './chronos/index';

export * from './locale';
