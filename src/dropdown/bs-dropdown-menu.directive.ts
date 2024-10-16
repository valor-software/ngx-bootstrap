import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';

@Directive({
  selector: '[bsDropdownMenu],[dropdownMenu]',
  exportAs: 'bs-dropdown-menu',
  standalone: true
})
export class BsDropdownMenuDirective {
  constructor(
    _state: BsDropdownState,
    _viewContainer: ViewContainerRef,
    _templateRef: TemplateRef<BsDropdownMenuDirective>
  ) {
    _state.resolveDropdownMenu({
      templateRef: _templateRef,
      viewContainer: _viewContainer
    });
  }
}
