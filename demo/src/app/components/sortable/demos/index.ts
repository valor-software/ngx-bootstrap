import { ComplexDatamodelDemoComponent } from './complex-datamodel/complex-datamodel.component';
import { SimpleItemsDemoComponent } from './simple-items/simple-items.component';

export const DEMO_COMPONENTS = [SimpleItemsDemoComponent, ComplexDatamodelDemoComponent];

export const DEMOS = {
  complexDatamodel: {
    component: require('!!raw?lang=typescript!./complex-datamodel/complex-datamodel.component.ts'),
    html: require('!!raw?lang=markup!./complex-datamodel/complex-datamodel.component.html')
  },
  simpleItems: {
    component: require('!!raw?lang=typescript!./simple-items/simple-items.component.ts'),
    html: require('!!raw?lang=markup!./simple-items/simple-items.component.html')
  }
};
