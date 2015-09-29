/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Type, Component, View, Directive, OnInit, OnDestroy, EventEmitter, ElementRef, ViewContainerRef, NgClass, NgStyle, Host, ViewEncapsulation, CORE_DIRECTIVES;

const progressConfig = { "animate" : true, "max" : 100};
// todo: progress element conflict with bootstrap.css

// todo: need hack: replace host element with div
@Directive (selector: "bs-progress, [progress]",
    properties: const [ "animate", "max"],
    host: const { "class" : "progress", "[attr.max]" : "max"})
class Progress implements OnInit {
  num _max;

  bool animate;

  List<dynamic> bars = [];

  Progress() {}

  onInit() {
    this.animate = !identical(this.animate, false);
    this.max = identical(, "number") ? this.max : progressConfig.max;
  }

  num get max {
    return this._max;
  }

  set max(num v) {
    this._max = v;
    this.bars.forEach((Bar bar) {
      bar.recalculatePercentage();
    });
  }

  addBar(Bar bar) {
    if (!this.animate) {
      bar.transition = "none";
    }
    this.bars.push(bar);
  }

  removeBar(Bar bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
  }
}
// todo: number pipe

// todo: use query from progress?
@Component (selector: "bar, [bar]", properties: const [ "type", "value"])
@View (template: '''
  <div class="progress-bar"
    style="min-width: 0;"
    role="progressbar"
    [ng-class]="type && \'progress-bar-\' + type"
    [ng-style]="{width: (percent < 100 ? percent : 100) + \'%\', transition: transition}"
    aria-valuemin="0"
    [attr.aria-valuenow]="value"
    [attr.aria-valuetext]="percent.toFixed(0) + \'%\'"
    [attr.aria-valuemax]="max"
    ><ng-content></ng-content></div>
''',
    directives: const [ NgStyle, NgClass],
    encapsulation: ViewEncapsulation.None)
class Bar
    implements OnInit, OnDestroy {
  Progress progress;

  String type;

  num percent = 0;

  String transition;

  num _value;

  Bar(@Host () this .progress) {}

  onInit() {
    this.progress.addBar(this);
  }

  onDestroy() {
    this.progress.removeBar(this);
  }

  num get value {
    return this._value;
  }

  set value(num v) {
    if (!v && !identical(v, 0)) {
      return;
    }
    this._value = v;
    this.recalculatePercentage();
  }

  recalculatePercentage() {
    this.percent = +(100 * this.value / this.progress.max).toFixed(2);
    var totalPercentage = this.progress.bars.reduce((total, bar) {
      return total + bar.percent;
    }, 0);
    if (totalPercentage > 100) {
      this.percent -= totalPercentage - 100;
    }
  }
}

@Component (selector: "progressbar, [progressbar]",
    properties: const [ "animate", "max", "type", "value"])
@View (template: '''
    <div progress [animate]="animate" [max]="max">
      <bar [type]="type" [value]="value">
          <ng-content></ng-content>
      </bar>
    </div>
  ''', directives: const [ Progress, Bar])
class Progressbar {
  bool animate;

  num max;

  String type;

  num value;
}

const List<dynamic> progressbar = [ Progress, Bar, Progressbar];