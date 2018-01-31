import { DemoCarouseBasicComponent } from './demos/basic/basic';
import { DemoCarouselCaptionsComponent } from './demos/captions/captions';
import { DemoCarouselConfigComponent } from './demos/config/config';
import { DemoCarouselDynamicComponent } from './demos/dynamic/dynamic';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import {
  NgApiDocComponent,
  NgApiDocConfigComponent
} from '../../docs/api-docs';

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
    componentName: 'carousel',
    content: [
      {
        title: 'Basic',
        anchor: 'basic',
        demoName: 'basic',
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: DemoCarouseBasicComponent
      },
      {
        title: 'Optional captions',
        anchor: 'captions',
        demoName: 'captions',
        description: `<p>Add captions to your slides easily with the <code>.carousel-caption</code>
          element within any <code>&lt;slide></code>. Place just about any optional HTML within there
          and it will be automatically aligned and formatted.</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/captions/captions.ts'),
        html: require('!!raw-loader?lang=markup!./demos/captions/captions.html'),
        outlet: DemoCarouselCaptionsComponent
      },
      {
        title: 'Configuring defaults',
        anchor: 'config-defaults',
        demoName: 'config',
        component: require('!!raw-loader?lang=typescript!./demos/config/config.ts'),
        html: require('!!raw-loader?lang=markup!./demos/config/config.html'),
        outlet: DemoCarouselConfigComponent
      },
      {
        title: 'Dynamic Slides',
        anchor: 'dynamic-slides',
        demoName: 'dynamic',
        component: require('!!raw-loader?lang=typescript!./demos/dynamic/dynamic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/dynamic/dynamic.html'),
        outlet: DemoCarouselDynamicComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'CarouselComponent',
        anchor: 'carousel-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'SlideComponent',
        anchor: 'slide-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'CarouselConfig',
        anchor: 'carousel-config',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
