'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// webpack html imports
var template = require('./alerts-demo.component.html');
var AlertDemoComponent = (function () {
  function AlertDemoComponent() {
    this.alerts = [
      {
        type: 'danger',
        msg: 'Oh snap! Change a few things up and try submitting again.'
      },
      {
        type: 'success',
        msg: 'Well done! You successfully read this important alert message.',
        closable: true
      }
    ];
  }
  AlertDemoComponent.prototype.closeAlert = function (i) {
    this.alerts.splice(i, 1);
  };
  AlertDemoComponent.prototype.addAlert = function () {
    this.alerts.push({msg: 'Another alert!', type: 'warning', closable: true});
  };
  AlertDemoComponent = __decorate([
    core_1.Component({
      selector: 'alert-demo',
      template
    })
  ], AlertDemoComponent);
  return AlertDemoComponent;
}());
exports.AlertDemoComponent = AlertDemoComponent;
