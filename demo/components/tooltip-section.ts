import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {TooltipDemoComponent} from './tooltip/tooltip-demo';
import {DemoSection} from './demo-section';

let name = 'Tooltip';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/tooltip';

// webpack html imports
let doc = require('../../components/tooltip/readme.md');
let titleDoc = require('../../components/tooltip/title.md');

let ts = require('!!prismjs?lang=typescript!./tooltip/tooltip-demo.ts');
let html = require('!!prismjs?lang=markup!./tooltip/tooltip-demo.html');

@Component({
  selector: 'tooltip-section',
  directives: [DemoSection, TooltipDemo, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <tooltip-demo></tooltip-demo>
    </demo-section>`
})

  private name:string = 'Tooltip';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/tooltip';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
