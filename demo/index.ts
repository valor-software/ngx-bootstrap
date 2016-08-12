import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Ng2BootstrapDemoModule } from './ng2-bootstrap-demo.module';

if (ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(Ng2BootstrapDemoModule);
