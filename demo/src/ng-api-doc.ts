/* tslint:disable */
export const ngdoc = {
  "AccordionPanelComponent": {
    "fileName": "src/accordion/accordion-group.component.ts",
    "className": "AccordionPanelComponent",
    "description": "",
    "selector": "accordion-group, accordion-panel",
    "inputs": [
      {
        "name": "heading",
        "type": "string",
        "description": "click able text in accordion's group header, check `accordion heading` below for using html in header "
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "description": "if <code>true</code> disables accordion group "
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "is accordion group open or closed "
      },
      {
        "name": "panelClass",
        "type": "string",
        "description": "provides an ability to use Bootstrap's contextual panel classes (`panel-primary`, `panel-success`, `panel-info`, etc...). List of all available classes [link](http://getbootstrap.com/components/#panels-alternatives) "
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "AccordionComponent": {
    "fileName": "src/accordion/accordion.component.ts",
    "className": "AccordionComponent",
    "description": "Displays collapsible content panels for presenting information in a limited amount of space. ",
    "selector": "accordion",
    "inputs": [
      {
        "name": "closeOthers",
        "type": "boolean",
        "description": "if `true` expanding one item will close all others "
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "AccordionConfig": {
    "fileName": "src/accordion/accordion.config.ts",
    "className": "AccordionConfig",
    "description": "Configuration service, provides default values for the AccordionComponent.",
    "methods": [],
    "properties": [
      {
        "name": "closeOthers",
        "defaultValue": "false",
        "type": "Boolean",
        "description": "Whether the other panels should be closed when a panel is opened "
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
        "description": "If set, displays an inline close button "
      },
      {
        "name": "dismissOnTimeout",
        "type": "string | number",
        "description": "Number of milliseconds, if specified sets a timeout duration, after which the alert will be closed "
      },
      {
        "name": "type",
        "defaultValue": "warning",
        "type": "string",
        "description": "Alert type. Provide one of the four supported by bootstrap contextual classes: `success`, `info`, `warning`, `danger` "
      }
    ],
    "outputs": [
      {
        "name": "onClose",
        "description": "This event fires immediately when the close instance method is called, $event is an instance of Alert component. "
      },
      {
        "name": "onClosed",
        "description": "This event fires when alert closed, $event is an instance of Alert component "
      }
    ],
    "properties": [],
    "methods": [
      {
        "name": "close",
        "description": "Closes an alert by removing it from the DOM.",
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
        "description": "is alerts are dismissible by default "
      },
      {
        "name": "dismissOnTimeout",
        "defaultValue": "undefined",
        "type": "number",
        "description": "default time before alert will dismiss "
      },
      {
        "name": "type",
        "defaultValue": "warning",
        "type": "string",
        "description": "default alert type "
      }
    ]
  },
  "ButtonCheckboxDirective": {
    "fileName": "src/buttons/button-checkbox.directive.ts",
    "className": "ButtonCheckboxDirective",
    "description": "Add checkbox functionality to any element",
    "selector": "[btnCheckbox]",
    "inputs": [
      {
        "name": "btnCheckboxFalse",
        "defaultValue": "false",
        "type": "any",
        "description": "falsy value, will be set to ngModel "
      },
      {
        "name": "btnCheckboxTrue",
        "defaultValue": "true",
        "type": "any",
        "description": "truthy value, will be set to ngModel "
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "ButtonRadioDirective": {
    "fileName": "src/buttons/button-radio.directive.ts",
    "className": "ButtonRadioDirective",
    "description": "Create radio buttons or groups of buttons.\nA value of a selected button is bound to a variable specified via ngModel.",
    "selector": "[btnRadio]",
    "inputs": [
      {
        "name": "btnRadio",
        "type": "any",
        "description": "radio button value, will be set to `ngModel` "
      },
      {
        "name": "uncheckable",
        "type": "boolean",
        "description": "if `true` radio button can be unchecked "
      },
      {
        "name": "value",
        "type": "any",
        "description": "current value of radio component or group "
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "CarouselComponent": {
    "fileName": "src/carousel/carousel.component.ts",
    "className": "CarouselComponent",
    "description": "Base element to create carousel",
    "selector": "carousel",
    "inputs": [
      {
        "name": "interval",
        "type": "number",
        "description": "Amount of time in milliseconds to delay between automatically\ncycling an item. If false, carousel will not automatically cycle"
      },
      {
        "name": "noPause",
        "type": "boolean",
        "description": "if `true` will disable pausing on carousel mouse hover "
      },
      {
        "name": "noTransition",
        "type": "boolean",
        "description": "if `true` will disable transitions on the carousel "
      },
      {
        "name": "noWrap",
        "type": "boolean",
        "description": "if `true` carousel will not cycle continuously and will have hard stops (prevent looping) "
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "SlideComponent": {
    "fileName": "src/carousel/slide.component.ts",
    "className": "SlideComponent",
    "description": "Wrap your content with `slide` component  ",
    "selector": "slide",
    "inputs": [
      {
        "name": "active",
        "type": "boolean",
        "description": "does current slide is active "
      },
      {
        "name": "direction",
        "type": "Direction",
        "description": ""
      },
      {
        "name": "index",
        "type": "number",
        "description": "index of slide in carousel's slides "
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "CollapseDirective": {
    "fileName": "src/collapse/collapse.directive.ts",
    "className": "CollapseDirective",
    "description": "",
    "selector": "[collapse]",
    "inputs": [
      {
        "name": "collapse",
        "type": "boolean",
        "description": "A flag indicating visibility of content (shown or hidden) "
      }
    ],
    "outputs": [
      {
        "name": "collapsed",
        "description": "This event fired as soon as content collapsed "
      },
      {
        "name": "expanded",
        "description": "This event fired as soon as content became visible "
      }
    ],
    "properties": [
      {
        "name": "collapse",
        "type": "boolean",
        "description": "A flag indicating visibility of content (shown or hidden) "
      }
    ],
    "methods": [
      {
        "name": "toggle",
        "description": "allows to manually toggle content visibility ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "allows to manually hide content ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "show",
        "description": "allows to manually show collapsed content ",
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
        "description": "@returns {ComponentLoader}",
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
        "description": "currently active date "
      },
      {
        "name": "customClass",
        "type": "{ date: Date; mode: string; clazz: string; }[]",
        "description": "array of custom css classes to be applied to targeted dates "
      },
      {
        "name": "dateDisabled",
        "type": "{ date: Date; mode: string; }[]",
        "description": "array of disabled dates "
      },
      {
        "name": "datepickerMode",
        "defaultValue": "day",
        "type": "string",
        "description": "sets datepicker mode, supports: `day`, `month`, `year` "
      },
      {
        "name": "formatDay",
        "type": "string",
        "description": "format of day in month "
      },
      {
        "name": "formatDayHeader",
        "type": "string",
        "description": "format of day in week header "
      },
      {
        "name": "formatDayTitle",
        "type": "string",
        "description": "format of title when selecting day "
      },
      {
        "name": "formatMonth",
        "type": "string",
        "description": "format of month in year "
      },
      {
        "name": "formatMonthTitle",
        "type": "string",
        "description": "format of title when selecting month "
      },
      {
        "name": "formatYear",
        "type": "string",
        "description": "format of year in year range "
      },
      {
        "name": "initDate",
        "type": "Date",
        "description": "default date to show if `ng-model` value is not specified "
      },
      {
        "name": "maxDate",
        "type": "Date",
        "description": "latest selectable date "
      },
      {
        "name": "maxMode",
        "type": "string",
        "description": "sets upper datepicker mode, supports: `day`, `month`, `year` "
      },
      {
        "name": "minDate",
        "type": "Date",
        "description": "oldest selectable date "
      },
      {
        "name": "minMode",
        "type": "string",
        "description": "set lower datepicker mode, supports: `day`, `month`, `year` "
      },
      {
        "name": "monthColLimit",
        "type": "number",
        "description": "number of months displayed in a single row of month picker "
      },
      {
        "name": "onlyCurrentMonth",
        "type": "boolean",
        "description": "if true only dates from the currently displayed month will be shown "
      },
      {
        "name": "shortcutPropagation",
        "type": "boolean",
        "description": "if true shortcut`s event propagation will be disabled "
      },
      {
        "name": "showWeeks",
        "defaultValue": "true",
        "type": "boolean",
        "description": "if false week numbers will be hidden "
      },
      {
        "name": "startingDay",
        "type": "number",
        "description": "starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday) "
      },
      {
        "name": "yearColLimit",
        "type": "number",
        "description": "number of years displayed in a single row of year picker "
      },
      {
        "name": "yearRange",
        "type": "number",
        "description": "number of years displayed in year selection "
      }
    ],
    "outputs": [
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
  "KeyboardNavDirective": {
    "fileName": "src/dropdown/dropdown-keyboard-nav.directive.ts",
    "className": "KeyboardNavDirective",
    "description": "",
    "selector": "[dropdown][dropdownKeyboardNav]",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "DropdownMenuDirective": {
    "fileName": "src/dropdown/dropdown-menu.directive.ts",
    "className": "DropdownMenuDirective",
    "description": "",
    "selector": "[dropdownMenu]",
    "exportAs": "bs-dropdown-menu",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "DropdownToggleDirective": {
    "fileName": "src/dropdown/dropdown-toggle.directive.ts",
    "className": "DropdownToggleDirective",
    "description": "Mark element which can toggle dropdown visibility with this directive ",
    "selector": "[dropdownToggle]",
    "exportAs": "bs-dropdown-toggle",
    "inputs": [
      {
        "name": "addToggleClass",
        "defaultValue": "true",
        "type": "boolean",
        "description": "if true the dropdown-toggle class will be added to the element "
      },
      {
        "name": "isDisabled",
        "defaultValue": "false",
        "type": "boolean",
        "description": "if true dropdown toggle will be disabled "
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "DropdownConfig": {
    "fileName": "src/dropdown/dropdown.config.ts",
    "className": "DropdownConfig",
    "description": "Default dropdown configuration ",
    "methods": [],
    "properties": [
      {
        "name": "autoClose",
        "defaultValue": "NONINPUT",
        "type": "string",
        "description": "default dropdown auto closing behavior "
      },
      {
        "name": "keyboardNav",
        "defaultValue": "false",
        "type": "Boolean",
        "description": "is keyboard navigation enabled by default "
      }
    ]
  },
  "DropdownDirective": {
    "fileName": "src/dropdown/dropdown.directive.ts",
    "className": "DropdownDirective",
    "description": "Mark dropdown content with this directive",
    "selector": "[dropdown]",
    "exportAs": "bs-dropdown",
    "inputs": [
      {
        "name": "appendToBody",
        "type": "boolean",
        "description": "Allows to attach dropdown to body, will be replaced with container=\"body\" "
      },
      {
        "name": "autoClose",
        "type": "string",
        "description": "behaviour vary:\n- nonInput - (default) automatically closes the dropdown when any of its elements is clicked — as long as the clicked element is not an input or a textarea.\n- always - automatically closes the dropdown when any of its elements is clicked\n- outsideClick - closes the dropdown automatically only when the user clicks any element outside the dropdown\n- disabled - disables the auto close. You can then control the open/close status of the dropdown manually, by using is-open. Please notice that the dropdown will still close if the toggle is clicked, the esc key is pressed or another dropdown is open"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "if `true` dropdown will be opened "
      },
      {
        "name": "keyboardNav",
        "type": "boolean",
        "description": "if true will enable navigation of dropdown list elements with the arrow keys "
      }
    ],
    "outputs": [
      {
        "name": "isOpenChange",
        "description": "fired when isOpen value changes "
      },
      {
        "name": "onToggle",
        "description": "fired when dropdown toggles, $event:boolean equals dropdown isOpen state "
      }
    ],
    "properties": [],
    "methods": []
  },
  "DropdownMenuInterface": {
    "fileName": "src/dropdown/dropdown.interfaces.ts",
    "className": "DropdownMenuInterface",
    "description": "",
    "methods": [],
    "properties": []
  },
  "DropdownToggleInterface": {
    "fileName": "src/dropdown/dropdown.interfaces.ts",
    "className": "DropdownToggleInterface",
    "description": "",
    "methods": [],
    "properties": []
  },
  "ModalBackdropComponent": {
    "fileName": "src/modal/modal-backdrop.component.ts",
    "className": "ModalBackdropComponent",
    "description": "This component will be added as background layout for modals if enabled ",
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
        "description": "Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click."
      },
      {
        "name": "ignoreBackdropClick",
        "type": "boolean",
        "description": "Ignore the backdrop click"
      },
      {
        "name": "keyboard",
        "type": "boolean",
        "description": "Closes the modal when escape key is pressed."
      },
      {
        "name": "show",
        "type": "boolean",
        "description": "Shows the modal when initialized."
      }
    ]
  },
  "ModalDirective": {
    "fileName": "src/modal/modal.component.ts",
    "className": "ModalDirective",
    "description": "Mark any code with directive to show it's content in modal ",
    "selector": "[bsModal]",
    "exportAs": "bs-modal",
    "inputs": [
      {
        "name": "config",
        "type": "ModalOptions",
        "description": "allows to set modal configuration via element property "
      }
    ],
    "outputs": [
      {
        "name": "onHidden",
        "description": "This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete). "
      },
      {
        "name": "onHide",
        "description": "This event is fired immediately when the hide instance method has been called. "
      },
      {
        "name": "onShow",
        "description": "This event fires immediately when the `show` instance method is called. "
      },
      {
        "name": "onShown",
        "description": "This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete) "
      }
    ],
    "properties": [
      {
        "name": "config",
        "type": "ModalOptions",
        "description": "allows to set modal configuration via element property "
      }
    ],
    "methods": [
      {
        "name": "toggle",
        "description": "Allows to manually toggle modal visibility ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "show",
        "description": "Allows to manually open modal ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "Allows to manually close modal ",
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
        "description": "if `true` aligns each link to the sides of pager "
      },
      {
        "name": "boundaryLinks",
        "type": "boolean",
        "description": "if false first and last buttons will be hidden "
      },
      {
        "name": "directionLinks",
        "type": "boolean",
        "description": "if false previous and next buttons will be hidden "
      },
      {
        "name": "disabled",
        "type": "boolean",
        "description": "if true pagination component will be disabled "
      },
      {
        "name": "firstText",
        "type": "string",
        "description": "first button text "
      },
      {
        "name": "itemsPerPage",
        "type": "number",
        "description": "maximum number of items per page. If value less than 1 will display all items on one page "
      },
      {
        "name": "lastText",
        "type": "string",
        "description": "last button text "
      },
      {
        "name": "maxSize",
        "type": "number",
        "description": "limit number for page links in pager "
      },
      {
        "name": "nextText",
        "type": "string",
        "description": "next button text "
      },
      {
        "name": "pageBtnClass",
        "type": "string",
        "description": "add class to <li> "
      },
      {
        "name": "previousText",
        "type": "string",
        "description": "previous button text "
      },
      {
        "name": "rotate",
        "type": "boolean",
        "description": "if true current page will in the middle of pages list "
      },
      {
        "name": "totalItems",
        "type": "number",
        "description": "total number of items in all pages "
      }
    ],
    "outputs": [
      {
        "name": "numPages",
        "description": "fired when total pages count changes, $event:number equals to total pages count "
      },
      {
        "name": "pageChanged",
        "description": "fired when page was changed, $event:{page, itemsPerPage} equals to object with current page index and number of items per page "
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
        "description": "if `true` aligns each link to the sides of pager "
      },
      {
        "name": "boundaryLinks",
        "type": "boolean",
        "description": "if false first and last buttons will be hidden "
      },
      {
        "name": "directionLinks",
        "type": "boolean",
        "description": "if false previous and next buttons will be hidden "
      },
      {
        "name": "disabled",
        "type": "boolean",
        "description": "if true pagination component will be disabled "
      },
      {
        "name": "firstText",
        "type": "string",
        "description": "first button text "
      },
      {
        "name": "itemsPerPage",
        "type": "number",
        "description": "maximum number of items per page. If value less than 1 will display all items on one page "
      },
      {
        "name": "lastText",
        "type": "string",
        "description": "last button text "
      },
      {
        "name": "maxSize",
        "type": "number",
        "description": "limit number for page links in pager "
      },
      {
        "name": "nextText",
        "type": "string",
        "description": "next button text "
      },
      {
        "name": "pageBtnClass",
        "type": "string",
        "description": "add class to <li> "
      },
      {
        "name": "previousText",
        "type": "string",
        "description": "previous button text "
      },
      {
        "name": "rotate",
        "type": "boolean",
        "description": "if true current page will in the middle of pages list "
      },
      {
        "name": "totalItems",
        "type": "number",
        "description": "total number of items in all pages "
      }
    ],
    "outputs": [
      {
        "name": "numPages",
        "description": "fired when total pages count changes, $event:number equals to total pages count "
      },
      {
        "name": "pageChanged",
        "description": "fired when page was changed, $event:{page, itemsPerPage} equals to object with current page index and number of items per page "
      }
    ],
    "properties": [],
    "methods": []
  },
  "PaginationConfig": {
    "fileName": "src/pagination/pagination.config.ts",
    "className": "PaginationConfig",
    "description": "Provides default values for Pagination and pager components ",
    "methods": [],
    "properties": []
  },
  "PopoverConfig": {
    "fileName": "src/popover/popover-config.ts",
    "className": "PopoverConfig",
    "description": "Configuration service for the Popover directive.\nYou can inject this service, typically in your root component, and customize\nthe values of its properties in order to provide default values for all the\npopovers used in the application.",
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
  "PopoverDirective": {
    "fileName": "src/popover/popover.directive.ts",
    "className": "PopoverDirective",
    "description": "A lightweight, extensible directive for fancy popover creation.",
    "selector": "[popover]",
    "exportAs": "bs-popover",
    "inputs": [
      {
        "name": "container",
        "type": "string",
        "description": "A selector specifying the element the popover should be appended to.\nCurrently only supports \"body\"."
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "Returns whether or not the popover is currently being shown"
      },
      {
        "name": "placement",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "description": "Placement of a popover. Accepts: \"top\", \"bottom\", \"left\", \"right\""
      },
      {
        "name": "popover",
        "type": "string | TemplateRef<any>",
        "description": "Content to be displayed as popover."
      },
      {
        "name": "popoverTitle",
        "type": "string",
        "description": "Title of a popover."
      },
      {
        "name": "triggers",
        "type": "string",
        "description": "Specifies events that should trigger. Supports a space separated list of\nevent names."
      }
    ],
    "outputs": [
      {
        "name": "onHidden",
        "description": "Emits an event when the popover is hidden"
      },
      {
        "name": "onShown",
        "description": "Emits an event when the popover is shown"
      }
    ],
    "properties": [],
    "methods": [
      {
        "name": "show",
        "description": "Opens an element’s popover. This is considered a “manual” triggering of\nthe popover.",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "Closes an element’s popover. This is considered a “manual” triggering of\nthe popover.",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "toggle",
        "description": "Toggles an element’s popover. This is considered a “manual” triggering of\nthe popover.",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "Positioning": {
    "fileName": "src/positioning/ng-positioning.ts",
    "className": "Positioning",
    "description": "@copyright Valor Software\n@copyright Angular ng-bootstrap team",
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
        "description": "If true component will be attached to body "
      },
      {
        "name": "attachment",
        "type": "string",
        "description": "A string of the form 'vert-attachment horiz-attachment' or 'placement'\n- placement can be \"top\", \"bottom\", \"left\", \"right\"\nnot yet supported:\n- vert-attachment can be any of 'top', 'middle', 'bottom'\n- horiz-attachment can be any of 'left', 'center', 'right'"
      },
      {
        "name": "element",
        "type": "string | ElementRef | HTMLElement",
        "description": "The DOM element, ElementRef, or a selector string of an element which will be moved "
      },
      {
        "name": "offset",
        "type": "string",
        "description": "A string of the form 'vert-offset horiz-offset'\n- vert-offset and horiz-offset can be of the form \"20px\" or \"55%\""
      },
      {
        "name": "target",
        "type": "string | ElementRef | HTMLElement",
        "description": "The DOM element, ElementRef, or a selector string of an element which the element will be attached to  "
      },
      {
        "name": "targetAttachment",
        "type": "string",
        "description": "A string similar to `attachment`. The one difference is that, if it's not provided, `targetAttachment` will assume the mirror image of `attachment`. "
      },
      {
        "name": "targetOffset",
        "type": "string",
        "description": "A string similar to `offset`, but referring to the offset of the target "
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
        "description": "provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` "
      },
      {
        "name": "value",
        "type": "number",
        "description": "current value of progress bar "
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
        "description": "if `true` changing value of progress bar will be animated (note: not supported by Bootstrap 4) "
      },
      {
        "name": "max",
        "type": "number",
        "description": "maximum total value of progress element "
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
        "description": "if `true` changing value of progress bar will be animated (note: not supported by Bootstrap 4) "
      },
      {
        "name": "max",
        "type": "number",
        "description": "maximum total value of progress element "
      },
      {
        "name": "type",
        "type": "string",
        "description": "provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` "
      },
      {
        "name": "value",
        "type": "number",
        "description": "current value of progress bar "
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
        "description": "if `true` changing value of progress bar will be animated (note: not supported by Bootstrap 4) "
      },
      {
        "name": "max",
        "defaultValue": "100",
        "type": "number",
        "description": "maximum total value of progress element "
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
        "description": "number of icons "
      },
      {
        "name": "ratingStates",
        "type": "{ stateOn: string; stateOff: string; }[]",
        "description": "array of custom icons classes "
      },
      {
        "name": "readonly",
        "type": "boolean",
        "description": "if true will not react on any user events "
      },
      {
        "name": "stateOff",
        "type": "string",
        "description": "unselected icon class "
      },
      {
        "name": "stateOn",
        "type": "string",
        "description": "selected icon class "
      },
      {
        "name": "titles",
        "type": "string[]",
        "description": "array of icons titles, default: ([\"one\", \"two\", \"three\", \"four\", \"five\"]) "
      }
    ],
    "outputs": [
      {
        "name": "onHover",
        "description": "fired when icon selected, $event:number equals to selected rating "
      },
      {
        "name": "onLeave",
        "description": "fired when icon selected, $event:number equals to previous rating value "
      }
    ],
    "properties": [],
    "methods": []
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
    "description": "Should be used to mark <template> element as a template for tab heading ",
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
        "description": "tab active state toggle "
      },
      {
        "name": "customClass",
        "type": "string",
        "description": "if set, will be added to the tab's class atribute "
      },
      {
        "name": "disabled",
        "type": "boolean",
        "description": "if true tab can not be activated "
      },
      {
        "name": "heading",
        "type": "string",
        "description": "tab header text "
      },
      {
        "name": "removable",
        "type": "boolean",
        "description": "if true tab can be removable, additional button will appear "
      }
    ],
    "outputs": [
      {
        "name": "deselect",
        "description": "fired when tab became inactive, $event:Tab equals to deselected instance of Tab component "
      },
      {
        "name": "removed",
        "description": "fired before tab will be removed "
      },
      {
        "name": "select",
        "description": "fired when tab became active, $event:Tab equals to selected instance of Tab component "
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
        "description": "if true tabs fill the container and have a consistent width "
      },
      {
        "name": "type",
        "type": "string",
        "description": "navigation context class: 'tabs' or 'pills' "
      },
      {
        "name": "vertical",
        "type": "boolean",
        "description": "if true tabs will be placed vertically "
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
        "description": "provides default navigation context class: 'tabs' or 'pills' "
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
        "description": "if true up/down arrowkeys inside hours and minutes inputs will change time "
      },
      {
        "name": "hourStep",
        "type": "number",
        "description": "hours change step "
      },
      {
        "name": "max",
        "type": "Date",
        "description": "maximum time user can select "
      },
      {
        "name": "meridians",
        "type": "string[]",
        "description": "meridian labels based on locale "
      },
      {
        "name": "min",
        "type": "Date",
        "description": "minimum time user can select "
      },
      {
        "name": "minuteStep",
        "type": "number",
        "description": "hours change step "
      },
      {
        "name": "mousewheel",
        "type": "boolean",
        "description": "if true scroll inside hours and minutes inputs will change time "
      },
      {
        "name": "readonlyInput",
        "type": "boolean",
        "description": "if true hours and minutes fields will be readonly "
      },
      {
        "name": "showMeridian",
        "type": "boolean",
        "description": "if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM "
      },
      {
        "name": "showSpinners",
        "type": "boolean",
        "description": "if true spinner arrows above and below the inputs will be shown "
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "TimepickerConfig": {
    "fileName": "src/timepicker/timepicker.config.ts",
    "className": "TimepickerConfig",
    "description": "Provides default configuration values for timepicker ",
    "methods": [],
    "properties": [
      {
        "name": "arrowkeys",
        "defaultValue": "true",
        "type": "boolean",
        "description": "if true up/down arrowkeys inside hours and minutes inputs will change time "
      },
      {
        "name": "hourStep",
        "defaultValue": "1",
        "type": "number",
        "description": "hours change step "
      },
      {
        "name": "max",
        "type": "number",
        "description": "maximum time user can select "
      },
      {
        "name": "meridians",
        "type": "string[]",
        "description": "meridian labels based on locale "
      },
      {
        "name": "min",
        "type": "number",
        "description": "minimum time user can select "
      },
      {
        "name": "minuteStep",
        "defaultValue": "5",
        "type": "number",
        "description": "hours change step "
      },
      {
        "name": "mousewheel",
        "defaultValue": "true",
        "type": "boolean",
        "description": "if true scroll inside hours and minutes inputs will change time "
      },
      {
        "name": "readonlyInput",
        "defaultValue": "false",
        "type": "boolean",
        "description": "if true hours and minutes fields will be readonly "
      },
      {
        "name": "showMeridian",
        "defaultValue": "true",
        "type": "boolean",
        "description": "if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM "
      },
      {
        "name": "showSpinners",
        "defaultValue": "true",
        "type": "boolean",
        "description": "if true spinner arrows above and below the inputs will be shown "
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
  "TooltipOptions": {
    "fileName": "src/tooltip/tooltip-options.class.ts",
    "className": "TooltipOptions",
    "description": "@deprecated ",
    "methods": [],
    "properties": []
  },
  "TooltipConfig": {
    "fileName": "src/tooltip/tooltip.config.ts",
    "className": "TooltipConfig",
    "description": "Default values provider for tooltip ",
    "methods": [],
    "properties": [
      {
        "name": "container",
        "type": "string",
        "description": "a selector specifying the element the tooltip should be appended to. Currently only supports \"body\" "
      },
      {
        "name": "placement",
        "defaultValue": "top",
        "type": "string",
        "description": "tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' "
      },
      {
        "name": "triggers",
        "defaultValue": "hover focus",
        "type": "string",
        "description": "array of event names which triggers tooltip opening "
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
        "description": "A selector specifying the element the tooltip should be appended to.\nCurrently only supports \"body\"."
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "description": "Allows to disable tooltip"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "Returns whether or not the tooltip is currently being shown"
      },
      {
        "name": "placement",
        "type": "string",
        "description": "Placement of a tooltip. Accepts: \"top\", \"bottom\", \"left\", \"right\""
      },
      {
        "name": "tooltip",
        "type": "string | TemplateRef<any>",
        "description": "Content to be displayed as tooltip."
      },
      {
        "name": "tooltipAnimation",
        "defaultValue": "true",
        "type": "boolean",
        "description": "@deprecated "
      },
      {
        "name": "tooltipAppendToBody",
        "type": "boolean",
        "description": "@deprecated "
      },
      {
        "name": "tooltipClass",
        "type": "string",
        "description": "@deprecated "
      },
      {
        "name": "tooltipContext",
        "type": "any",
        "description": "@deprecated "
      },
      {
        "name": "tooltipEnable",
        "type": "boolean",
        "description": "@deprecated "
      },
      {
        "name": "tooltipFadeDuration",
        "defaultValue": "150",
        "type": "number",
        "description": "@deprecated "
      },
      {
        "name": "tooltipHtml",
        "type": "string | TemplateRef<any>",
        "description": "@deprecated "
      },
      {
        "name": "tooltipIsOpen",
        "type": "boolean",
        "description": "@deprecated "
      },
      {
        "name": "tooltipPlacement",
        "type": "string",
        "description": "@deprecated "
      },
      {
        "name": "tooltipPopupDelay",
        "defaultValue": "0",
        "type": "number",
        "description": "@deprecated "
      },
      {
        "name": "tooltipTrigger",
        "type": "string | string[]",
        "description": "@deprecated "
      },
      {
        "name": "triggers",
        "type": "string",
        "description": "Specifies events that should trigger. Supports a space separated list of\nevent names."
      }
    ],
    "outputs": [
      {
        "name": "onHidden",
        "description": "Emits an event when the tooltip is hidden"
      },
      {
        "name": "onShown",
        "description": "Emits an event when the tooltip is shown"
      },
      {
        "name": "tooltipChange",
        "description": "Fired when tooltip content changes "
      },
      {
        "name": "tooltipStateChanged",
        "description": "@deprecated "
      }
    ],
    "properties": [
      {
        "name": "_appendToBody",
        "type": "boolean",
        "description": "@deprecated "
      },
      {
        "name": "_enable",
        "type": "boolean",
        "description": "@deprecated "
      },
      {
        "name": "_isOpen",
        "type": "boolean",
        "description": "@deprecated "
      }
    ],
    "methods": [
      {
        "name": "toggle",
        "description": "Toggles an element’s tooltip. This is considered a “manual” triggering of\nthe tooltip.",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "show",
        "description": "Opens an element’s tooltip. This is considered a “manual” triggering of\nthe tooltip.",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "hide",
        "description": "Closes an element’s tooltip. This is considered a “manual” triggering of\nthe tooltip.",
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
    "selector": "[typeahead][ngModel],[typeahead][formControlName]",
    "inputs": [
      {
        "name": "container",
        "type": "string",
        "description": "A selector specifying the element the typeahead should be appended to.\nCurrently only supports \"body\"."
      },
      {
        "name": "typeahead",
        "type": "any",
        "description": "options source, can be Array of strings, objects or an Observable for external matching process "
      },
      {
        "name": "typeaheadAsync",
        "type": "boolean",
        "description": "should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large. "
      },
      {
        "name": "typeaheadGroupField",
        "type": "string",
        "description": "when options source is an array of objects, the name of field that contains the group value, matches are grouped by this field when set. "
      },
      {
        "name": "typeaheadItemTemplate",
        "type": "TemplateRef<any>",
        "description": "used to specify a custom item template. Template variables exposed are called item and index; "
      },
      {
        "name": "typeaheadLatinize",
        "defaultValue": "true",
        "type": "boolean",
        "description": "match latin symbols. If true the word súper would match super and vice versa. "
      },
      {
        "name": "typeaheadMinLength",
        "type": "number",
        "description": "minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit) "
      },
      {
        "name": "typeaheadOptionField",
        "type": "string",
        "description": "when options source is an array of objects, the name of field that contains the options value, we use array item as option in case of this field is missing. Supports nested properties and methods. "
      },
      {
        "name": "typeaheadOptionsLimit",
        "type": "number",
        "description": "maximum length of options items list "
      },
      {
        "name": "typeaheadPhraseDelimiters",
        "defaultValue": "'\"",
        "type": "string",
        "description": "should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes. "
      },
      {
        "name": "typeaheadSingleWords",
        "defaultValue": "true",
        "type": "boolean",
        "description": "break words with spaces. If true the text \"exact phrase\" here match would match with match exact phrase here but not with phrase here exact match (kind of \"google style\"). "
      },
      {
        "name": "typeaheadWaitMs",
        "type": "number",
        "description": "minimal wait time after last character typed before typeahead kicks-in "
      },
      {
        "name": "typeaheadWordDelimiters",
        "defaultValue": " ",
        "type": "string",
        "description": "should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space. "
      }
    ],
    "outputs": [
      {
        "name": "typeaheadLoading",
        "description": "fired when 'busy' state of this component was changed, fired on async mode only, returns boolean "
      },
      {
        "name": "typeaheadNoResults",
        "description": "fired on every key event and returns true in case of matches are not detected "
      },
      {
        "name": "typeaheadOnSelect",
        "description": "fired when option was selected, return object with data of this option "
      }
    ],
    "properties": [
      {
        "name": "_container",
        "type": "TypeaheadContainerComponent",
        "description": "if false restrict model values to the ones selected from the popup only will be provided \nif false the first match automatically will not be focused as you type \nformat the ng-model result after selection \nif true automatically select an item when there is one option that exactly matches the user input \nif true select the currently highlighted match on blur \nif false don't focus the input element the typeahead directive is associated with on selection "
      }
    ],
    "methods": []
  },
  "Trigger": {
    "fileName": "src/utils/trigger.class.ts",
    "className": "Trigger",
    "description": "@copyright Valor Software\n@copyright Angular ng-bootstrap team",
    "methods": [],
    "properties": []
  }
};
