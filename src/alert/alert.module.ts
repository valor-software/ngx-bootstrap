import { ModuleWithProviders, NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';

@NgModule({
    imports: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<AlertModule> {
    return {
      ngModule: AlertModule,
      providers: []
    };
  }
}
