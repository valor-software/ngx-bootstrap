import { Component, Input } from '@angular/core';

@Component({
    selector: 'bs-current-date',
    template: `<div class="current-timedate"><span>{{ title }}</span></div>`,
    standalone: true
})
export class BsCurrentDateViewComponent {
  @Input() title?: string;
}
