import { NgModule } from '@angular/core';
import { ComponentLoaderFactory } from './component-loader.factory';
import { PositioningService } from 'ngx-bootstrap/positioning';
@NgModule({
  providers: [
    ComponentLoaderFactory,
    PositioningService
  ]
})
export class ComponentLoaderModule {
}
