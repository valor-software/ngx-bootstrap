import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagerComponent } from './pager.component';
import { PaginationComponent } from './pagination.component';
import { BaseConfig, PagerConfig } from './pagination.config';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PagerComponent, PaginationComponent],
  exports: [FormsModule, PagerComponent, PaginationComponent],
  providers: [{provide: 'baseConfig', useClass: BaseConfig}, {provide: 'pagerConfig', useClass: PagerConfig}]
})
export class PaginationModule {
}
