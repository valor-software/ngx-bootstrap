import { PaginationDemoComponent } from './pagination-demo.component';

export const DEMO_COMPONENTS = [
  PaginationDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./pagination-demo.component'),
    html: require('!!raw?lang=markup!./pagination-demo.component.html')
  }
};
