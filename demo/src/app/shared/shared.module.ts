import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { DemoSectionComponent } from './demo-section/demo-section.component';
import { NgApiDocModule } from '../api-docs';

@NgModule({
  declarations: [DemoSectionComponent],
  imports: [
    TabsModule.forRoot(),
    CommonModule,
    NgApiDocModule,
    Ng2PageScrollModule,
    RouterModule
  ],
  exports: [
    DemoSectionComponent,
    NgApiDocModule,
    Ng2PageScrollModule,
    RouterModule
  ]
})
export class SharedModule {
}
