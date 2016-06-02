import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {ModalDemoComponent} from './modal/modal-demo';
import {DemoSectionComponent} from './demo-section';

// webpack html imports
let doc = require('../../components/modal/readme.md');
let titleDoc = require('../../components/modal/title.md');

let ts = require('!!prismjs?lang=typescript!./modal/modal-demo.ts');
let html = require('!!prismjs?lang=markup!./modal/modal-demo.html');

@Component({
  selector: 'modal-section',
  directives: [ModalDemoComponent, DemoSectionComponent, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <modal-demo></modal-demo>
    </demo-section>`
})
export class ModalSectionComponent {
  public name:string = 'Modals';
  public src:string = 'https://github.com/valor-software/ng2-bootstrap/tree/master/components/modal';
  public html:string = html;
  public ts:string = ts;
  public titleDoc:string = titleDoc;
  public doc:string = doc;

}
