/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, bootstrap, coreDirectives} from 'angular2/angular2';

import {AlertDemo} from 'src/components/demo/alert-demo';
import {ButtonsDemo} from 'src/components/demo/buttons-demo';
import {DropdownDemo} from 'src/components/demo/dropdown-demo';

@Component({
  selector: 'app'
})
@View({
  template: `
    <div></div>
    <alert-demo></alert-demo>
    <buttons-demo></buttons-demo>
    <dropdown-demo></dropdown-demo>
  `,
  directives: [AlertDemo, ButtonsDemo, DropdownDemo, coreDirectives]
})
export class Home {
}

bootstrap(Home);
