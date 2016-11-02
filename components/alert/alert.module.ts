import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';
import { AlertConfig } from './alert.config';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  providers: [AlertConfig]
})
export class AlertModule {
}
