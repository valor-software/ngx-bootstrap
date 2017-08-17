import { ComplexDatamodelDemoComponent } from './complex-datamodel/complex-datamodel.component';
import { SimpleItemsDemoComponent } from './simple-items/simple-items.component';
import { CustomItemTemplateDemoComponent } from './custom-item-template/custom-item-template';
import { OnDropEventComponent } from './on-drop-event/on-drop-event.component';

export const DEMO_COMPONENTS = [
  SimpleItemsDemoComponent,
  ComplexDatamodelDemoComponent,
  CustomItemTemplateDemoComponent,
  OnDropEventComponent
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
  onDropEvent: {
    component: require('!!raw-loader?lang=typescript!./on-drop-event/on-drop-event.component.ts'),
    html: require('!!raw-loader?lang=markup!./on-drop-event/on-drop-event.component.html')
  }
};
