import { DemoModalServiceStaticComponent } from './demos/service-template/service-template';
import { DemoModalServiceFromComponent } from './demos/service-component/service-component';
import { DemoModalServiceNestedComponent } from './demos/service-nested/service-nested';
import { DemoModalServiceEventsComponent } from './demos/service-events/service-events';
import { DemoModalServiceOptionsComponent } from './demos/service-options/service-options';

import { DemoModalStaticComponent } from './demos/static/static';
import { DemoModalSizesComponent } from './demos/sizes/sizes';
import { DemoModalChildComponent } from './demos/child/child';
import { DemoModalNestedComponent } from './demos/nested/nested';
import { DemoModalEventsComponent } from './demos/events/events';
import { DemoAutoShownModalComponent } from './demos/auto-shown/auto-shown';

export const modalServiceExamples = [
  {
    title: 'Template',
    anchor: 'service-template',
    name: 'serviceTemplate',
    outlet: DemoModalServiceStaticComponent
  },
  {
    title: 'Component',
    anchor: 'service-component',
    name: 'serviceComponent',
    description: `
      <p>Creating a modal with component just as easy as it is with template. Just pass your component
        in <code>.show()</code> method as in example, and don't forget to include your component to
        <code>entryComponents</code> of your NgModule<br> If you passed a component
        to <code>.show()</code> you can get access to opened modal by injecting BsModalRef. See example for
        more info</p>`,
    outlet: DemoModalServiceFromComponent
  },
  {
    title: 'Nested',
    anchor: 'service-nested',
    name: 'serviceNested',
    description: `<p>Nested modals are supported</p>`,
    outlet: DemoModalServiceNestedComponent
  },
  {
    title: 'Events',
    anchor: 'service-events',
    name: 'serviceEvents',
    description: `
      <p>Modal service events. Modal service exposes 4 events: onShow, onShown, onHide, onHidden.
      See usage example below.</p>
      <p>onHide and onHidden emit dismiss reason. Possible values are <code>backdrop-click</code>, <code>esc</code> or
      <code>null</code> if modal was closed by direct call of <code>hide()</code></p>`,
    outlet: DemoModalServiceEventsComponent
  },
  {
    title: 'Options',
    anchor: 'service-options',
    name: 'serviceOptions',
    description: `<p>There are some options that you can configure, like animation, backdrop, closing by Esc button,
    additional css classes. See the demo below to learn how to configure your modal</p>`,
    outlet: DemoModalServiceOptionsComponent
  }
];

export const modalDirectiveExamples = [
  {
    title: 'Static modal',
    anchor: 'directive-static',
    name: 'staticModal',
    outlet: DemoModalStaticComponent
  },
  {
    title: 'Optional sizes',
    anchor: 'directive-sizes',
    name: 'sizes',
    outlet: DemoModalSizesComponent
  },
  {
    title: 'Child modal',
    anchor: 'directive-child',
    name: 'child',
    description: `<p>Control modal from parent component</p>`,
    outlet: DemoModalChildComponent
  },
  {
    title: 'Nested modals',
    anchor: 'directive-nested',
    name: 'nested',
    description: `<p>Open a modal from another modal</p>`,
    outlet: DemoModalNestedComponent
  },
  {
    title: 'Modal events',
    anchor: 'directive-events',
    name: 'events',
    description: `
      <p>ModalDirective exposes 4 events: OnShow, OnShown, OnHide, OnHidden. See usage example below.<br>
        <code>$event</code> is an instance of ModalDirective. There you may find some useful properties like
        <code>isShown</code>, <code>dismissReason</code>, etc. <br>For example, you may want to know which one of
        user's actions caused closing of a modal. Just get the value of <code>dismissReason</code>, possible values are
        <code>backdrop-click</code>, <code>esc</code> or <code>null</code> if modal was closed by direct
        call of <code>hide()</code></p>`,
    outlet: DemoModalEventsComponent
  },
  {
    title: 'Auto shown modal',
    anchor: 'directive-auto-shown',
    name: 'autoShown',
    description: `
      <p>Show modal right after it has been initialized. This allows you to keep DOM clean by only
        appending visible modals to the DOM using <code>*ngIf</code> directive.</p>
      <p>It can also be useful if you want your modal component to perform some initialization operations, but
        want to defer that until user actually sees modal content. I.e. for a "Select e-mail recipient" modal
        you might want to defer recipient list loading until the modal is shown.</p>`,
    outlet: DemoAutoShownModalComponent
  }
];

export const modalApi = [
  {
    title: 'ModalDirective',
    anchor: 'modal-directive'
  },
  {
    title: 'ModalBackdropComponent',
    anchor: 'modal-backdrop-component'
  },
  {
    title: 'BsModalService',
    anchor: 'bs-modal-service'
  },
  {
    title: 'BsModalRef',
    anchor: 'bs-modal-ref'
  },
  {
    title: 'ModalOptions',
    anchor: 'modal-options'
  }
];
