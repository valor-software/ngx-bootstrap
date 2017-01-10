import { DropdownDemoComponent } from './dropdown-demo.component';
import { DemoDropdownBasicComponent } from './basic/basic';
import { DemoDropdownSplitComponent } from './split/split';
import { DemoDropdownContainerComponent } from './container/container';
import { DemoDropdownBasicLinkComponent } from './basic/basic-link';
import { DemoDropdownKeyboardComponent } from './keyboard/keyboard';
import { DemoDropdownConfigComponent } from './config/config';
import { DemoDropupComponent } from './dropup/dropup';
import { DemoDropdownTriggersManualComponent } from './triggers-manual/triggers-manual';
import { DemoDropdownDisabledComponent } from './disabled-menu/disabled-menu';
import { DemoDropdownAlignmentComponent } from './alignment/menu-alignment';

export const DEMO_COMPONENTS = [
  DropdownDemoComponent, DemoDropdownBasicComponent, DemoDropdownBasicLinkComponent, DemoDropdownSplitComponent,
  DemoDropdownContainerComponent, DemoDropdownKeyboardComponent, DemoDropdownConfigComponent, DemoDropupComponent,
  DemoDropdownTriggersManualComponent, DemoDropdownDisabledComponent, DemoDropdownAlignmentComponent
];

export const DEMOS = {

  basic: {
    component: require('!!raw?lang=typescript!./basic/basic.ts'),
    html: require('!!raw?lang=markup!./basic/basic.html')
  },
  link: {
    component: require('!!raw?lang=typescript!./basic/basic-link.ts'),
    html: require('!!raw?lang=markup!./basic/basic-link.html')
  },
  splitBtn: {
    component: require('!!raw?lang=typescript!./split/split.ts'),
    html: require('!!raw?lang=markup!./split/split.html')
  },
  container: {
    component: require('!!raw?lang=typescript!./container/container.ts'),
    html: require('!!raw?lang=markup!./container/container.html')
  },
  triggersManual: {
    component: require('!!raw?lang=typescript!./triggers-manual/triggers-manual.ts'),
    html: require('!!raw?lang=markup!./triggers-manual/triggers-manual.html')
  },
  disabledMenu: {
    component: require('!!raw?lang=typescript!./disabled-menu/disabled-menu.ts'),
    html: require('!!raw?lang=markup!./disabled-menu/disabled-menu.html')
  },
  alignment: {
    component: require('!!raw?lang=typescript!./alignment/menu-alignment.ts'),
    html: require('!!raw?lang=markup!./alignment/menu-alignment.html')
  },
  keyboard: {
    component: require('!!raw?lang=typescript!./keyboard/keyboard.ts'),
    html: require('!!raw?lang=markup!./keyboard/keyboard.html')
  },
  dropup: {
    component: require('!!raw?lang=typescript!./dropup/dropup.ts'),
    html: require('!!raw?lang=markup!./dropup/dropup.html')
  },
  config: {
    component: require('!!raw?lang=typescript!./config/config.ts'),
    html: require('!!raw?lang=markup!./config/config.html')
  }

};
