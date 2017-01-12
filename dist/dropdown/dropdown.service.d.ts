export declare const ALWAYS: string;
export declare const DISABLED: string;
export declare const OUTSIDECLICK: string;
export declare const NONINPUT: string;
import { DropdownDirective } from './dropdown.directive';
export declare class DropdownService {
    protected openScope: DropdownDirective;
    protected closeDropdownBind: EventListener;
    protected keybindFilterBind: EventListener;
    open(dropdownScope: DropdownDirective): void;
    close(dropdownScope: DropdownDirective): void;
    protected closeDropdown(event: MouseEvent): void;
    protected keybindFilter(event: KeyboardEvent): void;
}
export declare let dropdownService: DropdownService;
