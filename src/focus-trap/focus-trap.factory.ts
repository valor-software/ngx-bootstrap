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

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional, NgZone } from '@angular/core';

import { InteractivityChecker } from './interactivity-checker';
import { FocusTrap } from './focus-trap';
import { FocusTrapConfig } from './focus-trap.config';
import { FOCUS_TRAP_INERT_STRATEGY, FocusTrapInertStrategy } from './focus-trap-inert-strategy';
import { EventListenerFocusTrapInertStrategy } from './event-listener-inert-strategy';
import { FocusTrapManager } from './focus-trap-manager';

/** Factory that allows easy instantiation of configurable focus traps. */
@Injectable({providedIn: 'root'})
export class FocusTrapFactory {
  private readonly _document: Document;
  private readonly _inertStrategy: FocusTrapInertStrategy;

  constructor(
    private _checker: InteractivityChecker,
    private _ngZone: NgZone,
    private _focusTrapManager: FocusTrapManager,
    @Inject(DOCUMENT) _document: any,
    @Optional() @Inject(FOCUS_TRAP_INERT_STRATEGY) _inertStrategy?: FocusTrapInertStrategy) {

    this._document = _document;
    // TODO split up the strategies into different modules, similar to DateAdapter.
    this._inertStrategy = _inertStrategy || new EventListenerFocusTrapInertStrategy();
  }

  /**
   * Creates a focus-trapped region around the given element.
   * @param element The element around which focus will be trapped.
   * @param config
   * @returns The created focus trap instance.
   */
  create(element: HTMLElement, config: FocusTrapConfig = new FocusTrapConfig()): FocusTrap {
    return new FocusTrap(
      element, this._checker, this._ngZone, this._document, this._focusTrapManager,
      this._inertStrategy, config);
  }
}
