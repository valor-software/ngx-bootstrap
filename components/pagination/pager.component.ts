import { Component, ElementRef, OnInit, Renderer, Self } from '@angular/core';
import { NgModel } from '@angular/forms';

import { PaginationComponent } from './pagination.component';
import { PaginationConfig } from './config';

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

  public constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef, paginationConfig: PaginationConfig) {
    // set pager's config instead of base config
    paginationConfig.main = Object.assign(paginationConfig.main, paginationConfig.pager);

    super(cd, renderer, elementRef, paginationConfig);
  }
}
