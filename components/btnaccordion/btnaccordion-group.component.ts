import {Component, OnInit, Inject, forwardRef, Input, HostBinding} from 'angular2/core';
import {NgClass} from 'angular2/common';

import {BtnAccordion} from './btnaccordion.component';
import {Collapse} from '../collapse';

@Component({
  selector: 'btnaccordion-group, [btnaccordion-group]',
  styles: [`
    .nopadding {
      padding: 0 0 1px 0;
    }
    .borderfix {
      border: 0;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
      outline: 0;
    }
    .bottomradius {
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
    }
  `],
  template: `
    <button
      type="button"
      tabindex="0"
      [ngClass]="buttonClass"
      class="borderfix font-weight-bold"
      [class.bottomradius]="!isExpanded"
      [class.disabled]="isDisabled"
      (click)="toggleOpen($event)">{{heading}}<i class="pull-right fa"
        [ngClass]="{'fa-chevron-down text-muted': !isExpanded, 'fa-chevron-up': isExpanded}"></i></button>

    <div [collapse]="!isExpanded">
      <div class="card-block">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  directives: [
    NgClass,
    Collapse
  ]
})
export class BtnAccordionGroup implements OnInit {
  private _isExpanded: boolean = false;

  @Input('group-class') public groupClass: string;
  @Input('button-class') public buttonClass: string;
  @Input() public heading: string;
  @Input('disabled') public isDisabled: boolean;

  @Input('expanded')
  set isExpanded(value: boolean) {
    this._isExpanded = value;
    if (value) {
      this._accordion.collapseOthers(this);
    }
  }
  get isExpanded(): boolean { return this._isExpanded; }
  
  @HostBinding('class')
  private mainClass: string;
  @HostBinding('style.padding')
  private padding: string;

  constructor(@Inject(forwardRef(() => BtnAccordion)) private _accordion: BtnAccordion) {}

  ngOnInit(): void {
    this.groupClass = this.groupClass || 'list-group-item';
    this.mainClass = this.groupClass;
    this.buttonClass = this.buttonClass || 'list-group-item';
    this.padding = '0 0 1px 0';
  }

  toggleOpen(event: any): void {
    event.preventDefault();
    if (!this.isDisabled) {
      this.isExpanded = !this.isExpanded;
    }
  }
}
