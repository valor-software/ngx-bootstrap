import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgTranscludeDirective} from '../common';
import {TabDirective} from './tab.directive';
import {TabsetComponent} from './tabset.component';
import {TabHeadingDirective} from './tab-heading.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective],
    exports: [TabDirective, TabsetComponent, TabHeadingDirective]
})
export class TabsModule {}
