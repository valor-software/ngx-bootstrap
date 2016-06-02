import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {RatingDemoComponent} from './rating/rating-demo';
import {DemoSectionComponent} from './demo-section';

// webpack html imports
let doc = require('../../components/rating/readme.md');
let titleDoc = require('../../components/rating/title.md');

let ts = require('!!prismjs?lang=typescript!./rating/rating-demo.ts');
let html = require('!!prismjs?lang=markup!./rating/rating-demo.html');

@Component({
  selector: 'rating-section',
  directives: [DemoSectionComponent, RatingDemoComponent, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <rating-demo></rating-demo>
    </demo-section>`
})
export class RatingSectionComponent {
  public name:string = 'Rating';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/rating';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;
}
