export declare class DropdownDemo {
    disabled: boolean;
    status: {
        isopen: boolean;
    };
    items: Array<string>;
    toggled(open: boolean): void;
    toggleDropdown($event: MouseEvent): void;
}
