import { Injectable } from '@angular/core';

/** Default values provider for tooltip */
@Injectable()
export class TooltipConfig {
  /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
  public placement = 'top';
  /** array of event names which triggers tooltip opening */
  public triggers = 'hover focus';
  /** a selector specifying the element the tooltip should be appended to. Currently only supports "body" */
  public container: string;
}
