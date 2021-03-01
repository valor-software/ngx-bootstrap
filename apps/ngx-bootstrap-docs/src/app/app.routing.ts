import { Routes } from '@angular/router';
import { LandingComponent } from './common/landing/landing.component';
import { DocumentationComponent } from './common/documentation/documentation.component';
import { DiscoverComponent } from './common/discover/discover.component';

export const routes: Routes = [
  {
    path: '',
    data: ['Landing page'],
    component: LandingComponent
  },
  {
    path: 'documentation',
    data: ['Documentation'],
    component: DocumentationComponent
  },
  {
    path: 'discover',
    data: ['Discover'],
    component: DiscoverComponent
  },
  {
    path: 'accordion',
    data: ['Accordion', {moduleName: 'AccordionModule', moduleFolder: 'accordion'}],
    loadChildren: () => import('./components/+accordion/demo-accordion.module').then(m => m.DemoAccordionModule)
  },
  {
    path: 'alerts',
    data: ['Alerts', {moduleName: 'AlertModule', moduleFolder: 'alert'}],
    loadChildren: () => import('./components/+alerts/demo-alert.module').then(m => m.DemoAlertsModule)
  },
  {
    path: 'buttons',
    data: ['Buttons', {moduleName: 'ButtonsModule', moduleFolder: 'buttons'}],
    loadChildren: () => import('./components/+buttons/demo-buttons.module').then(m => m.DemoButtonsModule)
  },
  {
    path: 'carousel',
    data: ['Carousel', {moduleName: 'CarouselModule', moduleFolder: 'carousel'}],
    loadChildren: () => import('./components/+carousel/demo-carousel.module').then(m => m.DemoCarouselModule)
  },
  {
    path: 'collapse',
    data: ['Collapse', {moduleName: 'CollapseModule', moduleFolder: 'collapse'}],
    loadChildren: () => import('./components/+collapse/demo-collapse.module').then(m => m.DemoCollapseModule)
  },
  {
    path: 'datepicker',
    data: ['Datepicker', {moduleName: 'BsDatepickerModule', moduleFolder: 'datepicker'}],
    loadChildren: () => import('./components/+datepicker/demo-datepicker.module').then(m => m.DemoDatepickerModule)
  },
  {
    path: 'dropdowns',
    data: ['Dropdowns', {moduleName: 'BsDropdownModule', moduleFolder: 'dropdown'}],
    loadChildren: () => import('./components/+dropdown/demo-dropdown.module').then(m => m.DemoDropdownModule)
  },

  {
    path: 'modals',
    data: ['Modals', {moduleName: 'ModalModule', moduleFolder: 'modal'}],
    loadChildren: () => import('./components/+modal/demo-modal.module').then(m => m.DemoModalModule)
  },
  {
    path: 'pagination',
    data: ['Pagination', {moduleName: 'PaginationModule', moduleFolder: 'pagination'}],
    loadChildren: () => import('./components/+pagination/demo-pagination.module').then(m => m.DemoPaginationModule)
  },
  {
    path: 'popover',
    data: ['Popover', {moduleName: 'PopoverModule', moduleFolder: 'popover'}],
    loadChildren: () => import('./components/+popover/demo-popover.module').then(m => m.DemoPopoverModule)
  },
  {
    path: 'progressbar',
    data: ['Progressbar', {moduleName: 'ProgressbarModule', moduleFolder: 'progressbar'}],
    loadChildren: () => import('./components/+progressbar/demo-progressbar.module').then(m => m.DemoProgressbarModule)
  },
  {
    path: 'rating',
    data: ['Rating', {moduleName: 'RatingModule', moduleFolder: 'rating'}],
    loadChildren: () => import('./components/+rating/demo-rating.module').then(m => m.DemoRatingModule)
  },
  {
    path: 'sortable',
    data: ['Sortable', {moduleName: 'SortableModule', moduleFolder: 'sortable'}],
    loadChildren: () => import('./components/+sortable/demo-sortable.module').then(m => m.DemoSortableModule)
  },
  {
    path: 'tabs',
    data: ['Tabs', {moduleName: 'TabsModule', moduleFolder: 'tabs'}],
    loadChildren: () => import('./components/+tabs/demo-tabs.module').then(m => m.DemoTabsModule)
  },
  {
    path: 'timepicker',
    data: ['Timepicker', {moduleName: 'TimepickerModule', moduleFolder: 'timepicker'}],
    loadChildren: () => import('./components/+timepicker/demo-timepicker.module').then(m => m.DemoTimepickerModule)
  },
  {
    path: 'tooltip',
    data: ['Tooltip', {moduleName: 'TooltipModule', moduleFolder: 'tooltip'}],
    loadChildren: () => import('./components/+tooltip/demo-tooltip.module').then(m => m.DemoTooltipModule)
  },
  {
    path: 'typeahead',
    data: ['Typeahead', {moduleName: 'TypeaheadModule', moduleFolder: 'typeahead'}],
    loadChildren: () => import('./components/+typeahead/demo-typeahead.module').then(m => m.DemoTypeaheadModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
