import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {AlertDemoComponent} from './alert/alert-demo';
import {DemoSection} from './demo-section';

// webpack html imports
let doc = require('../../components/alert/readme.md');
let titleDoc = require('../../components/alert/title.md');
let ts = require('!!prismjs?lang=typescript!./alert/alert-demo.ts');
let html = require('!!prismjs?lang=markup!./alert/alert-demo.html');

@Component({
  selector: 'alert-section',
  directives: [DemoSection, AlertDemo, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <alert-demo></alert-demo>
    </demo-section>`
})
export class AlertSectionComponent {
  private name:string = 'Alerts';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/alert';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
