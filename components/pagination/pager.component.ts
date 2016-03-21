import {Component, OnInit, ElementRef, Renderer, Self, forwardRef, Provider} from 'angular2/core';
import {NgClass, NG_VALUE_ACCESSOR} from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';

import {Pagination} from './pagination.component';

const pagerConfig = {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
};

const PAGER_TEMPLATE = `
    <ul class="pager">
      <li [class.disabled]="noPrevious()" [class.previous]="align" [ngClass]="{'pull-right': align}">
        <a href (click)="selectPage(page - 1, $event)">{{getText('previous')}}</a>
      </li>
      <li [class.disabled]="noNext()" [class.next]="align" [ngClass]="{'pull-right': align}">
        <a href (click)="selectPage(page + 1, $event)">{{getText('next')}}</a>
      </li>
  </ul>
`;

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(NG_VALUE_ACCESSOR,
  { useExisting: forwardRef(() => Pager), multi: true }));

@Component({
  selector: 'pager',
  template: PAGER_TEMPLATE,
  directives: [NgClass],
  providers:[CUSTOM_VALUE_ACCESSOR],
  inputs: [
    'align',
    'totalItems', 'itemsPerPage',
    'previousText', 'nextText',
  ]
})
export class Pager extends Pagination implements OnInit {
  public config = pagerConfig;

  constructor(renderer:Renderer, elementRef:ElementRef) {
    super(renderer, elementRef);
  }
}
// todo: pager should support only this in/out
//inputs: [
//  'align',
//  'totalItems', 'itemsPerPage',
//  'previousText', 'nextText',
//],
//  outputs:['numPages', 'pageChanged'],
