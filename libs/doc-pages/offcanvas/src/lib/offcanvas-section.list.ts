import { ContentSection } from '@ngx-bootstrap-doc/docs';
import { ExamplesComponent } from '@ngx-bootstrap-doc/docs';
import { ApiSectionsComponent } from '@ngx-bootstrap-doc/docs';

import { BasicComponent } from "./demos/basic/basic.component";
import { HeaderTitleComponent } from "./demos/header-title/header-title.component";
import { DifferentPositionComponent } from "./demos/different-position/differrent-position.component";
import { BackdropComponent } from "./demos/backdrop/backdrop.component";
import { TriggerEventComponent } from "./demos/trigger-event/trigger-event.component";
import { BackdropScrollingComponent } from "./demos/backdropScrolling/backdropScrolling.component";
import { WaysToUseComponent } from "./demos/ways-to-use/ways-to-use.component";
import {
  NgApiDocComponent,
  NgApiDocConfigComponent
} from '@ngx-bootstrap-doc/docs';

export const demoComponentContent: ContentSection[] = [
  {
    name: 'Overview',
    anchor: 'overview',
    tabName: 'overview',
    outlet: ExamplesComponent,
    content: [
      {
        title: 'Basic',
        anchor: 'basic-section',
        description: `<p>Offcanvas element with basic configuration. Backdrop is switched on, header title is empty and backdrop scrolling is available.</p>`,
        component: require('!!raw-loader!./demos/basic/basic.component.ts'),
        html: require('!!raw-loader!./demos/basic/basic.component.html'),
        outlet: BasicComponent
      },
      {
        title: 'Header title',
        anchor: 'header-title',
        description: `<p>It is available to set a header title with configuration object. You should use for it <code>headerTitle</code> property in configuration object.</p>`,
        component: require('!!raw-loader!./demos/header-title/header-title.component.ts'),
        html: require('!!raw-loader!./demos/header-title/header-title.component.html'),
        outlet: HeaderTitleComponent
      },
      {
        title: 'Different position',
        anchor: 'different-position',
        description: `<p><code>placement</code> property allows setting four placement positions: top, left, right, bottom.</p>`,
        component: require('!!raw-loader!./demos/different-position/differrent-position.component.ts'),
        html: require('!!raw-loader!./demos/different-position/different-position.component.html'),
        outlet: DifferentPositionComponent
      },
      {
        title: 'Backdrop',
        anchor: 'backdrop',
        description: `<p>Backdrop can be switched on/off</p>`,
        component: require('!!raw-loader!./demos/backdrop/backdrop.component.ts'),
        html: require('!!raw-loader!./demos/backdrop/backdrop.component.html'),
        outlet: BackdropComponent
      },
      {
        title: 'Events',
        anchor: 'events',
        description: `<p>Module emits event <code>isOpened</code>. It is triggered when element opens/closes</p>`,
        component: require('!!raw-loader!./demos/trigger-event/trigger-event.component.ts'),
        html: require('!!raw-loader!./demos/trigger-event/trigger-event.component.html'),
        outlet: TriggerEventComponent
      },
      {
        title: 'Enable backdrop scrolling',
        anchor: 'backdropScrolling',
        description: `<p>Backdrop scrolling can be switched on/off when offcanvas element is opened</p>`,
        component: require('!!raw-loader!./demos/backdropScrolling/backdropScrolling.component.ts'),
        html: require('!!raw-loader!./demos/backdropScrolling/backdropScrolling.component.html'),
        outlet: BackdropScrollingComponent
      },
      {
        title: 'Ways to use',
        anchor: 'use-ways',
        description: `<p>Offcanva element is useable from both <code>.ts</code> and <code>.html</code> files</p>`,
        component: require('!!raw-loader!./demos/ways-to-use/ways-to-use.component.ts'),
        html: require('!!raw-loader!./demos/ways-to-use/ways-to-use.component.html'),
        outlet: WaysToUseComponent
      }
    ]
  },
  {
    name: 'Installation',
    anchor: 'api-reference',
    tabName: 'api',
    outlet: ApiSectionsComponent,
    usage: require('!!raw-loader!./docs/usage.md'),
    importInfo: '<span class="pln">ng add ngx</span><span class="pun">-</span><span class="pln">bootstrap </span> --component <span class="pln">offcanvas</span>',
    content: [
      {
        title: 'OffcanvasBackdropComponent',
        anchor: 'OffcanvasBackdropComponent',
        outlet: NgApiDocComponent
      },
      {
        title: 'OffcanvasContainerComponent',
        anchor: 'OffcanvasContainerComponent',
        outlet: NgApiDocComponent
      },
      {
        title: 'OffcanvasConfig',
        anchor: 'OffcanvasConfig',
        outlet: NgApiDocConfigComponent
      }
    ]
  },
  {
    name: 'Examples',
    anchor: 'examples',
    tabName: 'examples',
    outlet: ExamplesComponent,
    content: [
      {
        title: 'Basic',
        anchor: 'basic-section',
        outlet: BasicComponent
      },
      {
        title: 'Header title',
        anchor: 'header-title',
        outlet: HeaderTitleComponent
      },
      {
        title: 'Different position',
        anchor: 'different-position',
        outlet: DifferentPositionComponent
      },
      {
        title: 'Backdrop',
        anchor: 'backdrop',
        outlet: BackdropComponent
      },
      {
        title: 'Events',
        anchor: 'events',
        outlet: TriggerEventComponent
      },
      {
        title: 'Enable backdrop scrolling',
        anchor: 'backdropScrolling',
        outlet: BackdropScrollingComponent
      },
      {
        title: 'Ways to use',
        anchor: 'use-ways',
        outlet: WaysToUseComponent
      }
    ]
  }
];
