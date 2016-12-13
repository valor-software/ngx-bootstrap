import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AlertComponent } from './alert.component';
import { AlertConfig } from './alert.config';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  entryComponents: [AlertComponent]
})
export class AlertModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: AlertModule, providers: [AlertConfig]};
  }
}
