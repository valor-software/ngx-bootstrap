import { Component } from '@angular/core';
import { isBs3 } from 'ng2-bootstrap';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

let ts = require('!!raw?lang=typescript!./demos/progressbar-demo.component.ts');

let templates: any = {
  'bs3': require('!!raw?lang=markup!./demos/progressbar-demo-bs3.component.html'),
  'bs4': require('!!raw?lang=markup!./demos/progressbar-demo-bs4.component.html')
};

@Component({
  selector: 'progressbar-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.</p>

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
        <li><a pageScroll href="#progressbar-component">ProgressbarComponent</a></li>
        <li><a pageScroll href="#progress-directive">ProgressDirective</a></li>
        <li><a pageScroll href="#bar-component">BarComponent</a></li>
        <li><a pageScroll href="#progress-config">ProgressbarConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 id="examples">Examples</h2>
  
  <!-- basic -->
  <ng-sample-box [ts]="ts" [html]="html">
    <progressbar-demo></progressbar-demo>
  </ng-sample-box>
      
  <h2 id="api-reference">API Reference</h2>
  <ng-api-doc id="progressbar-component" directive="ProgressbarComponent"></ng-api-doc>
  <ng-api-doc id="progress-directive" directive="ProgressDirective"></ng-api-doc>
  <ng-api-doc id="bar-component" directive="BarComponent"></ng-api-doc>
  <ng-api-doc-config id="progress-config" type="ProgressbarConfig"></ng-api-doc-config>
</demo-section>`
})
export class ProgressbarSectionComponent {
  public name: string = 'Progressbar';
  public src: string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/progressbar';

  public get html(): string {
    return isBs3() ? templates.bs3 : templates.bs4;
  }

  public ts: string = ts;
  public titleDoc: string = titleDoc;
}
