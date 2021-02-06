import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { ngdoc } from '../ng-api-doc';
import { AppComponent } from './app.component';
import { DocumentationComponent } from './common/documentation/documentation.component';
import { LandingComponent } from './common/landing/landing.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { DiscoverComponent } from './common/discover/discover.component';
import { DocsModule } from './docs/index';
import { NgApiDoc } from './docs/api-docs/api-docs.model';
import { StyleManager } from './theme/style-manager';
import { ThemeStorage } from './theme/theme-storage';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { Routes } from '@angular/router';

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

@NgModule({
  declarations: [AppComponent, DocumentationComponent, TopMenuComponent, LandingComponent, DiscoverComponent],
  imports: [
    BrowserAnimationsModule,
    DocsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: environment.useHash }),
    NgxPageScrollCoreModule.forRoot({ duration: 11, scrollOffset: 70 }),
    NgxPageScrollModule,
    BsDropdownModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ngx-bootstrap' }),
    ScullyLibModule
  ],
  providers: [ThemeStorage, StyleManager, { provide: NgApiDoc, useValue: ngdoc }],
  bootstrap: [AppComponent]
})
export class AppModule {}
