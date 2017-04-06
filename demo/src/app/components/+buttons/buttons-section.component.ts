import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'buttons-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>There are two directives that can make a group of buttons behave like a set of checkboxes, radio buttons, or a hybrid where radio buttons can be unchecked.</p>
  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="basic">Single button</a></li>
        <li><a routerLink="." fragment="checkbox">Checkbox</a></li>
        <li><a routerLink="." fragment="radio">Radio & Uncheckable Radio</a></li>
        <li><a routerLink="." fragment="disabled">Disabled Buttons</a></li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="button-checkbox-directive">ButtonCheckboxDirective</a></li>
        <li><a routerLink="." fragment="button-radio-directive">ButtonRadioDirective</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
  <h2 routerLink="." fragment="basic" id="basic">Single button</h2>
  <p>Default static button with two states</p>
  <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
    <demo-buttons-basic></demo-buttons-basic>
  </ng-sample-box>
   
  <h2 routerLink="." fragment="checkbox" id="checkbox">Checkbox</h2>
  <p>Checkbox-like buttons set with variable states</p>
  <ng-sample-box [ts]="demos.checkbox.component" [html]="demos.checkbox.html">
    <demo-buttons-checkbox></demo-buttons-checkbox>
  </ng-sample-box>
    
  <h2 routerLink="." fragment="radio" id="radio">Radio & Uncheckable Radio</h2>
  <p>Radio buttons with checked/unchecked states</p>
  <ng-sample-box [ts]="demos.radio.component" [html]="demos.radio.html">
    <demo-buttons-radio></demo-buttons-radio>
  </ng-sample-box>
        
  <h2 routerLink="." fragment="disabled" id="disabled">Disabled Buttons</h2>
  <ng-sample-box [ts]="demos.disabled.component" [html]="demos.disabled.html">
    <demo-buttons-disabled></demo-buttons-disabled>
  </ng-sample-box>
    
  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc id="button-checkbox-directive" directive="ButtonCheckboxDirective"></ng-api-doc>
  <ng-api-doc id="button-radio-directive" directive="ButtonRadioDirective"></ng-api-doc>
</demo-section>`
})
export class ButtonsSectionComponent {
  public name:string = 'Buttons';
  public src:string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/buttons';
  public titleDoc:string = titleDoc;
  public demos: any = DEMOS;
}
