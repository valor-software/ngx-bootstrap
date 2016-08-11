import {ProgressDirective} from './progressbar/progress.directive';
import {BarComponent} from './progressbar/bar.component';
import {ProgressbarComponent} from './progressbar/progressbar.component';

export {ProgressDirective} from './progressbar/progress.directive';
export {BarComponent} from './progressbar/bar.component';
export {ProgressbarComponent} from './progressbar/progressbar.component';
export {ProgressbarModule} from './progressbar/progressbar.module';

/** @deprecated */
export const PROGRESSBAR_DIRECTIVES:Array<any> = [ProgressDirective, BarComponent, ProgressbarComponent];
