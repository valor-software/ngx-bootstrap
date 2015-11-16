import {
  Component, View, Host,
  OnInit, EventEmitter,
  DefaultValueAccessor,
  ElementRef, ViewContainerRef,
  NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES,
  Self, NgModel, Renderer
} from 'angular2/angular2';

import * as moment from 'moment';

import {DateFormatter} from './date-formatter';

const FORMAT_DAY:string = 'DD';
const FORMAT_MONTH:string = 'MMMM';
const FORMAT_YEAR:string = 'YYYY';
const FORMAT_DAY_HEADER:string = 'dd';
const FORMAT_DAY_TITLE:string = 'MMMM YYYY';
const FORMAT_MONTH_TITLE:string = 'YYYY';
const DATEPICKER_MODE:string = 'day';
const MIN_MODE:string = 'day';
const MAX_MODE:string = 'year';
const SHOW_WEEKS:boolean = true;
const STARTING_DAY:number = 0;
const YEAR_RANGE:number = 20;
const MIN_DATE:Date = null;
const MAX_DATE:Date = null;
const SHORTCUT_PROPAGATION:boolean = false;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const KEYS = {
  13: 'enter',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

@Component({
  selector: 'datepicker-inner',
  events: ['update'],
  properties: [
    'activeDate',
    'datepickerMode',
    'initDate',
    'minDate',
    'maxDate',
    'minMode',
    'maxMode',
    'showWeeks',
    'formatDay',
    'formatMonth',
    'formatYear',
    'formatDayHeader',
    'formatDayTitle',
    'formatMonthTitle',
    'startingDay',
    'yearRange',
    'shortcutPropagation',
    'customClass',
    'dateDisabled',
    'templateUrl'
  ]
})
@View({
  template: `
<div [hidden]="!datepickerMode" class="well well-sm bg-faded p-a card" role="application" ><!--&lt;!&ndash;ng-keydown="keydown($event)"&ndash;&gt;-->
  <ng-content></ng-content>
</div>
  `,
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass, NgModel]
})
export class DatePickerInner implements OnInit {
  public datepickerMode:string;
  public startingDay:number;
  public yearRange:number;
  public stepDay:any = {};
  public stepMonth:any = {};
  public stepYear:any = {};

  private modes:Array<string> = ['day', 'month', 'year'];
  private dateFormatter:DateFormatter = new DateFormatter();
  private uniqueId:string;
  private _initDate:Date;
  private _activeDate:Date;
  private activeDateId:string;
  private minDate:Date;
  private maxDate:Date;
  private minMode:string;
  private maxMode:string;
  private showWeeks:boolean;
  private formatDay:string;
  private formatMonth:string;
  private formatYear:string;
  private formatDayHeader:string;
  private formatDayTitle:string;
  private formatMonthTitle:string;
  private shortcutPropagation:boolean;
  // todo: change type during implementation
  private customClass:any;
  // todo: change type during implementation
  private dateDisabled:any;
  private templateUrl:string;

  private refreshViewHandlerDay:Function;
  private compareHandlerDay:Function;
  private refreshViewHandlerMonth:Function;
  private compareHandlerMonth:Function;
  private refreshViewHandlerYear:Function;
  private compareHandlerYear:Function;
  private update:EventEmitter<Date> = new EventEmitter();

  private get initDate():Date {
    return this._initDate;
  }

  private set initDate(value:Date) {
    this._initDate = value;
  }

  private get activeDate():Date {
    return this._activeDate;
  }

  private set activeDate(value:Date) {
    this._activeDate = value;
    this.refreshView();
  }

  // todo: add formatter value to Date object
  onInit() {
    this.formatDay = this.formatDay || FORMAT_DAY;
    this.formatMonth = this.formatMonth || FORMAT_MONTH;
    this.formatYear = this.formatYear || FORMAT_YEAR;
    this.formatDayHeader = this.formatDayHeader || FORMAT_DAY_HEADER;
    this.formatDayTitle = this.formatDayTitle || FORMAT_DAY_TITLE;
    this.formatMonthTitle = this.formatMonthTitle || FORMAT_MONTH_TITLE;
    this.showWeeks = this.showWeeks || SHOW_WEEKS;
    this.startingDay = this.startingDay || STARTING_DAY;
    this.yearRange = this.yearRange || YEAR_RANGE;
    this.shortcutPropagation = this.shortcutPropagation || SHORTCUT_PROPAGATION;
    this.datepickerMode = this.datepickerMode || DATEPICKER_MODE;
    this.minMode = this.minMode || MIN_MODE;
    this.maxMode = this.maxMode || MAX_MODE;

    // todo: use date for unique value
    this.uniqueId = 'datepicker-' + '-' + Math.floor(Math.random() * 10000);

    if (this.initDate) {
      this.activeDate = this.initDate;
    } else {
      this.activeDate = new Date();
    }

    this.update.next(this.activeDate);
    this.refreshView();
  }

  public setCompareHandler(handler:Function, type:string) {
    if (type === 'day') {
      this.compareHandlerDay = handler;
    }

    if (type === 'month') {
      this.compareHandlerMonth = handler;
    }

    if (type === 'year') {
      this.compareHandlerYear = handler;
    }
  }

  public compare(date1:Date, date2:Date):number {
    if (this.datepickerMode === 'day' && this.compareHandlerDay) {
      return this.compareHandlerDay(date1, date2);
    }

    if (this.datepickerMode === 'month' && this.compareHandlerMonth) {
      return this.compareHandlerMonth(date1, date2);
    }

    if (this.datepickerMode === 'year' && this.compareHandlerMonth) {
      return this.compareHandlerYear(date1, date2);
    }

    return null;
  }

  public setRefreshViewHandler(handler:Function, type:string) {
    if (type === 'day') {
      this.refreshViewHandlerDay = handler;
    }

    if (type === 'month') {
      this.refreshViewHandlerMonth = handler;
    }

    if (type === 'year') {
      this.refreshViewHandlerYear = handler;
    }
  }

  public refreshView() {
    if (this.datepickerMode === 'day' && this.refreshViewHandlerDay) {
      this.refreshViewHandlerDay();
    }

    if (this.datepickerMode === 'month' && this.refreshViewHandlerMonth) {
      this.refreshViewHandlerMonth();
    }

    if (this.datepickerMode === 'year' && this.refreshViewHandlerYear) {
      this.refreshViewHandlerYear();
    }
  }

  public dateFilter(date:Date, format:string):string {
    return this.dateFormatter.format(date, format);
  }

  private isActive(dateObject:any):boolean {
    if (this.compare(dateObject.date, this.activeDate) === 0) {
      this.activeDateId = dateObject.uid;
      return true;
    }

    return false;
  }

  private createDateObject(date:Date, format:string):any {
    let dateObject:any = {};
    dateObject.date = date;
    dateObject.label = this.dateFilter(date, format);
    dateObject.selected = this.compare(date, this.activeDate) === 0;
    dateObject.disabled = this.isDisabled(date);
    dateObject.current = this.compare(date, new Date()) === 0;
    // todo: do it
    // dateObject.customClass = this.customClass({date: date, mode: this.datepickerMode}) || {};
    return dateObject;
  }

  private isDisabled(date:Date):boolean {
    // todo: implement dateDisabled attribute
    return ((this.minDate && this.compare(date, this.minDate) < 0) ||
    (this.maxDate && this.compare(date, this.maxDate) > 0));
  };

  private split(arr:Array<any>, size:number) {
    let arrays:Array<any> = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  }

  // Fix a hard-reprodusible bug with timezones
  // The bug depends on OS, browser, current timezone and current date
  // i.e.
  // var date = new Date(2014, 0, 1);
  // console.log(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
  // can result in "2013 11 31 23" because of the bug.
  public fixTimeZone(date:Date) {
    let hours = date.getHours();
    date.setHours(hours === 23 ? hours + 2 : 0);
  }

  public select(date:Date) {
    if (this.datepickerMode === this.minMode) {
      if (!this.activeDate) {
        this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
      }

      this.activeDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    } else {
      this.activeDate = date;
      this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
    }

    this.update.next(this.activeDate);
    this.refreshView();
  }

  public move(direction:number) {
    let expectedStep;
    if (this.datepickerMode === 'day') {
      expectedStep = this.stepDay;
    }

    if (this.datepickerMode === 'month') {
      expectedStep = this.stepMonth;
    }

    if (this.datepickerMode === 'year') {
      expectedStep = this.stepYear;
    }

    if (expectedStep) {
      let year = this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
      let month = this.activeDate.getMonth() + direction * (expectedStep.months || 0);
      this.activeDate.setFullYear(year, month, 1);

      this.update.next(this.activeDate);
      this.refreshView();
    }
  }

  public toggleMode(direction:number) {
    direction = direction || 1;

    if ((this.datepickerMode === this.maxMode && direction === 1) ||
      (this.datepickerMode === this.minMode && direction === -1)) {
      return;
    }

    this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
    this.refreshView();
  }

  // todo: implement key events later
}
