import {NgModule} from '@angular/core';
import {TabDirective} from './tab.directive';
import {TabsetComponent} from './tabset.component';
import {TabHeadingDirective} from './tab-heading.directive';

@NgModule({
    declarations: [TabDirective, TabsetComponent, TabHeadingDirective],
    exports: [TabDirective, TabsetComponent, TabHeadingDirective]
})
export class TabsModule {}
