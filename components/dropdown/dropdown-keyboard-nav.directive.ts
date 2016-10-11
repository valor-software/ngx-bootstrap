import { Directive, ElementRef, HostListener } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';

/* tslint:disable-next-line */
const KeyboardEvent = (global as any).KeyboardEvent as KeyboardEvent;

@Directive({
  selector: '[dropdown][dropdownKeyboardNav]'
})
export class KeyboardNavDirective {
  private dd:DropdownDirective;
  private el:ElementRef;

  public constructor(dd:DropdownDirective, el:ElementRef) {
    this.dd = dd;
    this.el = el;
    console.warn('keyboard-nav deprecated');
    dd.keyboardNav = true;
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(event:KeyboardEvent):void {
    if (event.which !== 40 && event.which !== 38) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    let elems = this.dd.menuEl.nativeElement.getElementsByTagName('a');

    switch (event.which) {
      case (40):
        if (typeof this.dd.selectedOption !== 'number') {
          this.dd.selectedOption = 0;
          break;
        }

        if (this.dd.selectedOption === elems.length - 1) {
          break;
        }

        this.dd.selectedOption++;
        break;
      case (38):
        if (typeof this.dd.selectedOption !== 'number') {
          return;
        }

        if (this.dd.selectedOption === 0) {
          // todo: return?
          break;
        }

        this.dd.selectedOption--;
        break;
      default:
        break;
    }
    elems[this.dd.selectedOption].nativeElement.focus();
  }
}
