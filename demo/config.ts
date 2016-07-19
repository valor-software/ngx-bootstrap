import {GettingStartedSectionComponent} from './components/getting-started/getting-started';
import {AccordionSectionComponent} from './components/accordion-section';
import {AlertSectionComponent} from './components/alert-section';
import {ButtonsSectionComponent} from './components/buttons-section';
import {CarouselSectionComponent} from './components/carousel-section';
import {CollapseSectionComponent} from './components/collapse-section';
import {DatepickerSectionComponent} from './components/datepicker-section';
import {DropdownSectionComponent} from './components/dropdown-section';
import {PaginationSectionComponent} from './components/pagination-section';
import {ProgressbarSectionComponent} from './components/progressbar-section';
import {RatingSectionComponent} from './components/rating-section';
import {TabsSectionComponent} from './components/tabs-section';
import {TimepickerSectionComponent} from './components/timepicker-section';
import {TooltipSectionComponent} from './components/tooltip-section';
import {TypeaheadSectionComponent} from './components/typeahead-section';
import {ModalSectionComponent} from './components/modal-section';

import {provideRouter, RouterConfig} from '@angular/router';

export const routes:RouterConfig = [
  {
    path: '',
    data: ['Getting started'],
    component: GettingStartedSectionComponent
  }, {
    path: 'accordion',
    data: ['Accordion'],
    component: AccordionSectionComponent
  }, {
    path: 'alerts',
    data: ['Alerts'],
    component: AlertSectionComponent
  }, {
    path: 'buttons',
    data: ['Buttons'],
    component: ButtonsSectionComponent
  }, {
    path: 'carousel',
    data: ['Carousel'],
    component: CarouselSectionComponent
  }, {
    path: 'collapse',
    data: ['Collapse'],
    component: CollapseSectionComponent
  }, {
    path: 'datepicker',
    data: ['Datepicker'],
    component: DatepickerSectionComponent
  }, {
    path: 'dropdowns',
    data: ['Dropdowns'],
    component: DropdownSectionComponent
  }, {
    path: 'modals',
    data: ['Modals'],
    component: ModalSectionComponent
  }, {
    path: 'pagination',
    data: ['Pagination'],
    component: PaginationSectionComponent
  }, {
    path: 'progressbar',
    data: ['Progressbar'],
    component: ProgressbarSectionComponent
  }, {
    path: 'rating',
    data: ['Rating'],
    component: RatingSectionComponent
  }, {
    path: 'tabs',
    data: ['Tabs'],
    component: TabsSectionComponent
  }, {
    path: 'timepicker',
    data: ['Timepicker'],
    component: TimepickerSectionComponent
  }, {
    path: 'tooltip',
    data: ['Tooltip'],
    component: TooltipSectionComponent
  }, {
    path: 'typeahead',
    data: ['Typeahead'],
    component: TypeaheadSectionComponent
  }, {
    path: '**',
    redirectTo: '/'
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
