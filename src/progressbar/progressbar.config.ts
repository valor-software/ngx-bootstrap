import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressbarConfig {
  /** if `true` changing value of progress bar will be animated */
  animate: Boolean = false;
  /** maximum total value of progress element */
  max = 100;
}
