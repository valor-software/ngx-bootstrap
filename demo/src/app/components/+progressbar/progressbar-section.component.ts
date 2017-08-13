import { Component } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'progressbar-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.</p>

  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="static">Static</a></li>
        <li><a routerLink="." fragment="dynamic">Dynamic</a></li>
        <li><a routerLink="." fragment="stacked">Stacked</a></li>
        <li  *ngIf="isBs3"><a routerLink="." fragment="config">Configuring defaults</a></li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="progressbar-component">ProgressbarComponent</a></li>
        <li><a routerLink="." fragment="progress-directive">ProgressDirective</a></li>
        <li><a routerLink="." fragment="bar-component">BarComponent</a></li>
        <li><a routerLink="." fragment="progress-config">ProgressbarConfig</a></li>
      </ul>
    </li>
  </ul>   
      
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>

  <div *ngIf="isBs3">
    <h2 routerLink="." fragment="static" id="static">Static</h2>
    <ng-sample-box [ts]="demos.bs3static.component" [html]="demos.bs3static.html">
      <demo-progressbar-static></demo-progressbar-static>
    </ng-sample-box>
    
    <h2 routerLink="." fragment="dynamic" id="dynamic">Dynamic</h2>
    <ng-sample-box [ts]="demos.bs3dynamic.component" [html]="demos.bs3dynamic.html">
      <demo-progressbar-dynamic></demo-progressbar-dynamic>
    </ng-sample-box>
    
    <h2 routerLink="." fragment="stacked" id="stacked">Stacked</h2>
    <ng-sample-box [ts]="demos.bs3stacked.component" [html]="demos.bs3stacked.html">
      <demo-progressbar-stacked></demo-progressbar-stacked>
    </ng-sample-box>
        
    <h2 routerLink="." fragment="config" id="config">Configuring defaults</h2>
    <ng-sample-box [ts]="demos.bs3config.component" [html]="demos.bs3config.html">
      <demo-progressbar-config></demo-progressbar-config>
    </ng-sample-box>
  </div> 
   
  <div *ngIf="!isBs3">
    <br>
    <h3>In bootstrap 4 progress has a different concept, no inner text, no default transition animation</h3>
    <br>
    <h2 routerLink="." fragment="static" id="static">Static</h2>
    <ng-sample-box [ts]="demos.bs4static.component" [html]="demos.bs4static.html">
      <demo-bs4-progressbar-static></demo-bs4-progressbar-static>
    </ng-sample-box>
    
    <h2 routerLink="." fragment="dynamic" id="dynamic">Dynamic</h2>
    <ng-sample-box [ts]="demos.bs4dynamic.component" [html]="demos.bs4dynamic.html">
      <demo-bs4-progressbar-dynamic></demo-bs4-progressbar-dynamic>
    </ng-sample-box>
    
    <h2 routerLink="." fragment="stacked" id="stacked">Stacked</h2>
    <ng-sample-box [ts]="demos.bs4stacked.component" [html]="demos.bs4stacked.html">
      <demo-bs4-progressbar-stacked></demo-bs4-progressbar-stacked>
    </ng-sample-box>
  </div>
  
  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc routerLink="." fragment="progressbar-component" id="progressbar-component" directive="ProgressbarComponent"></ng-api-doc>
  <ng-api-doc routerLink="." fragment="progress-directive" id="progress-directive" directive="ProgressDirective"></ng-api-doc>
  <ng-api-doc routerLink="." fragment="bar-component" id="bar-component" directive="BarComponent"></ng-api-doc>
  <ng-api-doc-config routerLink="." fragment="progress-config" id="progress-config" type="ProgressbarConfig"></ng-api-doc-config>
</demo-section>`
})
export class ProgressbarSectionComponent {
  public name: string = 'Progressbar';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/progressbar';

  public get isBs3(): boolean {
    return isBs3();
  }

  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
