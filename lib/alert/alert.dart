/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, OnInit, EventEmitter, ElementRef, ViewContainerRef, NgIf, NgClass;

// TODO: templateUrl
@Component (selector: "alert",
    properties: const [ "type", "dismissible", "dismissOnTimeout"],
    events: const [ "close"])
@View (template: '''
  <div class="alert" role="alert" [ng-class]="classes" *ng-if="!closed">
    <button *ng-if="closeable" type="button" class="close" (click)="onClose(\$event)">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
    <ng-content></ng-content>
  </div>
  ''', directives: const [ NgIf, NgClass])
class Alert
    implements OnInit {
  ElementRef el;

  String type;

  EventEmitter close = new EventEmitter ();

  String templateUrl;

  num dismissOnTimeout;

  bool closed;

  bool closeable;

  List<String> classes = [];

  set dismissible(bool v) {
    this.closeable = v;
  }

  bool get dismissible {
    return this.closeable;
  }

  Alert(this .el) {
    this.closeable = this.closeable || el.nativeElement.getAttribute("(close)");
  }

  onInit() {
    this.type = this.type || "warning";
    this.classes [ 0 ] = "alert-" + (this.type || "warning");
    if (this.closeable) {
      this.classes [ 1 ] = "alert-dismissible";
    } else {
      this.classes.length = 1;
    }
    if (this.dismissOnTimeout) {
      var close = this.onClose.bind(this);
      setTimeout(close, this.dismissOnTimeout);
    }
  }

  // todo: mouse event + touch + pointer
  onClose() {
    this.close.next(this);
    this.closed = true;
  }
}