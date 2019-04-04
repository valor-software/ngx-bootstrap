import {
  animate,
  style,
  AnimationMetadata
} from '@angular/animations';

/** Time and timing curve for expansion panel animations. */
export const EXPANSION_PANEL_ANIMATION_TIMING = '400ms cubic-bezier(0.4,0.0,0.2,1)';

export const expandAnimation: AnimationMetadata[] = [
  style({ height: 0, visibility: 'hidden', overflow: 'hidden' }),
  animate(EXPANSION_PANEL_ANIMATION_TIMING, style({ height: '*', visibility: 'visible' }))
];

export const collapseAnimation: AnimationMetadata[] = [
  style({ height: '*', visibility: 'visible', overflow: 'hidden' }),
  animate(EXPANSION_PANEL_ANIMATION_TIMING, style({ height: 0, visibility: 'hidden' }))
];
