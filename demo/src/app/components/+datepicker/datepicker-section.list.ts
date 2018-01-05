import { DemoDatePickerPopupComponent } from './demos/bs-popup/date-picker-popup';
import { DemoDatepickerColorThemingComponent } from './demos/color-theming/color-theming';
import { DemoDatepickerChangeLocaleComponent } from './demos/change-locale/change-locale';
import { DemoDatepickerMinMaxComponent } from './demos/min-max/min-max.component';
import { DemoDatepickerDisabledComponent } from './demos/disabled/disabled.component';
import { DemoDatepickerFormsComponent } from './demos/forms/forms.component';
import { DemoDatepickerReactiveFormsComponent } from './demos/reactive-forms/reactive-forms.component';
import { DatepickerDemoComponent } from './demos/datepicker-demo.component';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import {
  NgApiDocComponent,
  NgApiDocConfigComponent
} from '../../docs/api-docs';

export const demoComponentContent: ContentSection[] = [
  {
    name: 'Usage',
    anchor: 'usage',
    outlet: DemoTopSectionComponent,
    content: {
      doc: require('html-loader!markdown-loader!./docs/usage.md')
    }
  },
  {
    name: 'Examples',
    anchor: 'examples',
    outlet: ExamplesComponent,
    content: [
      {
        title: 'Basic',
        anchor: 'basic',
        component: require('!!raw-loader?lang=typescript!./demos/bs-popup/date-picker-popup.ts'),
        html: require('!!raw-loader?lang=markup!./demos/bs-popup/date-picker-popup.html'),
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
        component: require('!!raw-loader?lang=typescript!./demos/color-theming/color-theming.ts'),
        html: require('!!raw-loader?lang=markup!./demos/color-theming/color-theming.html'),
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
        component: require('!!raw-loader?lang=typescript!./demos/change-locale/change-locale.ts'),
        html: require('!!raw-loader?lang=markup!./demos/change-locale/change-locale.html'),
        description: `
          <p>Datepicker can use different locales. <br>It's possible to change a locale by calling
          <code>use</code>
          method of <code>BsLocaleService</code>, list of available locales is in dropdown below.</p>
          <p>To use a different locale, you have to import it from <code>ngx-bootstrap/bs-moment</code> first, then
          define it in your <code>@NgModule</code> using function <code>defineLocale</code></p>
          <p>Example: </p>
          <code>import { defineLocale } from 'ngx-bootstrap/bs-moment';</code><br>
          <code>import { de } from 'ngx-bootstrap/locale';</code><br>
          <code>defineLocale('de', de);</code>
          <br>
          <br>
        `,
        outlet: DemoDatepickerChangeLocaleComponent
      },
      {
        title: 'Min-max',
        anchor: 'min-max',
        component: require('!!raw-loader?lang=typescript!./demos/min-max/min-max.component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/min-max/min-max.component.html'),
        description: `
          <p>You can set min and max date of datepicker/daterangepicker using <code>minDate</code> and
          <code>maxDate</code> properties</p>
          <p>In the following example <code>minDate</code> is set to yesterday and <code>maxDate</code>
          to the current day in the next week</p>`,
        outlet: DemoDatepickerMinMaxComponent
      },
      {
        title: 'Disabled (scratch, WIP)',
        anchor: 'disabled-datepicker',
        component: require('!!raw-loader?lang=typescript!./demos/disabled/disabled.component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/disabled/disabled.component.html'),
        description: `<p>If you want to disable datepicker set <code>isDisabled</code> property to true</p>`,
        outlet: DemoDatepickerDisabledComponent
      },
      {
        title: 'Forms',
        anchor: 'forms',
        component: require('!!raw-loader?lang=typescript!./demos/forms/forms.component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/forms/forms.component.html'),
        description: `<p>Datepicker and daterangepicker can be used in forms. Keep in mind that
          value of <code>ngModel</code> is <code>Date</code> object (array of 2 object for daterangepicker)</p>`,
        outlet: DemoDatepickerFormsComponent
      },
      {
        title: 'Reactive forms',
        anchor: 'reactive-forms',
        component: require('!!raw-loader?lang=typescript!./demos/reactive-forms/reactive-forms.component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/reactive-forms/reactive-forms.component.html'),
        outlet: DemoDatepickerReactiveFormsComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'BsDatepickerDirective',
        anchor: 'bs-datepicker-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'BsDaterangepickerDirective',
        anchor: 'bs-daterangepicker',
        outlet: NgApiDocComponent
      },
      {
        title: 'BsDatepickerConfig',
        anchor: 'bs-datepicker-config',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];

export const demoComponentContentOld: ContentSection[] = [
  {
    name: 'Usage',
    anchor: 'usage',
    outlet: DemoTopSectionComponent,
    content: {
      doc: require('html-loader!markdown-loader!./docs/usageOld.md')
    }
  },
  {
    name: 'Examples',
    anchor: 'examples-old',
    outlet: ExamplesComponent,
    content: [
      {
        title: 'Basic',
        anchor: 'basic-old',
        component: require('!!raw-loader?lang=typescript!./demos/datepicker-demo.component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/datepicker-demo.component.html'),
        outlet: DatepickerDemoComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'DatePickerComponent',
        anchor: 'datepicker-component',
        outlet: NgApiDocComponent
      }
    ]
  }
];
