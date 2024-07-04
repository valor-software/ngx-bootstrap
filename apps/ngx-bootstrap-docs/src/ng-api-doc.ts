/* tslint:disable */
export const ngdoc: any = {
  AccordionPanelComponent: {
    fileName: 'src/accordion/accordion-group.component.ts',
    className: 'AccordionPanelComponent',
    description:
      '<h3 id="accordion-heading">Accordion heading</h3>\n<p>Instead of using <code>heading</code> attribute on the <code>accordion-group</code>, you can use\nan <code>accordion-heading</code> attribute on <code>any</code> element inside of a group that\nwill be used as group&#39;s header template.</p>\n',
    methods: [],
    properties: [
      {
        name: 'heading',
        type: 'string',
        description:
          '<p>Clickable text in accordion&#39;s group header, check <code>accordion heading</code> below for using html in header</p>\n'
      },
      {
        name: 'isAnimated',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>turn on/off animation</p>\n'
      },
      {
        name: 'isDisabled',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>if <code>true</code> — disables accordion group</p>\n'
      },
      {
        name: 'isOpen',
        type: 'boolean',
        description: '<p>Is accordion group open or closed. This property supports two-way binding</p>\n'
      },
      {
        name: 'isOpenChange',
        type: 'EventEmitter<boolean>',
        description: '<p>Emits when the opened state changes</p>\n'
      },
      {
        name: 'panelClass',
        defaultValue: 'panel-default',
        type: 'string',
        description:
          '<p>Provides an ability to use Bootstrap&#39;s contextual panel classes\n(<code>panel-primary</code>, <code>panel-success</code>, <code>panel-info</code>, etc...).\nList of all available classes [available here]\n(<a href="https://getbootstrap.com/docs/3.3/components/#panels-alternatives" target="_blank" title="undefined">https://getbootstrap.com/docs/3.3/components/#panels-alternatives</a>)</p>\n'
      }
    ]
  },
  AccordionComponent: {
    fileName: 'src/accordion/accordion.component.ts',
    className: 'AccordionComponent',
    description:
      '<p>Displays collapsible content panels for presenting information in a limited amount of space.</p>\n',
    methods: [],
    properties: [
      {
        name: 'closeOthers',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>if <code>true</code> expanding one item will close all others</p>\n'
      },
      {
        name: 'isAnimated',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>turn on/off animation</p>\n'
      }
    ]
  },
  AccordionConfig: {
    fileName: 'src/accordion/accordion.config.ts',
    className: 'AccordionConfig',
    description: '<p>Configuration service, provides default values for the AccordionComponent.</p>\n',
    methods: [],
    properties: [
      {
        name: 'closeOthers',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>Whether the other panels should be closed when a panel is opened</p>\n'
      },
      {
        name: 'isAnimated',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>turn on/off animation</p>\n'
      }
    ]
  },
  ButtonCheckboxDirective: {
    fileName: 'src/buttons/button-checkbox.directive.ts',
    className: 'ButtonCheckboxDirective',
    description: '<p>Add checkbox functionality to any element</p>\n',
    methods: [],
    properties: [
      {
        name: 'btnCheckboxFalse',
        defaultValue: 'false',
        type: 'AvailableValues',
        description: '<p>Falsy value, will be set to ngModel</p>\n'
      },
      {
        name: 'btnCheckboxTrue',
        defaultValue: 'true',
        type: 'AvailableValues',
        description: '<p>Truthy value, will be set to ngModel</p>\n'
      }
    ]
  },
  ButtonRadioGroupDirective: {
    fileName: 'src/buttons/button-radio-group.directive.ts',
    className: 'ButtonRadioGroupDirective',
    description:
      '<p>A group of radio buttons.\nA value of a selected button is bound to a variable specified via ngModel.</p>\n',
    methods: [],
    properties: []
  },
  ButtonRadioDirective: {
    fileName: 'src/buttons/button-radio.directive.ts',
    className: 'ButtonRadioDirective',
    description:
      '<p>Create radio buttons or groups of buttons.\nA value of a selected button is bound to a variable specified via ngModel.</p>\n',
    methods: [],
    properties: [
      {
        name: 'btnRadio',
        type: 'unknown',
        description: '<p>Radio button value, will be set to <code>ngModel</code></p>\n'
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: '<p>If <code>true</code> — radio button is disabled</p>\n'
      },
      {
        name: 'uncheckable',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>If <code>true</code> — radio button can be unchecked</p>\n'
      },
      {
        name: 'value',
        type: 'unknown',
        description: '<p>Current value of radio component or group</p>\n'
      }
    ]
  },
  CarouselComponent: {
    fileName: 'src/carousel/carousel.component.ts',
    className: 'CarouselComponent',
    description: '<p>Base element to create carousel</p>\n',
    methods: [
      {
        name: 'addSlide',
        description:
          '<p>Adds new slide. If this slide is first in collection - set it as active\nand starts auto changing</p>\n',
        args: [
          {
            name: 'slide',
            type: 'SlideComponent'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'removeSlide',
        description: '<p>Removes specified slide. If this slide is active - will roll to another\nslide</p>\n',
        args: [
          {
            name: 'slide',
            type: 'SlideComponent'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'nextSlide',
        description: '<p>Rolling to next slide</p>\n',
        args: [
          {
            name: 'force',
            type: 'boolean'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'previousSlide',
        description: '<p>Rolling to previous slide</p>\n',
        args: [
          {
            name: 'force',
            type: 'boolean'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'keydownPress',
        description: '<p>Swith slides by enter, space and arrows keys</p>\n',
        args: [
          {
            name: 'event',
            type: 'KeyboardEvent'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'onMouseLeave',
        description: '<p>Play on mouse leave</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'onMouseUp',
        description: '<p>Play on mouse up</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'pauseFocusIn',
        description: '<p>When slides on focus autoplay is stopped(optional)</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'pauseFocusOut',
        description: '<p>When slides out of focus autoplay is started</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'selectSlide',
        description: '<p>Rolling to specified slide</p>\n',
        args: [
          {
            name: 'index',
            type: 'number'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'play',
        description: '<p>Starts a auto changing of slides</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'pause',
        description: '<p>Stops a auto changing of slides</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'getCurrentSlideIndex',
        description: '<p>Finds and returns index of currently displayed slide</p>\n',
        args: [],
        returnType: 'number'
      },
      {
        name: 'isLast',
        description: '<p>Defines, whether the specified index is last in collection</p>\n',
        args: [
          {
            name: 'index',
            type: 'number'
          }
        ],
        returnType: 'boolean'
      },
      {
        name: 'isFirst',
        description: '<p>Defines, whether the specified index is first in collection</p>\n',
        args: [
          {
            name: 'index',
            type: 'number'
          }
        ],
        returnType: 'boolean'
      },
      {
        name: 'findNextSlideIndex',
        description: '<p>Defines next slide index, depending of direction</p>\n',
        args: [
          {
            name: 'direction',
            type: 'Direction'
          },
          {
            name: 'force',
            type: 'boolean'
          }
        ],
        returnType: 'number | void'
      },
      {
        name: '_select',
        description: '<p>Sets a slide, which specified through index, as active</p>\n',
        args: [
          {
            name: 'index',
            type: 'number'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'restartTimer',
        description: '<p>Starts loop of auto changing of slides</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'resetTimer',
        description: '<p>Stops loop of auto changing of slides</p>\n',
        args: [],
        returnType: 'void'
      }
    ],
    properties: [
      {
        name: 'activeSlide',
        type: 'number',
        description: '<p>Index of currently displayed slide(started for 0)</p>\n'
      },
      {
        name: 'activeSlideChange',
        type: 'EventEmitter<number>',
        description:
          '<p>Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property</p>\n'
      },
      {
        name: 'interval',
        type: 'number',
        description:
          '<p>Delay of item cycling in milliseconds. If false, carousel won&#39;t cycle\nautomatically.</p>\n'
      },
      {
        name: 'isAnimated',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>Turn on/off animation. Animation doesn&#39;t work for multilist carousel</p>\n'
      },
      {
        name: 'slideRangeChange',
        type: 'EventEmitter<void | number[]>',
        description: '<p>Will be emitted when active slides has been changed in multilist mode</p>\n'
      }
    ]
  },
  SlideWithIndex: {
    fileName: 'src/carousel/models/index.ts',
    className: 'SlideWithIndex',
    description: '',
    methods: [],
    properties: []
  },
  IndexedSlideList: {
    fileName: 'src/carousel/models/index.ts',
    className: 'IndexedSlideList',
    description: '',
    methods: [],
    properties: []
  },
  DateParsingConfig: {
    fileName: 'src/chronos/create/parsing.types.ts',
    className: 'DateParsingConfig',
    description: '',
    methods: [],
    properties: [
      {
        name: '_a',
        type: 'DateArray',
        description: '<p>DateArray [year, month, date, .....]</p>\n'
      },
      {
        name: '_changeInProgress',
        type: 'boolean',
        description: '<p>used in set offset</p>\n'
      },
      {
        name: '_d',
        type: 'Date',
        description: '<p>date value</p>\n'
      },
      {
        name: '_f',
        type: 'string | string[]',
        description: '<p>date format</p>\n'
      },
      {
        name: '_i',
        type: 'DateInput',
        description: '<p>input to parse: could be string, number[], number, Date, object</p>\n'
      },
      {
        name: '_isPm',
        type: 'boolean',
        description: '<p>is PM</p>\n'
      },
      {
        name: '_isValid',
        type: 'boolean',
        description: '<p>is valid</p>\n'
      },
      {
        name: '_l',
        type: 'string',
        description: '<p>locale key, &#39;en&#39; by default</p>\n'
      },
      {
        name: '_locale',
        type: 'Locale',
        description: '<p>date locale obj</p>\n'
      },
      {
        name: '_meridiem',
        type: 'string',
        description: '<p>date meridiem</p>\n'
      },
      {
        name: '_nextDay',
        type: 'boolean',
        description: '<p>add one day to result at the end of parsing</p>\n'
      },
      {
        name: '_offset',
        type: 'number',
        description: '<p>utc time offset</p>\n'
      },
      {
        name: '_pf',
        type: 'DateParsingFlags',
        description: '<p>date parsing flags</p>\n'
      },
      {
        name: '_strict',
        type: 'boolean',
        description: '<p>use strict parse format</p>\n'
      },
      {
        name: '_tzm',
        type: 'number',
        description: '<p>time zone</p>\n'
      },
      {
        name: '_w',
        type: 'WeekParsing',
        description: '<p>week</p>\n'
      }
    ]
  },
  DateParsingFlags: {
    fileName: 'src/chronos/create/parsing.types.ts',
    className: 'DateParsingFlags',
    description: '',
    methods: [],
    properties: []
  },
  LocaleOptionsFormat: {
    fileName: 'src/chronos/locale/locale.class.ts',
    className: 'LocaleOptionsFormat',
    description: '',
    methods: [],
    properties: []
  },
  LocaleData: {
    fileName: 'src/chronos/locale/locale.class.ts',
    className: 'LocaleData',
    description: '',
    methods: [],
    properties: []
  },
  CalendarSpec: {
    fileName: 'src/chronos/moment/calendar.ts',
    className: 'CalendarSpec',
    description: '',
    methods: [],
    properties: []
  },
  MomentFn: {
    fileName: 'src/chronos/testing/chain.ts',
    className: 'MomentFn',
    description: '',
    methods: [],
    properties: []
  },
  MomentInputObject: {
    fileName: 'src/chronos/testing/chain.ts',
    className: 'MomentInputObject',
    description: '',
    methods: [],
    properties: []
  },
  TimeUnit: {
    fileName: 'src/chronos/types.ts',
    className: 'TimeUnit',
    description: '',
    methods: [],
    properties: []
  },
  DateFormatterOptions: {
    fileName: 'src/chronos/types.ts',
    className: 'DateFormatterOptions',
    description: '',
    methods: [],
    properties: []
  },
  DateObject: {
    fileName: 'src/chronos/types.ts',
    className: 'DateObject',
    description: '',
    methods: [],
    properties: []
  },
  WeekParsing: {
    fileName: 'src/chronos/types.ts',
    className: 'WeekParsing',
    description: '',
    methods: [],
    properties: []
  },
  ListenOptions: {
    fileName: 'src/utils/triggers.ts',
    className: 'ListenOptions',
    description: '',
    methods: [],
    properties: []
  },
  BsDatepickerConfig: {
    fileName: 'src/datepicker/bs-datepicker.config.ts',
    className: 'BsDatepickerConfig',
    description:
      '<p>For date range picker there are <code>BsDaterangepickerConfig</code> which inherits all properties,\nexcept <code>displayMonths</code>, for range picker it default to <code>2</code></p>\n',
    methods: [],
    properties: [
      {
        name: 'adaptivePosition',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>sets use adaptive position</p>\n'
      },
      {
        name: 'allowedPositions',
        type: 'string[]',
        description: '<p>Set allowed positions of container.</p>\n'
      },
      {
        name: 'clearButtonLabel',
        defaultValue: 'Clear',
        type: 'string',
        description: '<p>Label for &#39;clear&#39; button</p>\n'
      },
      {
        name: 'clearPosition',
        defaultValue: 'right',
        type: 'string',
        description: '<p>Positioning of &#39;clear&#39; button</p>\n'
      },
      {
        name: 'containerClass',
        defaultValue: 'theme-green',
        type: 'string',
        description:
          '<p>CSS class which will be applied to datepicker container,\nusually used to set color theme</p>\n'
      },
      {
        name: 'customRangeButtonLabel',
        defaultValue: 'Custom Range',
        type: 'string',
        description: '<p>Label for &#39;custom range&#39; button</p>\n'
      },
      {
        name: 'customTodayClass',
        type: 'string',
        description: '<p>Add class to current day</p>\n'
      },
      {
        name: 'dateCustomClasses',
        type: 'DatepickerDateCustomClasses[]',
        description: '<p>Default date custom classes for all date/range pickers</p>\n'
      },
      {
        name: 'datesDisabled',
        type: 'Date[]',
        description: '<p>Disable specific dates</p>\n'
      },
      {
        name: 'datesEnabled',
        type: 'Date[]',
        description: '<p>Enable specific dates</p>\n'
      },
      {
        name: 'dateTooltipTexts',
        type: 'DatepickerDateTooltipText[]',
        description: '<p>Default tooltip text for all date/range pickers</p>\n'
      },
      {
        name: 'daysDisabled',
        type: 'number[]',
        description: '<p>Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays</p>\n'
      },
      {
        name: 'displayOneMonthRange',
        type: 'boolean',
        description:
          '<p>Show one months for special cases (only for dateRangePicker)</p>\n<ol>\n<li>maxDate is equal to today&#39;s date</li>\n<li>minDate&#39;s month is equal to maxDate&#39;s month</li>\n</ol>\n'
      },
      {
        name: 'initCurrentTime',
        type: 'boolean',
        description: '<p>Set current hours, minutes, seconds and milliseconds for bsValue</p>\n'
      },
      {
        name: 'isAnimated',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>turn on/off animation</p>\n'
      },
      {
        name: 'keepDatepickerOpened',
        defaultValue: 'false',
        type: 'boolean',
        description:
          '<p>Set rule for datepicker closing. If value is true datepicker closes only if date is changed, if user changes only time datepicker doesn&#39;t close. It is available only if property withTimepicker is set true</p>\n'
      },
      {
        name: 'keepDatesOutOfRules',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>Allows keep invalid dates in range. Can be used with minDate, maxDate</p>\n'
      },
      {
        name: 'maxDate',
        type: 'Date',
        description: '<p>Default max date for all date/range pickers</p>\n'
      },
      {
        name: 'maxDateRange',
        type: 'number',
        description: '<p>Max Date Range in days</p>\n'
      },
      {
        name: 'minDate',
        type: 'Date',
        description: '<p>Default min date for all date/range pickers</p>\n'
      },
      {
        name: 'minMode',
        type: 'BsDatepickerViewMode',
        description: '<p>Default mode for all date pickers</p>\n'
      },
      {
        name: 'preventChangeToNextMonth',
        type: 'boolean',
        description:
          '<p>Prevents change to next month for right calendar in two calendars view (dateRangePicker only)</p>\n'
      },
      {
        name: 'rangeInputFormat',
        defaultValue: 'L',
        type: 'string',
        description: '<p>Date format for date range input field</p>\n'
      },
      {
        name: 'ranges',
        type: 'BsCustomDates[]',
        description: '<p>Predefined ranges</p>\n'
      },
      {
        name: 'returnFocusToInput',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>If true, returns focus to the datepicker / daterangepicker input after date selection</p>\n'
      },
      {
        name: 'selectFromOtherMonth',
        type: 'boolean',
        description: '<p>Makes dates from other months active</p>\n'
      },
      {
        name: 'selectWeek',
        type: 'boolean',
        description: '<p>Allows select first date of the week by click on week number</p>\n'
      },
      {
        name: 'selectWeekDateRange',
        type: 'boolean',
        description:
          '<p>Allows select daterange as first and last day of week by click on week number (dateRangePicker only)</p>\n'
      },
      {
        name: 'showClearButton',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>Shows clear button</p>\n'
      },
      {
        name: 'showPreviousMonth',
        type: 'boolean',
        description: '<p>Shows previous and current month, instead of current and next (dateRangePicker only)</p>\n'
      },
      {
        name: 'showTodayButton',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>Shows &#39;today&#39; button</p>\n'
      },
      {
        name: 'showWeekNumbers',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>Allows to hide week numbers in datepicker</p>\n'
      },
      {
        name: 'startView',
        defaultValue: 'day',
        type: 'BsDatepickerViewMode',
        description: '<p>The view that the datepicker should start in</p>\n'
      },
      {
        name: 'todayButtonLabel',
        defaultValue: 'Today',
        type: 'string',
        description: '<p>Label for &#39;today&#39; button</p>\n'
      },
      {
        name: 'todayPosition',
        defaultValue: 'center',
        type: 'string',
        description: '<p>Positioning of &#39;today&#39; button</p>\n'
      },
      {
        name: 'useUtc',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>sets use UTC date time format</p>\n'
      },
      {
        name: 'withTimepicker',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>Shows timepicker under datepicker</p>\n'
      }
    ]
  },
  FlagDaysCalendarOptions: {
    fileName: 'src/datepicker/engine/flag-days-calendar.ts',
    className: 'FlagDaysCalendarOptions',
    description: '',
    methods: [],
    properties: []
  },
  FlagMonthCalendarOptions: {
    fileName: 'src/datepicker/engine/flag-months-calendar.ts',
    className: 'FlagMonthCalendarOptions',
    description: '',
    methods: [],
    properties: []
  },
  FlagYearsCalendarOptions: {
    fileName: 'src/datepicker/engine/flag-years-calendar.ts',
    className: 'FlagYearsCalendarOptions',
    description: '',
    methods: [],
    properties: []
  },
  NavigationViewModel: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'NavigationViewModel',
    description: '<hr>\n',
    methods: [],
    properties: []
  },
  CalendarCellViewModel: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'CalendarCellViewModel',
    description: '',
    methods: [],
    properties: []
  },
  DayViewModel: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'DayViewModel',
    description: '<hr>\n',
    methods: [],
    properties: []
  },
  WeekViewModel: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'WeekViewModel',
    description: '',
    methods: [],
    properties: []
  },
  DaysCalendarViewModel: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'DaysCalendarViewModel',
    description: '',
    methods: [],
    properties: []
  },
  MonthsCalendarViewModel: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'MonthsCalendarViewModel',
    description: '<hr>\n',
    methods: [],
    properties: []
  },
  YearsCalendarViewModel: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'YearsCalendarViewModel',
    description: '<hr>\n',
    methods: [],
    properties: []
  },
  DaysCalendarModel: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'DaysCalendarModel',
    description: '<hr>\n',
    methods: [],
    properties: []
  },
  MonthViewOptions: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'MonthViewOptions',
    description: '<hr>\n',
    methods: [],
    properties: []
  },
  DatepickerFormatOptions: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'DatepickerFormatOptions',
    description: '<hr>\n',
    methods: [],
    properties: []
  },
  DatepickerRenderOptions: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'DatepickerRenderOptions',
    description: '',
    methods: [],
    properties: []
  },
  DatepickerDateCustomClasses: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'DatepickerDateCustomClasses',
    description: '',
    methods: [],
    properties: []
  },
  DatepickerDateTooltipText: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'DatepickerDateTooltipText',
    description: '',
    methods: [],
    properties: []
  },
  BsNavigationEvent: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'BsNavigationEvent',
    description: '',
    methods: [],
    properties: []
  },
  BsViewNavigationEvent: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'BsViewNavigationEvent',
    description: '',
    methods: [],
    properties: []
  },
  CellHoverEvent: {
    fileName: 'src/datepicker/models/index.ts',
    className: 'CellHoverEvent',
    description: '',
    methods: [],
    properties: []
  },
  BsDatepickerViewState: {
    fileName: 'src/datepicker/reducer/bs-datepicker.state.ts',
    className: 'BsDatepickerViewState',
    description: '',
    methods: [],
    properties: []
  },
  BsCustomDates: {
    fileName: 'src/datepicker/themes/bs/bs-custom-dates-view.component.ts',
    className: 'BsCustomDates',
    description: '',
    methods: [],
    properties: []
  },
  MatrixOptions: {
    fileName: 'src/datepicker/utils/matrix-utils.ts',
    className: 'MatrixOptions',
    description: '',
    methods: [],
    properties: []
  },
  BsDropdownConfig: {
    fileName: 'src/dropdown/bs-dropdown.config.ts',
    className: 'BsDropdownConfig',
    description: '<p>Default dropdown configuration</p>\n',
    methods: [],
    properties: [
      {
        name: 'autoClose',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>default dropdown auto closing behavior</p>\n'
      },
      {
        name: 'insideClick',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>default dropdown auto closing behavior</p>\n'
      },
      {
        name: 'isAnimated',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>turn on/off animation</p>\n'
      },
      {
        name: 'stopOnClickPropagation',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>value true of stopOnClickPropagation allows event stopPropagation</p>\n'
      }
    ]
  },
  ConfigurableFocusTrapConfig: {
    fileName: 'src/focus-trap/configurable-focus-trap-config.ts',
    className: 'ConfigurableFocusTrapConfig',
    description: '<p>Configuration for creating a ConfigurableFocusTrap.</p>\n',
    methods: [],
    properties: [
      {
        name: 'defer',
        defaultValue: 'false',
        type: 'boolean',
        description:
          '<p>Whether to defer the creation of FocusTrap elements to be\ndone manually by the user. Default is to create them\nautomatically.</p>\n'
      }
    ]
  },
  ConfigurableFocusTrapFactory: {
    fileName: 'src/focus-trap/configurable-focus-trap-factory.ts',
    className: 'ConfigurableFocusTrapFactory',
    description: '<p>Factory that allows easy instantiation of configurable focus traps.</p>\n',
    methods: [
      {
        name: 'create',
        description: '<p>Creates a focus-trapped region around the given element.</p>\n',
        args: [
          {
            name: 'element',
            type: 'HTMLElement'
          },
          {
            name: 'config',
            type: 'ConfigurableFocusTrapConfig'
          }
        ],
        returnType: 'ConfigurableFocusTrap'
      },
      {
        name: 'create',
        description: '<p>Creates a focus-trapped region around the given element.</p>\n',
        args: [
          {
            name: 'element',
            type: 'HTMLElement'
          },
          {
            name: 'deferCaptureElements',
            type: 'boolean'
          }
        ],
        returnType: 'ConfigurableFocusTrap'
      },
      {
        name: 'create',
        description: '<p>Creates a focus-trapped region around the given element.</p>\n',
        args: [
          {
            name: 'element',
            type: 'HTMLElement'
          },
          {
            name: 'config',
            type: 'boolean | ConfigurableFocusTrapConfig'
          }
        ],
        returnType: 'ConfigurableFocusTrap'
      }
    ],
    properties: []
  },
  ConfigurableFocusTrap: {
    fileName: 'src/focus-trap/configurable-focus-trap.ts',
    className: 'ConfigurableFocusTrap',
    description:
      '<p>Class that allows for trapping focus within a DOM element.</p>\n<p>This class uses a strategy pattern that determines how it traps focus.\nSee FocusTrapInertStrategy.</p>\n',
    methods: [
      {
        name: 'destroy',
        description: '<p>Notifies the FocusTrapManager that this FocusTrap will be destroyed.</p>\n',
        args: [],
        returnType: 'void'
      }
    ],
    properties: [
      {
        name: 'enabled',
        type: 'boolean',
        description: '<p>Whether the FocusTrap is enabled.</p>\n'
      }
    ]
  },
  EventListenerFocusTrapInertStrategy: {
    fileName: 'src/focus-trap/event-listener-inert-strategy.ts',
    className: 'EventListenerFocusTrapInertStrategy',
    description:
      '<p>Lightweight FocusTrapInertStrategy that adds a document focus event\nlistener to redirect focus back inside the FocusTrap.</p>\n',
    methods: [
      {
        name: 'preventFocus',
        description: '<p>Adds a document event listener that keeps focus inside the FocusTrap.</p>\n',
        args: [
          {
            name: 'focusTrap',
            type: 'ConfigurableFocusTrap'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'allowFocus',
        description: '<p>Removes the event listener added in preventFocus.</p>\n',
        args: [
          {
            name: 'focusTrap',
            type: 'ConfigurableFocusTrap'
          }
        ],
        returnType: 'void'
      },
      {
        name: '_trapFocus',
        description:
          '<p>Refocuses the first element in the FocusTrap if the focus event target was outside\nthe FocusTrap.</p>\n<p>This is an event listener callback. The event listener is added in runOutsideAngular,\nso all this code runs outside Angular as well.</p>\n',
        args: [
          {
            name: 'focusTrap',
            type: 'ConfigurableFocusTrap'
          },
          {
            name: 'event',
            type: 'FocusEvent'
          }
        ],
        returnType: 'void'
      }
    ],
    properties: [
      {
        name: '_listener',
        type: '(e: FocusEvent) => void',
        description: '<p>Focus event handler.</p>\n'
      }
    ]
  },
  FocusTrapInertStrategy: {
    fileName: 'src/focus-trap/focus-trap-inert-strategy.ts',
    className: 'FocusTrapInertStrategy',
    description:
      '<p>A strategy that dictates how FocusTrap should prevent elements\noutside of the FocusTrap from being focused.</p>\n',
    methods: [
      {
        name: 'preventFocus',
        description: '<p>Makes all elements outside focusTrap unfocusable.</p>\n',
        args: [
          {
            name: 'focusTrap',
            type: 'FocusTrap'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'allowFocus',
        description: '<p>Reverts elements made unfocusable by preventFocus to their previous state.</p>\n',
        args: [
          {
            name: 'focusTrap',
            type: 'FocusTrap'
          }
        ],
        returnType: 'void'
      }
    ],
    properties: []
  },
  ManagedFocusTrap: {
    fileName: 'src/focus-trap/focus-trap-manager.ts',
    className: 'ManagedFocusTrap',
    description:
      '<p>A FocusTrap managed by FocusTrapManager.\nImplemented by ConfigurableFocusTrap to avoid circular dependency.</p>\n',
    methods: [],
    properties: []
  },
  FocusTrapManager: {
    fileName: 'src/focus-trap/focus-trap-manager.ts',
    className: 'FocusTrapManager',
    description: '<p>Injectable that ensures only the most recently enabled FocusTrap is active.</p>\n',
    methods: [
      {
        name: 'register',
        description:
          '<p>Disables the FocusTrap at the top of the stack, and then pushes\nthe new FocusTrap onto the stack.</p>\n',
        args: [
          {
            name: 'focusTrap',
            type: 'ManagedFocusTrap'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'deregister',
        description:
          '<p>Removes the FocusTrap from the stack, and activates the\nFocusTrap that is the new top of the stack.</p>\n',
        args: [
          {
            name: 'focusTrap',
            type: 'ManagedFocusTrap'
          }
        ],
        returnType: 'void'
      }
    ],
    properties: []
  },
  FocusTrap: {
    fileName: 'src/focus-trap/focus-trap.ts',
    className: 'FocusTrap',
    description:
      '<p>Class that allows for trapping focus within a DOM element.</p>\n<p>This class currently uses a relatively simple approach to focus trapping.\nIt assumes that the tab order is the same as DOM order, which is not necessarily true.\nThings like <code>tabIndex &gt; 0</code>, flex <code>order</code>, and shadow roots can cause the two to misalign.</p>\n',
    methods: [
      {
        name: 'destroy',
        description: '<p>Destroys the focus trap by cleaning up the anchors.</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'attachAnchors',
        description:
          '<p>Inserts the anchors into the DOM. This is usually done automatically\nin the constructor, but can be deferred for cases like directives with <code>*ngIf</code>.</p>\n',
        args: [],
        returnType: 'boolean'
      },
      {
        name: 'focusInitialElementWhenReady',
        description:
          '<p>Waits for the zone to stabilize, then either focuses the first element that the\nuser specified, or the first tabbable element.</p>\n',
        args: [],
        returnType: 'Promise<boolean>'
      },
      {
        name: 'focusFirstTabbableElementWhenReady',
        description:
          '<p>Waits for the zone to stabilize, then focuses\nthe first tabbable element within the focus trap region.</p>\n',
        args: [],
        returnType: 'Promise<boolean>'
      },
      {
        name: 'focusLastTabbableElementWhenReady',
        description:
          '<p>Waits for the zone to stabilize, then focuses\nthe last tabbable element within the focus trap region.</p>\n',
        args: [],
        returnType: 'Promise<boolean>'
      },
      {
        name: '_getRegionBoundary',
        description: '<p>Get the specified boundary element of the trapped region.</p>\n',
        args: [
          {
            name: 'bound',
            type: '"start" | "end"'
          }
        ],
        returnType: 'HTMLElement'
      },
      {
        name: 'focusInitialElement',
        description: '<p>Focuses the element that should be focused when the focus trap is initialized.</p>\n',
        args: [],
        returnType: 'boolean'
      },
      {
        name: 'focusFirstTabbableElement',
        description: '<p>Focuses the first tabbable element within the focus trap region.</p>\n',
        args: [],
        returnType: 'boolean'
      },
      {
        name: 'focusLastTabbableElement',
        description: '<p>Focuses the last tabbable element within the focus trap region.</p>\n',
        args: [],
        returnType: 'boolean'
      },
      {
        name: 'hasAttached',
        description: '<p>Checks whether the focus trap has successfully been attached.</p>\n',
        args: [],
        returnType: 'boolean'
      },
      {
        name: '_getFirstTabbableElement',
        description: '<p>Get the first tabbable element from a DOM subtree (inclusive).</p>\n',
        args: [
          {
            name: 'root',
            type: 'HTMLElement'
          }
        ],
        returnType: 'HTMLElement'
      },
      {
        name: '_getLastTabbableElement',
        description: '<p>Get the last tabbable element from a DOM subtree (inclusive).</p>\n',
        args: [
          {
            name: 'root',
            type: 'HTMLElement'
          }
        ],
        returnType: 'HTMLElement'
      },
      {
        name: '_createAnchor',
        description: '<p>Creates an anchor element.</p>\n',
        args: [],
        returnType: 'HTMLElement'
      },
      {
        name: '_toggleAnchorTabIndex',
        description:
          '<p>Toggles the <code>tabindex</code> of an anchor, based on the enabled state of the focus trap.</p>\n',
        args: [
          {
            name: 'isEnabled',
            type: 'boolean'
          },
          {
            name: 'anchor',
            type: 'HTMLElement'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'toggleAnchors',
        description:
          '<p>Toggles the<code>tabindex</code> of both anchors to either trap Tab focus or allow it to escape.</p>\n',
        args: [
          {
            name: 'enabled',
            type: 'boolean'
          }
        ],
        returnType: 'void'
      },
      {
        name: '_executeOnStable',
        description: '<p>Executes a function when the zone is stable.</p>\n',
        args: [
          {
            name: 'fn',
            type: '() => any'
          }
        ],
        returnType: 'void'
      }
    ],
    properties: [
      {
        name: 'enabled',
        type: 'boolean',
        description: '<p>Whether the focus trap is active.</p>\n'
      }
    ]
  },
  FocusTrapFactory: {
    fileName: 'src/focus-trap/focus-trap.ts',
    className: 'FocusTrapFactory',
    description: '<p>Factory that allows easy instantiation of focus traps.</p>\n',
    methods: [
      {
        name: 'create',
        description: '<p>Creates a focus-trapped region around the given element.</p>\n',
        args: [
          {
            name: 'element',
            type: 'HTMLElement'
          },
          {
            name: 'deferCaptureElements',
            type: 'boolean'
          }
        ],
        returnType: 'FocusTrap'
      }
    ],
    properties: []
  },
  FocusTrapDirective: {
    fileName: 'src/focus-trap/focus-trap.ts',
    className: 'FocusTrapDirective',
    description: '<p>Directive for trapping focus within a region.</p>\n',
    methods: [],
    properties: [
      {
        name: '_previouslyFocusedElement',
        type: 'HTMLElement',
        description: '<p>Previously focused element to restore focus to upon destroy when using autoCapture.</p>\n'
      },
      {
        name: 'autoCapture',
        type: 'boolean',
        description:
          '<p>Whether the directive should automatically move focus into the trapped region upon\ninitialization and return focus to the previous activeElement upon destruction.</p>\n'
      },
      {
        name: 'enabled',
        type: 'boolean',
        description: '<p>Whether the focus trap is active.</p>\n'
      },
      {
        name: 'focusTrap',
        type: 'FocusTrap',
        description: '<p>Underlying FocusTrap instance.</p>\n'
      }
    ]
  },
  IsFocusableConfig: {
    fileName: 'src/focus-trap/interactivity-checker.ts',
    className: 'IsFocusableConfig',
    description: '<p>Configuration for the isFocusable method.</p>\n',
    methods: [],
    properties: [
      {
        name: 'ignoreVisibility',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>Whether to count an element as focusable even if it is not currently visible.</p>\n'
      }
    ]
  },
  InteractivityChecker: {
    fileName: 'src/focus-trap/interactivity-checker.ts',
    className: 'InteractivityChecker',
    description:
      '<p>Utility for checking the interactivity of an element, such as whether is is focusable or\ntabbable.</p>\n',
    methods: [
      {
        name: 'isDisabled',
        description: '<p>Gets whether an element is disabled.</p>\n',
        args: [
          {
            name: 'element',
            type: 'HTMLElement'
          }
        ],
        returnType: 'boolean'
      },
      {
        name: 'isVisible',
        description:
          '<p>Gets whether an element is visible for the purposes of interactivity.</p>\n<p>This will capture states like <code>display: none</code> and <code>visibility: hidden</code>, but not things like\nbeing clipped by an <code>overflow: hidden</code> parent or being outside the viewport.</p>\n',
        args: [
          {
            name: 'element',
            type: 'HTMLElement'
          }
        ],
        returnType: 'boolean'
      },
      {
        name: 'isTabbable',
        description:
          '<p>Gets whether an element can be reached via Tab key.\nAssumes that the element has already been checked with isFocusable.</p>\n',
        args: [
          {
            name: 'element',
            type: 'HTMLElement'
          }
        ],
        returnType: 'boolean'
      },
      {
        name: 'isFocusable',
        description: '<p>Gets whether an element can be focused by the user.</p>\n',
        args: [
          {
            name: 'element',
            type: 'HTMLElement'
          },
          {
            name: 'config',
            type: 'IsFocusableConfig'
          }
        ],
        returnType: 'boolean'
      }
    ],
    properties: []
  },
  Platform: {
    fileName: 'src/focus-trap/platform.ts',
    className: 'Platform',
    description:
      '<p>Service to detect the current platform by comparing the userAgent strings and\nchecking browser-specific global properties.</p>\n',
    methods: [],
    properties: [
      {
        name: 'ANDROID',
        type: 'boolean',
        description: '<p>Whether the current platform is Android.</p>\n'
      },
      {
        name: 'BLINK',
        type: 'boolean',
        description: '<p>Whether the current rendering engine is Blink.</p>\n'
      },
      {
        name: 'EDGE',
        type: 'boolean',
        description: '<p>Whether the current browser is Microsoft Edge.</p>\n'
      },
      {
        name: 'FIREFOX',
        type: 'boolean',
        description: '<p>Whether the current browser is Firefox.</p>\n'
      },
      {
        name: 'IOS',
        type: 'boolean',
        description: '<p>Whether the current platform is Apple iOS.</p>\n'
      },
      {
        name: 'isBrowser',
        type: 'boolean',
        description: '<p>Whether the Angular application is being rendered in the browser.</p>\n'
      },
      {
        name: 'SAFARI',
        type: 'boolean',
        description: '<p>Whether the current browser is Safari.</p>\n'
      },
      {
        name: 'TRIDENT',
        type: 'boolean',
        description: '<p>Whether the current rendering engine is Microsoft Trident.</p>\n'
      },
      {
        name: 'WEBKIT',
        type: 'boolean',
        description: '<p>Whether the current rendering engine is WebKit.</p>\n'
      }
    ]
  },
  Action: {
    fileName: 'src/mini-ngrx/public_api.ts',
    className: 'Action',
    description: '',
    methods: [],
    properties: []
  },
  ModalBackdropComponent: {
    fileName: 'src/modal/modal-backdrop.component.ts',
    className: 'ModalBackdropComponent',
    description: '<p>This component will be added as background layout for modals if enabled</p>\n',
    methods: [],
    properties: []
  },
  ModalDirective: {
    fileName: 'src/modal/modal.directive.ts',
    className: 'ModalDirective',
    description: '<p>Mark any code with directive to show it&#39;s content in modal</p>\n',
    methods: [
      {
        name: 'toggle',
        description: '<p>Allows to manually toggle modal visibility</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'show',
        description: '<p>Allows to manually open modal</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'hide',
        description: '<p>Check if we can close the modal</p>\n',
        args: [
          {
            name: 'event',
            type: 'Event'
          }
        ],
        returnType: 'void'
      },
      {
        name: '_hide',
        description: '<p>Manually close modal</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'showElement',
        description: '<p>Show dialog</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'focusOtherModal',
        description: '<p>Events tricks</p>\n',
        args: [],
        returnType: 'void'
      }
    ],
    properties: [
      {
        name: 'closeInterceptor',
        type: 'CloseInterceptorFn',
        description: '<p>allows to provide a callback to intercept the closure of the modal</p>\n'
      },
      {
        name: 'config',
        type: 'ModalOptions<Record<string, unknown>>',
        description: '<p>allows to set modal configuration via element property</p>\n'
      },
      {
        name: 'dismissReason',
        type: 'string',
        description:
          '<p>This field contains last dismiss reason.\nPossible values: <code>backdrop-click</code>, <code>esc</code> and <code>id: number</code>\n(if modal was closed by direct call of <code>.hide()</code>).</p>\n'
      },
      {
        name: 'onHidden',
        type: 'EventEmitter<ModalDirective>',
        description:
          '<p>This event is fired when the modal has finished being\nhidden from the user (will wait for CSS transitions to complete).</p>\n'
      },
      {
        name: 'onHide',
        type: 'EventEmitter<ModalDirective>',
        description: '<p>This event is fired immediately when\nthe hide instance method has been called.</p>\n'
      },
      {
        name: 'onShow',
        type: 'EventEmitter<ModalDirective>',
        description: '<p>This event fires immediately when the <code>show</code> instance method is called.</p>\n'
      },
      {
        name: 'onShown',
        type: 'EventEmitter<ModalDirective>',
        description:
          '<p>This event is fired when the modal has been made visible to the user\n(will wait for CSS transitions to complete)</p>\n'
      }
    ]
  },
  ClassName: {
    fileName: 'src/modal/models/index.ts',
    className: 'ClassName',
    description: '',
    methods: [],
    properties: []
  },
  Selector: {
    fileName: 'src/modal/models/index.ts',
    className: 'Selector',
    description: '',
    methods: [],
    properties: []
  },
  TransitionDurations: {
    fileName: 'src/modal/models/index.ts',
    className: 'TransitionDurations',
    description: '',
    methods: [],
    properties: []
  },
  DismissReasons: {
    fileName: 'src/modal/models/index.ts',
    className: 'DismissReasons',
    description: '',
    methods: [],
    properties: []
  },
  ConfigModel: {
    fileName: 'src/pagination/models/index.ts',
    className: 'ConfigModel',
    description: '',
    methods: [],
    properties: []
  },
  PagesModel: {
    fileName: 'src/pagination/models/index.ts',
    className: 'PagesModel',
    description: '<p>Contain information about the page</p>\n',
    methods: [],
    properties: [
      {
        name: 'active',
        type: 'boolean',
        description: '<p>If <code>true</code>, then this is the current page</p>\n'
      },
      {
        name: 'number',
        type: 'number',
        description: '<p>Page number</p>\n'
      },
      {
        name: 'text',
        type: 'string',
        description: '<p>Text, which is displayed in the link</p>\n'
      }
    ]
  },
  PagerModel: {
    fileName: 'src/pagination/models/index.ts',
    className: 'PagerModel',
    description: '',
    methods: [],
    properties: []
  },
  PaginationLinkContext: {
    fileName: 'src/pagination/models/index.ts',
    className: 'PaginationLinkContext',
    description:
      '<p>A context for the</p>\n<ul>\n<li><code>customPageTemplate</code></li>\n<li><code>customNextTemplate</code></li>\n<li><code>customPreviousTemplate</code></li>\n<li><code>customFirstTemplate</code></li>\n<li><code>customLastTemplate</code>\ninputs for link templates in case you want to override one</li>\n</ul>\n',
    methods: [],
    properties: [
      {
        name: 'currentPage',
        type: 'number',
        description: '<p>The currently selected page number</p>\n'
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: '<p>If <code>true</code>, the current link is disabled</p>\n'
      }
    ]
  },
  PaginationNumberLinkContext: {
    fileName: 'src/pagination/models/index.ts',
    className: 'PaginationNumberLinkContext',
    description: '<p>A context for the <code>pageTemplate</code> inputs for link template</p>\n',
    methods: [],
    properties: [
      {
        name: '$implicit',
        type: 'PagesModel',
        description: '<p>Contain the page information</p>\n'
      }
    ]
  },
  PageChangedEvent: {
    fileName: 'src/pagination/pagination.component.ts',
    className: 'PageChangedEvent',
    description: '',
    methods: [],
    properties: []
  },
  PaginationConfig: {
    fileName: 'src/pagination/pagination.config.ts',
    className: 'PaginationConfig',
    description: '<p>Provides default values for Pagination and pager components</p>\n',
    methods: [],
    properties: []
  },
  PopoverConfig: {
    fileName: 'src/popover/popover.config.ts',
    className: 'PopoverConfig',
    description:
      '<p>Configuration service for the Popover directive.\nYou can inject this service, typically in your root component, and customize\nthe values of its properties in order to provide default values for all the\npopovers used in the application.</p>\n',
    methods: [],
    properties: [
      {
        name: 'adaptivePosition',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>sets disable adaptive position</p>\n'
      },
      {
        name: 'container',
        type: 'string',
        description: '<p>A selector specifying the element the popover should be appended to.</p>\n'
      },
      {
        name: 'delay',
        defaultValue: '0',
        type: 'number',
        description: '<p>delay before showing the tooltip</p>\n'
      },
      {
        name: 'placement',
        defaultValue: 'top',
        type: 'string',
        description:
          '<p>Placement of a popover. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;, &quot;auto&quot;</p>\n'
      },
      {
        name: 'triggers',
        defaultValue: 'click',
        type: 'string',
        description: '<p>Specifies events that should trigger. Supports a space separated list of\nevent names.</p>\n'
      }
    ]
  },
  PopoverDirective: {
    fileName: 'src/popover/popover.directive.ts',
    className: 'PopoverDirective',
    description: '<p>A lightweight, extensible directive for fancy popover creation.</p>\n',
    methods: [
      {
        name: 'setAriaDescribedBy',
        description: '<p>Set attribute aria-describedBy for element directive and\nset id for the popover</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'show',
        description: '<p>Opens an element’s popover. This is considered a “manual” triggering of\nthe popover.</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'hide',
        description: '<p>Closes an element’s popover. This is considered a “manual” triggering of\nthe popover.</p>\n',
        args: [],
        returnType: 'void'
      },
      {
        name: 'toggle',
        description: '<p>Toggles an element’s popover. This is considered a “manual” triggering of\nthe popover.</p>\n',
        args: [],
        returnType: 'void'
      }
    ],
    properties: [
      {
        name: 'adaptivePosition',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>sets disable adaptive position</p>\n'
      },
      {
        name: 'container',
        type: 'string',
        description: '<p>A selector specifying the element the popover should be appended to.</p>\n'
      },
      {
        name: 'containerClass',
        type: 'string',
        description: '<p>Css class for popover container</p>\n'
      },
      {
        name: 'delay',
        defaultValue: '0',
        type: 'number',
        description: '<p>Delay before showing the tooltip</p>\n'
      },
      {
        name: 'isOpen',
        type: 'boolean',
        description: '<p>Returns whether or not the popover is currently being shown</p>\n'
      },
      {
        name: 'onHidden',
        type: 'EventEmitter<unknown>',
        description: '<p>Emits an event when the popover is hidden</p>\n'
      },
      {
        name: 'onShown',
        type: 'EventEmitter<unknown>',
        description: '<p>Emits an event when the popover is shown</p>\n'
      },
      {
        name: 'outsideClick',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>Close popover on outside click</p>\n'
      },
      {
        name: 'placement',
        defaultValue: 'top',
        type: 'AvailableBSPositions',
        description:
          '<p>Placement of a popover. Accepts: &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;</p>\n'
      },
      {
        name: 'popover',
        type: 'string | TemplateRef<any>',
        description: '<p>Content to be displayed as popover.</p>\n'
      },
      {
        name: 'popoverContext',
        type: 'any',
        description: '<p>Context to be used if popover is a template.</p>\n'
      },
      {
        name: 'popoverId',
        type: 'number',
        description: '<p>unique id popover - use for aria-describedby</p>\n'
      },
      {
        name: 'popoverTitle',
        type: 'string',
        description: '<p>Title of a popover.</p>\n'
      },
      {
        name: 'triggers',
        defaultValue: 'click',
        type: 'string',
        description: '<p>Specifies events that should trigger. Supports a space separated list of\nevent names.</p>\n'
      }
    ]
  },
  Offsets: {
    fileName: 'src/positioning/models/index.ts',
    className: 'Offsets',
    description: '',
    methods: [],
    properties: []
  },
  Data: {
    fileName: 'src/positioning/models/index.ts',
    className: 'Data',
    description: '',
    methods: [],
    properties: []
  },
  Options: {
    fileName: 'src/positioning/models/index.ts',
    className: 'Options',
    description: '',
    methods: [],
    properties: []
  },
  PositioningOptions: {
    fileName: 'src/positioning/positioning.service.ts',
    className: 'PositioningOptions',
    description: '',
    methods: [],
    properties: [
      {
        name: 'appendToBody',
        type: 'boolean',
        description: '<p>If true component will be attached to body</p>\n'
      },
      {
        name: 'attachment',
        type: 'string',
        description:
          '<p>A string of the form &#39;vert-attachment horiz-attachment&#39; or &#39;placement&#39;</p>\n<ul>\n<li>placement can be &quot;top&quot;, &quot;bottom&quot;, &quot;left&quot;, &quot;right&quot;\nnot yet supported:</li>\n<li>vert-attachment can be any of &#39;top&#39;, &#39;middle&#39;, &#39;bottom&#39;</li>\n<li>horiz-attachment can be any of &#39;left&#39;, &#39;center&#39;, &#39;right&#39;</li>\n</ul>\n'
      },
      {
        name: 'element',
        type: 'string | HTMLElement | ElementRef<any>',
        description: '<p>The DOM element, ElementRef, or a selector string of an element which will be moved</p>\n'
      },
      {
        name: 'offset',
        type: 'string',
        description:
          '<p>A string of the form &#39;vert-offset horiz-offset&#39;</p>\n<ul>\n<li>vert-offset and horiz-offset can be of the form &quot;20px&quot; or &quot;55%&quot;</li>\n</ul>\n'
      },
      {
        name: 'target',
        type: 'string | HTMLElement | ElementRef<any>',
        description:
          '<p>The DOM element, ElementRef, or a selector string of an element which the element will be attached to</p>\n'
      },
      {
        name: 'targetAttachment',
        type: 'string',
        description:
          '<p>A string similar to <code>attachment</code>. The one difference is that, if it&#39;s not provided,\n<code>targetAttachment</code> will assume the mirror image of <code>attachment</code>.</p>\n'
      },
      {
        name: 'targetOffset',
        type: 'string',
        description: '<p>A string similar to <code>offset</code>, but referring to the offset of the target</p>\n'
      }
    ]
  },
  BarValue: {
    fileName: 'src/progressbar/progressbar-type.interface.ts',
    className: 'BarValue',
    description: '',
    methods: [],
    properties: []
  },
  RatingResults: {
    fileName: 'src/rating/models/index.ts',
    className: 'RatingResults',
    description: '',
    methods: [],
    properties: []
  },
  RatingConfig: {
    fileName: 'src/rating/rating.config.ts',
    className: 'RatingConfig',
    description: '<p>Default values provider for rating</p>\n',
    methods: [],
    properties: [
      {
        name: 'ariaLabel',
        defaultValue: 'rating',
        type: 'string',
        description: '<p>aria label for rating</p>\n'
      }
    ]
  },
  Schema: {
    fileName: 'src/schematics/src/ng-add/schema.ts',
    className: 'Schema',
    description: '',
    methods: [],
    properties: []
  },
  availablePaths: {
    fileName: 'src/schematics/src/utils/addStyles.ts',
    className: 'availablePaths',
    description: '',
    methods: [],
    properties: []
  },
  DraggableItem: {
    fileName: 'src/sortable/draggable-item.ts',
    className: 'DraggableItem',
    description: '',
    methods: [],
    properties: []
  },
  SortableItem: {
    fileName: 'src/sortable/sortable.component.ts',
    className: 'SortableItem',
    description: '',
    methods: [],
    properties: []
  },
  TabHeadingDirective: {
    fileName: 'src/tabs/tab-heading.directive.ts',
    className: 'TabHeadingDirective',
    description: '<p>Should be used to mark <ng-template> element as a template for tab heading</p>\n',
    methods: [],
    properties: []
  },
  ControlValueAccessorModel: {
    fileName: 'src/timepicker/models/index.ts',
    className: 'ControlValueAccessorModel',
    description: '',
    methods: [],
    properties: []
  },
  TimepickerState: {
    fileName: 'src/timepicker/reducer/timepicker.reducer.ts',
    className: 'TimepickerState',
    description: '',
    methods: [],
    properties: []
  },
  TimepickerConfig: {
    fileName: 'src/timepicker/timepicker.config.ts',
    className: 'TimepickerConfig',
    description: '<p>Provides default configuration values for timepicker</p>\n',
    methods: [],
    properties: [
      {
        name: 'allowEmptyTime',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>if true emptyTime is not marked as invalid</p>\n'
      },
      {
        name: 'ariaLabelHours',
        defaultValue: 'hours',
        type: 'string',
        description: '<p>hours aria label</p>\n'
      },
      {
        name: 'ariaLabelMinutes',
        defaultValue: 'minutes',
        type: 'string',
        description: '<p>minutes aria label</p>\n'
      },
      {
        name: 'ariaLabelSeconds',
        defaultValue: 'seconds',
        type: 'string',
        description: '<p>seconds aria label</p>\n'
      },
      {
        name: 'arrowkeys',
        defaultValue: 'true',
        type: 'boolean',
        description:
          '<p>if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard</p>\n'
      },
      {
        name: 'disabled',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>if true hours and minutes fields will be disabled</p>\n'
      },
      {
        name: 'hoursPlaceholder',
        defaultValue: 'HH',
        type: 'string',
        description: '<p>placeholder for hours field in timepicker</p>\n'
      },
      {
        name: 'hourStep',
        defaultValue: '1',
        type: 'number',
        description: '<p>hours change step</p>\n'
      },
      {
        name: 'max',
        type: 'Date',
        description: '<p>maximum time user can select</p>\n'
      },
      {
        name: 'meridians',
        type: 'string[]',
        description: '<p>meridian labels based on locale</p>\n'
      },
      {
        name: 'min',
        type: 'Date',
        description: '<p>minimum time user can select</p>\n'
      },
      {
        name: 'minutesPlaceholder',
        defaultValue: 'MM',
        type: 'string',
        description: '<p>placeholder for minutes field in timepicker</p>\n'
      },
      {
        name: 'minuteStep',
        defaultValue: '5',
        type: 'number',
        description: '<p>minutes change step</p>\n'
      },
      {
        name: 'mousewheel',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>if true scroll inside hours and minutes inputs will change time</p>\n'
      },
      {
        name: 'readonlyInput',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>if true hours and minutes fields will be readonly</p>\n'
      },
      {
        name: 'secondsPlaceholder',
        defaultValue: 'SS',
        type: 'string',
        description: '<p>placeholder for seconds field in timepicker</p>\n'
      },
      {
        name: 'secondsStep',
        defaultValue: '10',
        type: 'number',
        description: '<p>seconds changes step</p>\n'
      },
      {
        name: 'showMeridian',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM</p>\n'
      },
      {
        name: 'showMinutes',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>show minutes in timepicker</p>\n'
      },
      {
        name: 'showSeconds',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>show seconds in timepicker</p>\n'
      },
      {
        name: 'showSpinners',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>if true spinner arrows above and below the inputs will be shown</p>\n'
      }
    ]
  },
  Time: {
    fileName: 'src/timepicker/timepicker.models.ts',
    className: 'Time',
    description: '',
    methods: [],
    properties: []
  },
  TimepickerControls: {
    fileName: 'src/timepicker/timepicker.models.ts',
    className: 'TimepickerControls',
    description: '',
    methods: [],
    properties: []
  },
  TimepickerComponentState: {
    fileName: 'src/timepicker/timepicker.models.ts',
    className: 'TimepickerComponentState',
    description: '',
    methods: [],
    properties: []
  },
  TimeChangeEvent: {
    fileName: 'src/timepicker/timepicker.models.ts',
    className: 'TimeChangeEvent',
    description: '',
    methods: [],
    properties: []
  },
  TooltipConfig: {
    fileName: 'src/tooltip/tooltip.config.ts',
    className: 'TooltipConfig',
    description: '<p>Default values provider for tooltip</p>\n',
    methods: [],
    properties: [
      {
        name: 'adaptivePosition',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>sets disable adaptive position</p>\n'
      },
      {
        name: 'container',
        type: 'string',
        description: '<p>a selector specifying the element the tooltip should be appended to.</p>\n'
      },
      {
        name: 'delay',
        defaultValue: '0',
        type: 'number',
        description: '<p>delay before showing the tooltip</p>\n'
      },
      {
        name: 'placement',
        defaultValue: 'top',
        type: 'string',
        description:
          '<p>tooltip placement, supported positions: &#39;top&#39;, &#39;bottom&#39;, &#39;left&#39;, &#39;right&#39;</p>\n'
      },
      {
        name: 'triggers',
        defaultValue: 'hover focus',
        type: 'string',
        description: '<p>array of event names which triggers tooltip opening</p>\n'
      }
    ]
  },
  TypeaheadOptionListContext: {
    fileName: 'src/typeahead/models/index.ts',
    className: 'TypeaheadOptionListContext',
    description:
      '<p>A context for the <code>optionsListTemplate</code>\ninput template in case you want to override default one</p>\n',
    methods: [],
    properties: [
      {
        name: '$implicit',
        type: 'TypeaheadTemplateMethods',
        description: '<p>Typeahead template methods</p>\n'
      },
      {
        name: 'itemTemplate',
        type: 'TemplateRef<TypeaheadOptionItemContext>',
        description: '<p>Item template</p>\n'
      },
      {
        name: 'matches',
        type: 'TypeaheadMatch<any>[]',
        description: '<p>All matches</p>\n'
      },
      {
        name: 'query',
        type: 'string | string[]',
        description: '<p>Search query</p>\n'
      }
    ]
  },
  TypeaheadOptionItemContext: {
    fileName: 'src/typeahead/models/index.ts',
    className: 'TypeaheadOptionItemContext',
    description:
      '<p>A context for the <code>typeaheadItemTemplate</code>\ninput template in case you want to override default one</p>\n',
    methods: [],
    properties: [
      {
        name: 'index',
        type: 'number',
        description: '<p>Item index</p>\n'
      },
      {
        name: 'item',
        type: 'unknown',
        description: '<p>Item</p>\n'
      },
      {
        name: 'match',
        type: 'TypeaheadMatch<any>',
        description: '<p>Typeahead match</p>\n'
      },
      {
        name: 'query',
        type: 'string | string[]',
        description: '<p>Search query</p>\n'
      }
    ]
  },
  TypeaheadTemplateMethods: {
    fileName: 'src/typeahead/models/index.ts',
    className: 'TypeaheadTemplateMethods',
    description: '<p>Methods for <code>optionsListTemplate</code> context</p>\n',
    methods: [
      {
        name: 'selectMatch',
        description: '<p>Function to select an option by click event</p>\n',
        args: [
          {
            name: 'value',
            type: 'TypeaheadMatch<any>'
          },
          {
            name: 'e',
            type: 'Event'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'selectActive',
        description: '<p>Function to select an option by mouseenter event</p>\n',
        args: [
          {
            name: 'value',
            type: 'TypeaheadMatch<any>'
          }
        ],
        returnType: 'void'
      },
      {
        name: 'isActive',
        description: '<p>Function to check if an option is active</p>\n',
        args: [
          {
            name: 'value',
            type: 'TypeaheadMatch<any>'
          }
        ],
        returnType: 'boolean'
      }
    ],
    properties: []
  },
  TypeaheadOrder: {
    fileName: 'src/typeahead/typeahead-order.class.ts',
    className: 'TypeaheadOrder',
    description: '',
    methods: [],
    properties: [
      {
        name: 'direction',
        type: '"asc" | "desc"',
        description: '<p>ordering direction, could be &#39;asc&#39; or &#39;desc&#39;</p>\n'
      },
      {
        name: 'field',
        type: 'string',
        description: '<p>field for sorting</p>\n'
      }
    ]
  },
  TypeaheadConfig: {
    fileName: 'src/typeahead/typeahead.config.ts',
    className: 'TypeaheadConfig',
    description: '<p>Default values provider for typeahead</p>\n',
    methods: [],
    properties: [
      {
        name: 'adaptivePosition',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>sets use adaptive position</p>\n'
      },
      {
        name: 'cancelRequestOnFocusLost',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>if true, typeahead will cancel async request on blur</p>\n'
      },
      {
        name: 'hideResultsOnBlur',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>used to hide results on blur</p>\n'
      },
      {
        name: 'isAnimated',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>turn on/off animation</p>\n'
      },
      {
        name: 'isFirstItemActive',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>used to active/inactive the first item in typeahead container</p>\n'
      },
      {
        name: 'minLength',
        defaultValue: '1',
        type: 'number',
        description:
          '<p>used to choose set minimal no of characters that needs to\nbe entered before typeahead kicks-in</p>\n'
      },
      {
        name: 'selectFirstItem',
        defaultValue: 'true',
        type: 'boolean',
        description: '<p>used to choose the first item in typeahead container</p>\n'
      },
      {
        name: 'selectItemOnBlur',
        defaultValue: 'false',
        type: 'boolean',
        description: '<p>used to choose item on blur event</p>\n'
      }
    ]
  },
  ListNode: {
    fileName: 'src/utils/linked-list.class.ts',
    className: 'ListNode',
    description: '',
    methods: [],
    properties: []
  },
  IObjectKeys: {
    fileName: 'src/utils/theme-provider.ts',
    className: 'IObjectKeys',
    description: '',
    methods: [],
    properties: []
  },
  IBsVersion: {
    fileName: 'src/utils/theme-provider.ts',
    className: 'IBsVersion',
    description: '',
    methods: [],
    properties: []
  }
};
