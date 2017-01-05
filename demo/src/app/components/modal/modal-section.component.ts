import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'modal-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.</p>
  
  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="static">Static modal</a></li>
        <li><a routerLink="." fragment="sizes">Optional sizes</a></li>
        <li><a routerLink="." fragment="child">Child modal</a></li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="modal-directive">ModalDirective</a></li>
        <li><a routerLink="." fragment="modal-backdrop-component">ModalBackdropComponent</a></li>
        <li><a routerLink="." fragment="modal-options">ModalOptions</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
      
  <h2 routerLink="." fragment="static" id="static">Static modal</h2>
  <ng-sample-box [ts]="demos.staticModal.component" [html]="demos.staticModal.html">
    <demo-modal-static></demo-modal-static>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="sizes" id="sizes">Optional sizes</h2>
  <ng-sample-box [ts]="demos.sizes.component" [html]="demos.sizes.html">
    <demo-modal-sizes></demo-modal-sizes>
  </ng-sample-box>
   
  <h2 routerLink="." fragment="child" id="child">Child modal</h2>
  <p>Control modal from parent component</p>
  <ng-sample-box [ts]="demos.child.component" [html]="demos.child.html">
    <demo-modal-child></demo-modal-child>
  </ng-sample-box>

  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc routerLink="." fragment="modal-directive" id="modal-directive" directive="ModalDirective"></ng-api-doc>
  <ng-api-doc routerLink="." fragment="modal-backdrop-component" id="modal-backdrop-component" directive="ModalBackdropComponent"></ng-api-doc>
  <ng-api-doc-config routerLink="." fragment="modal-options" id="modal-options" type="ModalOptions"></ng-api-doc-config>
</demo-section>`
})
export class ModalSectionComponent {
  public name: string = 'Modals';
  public src: string = 'https://github.com/valor-software/ng2-bootstrap/tree/master/components/modal';
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;

}
