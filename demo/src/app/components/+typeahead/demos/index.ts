import { DemoTypeaheadStaticComponent } from './static/static';
import { DemoTypeaheadItemTemplateComponent } from './item-template/item-template';
import { DemoTypeaheadFieldComponent } from './field/field';
import { DemoTypeaheadAsyncComponent } from './async/async';
import { DemoTypeaheadFormsComponent } from './in-form/in-form';
import { DemoTypeaheadGroupingComponent } from './grouping/grouping';

export const DEMO_COMPONENTS = [
  DemoTypeaheadStaticComponent,
  DemoTypeaheadItemTemplateComponent,
  DemoTypeaheadFieldComponent,
  DemoTypeaheadAsyncComponent,
  DemoTypeaheadFormsComponent,
  DemoTypeaheadGroupingComponent
];

export const DEMOS = {
  static: {
    component: require('!!raw-loader?lang=typescript!./static/static.ts'),
    html: require('!!raw-loader?lang=markup!./static/static.html')
  },
  itemTemplate: {
    component: require('!!raw-loader?lang=typescript!./item-template/item-template.ts'),
    html: require('!!raw-loader?lang=markup!./item-template/item-template.html')
  },
  field: {
    component: require('!!raw-loader?lang=typescript!./field/field.ts'),
    html: require('!!raw-loader?lang=markup!./field/field.html')
  },
  async: {
    component: require('!!raw-loader?lang=typescript!./async/async.ts'),
    html: require('!!raw-loader?lang=markup!./async/async.html')
  },
  inForm: {
    component: require('!!raw-loader?lang=typescript!./in-form/in-form.ts'),
    html: require('!!raw-loader?lang=markup!./in-form/in-form.html')
  },
  grouping: {
    component: require('!!raw-loader?lang=typescript!./grouping/grouping.ts'),
    html: require('!!raw-loader?lang=markup!./grouping/grouping.html')
  }
};
