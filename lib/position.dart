import "package:angular2/angular2.dart";
import "package:node_shims/js.dart";
import 'dart:html';

class PositionService {

  const PositionService();

  Window get _window => window;

  Document get _document => window.document;

  String getStyle(dynamic nativeEl, String cssProp) {
//    // IE
//    if ((nativeEl as Element).style != null) {
//      return (nativeEl as Element).style.getPropertyValue(cssProp);
//    }
//    if (window.document.getComputedStyle) {
//      return this._window.getComputedStyle(nativeEl) [ cssProp ];
//    }
    // finally try and get inline style
    return (nativeEl as Element).style.getPropertyValue(cssProp);
  }

  /**
   * Checks if a given element is statically positioned
   * @param nativeEl - raw DOM element
   */
  bool isStaticPositioned(dynamic nativeEl) => or(getStyle(nativeEl, "position"), "static") == "static";

  /**
   * returns the closest, non-statically positioned parentOffset of a given element
   * @param nativeEl
   */
  parentOffsetEl(dynamic nativeEl) {
    var offsetParent = or(nativeEl.offsetParent, _document);
    while (offsetParent != null
        && offsetParent != _document
        && isStaticPositioned(offsetParent)) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent ?? _document;
  }

  /**
   * Provides read-only equivalent of jQuery's position function:
   * http://api.jquery.com/position/
   */
  dynamic position(dynamic nativeEl) {
    var elBCR = offset(nativeEl);
    var offsetParentBCR = new Position(top: 0, left: 0);
    var offsetParentEl = parentOffsetEl(nativeEl);
    if (!identical(offsetParentEl, _document)) {
      offsetParentBCR = offset(offsetParentEl);
      offsetParentBCR.top +=
          offsetParentEl.clientTop - offsetParentEl.scrollTop;
      offsetParentBCR.left +=
          offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
    }
    var boundingClientRect = nativeEl.getBoundingClientRect();
    return new Rectangle(
        elBCR.left - offsetParentBCR.left,
        elBCR.top - offsetParentBCR.top,
        boundingClientRect.width ?? nativeEl.offsetWidth,
        boundingClientRect.height ?? nativeEl.offsetHeight);
  }

  /**
   * Provides read-only equivalent of jQuery's offset function:
   * http://api.jquery.com/offset/
   */
  dynamic offset(dynamic nativeEl) {
    var boundingClientRect = nativeEl.getBoundingClientRect();

    return new Rectangle(
        boundingClientRect.left + (_window.pageXOffset ?? _document.documentElement.scrollLeft),
        boundingClientRect.top + (_window.pageYOffset ?? _document.documentElement.scrollTop),
        boundingClientRect.width ?? nativeEl.offsetWidth,
        boundingClientRect.height ?? nativeEl.offsetHeight);
  }

  /**
   * Provides coordinates for the targetEl in relation to hostEl
   */
  dynamic positionElements(
      hostEl,
      Element targetEl,
      dynamic positionStr,
      bool appendToBody) {
    var positionStrParts = positionStr.split("-");
    var pos0 = positionStrParts [ 0 ];
    var pos1 = positionStrParts.length > 1 ? positionStrParts[1] : "center";
    var hostElPos = appendToBody ? offset(hostEl) : position(hostEl);
    var targetElWidth = targetEl.offsetWidth;
    var targetElHeight = targetEl.offsetHeight;
    var shiftWidth = {
      "center" : () => hostElPos.left + hostElPos.width / 2 - targetElWidth / 2,
      "left" : () => hostElPos.left,
      "right" : () => hostElPos.left + hostElPos.width
    };
    var shiftHeight = {
      "center" : () => hostElPos .top + hostElPos .height / 2 - targetElHeight / 2,
      "top" : () => hostElPos .top,
      "bottom" : () => hostElPos .top + hostElPos .height
    };
    Position targetElPos;
    switch (pos0) {
      case "right" :
        targetElPos = new Position(
            top : shiftHeight[pos1](),
            left : shiftWidth[pos0]());
        break;
      case "left" :
        targetElPos = new Position(
            top : shiftHeight[pos1](),
            left : hostElPos.left - targetElWidth);
        break;
      case "bottom" :
        targetElPos = new Position(
            top : shiftHeight[pos0](),
            left : shiftWidth[pos1]());
        break;
      default :
        targetElPos = new Position(
            top : hostElPos.top - targetElHeight,
            left : shiftWidth[pos1]());
    }
    return targetElPos;
  }
}


class Position {
  var top;
  var left;
  Position({this.top, this.left});
  toString() => "$top, $left";
}

const positionService = const PositionService();