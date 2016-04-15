import { AccordionPanel } from './accordion-group.component';
export declare class Accordion {
    closeOthers: boolean;
    private addClass;
    constructor();
    private groups;
    closeOtherPanels(openGroup: AccordionPanel): void;
    addGroup(group: AccordionPanel): void;
    removeGroup(group: AccordionPanel): void;
}
