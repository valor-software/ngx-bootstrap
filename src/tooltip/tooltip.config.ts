import { Injectable } from '@angular/core';

/** Default values provider for tooltip */
@Injectable({
  providedIn: 'root'
})
export class TooltipConfig {
  /** sets disable adaptive position */
  adaptivePosition = true;
  /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
  placement = 'top';
  /** array of event names which triggers tooltip opening */
  triggers = 'hover focus';
  /** a selector specifying the element the tooltip should be appended to. */
  container: string;
  /** delay before showing the tooltip */
  delay = 0;
  /** delay before hiding the tooltip */
  hideAfterDelay = 0;
}
