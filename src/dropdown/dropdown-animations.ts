import {
  animate,
  style,
  AnimationMetadata
} from '@angular/animations';

export const DROPDOWN_ANIMATION_TIMING = '220ms cubic-bezier(0, 0, 0.2, 1)';

export const dropdownAnimation: AnimationMetadata[] = [
  style({ height: 0, overflow: 'hidden' }),
  animate(
    DROPDOWN_ANIMATION_TIMING,
    style({ height: '*', overflow: 'hidden' })
  )
];
