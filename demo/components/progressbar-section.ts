import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES, Ng2BootstrapConfig, Ng2BootstrapTheme} from '../../ng2-bootstrap';
import {ProgressbarDemo} from './progressbar/progressbar-demo';

let name = 'Progressbar';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/progressbar';

// webpack html imports
let doc = require('../../components/progressbar/readme.md');
let titleDoc = require('../../components/progressbar/title.md');

let ts = require('!!prismjs?lang=typescript!./progressbar/progressbar-demo.ts');

let templates:any = {
  [Ng2BootstrapTheme.BS3]: require('!!prismjs?lang=markup!./progressbar/progressbar-demo.html'),
  [Ng2BootstrapTheme.BS4]: require('!!prismjs?lang=markup!./progressbar/progressbar-demo-bs4.html')
};

let html = templates[Ng2BootstrapConfig.theme];

let template = require('./demo-component.template.html');
template = template.replace('<demoComponentContent></demoComponentContent>', '<progressbar-demo></progressbar-demo>');

@Component({
  selector: 'progressbar-section',
  directives: [ProgressbarDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})

export class ProgressbarSection {
  private name:string = name;
  private html:string = html;
  private ts:string = ts;
  private titleDoc:string = titleDoc;
  private doc:string = doc;
  private src:string = src;
}
