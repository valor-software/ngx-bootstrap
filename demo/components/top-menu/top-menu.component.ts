import {Component} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';

// webpack html imports
let template = require('./top-menu.template.html');

@Component({
  selector: 'top-menu',
  template: template,
  directives: [RouterLink]
})
export class TopMenuComponent {
}
