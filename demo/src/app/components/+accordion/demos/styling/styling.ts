import { Component } from '@angular/core';

@Component({
  selector: 'demo-accordion-styling',
  templateUrl: './styling.html',
  styles: [`
    :host >>> .card.customClass,
    :host >>> .card.customClass .card-header,
    :host >>> .panel.customClass {
      background-color: #5bc0de;
      color: #fff;
    }
    :host >>> .panel.customClass .panel-body {
      background-color: #337aa7;
    }
  `]
})
export class DemoAccordionStylingComponent {
  customClass: string = 'customClass';
  isFirstOpen: boolean = true;
}
