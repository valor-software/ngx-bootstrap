import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressbarConfig {
  /** if `true` changing value of progress bar will be animated */
  animate = false;
  /** If `true`, striped classes are applied */
  striped = false;
  /** maximum total value of progress element */
  max = 100;
}
