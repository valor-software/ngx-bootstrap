import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {TypeaheadDemo} from './typeahead/typeahead-demo';

let name = 'Typeahead';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/typeahead';

// webpack html imports
let doc = require('../../components/typeahead/readme.md');
let titleDoc = require('../../components/typeahead/title.md');

let ts = require('!!prismjs?lang=typescript!./typeahead/typeahead-demo.ts');
let html = require('!!prismjs?lang=markup!./typeahead/typeahead-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<typeahead-demo></typeahead-demo>');

@Component({
  selector: 'typeahead-section',
  directives: [TypeaheadDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})

export class TypeaheadSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
