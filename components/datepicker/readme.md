### Usage
```typescript
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// component DatePicker
@Component({
  selector: 'datepicker[ngModel], [datepicker][ngModel]',
  properties: [
    'datepickerMode',
    'minDate', 'maxDate',
    'dateDisabled', 'activeDate',
    'showWeeks', 'startingDay',
    'initDate',
    'minMode', 'maxMode',
    'formatDay', 'formatMonth', 'formatYear',
    'formatDayHeader', 'formatDayTitle', 'formatMonthTitle',
    'yearRange',
    'shortcutPropagation',
    'onlyCurrentMonth'
  ]
})


export const DATEPICKER_DIRECTIVES:Array<any> = [DatePicker];
```

### Date picker properties
  - `ngModel` (`:Date`) - binds to date
  - `datepickerMode` (`?string='day'`) - sets datepicker mode, supports: `day`, `month`, `year`
  - `minDate` (`?Date=null`) - oldest selectable date
  - `maxDate` (`?Date=null`) - latest selectable date
  - `dateDisabled` (`?Array<{date:Date, mode:string}>`) - array of disabled dates if `mode` is `day`, or years, etc.
  - `customClass` (`?Array<{date:Date, mode:string, clazz:string}>`) - array of custom css classes to be applied to targeted dates
  - `showWeeks` (`?boolean=true`) - if `false` week numbers will be hidden
  - `startingDay` (`?number=0`) - starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday).
  - `initDate` (`?Date`) - default date to show if `ng-model` value is not specified
  - `minMode` (`?string='day'`) - set lower datepicker mode, supports: `day`, `month`, `year`
  - `maxMode` (`?string='year'`) - sets upper datepicker mode, supports: `day`, `month`, `year`
  - `formatDay` (`?string='dd'`) - format of day in month
  - `formatMonth` (`?string='MMMM'`) - format of month in year
  - `formatMear` (`?string='yyyy'`) - format of year in year range
  - `formatDayHeader` (`?string='EEE'`) - format of day in week header
  - `formatDayTitle` (`?string='MMMM yyyy'`) - format of title when selecting day
  - `formatMonthTitle` (`?string='yyyy'`) - format of title when selecting month
  - `yearRange` (`?number=20`) - number of years displayed in year selection
  - `shortcutPropagation` (`?boolean=false`) - if `true` shortcut`s event propagation will be disabled
  - `onlyCurrentMonth` (`?boolean=false`) - if `true` only dates from the currently displayed month will be shown

<!--
### Date picker popup properties
 (*Note*: not yet implemented properly)
  - `datepicker-popup` (`?string='yyyy-MM-dd'`) - format of displayed dates
  - `show-button-bar` (`?boolean='true'`) - if `false` button bar, underneath the datepicker, will not be shown
  - `current-text` (`?string='Today'`) - 'current day' button title
  - `clear-text` (`?string='Clear'`) - 'clear' button title
  - `close-text` (`?string='Done'`) - 'close' buttin title
  - `close-on-date-selection` (`?boolean=true`) - if `true` calendar will be closed on date selection
  - `datepicker-popup-template-url` (*not yet supported*) - allows to provide datepicker popup template (default: `components/datepicker/datepicker.html`)
  - `datepicker-template-url` (*not yet supported*) - allows to provide datepicker template (default: `components/datepicker/popup.html`)
  - `datepicker-append-to-body` (`?boolean=false`) - if `true` datepicker will inserted in document body
  - `is-open` (`?boolean=false`) - if `true` datepicker is currently shown
  - `on-open-focus` (`?boolean=true`) - if `true` datepicker popup will focused just after opening


### Keyboard Support
 (*Note*: not yet implemented properly)

Depending on datepicker's current mode, the date may refer either to day, month or year. Accordingly, the term view refers either to a month, year or year range.

 * `Left`: Move focus to the previous date. Will move to the last date of the previous view, if the current date is the first date of a view.
 * `Right`: Move focus to the next date. Will move to the first date of the following view, if the current date is the last date of a view.
 * `Up`: Move focus to the same column of the previous row. Will wrap to the appropriate row in the previous view.
 * `Down`: Move focus to the same column of the following row. Will wrap to the appropriate row in the following view.
 * `PgUp`: Move focus to the same date of the previous view. If that date does not exist, focus is placed on the last date of the month.
 * `PgDn`: Move focus to the same date of the following view. If that date does not exist, focus is placed on the last date of the month.
 * `Home`: Move to the first date of the view.
 * `End`: Move to the last date of the view.
 * `Enter`/`Space`: Select date.
 * `Ctrl`+`Up`: Move to an upper mode.
 * `Ctrl`+`Down`: Move to a lower mode.
 * `Esc`: Will close popup, and move focus to the input.
-->
