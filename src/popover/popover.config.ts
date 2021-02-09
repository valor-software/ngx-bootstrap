import { Injectable } from '@angular/core';

/**
 * Configuration service for the Popover directive.
 * You can inject this service, typically in your root component, and customize
 * the values of its properties in order to provide default values for all the
 * popovers used in the application.
 */
@Injectable({
  providedIn: 'root'
})
export class PopoverConfig {
  /** sets disable adaptive position */
  adaptivePosition = true;
  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right", "auto"
   */
  placement = 'top';
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  triggers = 'click';

  outsideClick = false;
  /**
   * A selector specifying the element the popover should be appended to.
   */
  container: string;
  /** delay before showing the popover */
  delay = 0;
  /** delay before hiding the popover */
  hideAfterDelay = 0;
}
