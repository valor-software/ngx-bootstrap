import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgTranscludeDirective } from './ng-transclude.directive';
import { TabHeadingDirective } from './tab-heading.directive';
import { TabDirective } from './tab.directive';
import { TabsetComponent } from './tabset.component';

@NgModule({
    imports: [CommonModule, NgTranscludeDirective,
        TabDirective,
        TabsetComponent,
        TabHeadingDirective],
    exports: [
        TabDirective,
        TabsetComponent,
        TabHeadingDirective,
        NgTranscludeDirective
    ]
})
export class TabsModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return TabsModule;
  }
}
