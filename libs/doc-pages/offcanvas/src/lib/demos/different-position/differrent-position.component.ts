import { Component } from "@angular/core";
import { OffcanvasConfigType } from 'ngx-bootstrap/offcanvas';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'different-position',
  templateUrl: './different-position.component.html'
})
export class DifferentPositionComponent {
  config: OffcanvasConfigType | Partial<OffcanvasConfigType> = {placement: 'start', headerTitle: 'Header title'};

  setPlacement(placement: 'start' | 'end' | 'top' | 'bottom') {
    this.config = {placement, headerTitle: 'Header title'};
  }
}
