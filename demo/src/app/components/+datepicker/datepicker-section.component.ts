// https://api.jqueryui.com/datepicker/
import { Component } from '@angular/core';
import { DEMOS } from './demos';
// webpack html imports
let oldTitleDoc = require('html-loader!markdown-loader!./docs/titleOld.md');
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'datepicker-section',
  template: `
    <demo-section [name]="name" [src]="src">
      <tabset>
        <tab heading="Overview">
          <br>
          <p>Datepicker is a highly configurable component that adds datepicker functionality to your pages. You can
            customize the date format and language, restrict the selectable date ranges.</p>
          <h2>Contents</h2>
          <ul>
            <li><a routerLink="." fragment="usage">Usage</a></li>
            <li><a routerLink="." fragment="examples">Examples</a>
              <ul>
                <li><a routerLink="." fragment="basic">Basic</a></li>
                <li><a routerLink="." fragment="themes">Themes</a></li>
                <li><a routerLink="." fragment="locales">Locales</a></li>
                <li><a routerLink="." fragment="min-max">Min-max</a></li>
                <li><a routerLink="." fragment="disabled">Disabled</a></li>
                <li><a routerLink="." fragment="forms">Forms</a></li>
                <li><a routerLink="." fragment="reactive">Reactive forms</a></li>
              </ul>
            </li>
            <li><a routerLink="." fragment="api-reference">API Reference</a>
              <ul>
                <li><a routerLink="." fragment="bs-datepicker-component">BsDatepickerComponent</a></li>
                <li><a routerLink="." fragment="bs-daterangepicker-component">BsDaterangepickerComponent</a></li>
                <li><a routerLink="." fragment="bs-daterangepicker-config">BsDatepickerConfig</a></li>
              </ul>
            </li>
          </ul>

          <h2 routerLink="." fragment="usage" id="usage">Usage</h2>

          <p [innerHtml]="titleDoc"></p>

          <h2 routerLink="." fragment="examples" id="examples">Examples</h2>
          <h3 routerLink="." fragment="basic" id="basic">Basic</h3>
          <ng-sample-box [ts]="demos.pop.component" [html]="demos.pop.html">
            <p><code>BsDatepickerModule</code> is activily developed but you can use it already</p>
            <p>Notebale change is additional css for it <code> "/datepicker/bs-datepicker.css"</code> <br></p>
            <p>There are two ways of adding css:</p>
            <ul>
              <li>Load it from CDN. Add <code>&lt;link rel="stylesheet"
                href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css"&gt;</code> to your
                <code>index.html</code></li>
              <li>Load it from <code>node_modules/ngx-bootstrap/datepicker/bs-datepicker.css</code> via package bundler
                like Angular CLI, if you're using one.
              </li>
            </ul>
            <demo-date-picker-popup></demo-date-picker-popup>
          </ng-sample-box>

          <h3 routerLink="." fragment="themes" id="themes">Themes</h3>
          <ng-sample-box [ts]="demos.colorTheming.component" [html]="demos.colorTheming.html">
            <p>Datepicker comes with some default color schemes.
              You can change it by manipulating <code>containerClass</code> property in <code>bsConfig</code> object</p>
            <p>There are 6 color schemes: <code>theme-default</code>, <code>theme-green</code>, <code>theme-blue</code>,
              <code>theme-dark-blue</code>, <code>theme-red</code>, <code>theme-orange</code></p>
            <demo-datepicker-color-theming></demo-datepicker-color-theming>
          </ng-sample-box>

          <h3 routerLink="." fragment="locales" id="locales">Locales</h3>

          <ng-sample-box [ts]="demos.changeLocale.component" [html]="demos.changeLocale.html">
            <p>Datepicker can use different locales. <br>It's possible to change a locale by changing
              <code>locale</code>
              property in <code>bsConfig</code> object, list of available locales is in dropdown below.</p>
            <p>To use a different locale, you have to import it from <code>ngx-bootstrap/bs-moment</code> and define it
              in your <code>@NgModule</code> using function <code>defineLocale</code></p>
            <p>Example: </p>
            <code>import {{ '{' }} defineLocale {{ '}' }} from 'ngx-bootstrap/bs-moment';</code><br>
            <code>import {{ '{' }} de {{ '}' }} from 'ngx-bootstrap/locale';</code><br>
            <code>defineLocale('de', de));</code>
            <br><br>
            <demo-datepicker-change-locale></demo-datepicker-change-locale>
          </ng-sample-box>

          <h3 routerLink="." fragment="min-max" id="min-max">Min-max</h3>
          <ng-sample-box [ts]="demos.minMax.component" [html]="demos.minMax.html">
            <p>You can set min and max date of datepicker/daterangepicker using <code>minDate</code> and
              <code>maxDate</code> properties</p>
            <p>In the following example <code>minDate</code> is set to yesterday and <code>maxDate</code> to the current
              day in the next week</p>
            <demo-datepicker-min-max></demo-datepicker-min-max>
          </ng-sample-box>

          <h3 routerLink="." fragment="disabled" id="disabled">Disabled (scratch, WIP)</h3>
          <ng-sample-box [ts]="demos.disabled.component" [html]="demos.disabled.html">
            <p>If you want to disable datepicker set is <code>isDisabled</code> property to true</p>
            <demo-datepicker-disabled></demo-datepicker-disabled>
          </ng-sample-box>

          <h3 routerLink="." fragment="forms" id="forms">Forms</h3>
          <ng-sample-box [ts]="demos.forms.component" [html]="demos.forms.html">
            <p>Datepicker and daterangepicker can be used in forms. Keep in mind that value of <code>ngModel</code>
              is <code>Date</code> object (array of 2 object for daterangepicker)</p>
            <demo-datepicker-forms></demo-datepicker-forms>
          </ng-sample-box>

          <h3 routerLink="." fragment="reactive" id="reactive">Reactive forms</h3>
          <ng-sample-box [ts]="demos.reactive.component" [html]="demos.reactive.html">
            <demo-datepicker-reactive-forms></demo-datepicker-reactive-forms>
          </ng-sample-box>

          <h2 routerLink="." fragment="api-reference" id="api-reference">API Reference</h2>
          <ng-api-doc id="bs-datepicker-component" directive="BsDatepickerComponent"></ng-api-doc>
          <ng-api-doc id="bs-daterangepicker-component" directive="BsDaterangepickerComponent"></ng-api-doc>
          <ng-api-doc id="bs-datepicker-config" directive="BsDaterangepickerComponent"></ng-api-doc>
          <ng-api-doc-config routerLink="." fragment="bs-datepicker-config" id="bs-datepicker-config" type="BsDatepickerConfig"></ng-api-doc-config>
        </tab>
        
        <!-- Old datepicker part-->
        <tab heading="Old">
          <br>
          <p>This is a legacy version of datepicker without support of daterangepicker, locales, themes, etc.</p>
          <h2>Contents</h2>
          <ul>
            <li><a routerLink="." fragment="usageOld">Usage</a></li>
            <li><a routerLink="." fragment="examplesOld">Example</a></li>
            <li><a routerLink="." fragment="api-referenceOld">API Reference</a>
              <ul>
                <li><a routerLink="." fragment="datepicker-component">DatePickerComponent</a></li>
              </ul>
            </li>
          </ul>

          <h2 routerLink="." fragment="usageOld" id="usageOld">Usage</h2>

          <p [innerHtml]="oldTitleDoc"></p>

          <h2 routerLink="." fragment="examplesOld" id="examplesOld">Example</h2>
          <ng-sample-box [ts]="demos.old.component" [html]="demos.old.html">
            <datepicker-demo></datepicker-demo>
          </ng-sample-box>

          <h2 routerLink="." fragment="api-referenceOld" id="api-referenceOld">API Reference</h2>
          <ng-api-doc id="datepicker-component" directive="DatePickerComponent"></ng-api-doc>
        </tab>
      </tabset>
    </demo-section>`
})
export class DatepickerSectionComponent {
  name: string = 'Datepicker';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';
  demos: any = DEMOS;
  oldTitleDoc: string = oldTitleDoc;
  titleDoc: string = titleDoc;
}
