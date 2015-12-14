/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Host, OnInit, EventEmitter, DefaultValueAccessor, ElementRef, ViewContainerRef, NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES, Self, NgModel, Renderer;

import "datepicker-inner.dart" show DatePickerInner;

//const TEMPLATE_OPTIONS = const { "bs4" : const { "MONTH_BUTTON" : '''
//        <button type="button" style="min-width:100%;" class="btn btn-default"
//                [ngClass]="{\'btn-info\': dtz.selected, \'btn-link\': !dtz.selected && !datePicker.isActive(dtz), \'btn-info\': !dtz.selected && datePicker.isActive(dtz), disabled: dtz.disabled}"
//                [disabled]="dtz.disabled"
//                (click)="datePicker.select(dtz.date)" tabindex="-1"><span [ngClass]="{\'text-success\': dtz.current}">{{dtz.label}}</span></button>
//    '''}, "bs3" : const { "MONTH_BUTTON" : '''
//        <button type="button" style="min-width:100%;" class="btn btn-default"
//                [ngClass]="{\'btn-info\': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}"
//                [disabled]="dtz.disabled"
//                (click)="datePicker.select(dtz.date)" tabindex="-1"><span [ngClass]="{\'text-info\': dtz.current}">{{dtz.label}}</span></button>
//    '''}};

//const CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS [ Ng2BootstrapConfig.theme ] ||
//    TEMPLATE_OPTIONS.bs3;

@Component (selector: "monthpicker, [monthpicker]")
@View (template: '''
<table [hidden]="datePicker.datepickerMode!='month'" role="grid">
  <thead>
    <tr>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-left"
                (click)="datePicker.move(-1)" tabindex="-1">
          <i class="glyphicon glyphicon-chevron-left"></i>
        </button></th>
      <th>
        <button [id]="uniqueId + '-title'"
                type="button" class="btn btn-default btn-sm"
                (click)="datePicker.toggleMode()"
                [disabled]="datePicker.datepickerMode == maxMode"
                [ngClass]="{disabled: datePicker.datepickerMode == maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{title}}</strong>
        </button>
      </th>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-right"
                (click)="datePicker.move(1)" tabindex="-1">
          <i class="glyphicon glyphicon-chevron-right"></i>
        </button>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="#rowz of rows">
      <td *ngFor="#dtz of rowz" class="text-center" role="gridcell" id="{{dtz['uid']}}" [ngClass]="dtz['customClass']">

        <button type="button" style="min-width:100%;" class="btn btn-default"
                [ngClass]="{\'btn-info\': dtz['selected'], active: datePicker.isActive(dtz), disabled: dtz['disabled']}"
                [disabled]="dtz['disabled']"
                (click)="datePicker.select(dtz['date'])" tabindex="-1"><span [ngClass]="{\'text-info\': dtz['current']}">{{dtz['label']}}</span></button>


      </td>
    </tr>
  </tbody>
</table>
  ''', directives: const [ FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass])
class MonthPicker
    implements OnInit {
  DatePickerInner datePicker;

  String title;

  List<dynamic> rows = [];

  String maxMode = 'year';

  String uniqueId = '';

  MonthPicker(this.datePicker) {}

  ngOnInit() {
    datePicker.stepMonth = { "years" : 1};
    datePicker.setRefreshViewHandler(() {
      List<dynamic> months = new List(12);
      num year = datePicker.activeDate.year;
      var date;
      for (var i = 0; i < 12; i ++) {
        date = new DateTime (year, i, 1);
        datePicker.fixTimeZone(date);
        months[i] = datePicker.createDateObject(date, datePicker.formatMonth);
        months[i]['uid'] = datePicker.uniqueId + "-" + i.toString();
      }
      title = datePicker.dateFilter(datePicker.activeDate, datePicker.formatMonthTitle);
      rows = datePicker.split(months, 3);
    }, "month");
    this.datePicker.setCompareHandler((DateTime date1, DateTime date2) {
      var d1 = new DateTime (date1.year, date1.month);
      var d2 = new DateTime (date2.year, date2.month);
      return d1.millisecondsSinceEpoch - d2.millisecondsSinceEpoch;
    }, "month");
    this.datePicker.refreshView();
  }
}