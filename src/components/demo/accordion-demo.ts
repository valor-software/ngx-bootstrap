/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, bootstrap,
  coreDirectives, formDirectives,
  CSSClass
} from 'angular2/angular2';

import {accordion} from 'src/components/accordion/accordion';

@Component({
  selector: 'accordion-demo'
})
@View({
  template: `
    <hr/>
    <h2>Accordion demo</h2>
    <div class="col-md-6">
      <p>
        <button type="button" class="btn btn-default btn-sm"
          (click)="status.open = !status.open">Toggle last panel</button>
        <button type="button" class="btn btn-default btn-sm"
          (click)="status.isFirstDisabled = ! status.isFirstDisabled">Enable / Disable first panel</button>
      </p>

      <div class="checkbox">
        <label>
          <input type="checkbox" [(ng-model)]="oneAtATime">
          Open only one at a time
        </label>
      </div>
      <accordion [close-others]="oneAtATime">
        <accordion-group heading="Static Header, initially expanded"
          [is-open]="status.isFirstOpen"
          [is-disabled]="status.isFirstDisabled">
          This content is straight in the template.
        </accordion-group>
        <accordion-group heading="{{group.title}}" *ng-for="#group of groups">
          {{group.content}}
        </accordion-group>
        <accordion-group heading="Dynamic Body Content">
          <p>The body of the accordion group grows to fit the contents</p>
            <button type="button" class="btn btn-default btn-sm" (click)="addItem()">Add Item</button>
            <div *ng-for="#item of items">{{item}}</div>
        </accordion-group>
        <accordion-group [is-open]="status.open">
            <template accordion-heading>
                I can have markup, too! <i class="pull-right glyphicon"
                [class]="{'glyphicon-chevron-down': status.open, 'glyphicon-chevron-right': !status.open}"></i>
            </template>
            This is just some content to illustrate fancy headings.
        </accordion-group>
      </accordion>
    </div>
  `,
  directives: [accordion, CSSClass, coreDirectives, formDirectives]
})
export class AccordionDemo {
  public oneAtATime:boolean = true;
  public groups:Array<any> = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];
  public items:Array<string> = ['Item 1', 'Item 2', 'Item 3'];

  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  public addItem() {
    this.items.push(`Items ${this.items.length + 1}`);
  }
}
