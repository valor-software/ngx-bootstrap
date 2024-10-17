import { ModuleWithProviders, NgModule } from '@angular/core';

import { SortableComponent } from './sortable.component';

@NgModule({
    imports: [SortableComponent],
    exports: [SortableComponent]
})
export class SortableModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<SortableModule> {
    return {
      ngModule: SortableModule,
      providers: []
    };
  }
}
