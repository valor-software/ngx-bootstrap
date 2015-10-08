/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Type, Component, View, Directive, OnInit, OnDestroy, EventEmitter, ElementRef, ViewContainerRef, NgClass, NgStyle, Host, ViewEncapsulation, CORE_DIRECTIVES;
import 'package:node_shims/js.dart';

const progressConfig = const { "animate" : true, "max" : 100};
// todo: progress element conflict with bootstrap.css

// todo: need hack: replace host element with div
@Directive(selector: "bs-progress, [progress]",
    properties: const [ "animate", "max"],
    host: const { "class" : "progress", "[attr.max]" : "max"})
class Progress implements OnInit {
  num _max;

  bool animate;

  List<dynamic> bars = [];

  Progress() {}

  onInit() {
    animate = !identical(animate, false);
    max = max is num ? max : progressConfig['max'];
  }

  num get max => _max;

  set max(num v) {
    _max = v;
    bars.forEach((Bar bar) {
      bar.recalculatePercentage();
    });
  }

  addBar(Bar bar) {
    if (!animate) {
      bar.transition = "none";
    }
    bars.add(bar);
  }

  removeBar(Bar bar) {
    bars.remove(bar);
  }
}
// todo: number pipe

// todo: use query from progress?
@Component (selector: "bar, [bar]", inputs: const ["type", "value"])
@View (template: '''
  <div class="progress-bar"
    style="min-width: 0;"
    role="progressbar"
    [ng-class]="type"
    [ng-style]="{'width': (percent < 100 ? percent : 100).toString() + \'%\', transition: transition}"
    aria-valuemin="0"
    [attr.aria-valuenow]="value"
    [attr.aria-valuetext]="percent.toStringAsFixed(0) + \'%\'"
    [attr.aria-valuemax]="max"
    ><ng-content></ng-content></div>
''',
    directives: const [NgStyle, NgClass],
    encapsulation: ViewEncapsulation.None)
class Bar implements OnInit, OnDestroy {
  Progress progress;

  String _type;

  String get type => _type != null ? 'progress-bar-' + _type : null;
  set type(String type) => _type = type;

  num percent = 0;

  String transition;

  num _value;

  num max;

  Bar(@Host() this.progress) {}

  onInit() {
    progress.addBar(this);
  }

  onDestroy() {
    progress.removeBar(this);
  }

  num get value => _value;

  set value(num v) {
    if (v == null || v == 0) {
      return;
    }
    _value = v;
    recalculatePercentage();
  }

  recalculatePercentage() {
    percent = 100 * value / progress.max;
    var totalPercentage = progress.bars.fold(0, (total, bar) {
      return total + bar.percent;
    });
    if (totalPercentage > 100) {
      percent -= totalPercentage - 100;
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

const List PROGRESSBAR_DIRECTIVES = const [ Progress, Bar, Progressbar];