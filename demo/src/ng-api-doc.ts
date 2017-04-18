/* tslint:disable */
export const ngdoc: any = {
  "AccordionPanelComponent": {
    "fileName": "src/accordion/accordion-group.component.ts",
    "className": "AccordionPanelComponent",
    "description": "",
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
        "description": "<p>Is accordion group open or closed </p>\n"
      },
      {
        "name": "panelClass",
        "type": "string",
        "description": "<p>Provides an ability to use Bootstrap&#39;s contextual panel classes (<code>panel-primary</code>, <code>panel-success</code>, <code>panel-info</code>, etc...). List of all available classes <a href=\"http://getbootstrap.com/components/#panels-alternatives\" target=\"_blank\" title=\"null\">available here</a> </p>\n"
      }
    ],
    "outputs": [],
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
    "selector": "alert,ngx-alert",
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
        "name": "type",
        "defaultValue": "warning",
        "type": "string",
        "description": "<p>Alert type. Provides one of four bootstrap supported contextual classes: <code>success</code>, <code>info</code>, <code>warning</code> and <code>danger</code> </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "onClose",
        "description": "<p>This event fires immediately after close instance method is called, $event is an instance of Alert component. </p>\n"
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
        "description": "<p>Delay of item cycling in milliseconds. If false, carousel won&#39;t cycle automatically.</p>\n"
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
        "description": "<p>Adds new slide. If this slide is first in collection - set it as active and starts auto changing</p>\n",
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
        "description": "<p>Removes specified slide. If this slide is active - will roll to another slide</p>\n",
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
        "description": "<p>Finds and returns index of currently displayed slide\n@returns {number}</p>\n",
        "args": [],
        "returnType": "number"
      },
      {
        "name": "isLast",
        "description": "<p>Defines, whether the specified index is last in collection\n@returns {boolean}</p>\n",
        "args": [
          {
            "name": "index",
            "type": "number"
          }
        ],
        "returnType": "boolean"
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
  "ListenOptions": {
    "fileName": "src/component-loader/component-loader.class.ts",
    "className": "ListenOptions",
    "description": "",
    "methods": [],
    "properties": []
  },
  "ComponentLoaderFactory": {
    "fileName": "src/component-loader/component-loader.factory.ts",
    "className": "ComponentLoaderFactory",
    "description": "",
    "methods": [
      {
        "name": "createLoader",
        "description": "<p>@returns {ComponentLoader}</p>\n",
        "args": [
          {
            "name": "_elementRef",
            "type": "ElementRef"
          },
          {
            "name": "_viewContainerRef",
            "type": "ViewContainerRef"
          },
          {
            "name": "_renderer",
            "type": "Renderer"
          }
        ],
        "returnType": "ComponentLoader<T>"
      }
    ],
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
        "type": "any",
        "description": "<p>Content to be displayed as popover.</p>\n"
      }
    ]
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
  "ModalOptions": {
    "fileName": "src/modal/modal-options.class.ts",
    "className": "ModalOptions",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "backdrop",
        "type": "boolean | \"static\"",
        "description": "<p>Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn&#39;t close the modal on click.</p>\n"
      },
      {
        "name": "ignoreBackdropClick",
        "type": "boolean",
        "description": "<p>Ignore the backdrop click</p>\n"
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
    "fileName": "src/modal/modal.component.ts",
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
        "description": "<p>This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete). </p>\n"
      },
      {
        "name": "onHide",
        "description": "<p>This event is fired immediately when the hide instance method has been called. </p>\n"
      },
      {
        "name": "onShow",
        "description": "<p>This event fires immediately when the <code>show</code> instance method is called. </p>\n"
      },
      {
        "name": "onShown",
        "description": "<p>This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete) </p>\n"
      }
    ],
    "properties": [
      {
        "name": "config",
        "type": "ModalOptions",
        "description": "<p>allows to set modal configuration via element property </p>\n"
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
        "description": "<p>fired when page was changed, $event:{page, itemsPerPage} equals to object with current page index and number of items per page </p>\n"
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
        "description": "<p>fired when page was changed, $event:{page, itemsPerPage} equals to object with current page index and number of items per page </p>\n"
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
        "description": "<p>Placement of a popover. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;</p>\n"
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
        "name": "isOpen",
        "type": "boolean",
        "description": "<p>Returns whether or not the popover is currently being shown</p>\n"
      },
      {
        "name": "placement",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "description": "<p>Placement of a popover. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;</p>\n"
      },
      {
        "name": "popover",
        "type": "string | TemplateRef<any>",
        "description": "<p>Content to be displayed as popover.</p>\n"
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
  "Positioning": {
    "fileName": "src/positioning/ng-positioning.ts",
    "className": "Positioning",
    "description": "<p>@copyright Valor Software\n@copyright Angular ng-bootstrap team</p>\n",
    "methods": [],
    "properties": []
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
        "type": "string | ElementRef | HTMLElement",
        "description": "<p>The DOM element, ElementRef, or a selector string of an element which will be moved </p>\n"
      },
      {
        "name": "offset",
        "type": "string",
        "description": "<p>A string of the form &#39;vert-offset horiz-offset&#39;</p>\n<ul>\n<li>vert-offset and horiz-offset can be of the form &quot;20px&quot; or &quot;55%&quot;</li>\n</ul>\n"
      },
      {
        "name": "target",
        "type": "string | ElementRef | HTMLElement",
        "description": "<p>The DOM element, ElementRef, or a selector string of an element which the element will be attached to  </p>\n"
      },
      {
        "name": "targetAttachment",
        "type": "string",
        "description": "<p>A string similar to <code>attachment</code>. The one difference is that, if it&#39;s not provided, <code>targetAttachment</code> will assume the mirror image of <code>attachment</code>. </p>\n"
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
  "ProgressDirective": {
    "fileName": "src/progressbar/progress.directive.ts",
    "className": "ProgressDirective",
    "description": "",
    "selector": "bs-progress, [progress]",
    "inputs": [
      {
        "name": "animate",
        "type": "boolean",
        "description": "<p>if <code>true</code> changing value of progress bar will be animated (note: not supported by Bootstrap 4) </p>\n"
      },
      {
        "name": "max",
        "type": "number",
        "description": "<p>maximum total value of progress element </p>\n"
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
        "description": "<p>if <code>true</code> changing value of progress bar will be animated (note: not supported by Bootstrap 4) </p>\n"
      },
      {
        "name": "max",
        "type": "number",
        "description": "<p>maximum total value of progress element </p>\n"
      },
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
  "ProgressbarConfig": {
    "fileName": "src/progressbar/progressbar.config.ts",
    "className": "ProgressbarConfig",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "animate",
        "defaultValue": "true",
        "type": "Boolean",
        "description": "<p>if <code>true</code> changing value of progress bar will be animated (note: not supported by Bootstrap 4) </p>\n"
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
        "name": "max",
        "defaultValue": "5",
        "type": "number",
        "description": "<p>number of icons </p>\n"
      },
      {
        "name": "ratingStates",
        "type": "{ stateOn: string; stateOff: string; }[]",
        "description": "<p>array of custom icons classes </p>\n"
      },
      {
        "name": "readonly",
        "type": "boolean",
        "description": "<p>if true will not react on any user events </p>\n"
      },
      {
        "name": "stateOff",
        "type": "string",
        "description": "<p>unselected icon class </p>\n"
      },
      {
        "name": "stateOn",
        "type": "string",
        "description": "<p>selected icon class </p>\n"
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
        "description": "<p>fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.\n Returns new items collection as a payload.</p>\n"
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
    "description": "<p>Should be used to mark <template> element as a template for tab heading </p>\n",
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
        "description": "<p>if set, will be added to the tab&#39;s class atribute </p>\n"
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
        "description": "<p>fired before tab will be removed </p>\n"
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
        "name": "showMeridian",
        "type": "boolean",
        "description": "<p>if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM </p>\n"
      },
      {
        "name": "showSpinners",
        "type": "boolean",
        "description": "<p>if true spinner arrows above and below the inputs will be shown </p>\n"
      }
    ],
    "outputs": [],
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
        "type": "number",
        "description": "<p>maximum time user can select </p>\n"
      },
      {
        "name": "meridians",
        "type": "string[]",
        "description": "<p>meridian labels based on locale </p>\n"
      },
      {
        "name": "min",
        "type": "number",
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
        "name": "showMeridian",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM </p>\n"
      },
      {
        "name": "showSpinners",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>if true spinner arrows above and below the inputs will be shown </p>\n"
      }
    ]
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
        "description": "<p>@deprecated - removed, will be added to configuration </p>\n"
      },
      {
        "name": "tooltipAppendToBody",
        "type": "boolean",
        "description": "<p>@deprecated - please use <code>container=&quot;body&quot;</code> instead </p>\n"
      },
      {
        "name": "tooltipClass",
        "type": "string",
        "description": "<p>@deprecated - will replaced with customClass </p>\n"
      },
      {
        "name": "tooltipContext",
        "type": "any",
        "description": "<p>@deprecated - removed </p>\n"
      },
      {
        "name": "tooltipEnable",
        "type": "boolean",
        "description": "<p>@deprecated - please use <code>isDisabled</code> instead </p>\n"
      },
      {
        "name": "tooltipFadeDuration",
        "defaultValue": "150",
        "type": "number",
        "description": "<p>@deprecated </p>\n"
      },
      {
        "name": "tooltipHtml",
        "type": "string | TemplateRef<any>",
        "description": "<p>@deprecated - please use <code>tooltip</code> instead </p>\n"
      },
      {
        "name": "tooltipIsOpen",
        "type": "boolean",
        "description": "<p>@deprecated - please use <code>isOpen</code> instead</p>\n"
      },
      {
        "name": "tooltipPlacement",
        "type": "string",
        "description": "<p>@deprecated - please use <code>placement</code> instead </p>\n"
      },
      {
        "name": "tooltipPopupDelay",
        "defaultValue": "0",
        "type": "number",
        "description": "<p>@deprecated </p>\n"
      },
      {
        "name": "tooltipTrigger",
        "type": "string | string[]",
        "description": "<p>@deprecated -  please use <code>triggers</code> instead </p>\n"
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
        "description": "<p>@deprecated </p>\n"
      }
    ],
    "properties": [
      {
        "name": "_appendToBody",
        "type": "boolean",
        "description": "<p>@deprecated - please use <code>container=&quot;body&quot;</code> instead </p>\n"
      },
      {
        "name": "_enable",
        "type": "boolean",
        "description": "<p>@deprecated - please use <code>isDisabled</code> instead </p>\n"
      },
      {
        "name": "_isOpen",
        "type": "boolean",
        "description": "<p>@deprecated - please use <code>isOpen</code> instead</p>\n"
      }
    ],
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
    "inputs": [
      {
        "name": "container",
        "type": "string",
        "description": "<p>A selector specifying the element the typeahead should be appended to.\nCurrently only supports &quot;body&quot;.</p>\n"
      },
      {
        "name": "optionsListTemplate",
        "type": "TemplateRef<any>",
        "description": "<p>used to specify a custom options list template. Template variables: matches, itemTemplate, query </p>\n"
      },
      {
        "name": "typeahead",
        "type": "any",
        "description": "<p>options source, can be Array of strings, objects or an Observable for external matching process </p>\n"
      },
      {
        "name": "typeaheadAsync",
        "type": "boolean",
        "description": "<p>should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large. </p>\n"
      },
      {
        "name": "typeaheadGroupField",
        "type": "string",
        "description": "<p>when options source is an array of objects, the name of field that contains the group value, matches are grouped by this field when set. </p>\n"
      },
      {
        "name": "typeaheadItemTemplate",
        "type": "TemplateRef<any>",
        "description": "<p>used to specify a custom item template. Template variables exposed are called item and index; </p>\n"
      },
      {
        "name": "typeaheadLatinize",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>match latin symbols. If true the word súper would match super and vice versa. </p>\n"
      },
      {
        "name": "typeaheadMinLength",
        "type": "number",
        "description": "<p>minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit) </p>\n"
      },
      {
        "name": "typeaheadOptionField",
        "type": "string",
        "description": "<p>when options source is an array of objects, the name of field that contains the options value, we use array item as option in case of this field is missing. Supports nested properties and methods. </p>\n"
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
        "description": "<p>should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes. </p>\n"
      },
      {
        "name": "typeaheadSingleWords",
        "defaultValue": "true",
        "type": "boolean",
        "description": "<p>break words with spaces. If true the text &quot;exact phrase&quot; here match would match with match exact phrase here but not with phrase here exact match (kind of &quot;google style&quot;). </p>\n"
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
        "description": "<p>should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space. </p>\n"
      }
    ],
    "outputs": [
      {
        "name": "typeaheadLoading",
        "description": "<p>fired when &#39;busy&#39; state of this component was changed, fired on async mode only, returns boolean </p>\n"
      },
      {
        "name": "typeaheadNoResults",
        "description": "<p>fired on every key event and returns true in case of matches are not detected </p>\n"
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
  },
  "Trigger": {
    "fileName": "src/utils/trigger.class.ts",
    "className": "Trigger",
    "description": "<p>@copyright Valor Software\n@copyright Angular ng-bootstrap team</p>\n",
    "methods": [],
    "properties": []
  }
};
