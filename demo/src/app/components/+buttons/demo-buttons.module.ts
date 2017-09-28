import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SharedModule } from '../../shared';
import { ButtonsSectionComponent } from './buttons-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-buttons.routes';

@NgModule({
  declarations: [ButtonsSectionComponent, ...DEMO_COMPONENTS],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ButtonsModule.forRoot()
  ],
  exports: [ButtonsSectionComponent]
})
export class DemoButtonsModule {}
