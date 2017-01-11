import { Component } from '@angular/core';
import { TabsetConfig } from 'ng2-bootstrap';

// such override allows to keep some initial values

export function getTabsetConfig(): TabsetConfig {
  return Object.assign(new TabsetConfig(), {type: 'pills'});
}

@Component({
  selector: 'demo-tabs-config',
  templateUrl: './config.html',
  providers: [{provide: TabsetConfig, useFactory: getTabsetConfig}]
})
export class DemoTabsConfigComponent {
}
