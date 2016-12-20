import { NONINPUT } from './dropdown.service';
import { Injectable } from '@angular/core';

/** Default dropdown configuration */
@Injectable()
export class DropdownConfig {
  /** default dropdown auto closing behavior */
  public autoClose: string = NONINPUT;
  /** is keyboard navigation enabled by default */
  public keyboardNav: Boolean = false;
}
