import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'modal-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.</p>

  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="service-section">Service</a>
      <ul>
        <li><a routerLink="." fragment="service-examples">Examples</a>
          <ul>
            <li><a routerLink="." fragment="service-template">Template</a></li>
            <li><a routerLink="." fragment="service-component">Component</a></li>
            <li><a routerLink="." fragment="service-nested">Nested</a></li>
            <li><a routerLink="." fragment="service-events">Events</a></li>
            <li><a routerLink="." fragment="service-options">Options</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a routerLink="." fragment="directive-section">Directive</a>
      <ul>
        <li><a routerLink="." fragment="examples">Examples</a>
          <ul>
            <li><a routerLink="." fragment="static">Static modal</a></li>
            <li><a routerLink="." fragment="sizes">Optional sizes</a></li>
            <li><a routerLink="." fragment="child">Child modal</a></li>
            <li><a routerLink="." fragment="nested">Nested modals</a></li>
            <li><a routerLink="." fragment="events">Modal events</a></li>
            <li><a routerLink="." fragment="auto-shown">Auto shown modal</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="modal-directive">ModalDirective</a></li>
        <li><a routerLink="." fragment="modal-backdrop-component">ModalBackdropComponent</a></li>
        <li><a routerLink="." fragment="bs-modal-service">BsModalService</a></li>
        <li><a routerLink="." fragment="bs-modal-ref">BsModalRef</a></li>
        <li><a routerLink="." fragment="modal-options">ModalOptions</a></li>
      </ul>
    </li>
  </ul>

  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>
  <p [innerHtml]="titleDoc"></p>
  <h2 routerLink="." fragment="service-section" id="service-section">Service</h2>
  <p>Open a modal from service</p>
  <p>To be able to open modals from service, inject BsModalService to your constructor. <br>
    Then, call <code>.show()</code> method of modal service. Pass a TemplateRef or a component as a first argument and config as a second (optionally). <br>
    <code>.show()</code> method returns an instance of BsModalRef class with <code>.hide()</code> method and <code>content</code> property where you'll find a component which you've passed to service <br>
  </p>
  <h2 routerLink="." fragment="service-examples" id="service-examples">Examples</h2>
  <h3 routerLink="." fragment="service-template" id="service-template">Template</h3>
  <ng-sample-box [ts]="demos.serviceTemplate.component" [html]="demos.serviceTemplate.html">
    <demo-modal-service-static></demo-modal-service-static>
  </ng-sample-box>
  
  <h3 routerLink="." fragment="service-component" id="service-component">Component</h3>
  <p>Creating a modal with component just as easy as it is with template. Just pass your component in <code>.show()</code> method as in example, and don't forget to include your component to <code>entryComponents</code> of your NgModule<br>
  If you passed a component to <code>.show()</code> you can get access to opened modal by injecting BsModalRef. See example for more info
  </p>
  <ng-sample-box [ts]="demos.serviceComponent.component" [html]="demos.serviceComponent.html">
    <demo-modal-service-component></demo-modal-service-component>
  </ng-sample-box>
  
  <h3 routerLink="." fragment="service-nested" id="service-nested">Nested</h3>
  <p>Nested modals are supported</p>
  <ng-sample-box [ts]="demos.serviceNested.component" [html]="demos.serviceNested.html">
    <demo-modal-service-nested></demo-modal-service-nested>
  </ng-sample-box>

  <h3 routerLink="." fragment="service-events" id="service-events">Events</h3>
  <p>Modal service events. Modal service exposes 4 events: onShow, onShown, onHide, onHidden. See usage example below.</p>
  <p>onHide and onHidden emit dismiss reason. Possible values are <code>backdrop-click</code>, <code>esc</code> or <code>null</code> if modal was closed by direct call of <code>hide()</code></p>
  <ng-sample-box [ts]="demos.serviceEvents.component" [html]="demos.serviceEvents.html">
    <demo-modal-service-events></demo-modal-service-events>
  </ng-sample-box>

  <h3 routerLink="." fragment="service-options" id="service-options">Options</h3>
  <p>There are some options that you can configure, like animation, backdrop, closing by Esc button, additional css classes. See the demo below to learn how to configure your modal</p>
  <ng-sample-box [ts]="demos.serviceOptions.component" [html]="demos.serviceOptions.html">
    <demo-modal-service-options></demo-modal-service-options>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="directive-section" id="directive-section">Directive</h2>
  <p>Also you can use directive instead of service. See the demos below </p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>

  <h3 routerLink="." fragment="static" id="static">Static modal</h3>
  <ng-sample-box [ts]="demos.staticModal.component" [html]="demos.staticModal.html">
    <demo-modal-static></demo-modal-static>
  </ng-sample-box>

  <h3 routerLink="." fragment="sizes" id="sizes">Optional sizes</h3>
  <ng-sample-box [ts]="demos.sizes.component" [html]="demos.sizes.html">
    <demo-modal-sizes></demo-modal-sizes>
  </ng-sample-box>

  <h3 routerLink="." fragment="child" id="child">Child modal</h3>
  <p>Control modal from parent component</p>
  <ng-sample-box [ts]="demos.child.component" [html]="demos.child.html">
    <demo-modal-child></demo-modal-child>
  </ng-sample-box>

  <h3 routerLink="." fragment="nested" id="nested">Nested modals</h3>
  <p>Open a modal from another modal</p>
  <ng-sample-box [ts]="demos.nested.component" [html]="demos.nested.html">
    <demo-modal-nested></demo-modal-nested>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="events" id="events">Modal events</h2>
  <p>
    ModalDirective exposes 4 events: OnShow, OnShown, OnHide, OnHidden. See usage example below. <br>
    <code>$event</code> is an instance of ModalDirective. There you may find some useful properties like <code>isShown</code>, <code>dismissReason</code>, etc. <br>
    For example, you may want to know which one of user's actions caused closing of a modal. Just get the value of <code>dismissReason</code>, 
    possible values are <code>backdrop-click</code>, <code>esc</code> or <code>null</code> if modal was closed by direct call of <code>hide()</code>
  </p>
  <ng-sample-box [ts]="demos.events.component" [html]="demos.events.html">
    <demo-modal-events></demo-modal-events>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="auto-shown" id="auto-shown">Auto shown modal</h2>
  <p>
    Show modal right after it has been initialized.
    This allows you to keep DOM clean by only appending visible modals to the DOM using <code>*ngIf</code> directive.
  </p>
  <p>
    It can also be useful if you want your modal component to perform some initialization operations, but
    want to defer that until user actually sees modal content. I.e. for a "Select e-mail recipient" modal
    you might want to defer recipient list loading until the modal is shown.
  </p>
  <ng-sample-box [ts]="demos.autoShown.component" [html]="demos.autoShown.html">
    <demo-modal-auto-shown></demo-modal-auto-shown>
  </ng-sample-box>

  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc routerLink="." fragment="modal-directive" id="modal-directive" directive="ModalDirective"></ng-api-doc>
  <ng-api-doc routerLink="." fragment="modal-backdrop-component" id="modal-backdrop-component" directive="ModalBackdropComponent"></ng-api-doc>
  <ng-api-doc-class routerLink="." fragment="bs-modal-service" id="bs-modal-service" type="BsModalService"></ng-api-doc-class>
  <ng-api-doc-class routerLink="." fragment="bs-modal-ref" id="bs-modal-ref" type="BsModalRef"></ng-api-doc-class>
  <ng-api-doc-config routerLink="." fragment="modal-options" id="modal-options" type="ModalOptions"></ng-api-doc-config>
</demo-section>`
})
export class ModalSectionComponent {
  public name: string = 'Modals';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/modal';
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
