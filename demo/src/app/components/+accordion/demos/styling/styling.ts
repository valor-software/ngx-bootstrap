import { Component } from '@angular/core';

@Component({
  selector: 'demo-accordion-styling',
  templateUrl: './styling.html',
  styleUrls: ['./styling.css']
})
export class DemoAccordionStylingComponent {
  public customClass: string = 'customClass';
  public isFirstOpen: boolean = true;
}
