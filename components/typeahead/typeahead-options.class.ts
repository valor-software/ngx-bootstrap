import { TypeaheadDirective }from './typeahead.directive';

export class TypeaheadOptions {
  public placement:string;
  public animation:boolean;
  public typeaheadRef:TypeaheadDirective;

  public constructor(options:TypeaheadOptions) {
    Object.assign(this, options);
  }
}
