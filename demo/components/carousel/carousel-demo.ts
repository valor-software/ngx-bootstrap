/// <reference path="../../../tsd.d.ts" />

import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CAROUSEL_DIRECTIVES} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./carousel-demo.html');

@Component({
  selector: 'carousel-demo',
  directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class CarouselDemo {
  private myInterval:number = 5000;
  private noWrapSlides:boolean = false;
  private slides:Array<any> = [];

  constructor() {
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }

  private addSlide() {
    let newWidth = 600 + this.slides.length + 1;
    this.slides.push({
      image: `//placekitten.com/${newWidth}/300`,
      text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
    });
  }

  private removeSlide(index:number) {
    this.slides.splice(index, 1);
  }
}
