import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-placeholders',
  templateUrl: './toggle-placeholders.html'
})
export class DemoTimepickerTogglePlaceholdersComponent {
  myTime: Date = new Date();
  showPlaceholders: boolean = true;

  togglePlaceholders(): void {
    this.showPlaceholders = !this.showPlaceholders;
  }
}