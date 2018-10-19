import { startOf } from '../../chronos/utils/start-end-of';
import { formatDate } from '../../chronos/format';
import { createMatrix } from '../utils/matrix-utils';
var height = 4;
var width = 3;
var shift = { month: 1 };
export function formatMonthsCalendar(viewDate, formatOptions) {
    var initialDate = startOf(viewDate, 'year');
    var matrixOptions = { width: width, height: height, initialDate: initialDate, shift: shift };
    var monthMatrix = createMatrix(matrixOptions, function (date) { return ({
        date: date,
        label: formatDate(date, formatOptions.monthLabel, formatOptions.locale)
    }); });
    return {
        months: monthMatrix,
        monthTitle: '',
        yearTitle: formatDate(viewDate, formatOptions.yearTitle, formatOptions.locale)
    };
}
//# sourceMappingURL=format-months-calendar.js.map