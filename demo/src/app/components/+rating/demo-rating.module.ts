import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'ngx-bootstrap/rating';

import { SharedModule } from '../../shared';
import { RatingSectionComponent } from './rating-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-rating.routes';

@NgModule({
  declarations: [
    RatingSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RatingModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [RatingSectionComponent]
})
export class DemoRatingModule {

}
