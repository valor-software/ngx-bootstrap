import { ModuleWithProviders, NgModule } from '@angular/core';

import { RatingComponent } from './rating.component';

@NgModule({
    imports: [RatingComponent],
    exports: [RatingComponent]
})
export class RatingModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<RatingModule> {
    return {
      ngModule: RatingModule,
      providers: []
    };
  }
}
