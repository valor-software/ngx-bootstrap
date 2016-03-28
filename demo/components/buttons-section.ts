import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {ButtonsDemoComponent} from './buttons/buttons-demo';
import {DemoSection} from './demo-section';

// webpack html imports
let doc = require('../../components/buttons/readme.md');
let titleDoc = require('../../components/buttons/title.md');

let ts = require('!!prismjs?lang=typescript!./buttons/buttons-demo.ts');
let html = require('!!prismjs?lang=markup!./buttons/buttons-demo.html');

@Component({
  selector: 'buttons-section',
  directives: [DemoSection, ButtonsDemo, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <buttons-demo></buttons-demo>
    </demo-section>`
})

  private name:string = 'Buttons';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/buttons';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
