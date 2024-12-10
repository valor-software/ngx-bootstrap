import { Component } from '@angular/core';
import { TypeaheadMatch, TypeaheadConfig } from 'ngx-bootstrap/typeahead';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-typeahead-on-blur',
  templateUrl: './on-blur.html',
  providers: [{ provide: TypeaheadConfig, useValue: { selectItemOnBlur: true, hideResultsOnBlur: true } }],
  standalone: false
})
export class DemoTypeaheadOnBlurComponent {
  selected?: string;
  optionOnBlur?: string;
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  typeaheadOnBlur(event?: TypeaheadMatch<string>): void {
    this.optionOnBlur = event?.item;
  }
}
