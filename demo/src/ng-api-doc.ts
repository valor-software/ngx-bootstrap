/* tslint:disable */
export const ngdoc: any = {
  "AccordionPanelComponent": {
    "fileName": "src/accordion/accordion-group.component.ts",
    "className": "AccordionPanelComponent",
    "description": "<h3 id=\"accordion-heading\">Accordion heading</h3>\n<p>Instead of using <code>heading</code> attribute on the <code>accordion-group</code>, you can use\nan <code>accordion-heading</code> attribute on <code>any</code> element inside of a group that\nwill be used as group&#39;s header template.</p>\n",
    "selector": "accordion-group, accordion-panel",
    "inputs": [
      {
        "name": "heading",
        "type": "string",
        "description": "<p>Clickable text in accordion&#39;s group header, check <code>accordion heading</code> below for using html in header </p>\n"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "description": "<p>if <code>true</code> — disables accordion group </p>\n"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "<p>Is accordion group open or closed. This property supports two-way binding </p>\n"
      },
      {
        "name": "panelClass",
        "type": "string",
        "description": "<p>Provides an ability to use Bootstrap&#39;s contextual panel classes\n(<code>panel-primary</code>, <code>panel-success</code>, <code>panel-info</code>, etc...).\nList of all available classes [available here]\n(<a href=\"https://getbootstrap.com/docs/3.3/components/#panels-alternatives\" target=\"_blank\" title=\"null\">https://getbootstrap.com/docs/3.3/components/#panels-alternatives</a>)</p>\n"
      }
    ],
    "outputs": [
      {
        "name": "isOpenChange",
        "description": "<p>Emits when the opened state changes </p>\n"
      }
    ],
    "properties": [],
    "methods": []
  },
  "AccordionComponent": {
    "fileName": "src/accordion/accordion.component.ts",
    "className": "AccordionComponent",
    "description": "<p>Displays collapsible content panels for presenting information in a limited amount of space. </p>\n",
    "selector": "accordion",
    "inputs": [
      {
        "name": "closeOthers",
        "type": "boolean",
        "description": "<p>if <code>true</code> expanding one item will close all others </p>\n"
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "AccordionConfig": {
    "fileName": "src/accordion/accordion.config.ts",
    "className": "AccordionConfig",
    "description": "<p>Configuration service, provides default values for the AccordionComponent.</p>\n",
    "methods": [],
    "properties": [
      {
        "name": "closeOthers",
        "defaultValue": "false",
        "type": "Boolean",
        "description": "<p>Whether the other panels should be closed when a panel is opened </p>\n"
      }
    ]
  },
  "AlertComponent": {
    "fileName": "src/alert/alert.component.ts",
    "className": "AlertComponent",
    "description": "",
    "selector": "alert,bs-alert",
    "inputs": [
      {
        "name": "dismissible",
        "defaultValue": "false",
        "type": "boolean",
        "description": "<p>If set, displays an inline &quot;Close&quot; button </p>\n"
      },
      {
        "name": "dismissOnTimeout",
        "type": "string | number",
        "description": "<p>Number in milliseconds, after which alert will be closed </p>\n"
      },
      {
        "name": "isOpen",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>Is alert visible </p>\n"
      },
      {
        "name": "type",
        "defaultValue": "warning",
        "type": "string",
        "description": "<p>Alert type.\nProvides one of four bootstrap supported contextual classes:\n<code>success</code>, <code>info</code>, <code>warning</code> and <code>danger</code></p>\n"
      }
    ],
    "outputs": [
      {
        "name": "onClose",
        "description": "<p>This event fires immediately after close instance method is called,\n$event is an instance of Alert component.</p>\n"
      },
      {
        "name": "onClosed",
        "description": "<p>This event fires when alert closed, $event is an instance of Alert component </p>\n"
      }
    ],
    "properties": [],
    "methods": [
      {
        "name": "close",
        "description": "<p>Closes an alert by removing it from the DOM.</p>\n",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "AlertConfig": {
    "fileName": "src/alert/alert.config.ts",
    "className": "AlertConfig",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "dismissible",
        "defaultValue": "false",
        "type": "boolean",
        "description": "<p>is alerts are dismissible by default </p>\n"
      },
      {
        "name": "dismissOnTimeout",
        "defaultValue": "undefined",
        "type": "number",
        "description": "<p>default time before alert will dismiss </p>\n"
      },
      {
        "name": "type",
        "defaultValue": "warning",
        "type": "string",
        "description": "<p>default alert type </p>\n"
      }
    ]
  },
  "ButtonCheckboxDirective": {
    "fileName": "src/buttons/button-checkbox.directive.ts",
    "className": "ButtonCheckboxDirective",
    "description": "<p>Add checkbox functionality to any element</p>\n",
    "selector": "[btnCheckbox]",
    "inputs": [
      {
        "name": "btnCheckboxFalse",
        "defaultValue": "false",
        "type": "any",
        "description": "<p>Falsy value, will be set to ngModel </p>\n"
      },
      {
        "name": "btnCheckboxTrue",
        "defaultValue": "true",
        "type": "any",
        "description": "<p>Truthy value, will be set to ngModel </p>\n"
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "ButtonRadioGroupDirective": {
    "fileName": "src/buttons/button-radio-group.directive.ts",
    "className": "ButtonRadioGroupDirective",
    "description": "<p>A group of radio buttons.\nA value of a selected button is bound to a variable specified via ngModel.</p>\n",
    "selector": "[btnRadioGroup]",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "ButtonRadioDirective": {
    "fileName": "src/buttons/button-radio.directive.ts",
    "className": "ButtonRadioDirective",
    "description": "<p>Create radio buttons or groups of buttons.\nA value of a selected button is bound to a variable specified via ngModel.</p>\n",
    "selector": "[btnRadio]",
    "inputs": [
      {
        "name": "btnRadio",
        "type": "any",
        "description": "<p>Radio button value, will be set to <code>ngModel</code> </p>\n"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "description": "<p>If <code>true</code> — radio button is disabled </p>\n"
      },
      {
        "name": "uncheckable",
        "type": "boolean",
        "description": "<p>If <code>true</code> — radio button can be unchecked </p>\n"
      },
      {
        "name": "value",
        "type": "any",
        "description": "<p>Current value of radio component or group </p>\n"
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "CarouselComponent": {
    "fileName": "src/carousel/carousel.component.ts",
    "className": "CarouselComponent",
    "description": "<p>Base element to create carousel</p>\n",
    "selector": "carousel",
    "inputs": [
      {
        "name": "activeSlide",
        "type": "number",
        "description": "<p>Index of currently displayed slide(started for 0) </p>\n"
      },
      {
        "name": "interval",
        "type": "number",
        "description": "<p>Delay of item cycling in milliseconds. If false, carousel won&#39;t cycle\nautomatically.</p>\n"
      },
      {
        "name": "noPause",
        "type": "boolean",
        "description": "<p>If <code>true</code> — will disable pausing on carousel mouse hover </p>\n"
      },
      {
        "name": "noWrap",
        "type": "boolean",
        "description": "<p>If <code>true</code> — carousel will not cycle continuously and will have hard stops (prevent looping) </p>\n"
      },
      {
        "name": "showIndicators",
        "type": "boolean",
        "description": "<p>If <code>true</code> — carousel-indicators are visible  </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "activeSlideChange",
        "description": "<p>Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property </p>\n"
      }
    ],
    "properties": [
      {
        "name": "activeSlide",
        "type": "number",
        "description": "<p>Index of currently displayed slide(started for 0) </p>\n"
      }
    ],
    "methods": [
      {
        "name": "addSlide",
        "description": "<p>Adds new slide. If this slide is first in collection - set it as active\nand starts auto changing</p>\n",
        "args": [
          {
            "name": "slide",
            "type": "SlideComponent"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "removeSlide",
        "description": "<p>Removes specified slide. If this slide is active - will roll to another\nslide</p>\n",
        "args": [
          {
            "name": "slide",
            "type": "SlideComponent"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "nextSlide",
        "description": "<p>Rolling to next slide</p>\n",
        "args": [
          {
            "name": "force",
            "type": "boolean"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "previousSlide",
        "description": "<p>Rolling to previous slide</p>\n",
        "args": [
          {
            "name": "force",
            "type": "boolean"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "selectSlide",
        "description": "<p>Rolling to specified slide</p>\n",
        "args": [
          {
            "name": "index",
            "type": "number"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "play",
        "description": "<p>Starts a auto changing of slides</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "pause",
        "description": "<p>Stops a auto changing of slides</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "getCurrentSlideIndex",
        "description": "<p>Finds and returns index of currently displayed slide</p>\n",
        "args": [],
        "returnType": "number"
      },
      {
        "name": "isLast",
        "description": "<p>Defines, whether the specified index is last in collection</p>\n",
        "args": [
          {
            "name": "index",
            "type": "number"
          }
        ],
        "returnType": "boolean"
      },
      {
        "name": "findNextSlideIndex",
        "description": "<p>Defines next slide index, depending of direction</p>\n",
        "args": [
          {
            "name": "direction",
            "type": "Direction"
          },
          {
            "name": "force",
            "type": "boolean"
          }
        ],
        "returnType": "number"
      },
      {
        "name": "_select",
        "description": "<p>Sets a slide, which specified through index, as active</p>\n",
        "args": [
          {
            "name": "index",
            "type": "number"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "restartTimer",
        "description": "<p>Starts loop of auto changing of slides</p>\n",
        "args": [],
        "returnType": "any"
      },
      {
        "name": "resetTimer",
        "description": "<p>Stops loop of auto changing of slides</p>\n",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "CarouselConfig": {
    "fileName": "src/carousel/carousel.config.ts",
    "className": "CarouselConfig",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "interval",
        "defaultValue": "5000",
        "type": "number",
        "description": "<p>Default interval of auto changing of slides </p>\n"
      },
      {
        "name": "noPause",
        "defaultValue": "false",
        "type": "boolean",
        "description": "<p>Is loop of auto changing of slides can be paused </p>\n"
      },
      {
        "name": "noWrap",
        "defaultValue": "false",
        "type": "boolean",
        "description": "<p>Is slides can wrap from the last to the first slide </p>\n"
      },
      {
        "name": "showIndicators",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>Show carousel-indicators </p>\n"
      }
    ]
  },
  "SlideComponent": {
    "fileName": "src/carousel/slide.component.ts",
    "className": "SlideComponent",
    "description": "",
    "selector": "slide",
    "inputs": [
      {
        "name": "active",
        "type": "boolean",
        "description": "<p>Is current slide active </p>\n"
      }
    ],
    "outputs": [],
    "properties": [
      {
        "name": "addClass",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>Wraps element by appropriate CSS classes </p>\n"
      },
      {
        "name": "carousel",
        "type": "CarouselComponent",
        "description": "<p>Link to Parent(container-collection) component </p>\n"
      }
    ],
    "methods": []
  },
  "DateParsingConfig": {
    "fileName": "src/chronos/create/parsing.types.ts",
    "className": "DateParsingConfig",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "_a",
        "type": "number[]",
        "description": "<p>DateArray [year, month, date, .....] </p>\n"
      },
      {
        "name": "_changeInProgress",
        "type": "boolean",
        "description": "<p>used in set offset </p>\n"
      },
      {
        "name": "_d",
        "type": "Date",
        "description": "<p>date value </p>\n"
      },
      {
        "name": "_f",
        "type": "string | string[]",
        "description": "<p>date format </p>\n"
      },
      {
        "name": "_i",
        "type": "DateInput",
        "description": "<p>input to parse: could be string, number[], number, Date, object </p>\n"
      },
      {
        "name": "_isPm",
        "type": "boolean",
        "description": "<p>is PM </p>\n"
      },
      {
        "name": "_isValid",
        "type": "boolean",
        "description": "<p>is valid </p>\n"
      },
      {
        "name": "_l",
        "type": "string",
        "description": "<p>locale key, &#39;en&#39; by default </p>\n"
      },
      {
        "name": "_locale",
        "type": "Locale",
        "description": "<p>date locale obj </p>\n"
      },
      {
        "name": "_meridiem",
        "type": "string",
        "description": "<p>date meridiem </p>\n"
      },
      {
        "name": "_nextDay",
        "type": "boolean",
        "description": "<p>add one day to result at the end of parsing </p>\n"
      },
      {
        "name": "_offset",
        "type": "number",
        "description": "<p>utc time offset </p>\n"
      },
      {
        "name": "_pf",
        "type": "DateParsingFlags",
        "description": "<p>date parsing flags </p>\n"
      },
      {
        "name": "_strict",
        "type": "boolean",
        "description": "<p>use strict parse format </p>\n"
      },
      {
        "name": "_tzm",
        "type": "number",
        "description": "<p>time zone </p>\n"
      },
      {
        "name": "_w",
        "type": "WeekParsing",
        "description": "<p>date specific info \nweek </p>\n"
      }
    ]
  },
  "DateParsingFlags": {
    "fileName": "src/chronos/create/parsing.types.ts",
    "className": "DateParsingFlags",
    "description": "",
    "methods": [],
    "properties": []
  },
  "LocaleOptionsFormat": {
    "fileName": "src/chronos/locale/locale.class.ts",
    "className": "LocaleOptionsFormat",
    "description": "",
    "methods": [],
    "properties": []
  },
  "LocaleData": {
    "fileName": "src/chronos/locale/locale.class.ts",
    "className": "LocaleData",
    "description": "",
    "methods": [],
    "properties": []
  },
  "CalendarSpec": {
    "fileName": "src/chronos/moment/calendar.ts",
    "className": "CalendarSpec",
    "description": "",
    "methods": [],
    "properties": []
  },
  "MomentFn": {
    "fileName": "src/chronos/test/chain.ts",
    "className": "MomentFn",
    "description": "",
    "methods": [],
    "properties": []
  },
  "MomentInputObject": {
    "fileName": "src/chronos/test/chain.ts",
    "className": "MomentInputObject",
    "description": "",
    "methods": [],
    "properties": []
  },
  "TimeUnit": {
    "fileName": "src/chronos/types.ts",
    "className": "TimeUnit",
    "description": "",
    "methods": [],
    "properties": []
  },
  "DateFormatterOptions": {
    "fileName": "src/chronos/types.ts",
    "className": "DateFormatterOptions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "DateObject": {
    "fileName": "src/chronos/types.ts",
    "className": "DateObject",
    "description": "",
    "methods": [],
    "properties": []
  },
  "WeekParsing": {
    "fileName": "src/chronos/types.ts",
    "className": "WeekParsing",
    "description": "",
    "methods": [],
    "properties": []
  },
  "CollapseDirective": {
    "fileName": "src/collapse/collapse.directive.ts",
    "className": "CollapseDirective",
    "description": "",
    "selector": "[collapse]",
    "exportAs": "bs-collapse",
    "inputs": [
      {
        "name": "collapse",
        "type": "boolean",
        "description": "<p>A flag indicating visibility of content (shown or hidden) </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "collapsed",
        "description": "<p>This event fires as soon as content collapses </p>\n"
      },
      {
        "name": "expanded",
        "description": "<p>This event fires as soon as content becomes visible </p>\n"
      }
    ],
    "properties": [
      {
        "name": "collapse",
        "type": "boolean",
        "description": "<p>A flag indicating visibility of content (shown or hidden) </p>\n"
      }
    ],
    "methods": [
      {
        "name": "toggle",
        "description": "<p>allows to manually toggle content visibility </p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "<p>allows to manually hide content </p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "show",
        "description": "<p>allows to manually show collapsed content </p>\n",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "ComponentLoaderFactory": {
    "fileName": "src/component-loader/component-loader.factory.ts",
    "className": "ComponentLoaderFactory",
    "description": "",
    "methods": [],
    "properties": []
  },
  "ListenOptions": {
    "fileName": "src/component-loader/listen-options.model.ts",
    "className": "ListenOptions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BsDatepickerInputDirective": {
    "fileName": "src/datepicker/bs-datepicker-input.directive.ts",
    "className": "BsDatepickerInputDirective",
    "description": "",
    "selector": "input[bsDatepicker]",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDatepickerDirective": {
    "fileName": "src/datepicker/bs-datepicker.component.ts",
    "className": "BsDatepickerDirective",
    "description": "",
    "selector": "[bsDatepicker]",
    "exportAs": "bsDatepicker",
    "inputs": [
      {
        "name": "bsConfig",
        "type": "Partial<BsDatepickerConfig>",
        "description": "<p>Config object for datepicker</p>\n"
      },
      {
        "name": "bsValue",
        "type": "Date",
        "description": "<p>Initial value of datepicker</p>\n"
      },
      {
        "name": "container",
        "defaultValue": "body",
        "type": "string",
        "description": "<p>A selector specifying the element the datepicker should be appended to.\nCurrently only supports &quot;body&quot;.</p>\n"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "description": "<p>Indicates whether datepicker is enabled or not</p>\n"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "<p>Returns whether or not the datepicker is currently being shown</p>\n"
      },
      {
        "name": "maxDate",
        "type": "Date",
        "description": "<p>Maximum date which is available for selection</p>\n"
      },
      {
        "name": "minDate",
        "type": "Date",
        "description": "<p>Minimum date which is available for selection</p>\n"
      },
      {
        "name": "outsideClick",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>Close datepicker on outside click</p>\n"
      },
      {
        "name": "placement",
        "defaultValue": "bottom",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "description": "<p>Placement of a datepicker. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;</p>\n"
      },
      {
        "name": "triggers",
        "defaultValue": "click",
        "type": "string",
        "description": "<p>Specifies events that should trigger. Supports a space separated list of\nevent names.</p>\n"
      }
    ],
    "outputs": [
      {
        "name": "bsValueChange",
        "description": "<p>Emits when datepicker value has been changed</p>\n"
      },
      {
        "name": "onHidden",
        "description": "<p>Emits an event when the datepicker is hidden</p>\n"
      },
      {
        "name": "onShown",
        "description": "<p>Emits an event when the datepicker is shown</p>\n"
      }
    ],
    "properties": [],
    "methods": [
      {
        "name": "show",
        "description": "<p>Opens an element’s datepicker. This is considered a “manual” triggering of\nthe datepicker.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "<p>Closes an element’s datepicker. This is considered a “manual” triggering of\nthe datepicker.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "toggle",
        "description": "<p>Toggles an element’s datepicker. This is considered a “manual” triggering\nof the datepicker.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "setConfig",
        "description": "<p>Set config for datepicker</p>\n",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "BsDatepickerConfig": {
    "fileName": "src/datepicker/bs-datepicker.config.ts",
    "className": "BsDatepickerConfig",
    "description": "<p>For date range picker there are <code>BsDaterangepickerConfig</code> which inherits all properties,\nexcept <code>displayMonths</code>, for range picker it default to <code>2</code></p>\n",
    "methods": [],
    "properties": [
      {
        "name": "containerClass",
        "defaultValue": "theme-green",
        "type": "string",
        "description": "<p>CSS class which will be applied to datepicker container,\nusually used to set color theme</p>\n"
      },
      {
        "name": "maxDate",
        "type": "Date",
        "description": "<p>Default max date for all date/range pickers</p>\n"
      },
      {
        "name": "minDate",
        "type": "Date",
        "description": "<p>Default min date for all date/range pickers</p>\n"
      },
      {
        "name": "showWeekNumbers",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>Allows to hide week numbers in datepicker</p>\n"
      }
    ]
  },
  "BsDaterangepickerInputDirective": {
    "fileName": "src/datepicker/bs-daterangepicker-input.directive.ts",
    "className": "BsDaterangepickerInputDirective",
    "description": "",
    "selector": "input[bsDaterangepicker]",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDaterangepickerDirective": {
    "fileName": "src/datepicker/bs-daterangepicker.component.ts",
    "className": "BsDaterangepickerDirective",
    "description": "",
    "selector": "[bsDaterangepicker]",
    "exportAs": "bsDaterangepicker",
    "inputs": [
      {
        "name": "bsConfig",
        "type": "Partial<BsDaterangepickerConfig>",
        "description": "<p>Config object for daterangepicker</p>\n"
      },
      {
        "name": "bsValue",
        "type": "Date[]",
        "description": "<p>Initial value of daterangepicker</p>\n"
      },
      {
        "name": "container",
        "defaultValue": "body",
        "type": "string",
        "description": "<p>A selector specifying the element the daterangepicker should be appended\nto. Currently only supports &quot;body&quot;.</p>\n"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "description": "<p>Indicates whether daterangepicker is enabled or not</p>\n"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "<p>Returns whether or not the daterangepicker is currently being shown</p>\n"
      },
      {
        "name": "maxDate",
        "type": "Date",
        "description": "<p>Maximum date which is available for selection</p>\n"
      },
      {
        "name": "minDate",
        "type": "Date",
        "description": "<p>Minimum date which is available for selection</p>\n"
      },
      {
        "name": "outsideClick",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>Close daterangepicker on outside click</p>\n"
      },
      {
        "name": "placement",
        "defaultValue": "bottom",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "description": "<p>Placement of a daterangepicker. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;</p>\n"
      },
      {
        "name": "triggers",
        "defaultValue": "click",
        "type": "string",
        "description": "<p>Specifies events that should trigger. Supports a space separated list of\nevent names.</p>\n"
      }
    ],
    "outputs": [
      {
        "name": "bsValueChange",
        "description": "<p>Emits when daterangepicker value has been changed</p>\n"
      },
      {
        "name": "onHidden",
        "description": "<p>Emits an event when the daterangepicker is hidden</p>\n"
      },
      {
        "name": "onShown",
        "description": "<p>Emits an event when the daterangepicker is shown</p>\n"
      }
    ],
    "properties": [],
    "methods": [
      {
        "name": "show",
        "description": "<p>Opens an element’s datepicker. This is considered a “manual” triggering of\nthe datepicker.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "setConfig",
        "description": "<p>Set config for daterangepicker</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "<p>Closes an element’s datepicker. This is considered a “manual” triggering of\nthe datepicker.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "toggle",
        "description": "<p>Toggles an element’s datepicker. This is considered a “manual” triggering\nof the datepicker.</p>\n",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "BsDaterangepickerConfig": {
    "fileName": "src/datepicker/bs-daterangepicker.config.ts",
    "className": "BsDaterangepickerConfig",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BsLocaleService": {
    "fileName": "src/datepicker/bs-locale.service.ts",
    "className": "BsLocaleService",
    "description": "",
    "methods": [],
    "properties": []
  },
  "DatePickerInnerComponent": {
    "fileName": "src/datepicker/datepicker-inner.component.ts",
    "className": "DatePickerInnerComponent",
    "description": "",
    "selector": "datepicker-inner",
    "inputs": [
      {
        "name": "activeDate",
        "type": "Date",
        "description": ""
      },
      {
        "name": "customClass",
        "type": "{ date: Date; mode: string; clazz: string; }[]",
        "description": ""
      },
      {
        "name": "dateDisabled",
        "type": "{ date: Date; mode: string; }[]",
        "description": ""
      },
      {
        "name": "datepickerMode",
        "type": "string",
        "description": ""
      },
      {
        "name": "dayDisabled",
        "type": "number[]",
        "description": ""
      },
      {
        "name": "formatDay",
        "type": "string",
        "description": ""
      },
      {
        "name": "formatDayHeader",
        "type": "string",
        "description": ""
      },
      {
        "name": "formatDayTitle",
        "type": "string",
        "description": ""
      },
      {
        "name": "formatMonth",
        "type": "string",
        "description": ""
      },
      {
        "name": "formatMonthTitle",
        "type": "string",
        "description": ""
      },
      {
        "name": "formatYear",
        "type": "string",
        "description": ""
      },
      {
        "name": "initDate",
        "type": "Date",
        "description": ""
      },
      {
        "name": "locale",
        "type": "string",
        "description": ""
      },
      {
        "name": "maxDate",
        "type": "Date",
        "description": ""
      },
      {
        "name": "maxMode",
        "type": "string",
        "description": ""
      },
      {
        "name": "minDate",
        "type": "Date",
        "description": ""
      },
      {
        "name": "minMode",
        "type": "string",
        "description": ""
      },
      {
        "name": "monthColLimit",
        "type": "number",
        "description": ""
      },
      {
        "name": "onlyCurrentMonth",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "shortcutPropagation",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "showWeeks",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "startingDay",
        "type": "number",
        "description": ""
      },
      {
        "name": "yearColLimit",
        "type": "number",
        "description": ""
      },
      {
        "name": "yearRange",
        "type": "number",
        "description": ""
      }
    ],
    "outputs": [
      {
        "name": "activeDateChange",
        "description": ""
      },
      {
        "name": "selectionDone",
        "description": ""
      },
      {
        "name": "update",
        "description": ""
      }
    ],
    "properties": [],
    "methods": []
  },
  "DatePickerComponent": {
    "fileName": "src/datepicker/datepicker.component.ts",
    "className": "DatePickerComponent",
    "description": "",
    "selector": "datepicker",
    "inputs": [
      {
        "name": "activeDate",
        "type": "Date",
        "description": "<p>currently active date </p>\n"
      },
      {
        "name": "customClass",
        "type": "{ date: Date; mode: string; clazz: string; }[]",
        "description": "<p>array of custom css classes to be applied to targeted dates </p>\n"
      },
      {
        "name": "dateDisabled",
        "type": "{ date: Date; mode: string; }[]",
        "description": "<p>array of disabled dates </p>\n"
      },
      {
        "name": "datepickerMode",
        "defaultValue": "day",
        "type": "string",
        "description": "<p>sets datepicker mode, supports: <code>day</code>, <code>month</code>, <code>year</code> </p>\n"
      },
      {
        "name": "dayDisabled",
        "type": "number[]",
        "description": "<p>disabled days of the week from 0-6 (0=Sunday, ..., 6=Saturday) </p>\n"
      },
      {
        "name": "formatDay",
        "type": "string",
        "description": "<p>format of day in month </p>\n"
      },
      {
        "name": "formatDayHeader",
        "type": "string",
        "description": "<p>format of day in week header </p>\n"
      },
      {
        "name": "formatDayTitle",
        "type": "string",
        "description": "<p>format of title when selecting day </p>\n"
      },
      {
        "name": "formatMonth",
        "type": "string",
        "description": "<p>format of month in year </p>\n"
      },
      {
        "name": "formatMonthTitle",
        "type": "string",
        "description": "<p>format of title when selecting month </p>\n"
      },
      {
        "name": "formatYear",
        "type": "string",
        "description": "<p>format of year in year range </p>\n"
      },
      {
        "name": "initDate",
        "type": "Date",
        "description": "<p>default date to show if <code>ng-model</code> value is not specified </p>\n"
      },
      {
        "name": "maxDate",
        "type": "Date",
        "description": "<p>latest selectable date </p>\n"
      },
      {
        "name": "maxMode",
        "type": "string",
        "description": "<p>sets upper datepicker mode, supports: <code>day</code>, <code>month</code>, <code>year</code> </p>\n"
      },
      {
        "name": "minDate",
        "type": "Date",
        "description": "<p>oldest selectable date </p>\n"
      },
      {
        "name": "minMode",
        "type": "string",
        "description": "<p>set lower datepicker mode, supports: <code>day</code>, <code>month</code>, <code>year</code> </p>\n"
      },
      {
        "name": "monthColLimit",
        "type": "number",
        "description": "<p>number of months displayed in a single row of month picker </p>\n"
      },
      {
        "name": "onlyCurrentMonth",
        "type": "boolean",
        "description": "<p>if true only dates from the currently displayed month will be shown </p>\n"
      },
      {
        "name": "shortcutPropagation",
        "type": "boolean",
        "description": "<p>if true shortcut`s event propagation will be disabled </p>\n"
      },
      {
        "name": "showWeeks",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>if false week numbers will be hidden </p>\n"
      },
      {
        "name": "startingDay",
        "type": "number",
        "description": "<p>starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday) </p>\n"
      },
      {
        "name": "yearColLimit",
        "type": "number",
        "description": "<p>number of years displayed in a single row of year picker </p>\n"
      },
      {
        "name": "yearRange",
        "type": "number",
        "description": "<p>number of years displayed in year selection </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "activeDateChange",
        "description": "<p>callback to invoke when the activeDate is changed. </p>\n"
      },
      {
        "name": "selectionDone",
        "description": ""
      }
    ],
    "properties": [],
    "methods": []
  },
  "DatepickerConfig": {
    "fileName": "src/datepicker/datepicker.config.ts",
    "className": "DatepickerConfig",
    "description": "",
    "methods": [],
    "properties": []
  },
  "DayPickerComponent": {
    "fileName": "src/datepicker/daypicker.component.ts",
    "className": "DayPickerComponent",
    "description": "",
    "selector": "daypicker",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "FlagDaysCalendarOptions": {
    "fileName": "src/datepicker/engine/flag-days-calendar.ts",
    "className": "FlagDaysCalendarOptions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "FlagMonthCalendarOptions": {
    "fileName": "src/datepicker/engine/flag-months-calendar.ts",
    "className": "FlagMonthCalendarOptions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "FlagYearsCalendarOptions": {
    "fileName": "src/datepicker/engine/flag-years-calendar.ts",
    "className": "FlagYearsCalendarOptions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "NavigationViewModel": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "NavigationViewModel",
    "description": "<hr>\n",
    "methods": [],
    "properties": []
  },
  "CalendarCellViewModel": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "CalendarCellViewModel",
    "description": "",
    "methods": [],
    "properties": []
  },
  "DayViewModel": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "DayViewModel",
    "description": "<hr>\n",
    "methods": [],
    "properties": []
  },
  "WeekViewModel": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "WeekViewModel",
    "description": "",
    "methods": [],
    "properties": []
  },
  "DaysCalendarViewModel": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "DaysCalendarViewModel",
    "description": "",
    "methods": [],
    "properties": []
  },
  "MonthsCalendarViewModel": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "MonthsCalendarViewModel",
    "description": "<hr>\n",
    "methods": [],
    "properties": []
  },
  "YearsCalendarViewModel": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "YearsCalendarViewModel",
    "description": "<hr>\n",
    "methods": [],
    "properties": []
  },
  "DaysCalendarModel": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "DaysCalendarModel",
    "description": "<hr>\n<hr>\n",
    "methods": [],
    "properties": []
  },
  "MonthViewOptions": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "MonthViewOptions",
    "description": "<hr>\n",
    "methods": [],
    "properties": []
  },
  "DatepickerFormatOptions": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "DatepickerFormatOptions",
    "description": "<hr>\n",
    "methods": [],
    "properties": []
  },
  "DatepickerRenderOptions": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "DatepickerRenderOptions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BsNavigationEvent": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "BsNavigationEvent",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BsViewNavigationEvent": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "BsViewNavigationEvent",
    "description": "",
    "methods": [],
    "properties": []
  },
  "CellHoverEvent": {
    "fileName": "src/datepicker/models/index.ts",
    "className": "CellHoverEvent",
    "description": "",
    "methods": [],
    "properties": []
  },
  "MonthPickerComponent": {
    "fileName": "src/datepicker/monthpicker.component.ts",
    "className": "MonthPickerComponent",
    "description": "",
    "selector": "monthpicker",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDatepickerActions": {
    "fileName": "src/datepicker/reducer/bs-datepicker.actions.ts",
    "className": "BsDatepickerActions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BsDatepickerEffects": {
    "fileName": "src/datepicker/reducer/bs-datepicker.effects.ts",
    "className": "BsDatepickerEffects",
    "description": "",
    "methods": [
      {
        "name": "setValue",
        "description": "<p>setters </p>\n",
        "args": [
          {
            "name": "value",
            "type": "Date"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "setBindings",
        "description": "<p>view to mode bindings </p>\n",
        "args": [
          {
            "name": "container",
            "type": "BsDatepickerAbstractComponent"
          }
        ],
        "returnType": "BsDatepickerEffects"
      },
      {
        "name": "setEventHandlers",
        "description": "<p>event handlers </p>\n",
        "args": [
          {
            "name": "container",
            "type": "BsDatepickerAbstractComponent"
          }
        ],
        "returnType": "BsDatepickerEffects"
      }
    ],
    "properties": []
  },
  "BsDatepickerViewState": {
    "fileName": "src/datepicker/reducer/bs-datepicker.state.ts",
    "className": "BsDatepickerViewState",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BsDatepickerStore": {
    "fileName": "src/datepicker/reducer/bs-datepicker.store.ts",
    "className": "BsDatepickerStore",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BsCalendarLayoutComponent": {
    "fileName": "src/datepicker/themes/bs/bs-calendar-layout.component.ts",
    "className": "BsCalendarLayoutComponent",
    "description": "",
    "selector": "bs-calendar-layout",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsCurrentDateViewComponent": {
    "fileName": "src/datepicker/themes/bs/bs-current-date-view.component.ts",
    "className": "BsCurrentDateViewComponent",
    "description": "",
    "selector": "bs-current-date",
    "inputs": [
      {
        "name": "title",
        "type": "string",
        "description": ""
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsCustomDates": {
    "fileName": "src/datepicker/themes/bs/bs-custom-dates-view.component.ts",
    "className": "BsCustomDates",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BsCustomDatesViewComponent": {
    "fileName": "src/datepicker/themes/bs/bs-custom-dates-view.component.ts",
    "className": "BsCustomDatesViewComponent",
    "description": "",
    "selector": "bs-custom-date-view",
    "inputs": [
      {
        "name": "isCustomRangeShown",
        "type": "true",
        "description": ""
      },
      {
        "name": "ranges",
        "type": "BsCustomDates[]",
        "description": ""
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDatepickerContainerComponent": {
    "fileName": "src/datepicker/themes/bs/bs-datepicker-container.component.ts",
    "className": "BsDatepickerContainerComponent",
    "description": "",
    "selector": "bs-datepicker-container",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDatepickerDayDecoratorComponent": {
    "fileName": "src/datepicker/themes/bs/bs-datepicker-day-decorator.directive.ts",
    "className": "BsDatepickerDayDecoratorComponent",
    "description": "",
    "selector": "[bsDatepickerDayDecorator]",
    "inputs": [
      {
        "name": "day",
        "type": "DayViewModel",
        "description": ""
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDatepickerNavigationViewComponent": {
    "fileName": "src/datepicker/themes/bs/bs-datepicker-navigation-view.component.ts",
    "className": "BsDatepickerNavigationViewComponent",
    "description": "",
    "selector": "bs-datepicker-navigation-view",
    "inputs": [
      {
        "name": "calendar",
        "type": "DaysCalendarViewModel",
        "description": ""
      }
    ],
    "outputs": [
      {
        "name": "onNavigate",
        "description": ""
      },
      {
        "name": "onViewMode",
        "description": ""
      }
    ],
    "properties": [],
    "methods": []
  },
  "BsDaterangepickerContainerComponent": {
    "fileName": "src/datepicker/themes/bs/bs-daterangepicker-container.component.ts",
    "className": "BsDaterangepickerContainerComponent",
    "description": "",
    "selector": "bs-daterangepicker-container",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDaysCalendarViewComponent": {
    "fileName": "src/datepicker/themes/bs/bs-days-calendar-view.component.ts",
    "className": "BsDaysCalendarViewComponent",
    "description": "",
    "selector": "bs-days-calendar-view",
    "inputs": [
      {
        "name": "calendar",
        "type": "DaysCalendarViewModel",
        "description": ""
      },
      {
        "name": "options",
        "type": "DatepickerRenderOptions",
        "description": ""
      }
    ],
    "outputs": [
      {
        "name": "onHover",
        "description": ""
      },
      {
        "name": "onNavigate",
        "description": ""
      },
      {
        "name": "onSelect",
        "description": ""
      },
      {
        "name": "onViewMode",
        "description": ""
      }
    ],
    "properties": [],
    "methods": []
  },
  "BsMonthCalendarViewComponent": {
    "fileName": "src/datepicker/themes/bs/bs-months-calendar-view.component.ts",
    "className": "BsMonthCalendarViewComponent",
    "description": "",
    "selector": "bs-month-calendar-view",
    "inputs": [
      {
        "name": "calendar",
        "type": "MonthsCalendarViewModel",
        "description": ""
      }
    ],
    "outputs": [
      {
        "name": "onHover",
        "description": ""
      },
      {
        "name": "onNavigate",
        "description": ""
      },
      {
        "name": "onSelect",
        "description": ""
      },
      {
        "name": "onViewMode",
        "description": ""
      }
    ],
    "properties": [],
    "methods": []
  },
  "BsTimepickerViewComponent": {
    "fileName": "src/datepicker/themes/bs/bs-timepicker-view.component.ts",
    "className": "BsTimepickerViewComponent",
    "description": "",
    "selector": "bs-timepicker",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsYearsCalendarViewComponent": {
    "fileName": "src/datepicker/themes/bs/bs-years-calendar-view.component.ts",
    "className": "BsYearsCalendarViewComponent",
    "description": "",
    "selector": "bs-years-calendar-view",
    "inputs": [
      {
        "name": "calendar",
        "type": "YearsCalendarViewModel",
        "description": ""
      }
    ],
    "outputs": [
      {
        "name": "onHover",
        "description": ""
      },
      {
        "name": "onNavigate",
        "description": ""
      },
      {
        "name": "onSelect",
        "description": ""
      },
      {
        "name": "onViewMode",
        "description": ""
      }
    ],
    "properties": [],
    "methods": []
  },
  "MatrixOptions": {
    "fileName": "src/datepicker/utils/matrix-utils.ts",
    "className": "MatrixOptions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "YearPickerComponent": {
    "fileName": "src/datepicker/yearpicker.component.ts",
    "className": "YearPickerComponent",
    "description": "",
    "selector": "yearpicker",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDropdownContainerComponent": {
    "fileName": "src/dropdown/bs-dropdown-container.component.ts",
    "className": "BsDropdownContainerComponent",
    "description": "",
    "selector": "bs-dropdown-container",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDropdownMenuDirective": {
    "fileName": "src/dropdown/bs-dropdown-menu.directive.ts",
    "className": "BsDropdownMenuDirective",
    "description": "",
    "selector": "[bsDropdownMenu],[dropdownMenu]",
    "exportAs": "bs-dropdown-menu",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDropdownToggleDirective": {
    "fileName": "src/dropdown/bs-dropdown-toggle.directive.ts",
    "className": "BsDropdownToggleDirective",
    "description": "",
    "selector": "[bsDropdownToggle],[dropdownToggle]",
    "exportAs": "bs-dropdown-toggle",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "BsDropdownConfig": {
    "fileName": "src/dropdown/bs-dropdown.config.ts",
    "className": "BsDropdownConfig",
    "description": "<p>Default dropdown configuration </p>\n",
    "methods": [],
    "properties": [
      {
        "name": "autoClose",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>default dropdown auto closing behavior </p>\n"
      }
    ]
  },
  "BsDropdownDirective": {
    "fileName": "src/dropdown/bs-dropdown.directive.ts",
    "className": "BsDropdownDirective",
    "description": "",
    "selector": "[bsDropdown],[dropdown]",
    "exportAs": "bs-dropdown",
    "inputs": [
      {
        "name": "autoClose",
        "type": "boolean",
        "description": "<p>Indicates that dropdown will be closed on item or document click,\nand after pressing ESC</p>\n"
      },
      {
        "name": "container",
        "type": "string",
        "description": "<p>A selector specifying the element the popover should be appended to.\nCurrently only supports &quot;body&quot;.</p>\n"
      },
      {
        "name": "dropup",
        "type": "boolean",
        "description": "<p>This attribute indicates that the dropdown should be opened upwards</p>\n"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "description": "<p>Disables dropdown toggle and hides dropdown menu if opened</p>\n"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "<p>Returns whether or not the popover is currently being shown</p>\n"
      },
      {
        "name": "placement",
        "type": "string",
        "description": "<p>Placement of a popover. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;</p>\n"
      },
      {
        "name": "triggers",
        "type": "string",
        "description": "<p>Specifies events that should trigger. Supports a space separated list of\nevent names.</p>\n"
      }
    ],
    "outputs": [
      {
        "name": "isOpenChange",
        "description": "<p>Emits an event when isOpen change</p>\n"
      },
      {
        "name": "onHidden",
        "description": "<p>Emits an event when the popover is hidden</p>\n"
      },
      {
        "name": "onShown",
        "description": "<p>Emits an event when the popover is shown</p>\n"
      }
    ],
    "properties": [
      {
        "name": "autoClose",
        "type": "boolean",
        "description": "<p>Indicates that dropdown will be closed on item or document click,\nand after pressing ESC</p>\n"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "description": "<p>Disables dropdown toggle and hides dropdown menu if opened</p>\n"
      }
    ],
    "methods": [
      {
        "name": "show",
        "description": "<p>Opens an element’s popover. This is considered a “manual” triggering of\nthe popover.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "<p>Closes an element’s popover. This is considered a “manual” triggering of\nthe popover.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "toggle",
        "description": "<p>Toggles an element’s popover. This is considered a “manual” triggering of\nthe popover.</p>\n",
        "args": [
          {
            "name": "value",
            "type": "boolean"
          }
        ],
        "returnType": "void"
      }
    ]
  },
  "BsDropdownState": {
    "fileName": "src/dropdown/bs-dropdown.state.ts",
    "className": "BsDropdownState",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "dropdownMenu",
        "type": "Promise<BsComponentRef<any>>",
        "description": "<p>Content to be displayed as popover.</p>\n"
      }
    ]
  },
  "Action": {
    "fileName": "src/mini-ngrx/index.ts",
    "className": "Action",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BsModalRef": {
    "fileName": "src/modal/bs-modal-ref.service.ts",
    "className": "BsModalRef",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "content",
        "type": "any",
        "description": "<p>Reference to a component inside the modal. Null if modal&#39;s been created with TemplateRef</p>\n"
      },
      {
        "name": "hide",
        "defaultValue": "Function",
        "type": "() => void",
        "description": "<p>Hides the modal</p>\n"
      }
    ]
  },
  "BsModalService": {
    "fileName": "src/modal/bs-modal.service.ts",
    "className": "BsModalService",
    "description": "",
    "methods": [
      {
        "name": "show",
        "description": "<p>Shows a modal </p>\n",
        "args": [
          {
            "name": "content",
            "type": "any"
          },
          {
            "name": "config",
            "type": "ModalOptions"
          }
        ],
        "returnType": "BsModalRef"
      },
      {
        "name": "checkScrollbar",
        "description": "<p>AFTER PR MERGE MODAL.COMPONENT WILL BE USING THIS CODE \nScroll bar tricks </p>\n",
        "args": [],
        "returnType": "void"
      }
    ],
    "properties": []
  },
  "ModalBackdropComponent": {
    "fileName": "src/modal/modal-backdrop.component.ts",
    "className": "ModalBackdropComponent",
    "description": "<p>This component will be added as background layout for modals if enabled </p>\n",
    "selector": "bs-modal-backdrop",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "ModalContainerComponent": {
    "fileName": "src/modal/modal-container.component.ts",
    "className": "ModalContainerComponent",
    "description": "",
    "selector": "modal-container",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "ModalOptions": {
    "fileName": "src/modal/modal-options.class.ts",
    "className": "ModalOptions",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "animated",
        "type": "boolean",
        "description": "<p>Toggle animation</p>\n"
      },
      {
        "name": "backdrop",
        "type": "boolean | \"static\"",
        "description": "<p>Includes a modal-backdrop element. Alternatively,\nspecify static for a backdrop which doesn&#39;t close the modal on click.</p>\n"
      },
      {
        "name": "class",
        "type": "string",
        "description": "<p>Css class for opened modal</p>\n"
      },
      {
        "name": "ignoreBackdropClick",
        "type": "boolean",
        "description": "<p>Ignore the backdrop click</p>\n"
      },
      {
        "name": "initialState",
        "type": "Object",
        "description": "<p>Modal data</p>\n"
      },
      {
        "name": "keyboard",
        "type": "boolean",
        "description": "<p>Closes the modal when escape key is pressed.</p>\n"
      },
      {
        "name": "show",
        "type": "boolean",
        "description": "<p>Shows the modal when initialized.</p>\n"
      }
    ]
  },
  "ModalDirective": {
    "fileName": "src/modal/modal.directive.ts",
    "className": "ModalDirective",
    "description": "<p>Mark any code with directive to show it&#39;s content in modal </p>\n",
    "selector": "[bsModal]",
    "exportAs": "bs-modal",
    "inputs": [
      {
        "name": "config",
        "type": "ModalOptions",
        "description": "<p>allows to set modal configuration via element property </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "onHidden",
        "description": "<p>This event is fired when the modal has finished being\nhidden from the user (will wait for CSS transitions to complete).</p>\n"
      },
      {
        "name": "onHide",
        "description": "<p>This event is fired immediately when\nthe hide instance method has been called.</p>\n"
      },
      {
        "name": "onShow",
        "description": "<p>This event fires immediately when the <code>show</code> instance method is called. </p>\n"
      },
      {
        "name": "onShown",
        "description": "<p>This event is fired when the modal has been made visible to the user\n(will wait for CSS transitions to complete)</p>\n"
      }
    ],
    "properties": [
      {
        "name": "config",
        "type": "ModalOptions",
        "description": "<p>allows to set modal configuration via element property </p>\n"
      },
      {
        "name": "dismissReason",
        "type": "string",
        "description": "<p>This field contains last dismiss reason.\nPossible values: <code>backdrop-click</code>, <code>esc</code> and <code>null</code>\n(if modal was closed by direct call of <code>.hide()</code>).</p>\n"
      }
    ],
    "methods": [
      {
        "name": "toggle",
        "description": "<p>Allows to manually toggle modal visibility </p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "show",
        "description": "<p>Allows to manually open modal </p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "<p>Allows to manually close modal </p>\n",
        "args": [
          {
            "name": "event",
            "type": "Event"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "showElement",
        "description": "<p>Show dialog</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "focusOtherModal",
        "description": "<p>Events tricks </p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "checkScrollbar",
        "description": "<p>Scroll bar tricks </p>\n",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "PagerComponent": {
    "fileName": "src/pagination/pager.component.ts",
    "className": "PagerComponent",
    "description": "",
    "selector": "pager",
    "inputs": [
      {
        "name": "align",
        "type": "boolean",
        "description": "<p>if <code>true</code> aligns each link to the sides of pager </p>\n"
      },
      {
        "name": "boundaryLinks",
        "type": "boolean",
        "description": "<p>if false first and last buttons will be hidden </p>\n"
      },
      {
        "name": "directionLinks",
        "type": "boolean",
        "description": "<p>if false previous and next buttons will be hidden </p>\n"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "description": "<p>if true pagination component will be disabled </p>\n"
      },
      {
        "name": "firstText",
        "type": "string",
        "description": "<p>first button text </p>\n"
      },
      {
        "name": "itemsPerPage",
        "type": "number",
        "description": "<p>maximum number of items per page. If value less than 1 will display all items on one page </p>\n"
      },
      {
        "name": "lastText",
        "type": "string",
        "description": "<p>last button text </p>\n"
      },
      {
        "name": "maxSize",
        "type": "number",
        "description": "<p>limit number for page links in pager </p>\n"
      },
      {
        "name": "nextText",
        "type": "string",
        "description": "<p>next button text </p>\n"
      },
      {
        "name": "pageBtnClass",
        "type": "string",
        "description": "<p>add class to <li> </p>\n"
      },
      {
        "name": "previousText",
        "type": "string",
        "description": "<p>previous button text </p>\n"
      },
      {
        "name": "rotate",
        "type": "boolean",
        "description": "<p>if true current page will in the middle of pages list </p>\n"
      },
      {
        "name": "totalItems",
        "type": "number",
        "description": "<p>total number of items in all pages </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "numPages",
        "description": "<p>fired when total pages count changes, $event:number equals to total pages count </p>\n"
      },
      {
        "name": "pageChanged",
        "description": "<p>fired when page was changed, $event:{page, itemsPerPage} equals to\nobject with current page index and number of items per page</p>\n"
      }
    ],
    "properties": [],
    "methods": []
  },
  "PageChangedEvent": {
    "fileName": "src/pagination/pagination.component.ts",
    "className": "PageChangedEvent",
    "description": "",
    "methods": [],
    "properties": []
  },
  "PaginationComponent": {
    "fileName": "src/pagination/pagination.component.ts",
    "className": "PaginationComponent",
    "description": "",
    "selector": "pagination",
    "inputs": [
      {
        "name": "align",
        "type": "boolean",
        "description": "<p>if <code>true</code> aligns each link to the sides of pager </p>\n"
      },
      {
        "name": "boundaryLinks",
        "type": "boolean",
        "description": "<p>if false first and last buttons will be hidden </p>\n"
      },
      {
        "name": "directionLinks",
        "type": "boolean",
        "description": "<p>if false previous and next buttons will be hidden </p>\n"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "description": "<p>if true pagination component will be disabled </p>\n"
      },
      {
        "name": "firstText",
        "type": "string",
        "description": "<p>first button text </p>\n"
      },
      {
        "name": "itemsPerPage",
        "type": "number",
        "description": "<p>maximum number of items per page. If value less than 1 will display all items on one page </p>\n"
      },
      {
        "name": "lastText",
        "type": "string",
        "description": "<p>last button text </p>\n"
      },
      {
        "name": "maxSize",
        "type": "number",
        "description": "<p>limit number for page links in pager </p>\n"
      },
      {
        "name": "nextText",
        "type": "string",
        "description": "<p>next button text </p>\n"
      },
      {
        "name": "pageBtnClass",
        "type": "string",
        "description": "<p>add class to <li> </p>\n"
      },
      {
        "name": "previousText",
        "type": "string",
        "description": "<p>previous button text </p>\n"
      },
      {
        "name": "rotate",
        "type": "boolean",
        "description": "<p>if true current page will in the middle of pages list </p>\n"
      },
      {
        "name": "totalItems",
        "type": "number",
        "description": "<p>total number of items in all pages </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "numPages",
        "description": "<p>fired when total pages count changes, $event:number equals to total pages count </p>\n"
      },
      {
        "name": "pageChanged",
        "description": "<p>fired when page was changed, $event:{page, itemsPerPage} equals to object\nwith current page index and number of items per page</p>\n"
      }
    ],
    "properties": [],
    "methods": []
  },
  "PaginationConfig": {
    "fileName": "src/pagination/pagination.config.ts",
    "className": "PaginationConfig",
    "description": "<p>Provides default values for Pagination and pager components </p>\n",
    "methods": [],
    "properties": []
  },
  "PopoverContainerComponent": {
    "fileName": "src/popover/popover-container.component.ts",
    "className": "PopoverContainerComponent",
    "description": "",
    "selector": "popover-container",
    "inputs": [
      {
        "name": "placement",
        "type": "string",
        "description": ""
      },
      {
        "name": "title",
        "type": "string",
        "description": ""
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "PopoverConfig": {
    "fileName": "src/popover/popover.config.ts",
    "className": "PopoverConfig",
    "description": "<p>Configuration service for the Popover directive.\nYou can inject this service, typically in your root component, and customize\nthe values of its properties in order to provide default values for all the\npopovers used in the application.</p>\n",
    "methods": [],
    "properties": [
      {
        "name": "container",
        "type": "string",
        "description": "<p>A selector specifying the element the popover should be appended to.\nCurrently only supports &quot;body&quot;.</p>\n"
      },
      {
        "name": "placement",
        "defaultValue": "top",
        "type": "string",
        "description": "<p>Placement of a popover. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;, &quot;auto&quot;</p>\n"
      },
      {
        "name": "triggers",
        "defaultValue": "click",
        "type": "string",
        "description": "<p>Specifies events that should trigger. Supports a space separated list of\nevent names.</p>\n"
      }
    ]
  },
  "PopoverDirective": {
    "fileName": "src/popover/popover.directive.ts",
    "className": "PopoverDirective",
    "description": "<p>A lightweight, extensible directive for fancy popover creation.</p>\n",
    "selector": "[popover]",
    "exportAs": "bs-popover",
    "inputs": [
      {
        "name": "container",
        "type": "string",
        "description": "<p>A selector specifying the element the popover should be appended to.\nCurrently only supports &quot;body&quot;.</p>\n"
      },
      {
        "name": "containerClass",
        "type": "string",
        "description": "<p>Css class for popover container</p>\n"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "<p>Returns whether or not the popover is currently being shown</p>\n"
      },
      {
        "name": "outsideClick",
        "defaultValue": "false",
        "type": "boolean",
        "description": "<p>Close popover on outside click</p>\n"
      },
      {
        "name": "placement",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\" | \"auto\"",
        "description": "<p>Placement of a popover. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;</p>\n"
      },
      {
        "name": "popover",
        "type": "string | TemplateRef<any>",
        "description": "<p>Content to be displayed as popover.</p>\n"
      },
      {
        "name": "popoverContext",
        "type": "any",
        "description": "<p>Context to be used if popover is a template.</p>\n"
      },
      {
        "name": "popoverTitle",
        "type": "string",
        "description": "<p>Title of a popover.</p>\n"
      },
      {
        "name": "triggers",
        "type": "string",
        "description": "<p>Specifies events that should trigger. Supports a space separated list of\nevent names.</p>\n"
      }
    ],
    "outputs": [
      {
        "name": "onHidden",
        "description": "<p>Emits an event when the popover is hidden</p>\n"
      },
      {
        "name": "onShown",
        "description": "<p>Emits an event when the popover is shown</p>\n"
      }
    ],
    "properties": [],
    "methods": [
      {
        "name": "show",
        "description": "<p>Opens an element’s popover. This is considered a “manual” triggering of\nthe popover.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "<p>Closes an element’s popover. This is considered a “manual” triggering of\nthe popover.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "toggle",
        "description": "<p>Toggles an element’s popover. This is considered a “manual” triggering of\nthe popover.</p>\n",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "PositioningOptions": {
    "fileName": "src/positioning/positioning.service.ts",
    "className": "PositioningOptions",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "appendToBody",
        "type": "boolean",
        "description": "<p>If true component will be attached to body </p>\n"
      },
      {
        "name": "attachment",
        "type": "string",
        "description": "<p>A string of the form &#39;vert-attachment horiz-attachment&#39; or &#39;placement&#39;</p>\n<ul>\n<li>placement can be &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;\nnot yet supported:</li>\n<li>vert-attachment can be any of &#39;top&#39;, &#39;middle&#39;, &#39;bottom&#39;</li>\n<li>horiz-attachment can be any of &#39;left&#39;, &#39;center&#39;, &#39;right&#39;</li>\n</ul>\n"
      },
      {
        "name": "element",
        "type": "string | HTMLElement | ElementRef",
        "description": "<p>The DOM element, ElementRef, or a selector string of an element which will be moved </p>\n"
      },
      {
        "name": "offset",
        "type": "string",
        "description": "<p>A string of the form &#39;vert-offset horiz-offset&#39;</p>\n<ul>\n<li>vert-offset and horiz-offset can be of the form &quot;20px&quot; or &quot;55%&quot;</li>\n</ul>\n"
      },
      {
        "name": "target",
        "type": "string | HTMLElement | ElementRef",
        "description": "<p>The DOM element, ElementRef, or a selector string of an element which the element will be attached to  </p>\n"
      },
      {
        "name": "targetAttachment",
        "type": "string",
        "description": "<p>A string similar to <code>attachment</code>. The one difference is that, if it&#39;s not provided,\n<code>targetAttachment</code> will assume the mirror image of <code>attachment</code>.</p>\n"
      },
      {
        "name": "targetOffset",
        "type": "string",
        "description": "<p>A string similar to <code>offset</code>, but referring to the offset of the target </p>\n"
      }
    ]
  },
  "PositioningService": {
    "fileName": "src/positioning/positioning.service.ts",
    "className": "PositioningService",
    "description": "",
    "methods": [],
    "properties": []
  },
  "BarComponent": {
    "fileName": "src/progressbar/bar.component.ts",
    "className": "BarComponent",
    "description": "",
    "selector": "bar",
    "inputs": [
      {
        "name": "type",
        "type": "string",
        "description": "<p>provide one of the four supported contextual classes: <code>success</code>, <code>info</code>, <code>warning</code>, <code>danger</code> </p>\n"
      },
      {
        "name": "value",
        "type": "number",
        "description": "<p>current value of progress bar </p>\n"
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "ProgressbarComponent": {
    "fileName": "src/progressbar/progressbar.component.ts",
    "className": "ProgressbarComponent",
    "description": "",
    "selector": "progressbar",
    "inputs": [
      {
        "name": "animate",
        "type": "boolean",
        "description": "<p>if <code>true</code> changing value of progress bar will be animated</p>\n"
      },
      {
        "name": "max",
        "type": "number",
        "description": "<p>maximum total value of progress element </p>\n"
      },
      {
        "name": "striped",
        "type": "boolean",
        "description": "<p>If <code>true</code>, striped classes are applied </p>\n"
      },
      {
        "name": "type",
        "type": "string",
        "description": "<p>provide one of the four supported contextual classes: <code>success</code>, <code>info</code>, <code>warning</code>, <code>danger</code> </p>\n"
      },
      {
        "name": "value",
        "type": "number | any[]",
        "description": "<p>current value of progress bar. Could be a number or array of objects\nlike {&quot;value&quot;:15,&quot;type&quot;:&quot;info&quot;,&quot;label&quot;:&quot;15 %&quot;}</p>\n"
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "ProgressbarConfig": {
    "fileName": "src/progressbar/progressbar.config.ts",
    "className": "ProgressbarConfig",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "animate",
        "defaultValue": "false",
        "type": "Boolean",
        "description": "<p>if <code>true</code> changing value of progress bar will be animated </p>\n"
      },
      {
        "name": "max",
        "defaultValue": "100",
        "type": "number",
        "description": "<p>maximum total value of progress element </p>\n"
      }
    ]
  },
  "RatingComponent": {
    "fileName": "src/rating/rating.component.ts",
    "className": "RatingComponent",
    "description": "",
    "selector": "rating",
    "inputs": [
      {
        "name": "customTemplate",
        "type": "TemplateRef<any>",
        "description": "<p>custom template for icons </p>\n"
      },
      {
        "name": "max",
        "defaultValue": "5",
        "type": "number",
        "description": "<p>number of icons </p>\n"
      },
      {
        "name": "readonly",
        "type": "boolean",
        "description": "<p>if true will not react on any user events </p>\n"
      },
      {
        "name": "titles",
        "type": "string[]",
        "description": "<p>array of icons titles, default: ([&quot;one&quot;, &quot;two&quot;, &quot;three&quot;, &quot;four&quot;, &quot;five&quot;]) </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "onHover",
        "description": "<p>fired when icon selected, $event:number equals to selected rating </p>\n"
      },
      {
        "name": "onLeave",
        "description": "<p>fired when icon selected, $event:number equals to previous rating value </p>\n"
      }
    ],
    "properties": [],
    "methods": []
  },
  "DraggableItemService": {
    "fileName": "src/sortable/draggable-item.service.ts",
    "className": "DraggableItemService",
    "description": "",
    "methods": [],
    "properties": []
  },
  "DraggableItem": {
    "fileName": "src/sortable/draggable-item.ts",
    "className": "DraggableItem",
    "description": "",
    "methods": [],
    "properties": []
  },
  "SortableComponent": {
    "fileName": "src/sortable/sortable.component.ts",
    "className": "SortableComponent",
    "description": "",
    "selector": "bs-sortable",
    "exportAs": "bs-sortable",
    "inputs": [
      {
        "name": "fieldName",
        "type": "string",
        "description": "<p>field name if input array consists of objects </p>\n"
      },
      {
        "name": "itemActiveClass",
        "type": "string",
        "description": "<p>class name for active item </p>\n"
      },
      {
        "name": "itemActiveStyle",
        "type": "{ [key: string]: string; }",
        "description": "<p>style object for active item </p>\n"
      },
      {
        "name": "itemClass",
        "type": "string",
        "description": "<p>class name for item </p>\n"
      },
      {
        "name": "itemStyle",
        "type": "{ [key: string]: string; }",
        "description": "<p>style object for item </p>\n"
      },
      {
        "name": "itemTemplate",
        "type": "TemplateRef<any>",
        "description": "<p>used to specify a custom item template. Template variables: item and index; </p>\n"
      },
      {
        "name": "placeholderClass",
        "type": "string",
        "description": "<p>class name for placeholder </p>\n"
      },
      {
        "name": "placeholderItem",
        "type": "string",
        "description": "<p>placeholder item which will be shown if collection is empty </p>\n"
      },
      {
        "name": "placeholderStyle",
        "type": "{ [key: string]: string; }",
        "description": "<p>style object for placeholder </p>\n"
      },
      {
        "name": "wrapperClass",
        "type": "string",
        "description": "<p>class name for items wrapper </p>\n"
      },
      {
        "name": "wrapperStyle",
        "type": "{ [key: string]: string; }",
        "description": "<p>style object for items wrapper </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "onChange",
        "description": "<p>fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.\nReturns new items collection as a payload.</p>\n"
      }
    ],
    "properties": [],
    "methods": []
  },
  "SortableItem": {
    "fileName": "src/sortable/sortable.component.ts",
    "className": "SortableItem",
    "description": "",
    "methods": [],
    "properties": []
  },
  "NgTranscludeDirective": {
    "fileName": "src/tabs/ng-transclude.directive.ts",
    "className": "NgTranscludeDirective",
    "description": "",
    "selector": "[ngTransclude]",
    "inputs": [
      {
        "name": "ngTransclude",
        "type": "TemplateRef<any>",
        "description": ""
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "TabHeadingDirective": {
    "fileName": "src/tabs/tab-heading.directive.ts",
    "className": "TabHeadingDirective",
    "description": "<p>Should be used to mark <ng-template> element as a template for tab heading </p>\n",
    "selector": "[tabHeading]",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "TabDirective": {
    "fileName": "src/tabs/tab.directive.ts",
    "className": "TabDirective",
    "description": "",
    "selector": "tab, [tab]",
    "inputs": [
      {
        "name": "active",
        "type": "boolean",
        "description": "<p>tab active state toggle </p>\n"
      },
      {
        "name": "customClass",
        "type": "string",
        "description": "<p>if set, will be added to the tab&#39;s class attribute. Multiple classes are supported. </p>\n"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "description": "<p>if true tab can not be activated </p>\n"
      },
      {
        "name": "heading",
        "type": "string",
        "description": "<p>tab header text </p>\n"
      },
      {
        "name": "id",
        "type": "string",
        "description": "<p>tab id. The same id with suffix &#39;-link&#39; will be added to the corresponding &lt;li&gt; element  </p>\n"
      },
      {
        "name": "removable",
        "type": "boolean",
        "description": "<p>if true tab can be removable, additional button will appear </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "deselect",
        "description": "<p>fired when tab became inactive, $event:Tab equals to deselected instance of Tab component </p>\n"
      },
      {
        "name": "removed",
        "description": "<p>fired before tab will be removed, $event:Tab equals to instance of removed tab </p>\n"
      },
      {
        "name": "select",
        "description": "<p>fired when tab became active, $event:Tab equals to selected instance of Tab component </p>\n"
      }
    ],
    "properties": [],
    "methods": []
  },
  "TabsetComponent": {
    "fileName": "src/tabs/tabset.component.ts",
    "className": "TabsetComponent",
    "description": "",
    "selector": "tabset",
    "inputs": [
      {
        "name": "justified",
        "type": "boolean",
        "description": "<p>if true tabs fill the container and have a consistent width </p>\n"
      },
      {
        "name": "type",
        "type": "string",
        "description": "<p>navigation context class: &#39;tabs&#39; or &#39;pills&#39; </p>\n"
      },
      {
        "name": "vertical",
        "type": "boolean",
        "description": "<p>if true tabs will be placed vertically </p>\n"
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "TabsetConfig": {
    "fileName": "src/tabs/tabset.config.ts",
    "className": "TabsetConfig",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "type",
        "defaultValue": "tabs",
        "type": "string",
        "description": "<p>provides default navigation context class: &#39;tabs&#39; or &#39;pills&#39; </p>\n"
      }
    ]
  },
  "TimepickerActions": {
    "fileName": "src/timepicker/reducer/timepicker.actions.ts",
    "className": "TimepickerActions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "TimepickerStore": {
    "fileName": "src/timepicker/reducer/timepicker.store.ts",
    "className": "TimepickerStore",
    "description": "",
    "methods": [],
    "properties": []
  },
  "TimepickerComponent": {
    "fileName": "src/timepicker/timepicker.component.ts",
    "className": "TimepickerComponent",
    "description": "",
    "selector": "timepicker",
    "inputs": [
      {
        "name": "arrowkeys",
        "type": "boolean",
        "description": "<p>if true up/down arrowkeys inside hours and minutes inputs will change time </p>\n"
      },
      {
        "name": "hourStep",
        "type": "number",
        "description": "<p>hours change step </p>\n"
      },
      {
        "name": "max",
        "type": "Date",
        "description": "<p>maximum time user can select </p>\n"
      },
      {
        "name": "meridians",
        "type": "string[]",
        "description": "<p>meridian labels based on locale </p>\n"
      },
      {
        "name": "min",
        "type": "Date",
        "description": "<p>minimum time user can select </p>\n"
      },
      {
        "name": "minuteStep",
        "type": "number",
        "description": "<p>hours change step </p>\n"
      },
      {
        "name": "mousewheel",
        "type": "boolean",
        "description": "<p>if true scroll inside hours and minutes inputs will change time </p>\n"
      },
      {
        "name": "readonlyInput",
        "type": "boolean",
        "description": "<p>if true hours and minutes fields will be readonly </p>\n"
      },
      {
        "name": "secondsStep",
        "type": "number",
        "description": "<p>seconds change step </p>\n"
      },
      {
        "name": "showMeridian",
        "type": "boolean",
        "description": "<p>if true meridian button will be shown </p>\n"
      },
      {
        "name": "showMinutes",
        "type": "boolean",
        "description": "<p>show minutes in timepicker </p>\n"
      },
      {
        "name": "showSeconds",
        "type": "boolean",
        "description": "<p>show seconds in timepicker </p>\n"
      },
      {
        "name": "showSpinners",
        "type": "boolean",
        "description": "<p>if true spinner arrows above and below the inputs will be shown </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "isValid",
        "description": "<p>emits true if value is a valid date </p>\n"
      }
    ],
    "properties": [],
    "methods": []
  },
  "TimepickerConfig": {
    "fileName": "src/timepicker/timepicker.config.ts",
    "className": "TimepickerConfig",
    "description": "<p>Provides default configuration values for timepicker </p>\n",
    "methods": [],
    "properties": [
      {
        "name": "arrowkeys",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>if true up/down arrowkeys inside hours and minutes inputs will change time </p>\n"
      },
      {
        "name": "hourStep",
        "defaultValue": "1",
        "type": "number",
        "description": "<p>hours change step </p>\n"
      },
      {
        "name": "max",
        "type": "Date",
        "description": "<p>maximum time user can select </p>\n"
      },
      {
        "name": "meridians",
        "type": "string[]",
        "description": "<p>meridian labels based on locale </p>\n"
      },
      {
        "name": "min",
        "type": "Date",
        "description": "<p>minimum time user can select </p>\n"
      },
      {
        "name": "minuteStep",
        "defaultValue": "5",
        "type": "number",
        "description": "<p>hours change step </p>\n"
      },
      {
        "name": "mousewheel",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>if true scroll inside hours and minutes inputs will change time </p>\n"
      },
      {
        "name": "readonlyInput",
        "defaultValue": "false",
        "type": "boolean",
        "description": "<p>if true hours and minutes fields will be readonly </p>\n"
      },
      {
        "name": "secondsStep",
        "defaultValue": "10",
        "type": "number",
        "description": "<p>seconds changes step </p>\n"
      },
      {
        "name": "showMeridian",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM </p>\n"
      },
      {
        "name": "showMinutes",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>show minutes in timepicker </p>\n"
      },
      {
        "name": "showSeconds",
        "defaultValue": "false",
        "type": "boolean",
        "description": "<p>show seconds in timepicker </p>\n"
      },
      {
        "name": "showSpinners",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>if true spinner arrows above and below the inputs will be shown </p>\n"
      }
    ]
  },
  "Time": {
    "fileName": "src/timepicker/timepicker.models.ts",
    "className": "Time",
    "description": "",
    "methods": [],
    "properties": []
  },
  "TimepickerControls": {
    "fileName": "src/timepicker/timepicker.models.ts",
    "className": "TimepickerControls",
    "description": "",
    "methods": [],
    "properties": []
  },
  "TimepickerComponentState": {
    "fileName": "src/timepicker/timepicker.models.ts",
    "className": "TimepickerComponentState",
    "description": "",
    "methods": [],
    "properties": []
  },
  "TimeChangeEvent": {
    "fileName": "src/timepicker/timepicker.models.ts",
    "className": "TimeChangeEvent",
    "description": "",
    "methods": [],
    "properties": []
  },
  "TooltipContainerComponent": {
    "fileName": "src/tooltip/tooltip-container.component.ts",
    "className": "TooltipContainerComponent",
    "description": "",
    "selector": "bs-tooltip-container",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "TooltipConfig": {
    "fileName": "src/tooltip/tooltip.config.ts",
    "className": "TooltipConfig",
    "description": "<p>Default values provider for tooltip </p>\n",
    "methods": [],
    "properties": [
      {
        "name": "container",
        "type": "string",
        "description": "<p>a selector specifying the element the tooltip should be appended to. Currently only supports &quot;body&quot; </p>\n"
      },
      {
        "name": "placement",
        "defaultValue": "top",
        "type": "string",
        "description": "<p>tooltip placement, supported positions: &#39;top&#39;, &#39;bottom&#39;, &#39;left&#39;, &#39;right&#39; </p>\n"
      },
      {
        "name": "triggers",
        "defaultValue": "hover focus",
        "type": "string",
        "description": "<p>array of event names which triggers tooltip opening </p>\n"
      }
    ]
  },
  "TooltipDirective": {
    "fileName": "src/tooltip/tooltip.directive.ts",
    "className": "TooltipDirective",
    "description": "",
    "selector": "[tooltip], [tooltipHtml]",
    "exportAs": "bs-tooltip",
    "inputs": [
      {
        "name": "container",
        "type": "string",
        "description": "<p>A selector specifying the element the tooltip should be appended to.\nCurrently only supports &quot;body&quot;.</p>\n"
      },
      {
        "name": "containerClass",
        "type": "string",
        "description": "<p>Css class for tooltip container</p>\n"
      },
      {
        "name": "delay",
        "type": "number",
        "description": "<p>Delay before showing the tooltip</p>\n"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "description": "<p>Allows to disable tooltip</p>\n"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "<p>Returns whether or not the tooltip is currently being shown</p>\n"
      },
      {
        "name": "placement",
        "type": "string",
        "description": "<p>Placement of a tooltip. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;</p>\n"
      },
      {
        "name": "tooltip",
        "type": "string | TemplateRef<any>",
        "description": "<p>Content to be displayed as tooltip.</p>\n"
      },
      {
        "name": "tooltipAnimation",
        "defaultValue": "true",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "tooltipAppendToBody",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "tooltipClass",
        "type": "string",
        "description": ""
      },
      {
        "name": "tooltipContext",
        "type": "any",
        "description": ""
      },
      {
        "name": "tooltipEnable",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "tooltipFadeDuration",
        "defaultValue": "150",
        "type": "number",
        "description": ""
      },
      {
        "name": "tooltipHtml",
        "type": "string | TemplateRef<any>",
        "description": ""
      },
      {
        "name": "tooltipIsOpen",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "tooltipPlacement",
        "type": "string",
        "description": ""
      },
      {
        "name": "tooltipPopupDelay",
        "type": "number",
        "description": ""
      },
      {
        "name": "tooltipTrigger",
        "type": "string | string[]",
        "description": ""
      },
      {
        "name": "triggers",
        "type": "string",
        "description": "<p>Specifies events that should trigger. Supports a space separated list of\nevent names.</p>\n"
      }
    ],
    "outputs": [
      {
        "name": "onHidden",
        "description": "<p>Emits an event when the tooltip is hidden</p>\n"
      },
      {
        "name": "onShown",
        "description": "<p>Emits an event when the tooltip is shown</p>\n"
      },
      {
        "name": "tooltipChange",
        "description": "<p>Fired when tooltip content changes </p>\n"
      },
      {
        "name": "tooltipStateChanged",
        "description": ""
      }
    ],
    "properties": [],
    "methods": [
      {
        "name": "toggle",
        "description": "<p>Toggles an element’s tooltip. This is considered a “manual” triggering of\nthe tooltip.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "show",
        "description": "<p>Opens an element’s tooltip. This is considered a “manual” triggering of\nthe tooltip.</p>\n",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "<p>Closes an element’s tooltip. This is considered a “manual” triggering of\nthe tooltip.</p>\n",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "TypeaheadContainerComponent": {
    "fileName": "src/typeahead/typeahead-container.component.ts",
    "className": "TypeaheadContainerComponent",
    "description": "",
    "selector": "typeahead-container",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "TypeaheadDirective": {
    "fileName": "src/typeahead/typeahead.directive.ts",
    "className": "TypeaheadDirective",
    "description": "",
    "selector": "[typeahead]",
    "exportAs": "bs-typeahead",
    "inputs": [
      {
        "name": "container",
        "type": "string",
        "description": "<p>A selector specifying the element the typeahead should be appended to.\nCurrently only supports &quot;body&quot;.</p>\n"
      },
      {
        "name": "dropup",
        "defaultValue": "false",
        "type": "boolean",
        "description": "<p>This attribute indicates that the dropdown should be opened upwards </p>\n"
      },
      {
        "name": "optionsListTemplate",
        "type": "TemplateRef<any>",
        "description": "<p>used to specify a custom options list template.\nTemplate variables: matches, itemTemplate, query</p>\n"
      },
      {
        "name": "typeahead",
        "type": "any",
        "description": "<p>options source, can be Array of strings, objects or\nan Observable for external matching process</p>\n"
      },
      {
        "name": "typeaheadAsync",
        "type": "boolean",
        "description": "<p>should be used only in case of typeahead attribute is array.\nIf true - loading of options will be async, otherwise - sync.\ntrue make sense if options array is large.</p>\n"
      },
      {
        "name": "typeaheadGroupField",
        "type": "string",
        "description": "<p>when options source is an array of objects, the name of field that\ncontains the group value, matches are grouped by this field when set.</p>\n"
      },
      {
        "name": "typeaheadItemTemplate",
        "type": "TemplateRef<any>",
        "description": "<p>used to specify a custom item template.\nTemplate variables exposed are called item and index;</p>\n"
      },
      {
        "name": "typeaheadLatinize",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>match latin symbols.\nIf true the word súper would match super and vice versa.</p>\n"
      },
      {
        "name": "typeaheadMinLength",
        "type": "number",
        "description": "<p>minimal no of characters that needs to be entered before\ntypeahead kicks-in. When set to 0, typeahead shows on focus with full\nlist of options (limited as normal by typeaheadOptionsLimit)</p>\n"
      },
      {
        "name": "typeaheadOptionField",
        "type": "string",
        "description": "<p>when options source is an array of objects, the name of field\nthat contains the options value, we use array item as option in case\nof this field is missing. Supports nested properties and methods.</p>\n"
      },
      {
        "name": "typeaheadOptionsInScrollableView",
        "defaultValue": "5",
        "type": "number",
        "description": "<p>specifies number of options to show in scroll view  </p>\n"
      },
      {
        "name": "typeaheadOptionsLimit",
        "type": "number",
        "description": "<p>maximum length of options items list </p>\n"
      },
      {
        "name": "typeaheadPhraseDelimiters",
        "defaultValue": "'\"",
        "type": "string",
        "description": "<p>should be used only in case typeaheadSingleWords attribute is true.\nSets the word delimiter to match exact phrase.\nDefaults to simple and double quotes.</p>\n"
      },
      {
        "name": "typeaheadScrollable",
        "defaultValue": "false",
        "type": "boolean",
        "description": "<p>specifies if typeahead is scrollable  </p>\n"
      },
      {
        "name": "typeaheadSingleWords",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>break words with spaces. If true the text &quot;exact phrase&quot;\nhere match would match with match exact phrase here\nbut not with phrase here exact match (kind of &quot;google style&quot;).</p>\n"
      },
      {
        "name": "typeaheadWaitMs",
        "type": "number",
        "description": "<p>minimal wait time after last character typed before typeahead kicks-in </p>\n"
      },
      {
        "name": "typeaheadWordDelimiters",
        "defaultValue": " ",
        "type": "string",
        "description": "<p>should be used only in case typeaheadSingleWords attribute is true.\nSets the word delimiter to break words. Defaults to space.</p>\n"
      }
    ],
    "outputs": [
      {
        "name": "typeaheadLoading",
        "description": "<p>fired when &#39;busy&#39; state of this component was changed,\nfired on async mode only, returns boolean</p>\n"
      },
      {
        "name": "typeaheadNoResults",
        "description": "<p>fired on every key event and returns true\nin case of matches are not detected</p>\n"
      },
      {
        "name": "typeaheadOnBlur",
        "description": "<p>fired when blur event occurres. returns the active item </p>\n"
      },
      {
        "name": "typeaheadOnSelect",
        "description": "<p>fired when option was selected, return object with data of this option </p>\n"
      }
    ],
    "properties": [
      {
        "name": "_container",
        "type": "TypeaheadContainerComponent",
        "description": "<p>if false restrict model values to the ones selected from the popup only will be provided \nif false the first match automatically will not be focused as you type \nformat the ng-model result after selection \nif true automatically select an item when there is one option that exactly matches the user input \nif true select the currently highlighted match on blur \nif false don&#39;t focus the input element the typeahead directive is associated with on selection </p>\n"
      }
    ],
    "methods": []
  }
};
