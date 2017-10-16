import { SimpleItemsDemoComponent } from './demos/simple-items/simple-items.component';
import { ComplexDatamodelDemoComponent } from './demos/complex-datamodel/complex-datamodel.component';
import { CustomItemTemplateDemoComponent } from './demos/custom-item-template/custom-item-template';

export const demoComponentContent = {
  examples: [
    {
      title: 'String items',
      anchor: 'stringItems',
      name: 'simpleItems',
      outlet: SimpleItemsDemoComponent
    },
    {
      title: 'Complex data model',
      anchor: 'complexDatamodel',
      name: 'complexDatamodel',
      outlet: ComplexDatamodelDemoComponent
    },
    {
      title: 'Custom item template',
      anchor: 'itemTemplate',
      name: 'itemTemplate',
      outlet: CustomItemTemplateDemoComponent
    }
  ],
  apiSections: [
    {
      title: 'SortableComponent',
      anchor: 'sortable-component'
    }
  ]
};
