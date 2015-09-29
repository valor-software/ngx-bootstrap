/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Host, OnInit, EventEmitter, DefaultValueAccessor, ElementRef, ViewContainerRef, NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES, Self, NgModel, Renderer;
import "../ng2-bootstrap-config.dart" show Ng2BootstrapConfig;
import "datepicker-inner.dart" show DatePickerInner;

const TEMPLATE_OPTIONS = { "bs4" : { "YEAR_BUTTON" : '''
        <button type="button" style="min-width:100%;" class="btn btn-default"
                [ng-class]="{\'btn-info\': dtz.selected, \'btn-link\': !dtz.selected && !datePicker.isActive(dtz), \'btn-info\': !dtz.selected && datePicker.isActive(dtz), disabled: dtz.disabled}"
                [disabled]="dtz.disabled"
                (click)="datePicker.select(dtz.date)" tabindex="-1">
          <span [ng-class]="{\'text-success\': dtz.current}">{{dtz.label}}</span>
        </button>
    '''}, "bs3" : { "YEAR_BUTTON" : '''
        <button type="button" style="min-width:100%;" class="btn btn-default"
                [ng-class]="{\'btn-info\': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}"
                [disabled]="dtz.disabled"
                (click)="datePicker.select(dtz.date)" tabindex="-1">
          <span [ng-class]="{\'text-info\': dtz.current}">{{dtz.label}}</span>
        </button>
    '''}};

const CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS [ Ng2BootstrapConfig.theme ] ||
    TEMPLATE_OPTIONS.bs3;

@Component (selector: "yearpicker, [yearpicker]")
@View (template: '''
<table [hidden]="datePicker.datepickerMode!==\'year\'" role="grid">
  <thead>
    <tr>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-left"
                (click)="datePicker.move(-1)" tabindex="-1">
          <i class="glyphicon glyphicon-chevron-left"></i>
        </button>
      </th>
      <th colspan="3">
        <button [id]="uniqueId + \'-title\'" role="heading"
                type="button" class="btn btn-default btn-sm"
                (click)="datePicker.toggleMode()"
                [disabled]="datePicker.datepickerMode === datePicker.maxMode"
                [ng-class]="{disabled: datePicker.datepickerMode === datePicker.maxMode}" tabindex="-1" style="width:100%;">
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
    <tr *ng-for="#rowz of rows">
      <td *ng-for="#dtz of rowz" class="text-center" role="gridcell">
      ${ CURRENT_THEME_TEMPLATE.YEAR_BUTTON}
      </td>
    </tr>
  </tbody>
</table>
  ''', directives: const [ FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass])
class YearPicker
    implements OnInit {
  DatePickerInner datePicker;

  String title;

  List<dynamic> rows = [];

  YearPicker(this .datePicker) {}

  getStartingYear(num year) {
    // todo: parseInt
    return ((year - 1) / this.datePicker.yearRange) *
        this.datePicker.yearRange + 1;
  }

  onInit() {
    var self = this;
    this.datePicker.stepYear = { "years" : this.datePicker.yearRange};
    this.datePicker.setRefreshViewHandler(() {
      List<dynamic> years = new List(this.yearRange);
      var date;
      for (var i = 0,
          start = self.getStartingYear(this.activeDate.getFullYear()); i <
          this.yearRange; i ++) {
        date = new DateTime (start + i, 0, 1);
        this.fixTimeZone(date);
        years [ i ] = this.createDateObject(date, this.formatYear);
        years [ i ].uid = this.uniqueId + "-" + i;
      }
      self.title =
          [ years [ 0 ].label, years [ this.yearRange - 1 ].label].join(" - ");
      self.rows = this.split(years, 5);
    }, "year");
    this.datePicker.setCompareHandler((date1, date2) {
      return date1.getFullYear() - date2.getFullYear();
    }, "year");
    this.datePicker.refreshView();
  }
}