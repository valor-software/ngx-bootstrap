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
    component: require('!!raw?lang=typescript!./static/static.ts'),
    html: require('!!raw?lang=markup!./static/static.html')
  },
  itemTemplate: {
    component: require('!!raw?lang=typescript!./item-template/item-template.ts'),
    html: require('!!raw?lang=markup!./item-template/item-template.html')
  },
  field: {
    component: require('!!raw?lang=typescript!./field/field.ts'),
    html: require('!!raw?lang=markup!./field/field.html')
  },
  async: {
    component: require('!!raw?lang=typescript!./async/async.ts'),
    html: require('!!raw?lang=markup!./async/async.html')
  },
  inForm: {
    component: require('!!raw?lang=typescript!./in-form/in-form.ts'),
    html: require('!!raw?lang=markup!./in-form/in-form.html')
  },
  grouping: {
    component: require('!!raw?lang=typescript!./grouping/grouping.ts'),
    html: require('!!raw?lang=markup!./grouping/grouping.html')
  }
};
