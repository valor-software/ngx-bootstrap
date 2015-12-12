import {Directive, ElementRef} from 'angular2/core';
import {Dropdown} from './dropdown';

@Directive({
  selector: '[dropdown][keyboard-nav]',
  host: {
    '(keydown)': 'onKeydown($event)'
  }
})
export class KeyboardNav {
  constructor(private dd:Dropdown, private el:ElementRef) {
    console.warn('keyboard-nav deprecated');
    dd.keyboardNav = true;
  }

  onKeydown(event:KeyboardEvent) {
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
    }
    elems[this.dd.selectedOption].nativeElement.focus();
  }
}
