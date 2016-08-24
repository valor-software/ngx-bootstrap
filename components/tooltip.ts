import { TooltipContainerComponent } from './tooltip/tooltip-container.component';
import { TooltipDirective } from './tooltip/tooltip.directive';

export { TooltipContainerComponent } from './tooltip/tooltip-container.component';
export { TooltipDirective } from './tooltip/tooltip.directive';
export { TooltipModule } from './tooltip/tooltip.module';

/** @deprecated */
export const TOOLTIP_DIRECTIVES:Array<any> = [TooltipDirective, TooltipContainerComponent];
