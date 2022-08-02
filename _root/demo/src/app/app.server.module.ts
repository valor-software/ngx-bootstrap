import { NgModule } from '@angular/core';
import { AppComponent } from '../../../../apps/ngx-bootstrap-docs/src/app/app.component';
import { AppModule } from '../../../../apps/ngx-bootstrap-docs/src/app/app.module';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
