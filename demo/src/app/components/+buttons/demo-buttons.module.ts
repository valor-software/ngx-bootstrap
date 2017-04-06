import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SharedModule } from '../../shared';
import { ButtonsSectionComponent } from './buttons-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-buttons.routes';

@NgModule({
  declarations: [
    ButtonsSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    ButtonsModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [ButtonsSectionComponent]
})
export class DemoButtonsModule {
}
