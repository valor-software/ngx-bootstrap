import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { ButtonsSectionComponent } from './buttons-section.component';
import { ButtonsDemoComponent } from './demos/buttons-demo.component';
import { ButtonsModule } from '../../../../dist/components/buttons/buttons.module';

@NgModule({
  declarations:[
    ButtonsSectionComponent,
    ButtonsDemoComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    ButtonsModule,
    SharedModule
  ],
  exports: [ButtonsSectionComponent]
})
export class ButtonsDocModule{}
