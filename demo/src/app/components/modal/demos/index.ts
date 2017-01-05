import { DemoModalSizesComponent } from './sizes/sizes';
import { DemoModalStaticComponent } from './static/static';
import { DemoModalChildComponent } from './child/child';

export const DEMO_COMPONENTS = [
  DemoModalSizesComponent, DemoModalChildComponent, DemoModalStaticComponent
];

export const DEMOS = {
  sizes: {
    component: require('!!raw?lang=typescript!./sizes/sizes.ts'),
    html: require('!!raw?lang=markup!./sizes/sizes.html')
  },
  child: {
    component: require('!!raw?lang=typescript!./child/child.ts'),
    html: require('!!raw?lang=markup!./child/child.html')
  },
  staticModal: {
    component: require('!!raw?lang=typescript!./static/static.ts'),
    html: require('!!raw?lang=markup!./static/static.html')
  }
};
