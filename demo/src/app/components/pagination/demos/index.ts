import { DemoPaginationBasicComponent } from './basic/basic';
import { DemoPaginationPagerComponent } from './pager/pager';
import { DemoPaginationLimitComponent } from './limit/limit';
import { DemoPaginationStylingComponent } from './styling-global/styling-global';

export const DEMO_COMPONENTS = [
  DemoPaginationBasicComponent, DemoPaginationPagerComponent, DemoPaginationLimitComponent, DemoPaginationStylingComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw?lang=typescript!./basic/basic.ts'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  pager: {
    component: require('!!raw?lang=typescript!./pager/pager.ts'),
    html: require('!!raw?lang=markup!./pager/pager.html')
  },
  limit: {
    component: require('!!raw?lang=typescript!./limit/limit.ts'),
    html: require('!!raw?lang=markup!./limit/limit.html')
  },
  styling: {
    component: require('!!raw?lang=typescript!./styling-global/styling-global.ts'),
    html: require('!!raw?lang=markup!./styling-global/styling-global.html')
  }
};
