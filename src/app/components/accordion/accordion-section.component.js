'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// webpack html imports
var doc = require('../../components/accordion/readme.md');
var titleDoc = require('../../components/accordion/title.md');
var ts = require('!!raw!./accordion/accordion-demo.ts');
var html = require('!!raw!./accordion/accordion-demo.html');
var AccordionSectionComponent = (function () {
  function AccordionSectionComponent() {
    this.name = 'Accordion';
    this.src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/accordion';
    this.html = html;
    this.ts = ts;
    this.titleDoc = titleDoc;
    this.doc = doc;
  }
  AccordionSectionComponent = __decorate([
    core_1.Component({
      selector: 'accordion-section',
      template: '\n    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">\n      <accordion-demo></accordion-demo>\n    </demo-section>'
    })
  ], AccordionSectionComponent);
  return AccordionSectionComponent;
}());
exports.AccordionSectionComponent = AccordionSectionComponent;
