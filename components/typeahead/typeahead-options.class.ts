import { TypeaheadDirective }from './typeahead.directive';

export class TypeaheadOptions {
  public placement:string;
  public animation:boolean;
  public typeaheadRef:TypeaheadDirective;
  public scrollable:boolean;
  public optionsInScrollableView:number;

  public constructor(options:TypeaheadOptions) {
    Object.assign(this, options);
  }
}
