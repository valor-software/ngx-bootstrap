import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { TabHeadingDirective } from './tab-heading.directive';
import { TabComponent } from './tab.component';
import { TabsetComponent } from './tabset.component';
import { TabsetConfig } from './tabset.config';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TabComponent,
    TabsetComponent,
    TabHeadingDirective
  ],
  exports: [
    TabComponent,
    TabsetComponent,
    TabHeadingDirective
  ],
  entryComponents: [TabComponent]
})
export class TabsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TabsModule,
      providers: [TabsetConfig]
    };
  }
}
