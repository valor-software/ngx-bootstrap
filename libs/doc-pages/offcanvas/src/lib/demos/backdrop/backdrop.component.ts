import { Component } from '@angular/core';
import { OffcanvasConfigType } from "ngx-bootstrap/offcanvas";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'backdrop',
  templateUrl: './backdrop.component.html'
})
export class BackdropComponent {
  config: OffcanvasConfigType | Partial<OffcanvasConfigType> = {backdrop: true};

  toggleBackdrop() {
    this.config = {backdrop: !this.config.backdrop};
  }
}
