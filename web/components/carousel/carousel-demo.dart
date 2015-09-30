/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES;
import "../../../lib/index.dart" show carousel;

// webpack html imports
var template = require("./carousel-demo.html");

@Component(selector: "carousel-demo")
@View(
    template: template,
    directives: const [carousel, CORE_DIRECTIVES, FORM_DIRECTIVES])
class CarouselDemo {
  num myInterval = 5000;
  bool noWrapSlides = false;
  Array<dynamic> slides = [];
  CarouselDemo() {
    for (var i = 0; i < 4; i++) {
      this.addSlide();
    }
  }
  addSlide() {
    var newWidth = 600 + this.slides.length + 1;
    this.slides.push(
        image: '''//placekitten.com/${ newWidth}/300''',
        text:
            '''${ [ "More" , "Extra" , "Lots of" , "Surplus" ] [ this . slides . length % 4 ]}
      ${ [ "Cats" , "Kittys" , "Felines" , "Cutes" ] [ this . slides . length % 4 ]}''');
  }

  removeSlide(index) {
    this.slides.splice(index, 1);
  }
}
