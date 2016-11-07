'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_bootstrap_config_1 = require('../../../components/ng2-bootstrap-config');
var router_config_1 = require('./../../router.config');
// webpack html imports
var template = require('./main-menu.component.html');
var MainMenuComponent = (function () {
  function MainMenuComponent(router) {
    var _this = this;
    this.router = router;
    this.isBs3 = ng2_bootstrap_config_1.Ng2BootstrapConfig.theme === ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3;
    this.routes = router_config_1.routes;
    this.search = {};
    this.hash = '';
    this.routes = this.routes.filter(function (v) { return v.path !== '**'; });
    this.router.events.subscribe(function (event) {
      if (event instanceof router_1.NavigationEnd) {
        _this.hash = event.url;
      }
    });
  }
  MainMenuComponent = __decorate([
    core_1.Component({
      selector: 'main-menu',
      template
    })
  ], MainMenuComponent);
  return MainMenuComponent;
}());
exports.MainMenuComponent = MainMenuComponent;
