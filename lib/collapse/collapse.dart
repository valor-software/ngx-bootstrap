import "package:angular2/angular2.dart";
import 'dart:async';
// todo: add animate

// todo: add init and on change
@Directive (selector: "[collapse]",
    properties: const [ "collapse"],
    host: const {
      "[class.in]" : "isExpanded",
      "[class.collapse]" : "isCollapse",
      "[class.collapsing]" : "isCollapsing",
      "[attr.aria-expanded]" : "isExpanded",
      "[attr.aria-hidden]" : "isCollapsed",
      "[style.height]" : "height"
    })
class Collapse {
  ElementRef el;

  dynamic test = "wtf";

  // style
  String height;

  // classes

  // shown
  bool isExpanded = true;

  // hidden
  bool isCollapsed = false;

  // stale state
  bool isCollapse = true;

  // animation state
  bool isCollapsing = false;

  Collapse(this .el) {}

  bool get collapse {
    return this.isExpanded;
  }

  set collapse(bool value) {
    this.isExpanded = value;
    this.toggle();
  }

  toggle() {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  hide() {
    this.isCollapse = false;
    this.isCollapsing = true;
    this.isExpanded = false;
    this.isCollapsed = true;
    new Timer(const Duration(milliseconds: 4), () {
      this.height = "0";
      this.isCollapse = true;
      this.isCollapsing = false;
    });
  }

  show() {
    this.isCollapse = false;
    this.isCollapsing = true;
    this.isExpanded = true;
    this.isCollapsed = false;
    new Timer(const Duration(milliseconds: 4), () {
      this.height = "auto";
      this.isCollapse = true;
      this.isCollapsing = false;
    });
  }
}