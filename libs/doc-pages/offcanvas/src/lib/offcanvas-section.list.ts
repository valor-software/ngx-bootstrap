import { ContentSection } from '@ngx-bootstrap-doc/docs';
import { ExamplesComponent } from '@ngx-bootstrap-doc/docs';
import { ApiSectionsComponent } from '@ngx-bootstrap-doc/docs';

import { BasicComponent } from "./demos/basic/basic.component";
import { HeaderTitleComponent } from "./demos/header-title/header-title.component";
import { DifferentPositionComponent } from "./demos/different-position/differrent-position.component";
import { BackdropComponent } from "./demos/backdrop/backdrop.component";
import { TriggerEventComponent } from "./demos/trigger-event/trigger-event.component";


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
        description: `<p>TEXT TEXT TEXT</p>`,
        component: require('!!raw-loader!./demos/basic/basic.component.ts'),
        html: require('!!raw-loader!./demos/basic/basic.component.html'),
        outlet: BasicComponent
      },
      {
        title: 'Header title',
        anchor: 'header-title',
        description: `<p>TEXT TEXT TEXT</p>`,
        component: require('!!raw-loader!./demos/header-title/header-title.component.ts'),
        html: require('!!raw-loader!./demos/header-title/header-title.component.html'),
        outlet: HeaderTitleComponent
      },
      {
        title: 'Different position',
        anchor: 'different-position',
        description: `<p>TEXT TEXT TEXT</p>`,
        component: require('!!raw-loader!./demos/different-position/differrent-position.component.ts'),
        html: require('!!raw-loader!./demos/different-position/different-position.component.html'),
        outlet: DifferentPositionComponent
      },
      {
        title: 'Backdrop',
        anchor: 'backdrop',
        description: `<p>TEXT TEXT TEXT</p>`,
        component: require('!!raw-loader!./demos/backdrop/backdrop.component.ts'),
        html: require('!!raw-loader!./demos/backdrop/backdrop.component.html'),
        outlet: BackdropComponent
      },
      {
        title: 'Events',
        anchor: 'events',
        description: `<p>TEXT TEXT TEXT</p>`,
        component: require('!!raw-loader!./demos/trigger-event/trigger-event.component.ts'),
        html: require('!!raw-loader!./demos/trigger-event/trigger-event.component.html'),
        outlet: TriggerEventComponent
      },
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
      // {
      //   title: 'ModalDirective',
      //   anchor: 'modal-directive',
      //   outlet: NgApiDocComponent
      // },

    ]
  },
  {
    name: 'Examples',
    anchor: 'examples',
    tabName: 'examples',
    outlet: ExamplesComponent,
    content: [
      // {
      //   title: 'Template',
      //   anchor: 'service-template-ex',
      //   outlet: DemoModalServiceStaticComponent
      // },

    ]
  }
];
