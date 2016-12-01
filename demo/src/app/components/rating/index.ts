import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { RatingSectionComponent } from './rating-section.component';
import { RatingDemoComponent } from './demos/rating-demo.component';
import { RatingModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    RatingDemoComponent,
    RatingSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RatingModule
  ],
  exports: [RatingSectionComponent]
})
export class DemoRatingModule {

}
