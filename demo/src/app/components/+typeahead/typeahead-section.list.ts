import { DemoTypeaheadStaticComponent } from './demos/static/static';
import { DemoTypeaheadItemTemplateComponent } from './demos/item-template/item-template';
import { DemoTypeaheadFieldComponent } from './demos/field/field';
import { DemoTypeaheadAsyncComponent } from './demos/async/async';
import { DemoTypeaheadFormsComponent } from './demos/in-form/in-form';
import { DemoTypeaheadGroupingComponent } from './demos/grouping/grouping';
import { DemoTypeaheadDropupComponent } from './demos/dropup/dropup';
import { DemoTypeaheadScrollableComponent } from './demos/scrollable/scrollable';
import { DemoTypeaheadContainerComponent } from './demos/container/container';
import { DemoTypeaheadSingleWorldComponent } from './demos/single-world/single-world';
import { DemoTypeaheadPhraseDelimitersComponent } from './demos/phrase-delimiters/phrase-delimiters';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import { NgApiDocComponent } from '../../docs/api-docs';

export const demoComponentContent: ContentSection[] = [
  {
    name: 'Usage',
    anchor: 'usage',
    outlet: DemoTopSectionComponent,
    content: {
      doc: require('!!raw-loader?lang=typescript!./docs/usage.md')
    }
  },
  {
    name: 'Examples',
    anchor: 'examples',
    outlet: ExamplesComponent,
    content: [
      {
        title: 'Static array',
        anchor: 'static-array',
        component: require('!!raw-loader?lang=typescript!./demos/static/static.ts'),
        html: require('!!raw-loader?lang=markup!./demos/static/static.html'),
        outlet: DemoTypeaheadStaticComponent
      },
      {
        title: 'Item template',
        anchor: 'item-template',
        component: require('!!raw-loader?lang=typescript!./demos/item-template/item-template.ts'),
        html: require('!!raw-loader?lang=markup!./demos/item-template/item-template.html'),
        outlet: DemoTypeaheadItemTemplateComponent
      },
      {
        title: 'Option field',
        anchor: 'option-field',
        component: require('!!raw-loader?lang=typescript!./demos/field/field.ts'),
        html: require('!!raw-loader?lang=markup!./demos/field/field.html'),
        outlet: DemoTypeaheadFieldComponent
      },
      {
        title: 'Async data',
        anchor: 'async-data',
        component: require('!!raw-loader?lang=typescript!./demos/async/async.ts'),
        html: require('!!raw-loader?lang=markup!./demos/async/async.html'),
        outlet: DemoTypeaheadAsyncComponent
      },
      {
        title: 'Reactive forms',
        anchor: 'reactive-forms',
        component: require('!!raw-loader?lang=typescript!./demos/in-form/in-form.ts'),
        html: require('!!raw-loader?lang=markup!./demos/in-form/in-form.html'),
        outlet: DemoTypeaheadFormsComponent
      },
      {
        title: 'Grouping results',
        anchor: 'grouping-results',
        component: require('!!raw-loader?lang=typescript!./demos/grouping/grouping.ts'),
        html: require('!!raw-loader?lang=markup!./demos/grouping/grouping.html'),
        outlet: DemoTypeaheadGroupingComponent
      },
      {
        title: 'Ignore spaces and order',
        anchor: 'single-world',
        component: require('!!raw-loader?lang=typescript!./demos/single-world/single-world.ts'),
        html: require('!!raw-loader?lang=markup!./demos/single-world/single-world.html'),
        description: `If <code>typeaheadSingleWords=true</code> ignores spaces and seeking for matches with occurrences of entered words.
          For example: <pre>ari zona -> Arizona</pre>`,
        outlet: DemoTypeaheadSingleWorldComponent
      },
      {
        title: 'Phrase delimiters',
        anchor: 'phrase-delimiters',
        component: require('!!raw-loader?lang=typescript!./demos/phrase-delimiters/phrase-delimiters.ts'),
        html: require('!!raw-loader?lang=markup!./demos/phrase-delimiters/phrase-delimiters.html'),
        description: `Sets the word delimiter to match exact phrase. For example that are <code>&</code> and <code>,</code>`,
        outlet: DemoTypeaheadPhraseDelimitersComponent
      },
      {
        title: 'Dropup',
        anchor: 'dropup',
        component: require('!!raw-loader?lang=typescript!./demos/dropup/dropup.ts'),
        html: require('!!raw-loader?lang=markup!./demos/dropup/dropup.html'),
        outlet: DemoTypeaheadDropupComponent
      },
      {
        title: 'Append to body',
        anchor: 'container',
        description: `
        <p>A selector specifying the element the typeahead should be appended to. Currently only supports "body".</p>
        `,
        component: require('!!raw-loader?lang=typescript!./demos/container/container.ts'),
        html: require('!!raw-loader?lang=markup!./demos/container/container.html'),
        outlet: DemoTypeaheadContainerComponent
      },
      {
        title: 'Scrollable',
        anchor: 'scrollable',
        component: require('!!raw-loader?lang=typescript!./demos/scrollable/scrollable.ts'),
        html: require('!!raw-loader?lang=markup!./demos/scrollable/scrollable.html'),
        outlet: DemoTypeaheadScrollableComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'TypeaheadDirective',
        anchor: 'TypeaheadDirective',
        outlet: NgApiDocComponent
      }
    ]
  }
];
