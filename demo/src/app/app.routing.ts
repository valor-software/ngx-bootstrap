import { GettingStartedComponent } from './getting-started/getting-started.component';

export const routes = [
  {
    path: '',
    data: ['Getting started'],
    component: GettingStartedComponent
  },
  {
    path: 'accordion',
    data: ['Accordion'],
    // component: AccordionSectionComponent
    loadChildren:
      './components/+accordion/demo-accordion.module#DemoAccordionModule'
  },
  {
    path: 'alerts',
    data: ['Alerts'],
    // component: AlertsSectionComponent,
    loadChildren: './components/+alerts/demo-alert.module#DemoAlertsModule'
  },
  {
    path: 'buttons',
    data: ['Buttons'],
    // component: ButtonsSectionComponent
    loadChildren: './components/+buttons/demo-buttons.module#DemoButtonsModule'
  },
  {
    path: 'carousel',
    data: ['Carousel'],
    // component: CarouselSectionComponent
    loadChildren:
      './components/+carousel/demo-carousel.module#DemoCarouselModule'
  },
  {
    path: 'collapse',
    data: ['Collapse'],
    // component: CollapseSectionComponent
    loadChildren:
      './components/+collapse/demo-collapse.module#DemoCollapseModule'
  },
  {
    path: 'datepicker',
    data: ['Datepicker'],
    // component: DatepickerSectionComponent
    loadChildren:
      './components/+datepicker/demo-datepicker.module#DemoDatepickerModule'
  },
  {
    path: 'dropdowns',
    data: ['Dropdowns'],
    // component: DropdownSectionComponent
    loadChildren:
      './components/+dropdown/demo-dropdown.module#DemoDropdownModule'
  },

  {
    path: 'modals',
    data: ['Modals'],
    // component: ModalSectionComponent
    loadChildren: './components/+modal/demo-modal.module#DemoModalModule'
  },
  {
    path: 'pagination',
    data: ['Pagination'],
    // component: PaginationSectionComponent
    loadChildren:
      './components/+pagination/demo-pagination.module#DemoPaginationModule'
  },
  {
    path: 'popover',
    data: ['Popover'],
    // component: PopoverSectionComponent
    loadChildren: './components/+popover/demo-popover.module#DemoPopoverModule'
  },
  {
    path: 'progressbar',
    data: ['Progressbar'],
    // component: ProgressbarSectionComponent
    loadChildren:
      './components/+progressbar/demo-progressbar.module#DemoProgressbarModule'
  },
  {
    path: 'rating',
    data: ['Rating'],
    // component: RatingSectionComponent,
    loadChildren: './components/+rating/demo-rating.module#DemoRatingModule'
  },
  {
    path: 'sortable',
    data: ['Sortable'],
    // component: SortableSectionComponent,
    loadChildren:
      './components/+sortable/demo-sortable.module#DemoSortableModule'
  },
  {
    path: 'tabs',
    data: ['Tabs'],
    // component: TabsSectionComponent
    loadChildren: './components/+tabs/demo-tabs.module#DemoTabsModule'
  },
  {
    path: 'timepicker',
    data: ['Timepicker'],
    // component: TimepickerSectionComponent
    loadChildren:
      './components/+timepicker/demo-timepicker.module#DemoTimepickerModule'
  },
  {
    path: 'tooltip',
    data: ['Tooltip'],
    // component: TooltipSectionComponent
    loadChildren: './components/+tooltip/demo-tooltip.module#DemoTooltipModule'
  },
  {
    path: 'typeahead',
    data: ['Typeahead'],
    // component: TypeaheadSectionComponent
    loadChildren:
      './components/+typeahead/demo-typeahead.module#DemoTypeaheadModule'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
