import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { RatingComponent } from './rating.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RatingComponent],
  exports: [RatingComponent]
})
export class RatingModule {
  static forRoot(): ModuleWithProviders<RatingModule> {
    return {
      ngModule: RatingModule,
      providers: []
    };
  }
}
