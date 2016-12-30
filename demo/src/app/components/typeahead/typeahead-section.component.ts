import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

@Component({
  selector: 'typeahead-section',
  template: `
<demo-section [name]="name" [src]="src">
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
        <li><a pageScroll href="#typeahead-directive">TypeaheadDirective</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
      
  <!-- basic -->
  
  <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
    <typeahead-demo></typeahead-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="typeahead-directive" directive="TypeaheadDirective"></ng-api-doc>
</demo-section>`
})
export class TypeaheadSectionComponent {
  public name:string = 'Typeahead';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/typeahead';
  public demos: any = DEMOS;
  public titleDoc:string = titleDoc;
}
