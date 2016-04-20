import {Typeahead}from './typeahead.directive';

export class TypeaheadOptions {
  public placement:string;
  public animation:boolean;
  public typeaheadRef:Typeahead;

  public constructor(options:TypeaheadOptions) {
    Object.assign(this, options);
  }
}
