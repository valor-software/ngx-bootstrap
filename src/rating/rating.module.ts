import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RatingComponent } from './rating.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [RatingComponent],
  exports: [FormsModule, RatingComponent]
})
export class RatingModule {
}
