import {GettingStartedSection} from './components/getting-started/getting-started';
import {AccordionSection} from './components/accordion-section';
import {AlertSection} from './components/alert-section';
import {ButtonsSection} from './components/buttons-section';
import {CarouselSection} from './components/carousel-section';
import {CollapseSection} from './components/collapse-section';
import {DatepickerSection} from './components/datepicker-section';
import {DropdownSection} from './components/dropdown-section';
import {PaginationSection} from './components/pagination-section';
import {ProgressbarSection} from './components/progressbar-section';
import {RatingSection} from './components/rating-section';
import {TabsSection} from './components/tabs-section';
import {TimepickerSection} from './components/timepicker-section';
import {TooltipSection} from './components/tooltip-section';
import {TypeaheadSection} from './components/typeahead-section';

export module config {
  export let routes = [{
    path: '/getting-started',
    name: 'Getting started',
    component: GettingStartedSection,
    useAsDefault: true
  }, {
    path: '/accordion',
    name: 'Accordion',
    component: AccordionSection
  }, {
    path: '/alerts',
    name: 'Alerts',
    component: AlertSection
  }, {
    path: '/buttons',
    name: 'Buttons',
    component: ButtonsSection
  }, {
    path: '/carousel',
    name: 'Carousel',
    component: CarouselSection
  }, {
    path: '/collapse',
    name: 'Collapse',
    component: CollapseSection
  }, {
    path: '/datepicker',
    name: 'Datepicker',
    component: DatepickerSection
  }, {
    path: '/dropdowns',
    name: 'Dropdowns',
    component: DropdownSection
  }, {
    path: '/pagination',
    name: 'Pagination',
    component: PaginationSection
  }, {
    path: '/progressbar',
    name: 'Progressbar',
    component: ProgressbarSection
  }, {
    path: '/rating',
    name: 'Rating',
    component: RatingSection
  }, {
    path: '/tabs',
    name: 'Tabs',
    component: TabsSection
  }, {
    path: '/timepicker',
    name: 'Timepicker',
    component: TimepickerSection
  }, {
    path: '/tooltip',
    name: 'Tooltip',
    component: TooltipSection
  }, {
    path: '/typeahead',
    name: 'Typeahead',
    component: TypeaheadSection
  }];
}
