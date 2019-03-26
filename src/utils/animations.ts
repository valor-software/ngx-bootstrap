import { style, animate, AnimationMetadata } from '@angular/animations';

export const fadeIn: AnimationMetadata[] = [
  style({ opacity: 0 }),
  animate(
    '400ms ease-in',
    style({
      opacity: 1,
      overflow: 'visible',
      height: 'auto',
      display: 'block'
    })
  )
];

export const fadeOut: AnimationMetadata[] = [
  style({ opacity: '*' }),
  animate(
    '400ms ease-in',
    style({
      opacity: 0,
      display: 'none'
    })
  )
];

export const slideIn: AnimationMetadata[] = [
  style({transform: 'translateY(-100%)'}),
  animate('200ms ease-in', style({transform: 'translateY(0%)'}))
];

export const slideOut: AnimationMetadata[] = [
  animate(
    '200ms ease-in',
    style({
      transform: 'translateY(-100%)'
    })
  )
];
