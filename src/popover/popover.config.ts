import { Injectable } from '@angular/core';

/**
 * Configuration service for the Popover directive.
 * You can inject this service, typically in your root component, and customize
 * the values of its properties in order to provide default values for all the
 * popovers used in the application.
 */
@Injectable()
export class PopoverConfig {
  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  public placement: string = 'top';
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  public triggers: string = 'click';
  /**
   * A selector specifying the element the popover should be appended to.
   * Currently only supports "body".
   */
  public container: string;
}
