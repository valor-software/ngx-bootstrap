import { SortableDemoComponent } from './sortable-demo.component';

export const DEMO_COMPONENTS = [SortableDemoComponent];

export const DEMOS = {
  basic: {
    component: require('!!raw?lang=typescript!./sortable-demo.component.ts'),
    html: require('!!raw?lang=markup!./sortable-demo.component.html')
  }
};
