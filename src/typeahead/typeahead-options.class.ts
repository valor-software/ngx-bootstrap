import { TypeaheadDirective } from './typeahead.directive';

export class TypeaheadOptions {
  placement: string;
  animation: boolean;
  typeaheadRef: TypeaheadDirective;

  constructor(options: TypeaheadOptions) {
    this.placement = options.placement;
    this.animation = options.animation;
    this.typeaheadRef = options.typeaheadRef;
  }
}
