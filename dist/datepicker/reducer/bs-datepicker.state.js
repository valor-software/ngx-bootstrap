import { defaultMonthOptions } from './_defaults';
import { BsDatepickerConfig } from '../bs-datepicker.config';
var BsDatepickerState = (function () {
    function BsDatepickerState() {
    }
    return BsDatepickerState;
}());
export { BsDatepickerState };
var _initialView = { date: new Date(), mode: 'day' };
export var initialDatepickerState = Object.assign(new BsDatepickerConfig(), {
    locale: 'en',
    view: _initialView,
    selectedRange: [],
    changeMonthOnClick: false,
    monthViewOptions: defaultMonthOptions
});
//# sourceMappingURL=bs-datepicker.state.js.map