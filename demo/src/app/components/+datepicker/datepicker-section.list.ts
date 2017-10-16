import { DemoDatePickerPopupComponent } from './demos/bs-popup/date-picker-popup';
import { DemoDatepickerColorThemingComponent } from './demos/color-theming/color-theming';
import { DemoDatepickerChangeLocaleComponent } from './demos/change-locale/change-locale';
import { DemoDatepickerMinMaxComponent } from './demos/min-max/min-max.component';
import { DemoDatepickerDisabledComponent } from './demos/disabled/disabled.component';
import { DemoDatepickerFormsComponent } from './demos/forms/forms.component';
import { DemoDatepickerReactiveFormsComponent } from './demos/reactive-forms/reactive-forms.component';
import { DatepickerDemoComponent } from './demos/datepicker-demo.component';

export const demoComponentContent = {
  examples: [
    {
      title: 'Basic',
      anchor: 'basic',
      name: 'pop',
      description: `
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
    `,
      outlet: DemoDatePickerPopupComponent
    },
    {
      title: 'Themes',
      anchor: 'themes',
      name: 'colorTheming',
      description: `
      <p>Datepicker comes with some default color schemes.
      You can change it by manipulating <code>containerClass</code> property in <code>bsConfig</code> object</p>
      <p>There are 6 color schemes: <code>theme-default</code>, <code>theme-green</code>, <code>theme-blue</code>,
      <code>theme-dark-blue</code>, <code>theme-red</code>, <code>theme-orange</code></p>
    `,
      outlet: DemoDatepickerColorThemingComponent
    },
    {
      title: 'Locales',
      anchor: 'locales',
      name: 'changeLocale',
      description: `
      <p>Datepicker can use different locales. <br>It's possible to change a locale by changing
        <code>locale</code>
        property in <code>bsConfig</code> object, list of available locales is in dropdown below.</p>
      <p>To use a different locale, you have to import it from <code>ngx-bootstrap/bs-moment</code> and define it
        in your <code>@NgModule</code> using function <code>defineLocale</code></p>
      <p>Example: </p>
      <code>import {{ '{' }} defineLocale {{ '}' }} from 'ngx-bootstrap/bs-moment';</code><br>
      <code>import {{ '{' }} de {{ '}' }} from 'ngx-bootstrap/locale';</code><br>
      <code>defineLocale('de', de));</code>
      <br>
      <br>
    `,
      outlet: DemoDatepickerChangeLocaleComponent
    },
    {
      title: 'Min-max',
      anchor: 'min-max',
      name: 'minMax',
      description: `
      <p>You can set min and max date of datepicker/daterangepicker using <code>minDate</code> and
        <code>maxDate</code> properties</p>
      <p>In the following example <code>minDate</code> is set to yesterday and <code>maxDate</code> to the current
        day in the next week</p>
    `,
      outlet: DemoDatepickerMinMaxComponent
    },
    {
      title: 'Disabled (scratch, WIP)',
      anchor: 'disabled-datepicker',
      name: 'disabled',
      description: `<p>If you want to disable datepicker set <code>isDisabled</code> property to true</p>`,
      outlet: DemoDatepickerDisabledComponent
    },
    {
      title: 'Forms',
      anchor: 'forms',
      name: 'forms',
      description: `<p>Datepicker and daterangepicker can be used in forms. Keep in mind that
      value of <code>ngModel</code> is <code>Date</code> object (array of 2 object for daterangepicker)</p>`,
      outlet: DemoDatepickerFormsComponent
    },
    {
      title: 'Reactive forms',
      anchor: 'reactive-forms',
      name: 'reactive',
      outlet: DemoDatepickerReactiveFormsComponent
    }
  ],
  examplesOld: [
    {
      title: 'Basic',
      anchor: 'basic',
      name: 'old',
      outlet: DatepickerDemoComponent
    }
  ],
  apiSections: [
    {
      title: 'BsDatepickerComponent',
      anchor: 'bs-datepicker-component'
    },
    {
      title: 'BsDaterangepickerComponent',
      anchor: 'bs-daterangepicker-component'
    },
    {
      title: 'BsDaterangepickerComponent',
      anchor: 'bs-datepicker-config'
    },
    {
      title: 'BsDatepickerConfig',
      anchor: 'bs-datepicker-config',
      component: 'config'
    }
  ],
  apiSectionsOld: [
    {
      title: 'DatePickerComponent',
      anchor: 'datepicker-component'
    }
  ]
};
