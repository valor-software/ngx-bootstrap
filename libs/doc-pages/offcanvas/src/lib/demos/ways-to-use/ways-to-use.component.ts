import { Component, ViewChild } from "@angular/core";
import { OffcanvasContainerComponent } from 'ngx-bootstrap/offcanvas';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'use-ways',
  templateUrl: './ways-to-use.component.html'
})
export class WaysToUseComponent {
  @ViewChild('element', {static: false}) private offcanvas?: OffcanvasContainerComponent;

  show() {
    this.offcanvas?.show();
  }
}
