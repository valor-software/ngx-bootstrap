import { Component, OnInit } from '@angular/core';
import { ContentSection } from '../../../models/content-section.model';

@Component({
  selector: 'usage',
  templateUrl: './usage.component.html'
})
export class UsageComponent implements OnInit {
  constructor(public sections: ContentSection) {

  }

  ngOnInit() {
    console.log('content', this.sections);
  }
}
