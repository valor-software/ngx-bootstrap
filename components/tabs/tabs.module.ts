import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgTranscludeDirective } from '../common';
import { TabHeadingDirective } from './tab-heading.directive';
import { TabDirective } from './tab.directive';
import { TabsetComponent } from './tabset.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective],
  exports: [TabDirective, TabsetComponent, TabHeadingDirective]
})
export class TabsModule {
}
