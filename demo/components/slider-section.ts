import { Component } from '@angular/core';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../../ng2-bootstrap';

// webpack html imports
let doc = require('../../components/slider/readme.md');
let titleDoc = require('../../components/slider/title.md');

let ts = require('!!raw?lang=typescript!./slider/slider-demo.ts');

let templates: any = {
  [Ng2BootstrapTheme.BS3]: require('!!raw?lang=markup!./slider/slider-demo.html'),
  [Ng2BootstrapTheme.BS4]: require('!!raw?lang=markup!./slider/slider-demo.html')
};

let html = templates[Ng2BootstrapConfig.theme];

@Component({
  selector: 'slider-section',
  template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <slider-demo></slider-demo>
    </demo-section>`
})
export class SliderSectionComponent {
  public name: string = 'Slider';
  public src: string = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/slider';
  public html: string = html;
  public ts: string = ts;
  public titleDoc: string = titleDoc;
  public doc: string = doc;
}
