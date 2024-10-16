import { NgModule } from '@angular/core';

import { CollapseDirective } from './collapse.directive';

@NgModule({
    imports: [CollapseDirective],
    exports: [CollapseDirective]
})
export class CollapseModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return CollapseModule;
  }
}
