import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {
  Affix,
  Collapse,
  DROPDOWN_DIRECTIVES,
  Ng2BootstrapConfig,
  Ng2BootstrapTheme
} from '../../ng2-bootstrap';

let components = [
  'Accordion', 'Alerts', 'Affix', 'Buttons', 'Carousel', 'Collapse', 'Datepicker',
  'Dropdowns', /*'Modal',*/ 'Pagination', /*'Popover',*/ 'Progressbar',
  'Rating', 'Tabs', 'Timepicker', 'Tooltip', 'Typeahead'
];

let template = `
    <div class="navbar-container">
    <header affix [affixOffsetTop]="311" class="navbar navbar-default navbar-inner bg-faded">
    <div class="container">
      <div class="navbar-header hidden-md-up">
        <button type="button" class="navbar-toggle navbar-toggler pull-right" (click)="isCollapsed = !isCollapsed">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand visible-xs" href="{{prefix}}#">ng2-bootstrap</a>
      </div>
      <nav class="hidden-xs hidden-xs-down">
        <ul class="nav navbar-nav">
          <li class="nav-item"><a href="{{prefix}}#top" role="button" class="navbar-brand">ng2-bootstrap</a></li>
          <li class="nav-item dropdown" dropdown>
            <a role="button" class="nav-link dropdownToggle" dropdownToggle>Directives <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li *ngFor="#comp of components"><a class="dropdown-item" href="{{prefix}}#{{comp.toLowerCase()}}">{{comp}}</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="{{prefix}}#getting-started">Getting started</a></li>
          <li class="nav-item"><a class="nav-link" href="{{prefix}}#migration">Migration</a></li>
        </ul>
      </nav>
      <nav class="visible-xs hidden-md-up">
        <ul class="nav nav-pills nav-stacked scrollable-menu" [collapse]="isCollapsed" (click)="isCollapsed = !isCollapsed; true">
          <li class="nav-item"><a class="nav-link" href="{{prefix}}#getting-started">Getting started</a></li>
          <li class="nav-item"><a class="nav-link" href="{{prefix}}#migration">Migration</a></li>
          <li *ngFor="#comp of components" class="nav-item"><a class="dropdown-item nav-link" href="{{prefix}}#{{comp.toLowerCase()}}">{{comp}}</a></li>
        </ul>
      </nav>
    </div>
  </header>
  </div>`;

@Component({
  selector: 'demo-header',
  template: template,
  directives: [
    CORE_DIRECTIVES,
    Collapse,
    DROPDOWN_DIRECTIVES,
    Affix
  ]
})
export class DemoHeader {
  public components:Array<string> = components;
  public isCollapsed:boolean = true;
  public prefix:string;

  constructor() {
    this.prefix = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS4 ? 'index-bs4.html' : '';
  }
}
