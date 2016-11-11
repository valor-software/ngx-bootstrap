import { Component, ElementRef, OnInit, Renderer, Self, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';

import { PaginationComponent } from './pagination.component';
import { PaginationConfig } from './pagination.config';

const PAGER_TEMPLATE = `
    <ul class="pager">
      <li [class.disabled]="noPrevious()" [class.previous]="align" [ngClass]="{'pull-right': align}" class="{{ pageBtnClass }}">
        <a href (click)="selectPage(page - 1, $event)">{{getText('previous')}}</a>
      </li>
      <li [class.disabled]="noNext()" [class.next]="align" [ngClass]="{'pull-right': align}" class="{{ pageBtnClass }}">
        <a href (click)="selectPage(page + 1, $event)">{{getText('next')}}</a>
      </li>
  </ul>
`;

/* tslint:disable */
@Component({
  selector: 'pager[ngModel]',
  template: PAGER_TEMPLATE,
  providers: [NgModel]
})
/* tslint:enable */
export class PagerComponent extends PaginationComponent implements OnInit {

  public constructor(@Self() cd:NgModel,
                     renderer:Renderer,
                     elementRef:ElementRef,
                     @Inject('pagerConfig') _config: PaginationConfig) {
    super(cd, renderer, elementRef, _config);
  }
}
