import {
  Directive, OnDestroy, Input, Output, HostBinding, TemplateRef, EventEmitter
} from 'angular2/core';
import {Tabset} from './tabset.component';
import {Guid} from '../common';

/* tslint:disable */
@Directive({selector: 'tab, [tab]'})
/* tslint:enable */
export class Tab implements OnDestroy {
  @Input() public heading:string;
  @Input() public disabled:boolean;
  @Input() public removable:boolean;

  /** tab active state toggle */
  @HostBinding('class.active')
  @Input()
  public get active():boolean {
    return this._active;
  }

  @Output() public select:EventEmitter<Tab> = new EventEmitter(false);
  @Output() public deselect:EventEmitter<Tab> = new EventEmitter(false);
  @Output() public removed:EventEmitter<Tab> = new EventEmitter(false);

  public set active(active:boolean) {
    if (this.disabled && active || !active) {
      if (!active) {
        this._active = active;
      }

      this.deselect.emit(this);
      return;
    }

    this._active = active;
    this.select.emit(this);
  }

  @HostBinding('class.tab-pane') public addClass:boolean = true;

  public headingRef:TemplateRef;
  public tabset:Tabset;
  public key: string;
  private _active:boolean;

  public constructor(tabset:Tabset) {
    this.key = Guid.newGuid();
    this.tabset = tabset;
    this.tabset.addTab(this);
  }

  public ngOnInit():void {this.removable = !!this.removable;}

  public ngOnDestroy():void {
    this.tabset.removeTab(this);
  }
}
