import "package:angular2/angular2.dart";
import 'package:ng2-strap/common.dart';
import 'package:node_shims/js.dart';
// todo: add active event to tab

// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component (
    selector: "tabset", properties: const [ "vertical", "justified", "type"])
@View (template: '''
    <ul class="nav"
        [ng-class]="{
          'nav-stacked' : vertical,
          'nav-justified' : justified,
          'nav-tabs' : type == 'tabs',
          'nav-pills' : type == 'pills'
        }"
        (click)="\$event.preventDefault()">
        <li *ng-for="#tabz of tabs" class="nav-item" [ng-class]="{active: tabz.active, disabled: tabz.disabled}">
          <a href class="nav-link" [ng-class]="{active: tabz.active, disabled: tabz.disabled}" (click)="tabz.active = true">
            <span [ng-transclude]="tabz.headingRef">{{tabz.heading}}</span>
          </a>
        </li>
    </ul>
    <div class="tab-content">
      <ng-content></ng-content>
    </div>
  ''', directives: const [CORE_DIRECTIVES, NgClass, NgTransclude])
class Tabset implements OnInit {
  bool vertical = false;

  bool justified = false;

  String type;

  List<Tab> tabs = [];

  Tabset();

  onInit() {
    type ??= "tabs";
  }

  addTab(Tab tab) {
    tabs.add(tab);
    tab.active = tabs.length == 1 && tab.active != false;
  }

  removeTab(Tab tab) {
    var index = tabs.indexOf(tab);
    if (identical(index, -1)) {
      return;
    }
    // Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && tabs.length > 1) {
      // If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = identical(index, tabs.length - 1)
          ? index - 1
          : index + 1;
      tabs [ newActiveIndex ].active = true;
    }
    slice(tabs, index, 1);
  }
}
// TODO: templateUrl?
@Directive (selector: "tab, [tab]",
    inputs: const [ "active", "disable", "disabled", "heading"],
    outputs: const [ "select", "deselect"],
    host: const { "[class.tab-pane]" : "true", "[class.active]" : "active"})
class Tab implements OnInit, OnDestroy, DoCheck {
  Tabset tabset;

  bool _active = true;

  bool disabled = false;

  String heading;

  TemplateRef headingRef;

  EventEmitter select = new EventEmitter ();

  EventEmitter deselect = new EventEmitter ();

  Tab(this.tabset) {
    tabset.addTab(this);
  }

  @deprecated
  set disable(bool v) {
    print("DEPRECATED use `disabled` property (not `disable`)");
    disabled = v;
  }

  /** DEPRECATE disable */
  @deprecated
  get disable {
    return disabled;
  }

  /** tab active state toogle */
  get active {
    return _active;
  }

  set active(bool active) {
    print('active: $active');
    active ??= true;
    if (disabled && active != null || !active) {
      if (!active) {
        _active = active;
      }
      deselect.add(this);
      return;
    }
    _active = active;
    select.add(this);
    tabset.tabs.forEach((Tab tab) {
      if (!identical(tab, this)) {
        tab.active = false;
      }
    });
  }

  bool doCheck() {
    return true;
  }

  onInit() {}

  onDestroy() {
    tabset.removeTab(this);
  }
}

@Directive (selector: "[tab-heading]")
class TabHeading {
  TemplateRef templateRef;

  TabHeading(this .templateRef, Tab tab) {
    tab.headingRef = templateRef;
  }
}

const TABS_DIRECTIVES = const [Tab, TabHeading, Tabset];