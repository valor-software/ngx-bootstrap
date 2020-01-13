import { LandingComponent } from './common/landing/landing.component';
import { DocumentationComponent } from './common/documentation/documentation.component';
import { DiscoverComponent } from './common/discover/discover.component';

export const routes = [
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
    // component: AccordionSectionComponent
    loadChildren:
      './components/+accordion/demo-accordion.module#DemoAccordionModule'
  },
  {
    path: 'alerts',
    data: ['Alerts', {moduleName: 'AlertModule', moduleFolder: 'alert'}],
    // component: AlertsSectionComponent,
    loadChildren: './components/+alerts/demo-alert.module#DemoAlertsModule'
  },
  {
    path: 'buttons',
    data: ['Buttons', {moduleName: 'ButtonsModule', moduleFolder: 'buttons'}],
    // component: ButtonsSectionComponent
    loadChildren: './components/+buttons/demo-buttons.module#DemoButtonsModule'
  },
  {
    path: 'carousel',
    data: ['Carousel', {moduleName: 'CarouselModule', moduleFolder: 'carousel'}],
    // component: CarouselSectionComponent
    loadChildren:
      './components/+carousel/demo-carousel.module#DemoCarouselModule'
  },
  {
    path: 'collapse',
    data: ['Collapse', {moduleName: 'CollapseModule', moduleFolder: 'collapse'}],
    // component: CollapseSectionComponent
    loadChildren:
      './components/+collapse/demo-collapse.module#DemoCollapseModule'
  },
  {
    path: 'datepicker',
    data: ['Datepicker', {moduleName: 'BsDatepickerModule', moduleFolder: 'datepicker'}],
    // component: DatepickerSectionComponent
    loadChildren:
      './components/+datepicker/demo-datepicker.module#DemoDatepickerModule'
  },
  {
    path: 'dropdowns',
    data: ['Dropdowns', {moduleName: 'BsDropdownModule', moduleFolder: 'dropdown'}],
    // component: DropdownSectionComponent
    loadChildren:
      './components/+dropdown/demo-dropdown.module#DemoDropdownModule'
  },

  {
    path: 'modals',
    data: ['Modals', {moduleName: 'ModalModule', moduleFolder: 'modal'}],
    // component: ModalSectionComponent
    loadChildren: './components/+modal/demo-modal.module#DemoModalModule'
  },
  {
    path: 'pagination',
    data: ['Pagination', {moduleName: 'PaginationModule', moduleFolder: 'pagination'}],
    // component: PaginationSectionComponent
    loadChildren:
      './components/+pagination/demo-pagination.module#DemoPaginationModule'
  },
  {
    path: 'popover',
    data: ['Popover', {moduleName: 'PopoverModule', moduleFolder: 'popover'}],
    // component: PopoverSectionComponent
    loadChildren: './components/+popover/demo-popover.module#DemoPopoverModule'
  },
  {
    path: 'progressbar',
    data: ['Progressbar', {moduleName: 'ProgressbarModule', moduleFolder: 'progressbar'}],
    // component: ProgressbarSectionComponent
    loadChildren:
      './components/+progressbar/demo-progressbar.module#DemoProgressbarModule'
  },
  {
    path: 'rating',
    data: ['Rating', {moduleName: 'RatingModule', moduleFolder: 'rating'}],
    // component: RatingSectionComponent,
    loadChildren: './components/+rating/demo-rating.module#DemoRatingModule'
  },
  {
    path: 'sortable',
    data: ['Sortable', {moduleName: 'SortableModule', moduleFolder: 'sortable'}],
    // component: SortableSectionComponent,
    loadChildren:
      './components/+sortable/demo-sortable.module#DemoSortableModule'
  },
  {
    path: 'tabs',
    data: ['Tabs', {moduleName: 'TabsModule', moduleFolder: 'tabs'}],
    // component: TabsSectionComponent
    loadChildren: './components/+tabs/demo-tabs.module#DemoTabsModule'
  },
  {
    path: 'timepicker',
    data: ['Timepicker', {moduleName: 'TimepickerModule', moduleFolder: 'timepicker'}],
    // component: TimepickerSectionComponent
    loadChildren:
      './components/+timepicker/demo-timepicker.module#DemoTimepickerModule'
  },
  {
    path: 'tooltip',
    data: ['Tooltip', {moduleName: 'TooltipModule', moduleFolder: 'tooltip'}],
    // component: TooltipSectionComponent
    loadChildren: './components/+tooltip/demo-tooltip.module#DemoTooltipModule'
  },
  {
    path: 'typeahead',
    data: ['Typeahead', {moduleName: 'TypeaheadModule', moduleFolder: 'typeahead'}],
    // component: TypeaheadSectionComponent
    loadChildren:
      './components/+typeahead/demo-typeahead.module#DemoTypeaheadModule'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
