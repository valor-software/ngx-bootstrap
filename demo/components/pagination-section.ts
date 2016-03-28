import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {PaginationDemo} from './pagination/pagination-demo';

let name = 'Pagination';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/pagination';

// webpack html imports
let doc = require('../../components/pagination/readme.md');
let titleDoc = require('../../components/pagination/title.md');

let ts = require('!!prismjs?lang=typescript!./pagination/pagination-demo.ts');
let html = require('!!prismjs?lang=markup!./pagination/pagination-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<pagination-demo></pagination-demo>');

@Component({
  selector: 'pagination-section',
  template: template,
  directives: [PaginationDemo, TAB_DIRECTIVES, CORE_DIRECTIVES]
})

export class PaginationSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
