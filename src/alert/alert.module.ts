// import { BrowserModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AlertComponent } from './alert.component';
import { AlertConfig } from './alert.config';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  entryComponents: [AlertComponent]
})
export class AlertModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AlertModule, providers: [AlertConfig] };
  }
}
