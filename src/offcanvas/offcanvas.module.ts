import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { OffcanvasContainerComponent } from './offcanvas-container.component';
import { OffcanvasDirective } from './offcanvas.directive'
import { OffcanvasBackdropComponent } from './offcanvas-backdrop';
import { BackdropService } from "./backdrop.service";
import { ComponentLoaderFactory } from "ngx-bootstrap/component-loader";

@NgModule({
  declarations: [
    OffcanvasContainerComponent,
    OffcanvasDirective,
    OffcanvasBackdropComponent
  ],
  imports: [CommonModule],
  exports: [
    OffcanvasContainerComponent,
    OffcanvasDirective,
    OffcanvasBackdropComponent
  ],
  providers:[BackdropService, ComponentLoaderFactory],
  entryComponents: [OffcanvasBackdropComponent]
})
export class OffcanvasModule {

}
