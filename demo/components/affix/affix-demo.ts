import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Affix, AffixStatusChange} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./affix-demo.html');

@Component({
  selector: 'affix-demo',
  template: template,
  directives: [Affix, CORE_DIRECTIVES]
})
export class AffixDemo {

  onAffixChange(event:AffixStatusChange) {
    console.log('Navbar changed from ' + event.oldStatus + ' to ' + event.newStatus);
  }

}
