/// <reference path="../../tsd.d.ts" />

import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

import {tabs} from '../../components/index';

@Component({
  selector: 'tabs-demo'
})
@View({
  template: `
    <br><hr>
    <h2>Tabs demo</h2>
    <div (^click)="$event.preventDefault()">
      <p>Select a tab by setting active binding to true:</p>
      <p>
        <button type="button" class="btn btn-primary btn-sm" (click)="tabs[0].active = true">Select second tab</button>
        <button type="button" class="btn btn-primary btn-sm" (click)="tabs[1].active = true">Select third tab</button>
      </p>
      <p>
        <button type="button" class="btn btn-primary btn-sm" (click)="tabs[1].disabled = ! tabs[1].disabled">Enable / Disable third tab</button>
      </p>
      <hr />
      <tabset>
        <tab heading="Static title">Static content</tab>
        <tab *ng-for="#tabz of tabs"
          [heading]="tabz.title"
          [active]="tabz.active"
          (select)="tabz.active = true"
          (deselect)="tabz.active = false"
          [disabled]="tabz.disabled">
          {{tabz.content}}
        </tab>
        <tab (select)="alertMe()">
          <template tab-heading>
            <i class="glyphicon glyphicon-bell"></i> Alert!
          </template>
          I've got an HTML heading, and a select callback. Pretty cool!
        </tab>
      </tabset>

      <hr />

      <tabset [vertical]="true" type="pills">
        <tab heading="Vertical 1">Vertical content 1</tab>
        <tab heading="Vertical 2">Vertical content 2</tab>
      </tabset>

      <hr />

      <tabset [justified]="true">
        <tab heading="Justified">Justified content</tab>
        <tab heading="SJ">Short Labeled Justified content</tab>
        <tab heading="Long Justified">Long Labeled Justified content</tab>
      </tabset>
    </div>
  `,
  directives: [tabs, CORE_DIRECTIVES]
})
export class TabsDemo {
  private tabs:Array<any> = [
    {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
    {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true}
  ];

  alertMe() {
    setTimeout(function () {
      alert('You\'ve selected the alert tab!');
    });
  };
}
