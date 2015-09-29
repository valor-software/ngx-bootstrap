/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Directive, OnInit, OnDestroy, DoCheck, EventEmitter, ElementRef, TemplateRef, CORE_DIRECTIVES, NgClass;
import "../common.dart" show NgTransclude;
// todo: add active event to tab

// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component (
    selector: "tabset", properties: const [ "vertical", "justified", "type"])
@View (template: '''
    <ul class="nav" [ng-class]="classMap" (click)="\$event.preventDefault()">
        <li *ng-for="#tabz of tabs" class="nav-item" [ng-class]="{active: tabz.active, disabled: tabz.disabled}">
          <a href class="nav-link" [ng-class]="{active: tabz.active, disabled: tabz.disabled}" (click)="tabz.active = true">
            <span [ng-transclude]="tabz.headingRef">{{tabz.heading}}</span>
          </a>
        </li>
    </ul>
    <div class="tab-content">
      <ng-content></ng-content>
    </div>
  ''', directives: const [ CORE_DIRECTIVES, NgClass, NgTransclude])
class Tabset
    implements OnInit {
  bool vertical;

  bool justified;

  String type;

  Array <Tab> tabs = [];

  get classMap {
    var map = {
      "nav-stacked" : this.vertical,
      "nav-justified" : this.justified
    };
    map [ "nav-" + (this.type || "tabs") ] = true;
    return map;
  }

  Tabset() {}

  onInit() {
    this.type = !identical(this.type, "undefined") ? this.type : "tabs";
  }

  addTab(Tab tab) {
    this.tabs.push(tab);
    tab.active =
        identical(this.tabs.length, 1) && !identical(tab.active, false);
  }

  removeTab(Tab tab) {
    var index = this.tabs.indexOf(tab);
    if (identical(index, -1)) {
      return;
    }
    // Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && this.tabs.length > 1) {
      // If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = identical(index, this.tabs.length - 1)
          ? index - 1
          : index + 1;
      this.tabs [ newActiveIndex ].active = true;
    }
    this.tabs.slice(index, 1);
  }
}
// TODO: templateUrl?
@Directive (selector: "tab, [tab]",
    properties: const [ "active", "disable", "disabled", "heading"],
    events: const [ "select", "deselect"],
    host: const { "[class.tab-pane]" : "true", "[class.active]" : "active"})
class Tab implements OnInit, OnDestroy, DoCheck {
  Tabset tabset;

  bool _active;

  bool disabled;

  String heading;

  TemplateRef headingRef;

  EventEmitter select = new EventEmitter ();

  EventEmitter deselect = new EventEmitter ();

  Tab(this .tabset) {
    this.tabset.addTab(this);
  }

  set disable(bool v) {
    console.warn("DEPRECATED use `disabled` property (not `disable`)");
    this.disabled = v;
  }

  /** DEPRECATE disable */
  get disable {
    return this.disabled;
  }

  /** tab active state toogle */
  get active {
    return this._active;
  }

  set active(active) {
    if (this.disabled && active || !active) {
      if (!active) {
        this._active = active;
      }
      this.deselect.next(this);
      return;
    }
    this._active = active;
    this.select.next(this);
    this.tabset.tabs.forEach((Tab tab) {
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
    this.tabset.removeTab(this);
  }
}

@Directive (selector: "[tab-heading]")
class TabHeading {
  TemplateRef templateRef;

  TabHeading(this .templateRef, Tab tab) {
    tab.headingRef = templateRef;
  }
}

const Array <dynamic> tabs = [ Tab, TabHeading, Tabset];