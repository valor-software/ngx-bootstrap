import { DemoTypeaheadAdaptivePositionComponent } from './adaptive-position/adaptive-position';
import { DemoTypeaheadAsyncComponent } from './async/async';
import { DemoTypeaheadBasicComponent } from './basic/basic';
import { DemoTypeaheadConfigComponent } from './config/config';
import { DemoTypeaheadContainerComponent } from './container/container';
import { DemoTypeaheadDelayComponent } from './delay/delay';
import { DemoTypeaheadDropupComponent } from './dropup/dropup';
import { DemoTypeaheadFieldComponent } from './field/field';
import { DemoTypeaheadFormComponent } from './form/form';
import { DemoTypeaheadGroupingComponent } from './grouping/grouping';
import { DemoTypeaheadItemTemplateComponent } from './item-template/item-template';
import { DemoTypeaheadLatinizeComponent } from './latinize/latinize';
import { DemoTypeaheadMinLengthComponent } from './min-length/min-length';
import { DemoTypeaheadMinLengthComponent } from './min-length/min-length';
import { DemoTypeaheadNoResultComponent } from './no-result/no-result';
import { DemoTypeaheadOnBlurComponent } from './on-blur/on-blur';
import { DemoTypeaheadOnSelectComponent } from './on-select/on-select';
import { DemoTypeaheadPhraseDelimitersComponent } from './phrase-delimiters/phrase-delimiters';
import { DemoTypeaheadReactiveFormComponent } from './reactive-form/reactive-form';
import { DemoTypeaheadScrollableComponent } from './scrollable/scrollable';
import { DemotypeaheadSelectFirstItemComponent } from './selected-first-item/selected-first-item';
import { DemoTypeaheadShowOnBlurComponent } from './show-on-blur/show-on-blur';
import { DemoTypeaheadSingleWorldComponent } from './single-world/single-world';

export const DEMO_COMPONENTS = [
  DemoTypeaheadAdaptivePositionComponent,
  DemoTypeaheadAsyncComponent,
  DemoTypeaheadBasicComponent,
  DemoTypeaheadConfigComponent,
  DemoTypeaheadContainerComponent,
  DemoTypeaheadContainerComponent,
  DemoTypeaheadContainerComponent,
  DemoTypeaheadDelayComponent,
  DemoTypeaheadDropupComponent,
  DemoTypeaheadFieldComponent,
  DemoTypeaheadFormComponent,
  DemoTypeaheadFormComponent,
  DemoTypeaheadFormComponent,
  DemoTypeaheadGroupingComponent,
  DemoTypeaheadItemTemplateComponent,
  DemoTypeaheadLatinizeComponent,
  DemoTypeaheadLatinizeComponent,
  DemoTypeaheadLatinizeComponent,
  DemoTypeaheadMinLengthComponent,
  DemoTypeaheadMinLengthComponent,
  DemoTypeaheadNoResultComponent,
  DemoTypeaheadOnBlurComponent,
  DemoTypeaheadOnSelectComponent,
  DemoTypeaheadOnSelectComponent,
  DemoTypeaheadOnSelectComponent,
  DemoTypeaheadPhraseDelimitersComponent,
  DemoTypeaheadReactiveFormComponent,
  DemoTypeaheadScrollableComponent,
  DemotypeaheadSelectFirstItemComponent,
  DemoTypeaheadShowOnBlurComponent,
  DemoTypeaheadSingleWorldComponent
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
  },
  minLength: {
    component: require('!!raw-loader?lang=typescript!./min-length/min-length.ts'),
    html: require('!!raw-loader?lang=markup!./min-length/min-length.html')
  }
};
