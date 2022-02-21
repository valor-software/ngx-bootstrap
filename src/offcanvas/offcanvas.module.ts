import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { OffcanvasContainerComponent } from './offcanvas-container.component';
import { OffcanvasDirective } from './offcanvas.directive';
import { ComponentLoaderFactory, BackdropService } from "ngx-bootstrap/component-loader";

@NgModule({
  declarations: [
    OffcanvasContainerComponent,
    OffcanvasDirective,
  ],
  imports: [CommonModule],
  exports: [
    OffcanvasContainerComponent,
    OffcanvasDirective,
  ],
  providers:[BackdropService, ComponentLoaderFactory, BackdropService]
})
export class OffcanvasModule {
}
