import { NgModule } from '@angular/core';

import { CollapseDirective } from './collapse.directive';

@NgModule({
  declarations: [CollapseDirective],
  exports: [CollapseDirective]
})
export class CollapseModule {
}
