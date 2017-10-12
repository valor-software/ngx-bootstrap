import { DemoDropdownBasicComponent } from './demos/basic/basic';
import { DemoDropdownBasicLinkComponent } from './demos/basic/basic-link';
import { DemoDropdownSplitComponent } from './demos/split/split';
import { DemoDropdownTriggersManualComponent } from './demos/triggers-manual/triggers-manual';
import { DemoDropdownDisabledComponent } from './demos/disabled-menu/disabled-menu';
import { DemoDropdownAlignmentComponent } from './demos/alignment/menu-alignment';
import { DemoNestedDropdownsComponent } from './demos/nested-dropdowns/nested-dropdowns';
import { DemoDropdownContainerComponent } from './demos/container/container';
import { DemoDropdownKeyboardComponent } from './demos/keyboard/keyboard';
import { DemoDropupComponent } from './demos/dropup/dropup';
import { DemoDropdownConfigComponent } from './demos/config/config';

export const dropdownExamples = [
  {
    title: 'Single button dropdowns',
    anchor: 'single-button',
    name: 'basic',
    description: `<p>Any single <code>.btn</code> can be turned into a dropdown toggle with some markup changes.
    Here’s how you can put them to work with either  <code> &lt;button&gt; </code> elements:</p>`,
    outlet: DemoDropdownBasicComponent
  },
  {
    name: 'link',
    description: `<p>And with <code> &lt;a&gt; </code> elements:</p>`,
    outlet: DemoDropdownBasicLinkComponent
  },
  {
    title: 'Split button dropdowns',
    anchor: 'split-button',
    name: 'splitBtn',
    description: `<p>Similarly, create split button dropdowns with virtually the same markup as single button dropdowns,
    but with the addition of <code>.dropdown-toggle-split</code> for proper spacing around the dropdown caret.</p>`,
    outlet: DemoDropdownSplitComponent
  },
  {
    title: 'Manual triggers',
    anchor: 'triggers-manual',
    name: 'triggersManual',
    outlet: DemoDropdownTriggersManualComponent
  },
  {
    title: 'Disabled menu',
    anchor: 'disabled-menu',
    name: 'disabledMenu',
    outlet: DemoDropdownDisabledComponent
  },
  {
    title: 'Menu alignment',
    anchor: 'menu-alignment',
    name: 'alignment',
    description: `<p>By default, a dropdown menu is automatically positioned 100% from the top and along the left side of its
    parent. Add class <code>.dropdown-menu-right</code> to a <code>dropdownMenu</code> to right align the dropdown
    menu.</p>`,
    outlet: DemoDropdownAlignmentComponent
  },
  {
    title: 'Nested dropdowns (experimental)',
    anchor: 'nested-dropdowns',
    name: 'nested',
    outlet: DemoNestedDropdownsComponent
  },
  {
    title: 'Append to body',
    anchor: 'container-body',
    name: 'container',
    outlet: DemoDropdownContainerComponent
  },
  /* not availavle in bs-dropdown version
  {
    title: 'Single button with keyboard nav',
    anchor: 'dropdown-keyboard',
    name: 'keyboard',
    outlet: DemoDropdownKeyboardComponent
  },*/
  {
    title: 'Dropup variation',
    anchor: 'dropup',
    name: 'dropup',
    description: `<p>Trigger dropdown menus above elements by adding <code>.dropup</code> to the parent element.</p>`,
    outlet: DemoDropupComponent
  },
  {
    title: 'Configuring defaults',
    anchor: 'config-defaults',
    name: 'config',
    description: `<p>It is possible to override default dropdown config partially or completely.</p>`,
    outlet: DemoDropdownConfigComponent
  }
];

export const dropdownApi = [
  {
    title: 'BsDropdownDirective',
    anchor: 'dropdown-directive'
  },
  {
    title: 'BsDropdownMenuDirective',
    anchor: 'dropdown-menu-directive'
  },
  {
    title: 'BsDropdownToggleDirective',
    anchor: 'dropdown-toggle-directive'
  },
  {
    title: 'BsDropdownConfig',
    anchor: 'dropdown-config'
  }
];
