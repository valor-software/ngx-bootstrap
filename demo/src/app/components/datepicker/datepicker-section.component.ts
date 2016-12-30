// https://api.jqueryui.com/datepicker/
import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'datepicker-section',
  template: `
<demo-section [name]="name" [src]="src">
<p>Datepicker is a highly configurable component that adds datepicker functionality to your pages. You can customize the date format and language, restrict the selectable date ranges.</p>

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
        <li><a pageScroll href="#datepicker-component">DatePickerComponent</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>

  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <datepicker-demo></datepicker-demo>
  </ng-sample-box>
  
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="datepicker-component" directive="DatePickerComponent"></ng-api-doc>
</demo-section>`
})
export class DatepickerSectionComponent {
  public name:string = 'Datepicker';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/datepicker';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
