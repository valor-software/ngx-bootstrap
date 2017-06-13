import { DemoModalSizesComponent } from './sizes/sizes';
import { DemoModalStaticComponent } from './static/static';
import { DemoModalChildComponent } from './child/child';
import { DemoAutoShownModalComponent } from './auto-shown/auto-shown';
import { DemoModalNestedComponent } from './nested/nested';
import {DemoModalServiceComponent} from './service/service';

export const DEMO_COMPONENTS = [
  DemoModalSizesComponent,
  DemoModalChildComponent,
  DemoModalStaticComponent,
  DemoAutoShownModalComponent,
  DemoModalNestedComponent,
  DemoModalServiceComponent
];

export const DEMOS = {
  sizes: {
    component: require('!!raw-loader?lang=typescript!./sizes/sizes.ts'),
    html: require('!!raw-loader?lang=markup!./sizes/sizes.html')
  },
  child: {
    component: require('!!raw-loader?lang=typescript!./child/child.ts'),
    html: require('!!raw-loader?lang=markup!./child/child.html')
  },
  nested: {
    component: require('!!raw-loader?lang=typescript!./nested/nested.ts'),
    html: require('!!raw-loader?lang=markup!./nested/nested.html')
  },
  staticModal: {
    component: require('!!raw-loader?lang=typescript!./static/static.ts'),
    html: require('!!raw-loader?lang=markup!./static/static.html')
  },
  autoShown: {
    component: require('!!raw-loader?lang=typescript!./auto-shown/auto-shown.ts'),
    html: require('!!raw-loader?lang=markup!./auto-shown/auto-shown.html')
  },
  service: {
    component: require('!!raw-loader?lang=typescript!./service/service.ts'),
    html: require('!!raw-loader?lang=markup!./service/service.html')
  }
};
