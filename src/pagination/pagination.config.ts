import { Injectable } from '@angular/core';

export interface PaginationConfig {
  itemsPerPage: any;
  previousText: any;
  nextText: any;
  pageBtnClass: any;
}

@Injectable()

export class BaseConfig implements PaginationConfig {
  public maxSize: any = void 0;
  public itemsPerPage: number = 10;
  public boundaryLinks: boolean = false;
  public directionLinks: boolean = true;
  public firstText: string = 'First';
  public previousText: string = 'Previous';
  public nextText: string = 'Next';
  public lastText: string = 'Last';
  public pageBtnClass: string = '';
  public rotate: boolean = true;
}

@Injectable()

export class PagerConfig implements PaginationConfig {
  public itemsPerPage: number = 10;
  public previousText: string = '« Previous';
  public nextText: string = 'Next »';
  public pageBtnClass: string = '';
  public align: boolean = true;
}
