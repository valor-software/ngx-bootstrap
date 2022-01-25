import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { routes } from './offcanvas.routes';
import { DocsModule } from '@ngx-bootstrap-doc/docs';
import { OffcanvasSectionComponent } from "./offcanvas.component";
import { DEMO_COMPONENTS } from "./demos/index";
import { OffcanvasModule } from 'ngx-bootstrap/offcanvas';



@NgModule({
  declarations: [
    OffcanvasSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocsModule,
    OffcanvasModule
  ]
})
export class DemoOffcanvasModule {
}
