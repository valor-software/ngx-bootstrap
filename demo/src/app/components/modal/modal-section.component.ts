import { Component } from '@angular/core';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw?lang=typescript!./demos/modal-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/modal-demo.component.html');

@Component({
  selector: 'modal-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.</p>
  
  <h2>Contents</h2>
  <ul>
    <li><a pageScroll href="#usage">Usage</a></li>
    <li><a pageScroll href="#examples">Examples</a>
      <ul>
        <!--<li><a pageScroll href="#link-color">Link color</a></li>-->
      </ul>
    </li>
    <li><a pageScroll href="#api-reference">API Reference</a>
      <ul>
        <li><a pageScroll href="#modal-directive">ModalDirective</a></li>
        <li><a pageScroll href="#modal-backdrop-component">ModalBackdropComponent</a></li>
        <li><a pageScroll href="#modal-options">ModalOptions</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
  
  <!-- basic -->
  <ng-sample-box [ts]="ts" [html]="html">
    <modal-demo></modal-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="modal-directive" directive="ModalDirective"></ng-api-doc>
  <ng-api-doc id="modal-backdrop-component" directive="ModalBackdropComponent"></ng-api-doc>
  <ng-api-doc-config id="modal-options" type="ModalOptions"></ng-api-doc-config>
</demo-section>`
})
export class ModalSectionComponent {
  public name:string = 'Modals';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/master/components/modal';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;

}
