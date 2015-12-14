import 'dart:async';

import "package:angular2/angular2.dart";
import 'package:node_shims/js.dart';

// TODO: templateUrl
@Component (selector: "alert",
    inputs: const [ "type", "dismissible", "dismissOnTimeout"],
    outputs: const ["close"],
//    templateUrl: 'alert.html',
    template: '''
<div class="alert" role="alert" [ngClass]="classes" *ngIf="!closed">
    <button *ngIf="closeable" type="button" class="close" (click)="onClose()">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only">Close</span>
    </button>
    <ng-content></ng-content>
</div>
''',
    directives: const [NgIf, NgClass])
class Alert implements OnInit {
  ElementRef el;

  String type;

  EventEmitter close = new EventEmitter ();

  int dismissOnTimeout;

  bool closed = false;

  bool closeable = false;

  List<String> classes = [];

  set dismissible(bool v) {
    closeable = v;
  }

  bool get dismissible {
    return closeable;
  }

  Alert(this.el) {
    closeable = closeable || el.nativeElement.getAttribute("(close)") != null;
  }

  ngOnInit() {
    type ??= "warning";
    classes.add("alert-$type");
    if (closeable) {
      classes.add("alert-dismissible");
    } else {
      classes.length = 1;
    }
    if (truthy(dismissOnTimeout)) {
      dismissible = true;
      new Timer(new Duration(milliseconds: dismissOnTimeout), onClose);
    }
  }

  // todo: mouse event + touch + pointer
  onClose() {
    close.add(this);
    el.nativeElement.remove();
    closed = true;
  }
}