import {TabHeadingDirective} from './tabs/tab-heading.directive';
import {TabDirective} from './tabs/tab.directive';
import {TabsetComponent} from './tabs/tabset.component';

export {TabHeadingDirective} from './tabs/tab-heading.directive';
export {TabsetComponent} from './tabs/tabset.component';
export {TabDirective} from './tabs/tab.directive';
export {TabsModule} from './tabs/tabs.module';

/** @deprecated */
export const TAB_DIRECTIVES:Array<any> = [TabDirective, TabHeadingDirective, TabsetComponent];
