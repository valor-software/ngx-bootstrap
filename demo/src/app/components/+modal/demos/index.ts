import { DemoModalSizesComponent } from './sizes/sizes';
import { DemoModalStaticComponent } from './static/static';
import { DemoModalChildComponent } from './child/child';
import { DemoAutoShownModalComponent } from './auto-shown/auto-shown';
import { DemoModalNestedComponent } from './nested/nested';
import { DemoModalServiceStaticComponent } from './service-template/service-template';
import { DemoModalServiceFromComponent } from './service-component/service-component';
import { DemoModalServiceNestedComponent } from './service-nested/service-nested';
import { DemoModalServiceOptionsComponent } from './service-options/service-options';

export const DEMO_COMPONENTS = [
  DemoModalSizesComponent,
  DemoModalChildComponent,
  DemoModalStaticComponent,
  DemoAutoShownModalComponent,
  DemoModalNestedComponent,
  DemoModalServiceStaticComponent,
  DemoModalServiceFromComponent,
  DemoModalServiceNestedComponent,
  DemoModalServiceOptionsComponent
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
  serviceTemplate: {
    component: require('!!raw-loader?lang=typescript!./service-template/service-template.ts'),
    html: require('!!raw-loader?lang=markup!./service-template/service-template.html')
  },
  serviceComponent: {
    component: require('!!raw-loader?lang=typescript!./service-component/service-component.ts'),
    html: require('!!raw-loader?lang=markup!./service-component/service-component.html')
  },
  serviceNested: {
    component: require('!!raw-loader?lang=typescript!./service-nested/service-nested.ts'),
    html: require('!!raw-loader?lang=markup!./service-nested/service-nested.html')
  },
  serviceOptions: {
    component: require('!!raw-loader?lang=typescript!./service-options/service-options.ts'),
    html: require('!!raw-loader?lang=markup!./service-options/service-options.html')
  }
};
