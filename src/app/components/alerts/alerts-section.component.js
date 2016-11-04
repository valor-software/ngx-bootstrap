"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// webpack html imports
var doc = require('../../components/alert/readme.md');
var titleDoc = require('../../components/alert/title.md');
var ts = require('!!raw?lang=typescript!./alert/alert-demo.ts');
var html = require('!!raw?lang=markup!./alert/alert-demo.html');
var AlertSectionComponent = (function () {
    function AlertSectionComponent() {
        this.name = 'Alerts';
        this.src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/alert';
        this.html = html;
        this.ts = ts;
        this.titleDoc = titleDoc;
        this.doc = doc;
    }
    AlertSectionComponent = __decorate([
        core_1.Component({
            selector: 'alert-section',
            template: "\n    <demo-section [name]=\"name\" [src]=\"src\" [titleDoc]=\"titleDoc\" [html]=\"html\" [ts]=\"ts\" [doc]=\"doc\">\n      <alert-demo></alert-demo>\n    </demo-section>"
        })
    ], AlertSectionComponent);
    return AlertSectionComponent;
}());
exports.AlertSectionComponent = AlertSectionComponent;
