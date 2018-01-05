import { Component } from '@angular/core';

@Component({
  selector: 'demo-accordion-styling',
  templateUrl: './styling.html',
  styleUrls: ['./styling.css']
})
export class DemoAccordionStylingComponent {
  customClass: string = 'customClass';
  isFirstOpen: boolean = true;
}
