// https://api.jqueryui.com/datepicker/
import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'datepicker-section',
  template: `
    <demo-section [name]="name" [src]="src">
      <p>Datepicker is a highly configurable component that adds datepicker functionality to your pages. You can
        customize the date format and language, restrict the selectable date ranges.</p>

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
            <li><a routerLink="." fragment="datepicker-component">DatePickerComponent</a></li>
          </ul>
        </li>
      </ul>

      <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

      <p [innerHtml]="titleDoc"></p>

      <h2 routerLink="." fragment="examples" id="examples">Examples</h2>

      <ng-sample-box [ts]="demos.pop.component" [html]="demos.pop.html">
        <p><code>BsDatepickerModule</code> is activily developed but you can use it already</p>
        <p>Notebale change is additional css for it <code> "/datepicker/bs-datepicker.css"</code></p>
        <p>In nearest time will be added:</p>
        <ul>
          <li><s>1. Month and year selection</s></li>
          <li><s>2. Min/max dates restrcitions</s></li>
          <li><s>3. Color theming</s></li>
          <li>4. Options to replace any part of template</li>
          <li><s>5. Configuration</s></li>
          <li>6. Integration with forms, only for input fields</li>
          <li>etc.</li>
        </ul>
        <demo-date-picker-popup></demo-date-picker-popup>
      </ng-sample-box>

      <ng-sample-box [ts]="demos.colorTheming.component" [html]="demos.colorTheming.html">
        <demo-datepicker-color-theming></demo-datepicker-color-theming>
      </ng-sample-box>

      <ng-sample-box [ts]="demos.changeLocale.component" [html]="demos.changeLocale.html">
        <demo-datepicker-change-locale></demo-datepicker-change-locale>
      </ng-sample-box>

      <ng-sample-box [ts]="demos.disabled.component" [html]="demos.disabled.html">
        <demo-disabled-datepicker></demo-disabled-datepicker>
      </ng-sample-box>

      <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
        <datepicker-demo></datepicker-demo>
      </ng-sample-box>

      <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
      <ng-api-doc id="datepicker-component" directive="DatePickerComponent"></ng-api-doc>
    </demo-section>`
})
export class DatepickerSectionComponent {
  public name: string = 'Datepicker';
  public src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';
  public demos: any = DEMOS;
  public titleDoc: string = titleDoc;
}
