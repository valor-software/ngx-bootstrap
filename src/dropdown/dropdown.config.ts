import { NONINPUT } from './dropdown.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DropdownConfig {
  public autoClose: string = NONINPUT;
  public keyboardNav: Boolean = false;
}
