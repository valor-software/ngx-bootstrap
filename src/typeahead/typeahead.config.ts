import { Injectable } from '@angular/core';

/** Default values provider for typeahead */
@Injectable()
export class TypeaheadConfig {
  /** used to hide results on blur */
  hideResultsOnBlur = true;
  /** used to choose the first item in typeahead container */
  selectFirstItem = true;
}
