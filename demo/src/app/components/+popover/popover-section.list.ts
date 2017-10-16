import { DemoPopoverBasicComponent } from './demos/basic/basic';
import { DemoPopoverFourDirectionsComponent } from './demos/four-directions/four-directions';
import { DemoPopoverDismissComponent } from './demos/dismiss/dismiss';
import { DemoPopoverDynamicComponent } from './demos/dynamic/dynamic';
import { DemoPopoverDynamicHtmlComponent } from './demos/dynamic-html/dynamic-html';
import { DemoPopoverContainerComponent } from './demos/container/container';
import { DemoPopoverConfigComponent } from './demos/config/config';
import { DemoPopoverOutsideClickComponent } from './demos/outside-click/outside-click';
import { DemoPopoverTriggersCustomComponent } from './demos/triggers-custom/triggers-custom';
import { DemoPopoverTriggersManualComponent } from './demos/triggers-manual/triggers-manual';
import { DemoPopoverStylingLocalComponent } from './demos/styling-local/styling-local';
import { DemoPopoverClassComponent } from './demos/class/class';
import { DemoPopoverStylingGlobalComponent } from './demos/styling-global/styling-global';

export const demoComponentContent = {
  examples: [
    {
      title: 'Basic',
      anchor: 'basic',
      name: 'basic',
      outlet: DemoPopoverBasicComponent
    },
    {
      title: 'Four directions',
      anchor: 'four-directions',
      name: 'forDirections',
      description: `<p>Four positioning options are available: top, right, bottom, and left aligned.
    Besides that, auto option may be used to detect a position that fits the component on screen.</p>`,
      outlet: DemoPopoverFourDirectionsComponent
    },
    {
      title: 'Dismiss on next click',
      anchor: 'popover-dismiss',
      name: 'dismiss',
      description: `<p>Use the <code>focus</code> trigger to dismiss popovers on the next click that the
      user makes.</p>`,
      outlet: DemoPopoverDismissComponent
    },
    {
      title: 'Dynamic Content',
      anchor: 'dynamic-content',
      name: 'dynamic',
      description: `<p>Popover content can contain any html template. Just create <code>&lt;template #myId></code> with
    any html allowed by Angular, and provide template ref (<code>#myId</code>) as popover content.</p>`,
      outlet: DemoPopoverDynamicComponent
    },
    {
      title: 'Dynamic Html',
      anchor: 'dynamic-html',
      name: 'dynamicHtml',
      description: `<p>By using small trick you can display any dynamic html, which you got from ajax request for
    example.</p>`,
      outlet: DemoPopoverDynamicHtmlComponent
    },
    {
      title: 'Append to body',
      anchor: 'container-body',
      name: 'container',
      description: `<p>When you have some styles on a parent element that interfere with a popover, you’ll want to
    specify a <code>container="body"</code> so that the popover’s HTML will be appended to body.
    This will help to avoid rendering problems in more complex components (like our input groups, button groups, etc)
    or inside elements with <code>overflow: hidden</code></p>`,
      outlet: DemoPopoverContainerComponent
    },
    {
      title: 'Configuring defaults',
      anchor: 'config-defaults',
      name: 'config',
      outlet: DemoPopoverConfigComponent
    },
    {
      title: 'Outside click',
      anchor: 'outside-click',
      name: 'outsideClick',
      outlet: DemoPopoverOutsideClickComponent
    },
    {
      title: 'Custom triggers',
      anchor: 'triggers-custom',
      name: 'triggersCustom',
      outlet: DemoPopoverTriggersCustomComponent
    },
    {
      title: 'Manual triggering',
      anchor: 'triggers-manual',
      name: 'triggersManual',
      outlet: DemoPopoverTriggersManualComponent
    },
    {
      title: 'Component level styling',
      anchor: 'styling-local',
      name: 'stylingComponent',
      outlet: DemoPopoverStylingLocalComponent
    },
    {
      title: 'Custom class',
      anchor: 'popover-custom-class',
      name: 'customClass',
      outlet: DemoPopoverClassComponent
    }/*,
  {
    title: 'Global styling',
    anchor: 'styling-global',
    name: 'stylingGlobal',
    outlet: DemoPopoverStylingGlobalComponent
  }*/
  ],
  apiSections: [
    {
      title: 'PopoverDirective',
      anchor: 'popover-directive'
    },
    {
      title: 'PopoverConfig',
      anchor: 'popover-config',
      component: 'config'
    }
  ]
};
