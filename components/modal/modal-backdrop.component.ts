import {Component, ElementRef} from '@angular/core';
import {NgClass} from '@angular/common';
import {ClassName} from './modal-options.class';

export class ModalBackdropOptions {
  public animate:boolean = true;

  public constructor(options:ModalBackdropOptions) {
    Object.assign(this, options);
  }
}

@Component({
  selector: 'bs-modal-backdrop',
  directives: [NgClass],
  template: `
<div class="${ClassName.BACKDROP}"
  [class.${ClassName.IN}]="isShown"
  [class.${ClassName.FADE}]="isAnimated"></div>`
})
export class ModalBackdropComponent {
  public isAnimated:boolean = true;
  public isShown:boolean = false;

  public element:ElementRef;

  public constructor(options:ModalBackdropOptions, element:ElementRef) {
    this.isAnimated = options.animate;
    this.element = element;
  }
}
