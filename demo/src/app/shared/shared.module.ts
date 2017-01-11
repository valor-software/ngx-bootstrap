import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ng2-bootstrap';
import { DemoSectionComponent } from './demo-section/demo-section.component';
import { NgApiDocModule } from '../api-docs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { RouterModule } from '@angular/router';

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
