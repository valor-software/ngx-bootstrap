/// <reference path="../tsd.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';

import {AccordionDemo} from './components/accordion-demo';
import {AlertDemo} from './components/alert-demo';
import {ButtonsDemo} from './components/buttons-demo';
import {DatePickerDemo} from './components/datepicker-demo';
import {DropdownDemo} from './components/dropdown-demo';
import {CarouselDemo} from './components/carousel-demo';
import {CollapseDemo} from './components/collapse-demo';
import {PaginationDemo} from './components/pagination-demo';
import {ProgressbarDemo} from './components/progressbar-demo';
import {RatingDemo} from './components/rating-demo';
import {TabsDemo} from './components/tabs-demo';
import {TimepickerDemo} from './components/timepicker-demo';
import {TooltipDemo} from './components/tooltip-demo';

@Component({
  selector: 'app'
})
@View({
  template: `
    <div></div>
    <accordion-demo class="col-md-12"></accordion-demo>
    <alert-demo class="col-md-12"></alert-demo>
    <buttons-demo class="col-md-12"></buttons-demo>
    <carousel-demo class="col-md-12"></carousel-demo>
    <datepicker-demo class="col-md-12"></datepicker-demo>
    <dropdown-demo class="col-md-12"></dropdown-demo>
    <collapse-demo class="col-md-12"></collapse-demo>
    <pagination-demo class="col-md-12"></pagination-demo>
    <progressbar-demo class="col-md-12"></progressbar-demo>
    <rating-demo class="col-md-12"></rating-demo>
    <tabs-demo class="col-md-12"></tabs-demo>
    <timepicker-demo class="col-md-12"></timepicker-demo>
    <tooltip-demo class="col-md-12"></tooltip-demo>
  `,
  directives: [
    AlertDemo,
    AccordionDemo,
    ButtonsDemo,
    DatePickerDemo,
    DropdownDemo,
    CarouselDemo,
    CollapseDemo,
    PaginationDemo,
    ProgressbarDemo,
    RatingDemo,
    TabsDemo,
    TimepickerDemo,
    TooltipDemo
  ]
})
export class Home {
}

bootstrap(Home);


// "demo/index.ts",
//  "demo/typings/es6-object.d.ts",
//  "demo/components/accordion-demo.ts",
//  "demo/components/alert-demo.ts",
//  "demo/components/buttons-demo.ts",
//  "demo/components/dropdown-demo.ts",
//  "demo/components/collapse-demo.ts",
//  "demo/components/pagination-demo.ts",
//  "demo/components/progressbar-demo.ts",
//  "demo/components/rating-demo.ts",
//  "demo/components/tabs-demo.ts",
//  "demo/components/timepicker-demo.ts",
//  "demo/components/tooltip-demo.ts"
