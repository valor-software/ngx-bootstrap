import { Injectable } from '@angular/core';

/** Default values provider for typeahead */
@Injectable()
export class TypeaheadConfig {
  /** used to not to hide result on blur */
  typeaheadIsHideOnBlur = true;
}
