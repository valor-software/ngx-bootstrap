import { DemoTypeaheadBasicComponent } from './basic/basic';
import { DemoTypeaheadItemTemplateComponent } from './item-template/item-template';
import { DemoTypeaheadFieldComponent } from './field/field';
import { DemoTypeaheadAsyncComponent } from './async/async';
import { DemoTypeaheadReactiveFormComponent } from './reactive-form/reactive-form';
import { DemoTypeaheadGroupingComponent } from './grouping/grouping';
import { DemoTypeaheadDropupComponent } from './dropup/dropup';
import { DemoTypeaheadScrollableComponent } from './scrollable/scrollable';
import { DemoTypeaheadDelayComponent } from './delay/delay';
import { DemoTypeaheadLatinizeComponent } from './latinize/latinize';
import { DemoTypeaheadNoResultComponent } from './no-result/no-result';
import { DemoTypeaheadOnBlurComponent } from './on-blur/on-blur';
import { DemoTypeaheadContainerComponent } from './container/container';
import { DemoTypeaheadSingleWorldComponent } from './single-world/single-world';
import { DemoTypeaheadPhraseDelimitersComponent } from './phrase-delimiters/phrase-delimiters';
import { DemoTypeaheadFormComponent } from './form/form';
import { DemoTypeaheadOnSelectComponent } from './on-select/on-select';

export const DEMO_COMPONENTS = [
  DemoTypeaheadBasicComponent,
  DemoTypeaheadItemTemplateComponent,
  DemoTypeaheadFieldComponent,
  DemoTypeaheadAsyncComponent,
  DemoTypeaheadReactiveFormComponent,
  DemoTypeaheadGroupingComponent,
  DemoTypeaheadSingleWorldComponent,
  DemoTypeaheadPhraseDelimitersComponent,
  DemoTypeaheadDropupComponent,
  DemoTypeaheadScrollableComponent,
  DemoTypeaheadDelayComponent,
  DemoTypeaheadNoResultComponent,
  DemoTypeaheadOnBlurComponent,
  DemoTypeaheadLatinizeComponent,
  DemoTypeaheadContainerComponent,
  DemoTypeaheadFormComponent,
  DemoTypeaheadOnSelectComponent
];

export const DEMOS = {
  static: {
    component: require('!!raw-loader?lang=typescript!./basic/basic.ts'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html')
  },
  itemTemplate: {
    component: require('!!raw-loader?lang=typescript!./item-template/item-template.ts'),
    html: require('!!raw-loader?lang=markup!./item-template/item-template.html')
  },
  field: {
    component: require('!!raw-loader?lang=typescript!./field/field.ts'),
    html: require('!!raw-loader?lang=markup!./field/field.html')
  },
  async: {
    component: require('!!raw-loader?lang=typescript!./async/async.ts'),
    html: require('!!raw-loader?lang=markup!./async/async.html')
  },
  delay: {
    component: require('!!raw-loader?lang=typescript!./delay/delay.ts'),
    html: require('!!raw-loader?lang=markup!./delay/delay.html')
  },
  latinize: {
    component: require('!!raw-loader?lang=typescript!./latinize/latinize.ts'),
    html: require('!!raw-loader?lang=markup!./latinize/latinize.html')
  },
  form: {
    component: require('!!raw-loader?lang=typescript!./form/form.ts'),
    html: require('!!raw-loader?lang=markup!./form/form.html')
  },
  reactiveForm: {
    component: require('!!raw-loader?lang=typescript!./reactive-form/reactive-form.ts'),
    html: require('!!raw-loader?lang=markup!./reactive-form/reactive-form.html')
  },
  grouping: {
    component: require('!!raw-loader?lang=typescript!./grouping/grouping.ts'),
    html: require('!!raw-loader?lang=markup!./grouping/grouping.html')
  },
  dropup: {
    component: require('!!raw-loader?lang=typescript!./dropup/dropup.ts'),
    html: require('!!raw-loader?lang=markup!./dropup/dropup.html')
  },
  noResult: {
    component: require('!!raw-loader?lang=typescript!./no-result/no-result.ts'),
    html: require('!!raw-loader?lang=markup!./no-result/no-result.html')
  },
  onBlur: {
    component: require('!!raw-loader?lang=typescript!./on-blur/on-blur.ts'),
    html: require('!!raw-loader?lang=markup!./on-blur/on-blur.html')
  },
  container: {
    component: require('!!raw-loader?lang=typescript!./container/container.ts'),
    html: require('!!raw-loader?lang=markup!./container/container.html')
  },
  scrollable: {
    component: require('!!raw-loader?lang=typescript!./scrollable/scrollable.ts'),
    html: require('!!raw-loader?lang=markup!./scrollable/scrollable.html')
  },
  onSelect: {
    component: require('!!raw-loader?lang=typescript!./on-select/on-select.ts'),
    html: require('!!raw-loader?lang=markup!./on-select/on-select.html')
  }
};
