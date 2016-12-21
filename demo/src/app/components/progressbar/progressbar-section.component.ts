import { Component } from '@angular/core';
import { isBs3 } from 'ng2-bootstrap';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html!markdown!./docs/title.md');

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
  <ng-sample-box *ngIf="isBs3" [ts]="demos.bs3old.component" [html]="demos.bs3old.html">
    <progressbar-demo></progressbar-demo>
  </ng-sample-box>
  
  <ng-sample-box *ngIf="!isBs3" [ts]="demos.bs4old.component" [html]="demos.bs4old.html">
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
  public src: string = 'https://github.com/valor-software/ng2-bootstrap/tree/development/src/progressbar';
  public get isBs3():boolean {
    return isBs3();
  }
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
