import { GettingStartedComponent } from './getting-started/getting-started.component';
import { AccordionSectionComponent } from './components/accordion/accordion-section.component';
import { AlertsSectionComponent } from './components/alerts/alerts-section.component';
import { ButtonsSectionComponent } from './components/buttons/buttons-section.component';
import { CarouselSectionComponent } from './components/carousel/carousel-section.component';
import { CollapseSectionComponent } from './components/collapse/collapse-section.component';
import { DatepickerSectionComponent } from './components/datepicker/datepicker-section.component';
import { DropdownSectionComponent } from './components/dropdown/dropdown-section.component';
import { ModalSectionComponent } from './components/modal/modal-section.component';
import { ProgressbarSectionComponent } from './components/progressbar/progressbar-section.component';
import { PaginationSectionComponent } from './components/pagination/pagination-section.component';
import { RatingSectionComponent } from './components/rating/rating-section.component';
import { SortableSectionComponent } from './components/sortable/sortable-section.component';
import { TabsSectionComponent } from './components/tabs/tabs-section.component';
import { TimepickerSectionComponent } from './components/timepicker/timepicker-section.component';
import { TooltipSectionComponent } from './components/tooltip/tooltip-section.component';
import { TypeaheadSectionComponent } from './components/typeahead/typeahead-section.component';
import { PopoverSectionComponent } from './components/popover/popover-section.component';

export const routes = [
  {
    path: '',
    data: ['Getting started'],
    component: GettingStartedComponent
  },
  {
    path: 'accordion',
    data: ['Accordion'],
    component: AccordionSectionComponent
  },
  {
    path: 'alerts',
    data: ['Alerts'],
    component: AlertsSectionComponent
  },
  {
    path: 'buttons',
    data: ['Buttons'],
    component: ButtonsSectionComponent
  },
  {
    path: 'carousel',
    data: ['Carousel'],
    component: CarouselSectionComponent
  }, {
    path: 'collapse',
    data: ['Collapse'],
    component: CollapseSectionComponent
  },
  {
    path: 'datepicker',
    data: ['Datepicker'],
    component: DatepickerSectionComponent
  },
  {
    path: 'dropdowns',
    data: ['Dropdowns'],
    component: DropdownSectionComponent
  },

  {
    path: 'modals',
    data: ['Modals'],
    component: ModalSectionComponent
  },
  {
    path: 'pagination',
    data: ['Pagination'],
    component: PaginationSectionComponent
  },
  {
    path: 'popover',
    data: ['Popover'],
    component: PopoverSectionComponent
  },
  {
    path: 'progressbar',
    data: ['Progressbar'],
    component: ProgressbarSectionComponent
  },
  {
    path: 'rating',
    data: ['Rating'],
    component: RatingSectionComponent
  },
  {
    path: 'tabs',
    data: ['Tabs'],
    component: TabsSectionComponent
  },
  {
    path: 'timepicker',
    data: ['Timepicker'],
    component: TimepickerSectionComponent
  },
  {
    path: 'sortable',
    data: ['Sortable'],
    component: SortableSectionComponent
  },
  {
    path: 'tooltip',
    data: ['Tooltip'],
    component: TooltipSectionComponent
  },
  {
    path: 'typeahead',
    data: ['Typeahead'],
    component: TypeaheadSectionComponent
  }, {
    path: '**',
    redirectTo: '/'
  }
];
