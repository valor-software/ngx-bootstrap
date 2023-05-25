import { ContentSection } from '~/models/content-section.model';
import BasicCode from '../../../components/demos/tabs/basic/basic.html?raw';
import DisabledTabs from '../../../components/demos/tabs/disabled/disabled.html?raw';
import DynamicTabs from '../../../components/demos/tabs/dynamic/dynamic.html?raw';
import ManualSelection from '../../../components/demos/tabs/manual-selection/manual-selection.html?raw';
import PillsComponent from '../../../components/demos/tabs/pills/pills.html?raw';
import VerticalPillsComponent from '../../../components/demos/tabs/vertical-pills/vertical-pills.html?raw';
import JustifiedTabs from '../../../components/demos/tabs/justified/justified.html?raw';
import CustomClassTabs from '../../../components/demos/tabs/custom-class/custom-class.html?raw';
import SelectEventTabs from '../../../components/demos/tabs/select-event/select-event.html?raw';
import CustomTemplateTabs from '../../../components/demos/tabs/custom-template/custom-template.html?raw';

export const demoComponentContent: ContentSection[] = [
  {
    name: 'Overview',
    anchor: 'overview',
    tabName: 'overview',
    content: [
      {
        title: 'Basic',
        anchor: 'basic',
        component: BasicCode,
        html: '../../../components/demos/tabs/basic/basic',
      },
      {
        title: 'Manual selection',
        anchor: 'tabs-manual-select',
        component: ManualSelection,
        html: '../../../components/demos/tabs/manual-selection/manual-selection',
      },
      {
        title: 'Disabled tabs',
        anchor: 'disabled',
        component: DisabledTabs,
        html: '../../../components/demos/tabs/basic/basic'
      },
      {
        title: 'Dynamic tabs',
        anchor: 'tabs-dynamic',
        component: DynamicTabs,
        html: '../../../components/demos/tabs/dynamic/dynamic',
      },
      {
        title: 'Pills',
        anchor: 'tabs-Pills',
        component: PillsComponent,
        html: '../../../components/demos/tabs/pills/pills'
      },
      {
        title: 'Vertical Pills',
        anchor: 'tabs-vertical-pills',
        component: VerticalPillsComponent,
        html: '../../../components/demos/tabs/vertical-pills/vertical-pills'
      },
      {
        title: 'Justified',
        anchor: 'tabs-justified',
        component: JustifiedTabs,
        html: '../../../components/demos/tabs/justified/justified',
      },
      {
        title: 'Custom class',
        anchor: 'tabs-custom-class',
        component: CustomClassTabs,
        html: '../../../components/demos/tabs/custom-class/custom-class',
      },
      {
        title: 'Select event',
        anchor: 'select-event',
        component: SelectEventTabs,
        html: '../../../components/demos/tabs/select-event/select-event',
        description: '<p>You can subscribe to tab\'s <code>select</code> event</p>',
      },
      {
        title: 'Custom template',
        anchor: 'tabs-custom-template',
        component: CustomTemplateTabs,
        html: '../../../components/demos/tabs/custom-template/custom-template.html',
      },
  //     {
  //       title: 'Dynamic content rendering',
  //       anchor: 'dynamic-content-rendering',
  //       component: require('!!raw-loader!./demos/dynamic-content-rendering/dynamic-content-rendering'),
  //       html: require('!!raw-loader!./demos/dynamic-content-rendering/dynamic-content-rendering.html'),
  //       outlet: DynamicContentRenderingComponent
  //     },
  //     {
  //       title: 'Accessibility',
  //       anchor: 'accessibility',
  //       outlet: DemoAccessibilityComponent
  //     },
  //     {
  //       title: 'Disable key navigations',
  //       anchor: 'disable-key-navigations',
  //       component: require('!!raw-loader!./demos/disabled-key-navigations/disabled-key-navigations'),
  //       html: require('!!raw-loader!./demos/disabled-key-navigations/disabled-key-navigations.html'),
  //       outlet: DemoDisabledKeyNavigationsComponent
  //     }
    ]
  },
  // {
  //   name: 'Installation',
  //   anchor: 'api-reference',
  //   tabName: 'api',
  //   outlet: ApiSectionsComponent,
  //   usage: require('!!raw-loader!./docs/usage.md'),
  //   importInfo: '<span class="pln">ng add ngx</span><span class="pun">-</span><span class="pln">bootstrap </span> --component <span class="pln">tabs</span>',
  //   content: [
  //     {
  //       title: 'TabsetComponent',
  //       anchor: 'tabset-component',
  //       outlet: NgApiDocComponent
  //     },
  //     {
  //       title: 'TabDirective',
  //       anchor: 'tab-directive',
  //       outlet: NgApiDocComponent
  //     },
  //     {
  //       title: 'TabHeadingDirective',
  //       anchor: 'tab-heading-directive',
  //       outlet: NgApiDocComponent
  //     },
  //     {
  //       title: 'TabsetConfig',
  //       anchor: 'tabset-config',
  //       outlet: NgApiDocConfigComponent
  //     }
  //   ]
  // },
  // {
  //   name: 'Examples',
  //   anchor: 'examples',
  //   tabName: 'examples',
  //   outlet: ExamplesComponent,
  //   content: [
  //     {
  //       title: 'Basic',
  //       anchor: 'basic-ex',
  //       outlet: DemoTabsBasicComponent
  //     },
  //     {
  //       title: 'Manual selection',
  //       anchor: 'tabs-manual-select-ex',
  //       outlet: DemoTabsManualSelectionComponent
  //     },
  //     {
  //       title: 'Disabled tabs',
  //       anchor: 'disabled-ex',
  //       outlet: DemoTabsDisabledComponent
  //     },
  //     {
  //       title: 'Dynamic tabs',
  //       anchor: 'tabs-dynamic-ex',
  //       outlet: DemoTabsDynamicComponent
  //     },
  //     {
  //       title: 'Pills',
  //       anchor: 'tabs-Pills-ex',
  //       outlet: DemoTabsPillsComponent
  //     },
  //     {
  //       title: 'Vertical Pills',
  //       anchor: 'tabs-vertical-pills-ex',
  //       outlet: DemoTabsVerticalPillsComponent
  //     },
  //     {
  //       title: 'Justified',
  //       anchor: 'tabs-justified-ex',
  //       outlet: DemoTabsJustifiedComponent
  //     },
  //     {
  //       title: 'Custom class',
  //       anchor: 'tabs-custom-class-ex',
  //       outlet: DemoTabsCustomClassComponent
  //     },
  //     {
  //       title: 'Select event',
  //       anchor: 'select-event-ex',
  //       outlet: DemoTabsSelectEventComponent
  //     },
  //     {
  //       title: 'Configuring defaults',
  //       anchor: 'tabs-config-defaults-ex',
  //       outlet: DemoTabsConfigComponent
  //     },
  //     {
  //       title: 'Custom template',
  //       anchor: 'tabs-custom-template-ex',
  //       outlet: DemoTabsCustomComponent
  //     },
  //     {
  //       title: 'Dynamic content rendering',
  //       anchor: 'dynamic-content-rendering-ex',
  //       outlet: DynamicContentRenderingComponent
  //     },
  //     {
  //       title: 'Accessibility',
  //       anchor: 'accessibility-ex',
  //       outlet: DemoAccessibilityComponent
  //     },
  //     {
  //       title: 'Disable key navigations',
  //       anchor: 'disable-key-navigations-ex',
  //       outlet: DemoDisabledKeyNavigationsComponent
  //     }
  //   ]
  // }
];
