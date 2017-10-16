import { DemoTooltipBasicComponent } from './demos/basic/basic';
import { DemoTooltipFourDirectionsComponent } from './demos/four-directions/four-directions';
import { DemoTooltipDismissComponent } from './demos/dismiss/dismiss';
import { DemoTooltipDynamicComponent } from './demos/dynamic/dynamic';
import { DemoTooltipDynamicHtmlComponent } from './demos/dynamic-html/dynamic-html';
import { DemoTooltipContainerComponent } from './demos/container/container';
import { DemoTooltipConfigComponent } from './demos/config/config';
import { DemoTooltipTriggersCustomComponent } from './demos/triggers-custom/triggers-custom';
import { DemoTooltipTriggersManualComponent } from './demos/triggers-manual/triggers-manual';
import { DemoTooltipStylingLocalComponent } from './demos/styling-local/styling-local';
import { DemoTooltipClassComponent } from './demos/class/class';
import { DemoTooltipStylingGlobalComponent } from './demos/styling-global/styling-global';

export const demoComponentContent = {
  examples: [
    {
      title: 'Basic',
      anchor: 'basic',
      name: 'basic',
      outlet: DemoTooltipBasicComponent
    },
    {
      title: 'Four directions',
      anchor: 'four-directions',
      name: 'forDirections',
      description: `<p>Four positioning options are available: top, right, bottom, and left aligned.
    Besides that, auto option may be used to detect a position that fits the component on screen.</p>`,
      outlet: DemoTooltipFourDirectionsComponent
    },
    {
      title: 'Dismiss on next click',
      anchor: 'dismiss',
      name: 'dismiss',
      description: `<p>Use the <code>focus</code> trigger to dismiss tooltips on the next click that
      the user makes.</p>`,
      outlet: DemoTooltipDismissComponent
    },
    {
      title: 'Dynamic Content',
      anchor: 'dynamic-content',
      name: 'dynamic',
      description: `<p>tooltip content can contain any html template. Just create <code>&lt;template #myId></code> with
    any html allowed by Angular, and provide template ref (<code>#myId</code>) as tooltip content.</p>`,
      outlet: DemoTooltipDynamicComponent
    },
    {
      title: 'Dynamic Html',
      anchor: 'dynamic-html',
      name: 'dynamicHtml',
      description: `<p>By using small trick you can display any dynamic html, which you got from ajax request
    for example.</p>`,
      outlet: DemoTooltipDynamicHtmlComponent
    },
    {
      title: 'Append to body',
      anchor: '',
      name: 'container',
      description: ``,
      outlet: DemoTooltipContainerComponent
    },
    {
      title: 'Configuring defaults',
      anchor: 'config-defaults',
      name: 'config',
      description: `<p>When you have some styles on a parent element that interfere with a tooltip, you’ll want to
    specify a <code>container="body"</code> so that the tooltip’s HTML will be appended to body. This will help to
    avoid rendering problems in more complex components (like our input groups, button groups, etc) or inside
    elements with <code>overflow: hidden</code></p>`,
      outlet: DemoTooltipConfigComponent
    },
    {
      title: 'Custom triggers',
      anchor: 'triggers-custom',
      name: 'triggersCustom',
      outlet: DemoTooltipTriggersCustomComponent
    },
    {
      title: 'Manual triggering',
      anchor: 'triggers-manual',
      name: 'triggersManual',
      outlet: DemoTooltipTriggersManualComponent
    },
    {
      title: 'Component level styling',
      anchor: 'styling-local',
      name: 'stylingComponent',
      outlet: DemoTooltipStylingLocalComponent
    },
    /*{
      title: 'Global styling',
      anchor: 'styling-global',
      name: '',
      outlet: DemoTooltipStylingGlobalComponent
    },*/
    {
      title: 'Custom class',
      anchor: 'custom-class',
      name: 'customClass',
      outlet: DemoTooltipClassComponent
    }
  ],
  apiSections: [
    {
      title: 'TooltipDirective',
      anchor: 'tooltip-directive'
    },
    {
      title: 'TooltipConfig',
      anchor: 'tooltip-config',
      component: 'config'
    }
  ]
};
