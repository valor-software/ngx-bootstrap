import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'typeahead-section',
  template: `
<demo-section [name]="name" [src]="src">
<h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <!--<li><a routerLink="." fragment="link-color">Link color</a></li>-->
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="typeahead-directive">TypeaheadDirective</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
      
  <!-- static -->
  <h2 routerLink="." fragment="static" id="static">Static array</h2>
  <ng-sample-box [ts]="demos.static.component" [html]="demos.static.html">
    <demo-typeahead-static></demo-typeahead-static>
  </ng-sample-box>
      
  <!-- Custom item template -->
  <h2 routerLink="." fragment="item-template" id="item-template">Item template</h2>
  <ng-sample-box [ts]="demos.itemTemplate.component" [html]="demos.itemTemplate.html">
    <demo-typeahead-item-template></demo-typeahead-item-template>
  </ng-sample-box>
  
  <!-- Option field -->
  <h2 routerLink="." fragment="option-field" id="option-field">Option field</h2>
  <ng-sample-box [ts]="demos.field.component" [html]="demos.field.html">
    <demo-typeahead-field></demo-typeahead-field>
  </ng-sample-box>  
  
  <!-- Async data -->
  <h2 routerLink="." fragment="async" id="async">Async data</h2>
  <ng-sample-box [ts]="demos.async.component" [html]="demos.async.html">
    <demo-typeahead-async></demo-typeahead-async>
  </ng-sample-box>
  
  <!-- With reactive forms -->
  <h2 routerLink="." fragment="forms" id="forms">Reactive forms</h2>
  <ng-sample-box [ts]="demos.inForm.component" [html]="demos.inForm.html">
    <demo-typeahead-forms></demo-typeahead-forms>
  </ng-sample-box>
    
  <!-- Grouping results -->
  <h2 routerLink="." fragment="grouping-results" id="grouping-results">Grouping results</h2>
  <ng-sample-box [ts]="demos.grouping.component" [html]="demos.grouping.html">
    <demo-typeahead-grouping></demo-typeahead-grouping>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc id="typeahead-directive" directive="TypeaheadDirective"></ng-api-doc>
</demo-section>`
})
export class TypeaheadSectionComponent {
  public name:string = 'Typeahead';
  public src:string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/typeahead';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
