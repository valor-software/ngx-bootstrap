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

/** Directive for trapping focus within a region. */
import { AfterContentInit, Directive, DoCheck, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { FocusTrap } from './focus-trap';
import { FocusTrapFactory } from './focus-trap.factory';

@Directive({
  selector: '[focusTrap]',
  exportAs: 'focusTrap'
})
export class FocusTrapDirective implements OnDestroy, AfterContentInit, DoCheck {
  /** Underlying FocusTrap instance. */
  focusTrap: FocusTrap;

  /** Whether the focus trap is active. */
  @Input('focusTrap')
  get enabled(): boolean {
    return this.focusTrap.enabled;
  }
  set enabled(value: boolean) {
    this.focusTrap.enabled = value != null && `${value}` !== 'false';
  }

  /** Previously focused element to restore focus to upon destroy when using autoCapture. */
  private _previouslyFocusedElement: HTMLElement | null = null;
  private _document: Document;

  /**
   * Whether the directive should automatically move focus into the trapped region upon
   * initialization and return focus to the previous activeElement upon destruction.
   */
  @Input('autoCapture')
  get autoCapture(): boolean { return this._autoCapture; }
  set autoCapture(value: boolean) { this._autoCapture = value != null && `${value}` !== 'false'; }
  private _autoCapture: boolean;

  constructor(private _elementRef: ElementRef<HTMLElement>,
              private _focusTrapFactory: FocusTrapFactory,
              @Inject(DOCUMENT) _document: any) {
    this._document = _document;
    this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, { defer: true });
  }

  ngOnDestroy() {
    this.focusTrap.destroy();

    // If we stored a previously focused element when using autoCapture, return focus to that
    // element now that the trapped region is being destroyed.
    if (this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
      this._previouslyFocusedElement = null;
    }
  }

  ngAfterContentInit() {
    this.focusTrap.attachAnchors();

    if (this.autoCapture) {
      this._previouslyFocusedElement = this._document.activeElement as HTMLElement;
      this.focusTrap.focusInitialElementWhenReady()
        .then(() => {
          return undefined;
        })
        .catch(err => {
          // tslint:disable-next-line:no-console
          console.warn(err);
        });
    }
  }

  ngDoCheck() {
    if (!this.focusTrap.hasAttached()) {
      this.focusTrap.attachAnchors();
    }
  }
}
