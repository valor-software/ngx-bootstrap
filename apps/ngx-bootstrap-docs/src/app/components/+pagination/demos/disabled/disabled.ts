import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination-disabled',
  templateUrl: './disabled.html'
})
export class DemoPaginationDisabledComponent {
  disabled = false;

  toggleState(): void {
    this.disabled = !this.disabled;
  }
}
