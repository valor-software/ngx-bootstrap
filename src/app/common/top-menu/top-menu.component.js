'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); };
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
// webpack html imports
var template = require('./top-menu.component.html');
var TopMenuComponent = (function () {
  function TopMenuComponent(renderer, document, router) {
    this.router = router;
    this.isShown = false;
    this.renderer = renderer;
    this.document = document;
  }
  TopMenuComponent.prototype.ngAfterViewInit = function () {
    var _this = this;
    this.router.events.subscribe(function (event) {
      if (event instanceof router_1.NavigationEnd) {
        _this.toggle(false);
      }
    });
  };
  TopMenuComponent.prototype.toggle = function (isShown) {
    this.isShown = typeof isShown === 'undefined' ? !this.isShown : isShown;
    if (this.document && this.document.body) {
      this.renderer.setElementClass(this.document.body, 'isOpenMenu', this.isShown);
      if (this.isShown === false) {
        this.renderer.setElementProperty(this.document.body, 'scrollTop', 0);
      }
    }
  };
  TopMenuComponent = __decorate([
    core_1.Component({
      selector: 'top-menu',
      template
    }),
    __param(1, core_1.Inject(platform_browser_1.DOCUMENT))
  ], TopMenuComponent);
  return TopMenuComponent;
}());
exports.TopMenuComponent = TopMenuComponent;
