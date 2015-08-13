/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, bootstrap, coreDirectives} from 'angular2/angular2';

import {AlertDemo} from 'src/components/demo/alert-demo';
import {ButtonsDemo} from 'src/components/demo/buttonts-demo';

@Component({
  selector: 'app'
})
@View({
  template: `
    <alert-demo></alert-demo>
    <buttons-demo></buttons-demo>
  `,
  directives: [AlertDemo, ButtonsDemo, coreDirectives]
})
export class Home {
  alerts:Array<Object>;

  constructor() {
  }
}

bootstrap(Home);
