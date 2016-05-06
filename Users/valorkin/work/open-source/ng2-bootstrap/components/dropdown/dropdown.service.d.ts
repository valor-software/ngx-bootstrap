export declare const ALWAYS: string;
export declare const DISABLED: string;
export declare const OUTSIDECLICK: string;
export declare const NONINPUT: string;
import { DropdownDirective } from './dropdown.directive';
export declare class DropdownService {
    private openScope;
    private closeDropdownBind;
    private keybindFilterBind;
    open(dropdownScope: DropdownDirective): void;
    close(dropdownScope: DropdownDirective): void;
    private closeDropdown(event);
    private keybindFilter(event);
}
export declare let dropdownService: DropdownService;
