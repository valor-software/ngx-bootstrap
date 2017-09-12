import { TypeaheadDirective } from './typeahead.directive';

export class TypeaheadOptions {
  placement: string;
  animation: boolean;
  typeaheadRef: TypeaheadDirective;

  constructor(options: TypeaheadOptions) {
    Object.assign(this, options);
  }
}
