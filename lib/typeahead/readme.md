### Usage
```typescript
import {Typeahead} from 'ng2-bootstrap';
```

### Annotations
```typescript
// class Typeahead implements OnInit
@Directive({
  selector: 'typeahead, [typeahead]',
  properties: [
    'typeahead',
    'typeaheadAppendToBody',
    'typeaheadEditable',
    'typeaheadFocusFirst',
    'typeaheadInputFormatter',
    'typeaheadMinLength',
    'typeaheadSelectOnExact',
    'typeaheadTemplateUrl',
    'typeaheadPopupTemplateUrl',
    'typeaheadWaitMs',
    'typeaheadOptionsLimit',
    'typeaheadSelectOnBlur',
    'typeaheadFocusOnSelect',
    'typeaheadOptionField',
    'typeaheadAsync'
  ],
  events: ['typeaheadLoading', 'typeaheadNoResults', 'typeaheadOnSelect'],
  host: {
    '(keyup)': 'onChange($event)'
  },
  directives: [CORE_DIRECTIVES, TypeaheadContainer]
})
```

### Typeahead properties

  - `ng-model` (`string`) - binds to string user's input
  - `typeahead` (`any`) - options source, can be Array of strings or objects or function that return Promise for external matching process
  - `typeahead-append-to-body` (*not implemented*) (`?boolean=false`) - if `true` the typeahead popup will be appended to $body instead of the parent element
  - `typeahead-editable` (*not implemented*) (`?boolean=true`) - if `false` restrict model values to the ones selected from the popup only will be provided
  - `typeahead-focus-first` (*not implemented*) (`?boolean=true`) - if `false` the first match automatically will not be focused as you type
  - `typeahead-input-formatter` (*not implemented*) (`?any`) - format the ng-model result after selection
  - `typeahead-min-length` (`?number=1`) - minimal no of characters that needs to be entered before typeahead kicks-in. Must be greater than or equal to 1.
  - `typeahead-select-on-exact` (*not implemented*) (`?boolean=false`) - if `true` automatically select an item when there is one option that exactly matches the user input
  - `typeahead-template-url` (*not implemented*) (`?string`) - set custom item template
  - `typeahead-popup-template-url` (*not implemented*) (`?string`) -  set custom popup template
  - `typeahead-wait-ms` (`?number=0`) - minimal wait time after last character typed before typeahead kicks-in
  - `typeahead-options-limit` (`?number=20`) - maximum length of options items list
  - `typeahead-select-on-blur` (*not implemented*) (`?boolean=false`) - if `true` select the currently highlighted match on blur
  - `typeahead-focus-on-select` (*not implemented*) (`?boolean=true`) - if `false` don't focus the input element the typeahead directive is associated with on selection
  - `typeahead-option-field` (`?string`) - name of field in array of states that contain options as objects, we use array item as option in case of this field is missing
  - `typeahead-async` (`?boolean`) - should be used only in case of `typeahead` attribute is array. If `true` - loading of options will be async, otherwise - sync. `true` make sense if options array is large.


### Typeahead events

  - `typeahead-loading` - fired when 'busy' state of this component was changed, fired on `async` mode only, returns `boolean`
  - `typeahead-no-results` - fired on every key event and returns `true` in case of matches are not detected
  - `typeahead-on-select` - fired when option was selected, return object with data of this option
