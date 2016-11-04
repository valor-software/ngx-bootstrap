"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// webpack html imports
var template = require('./carousel-demo.component.html');
var CarouselDemoComponent = (function () {
    function CarouselDemoComponent() {
        this.myInterval = 5000;
        this.noWrapSlides = false;
        this.slides = [];
        for (var i = 0; i < 4; i++) {
            this.addSlide();
        }
    }
    CarouselDemoComponent.prototype.addSlide = function () {
        var newWidth = 600 + this.slides.length + 1;
        this.slides.push({
            image: "//placekitten.com/" + newWidth + "/300",
            text: ['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4] + "\n      " + ['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]
        });
    };
    CarouselDemoComponent.prototype.removeSlide = function (index) {
        this.slides.splice(index, 1);
    };
    CarouselDemoComponent = __decorate([
        core_1.Component({
            selector: 'carousel-demo',
            template: template
        })
    ], CarouselDemoComponent);
    return CarouselDemoComponent;
}());
exports.CarouselDemoComponent = CarouselDemoComponent;
