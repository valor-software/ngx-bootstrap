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

export const routes = [{
  path: '/getting-started',
  name: 'Getting started',
  component: GettingStartedSectionComponent,
  useAsDefault: true
}, {
  path: '/accordion',
  name: 'Accordion',
  component: AccordionSectionComponent
}, {
  path: '/alerts',
  name: 'Alerts',
  component: AlertSectionComponent
}, {
  path: '/buttons',
  name: 'Buttons',
  component: ButtonsSectionComponent
}, {
  path: '/carousel',
  name: 'Carousel',
  component: CarouselSectionComponent
}, {
  path: '/collapse',
  name: 'Collapse',
  component: CollapseSectionComponent
}, {
  path: '/datepicker',
  name: 'Datepicker',
  component: DatepickerSectionComponent
}, {
  path: '/dropdowns',
  name: 'Dropdowns',
  component: DropdownSectionComponent
}, {
  path: '/modals',
  name: 'Modals',
  component: ModalSectionComponent
}, {
  path: '/pagination',
  name: 'Pagination',
  component: PaginationSectionComponent
}, {
  path: '/progressbar',
  name: 'Progressbar',
  component: ProgressbarSectionComponent
}, {
  path: '/rating',
  name: 'Rating',
  component: RatingSectionComponent
}, {
  path: '/tabs',
  name: 'Tabs',
  component: TabsSectionComponent
}, {
  path: '/timepicker',
  name: 'Timepicker',
  component: TimepickerSectionComponent
}, {
  path: '/tooltip',
  name: 'Tooltip',
  component: TooltipSectionComponent
}, {
  path: '/typeahead',
  name: 'Typeahead',
  component: TypeaheadSectionComponent
}];
