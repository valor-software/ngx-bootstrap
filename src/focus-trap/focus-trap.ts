/**
 * This code is a copy of @angular/cdk directive CdkTrapFocus
 * https://github.com/angular/components/tree/master/src/cdk/a11y/focus-trap
 * This copy is using till new major version of ngx-bootstrap will be released
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgZone, isDevMode } from '@angular/core';

import { InteractivityChecker } from './interactivity-checker';
import { FocusTrapManager, ManagedFocusTrap } from './focus-trap-manager';
import { FocusTrapInertStrategy } from './focus-trap-inert-strategy';
import { FocusTrapConfig } from './focus-trap.config';
import { take } from 'rxjs/operators';

/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class uses a strategy pattern that determines how it traps focus.
 * See FocusTrapInertStrategy.
 */
export class FocusTrap implements ManagedFocusTrap {
  protected _enabled = true;

  private _startAnchor: HTMLElement | null;
  private _endAnchor: HTMLElement | null;
  private _hasAttached = false;

  /** Whether the FocusTrap is enabled. */
  get enabled(): boolean { return this._enabled; }
  set enabled(value: boolean) {
    this._enabled = value;
    if (this._enabled) {
      this._focusTrapManager.register(this);
    } else {
      this._focusTrapManager.deregister(this);
    }
  }

  constructor(public _element: HTMLElement,
              public _checker: InteractivityChecker,
              public _ngZone: NgZone,
              public _document: Document,
              private _focusTrapManager: FocusTrapManager,
              private _inertStrategy: FocusTrapInertStrategy,
              config: FocusTrapConfig) {
    if (!config.defer) {
      this.attachAnchors();
    }

    this._focusTrapManager.register(this);
  }

  /** Implemented as part of ManagedFocusTrap. */
  _enable() {
    this._inertStrategy.preventFocus(this);
    this.toggleAnchors(true);
  }

  /** Implemented as part of ManagedFocusTrap. */
  _disable() {
    this._inertStrategy.allowFocus(this);
    this.toggleAnchors(false);
  }

  /** Notifies the FocusTrapManager that this FocusTrap will be destroyed. */
  /** Destroys the focus trap by cleaning up the anchors. */
  destroy() {
    this._focusTrapManager.deregister(this);
    const startAnchor = this._startAnchor;
    const endAnchor = this._endAnchor;

    if (startAnchor) {
      startAnchor.removeEventListener('focus', this.startAnchorListener);

      if (startAnchor.parentNode) {
        startAnchor.parentNode.removeChild(startAnchor);
      }
    }

    if (endAnchor) {
      endAnchor.removeEventListener('focus', this.endAnchorListener);

      if (endAnchor.parentNode) {
        endAnchor.parentNode.removeChild(endAnchor);
      }
    }

    this._startAnchor = this._endAnchor = null;
  }

  /**
   * Inserts the anchors into the DOM. This is usually done automatically
   * in the constructor, but can be deferred for cases like directives with `*ngIf`.
   * @returns Whether the focus trap managed to attach successfully. This may not be the case
   * if the target element isn't currently in the DOM.
   */
  attachAnchors(): boolean {
    // If we're not on the browser, there can be no focus to trap.
    if (this._hasAttached) {
      return true;
    }

    this._ngZone.runOutsideAngular(() => {
      if (!this._startAnchor) {
        this._startAnchor = this._createAnchor();
        this._startAnchor.addEventListener('focus', this.startAnchorListener);
      }

      if (!this._endAnchor) {
        this._endAnchor = this._createAnchor();
        this._endAnchor.addEventListener('focus', this.endAnchorListener);
      }
    });

    if (this._element.parentNode) {
      this._element.parentNode.insertBefore(this._startAnchor, this._element);
      this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
      this._hasAttached = true;
    }

    return this._hasAttached;
  }

  /**
   * Waits for the zone to stabilize, then either focuses the first element that the
   * user specified, or the first tabbable element.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusInitialElementWhenReady(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this._executeOnStable(() => resolve(this.focusInitialElement()));
    });
  }

  /**
   * Focuses the element that should be focused when the focus trap is initialized.
   * @returns Whether focus was moved successfully.
   */
  focusInitialElement(): boolean {
    // Contains the deprecated version of selector, for temporary backwards comparability.
    const redirectToElement = this._element.querySelector(`[cdk-focus-initial], ` +
      `[cdkFocusInitial]`);

    if (redirectToElement) {
      // @breaking-change 8.0.0
      if (redirectToElement.hasAttribute(`cdk-focus-initial`)) {
        // tslint:disable-next-line
        console.warn(`Found use of deprecated attribute 'cdk-focus-initial', ` +
          `use 'cdkFocusInitial' instead. The deprecated attribute ` +
          `will be removed in 8.0.0`, redirectToElement);
      }

      // Warn the consumer if the element they've pointed to
      // isn't focusable, when not in production mode.
      if (isDevMode() && !this._checker.isFocusable(redirectToElement as HTMLElement)) {
        // tslint:disable-next-line
        console.warn(`Element matching '[cdkFocusInitial]' is not focusable.`, redirectToElement);
      }

      (redirectToElement as HTMLElement).focus();

      return true;
    }

    return this.focusFirstTabbableElement();
  }

  /**
   * Focuses the first tabbable element within the focus trap region.
   * @returns Whether focus was moved successfuly.
   */
  focusFirstTabbableElement(): boolean {
    const redirectToElement = this._getRegionBoundary('start');

    if (redirectToElement) {
      redirectToElement.focus();
    }

    return !!redirectToElement;
  }

  /**
   * Focuses the last tabbable element within the focus trap region.
   * @returns Whether focus was moved successfully.
   */
  focusLastTabbableElement(): boolean {
    const redirectToElement = this._getRegionBoundary('end');

    if (redirectToElement) {
      redirectToElement.focus();
    }

    return !!redirectToElement;
  }

  /**
   * Checks whether the focus trap has successfully been attached.
   */
  hasAttached(): boolean {
    return this._hasAttached;
  }

  /**
   * Toggles the`tabindex` of both anchors to either trap Tab focus or allow it to escape.
   * @param enabled: Whether the anchors should trap Tab.
   */
  protected toggleAnchors(enabled: boolean) {
    if (this._startAnchor && this._endAnchor) {
      this._toggleAnchorTabIndex(enabled, this._startAnchor);
      this._toggleAnchorTabIndex(enabled, this._endAnchor);
    }
  }


  // Event listeners for the anchors. Need to be regular functions so that we can unbind them later.
  protected startAnchorListener = () => this.focusLastTabbableElement();
  protected endAnchorListener = () => this.focusFirstTabbableElement();

  /**
   * Get the specified boundary element of the trapped region.
   * @param bound The boundary to get (start or end of trapped region).
   * @returns The boundary element.
   */
  private _getRegionBoundary(bound: 'start' | 'end'): HTMLElement | null {
    // Contains the deprecated version of selector, for temporary backwards comparability.
    const markers = this._element.querySelectorAll(`[cdk-focus-region-${bound}], ` +
      `[cdkFocusRegion${bound}], ` +
      `[cdk-focus-${bound}]`);

    for (let i = 0; i < markers.length; i++) {
      // @breaking-change 8.0.0
      if (markers[i].hasAttribute(`cdk-focus-${bound}`)) {
        // tslint:disable-next-line
        console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}', ` +
          `use 'cdkFocusRegion${bound}' instead. The deprecated ` +
          `attribute will be removed in 8.0.0.`, markers[i]);
      } else if (markers[i].hasAttribute(`cdk-focus-region-${bound}`)) {
        // tslint:disable-next-line
        console.warn(`Found use of deprecated attribute 'cdk-focus-region-${bound}', ` +
          `use 'cdkFocusRegion${bound}' instead. The deprecated attribute ` +
          `will be removed in 8.0.0.`, markers[i]);
      }
    }

    if (bound === 'start') {
      return (markers as NodeListOf<HTMLElement>).length
        ? (markers as NodeListOf<HTMLElement>)[0]
        : this._getFirstTabbableElement(this._element);
    }

    return (markers as NodeListOf<HTMLElement>).length
      ? (markers as NodeListOf<HTMLElement>)[(markers as NodeListOf<HTMLElement>).length - 1]
      : this._getLastTabbableElement(this._element);
  }

  /** Get the first tabbable element from a DOM subtree (inclusive). */
  private _getFirstTabbableElement(root: HTMLElement): HTMLElement | null {
    if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
      return root;
    }

    // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
    // back to `childNodes` which includes text nodes, comments etc.
    const children = root.children || root.childNodes;

    for (let i = 0; i < children.length; i++) {
      const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
        this._getFirstTabbableElement(children[i] as HTMLElement) :
        null;

      if (tabbableChild) {
        return tabbableChild;
      }
    }

    return null;
  }

  /** Get the last tabbable element from a DOM subtree (inclusive). */
  private _getLastTabbableElement(root: HTMLElement): HTMLElement | null {
    if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
      return root;
    }

    // Iterate in reverse DOM order.
    const children = root.children || root.childNodes;

    for (let i = children.length - 1; i >= 0; i--) {
      const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
        this._getLastTabbableElement(children[i] as HTMLElement) :
        null;

      if (tabbableChild) {
        return tabbableChild;
      }
    }

    return null;
  }

  /** Creates an anchor element. */
  private _createAnchor(): HTMLElement {
    const anchor = this._document.createElement('div');
    this._toggleAnchorTabIndex(this._enabled, anchor);
    anchor.classList.add('cdk-visually-hidden');
    anchor.classList.add('cdk-focus-trap-anchor');
    anchor.setAttribute('aria-hidden', 'true');

    return anchor;
  }

  /**
   * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
   * @param isEnabled Whether the focus trap is enabled.
   * @param anchor Anchor on which to toggle the tabindex.
   */
  // tslint:disable-next-line
  private _toggleAnchorTabIndex(isEnabled: boolean, anchor: HTMLElement) {
    // Remove the tabindex completely, rather than setting it to -1, because if the
    // element has a tabindex, the user might still hit it when navigating with the arrow keys.
    isEnabled ? anchor.setAttribute('tabindex', '0') : anchor.removeAttribute('tabindex');
  }

  /** Executes a function when the zone is stable. */
  private _executeOnStable(fn: () => any): void {
    if (this._ngZone.isStable) {
      fn();
    } else {
      this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(fn);
    }
  }
// tslint:disable-next-line:max-file-line-count
}
