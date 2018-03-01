import { DemoCarouseBasicComponent } from './demos/basic/basic';
import { DemoCarouselCaptionsComponent } from './demos/captions/captions';
import { DemoCarouselConfigComponent } from './demos/config/config';
import { DemoCarouselDynamicComponent } from './demos/dynamic/dynamic';
import { DemoCarouselNoPauseComponent } from './demos/no-pause/no-pause';
import { DemoCarouselCustomContentComponent } from './demos/custom-content/custom-content';
import { DemoCarouselIntervalComponent } from './demos/interval/interval';
import { DemoCarouselDisableIndicatorComponent } from './demos/disable-indicator/disable-indicator';
import { DemoCarouselDisableLoopingComponent } from './demos/disable-looping/disable-looping';
import { DemoCarouselSlideChangedEventComponent } from './demos/slide-changed-event/slide-changed-event';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import { NgApiDocComponent, NgApiDocConfigComponent } from '../../docs/api-docs';

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
        title: 'Basic',
        anchor: 'basic',
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        outlet: DemoCarouseBasicComponent
      },
      {
        title: 'Optional captions',
        anchor: 'captions',
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
        component: require('!!raw-loader?lang=typescript!./demos/config/config.ts'),
        html: require('!!raw-loader?lang=markup!./demos/config/config.html'),
        outlet: DemoCarouselConfigComponent
      },
      {
        title: 'Dynamic Slides',
        anchor: 'dynamic-slides',
        component: require('!!raw-loader?lang=typescript!./demos/dynamic/dynamic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/dynamic/dynamic.html'),
        outlet: DemoCarouselDynamicComponent
      },
      {
        title: 'Pause on hover',
        anchor: 'pause-on-hover',
        description: `<p>Click button to pause on hover.</p>`,
        component: require('!!raw-loader?lang=typescript!./demos/no-pause/no-pause.ts'),
        html: require('!!raw-loader?lang=markup!./demos/no-pause/no-pause.html'),
        outlet: DemoCarouselNoPauseComponent
      },
      {
        title: 'Custom content',
        anchor: 'custom-content',
        component: require('!!raw-loader?lang=typescript!./demos/custom-content/custom-content.ts'),
        html: require('!!raw-loader?lang=markup!./demos/custom-content/custom-content.html'),
        outlet: DemoCarouselCustomContentComponent
      },
      {
        title: 'Disable slide looping',
        anchor: 'disable-looping',
        component: require('!!raw-loader?lang=typescript!./demos/disable-looping/disable-looping.ts'),
        html: require('!!raw-loader?lang=markup!./demos/disable-looping/disable-looping.html'),
        outlet: DemoCarouselDisableLoopingComponent
      },
      {
        title: 'Disable indicator',
        anchor: 'disable-indicator',
        component: require('!!raw-loader?lang=typescript!./demos/disable-indicator/disable-indicator.ts'),
        html: require('!!raw-loader?lang=markup!./demos/disable-indicator/disable-indicator.html'),
        outlet: DemoCarouselDisableIndicatorComponent
      },
      {
        title: 'Interval',
        anchor: 'slides-interval',
        component: require('!!raw-loader?lang=typescript!./demos/interval/interval.ts'),
        html: require('!!raw-loader?lang=markup!./demos/interval/interval.html'),
        outlet: DemoCarouselIntervalComponent
      },
      {
        title: 'Slide changed event',
        anchor: 'slide-changed-event',
        component: require('!!raw-loader?lang=typescript!./demos/slide-changed-event/slide-changed-event.ts'),
        html: require('!!raw-loader?lang=markup!./demos/slide-changed-event/slide-changed-event.html'),
        outlet: DemoCarouselSlideChangedEventComponent
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
