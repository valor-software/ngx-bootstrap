import { Component } from '@angular/core';
import { BsDatepickerViewState } from 'src/datepicker/reducer/bs-datepicker.state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-view-change-event',
  templateUrl: './view-change-event.html'
})
export class DemoDatepickerViewChangeEventComponent {
  view?: BsDatepickerViewState;

  onViewChange(view: BsDatepickerViewState): void {
    this.view = view;
  }
}
