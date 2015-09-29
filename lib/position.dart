/// <reference path="../tsd.d.ts" />
import "package:angular2/angular2.dart" show Injectable, ElementRef;
import "package:node_shims/js.dart";

class PositionService {

  const PositionService();

  dynamic get window {
    return window;
  }

  dynamic get document {
    return window.document;
  }

  dynamic getStyle(dynamic nativeEl, String cssProp) {
    // IE
    if (nativeEl.currentStyle) {
      return nativeEl.currentStyle [ cssProp ];
    }
    if (this.window.getComputedStyle) {
      return this.window.getComputedStyle(nativeEl) [ cssProp ];
    }
    // finally try and get inline style
    return nativeEl.style [ cssProp ];
  }

  /**
   * Checks if a given element is statically positioned
   * @param nativeEl - raw DOM element
   */
  dynamic isStaticPositioned(dynamic nativeEl) {
    return identical(
        or(this.getStyle(nativeEl, "position"), "static"), "static");
  }

  /**
   * returns the closest, non-statically positioned parentOffset of a given element
   * @param nativeEl
   */
  parentOffsetEl(dynamic nativeEl) {
    var offsetParent = or(nativeEl.offsetParent, this.document);
    while (offsetParent && !identical(offsetParent, this.document) &&
        this.isStaticPositioned(offsetParent)) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || this.document;
  }

  /**
   * Provides read-only equivalent of jQuery's position function:
   * http://api.jquery.com/position/
   */
  dynamic position(dynamic nativeEl) {
    var elBCR = this.offset(nativeEl);
    var offsetParentBCR = { "top" : 0, "left" : 0};
    var offsetParentEl = this.parentOffsetEl(nativeEl);
    if (!identical(offsetParentEl, this.document)) {
      offsetParentBCR = this.offset(offsetParentEl);
      offsetParentBCR.top +=
          offsetParentEl.clientTop - offsetParentEl.scrollTop;
      offsetParentBCR.left +=
          offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
    }
    var boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      "width" : boundingClientRect.width || nativeEl.offsetWidth,
      "height" : boundingClientRect.height || nativeEl.offsetHeight,
      "top" : elBCR.top - offsetParentBCR.top,
      "left" : elBCR.left - offsetParentBCR.left
    };
  }

  /**
   * Provides read-only equivalent of jQuery's offset function:
   * http://api.jquery.com/offset/
   */
  dynamic offset(dynamic nativeEl) {
    var boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      "width" : boundingClientRect.width || nativeEl.offsetWidth,
      "height" : boundingClientRect.height || nativeEl.offsetHeight,
      "top" : boundingClientRect.top +
          (this.window.pageYOffset || this.document.documentElement.scrollTop),
      "left" : boundingClientRect.left +
          (this.window.pageXOffset || this.document.documentElement.scrollLeft)
    };
  }

  /**
   * Provides coordinates for the targetEl in relation to hostEl
   */
  dynamic positionElements(dynamic hostEl, dynamic targetEl,
      dynamic positionStr, dynamic appendToBody) {
    var positionStrParts = positionStr.split("-");
    var pos0 = positionStrParts [ 0 ];
    var pos1 = or(positionStrParts [ 1 ], "center");
    var hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
    var targetElWidth = targetEl.offsetWidth;
    var targetElHeight = targetEl.offsetHeight;
    var shiftWidth = { "center" : () {
      return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
    }, "left" : () {
      return hostElPos.left;
    }, "right" : () {
      return hostElPos.left + hostElPos.width;
    }};
    var shiftHeight = {
      "center" : () { return hostElPos .top + hostElPos .height / 2 - targetElHeight / 2;
      },
      "top" : () { return hostElPos .top;
      },
      "bottom" : () { return hostElPos .top + hostElPos .height;
      }
    };
    dynamic targetElPos;
    switch (pos0) {
      case "right" :
        targetElPos =
        { "top" : shiftHeight [ pos1 ](), "left" : shiftWidth [ pos0 ]()};
        break;
      case "left" :
        targetElPos = {
          "top" : shiftHeight [ pos1 ](),
          "left" : hostElPos.left - targetElWidth
        };
        break;
      case "bottom" :
        targetElPos =
        { "top" : shiftHeight [ pos0 ](), "left" : shiftWidth [ pos1 ]()};
        break;
      default :
        targetElPos = {
          "top" : hostElPos.top - targetElHeight,
          "left" : shiftWidth [ pos1 ]()
        };
        break;
    }
    return targetElPos;
  }
}

const positionService = const PositionService();