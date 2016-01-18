import {Component, OnInit, ElementRef, Renderer, Self} from 'angular2/core';
import {NgModel, NgClass} from 'angular2/common';

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

@Component({
  selector: 'pager[ngModel]',
  inputs: [
    'align',
    'totalItems', 'itemsPerPage',
    'previousText', 'nextText',
  ],
  outputs:['numPages', 'pageChanged'],
  template: PAGER_TEMPLATE,
  directives: [NgClass]
})
export class Pager extends Pagination implements OnInit {
  public config = pagerConfig;

  constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef) {
    super(cd, renderer, elementRef);
  }
}
