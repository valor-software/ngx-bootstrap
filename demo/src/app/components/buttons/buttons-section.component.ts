import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'buttons-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>There are two directives that can make a group of buttons behave like a set of checkboxes, radio buttons, or a hybrid where radio buttons can be unchecked.</p>
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
        <li><a pageScroll href="#button-checkbox-directive">ButtonCheckboxDirective</a></li>
        <li><a pageScroll href="#button-radio-directive">ButtonRadioDirective</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
    <!-- basic -->
  <p>Click headers to expand/collapse content that is broken into logical sections, much like tabs.</p>
    
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <buttons-demo></buttons-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="button-checkbox-directive" directive="ButtonCheckboxDirective"></ng-api-doc>
  <ng-api-doc id="button-radio-directive" directive="ButtonRadioDirective"></ng-api-doc>
</demo-section>`
})
export class ButtonsSectionComponent {
  public name:string = 'Buttons';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/buttons';
  public titleDoc:string = titleDoc;
  public demos: any = DEMOS;
}
