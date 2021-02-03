import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  entryComponents: [AlertComponent]
})
export class AlertModule {
  static forRoot(): ModuleWithProviders<AlertModule> {
    return { ngModule: AlertModule, providers: [] };
  }
}
