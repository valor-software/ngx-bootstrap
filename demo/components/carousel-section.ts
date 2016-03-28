import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {CarouselDemo} from './carousel/carousel-demo';

let name = 'Carousel';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/carousel';

// webpack html imports
let doc = require('../../components/carousel/readme.md');
let titleDoc = require('../../components/carousel/title.md');

let ts = require('!!prismjs?lang=typescript!./carousel/carousel-demo.ts');
let html = require('!!prismjs?lang=markup!./carousel/carousel-demo.html');

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<carousel-demo></carousel-demo>');

@Component({
  selector: 'carousel-section',
  directives: [CarouselDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})

export class CarouselSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
