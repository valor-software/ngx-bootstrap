import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {RatingDemo} from './rating/rating-demo';

let name = 'Rating';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/rating';

// webpack html imports
let doc = require('../../components/rating/readme.md');
let titleDoc = require('../../components/rating/title.md');

let ts = require('!!prismjs?lang=typescript!./rating/rating-demo.ts');
let html = require('!!prismjs?lang=markup!./rating/rating-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<rating-demo></rating-demo>');

@Component({
  selector: 'rating-section',
  directives: [RatingDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})

export class RatingSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
