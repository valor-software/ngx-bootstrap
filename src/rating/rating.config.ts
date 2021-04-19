import { Injectable } from '@angular/core';

/** Default values provider for rating */
@Injectable({
  providedIn: 'root'
})
export class RatingConfig {
  /** aria label for rating */
  ariaLabel = 'rating';
}
