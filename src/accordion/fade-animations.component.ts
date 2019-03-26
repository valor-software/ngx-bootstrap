import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: '[fadeInAnimation]',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(2000)
      ])
    ])
  ],
  template: `<ng-content></ng-content>`
})
export class FadeInDirectiveComponent {
  @HostBinding('@fade') trigger = '';
}
