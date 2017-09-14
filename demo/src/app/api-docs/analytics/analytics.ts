/**
 * @author ng-team
 * @copyright ng-bootstrap
 */
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/filter';

declare const ga: any;

/**
 * Simple Google Analytics service. Note that all its methods don't do anything
 * unless the app is deployed on ng-bootstrap.github.io. This avoids sending
 * events and page views during development.
 */
@Injectable()
export class Analytics {
  private _enabled: boolean;
  private _location: Location;
  private _router: Router;

  public constructor(_location: Location, _router: Router) {
    this._location = _location;
    this._router = _router;
    this._enabled = window.location.href.indexOf('bootstrap') >= 0;
  }

  /**
   * Intended to be called only once. Subscribes to router events and sends a
   * page view after each ended navigation event.
   */
  public trackPageViews(): void {
    if (!this._enabled) {
      return;
    }
    this._router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe(() => {
        if (typeof ga !== 'undefined') {
          ga('send', { hitType: 'pageview', page: this._location.path() });
        }
      });
  }

  /**
   * Sends an event.
   */
  public trackEvent(action: string, category: string): void {
    if (!this._enabled) {
      return;
    }
    if (typeof ga !== 'undefined') {
      ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: action
      });
    }
  }
}
