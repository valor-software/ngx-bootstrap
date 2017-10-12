import { DemoPaginationBasicComponent } from './demos/basic/basic';
import { DemoPaginationPagerComponent } from './demos/pager/pager';
import { DemoPaginationLimitComponent } from './demos/limit/limit';
import { DemoPaginationStylingComponent } from './demos/styling-global/styling-global';

export const paginationExamples = [
  {
    title: 'Default',
    anchor: 'pagination-default',
    name: 'basic',
    outlet: DemoPaginationBasicComponent
  },
  {
    title: 'States & Limits',
    anchor: 'pagination-limit',
    name: 'limit',
    description: `<p>Limit the maximum visible buttons</p>`,
    outlet: DemoPaginationLimitComponent
  },
  {
    title: 'Pager',
    anchor: 'pagination-pager',
    name: 'pager',
    outlet: DemoPaginationPagerComponent
  }
  /* TODO: temporary disabled pageBtnClass option
  {
    title: 'Styling',
    anchor: 'pagination-styling',
    name: 'styling',
    outlet: DemoPaginationStylingComponent
  }*/
];

export const paginationApi = [
  {
    title: 'PaginationComponent',
    anchor: 'pagination-component'
  },
  {
    title: 'PagerComponent',
    anchor: 'pager-component'
  },
  {
    title: 'PaginationConfig',
    anchor: 'pagination-config'
  }
];
