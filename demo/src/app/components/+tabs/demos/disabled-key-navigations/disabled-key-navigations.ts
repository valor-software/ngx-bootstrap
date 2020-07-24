import { Component } from '@angular/core';
import { TabsetConfig } from 'ngx-bootstrap/tabs';

export function getTabsetConfig(): TabsetConfig {
  return Object.assign(new TabsetConfig(), { type: 'tabs', isKeysAllowed: false });
}

@Component({
  selector: 'demo-disabled-key-navigations',
  templateUrl: './disabled-key-navigations.html',
  providers: [{ provide: TabsetConfig, useFactory: getTabsetConfig }]
})
export class DemoDisabledKeyNavigationsComponent {
}
