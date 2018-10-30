import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertComponent } from '../../../../../../../src/alert/alert.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'demo-typeahead-templates',
  templateUrl: './list-template.html',
  styles: ['.border-0 { border: 0; }']
})
export class DemoTypeaheadListTemplateComponent implements OnInit {
  // @Input() getIsActiveClass: any;
  isActiveClass = false;
  selected: string;
  classData: boolean;
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

  ngOnInit() {
    // this.getIsActiveClass.subscribe((data: any) => console.log(data));
  }

  setActive(actionEmitter: any, getIsActiveClass: any, value: any) {
    actionEmitter.emit(value);
    // getIsActiveClass.subscribe((data: any) => {
    //   this.classData = data;
    //   console.log(this.classData);
    //   return this.classData;
    // });
  }

  getClass(event: any) {
    event.subscribe((data: any) => console.log(data));
  }
}
