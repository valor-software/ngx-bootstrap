import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {PaginationDemoComponent} from './pagination/pagination-demo';
import {DemoSection} from './demo-section';

// webpack html imports
let doc = require('../../components/pagination/readme.md');
let titleDoc = require('../../components/pagination/title.md');

let ts = require('!!prismjs?lang=typescript!./pagination/pagination-demo.ts');
let html = require('!!prismjs?lang=markup!./pagination/pagination-demo.html');

@Component({
  selector: 'pagination-section',
  directives: [DemoSection, PaginationDemo, CORE_DIRECTIVES],
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <pagination-demo></pagination-demo>
    </demo-section>`
})

  private name:string = 'Pagination';
  private src:string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/pagination';
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
}
