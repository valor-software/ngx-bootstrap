import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { RatingSectionComponent } from './rating-section.component';
import { RatingModule } from 'ng2-bootstrap';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    RatingSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RatingModule.forRoot()
  ],
  exports: [RatingSectionComponent]
})
export class DemoRatingModule {

}
