import "package:angular2/angular2.dart";

const progressConfig = const { "animate" : true, "max" : 100};
// todo: progress element conflict with bootstrap.css

// todo: need hack: replace host element with div
@Directive(selector: "[n2s-progress]",
    inputs: const [ "animate", "max"],
    host: const { "class" : "progress", "[attr.max]" : "max"})
class Progress implements OnInit {
  num _max;

  bool animate;

  List<dynamic> bars = [];

  Progress() {}

  ngOnInit() {
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
@Component (selector: "n2s-bar",
    inputs: const ["type", "value"],
    template: '''
  <div class="progress-bar"
    style="min-width: 0;"
    role="progressbar"
    [ngClass]="type"
    [ngStyle]="{'width': (percent < 100 ? percent : 100).toString() + \'%\', transition: transition}"
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

  ngOnInit() {
    progress.addBar(this);
  }

  ngOnDestroy() {
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

@Component (selector: "n2s-progressbar",
    inputs: const [ "animate", "max", "type", "value"],
    template: '''
    <div n2s-progress [animate]="animate" [max]="max">
      <n2s-bar [type]="type" [value]="value">
          <ng-content></ng-content>
      </n2s-bar>
    </div>
  ''', directives: const [ Progress, Bar])
class Progressbar {
  bool animate;

  num max;

  String type;

  num value;
}

const List PROGRESSBAR_DIRECTIVES = const [ Progress, Bar, Progressbar];