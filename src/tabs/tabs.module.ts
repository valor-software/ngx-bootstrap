import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgTranscludeDirective } from './ng-transclude.directive';
import { TabHeadingDirective } from './tab-heading.directive';
import { TabComponent } from './tab.component';
import { TabsetComponent } from './tabset.component';
import { TabsetConfig } from './tabset.config';

@NgModule({
  imports: [CommonModule],
  declarations: [NgTranscludeDirective, TabComponent, TabsetComponent, TabHeadingDirective],
  exports: [TabComponent, TabsetComponent, TabHeadingDirective, NgTranscludeDirective]
})
export class TabsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TabsModule,
      providers: [TabsetConfig]
    };
  }
}
