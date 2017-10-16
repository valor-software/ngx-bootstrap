import { CollapseDemoComponent } from './demos/collapse-demo.component';

export const demoComponentContent = {
  examples: [
    {
      title: 'Basic',
      anchor: 'basic',
      name: 'old',
      outlet: CollapseDemoComponent
    }
  ],
  apiSections: [
    {
      title: 'CollapseDirective',
      anchor: 'collapse-directive'
    }
  ]
};
