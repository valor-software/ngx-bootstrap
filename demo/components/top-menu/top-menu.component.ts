import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

// webpack html imports
let template = require('./top-menu.template.html');

@Component({
  selector: 'top-menu',
  template: template,
  directives: [RouterLink]
})

export class TopMenuComponent {
}
