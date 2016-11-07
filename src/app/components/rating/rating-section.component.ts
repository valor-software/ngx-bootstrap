import { Component } from '@angular/core';

// webpack html imports
let doc = require('html!markdown!../../../../components/rating/readme.md');
let titleDoc = require('html!markdown!../../../../components/rating/title.md');

let ts = require('!!raw?lang=typescript!./demos/rating-demo.component.ts');
let html = require('!!raw?lang=markup!./demos/rating-demo.component.html');

@Component({
  selector: 'rating-section',
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
