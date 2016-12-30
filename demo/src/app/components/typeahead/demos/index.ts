import { TypeaheadDemoComponent } from './typeahead-demo.component';

export const DEMO_COMPONENTS = [
  TypeaheadDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./typeahead-demo.component'),
    html: require('!!raw?lang=markup!./typeahead-demo.component.html')
  }
};
