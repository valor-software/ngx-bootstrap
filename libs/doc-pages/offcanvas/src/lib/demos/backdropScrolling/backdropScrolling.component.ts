import { Component, ViewChild } from '@angular/core';
import { OffcanvasConfigType, OffcanvasContainerComponent } from "ngx-bootstrap/offcanvas";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'backdrop-scrolling',
  templateUrl: './backdropScrolling.component.html'
})
export class BackdropScrollingComponent {
  config: OffcanvasConfigType | Partial<OffcanvasConfigType> = {headerTitle: 'Added header title', backdropScrolling: true};
  @ViewChild('element', {static: false}) public offcanvas?: OffcanvasContainerComponent;

  toggleBackdropScrolling() {
    this.config = Object.assign({}, this.config, {backdropScrolling: !this.config.backdropScrolling});
  }
}
