import { Injectable, EventEmitter } from '@angular/core';

const left = 'left';
const right = 'right';

export interface BsCalendarOptions {
  // should be `left` or `right`
  bsRole: string;
  offset?: number;
}

@Injectable()
export class BsCalendarOptionsClass implements BsCalendarOptions {
  public bsRole: string;

  public get offset(): number {
    return this.isLeft ? 0 : this._offset;
  }

  public set offset(value: number) {
    this._offset = value;
  }

  public onUpdate: EventEmitter<BsCalendarOptionsClass> = new EventEmitter();

  private _offset: number = 1;

  public update(value: BsCalendarOptions): void {
    Object.assign(this, value);
    this.onUpdate.emit(this);
  }

  public get isLeft(): boolean {
    return this.bsRole === left;
  }

  public get isRight(): boolean {
    return this.bsRole === right;
  }
}
