import { Injectable } from '@angular/core';

/** Default values provider for tooltip */
@Injectable()
export class TooltipConfig {
  /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
  public placement:string = 'top';
  /** array of event names which triggers tooltip opening */
  public triggers:string = 'hover focus';
  /** a selector specifying the element the tooltip should be appended to. Currently only supports "body" */
  public container: string;
}
