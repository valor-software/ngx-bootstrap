'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// webpack html imports
var doc = require('../../../../components/carousel/readme.md');
var titleDoc = require('../../../../components/carousel/title.md');
var ts = require('!!raw?lang=typescript!./.././carousel-demo.ts');
var html = require('!!raw?lang=markup!./.././carousel-demo.html');
var CarouselSectionComponent = (function () {
  function CarouselSectionComponent() {
    this.name = 'Carousel';
    this.src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/carousel';
    this.html = html;
    this.ts = ts;
    this.titleDoc = titleDoc;
    this.doc = doc;
  }
  CarouselSectionComponent = __decorate([
    core_1.Component({
      selector: 'carousel-section',
      template: '\n    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">\n      <carousel-demo></carousel-demo>\n    </demo-section>'
    })
  ], CarouselSectionComponent);
  return CarouselSectionComponent;
}());
exports.CarouselSectionComponent = CarouselSectionComponent;
