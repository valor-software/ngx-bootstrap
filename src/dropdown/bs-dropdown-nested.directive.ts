import {
  Directive, ElementRef,
  HostListener, Renderer2
} from '@angular/core';

@Directive({
  selector: '[bsDropdownNested],[dropdownNested]',
  exportAs: 'bs-dropdown-nested'
})
export class BsDropdownNestedDirective {
  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseover')
  onMouseover(): void {
    const hostElem = this.elem.nativeElement;
    const nestedMenu = hostElem.querySelector('ul.nested-menu');
    this.renderer.setStyle(nestedMenu , 'top', 0);
    this.renderer.setStyle(nestedMenu , 'left', `100%`);
    this.renderer.setStyle(nestedMenu , 'display', 'block');
  }

  @HostListener('mouseleave')
  onMouseleave(): void {
    const hostElem = this.elem.nativeElement;
    const nestedMenu = hostElem.querySelector('ul.nested-menu');
    this.renderer.setStyle(nestedMenu , 'display', 'none');
  }
}
