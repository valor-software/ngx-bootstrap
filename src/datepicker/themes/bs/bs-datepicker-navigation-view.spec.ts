import { Component } from '@angular/core';
import { MonthViewModel, TimeUnit } from '../../models/index';

describe('datepicker: bs-datepicker-navigation-view', () => {
  beforeEach(asyn(() => {
    
  }));
  it('should run', () => {});
});

@Component({
  selector: 'test-cmp',
  template: `
    <bs-datepicker-navigation-view
      [month]="month"
      (onNavigate)="navTo($event)"
    ></bs-datepicker-navigation-view>`
})
class TestComponent {
  month: MonthViewModel;
  _navTo: TimeUnit;

  navTo(event: TimeUnit): void {
    this._navTo = event;
  }
}
