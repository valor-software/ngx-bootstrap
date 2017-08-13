import { ModuleWithProviders } from '@angular/core';
export { AccordionComponent, AccordionConfig, AccordionModule, AccordionPanelComponent } from './accordion';
export { AlertComponent, AlertConfig, AlertModule } from './alert';
export { ButtonCheckboxDirective, ButtonRadioDirective, ButtonsModule } from './buttons';
export { CarouselComponent, CarouselConfig, CarouselModule, SlideComponent } from './carousel';
export { CollapseDirective, CollapseModule } from './collapse';
export { DateFormatter, DatePickerComponent, DatepickerConfig, DatepickerModule, DayPickerComponent, MonthPickerComponent, YearPickerComponent } from './datepicker';
export { ModalDirective, ModalOptions, ModalBackdropOptions, ModalBackdropComponent, ModalModule, BsModalRef, BsModalService } from './modal';
export { BsDropdownModule, BsDropdownConfig, BsDropdownState, BsDropdownContainerComponent, BsDropdownDirective, BsDropdownMenuDirective, BsDropdownToggleDirective } from './dropdown';
export { PagerComponent, PaginationComponent, PaginationConfig, PaginationModule } from './pagination';
export { BarComponent, ProgressbarComponent, ProgressbarConfig, ProgressbarModule, ProgressDirective } from './progressbar';
export { RatingComponent, RatingModule } from './rating';
export { DraggableItem, DraggableItemService, SortableItem, SortableComponent, SortableModule } from './sortable';
export { NgTranscludeDirective, TabDirective, TabHeadingDirective, TabsetComponent, TabsetConfig, TabsModule } from './tabs';
export { TimepickerComponent, TimepickerConfig, TimepickerModule } from './timepicker';
export { TooltipConfig, TooltipContainerComponent, TooltipDirective, TooltipModule } from './tooltip';
export { TypeaheadOptions, TypeaheadContainerComponent, TypeaheadDirective, TypeaheadMatch, TypeaheadModule } from './typeahead';
export { PopoverConfig, PopoverContainerComponent, PopoverDirective, PopoverModule } from './popover';
export { OnChange, LinkedList, isBs3, Trigger, Utils } from './utils';
export { ComponentLoader, ComponentLoaderFactory, ContentRef } from './component-loader';
export { Positioning, PositioningOptions, PositioningService, positionElements } from './positioning';
export declare class BsRootModule {
}
export declare class Ng2BootstrapModule {
    static forRoot(): ModuleWithProviders;
}
