import { Injectable } from '@angular/core';

/** Default dropdown configuration */
@Injectable({
  providedIn: 'root'
})
export class BsDropdownConfig {
  /** default dropdown auto closing behavior */
  autoClose = true;
  /** default dropdown auto closing behavior */
  insideClick = false;
  /** turn on/off animation */
  isAnimated = false;
}
