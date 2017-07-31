import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'dropdown-section',
  template: `
<demo-section [name]="name" [src]="src">
  <p>Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They’re made interactive with the included dropdown directives.</p>
  
  <h2>Contents</h2>
  <ul>
    <li><a routerLink="." fragment="usage">Usage</a></li>
    <li><a routerLink="." fragment="examples">Examples</a>
      <ul>
        <li><a routerLink="." fragment="single-button">Single button dropdowns</a></li>
        <li><a routerLink="." fragment="split-button">Split button dropdowns</a></li>
        <li><a routerLink="." fragment="triggers-manual">Manual triggers</a></li>
        <li><a routerLink="." fragment="disabled-menu">Disabled menu</a></li>
        <li><a routerLink="." fragment="alignment">Menu alignment</a></li>
        <li><a routerLink="." fragment="nested">Nested dropdowns (experimental)</a></li>
        <li><a routerLink="." fragment="container-body">Append to body</a></li>
        <li><a routerLink="." fragment="keyboard">Single button with keyboard nav</a></li>
        <li><a routerLink="." fragment="dropup">Dropup variation</a></li>
        <li><a routerLink="." fragment="config">Configuring defaults</a></li>
      </ul>
    </li>
    <li><a routerLink="." fragment="api-reference">API Reference</a>
      <ul>
        <li><a routerLink="." fragment="dropdown-directive">DropdownDirective</a></li>
        <li><a routerLink="." fragment="dropdown-toggle-directive">DropdownToggleDirective</a></li>
        <li><a routerLink="." fragment="dropdown-config">DropdownConfig</a></li>
      </ul>
    </li>
  </ul>
       
  <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

  <p [innerHtml]="titleDoc"></p>

  <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
  <p>Wrap the dropdown’s toggle (your button or link) and the dropdown menu within <code>dropdown</code>. 
  Dropdowns can be triggered from <code> &lt;a&gt;</code> or <code> &lt;button&gt;</code> elements to better fit your potential needs.</p>

  <h2 routerLink="." fragment="single-button" id="single-button">Single button dropdowns</h2>
      
  <p>Any single <code>.btn</code> can be turned into a dropdown toggle with some markup changes. 
  Here’s how you can put them to work with either  <code> &lt;button&gt; </code> elements:</p>
  
  <ng-sample-box [ts]="demos.basic.component" [html]="demos.basic.html">
    <demo-dropdown-basic></demo-dropdown-basic>
  </ng-sample-box>
  
  <p>And with <code> &lt;a&gt;</code> elements:</p>
 
  <ng-sample-box [ts]="demos.link.component" [html]="demos.link.html">
    <demo-dropdown-basic-link></demo-dropdown-basic-link>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="split-button" id="split-button">Split button dropdowns</h2>
  <p>Similarly, create split button dropdowns with virtually the same markup as single button dropdowns,
   but with the addition of <code>.dropdown-toggle-split</code> for proper spacing around the dropdown caret.</p>
  
  <ng-sample-box [ts]="demos.splitBtn.component" [html]="demos.splitBtn.html">
    <demo-dropdown-split></demo-dropdown-split>
  </ng-sample-box>
  
   <h2 routerLink="." fragment="triggers-manual" id="triggers-manual">Manual triggers</h2>
   
   <ng-sample-box [ts]="demos.triggersManual.component" [html]="demos.triggersManual.html">
    <demo-dropdown-triggers-manual></demo-dropdown-triggers-manual>
   </ng-sample-box>
   
   <h2 routerLink="." fragment="disabled-menu" id="disabled-menu">Disabled menu</h2>
   
   <ng-sample-box [ts]="demos.disabledMenu.component" [html]="demos.disabledMenu.html">
    <demo-dropdown-disabled></demo-dropdown-disabled>
   </ng-sample-box>
      
   <h2 routerLink="." fragment="alignment" id="alignment">Menu alignment</h2>
   
   <p>By default, a dropdown menu is automatically positioned 100% from the top and along the left side of its parent. 
   Add class <code>.dropdown-menu-right</code> to a <code>dropdownMenu</code> to right align the dropdown menu.</p>
   
   <ng-sample-box [ts]="demos.alignment.component" [html]="demos.alignment.html">
    <demo-dropdown-alignment></demo-dropdown-alignment>
   </ng-sample-box>
  
  <h2 routerLink="." fragment="nested" id="nested">Nested dropdowns (experimental)</h2>
   
   <ng-sample-box [ts]="demos.nested.component" [html]="demos.nested.html">
     <demo-nested-dropdowns></demo-nested-dropdowns>
   </ng-sample-box>
  
   <h2 routerLink="." fragment="container-body" id="container-body">Append to body</h2>
   
   <ng-sample-box [ts]="demos.container.component" [html]="demos.container.html">
    <demo-dropdown-container></demo-dropdown-container>
  </ng-sample-box>

  <!-- not availavle in bs-dropdown version -->
  <!--<h2 routerLink="." fragment="keyboard" id="keyboard">Single button with keyboard nav</h2>-->
   <!--<ng-sample-box [ts]="demos.keyboard.component" [html]="demos.keyboard.html">-->
    <!--<demo-dropdown-keyboard></demo-dropdown-keyboard>-->
  <!--</ng-sample-box>-->
    
  <h2 routerLink="." fragment="dropup" id="dropup">Dropup variation</h2>
  <p>Trigger dropdown menus above elements by adding <code>.dropup</code> to the parent element.</p>
   <ng-sample-box [ts]="demos.dropup.component" [html]="demos.dropup.html">
    <demo-dropup></demo-dropup>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="config" id="config">Configuring defaults</h2>
  <p>It is possible to override default dropdown config partially or completely.</p>
  <ng-sample-box [ts]="demos.config.component" [html]="demos.config.html">
    <demo-dropdown-config></demo-dropdown-config>
  </ng-sample-box>
  
  <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
  <ng-api-doc id="dropdown-directive" directive="BsDropdownDirective"></ng-api-doc>
  <ng-api-doc id="dropdown-menu-directive" directive="BsDropdownMenuDirective"></ng-api-doc>
  <ng-api-doc id="dropdown-toggle-directive" directive="BsDropdownToggleDirective"></ng-api-doc>
  <ng-api-doc-config id="dropdown-config" type="BsDropdownConfig"></ng-api-doc-config>
</demo-section>`
})
export class DropdownSectionComponent {
  public name: string = 'Dropdowns';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/dropdown';
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
