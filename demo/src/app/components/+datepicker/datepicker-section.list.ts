import { DemoDatepickerBasicComponent } from './demos/basic/basic';
import { DemoDatepickerDateInitialStateComponent } from './demos/date-initial-state/date-initial-state';
import { DemoDatepickerColorThemingComponent } from './demos/color-theming/color-theming';
import { DemoDatepickerChangeLocaleComponent } from './demos/change-locale/change-locale';
import { DemoDatepickerMinMaxComponent } from './demos/min-max/min-max.component';
import { DemoDatepickerDisabledComponent } from './demos/disabled/disabled.component';
import { DemoDatepickerFormsComponent } from './demos/forms/forms.component';
import { DemoDatepickerReactiveFormsComponent } from './demos/reactive-forms/reactive-forms.component';
import { DemoDatepickerConfigMethodComponent } from './demos/config-method/config-method';
import { DemoDatepickerTriggersManualComponent } from './demos/triggers-manual/triggers-manual';
import { DemoDatePickerConfigObjectComponent } from './demos/config-object/config-object';
import { DemoDatepickerOutsideClickComponent } from './demos/outside-click/outside-click';
import { DemoDatepickerByIsOpenPropComponent } from './demos/trigger-by-isopen-property/trigger-by-isopen-property';
import { DatepickerDemoComponent } from './demos/datepicker-demo.component';
import { DemoDatePickerCustomFormatComponent } from './demos/custom-format/custom-format';
import { DemoDatepickerPlacementComponent } from './demos/placement/placement';
import { DemoDatePickerVisibilityEventsComponent } from './demos/visibility-events/visibility-events';
import { DemoDatepickerValueChangeEventComponent } from './demos/value-change-event/value-change-event';
import { DemoDatepickerTriggersCustomComponent } from './demos/triggers-custom/triggers-custom';
import { DemoDatepickerHideOnScrollComponent } from './demos/hide-on-scroll/hide-on-scroll';
import { DemoCustomDatesFooterComponent } from './demos/custom-dates-footer/custom-dates-footer.component';

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
      doc: require('!!raw-loader?lang=typescript!./docs/usage.md')
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
        component: require('!!raw-loader?lang=typescript!./demos/basic/basic.ts'),
        html: require('!!raw-loader?lang=markup!./demos/basic/basic.html'),
        description: `
          <p>Notable change is additional css for it <code> "/datepicker/bs-datepicker.css"</code> <br></p>
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
        outlet: DemoDatepickerBasicComponent
      },
      {
        title: 'Initial state',
        anchor: 'date-initial-state',
        component: require('!!raw-loader?lang=typescript!./demos/date-initial-state/date-initial-state.ts'),
        html: require('!!raw-loader?lang=markup!./demos/date-initial-state/date-initial-state.html'),
        outlet: DemoDatepickerDateInitialStateComponent
      },
      {
        title: 'Custom date format',
        anchor: 'format',
        component: require('!!raw-loader?lang=typescript!./demos/custom-format/custom-format.ts'),
        html: require('!!raw-loader?lang=markup!./demos/custom-format/custom-format.html'),
        description: `
          <p>You can easily change the date format by specifying the <code>dateInputFormat</code>
            in <code>[bsConfig]</code>
          </p>
          <p>To set your own date format you can use variety of formats provided by
          <a href="https://momentjs.com/docs/#/displaying/format/" target="_blank">moment.js</a></p>
          <p>The following examples show how to use several date formats inside a form:
            <ul>
              <li><code>YYYY-MM-DD</code></li>
              <li><code>MM/DD/YYYY</code></li>
              <li><code>MMMM Do YYYY,h:mm:ss a</code></li>
            </ul>
          </p>
        `,
        outlet: DemoDatePickerCustomFormatComponent
      },
      {
        title: 'Hide on scroll',
        anchor: 'hide-on-scroll',
        component: require('!!raw-loader?lang=typescript!./demos/hide-on-scroll/hide-on-scroll.ts'),
        html: require('!!raw-loader?lang=markup!./demos/hide-on-scroll/hide-on-scroll.html'),
        description: `
          <p>Hide the datepicker on page scroll.</p>
        `,
        outlet: DemoDatepickerHideOnScrollComponent
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
          <p>To use a different locale, you have to import it from <code>ngx-bootstrap/chronos</code> first, then
          define it in your <code>@NgModule</code> using function <code>defineLocale</code></p>
          <p>Example: </p>
          <code>import { defineLocale } from 'ngx-bootstrap/chronos';</code><br>
          <code>import { deLocale } from 'ngx-bootstrap/locale';</code><br>
          <code>defineLocale('de', deLocale);</code>
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
        title: 'Custom dates footer',
        anchor: 'custom-dates-footer',
        component: require('!!raw-loader?lang=typescript!./demos/custom-dates-footer/custom-dates-footer.component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/custom-dates-footer/custom-dates-footer.component.html'),
        description: `
          <p>You can set the footer with custom dates using <code>customDates</code> properties</p>
          <p>In the following Datepicker example <code>customDates</code> is set to Today and Max
          <p>And in Daterangepicker example <code>customDates</code> is set to Today, After Month, After Year and Max
          </p>`,
        outlet: DemoCustomDatesFooterComponent
      },
      {
        title: 'Disabled',
        anchor: 'disabled-datepicker',
        component: require('!!raw-loader?lang=typescript!./demos/disabled/disabled.component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/disabled/disabled.component.html'),
        description: `<p>If you want to disable datepicker's or daterangepicker's content set <code>isDisabled</code> property to true</p>`,
        outlet: DemoDatepickerDisabledComponent
      },
      {
        title: 'Forms',
        anchor: 'forms',
        component: require('!!raw-loader?lang=typescript!./demos/forms/forms.component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/forms/forms.component.html'),
        description: `<p>Datepicker and daterangepicker can be used in forms. Keep in mind that
          value of <code>ngModel</code> is <code>Date</code> object for datepicker and array of 2 
          <code>Date</code> objects for daterangepicker</p>`,
        outlet: DemoDatepickerFormsComponent
      },
      {
        title: 'Reactive forms',
        anchor: 'reactive-forms',
        component: require('!!raw-loader?lang=typescript!./demos/reactive-forms/reactive-forms.component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/reactive-forms/reactive-forms.component.html'),
        outlet: DemoDatepickerReactiveFormsComponent
      },
      {
        title: 'Manual triggering',
        anchor: 'triggers-manual',
        component: require('!!raw-loader?lang=typescript!./demos/triggers-manual/triggers-manual.ts'),
        html: require('!!raw-loader?lang=markup!./demos/triggers-manual/triggers-manual.html'),
        description: `<p>You can manage datepicker's state by using its <code>show()</code>, <code>hide()</code>
          and <code>toggle()</code> methods</p>`,
        outlet: DemoDatepickerTriggersManualComponent
      },
      {
        title: 'Placement',
        anchor: 'placement',
        component: require('!!raw-loader?lang=typescript!./demos/placement/placement.ts'),
        html: require('!!raw-loader?lang=markup!./demos/placement/placement.html'),
        description: `<p>Add <code>placement</code> property if you want to change placement</p>`,
        outlet: DemoDatepickerPlacementComponent
      },
      {
        title: 'Config method',
        anchor: 'config-method',
        component: require('!!raw-loader?lang=typescript!./demos/config-method/config-method.ts'),
        html: require('!!raw-loader?lang=markup!./demos/config-method/config-method.html'),
        description: `<p>You can manage datepicker's options by using its <code>setConfig()</code> method</p>`,
        outlet: DemoDatepickerConfigMethodComponent
      },
      {
        title: 'Visibility Events',
        anchor: 'visibility-events',
        component: require('!!raw-loader?lang=typescript!./demos/visibility-events/visibility-events.ts'),
        html: require('!!raw-loader?lang=markup!./demos/visibility-events/visibility-events.html'),
        description: `<p>You can subscribe to datepicker's visibility events</p>`,
        outlet: DemoDatePickerVisibilityEventsComponent
      },
      {
        title: 'Value change event',
        anchor: 'value-change-event',
        component: require('!!raw-loader?lang=typescript!./demos/value-change-event/value-change-event.ts'),
        html: require('!!raw-loader?lang=markup!./demos/value-change-event/value-change-event.html'),
        description: `<p>You can subscribe to datepicker's value change event (<code>bsValueChange</code>).</p>`,
        outlet: DemoDatepickerValueChangeEventComponent
      },
      {
        title: 'Config properties',
        anchor: 'config-object',
        component: require('!!raw-loader?lang=typescript!./demos/config-object/config-object.ts'),
        html: require('!!raw-loader?lang=markup!./demos/config-object/config-object.html'),
        description: `<p>You can configure the datepicker via its <code>bsConfig</code> option</p>`,
        outlet: DemoDatePickerConfigObjectComponent
      },
      {
        title: 'Outside click',
        anchor: 'outside-click',
        component: require('!!raw-loader?lang=typescript!./demos/outside-click/outside-click.ts'),
        html: require('!!raw-loader?lang=markup!./demos/outside-click/outside-click.html'),
        description: `<p>Datepicker closes after outside click by default. To change 
          this behavior, use <code>outsideClick</code> property.</p>`,
        outlet: DemoDatepickerOutsideClickComponent
      },
      {
        title: 'Trigger by isOpen property',
        anchor: 'trigger-by-isopen-property',
        component: require('!!raw-loader?lang=typescript!./demos/trigger-by-isopen-property/trigger-by-isopen-property.ts'),
        html: require('!!raw-loader?lang=markup!./demos/trigger-by-isopen-property/trigger-by-isopen-property.html'),
        description: `<p>Datepicker can be shown or hidden by changing <code>isOpen</code> property</p>`,
        outlet: DemoDatepickerByIsOpenPropComponent
      },
      {
        title: 'Custom triggers',
        anchor: 'triggers-custom',
        component: require('!!raw-loader?lang=typescript!./demos/triggers-custom/triggers-custom.ts'),
        html: require('!!raw-loader?lang=markup!./demos/triggers-custom/triggers-custom.html'),
        description: `<p>Use different triggers ( for example <code>keydown</code>, <code>mouseenter</code> and
          <code>dblclick</code> ) to interact with datepicker</p>`,
        outlet: DemoDatepickerTriggersCustomComponent
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
      doc: require('!!raw-loader?lang=typescript!./docs/usageOld.md')
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

