import { ComplexDatamodelDemoComponent } from './complex-datamodel/complex-datamodel.component';
import { SimpleItemsDemoComponent } from './simple-items/simple-items.component';
import { CustomItemTemplateDemoComponent } from './custom-item-template/custom-item-template';
import { OneWayDemoComponent } from './one-way/one-way.component';
import { DirectivesUsageDemoComponent } from './directives-usage/directives-usage.component';

export const DEMO_COMPONENTS = [
  SimpleItemsDemoComponent,
  ComplexDatamodelDemoComponent,
  CustomItemTemplateDemoComponent,
  OneWayDemoComponent,
  DirectivesUsageDemoComponent
];

export const DEMOS = {
  complexDatamodel: {
    component: require('!!raw-loader?lang=typescript!./complex-datamodel/complex-datamodel.component.ts'),
    html: require('!!raw-loader?lang=markup!./complex-datamodel/complex-datamodel.component.html')
  },
  simpleItems: {
    component: require('!!raw-loader?lang=typescript!./simple-items/simple-items.component.ts'),
    html: require('!!raw-loader?lang=markup!./simple-items/simple-items.component.html')
  },
  itemTemplate: {
    component: require('!!raw-loader?lang=typescript!./custom-item-template/custom-item-template.ts'),
    html: require('!!raw-loader?lang=markup!./custom-item-template/custom-item-template.html')
  },
  oneWay: {
    component: require('!!raw-loader?lang=typescript!./one-way/one-way.component.ts'),
    html: require('!!raw-loader?lang=markup!./one-way/one-way.component.html')
  },
  directivesUsage: {
    component: require('!!raw-loader?lang=typescript!./directives-usage/directives-usage.component.ts'),
    html: require('!!raw-loader?lang=markup!./directives-usage/directives-usage.component.html')
  }
};
