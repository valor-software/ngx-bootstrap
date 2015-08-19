/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, bootstrap, coreDirectives} from 'angular2/angular2';

import {AccordionDemo} from 'src/components/demo/accordion-demo';
import {AlertDemo} from 'src/components/demo/alert-demo';
import {ButtonsDemo} from 'src/components/demo/buttons-demo';
import {DropdownDemo} from 'src/components/demo/dropdown-demo';
import {CollapseDemo} from 'src/components/demo/collapse-demo';
import {PaginationDemo} from 'src/components/demo/pagination-demo';
import {ProgressbarDemo} from 'src/components/demo/progressbar-demo';
import {RatingDemo} from 'src/components/demo/rating-demo';
import {TooltipDemo} from 'src/components/demo/tooltip-demo';

@Component({
  selector: 'app'
})
@View({
  template: `
    <div></div>
    <accordion-demo class="col-md-12"></accordion-demo>
    <alert-demo class="col-md-12"></alert-demo>
    <buttons-demo class="col-md-12"></buttons-demo>
    <dropdown-demo class="col-md-12"></dropdown-demo>
    <collapse-demo class="col-md-12"></collapse-demo>
    <pagination-demo class="col-md-12"></pagination-demo>
    <progressbar-demo class="col-md-12"></progressbar-demo>
    <rating-demo class="col-md-12"></rating-demo>
    <tooltip-demo class="col-md-12"></tooltip-demo>
  `,
  directives: [
    AlertDemo, AccordionDemo,
    ButtonsDemo, DropdownDemo,
    CollapseDemo,
    PaginationDemo,
    ProgressbarDemo,
    RatingDemo,
    TooltipDemo,
    coreDirectives
  ]
})
export class Home {
}

bootstrap(Home);
