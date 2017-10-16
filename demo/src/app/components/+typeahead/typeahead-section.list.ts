import { DemoTypeaheadStaticComponent } from './demos/static/static';
import { DemoTypeaheadItemTemplateComponent } from './demos/item-template/item-template';
import { DemoTypeaheadFieldComponent } from './demos/field/field';
import { DemoTypeaheadAsyncComponent } from './demos/async/async';
import { DemoTypeaheadFormsComponent } from './demos/in-form/in-form';
import { DemoTypeaheadGroupingComponent } from './demos/grouping/grouping';
import { DemoTypeaheadDropupComponent } from './demos/dropup/dropup';

export const demoComponentContent = {
  examples: [
    {
      title: 'Static array',
      anchor: 'static-array',
      name: 'static',
      outlet: DemoTypeaheadStaticComponent
    },
    {
      title: 'Item template',
      anchor: 'item-template',
      name: 'itemTemplate',
      outlet: DemoTypeaheadItemTemplateComponent
    },
    {
      title: 'Option field',
      anchor: 'option-field',
      name: 'field',
      outlet: DemoTypeaheadFieldComponent
    },
    {
      title: 'Async data',
      anchor: 'async-data',
      name: 'async',
      outlet: DemoTypeaheadAsyncComponent
    },
    {
      title: 'Reactive forms',
      anchor: 'reactive-forms',
      name: 'inForm',
      outlet: DemoTypeaheadFormsComponent
    },
    {
      title: 'Grouping results',
      anchor: 'grouping-results',
      name: 'grouping',
      outlet: DemoTypeaheadGroupingComponent
    },
    {
      title: 'Dropup',
      anchor: 'dropup',
      name: 'dropup',
      outlet: DemoTypeaheadDropupComponent
    }
  ],
  apiSections: [
    {
      title: 'AccordionPanelComponent',
      anchor: 'AccordionPanelComponent'
    }
  ]
};
