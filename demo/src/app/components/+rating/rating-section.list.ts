import { DemoRatingBasicComponent } from './demos/basic/basic';
import { DemoRatingCustomComponent } from './demos/custom/custom';
import { DemoRatingDynamicComponent } from './demos/dynamic/dynamic';

export const demoComponentContent = {
  examples: [
    {
      title: 'Static rating',
      anchor: 'rating-static',
      name: 'basic',
      outlet: DemoRatingBasicComponent
    },
    {
      title: 'Dynamic rating',
      anchor: 'rating-dynamic',
      name: 'dynamic',
      outlet: DemoRatingCustomComponent
    },
    {
      title: 'Custom icons',
      anchor: 'rating-custom',
      name: 'custom',
      outlet: DemoRatingDynamicComponent
    }
  ],
  apiSections: [
    {
      title: 'RatingComponent',
      anchor: 'rating-component'
    }
  ]
};
