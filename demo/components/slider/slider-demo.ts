import { Component } from '@angular/core';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../../../ng2-bootstrap';

// switch bs3\bs4 templates
// webpack html imports
let templates: any = {
  [Ng2BootstrapTheme.BS3]: require('./slider-demo.html'),
  [Ng2BootstrapTheme.BS4]: require('./slider-demo.html')
};

@Component({
  selector: 'slider-demo',
  template: templates[Ng2BootstrapConfig.theme]
})
export class SliderDemoComponent {

}
