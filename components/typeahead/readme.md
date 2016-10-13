### Usage
```typescript
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { TypeaheadModule } from 'ng2-bootstrap/components/typeahead';
```

### Annotations
```typescript
// directive Typeahead
@Directive({
  selector: '[typeahead][ngModel]'
})
export class TypeaheadDirective implements OnInit {
  @Output() public typeaheadLoading:EventEmitter<boolean>;
  @Output() public typeaheadNoResults:EventEmitter<boolean>;
  @Output() public typeaheadOnSelect:EventEmitter<TypeaheadMatch>;

  @Input() public typeahead:any;
  @Input() public typeaheadMinLength:number;
  @Input() public typeaheadWaitMs:number;
  @Input() public typeaheadOptionsLimit:number;
  @Input() public typeaheadOptionField:string;
  @Input() public typeaheadGroupField:string;
  @Input() public typeaheadAsync:boolean = null;
  @Input() public typeaheadLatinize:boolean = true;
  @Input() public typeaheadSingleWords:boolean = true;
  @Input() public typeaheadWordDelimiters:string = ' ';
  @Input() public typeaheadPhraseDelimiters:string = '\'"';
  @Input() public typeaheadItemTemplate:TemplateRef<any>;

  // not yet implemented
  @Input() private typeaheadAppendToBody:boolean;
  @Input() private typeaheadEditable:boolean;
  @Input() private typeaheadFocusFirst:boolean;
  @Input() private typeaheadInputFormatter:any;
  @Input() private typeaheadSelectOnExact:boolean;
  @Input() private typeaheadSelectOnBlur:boolean;
  @Input() private typeaheadFocusOnSelect:boolean;
}
```

### Typeahead properties

  - `ngModel` (`string`) - binds to string user's input
  - `typeahead` (`any`) - options source, can be Array of strings, objects or an Observable for external matching process
  - `typeaheadMinLength` (`?number=1`) - minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit)
  - `typeaheadWaitMs` (`?number=0`) - minimal wait time after last character typed before typeahead kicks-in
  - `typeaheadOptionsLimit` (`?number=20`) - maximum length of options items list
  - `typeaheadOptionField` (`?string`) - when options source is an array of objects, the name of field that contains the options value, we use array item as option in case of this field is missing. Supports nested properties and methods.
  - `typeaheadGroupField` (`?string`) - when options source is an array of objects, the name of field that contains the group value, matches are grouped by this field when set.
  - `typeaheadAsync` (`?boolean`) - should be used only in case of `typeahead` attribute is array. If `true` - loading of options will be async, otherwise - sync. `true` make sense if options array is large.
  - `typeaheadLatinize` (`?boolean=true`) - match latin symbols. If `true` the word `súper` would match `super` and vice versa.
  - `typeaheadSingleWords` (`?boolean=true`) - break words with spaces. If `true` the text `"exact phrase" here match` would match with `match exact phrase here` but not with `phrase here exact match` (kind of "google style").
  - `typeaheadWordDelimiters` (`?string=" "`) - should be used only in case `typeaheadSingleWords` attribute is `true`. Sets the word delimiter to break words. Defaults to space.
  - `typeaheadPhraseDelimiters` (`?string="'\""`) - should be used only in case `typeaheadSingleWords` attribute is `true`. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes.
  - `typeaheadItemTemplate` (`?TemplateRef`) - used to specify a custom item template. Template variables exposed are called `item` and `index`;
  - `typeaheadAppendToBody` (*not implemented*) (`?boolean=false`) - if `true` the typeahead popup will be appended to $body instead of the parent element
  - `typeaheadEditable` (*not implemented*) (`?boolean=true`) - if `false` restrict model values to the ones selected from the popup only will be provided
  - `typeaheadFocusFirst` (*not implemented*) (`?boolean=true`) - if `false` the first match automatically will not be focused as you type
  - `typeaheadInputFormatter` (*not implemented*) (`?any`) - format the ng-model result after selection
  - `typeaheadSelectOnExact` (*not implemented*) (`?boolean=false`) - if `true` automatically select an item when there is one option that exactly matches the user input
  - `typeaheadSelectOnBlur` (*not implemented*) (`?boolean=false`) - if `true` select the currently highlighted match on blur
  - `typeaheadFocusOnSelect` (*not implemented*) (`?boolean=true`) - if `false` don't focus the input element the typeahead directive is associated with on selection

### Typeahead events

  - `typeaheadLoading` - fired when 'busy' state of this component was changed, fired on `async` mode only, returns `boolean`
  - `typeaheadNoResults` - fired on every key event and returns `true` in case of matches are not detected
  - `typeaheadOnSelect` - fired when option was selected, return object with data of this option
