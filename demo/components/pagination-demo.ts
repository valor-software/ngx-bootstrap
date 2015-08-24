/// <reference path="../../tsd.d.ts" />

import {Component, View, bootstrap,
  FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';

import {pagination} from '../../components/index';

@Component({
  selector: 'pagination-demo'
})
@View({
  template: `
    <br><hr/>
    <h2>Pagination demo</h2>
    <div class="col-md-6">
        <h4>Default</h4>
        <pagination [total-items]="totalItems" [(ng-model)]="currentPage" (on-change)="pageChanged()"></pagination>
        <pagination [boundary-links]="true" [total-items]="totalItems" [(ng-model)]="currentPage" class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination>
        <pagination [direction-links]="false" [boundary-links]="true" [total-items]="totalItems" [(ng-model)]="currentPage"></pagination>
        <pagination [direction-links]="false" [total-items]="totalItems" [(ng-model)]="currentPage" (num-pages)="smallnumPages = $event"></pagination>
        <pre class="card card-block card-header">The selected page no: {{currentPage}}/{{smallnumPages}}</pre>
        <button type="button" class="btn btn-info" (click)="setPage(3)">Set current page to: 3</button>

        <hr />
        <h4>Pager</h4>
        <pager [total-items]="totalItems" [(ng-model)]="currentPage"></pager>

        <hr />
        <h4>Limit the maximum visible buttons</h4>
        <pagination [total-items]="bigTotalItems" [(ng-model)]="bigCurrentPage" [max-size]="maxSize" class="pagination-sm" [boundary-links]="true"></pagination>
        <pagination [total-items]="bigTotalItems" [(ng-model)]="bigCurrentPage" [max-size]="maxSize" class="pagination-sm" [boundary-links]="true" [rotate]="false" (num-pages)="numPages = $event"></pagination>
        <pre class="card card-block card-header">Page: {{bigCurrentPage}} / {{numPages}}</pre>
    </div>
  `,
  directives: [pagination, FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class PaginationDemo {
  private totalItems = 64;
  private currentPage = 4;

  private maxSize = 5;
  private bigTotalItems = 175;
  private bigCurrentPage = 1;

  private setPage(pageNo) {
    this.currentPage = pageNo;
  };

  private pageChanged() {
    console.log('Page changed to: ' + this.currentPage);
  };
}
