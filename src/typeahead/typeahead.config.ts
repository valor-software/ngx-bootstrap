import { Injectable } from '@angular/core';

/** Default values provider for typeahead */
@Injectable()
export class TypeaheadConfig {
  /** sets use adaptive position */
  adaptivePosition = false;
  /** turn on/off animation */
  isAnimated = false;
  /** used to hide results on blur */
  hideResultsOnBlur = true;
  /** used to choose the first item in typeahead container */
  selectFirstItem = true;
  /** used to active/inactive the first item in typeahead container */
  isFirstItemActive = true;
  /** used to choose set minimal no of characters that needs to
   * be entered before typeahead kicks-in
   */
  minLength = 1;
}
