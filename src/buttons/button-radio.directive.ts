import {
    Directive, ElementRef, HostBinding, forwardRef, HostListener, Input, OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RADIO_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonRadioDirective),
    multi: true
};

@Directive({ selector: '[btnRadio]', providers: [RADIO_CONTROL_VALUE_ACCESSOR] })
export class ButtonRadioDirective implements ControlValueAccessor, OnInit {

    public onChange:any = Function.prototype;
    public onTouched:any = Function.prototype;

    @Input() public btnRadio:any;
    @Input() public uncheckable:boolean;
    @Input() public value:any;

    protected el: ElementRef;

    @HostBinding('class.active')
    public get isActive(): boolean {
        return this.btnRadio === this.value;
    }

    @HostListener('click')
    public onClick(): void {
        if (this.el.nativeElement.attributes.disabled) {
            return;
        }

        if (this.uncheckable && this.btnRadio === this.value) {
            this.value = undefined;
        } else {
            this.value = this.btnRadio;
        }

        this.onTouched();
        this.onChange(this.value);
    }

    public constructor(el: ElementRef) {
      this.el = el;
    }

    public ngOnInit(): void {
        this.uncheckable = typeof this.uncheckable !== 'undefined';
    }

    public onBlur(): void {
        this.onTouched();
    }

    // ControlValueAccessor
    // model -> view
    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
