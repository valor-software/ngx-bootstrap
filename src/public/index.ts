/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, bootstrap, coreDirectives} from 'angular2/angular2';

import {AccordionDemo} from 'src/components/demo/accordion-demo';
import {AlertDemo} from 'src/components/demo/alert-demo';
import {ButtonsDemo} from 'src/components/demo/buttons-demo';
import {DropdownDemo} from 'src/components/demo/dropdown-demo';
import {CollapseDemo} from 'src/components/demo/collapse-demo';
import {TooltipDemo} from 'src/components/demo/tooltip-demo';

@Component({
  selector: 'app'
})
@View({
  template: `
    <div></div>
    <accordion-demo></accordion-demo>
    <alert-demo></alert-demo>
    <buttons-demo></buttons-demo>
    <dropdown-demo></dropdown-demo>
    <collapse-demo></collapse-demo>
    <tooltip-demo></tooltip-demo>
  `,
  directives: [
    AlertDemo, AccordionDemo,
    ButtonsDemo, DropdownDemo,
    CollapseDemo,
    TooltipDemo,
    coreDirectives
  ]
})
export class Home {
}

bootstrap(Home);
