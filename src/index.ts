/* tslint:disable: no-unused-variable */
import { AccordionModule } from './accordion';
import { AlertModule } from './alert';

import {
  BsDatepickerInlineConfig,
  BsDaterangepickerConfig,
  DatepickerModule
} from './datepicker';

import { BsDropdownModule } from './dropdown';
import { ButtonsModule } from './buttons';
import { CarouselModule } from './carousel';
import { CollapseModule } from './collapse';
import { ModalModule } from './modal';
import { PaginationModule } from './pagination';
import { PopoverModule } from './popover';
import { ProgressbarModule } from './progressbar';
import { RatingModule } from './rating';
import { SortableModule } from './sortable';
import { TabsModule } from './tabs';
import { TimepickerModule } from './timepicker';
import { TooltipModule } from './tooltip';
import { TypeaheadModule } from './typeahead';

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
  BsModalRef,
  BsModalService,
  ModalBackdropComponent,
  ModalBackdropOptions,
  ModalDirective,
  ModalModule,
  ModalOptions
} from './modal/index';

export {
  BsDropdownConfig,
  BsDropdownContainerComponent,
  BsDropdownDirective,
  BsDropdownMenuDirective,
  BsDropdownModule,
  BsDropdownState,
  BsDropdownToggleDirective
} from './dropdown/index';

export {
  PageChangedEvent,
  PagerComponent,
  PaginationComponent,
  PaginationConfig,
  PaginationModule
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
  SortableComponent,
  SortableItem,
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
  positionElements,
  Positioning,
  PositioningOptions,
  PositioningService
} from './positioning/index';

export {
  Action,
  MiniState,
  MiniStore
} from './mini-ngrx/index';

export {
  defineLocale,
  endOf,
  formatDate,
  getDay,
  getFirstDayOfMonth,
  getFullYear,
  getLocale,
  getMonth,
  getSetGlobalLocale,
  isAfter,
  isArray,
  isBefore,
  isDate,
  isDateValid,
  isFirstDayOfWeek,
  isSameDay,
  isSameMonth,
  isSameYear,
  LocaleData,
  parseDate,
  setFullDate,
  shiftDate,
  startOf,
  TimeUnit,
  updateLocale
} from './chronos/index';

export * from './locale';
