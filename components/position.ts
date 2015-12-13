import {
  Injectable,
  ElementRef
} from 'angular2/core';
import {IAttribute} from './common';

export class PositionService {
  private get window():any {
    return window;
  }

  private get document():any {
    return window.document;
  }

  private getStyle(nativeEl:any, cssProp:string):any {
    // IE
    if (nativeEl.currentStyle) {
      return nativeEl.currentStyle[cssProp];
    }

    if (this.window.getComputedStyle) {
      return this.window.getComputedStyle(nativeEl)[cssProp];
    }
    // finally try and get inline style
    return nativeEl.style[cssProp];
  }


  /**
   * Checks if a given element is statically positioned
   * @param nativeEl - raw DOM element
   */
  private isStaticPositioned(nativeEl:any):any {
    return (this.getStyle(nativeEl, 'position') || 'static' ) === 'static';
  }


  /**
   * returns the closest, non-statically positioned parentOffset of a given element
   * @param nativeEl
   */
  private parentOffsetEl(nativeEl:any) {
    let offsetParent = nativeEl.offsetParent || this.document;
    while (offsetParent && offsetParent !== this.document &&
    this.isStaticPositioned(offsetParent)) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || this.document;
  };

  /**
   * Provides read-only equivalent of jQuery's position function:
   * http://api.jquery.com/position/
   */
  public position(nativeEl:any):{width: number, height: number, top: number, left: number} {
    let elBCR = this.offset(nativeEl);
    let offsetParentBCR = {top: 0, left: 0};
    let offsetParentEl = this.parentOffsetEl(nativeEl);
    if (offsetParentEl !== this.document) {
      offsetParentBCR = this.offset(offsetParentEl);
      offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
      offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
    }

    let boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top: elBCR.top - offsetParentBCR.top,
      left: elBCR.left - offsetParentBCR.left
    };
  }

  /**
   * Provides read-only equivalent of jQuery's offset function:
   * http://api.jquery.com/offset/
   */
  public offset(nativeEl:any):{width: number, height: number, top: number, left: number} {
    let boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop),
      left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft)
    };
  }

  /**
   * Provides coordinates for the targetEl in relation to hostEl
   */
  public positionElements(hostEl:any, targetEl:any, positionStr:any, appendToBody:any):{top: number, left: number} {
    let positionStrParts = positionStr.split('-');
    let pos0 = positionStrParts[0];
    let pos1 = positionStrParts[1] || 'center';
    let hostElPos = appendToBody ?
      this.offset(hostEl) :
      this.position(hostEl);
    let targetElWidth = targetEl.offsetWidth;
    let targetElHeight = targetEl.offsetHeight;

    let shiftWidth:IAttribute = {
      center: function () {
        return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
      },
      left: function () {
        return hostElPos.left;
      },
      right: function () {
        return hostElPos.left + hostElPos.width;
      }
    };

    let shiftHeight:IAttribute = {
      center: function ():number {
        return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
      },
      top: function ():number {
        return hostElPos.top;
      },
      bottom: function ():number {
        return hostElPos.top + hostElPos.height;
      }
    };

    let targetElPos:{top: number, left: number};
    switch (pos0) {
      case 'right':
        targetElPos = {
          top: shiftHeight[pos1](),
          left: shiftWidth[pos0]()
        };
        break;
      case 'left':
        targetElPos = {
          top: shiftHeight[pos1](),
          left: hostElPos.left - targetElWidth
        };
        break;
      case 'bottom':
        targetElPos = {
          top: shiftHeight[pos0](),
          left: shiftWidth[pos1]()
        };
        break;
      default:
        targetElPos = {
          top: hostElPos.top - targetElHeight,
          left: shiftWidth[pos1]()
        };
        break;
    }

    return targetElPos;
  }
}

export const positionService = new PositionService();
