import { RatingDemoComponent } from './rating-demo.component';

export const DEMO_COMPONENTS = [
  RatingDemoComponent
];

export const DEMOS = {
  old: {
    component: require('!!raw?lang=typescript!./rating-demo.component'),
    html: require('!!raw?lang=markup!./rating-demo.component.html')
  }
};
