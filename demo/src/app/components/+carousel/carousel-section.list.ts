import { DemoCarouseBasicComponent } from './demos/basic/basic';
import { DemoCarouselCaptionsComponent } from './demos/captions/captions';
import { DemoCarouselConfigComponent } from './demos/config/config';
import { DemoCarouselDynamicComponent } from './demos/dynamic/dynamic';

export const demoComponentContent = {
  examples: [
    {
      title: 'Basic',
      anchor: 'basic',
      name: 'basic',
      outlet: DemoCarouseBasicComponent
    },
    {
      title: 'Optional captions',
      anchor: 'captions',
      name: 'captions',
      description: `<p>Add captions to your slides easily with the <code>.carousel-caption</code> element within
    any <code>&lt;slide></code>. Place just about any optional HTML within there and it will be
    automatically aligned and formatted.</p>`,
      outlet: DemoCarouselDynamicComponent
    },
    {
      title: 'Configuring defaults',
      anchor: 'config-defaults',
      name: 'config',
      outlet: DemoCarouselCaptionsComponent
    },
    {
      title: 'Dynamic Slides',
      anchor: 'dynamic-slides',
      name: 'dynamic',
      outlet: DemoCarouselConfigComponent
    }
  ],
  apiSections: [
    {
      title: 'CarouselComponent',
      anchor: 'carousel-component'
    },
    {
      title: 'SlideComponent',
      anchor: 'slide-component'
    },
    {
      title: 'CarouselConfig',
      anchor: 'carousel-config',
      component: 'config'
    }
  ]
};
