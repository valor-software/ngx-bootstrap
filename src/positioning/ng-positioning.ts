/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
// tslint:disable
export class Positioning {
  public position(element: HTMLElement, round = true): ClientRect {
    let elPosition: ClientRect;
    let parentOffset: ClientRect = {
      width: 0,
      height: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    if (this.getStyle(element, 'position') === 'fixed') {
      const bcRect = element.getBoundingClientRect();
      elPosition = {
        width: bcRect.width,
        height: bcRect.height,
        top: bcRect.top,
        bottom: bcRect.bottom,
        left: bcRect.left,
        right: bcRect.right
      };
    } else {
      const offsetParentEl = this.offsetParent(element);

      elPosition = this.offset(element, false);

      if (offsetParentEl !== document.documentElement) {
        parentOffset = this.offset(offsetParentEl, false);
      }

      parentOffset.top += offsetParentEl.clientTop;
      parentOffset.left += offsetParentEl.clientLeft;
    }

    elPosition.top -= parentOffset.top;
    elPosition.bottom -= parentOffset.top;
    elPosition.left -= parentOffset.left;
    elPosition.right -= parentOffset.left;

    if (round) {
      elPosition.top = Math.round(elPosition.top);
      elPosition.bottom = Math.round(elPosition.bottom);
      elPosition.left = Math.round(elPosition.left);
      elPosition.right = Math.round(elPosition.right);
    }

    return elPosition;
  }

  public offset(element: HTMLElement, round = true): ClientRect {
    const elBcr = element.getBoundingClientRect();
    const viewportOffset = {
      top: window.pageYOffset - document.documentElement.clientTop,
      left: window.pageXOffset - document.documentElement.clientLeft
    };

    let elOffset = {
      height: elBcr.height || element.offsetHeight,
      width: elBcr.width || element.offsetWidth,
      top: elBcr.top + viewportOffset.top,
      bottom: elBcr.bottom + viewportOffset.top,
      left: elBcr.left + viewportOffset.left,
      right: elBcr.right + viewportOffset.left
    };

    if (round) {
      elOffset.height = Math.round(elOffset.height);
      elOffset.width = Math.round(elOffset.width);
      elOffset.top = Math.round(elOffset.top);
      elOffset.bottom = Math.round(elOffset.bottom);
      elOffset.left = Math.round(elOffset.left);
      elOffset.right = Math.round(elOffset.right);
    }

    return elOffset;
  }

  public positionElements(
    hostElement: HTMLElement,
    targetElement: HTMLElement,
    placement: string,
    appendToBody?: boolean
  ): ClientRect {
    const hostElPosition = appendToBody
      ? this.offset(hostElement, false)
      : this.position(hostElement, false);
    const targetElStyles = this.getAllStyles(targetElement);
    const shiftWidth: any = {
      left: hostElPosition.left,
      center:
        hostElPosition.left +
        hostElPosition.width / 2 -
        targetElement.offsetWidth / 2,
      right: hostElPosition.left + hostElPosition.width
    };
    const shiftHeight: any = {
      top: hostElPosition.top,
      center:
        hostElPosition.top +
        hostElPosition.height / 2 -
        targetElement.offsetHeight / 2,
      bottom: hostElPosition.top + hostElPosition.height
    };
    const targetElBCR = targetElement.getBoundingClientRect();
    let placementPrimary = placement.split(' ')[0] || 'top';
    const placementSecondary = placement.split(' ')[1] || 'center';

    let targetElPosition: ClientRect = {
      height: targetElBCR.height || targetElement.offsetHeight,
      width: targetElBCR.width || targetElement.offsetWidth,
      top: 0,
      bottom: targetElBCR.height || targetElement.offsetHeight,
      left: 0,
      right: targetElBCR.width || targetElement.offsetWidth
    };

    if (placementPrimary === 'auto') {
      let newPlacementPrimary = this.autoPosition(
        targetElPosition,
        hostElPosition,
        targetElement,
        placementSecondary
      );
      if (!newPlacementPrimary)
        newPlacementPrimary = this.autoPosition(
          targetElPosition,
          hostElPosition,
          targetElement
        );
      if (newPlacementPrimary) placementPrimary = newPlacementPrimary;
      targetElement.classList.add(placementPrimary);
    }

    switch (placementPrimary) {
      case 'top':
        targetElPosition.top =
          hostElPosition.top -
          (targetElement.offsetHeight +
            parseFloat(targetElStyles.marginBottom));
        targetElPosition.bottom +=
          hostElPosition.top - targetElement.offsetHeight;
        targetElPosition.left = shiftWidth[placementSecondary];
        targetElPosition.right += shiftWidth[placementSecondary];
        break;
      case 'bottom':
        targetElPosition.top = shiftHeight[placementPrimary];
        targetElPosition.bottom += shiftHeight[placementPrimary];
        targetElPosition.left = shiftWidth[placementSecondary];
        targetElPosition.right += shiftWidth[placementSecondary];
        break;
      case 'left':
        targetElPosition.top = shiftHeight[placementSecondary];
        targetElPosition.bottom += shiftHeight[placementSecondary];
        targetElPosition.left =
          hostElPosition.left -
          (targetElement.offsetWidth + parseFloat(targetElStyles.marginRight));
        targetElPosition.right +=
          hostElPosition.left - targetElement.offsetWidth;
        break;
      case 'right':
        targetElPosition.top = shiftHeight[placementSecondary];
        targetElPosition.bottom += shiftHeight[placementSecondary];
        targetElPosition.left = shiftWidth[placementPrimary];
        targetElPosition.right += shiftWidth[placementPrimary];
        break;
    }

    targetElPosition.top = Math.round(targetElPosition.top);
    targetElPosition.bottom = Math.round(targetElPosition.bottom);
    targetElPosition.left = Math.round(targetElPosition.left);
    targetElPosition.right = Math.round(targetElPosition.right);

    return targetElPosition;
  }

  private autoPosition(
    targetElPosition: ClientRect,
    hostElPosition: ClientRect,
    targetElement: HTMLElement,
    preferredPosition?: string
  ) {
    if (
      (!preferredPosition || preferredPosition === 'right') &&
      targetElPosition.left + hostElPosition.left - targetElement.offsetWidth <
        0
    ) {
      return 'right';
    } else if (
      (!preferredPosition || preferredPosition === 'top') &&
      targetElPosition.bottom +
        hostElPosition.bottom +
        targetElement.offsetHeight >
        window.innerHeight
    ) {
      return 'top';
    } else if (
      (!preferredPosition || preferredPosition === 'bottom') &&
      targetElPosition.top + hostElPosition.top - targetElement.offsetHeight < 0
    ) {
      return 'bottom';
    } else if (
      (!preferredPosition || preferredPosition === 'left') &&
      targetElPosition.right +
        hostElPosition.right +
        targetElement.offsetWidth >
        window.innerWidth
    ) {
      return 'left';
    }
    return null;
  }

  private getAllStyles(element: HTMLElement) {
    return window.getComputedStyle(element);
  }

  private getStyle(element: HTMLElement, prop: string): string {
    return (this.getAllStyles(element) as any)[prop];
  }

  private isStaticPositioned(element: HTMLElement): boolean {
    return (this.getStyle(element, 'position') || 'static') === 'static';
  }

  private offsetParent(element: HTMLElement): HTMLElement {
    let offsetParentEl =
      <HTMLElement>element.offsetParent || document.documentElement;

    while (
      offsetParentEl &&
      offsetParentEl !== document.documentElement &&
      this.isStaticPositioned(offsetParentEl)
    ) {
      offsetParentEl = <HTMLElement>offsetParentEl.offsetParent;
    }

    return offsetParentEl || document.documentElement;
  }
}

const positionService = new Positioning();

export function positionElements(
  hostElement: HTMLElement,
  targetElement: HTMLElement,
  placement: string,
  appendToBody?: boolean
): void {
  const pos = positionService.positionElements(
    hostElement,
    targetElement,
    placement,
    appendToBody
  );

  targetElement.style.top = `${pos.top}px`;
  targetElement.style.left = `${pos.left}px`;
}
