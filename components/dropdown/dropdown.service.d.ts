export declare const ALWAYS: string;
export declare const DISABLED: string;
export declare const OUTSIDECLICK: string;
export declare const NONINPUT: string;
import { Dropdown } from './dropdown.directive';
export declare class DropdownService {
    private openScope;
    private dropdownScope;
    private closeDropdownBind;
    private keybindFilterBind;
    open(dropdownScope: Dropdown): void;
    close(dropdownScope: Dropdown): void;
    private closeDropdown(event);
    private keybindFilter(event);
}
export declare let dropdownService: DropdownService;
