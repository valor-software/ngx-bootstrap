import "package:angular2/angular2.dart";
import 'dart:async';
// todo: add animate

// todo: add init and on change
@Directive (selector: "[collapse]",
    inputs: const [ "collapse"],
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

  Collapse(this.el);

  bool get collapse {
    return isExpanded;
  }

  set collapse(bool value) {
    isExpanded = value;
    toggle();
  }

  toggle() {
    if (isExpanded) {
      hide();
    } else {
      show();
    }
  }

  hide() {
    isCollapse = false;
    isCollapsing = true;
    isExpanded = false;
    isCollapsed = true;
    new Timer(const Duration(milliseconds: 4), () {
      height = "0";
      isCollapse = true;
      isCollapsing = false;
    });
  }

  show() {
    isCollapse = false;
    isCollapsing = true;
    isExpanded = true;
    isCollapsed = false;
    new Timer(const Duration(milliseconds: 4), () {
      height = "auto";
      isCollapse = true;
      isCollapsing = false;
    });
  }
}