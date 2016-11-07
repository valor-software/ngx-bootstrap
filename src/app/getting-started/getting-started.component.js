'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var name = 'Native Angular 2 directives for bootstrap';
// webpack html imports
var template = require('./getting-started.template.html');
var desc = '\n';
var dependencies = require('./dependencies.md');
var installation = require('./installation.md');
var readingDocumentation = require('./reading-documentation.md');
var GettingStartedSectionComponent = (function () {
  function GettingStartedSectionComponent() {
    this.name = name;
    this.desc = desc;
    this.dependencies = dependencies;
    this.installation = installation;
    this.readingDocumentation = readingDocumentation;
  }
  GettingStartedSectionComponent = __decorate([
    core_1.Component({
      selector: 'accordion-section',
      template
    })
  ], GettingStartedSectionComponent);
  return GettingStartedSectionComponent;
}());
exports.GettingStartedSectionComponent = GettingStartedSectionComponent;
