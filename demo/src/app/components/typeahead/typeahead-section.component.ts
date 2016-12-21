import { Component } from '@angular/core';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw?lang=typescript!./demos/typeahead-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/typeahead-demo.component.html');

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
  
  <ng-sample-box [ts]="ts" [html]="html">
    <typeahead-demo></typeahead-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="typeahead-directive" directive="TypeaheadDirective"></ng-api-doc>
</demo-section>`
})
export class TypeaheadSectionComponent {
  public name:string = 'Typeahead';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/typeahead';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
}
